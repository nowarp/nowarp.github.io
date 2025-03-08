# Configuration

This guide provides an example of the JSON configuration file for Misti, detailing the possible options you can set.

### Configuration Options

- **detectors** (array of objects, optional): List of detectors to run. Each detector can be specified with a `className` and optionally a `modulePath` if it’s a custom detector.
  - **className** (string, required): The class name of the detector.
  - **modulePath** (string, optional): The file path of the detector module if it's a custom implementation.

- **tools** (array of objects, optional): List of tools to enable, each with its own configuration.
  - **className** (string, required): The class name of the tool.
  - **options** (object, optional): Key-value configuration options for the tool.

- **suppressions** (array of objects, optional): A list of suppressions for warnings.
  - **detector** (string, required): The detector to suppress warnings for.
  - **position** (string, required): The position in the code where the warning should be suppressed.

- **ignoredProjects** (array of strings, optional): List of Tact projects to ignore during analysis.

- **soufflePath** (string, optional): Directory to save generated Soufflé files, useful for debugging purposes. If not set, a temporary directory will be used.

- **souffleVerbose** (boolean, optional): If set, generates more readable Soufflé files instead of optimizing the output for size.

- **tactStdlibPath** (string, optional): Path to the Tact standard library. If not set, the default standard library from the active Tact setup will be used.

- **unusedPrefix** (string, default: "_"): Identifiers starting with this prefix won't be reported as unused by the built-in detectors.

- **verbosity** (string, optional, default: "default"): Verbosity level of the logs. Possible values are `quiet`, `debug`, and `default`.

## Running Misti with Configuration

To run Misti with the specified configuration file, use the following command:

```bash
misti --config path/to/mistiConfig.json test/projects/simple/tactConfig.json
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
    { "className": "PreferAugmentedAssign" },
    { "className": "StringReceiversOverlap" },
    { "className": "ArgCopyMutation" }
  ],
  "ignoredProjects": [],
  "soufflePath": "/tmp/misti/souffle",
  "souffleVerbose": false,
  "unusedPrefix": "_",
  "verbosity": "default"
}
```

All the built-in detectors are enabled by default. You can find the complete configuration schema and default configuration file on GitHub: [configSchema.json](https://github.com/nowarp/misti/blob/master/configSchema.json).

You can always dump the Misti configuration file in use by passing the `--dump-config` option in the CLI:
```bash
misti --dump-config path/to/your/tact.config.json
```
If there is no Misti config in the directory, Misti dumps the default config. This can be used to adjust it, such as adding or suppressing some detectors.

## Environment Variables
Misti offers advanced configuration through environment variables to control specific options.

- **`MISTI_TIMEOUT`**  
  Sets the timeout for detector execution in milliseconds.  
  **Default**: `15000`  
  **Example**: 
  ```bash
  export MISTI_TIMEOUT=20000
  ```
- **`MISTI_TRACE`**  
  Enables tracing of the execution. Set to `1` to enable tracing, otherwise it is disabled.  
  **Default**: `false`  
  **Example**:
  ```bash
  export MISTI_TRACE=1
  ```

## Getting Help

If you need assistance or encounter any issues, please create an issue on GitHub at [nowarp/misti](https://github.com/nowarp/misti/issues) or ask in the [Misti Telegram group](https://t.me/tonsec_chat).
