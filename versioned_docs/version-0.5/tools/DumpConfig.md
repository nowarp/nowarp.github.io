# DumpConfig

The `DumpConfig` tool in Misti allows you to print the current configuration file used by the analyzer. This is useful for obtaining the default configuration to use as a starting point for your custom setup or to inspect and understand the existing configuration in use.

## Usage

To dump the configuration file, use the following command:

```bash
misti -t "DumpConfig" <TACT_CONFIG_PATH|TACT_FILE_PATH>
```

## Understanding the Output

The output provides an overview of all the configurations and settings applied to your project. This can help you quickly identify the default settings, make adjustments to fit your specific needs, and ensure that your custom detectors are running under the correct configurations.
