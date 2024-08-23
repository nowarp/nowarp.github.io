# Configuration

This guide provides an example of the JSON configuration file for Misti, detailing the possible options you can set.

### Configuration Options

- **detectors**: List of detectors to run. Each detector can be specified with a `className` and optionally a `modulePath` if it’s a custom detector.
  - **className** (string, required): The class name of the detector.
  - **modulePath** (string, optional): The file path of the detector module.

- **ignoredProjects** (array of strings, optional): List of Tact projects to ignore during analysis.

- **soufflePath** (string, optional): Directory to save generated Soufflé files which is helpful for debugging purposes. If not set, a temporary directory will be used.

- **tactStdlibPath** (string, optional): Path to Tact standard library. If not set, the default stdlib from the actual Tact setup will be used.

- **unusedPrefix** (string, default: "_"): Identifiers starting with this prefix won't be reported as unused by built-in detectors.

- **verbosity** (string, optional): Verbosity level of the logs. Possible values are `quiet`, `debug`, and `default`.

## Running Misti with Configuration

To run Misti with the specified configuration file, use the following command:

```bash
npx misti --config path/to/mistiConfig.json test/projects/simple/tactConfig.json
```

This command tells Misti to use the provided configuration file to analyze the specified Tact project configuration.

## Default Configuration File

By default, Misti enables all built-in detectors. Below is an example of the default configuration file:

```json
{
  "detectors": [
    { "className": "DivideBeforeMultiply" },
    { "className": "ReadOnlyVariables" },
    { "className": "NeverAccessedVariables" },
    { "className": "UnboundLoops" },
    { "className": "ZeroAddress" },
    { "className": "BranchDuplicate" },
    { "className": "FieldDoubleInit" },
    { "className": "PreferAugmentedAssign" }
  ],
  "ignoredProjects": [],
  "unusedPrefix": "_",
  "verbosity": "default"
}
```

All the built-in detectors are enabled by default. You can find the complete configuration schema and default configuration file on GitHub: [configSchema.json](https://github.com/nowarp/misti/blob/master/configSchema.json).

You can always dump the Misti configuration file in use by passing the `--dump-config` option in the CLI:
```bash
npx misti --dump-config test/projects/simple/tactConfig.json
```
If there is no Misti config in the `simple` directory, Misti dumps the default config. This can be used to adjust it, e.g., adding or suppressing some detectors.

## Getting Help

If you need assistance or encounter any issues, please create an issue on GitHub at [nowarp/misti](https://github.com/nowarp/misti/issues) or ask in the [Misti Telegram group](https://t.me/misti_dev).
