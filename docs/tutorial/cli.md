# Command-Line Interface

Below is a list of all available CLI (Command-Line Interface) options for the project, with a brief explanation of each.

### `--dump-cfg <json|dot>`
- **Description**: Dumps the Control Flow Graph (CFG) in the requested format: JSON or Graphviz Dot.
- **Default**: `undefined`

### `--dump-ast`
- **Description**: Dumps the Abstract Syntax Tree (AST) in JSON format.
- **Default**: `false`

### `--dump-output <PATH>`
- **Description**: Specifies the directory to save the AST/CFG dump. If `<PATH>` is `-`, then the output is sent to stdout.
- **Default**: `-`

### `--dump-include-stdlib`
- **Description**: Includes standard library components in the AST/CFG dump.
- **Default**: `false`

### `--dump-config`
- **Description**: Dumps the Misti JSON configuration file in use.
- **Default**: `false`

### `--no-colors` / `-C`
- **Description**: Disables ANSI colors in the output.
- **Default**: `undefined`

### `--souffle-binary <PATH>`
- **Description**: Path to the Soufflé binary.
- **Default**: `"souffle"`

### `--souffle-path <PATH>`
- **Description**: Directory to save the generated Soufflé files.
- **Default**: `"/tmp/misti/souffle"`

### `--souffle-verbose`
- **Description**: Generates human-readable, but more verbose, Soufflé files.
- **Default**: `false`

### `--tact-stdlib-path <PATH>`
- **Description**: Path to the Tact standard library.

### `--verbose` / `-v`
- **Description**: Enables verbose output.
- **Default**: `false`

### `--quiet` / `-q`
- **Description**: Suppresses all output.
- **Default**: `false`

### `--detectors <name|path:name>` / `-D`
- **Description**: A comma-separated list of detectors to enable.
- **Argument Validation**: Requires a non-empty list of detector names.
- **Default**: `undefined`

### `--suppress <names>` / `-s`
- **Description**: A comma-separated list of detector names to suppress.
- **Argument Validation**: Requires a non-empty list of detector names.
- **Default**: `undefined`

### `--all-detectors` / `-A`
- **Description**: Enables all the available built-in detectors.
- **Default**: `false`

### `--config <PATH>` / `-c`
- **Description**: Path to the Misti configuration file.

### `--new-detector <PATH>`
- **Description**: Creates a new custom detector at the specified path.
- **Default**: `undefined`
