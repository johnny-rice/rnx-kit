# Change Log - @rnx-kit/eslint-plugin

## 0.8.6

### Patch Changes

- 4f18f88: Bump `@react-native/eslint-plugin` to 0.76

## 0.8.5

### Patch Changes

- 65fa41a: Handle case where exported specifier is a string literal

## 0.8.4

### Patch Changes

- ca0052f: Inline recommended `react-hooks` rules so we no longer have to depend
  on `@eslint/eslintrc`

## 0.8.3

### Patch Changes

- 57013d2: Bumped `eslint-plugin-react` and `eslint-plugin-react-hooks` to
  better support ESLint 9.x

## 0.8.2

### Patch Changes

- 05c6b97: Bumped `typescript-eslint` to 8.0
- d091088: Avoid dupes of `@eslint/js`

## 0.8.1

### Patch Changes

- 55a4b5e: Bumped `@react-native/eslint-plugin` to 0.75

## 0.8.0

### Minor Changes

- 3afb5fa: Bump minimum Node version to 16.17

## 0.7.2

### Patch Changes

- da519d3: Properly handle packages that are missing a default entry in their
  exports map

## 0.7.1

### Patch Changes

- 576f29a: Migrate to `typescript-eslint`

## 0.7.0

### Minor Changes

- 1eb8c14: Bumped `@typescript-eslint/eslint-plugin` to v7. This brings the
  following breaking changes:

  - Update Node.js engine requirement to ^18.18.0 || >=20.0.0. This means we are
    dropping support for Node 16, 19, and Node 18 versions prior to 18.18.0.
    Note that this is the same requirement that ESLint v9 will impose.
  - Update the ESLint peer dependency requirement to ^8.56.0.

  For more details, check their blog post:
  https://typescript-eslint.io/blog/announcing-typescript-eslint-v7/

## 0.6.0

### Minor Changes

- 2ba27400: ESLint 8.23+ and its new config system is now required — read more
  about ESLint's new config system, flat config, here:
  https://eslint.org/blog/2022/08/new-config-system-part-2/

### Patch Changes

- 9842205d: Exclude `eslint-plugin-react` if `react` is not installed

## 0.5.3

### Patch Changes

- 5da23646: Prepare `no-export-all` for ESLint v9
- d51cee8a: Add linter rules to ensure `PlatformColor()` and `DynamicColorIOS()`
  are used correctly

## 0.5.2

### Patch Changes

- a442ffd4: Cache access to `NODE_ENV`

## 0.5.1

### Patch Changes

- d67d59d2: Use `context.filename` if available (starting with
  [ESLint v8.40](https://eslint.org/blog/2023/05/eslint-v8.40.0-released/))

## 0.5.0

### Minor Changes

- 950fcf0a: Bumped typescript-eslint to v6.

  typescript-eslint v6 contains breaking changes! The most notable ones are:

  - Dropped support for Node 12 and 14.
  - Dropped support for ESLint v6.

  For full details, see their announcement:
  https://typescript-eslint.io/blog/announcing-typescript-eslint-v6

## 0.4.2

### Patch Changes

- 12421fa0: no-export-all: Don't flag or autofix namespace exports
  (`export * as ns`)
- 0ac2d516: no-export-all: add support in fixer for TS `export import =`

## 0.4.1

### Patch Changes

- 44ab287f: Fixed `@rnx-kit/no-export-all` autofix treating `export declare` as
  types

## 0.4.0

### Minor Changes

- 218e1a76: Added `no-const-enum` rule

## 0.3.0

### Minor Changes

- 8da1b4dd: Added `consistent-type-imports` rule

## 0.2.13

### Patch Changes

- 3ee09f6: Fix Rush workspaces not being detected when set up as a post-install
  step

## 0.2.12

### Patch Changes

- dec7c60: Fix no-export-all getting confused when the module id contains the
  `.js` extension due to how ESM works

## 0.2.11

### Patch Changes

- 5f2e378: Enable `react-hooks/recommended`

## 0.2.10

### Patch Changes

- b3308e9: Remove unused `eslint-plugin-jest`

## 0.2.9

### Patch Changes

- e0e19ad: Declarations should be exported as types

## 0.2.8

Tue, 30 Nov 2021 17:24:14 GMT

### Patches

- Drop optional chaining to support older Node versions
  (4123478+tido64@users.noreply.github.com)

## 0.2.7

Fri, 26 Nov 2021 09:20:19 GMT

### Patches

- Add proper support for `const` enums (4123478+tido64@users.noreply.github.com)

## 0.2.6

Tue, 23 Nov 2021 07:25:36 GMT

### Patches

- no-export-all: add support for namespaces
  (4123478+tido64@users.noreply.github.com)

## 0.2.5

Fri, 19 Nov 2021 09:22:42 GMT

### Patches

- no-export-all: Fix dupes sometimes showing up in fixed code
  (4123478+tido64@users.noreply.github.com)

## 0.2.4

Tue, 09 Nov 2021 19:26:57 GMT

### Patches

- Handle `project` field sometimes returning an array of strings, and add
  support for enums. (4123478+tido64@users.noreply.github.com)

## 0.2.3

Tue, 09 Nov 2021 08:21:42 GMT

### Patches

- Prefer parsing `.d.ts` over `.js` so we don't lose type information
  (4123478+tido64@users.noreply.github.com)

## 0.2.2

Fri, 05 Nov 2021 19:24:49 GMT

### Patches

- Fix no-export-all failing to parse files that are outside the TypeScript
  project (4123478+tido64@users.noreply.github.com)

## 0.2.1

Thu, 04 Nov 2021 17:54:44 GMT

### Patches

- Adds `module` to the list of main fields to consider, and options for setting
  max depth and enabling debug output. (4123478+tido64@users.noreply.github.com)

## 0.2.0

Wed, 03 Nov 2021 18:15:39 GMT

### Minor changes

- Implemented fixer for `no-export-all`
  (4123478+tido64@users.noreply.github.com)

## 0.1.2

Fri, 29 Oct 2021 12:14:31 GMT

### Patches

- Enable `ignoreRestSiblings` to allow prop omission
  (4123478+tido64@users.noreply.github.com)

## 0.1.1

Fri, 29 Oct 2021 10:31:10 GMT

### Patches

- Re-enable no-unused-vars. It looks like optional chaining is no longer causing
  false positives. (4123478+tido64@users.noreply.github.com)

## 0.1.0

Fri, 29 Oct 2021 08:51:30 GMT

### Minor changes

- @rnx-kit/eslint-plugin recommended ESLint rules for React devs
  (4123478+tido64@users.noreply.github.com)
