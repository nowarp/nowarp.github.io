---
id: tools
title: Tools Overview
---

# Tools Overview

Misti Tools are additional modules designed to work alongside detectors, enabling various tasks beyond code analysis.

These tools are particularly useful for auditors, providing additional functionalities to assist in manual code reviews.

Misti comes with several built-in tools for common tasks and provides an [API for creating custom tools](./hacking/custom-tool.md).

## Usage

List available built-in tools and their options:
```bash
misti --list-tools
```

To invoke a specific tool, use the following command format:
```bash
misti -t "ToolName:option=value,option=value" /path/to/tact.config.json
```

## Usage Examples

Dump the AST of the project:
```bash
misti -t "DumpAst" my-example.tact
```

Dump the CFGs of the project in [Mermaid](https://mermaid.live) format to the file `/tmp/my-example.DumpCfg.out`:
```bash
misti --output-path "/tmp" -t "DumpCfg:format=mermaid" my-example.tact
```

## Available Tools

Below is the complete list of built-in tools. Click on any tool to learn more.

| #  | Tool                                        | Description                                            |
|----|---------------------------------------------|--------------------------------------------------------|
| 1  | [DumpAst](./tools/DumpAst.md)               | Dumps Abstract Syntax Tree (AST) of project modules    |
| 2  | [DumpCallGraph](./tools/DumpCallGraph.md)   | Dumps Call Graph (CG) of project modules               |
| 3  | [DumpCfg](./tools/DumpCfg.md)               | Dumps Control Flow Graph (CFG) of project modules      |
| 4  | [DumpConfig](./tools/DumpConfig.md)         | Dumps Misti configuration file in use                  |
| 5  | [DumpImports](./tools/DumpImports.md)       | Dumps graph of imports                                 |
