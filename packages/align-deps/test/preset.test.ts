import { filterPreset, parseRequirements } from "../src/preset";
import { preset as defaultPreset } from "../src/presets/microsoft/react-native";
import { profile as profile_0_69 } from "../src/presets/microsoft/react-native/profile-0.69";
import { profile as profile_0_70 } from "../src/presets/microsoft/react-native/profile-0.70";
import { profile as profile_0_71 } from "../src/presets/microsoft/react-native/profile-0.71";
import { profile as profile_0_72 } from "../src/presets/microsoft/react-native/profile-0.72";
import { profile as profile_0_73 } from "../src/presets/microsoft/react-native/profile-0.73";
import { profile as profile_0_74 } from "../src/presets/microsoft/react-native/profile-0.74";
import { profile as profile_0_75 } from "../src/presets/microsoft/react-native/profile-0.75";
import { profile as profile_0_76 } from "../src/presets/microsoft/react-native/profile-0.76";
import { profile as profile_0_77 } from "../src/presets/microsoft/react-native/profile-0.77";
import { profile as profile_0_78 } from "../src/presets/microsoft/react-native/profile-0.78";
import { profile as profile_0_79 } from "../src/presets/microsoft/react-native/profile-0.79";
import { profile as profile_0_80 } from "../src/presets/microsoft/react-native/profile-0.80";

describe("filterPreset()", () => {
  test("returns no profiles if requirements cannot be satisfied", () => {
    const profiles = filterPreset(defaultPreset, [
      "react@17.0",
      "react-native@>=69.0",
    ]);
    expect(profiles).toEqual({});
  });

  test("returns profiles satisfying single version range", () => {
    const profiles = filterPreset(defaultPreset, ["react-native@0.76"]);
    expect(profiles).toEqual({ "0.76": profile_0_76 });
  });

  test("returns profiles satisfying multiple version ranges", () => {
    const profiles = filterPreset(defaultPreset, ["react-native@0.76 || 0.79"]);
    expect(profiles).toEqual({ "0.76": profile_0_76, "0.79": profile_0_79 });
  });

  test("returns profiles satisfying wide version range", () => {
    const profiles = filterPreset(defaultPreset, ["react-native@>=0.76"]);
    expect(profiles).toEqual({
      "0.76": profile_0_76,
      "0.77": profile_0_77,
      "0.78": profile_0_78,
      "0.79": profile_0_79,
      "0.80": profile_0_80,
    });
  });

  test("returns profiles satisfying non-react-native requirements", () => {
    const profiles = filterPreset(defaultPreset, ["react@18"]);
    expect(profiles).toEqual({
      "0.69": profile_0_69,
      "0.70": profile_0_70,
      "0.71": profile_0_71,
      "0.72": profile_0_72,
      "0.73": profile_0_73,
      "0.74": profile_0_74,
      "0.75": profile_0_75,
      "0.76": profile_0_76,
      "0.77": profile_0_77,
    });
  });

  test("returns profiles satisfying multiple requirements", () => {
    const profiles = filterPreset(defaultPreset, [
      "react@18",
      "react-native@<0.70",
    ]);
    expect(profiles).toEqual({ "0.69": profile_0_69 });
  });

  test("ignores extra capabilities resolving to the same package", () => {
    const presetWithExtraCapabilities = {
      ...defaultPreset,
      "0.70": {
        ...defaultPreset["0.70"],
        "should-be-ignored": profile_0_69.core,
      },
    };
    const profiles = filterPreset(presetWithExtraCapabilities, [
      "react-native@0.69",
    ]);
    expect(profiles).toEqual({ "0.69": profile_0_69 });
  });
});

describe("parseRequirements()", () => {
  test("throws if requirement is invalid", () => {
    expect(() => parseRequirements(["@rnx-kit/align-deps"])).toThrow(
      "Invalid requirement"
    );
    expect(() => parseRequirements(["react-native"])).toThrow(
      "Invalid requirement"
    );
  });

  test("throws if version is invalid", () => {
    expect(() => parseRequirements(["@rnx-kit/align-deps@"])).toThrow(
      "Invalid version range"
    );
    expect(() => parseRequirements(["@rnx-kit/align-deps@latest"])).toThrow(
      "Invalid version range"
    );
  });

  test("returns package name and version", () => {
    expect(parseRequirements(["@rnx-kit/align-deps@1.0"])).toEqual([
      ["@rnx-kit/align-deps", "1.0"],
    ]);
    expect(parseRequirements(["react-native@0.70"])).toEqual([
      ["react-native", "0.70"],
    ]);
  });
});

describe("presets should not have duplicate packages", () => {
  const allowedAliases = ["core", "core-android", "core-ios"];

  for (const [name, profile] of Object.entries(defaultPreset)) {
    test(`microsoft/react-native/${name}`, () => {
      const packages = new Set<string>();
      for (const [capability, pkg] of Object.entries(profile)) {
        if (pkg.name === "#meta" || allowedAliases.includes(capability)) {
          continue;
        }

        expect(packages.has(pkg.name)).toBe(false);
        packages.add(pkg.name);
      }
    });
  }
});
