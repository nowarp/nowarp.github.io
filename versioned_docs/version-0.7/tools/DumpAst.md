# DumpAst

The `DumpAst` tool in Misti enables users to output the [Abstract Syntax Tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree) of project modules in JSON format. This is particularly useful when writing custom detectors, as it helps understand the structure and components of the code.

## Usage

To dump the AST in JSON format, use the following command:

```bash
misti -t "DumpAst" <TACT_CONFIG_PATH|TACT_FILE_PATH>
```

If you wish to include the standard library in the dump, set `dumpStdlib` to `true`:

```bash
misti -t "DumpAst:dumpStdlib=true" <TACT_CONFIG_PATH|TACT_FILE_PATH>
```

## Understanding the Dumps

The AST provides a detailed breakdown of code components, offering insights into its structure. This is essential when creating or debugging [custom detectors](../hacking/custom-detector.md), as it allows a deeper understanding of how code is represented internally by the analyzer.

By leveraging the `DumpAst` tool, developers can more effectively navigate and interpret the project's syntax, supporting the development of accurate and efficient detectors.
