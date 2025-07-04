import type { Config as CLIConfig } from "@react-native-community/cli-types";
import type { HermesOptions } from "@rnx-kit/config";
import { error, info } from "@rnx-kit/console";
import { writeJSONFile } from "@rnx-kit/tools-filesystem";
import { findPackageDependencyDir } from "@rnx-kit/tools-node/package";
import { requireModuleFromMetro } from "@rnx-kit/tools-react-native/metro";
import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

function hermesBinaryInDir(hermesc: string): string | null {
  switch (os.platform()) {
    case "darwin":
      return path.join(hermesc, "osx-bin", "hermesc");
    case "linux":
      return path.join(hermesc, "linux64-bin", "hermesc");
    case "win32":
      return path.join(hermesc, "win64-bin", "hermesc.exe");
    default:
      return null;
  }
}

function findHermesBinary({ reactNativePath }: CLIConfig) {
  const locations = [
    () => path.join(reactNativePath, "sdks", "hermesc"),
    () => findPackageDependencyDir("hermes-engine"),
  ];

  for (const getLocation of locations) {
    const location = getLocation();
    if (location) {
      const hermesc = hermesBinaryInDir(location);
      if (hermesc && fs.existsSync(hermesc)) {
        return hermesc;
      }
    }
  }

  return null;
}

function getOutput(args: string[]): string | null {
  const length = args.length;
  for (let i = 0; i < length; ++i) {
    const flag = args[i];
    if (flag === "-out") {
      return args[i + 1];
    } else if (flag.startsWith("-out=")) {
      return flag.substring(5);
    }
  }
  return null;
}

export function emitBytecode(
  cliConfig: CLIConfig,
  input: string,
  sourcemap: string | undefined,
  options: HermesOptions
): void {
  const cmd = options.command || findHermesBinary(cliConfig);
  if (!cmd) {
    error("No Hermes compiler was found");
    return;
  }

  const args = [
    "-emit-binary",
    // If Hermes can't detect the width of the terminal, it will set the limit
    // to "unlimited". Since we might be passing a minified bundle to Hermes,
    // limit output width to avoid issues when it outputs diagnostics. See:
    //   - https://github.com/microsoft/rnx-kit/issues/2416
    //   - https://github.com/microsoft/rnx-kit/issues/2419
    //   - https://github.com/microsoft/rnx-kit/issues/2424
    "-max-diagnostic-width=80",
    ...(options.flags ?? ["-O", "-output-source-map", "-w"]),
  ];

  let output = getOutput(args);
  if (!output) {
    output = input + ".hbc";
    args.push("-out", output);
  }

  args.push(input);

  info("Emitting bytecode to:", output);
  const result = spawnSync(cmd, args, { stdio: "inherit" });
  if (result.status !== 0) {
    throw result.error;
  }

  if (sourcemap && args.includes("-output-source-map")) {
    const outputMap = output + ".map";
    info(`Combining source maps: ${sourcemap} + ${outputMap}`);

    const options = { encoding: "utf-8" } as const;
    const packagerSourcemap = JSON.parse(fs.readFileSync(sourcemap, options));
    const compilerSourcemap = JSON.parse(fs.readFileSync(outputMap, options));

    // `composeSourceMaps` was introduced in 0.56 — see
    // https://github.com/facebook/metro/commit/6017085bdad96ca5cec39d50038eb5622ce1097b
    // @ts-expect-error Property 'composeSourceMaps' does not exist
    const { composeSourceMaps } = requireModuleFromMetro("metro-source-map");

    const composed = composeSourceMaps([packagerSourcemap, compilerSourcemap]);
    writeJSONFile(outputMap, composed, 0);
  }
}
