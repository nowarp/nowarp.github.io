# Getting started

## System Dependencies
Before you begin, ensure you have the following software installed on your system:
- Node.js version 22 or higher
- (*optional*) [Soufflé](https://souffle-lang.github.io/install) – enables more built-in detectors

## Installation
```bash
npm install -g @nowarp/misti
```

<details>
  <summary>🚧 Using Development Version</summary>

The latest development version may be unstable, yet it includes all the recently added detectors and therefore can provide a more comprehensive analysis.

To install the latest development version you should:
1. Clone Misti: `git clone https://github.com/nowarp/misti`
2. Build it: `cd misti && yarn install && yarn gen && yarn build`
3. Use it in your Tact project: `cd /path/to/tact/project && yarn add file:/path/to/misti`

</details>

## Running the analysis
Run Misti by specifying a Tact contract, project config, or directory to check:
```bash
misti path/to/src/contracts
misti contract.tact
misti tact.config.json
```

This will highlight any warnings the analyzer found.

You can also add a script to your `package.json` to simplify running the linting process:

```json
{
  "scripts": {
    "lint": "misti path/to/contract"
  }
}
```

## Common Usage Scenarios

Below are a few usage examples for common scenarios when using [the `misti` CLI](./cli.md).

### Suppressing Warnings

If you want to suppress some warnings in specific places of source code, you should use the `@misti:suppress` annotations in the comment on the previous line, for example:
```tact
fun test(): Int {
  // @misti:suppress NeverAccessedVariables
  let sum: Int = 0; // OK: The warning will be suppressed
  return 52;
}
```

This syntax also enables you to list a few detectors to be suppressed, including the custom ones, for example:
```tact
// @misti:suppress NeverAccessedVariables,MyCustomDetector,ReadOnlyVariables
```

Alternatively, you could run `misti` while entirely suppressing specific detectors:

```bash
misti --suppress ReadOnlyVariables path/to/tact.config.json
```

### Filtering by Severity

You could filter out low-severity warnings to provide a quick analysis of only the critical warnings:

```bash
misti --min-severity medium path/to/tact.config.json
```

It is recommended to set the minimum severity level to at least `medium`, or you could choose `high`.

### Enabling All Detectors

Running `misti` with all available built-in detectors enabled:

```bash
misti --all-detectors path/to/tact.config.json
```

It enables more detectors to find subtle bugs and optimization issues. It is recommended to use this only when auditing the project; otherwise, it might be too noisy.

### Running in Quiet Mode

To suppress all output while running `misti` getting just a return code:

```bash
misti --quiet path/to/tact.config.json
```

This might be useful in scripts and CI/CD.

## Troubleshooting
If you encounter any issues during the installation process, feel free to [create an issue](https://github.com/nowarp/misti/issues/new) or ask in the [Misti Telegram group](https://t.me/tonsec_chat).
