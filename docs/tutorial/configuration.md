# Configuration

This guide provides an example of the JSON configuration file for Misti, detailing the possible options you can set.

### Configuration Options

- **detectors**: List of detectors to run. Each detector can be specified with a `className` and optionally a `modulePath` if it’s a custom detector.
  - **className** (string, required): The class name of the detector.
  - **modulePath** (string, optional): The file path of the detector module.

- **ignored_projects** (array of strings, optional): List of Tact projects to ignore during analysis.

- **soufflePath** (string, optional): Directory to save generated Soufflé files which is helpful for debugging purposes. If not set, a temporary directory will be used.

- **verbosity** (string, optional): Verbosity level of the logs. Possible values are `quiet`, `debug`, and `default`.

## Running Misti with Configuration

To run Misti with the specified configuration file, use the following command:

```bash
./bin/misti --config path/to/mistiConfig.json test/projects/simple/tactConfig.json
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
    { "className": "ZeroAddress" }
  ],
  "ignored_projects": [],
  "verbosity": "default"
}
```

All the built-in detectors are enabled by default. You can find the complete configuration schema and default configuration file on GitHub: [configSchema.json](https://github.com/nowarp/misti/blob/master/configSchema.json).

## Getting Help

If you need assistance or encounter any issues, please create an issue on GitHub at [nowarp/misti](https://github.com/nowarp/misti/issues).
