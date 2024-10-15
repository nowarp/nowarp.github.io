---
id: tools
title: Tools Overview
---

# Tools Overview

Misti Tools are additional modules designed to work alongside detectors, enabling various tasks beyond code analysis.

These tools are particularly useful for auditors, providing additional functionalities to assist in manual code reviews.

## Usage

List available tools and their options:
```bash
npx misti --list-tools
```

To invoke a specific tool, use the following command format:
```bash
npx misti -t "ToolName:option=value,option=value" /path/to/tact.config.json
```

## Usage Examples

Dump the AST of the project:
```
npx misti -t "DumpAst" my-example.tact
```

Dump the CFGs of the project in [Mermaid](https://mermaid.live) format to the file `/tmp/my-example.DumpCfg.out`:
```
npx misti --output-path "/tmp" -t "DumpCfg:format=mermaid" my-example.tact
```

## Available Tools

Below is the complete list of built-in tools. Click on any of them to learn more.

| #  | Tool                                        | Description                             |
|----|---------------------------------------------|-----------------------------------------|
| 1  | [DumpAst](./tools/DumpAst.md)               | Dumps the AST of project modules        |
| 2  | [DumpCfg](./tools/DumpCfg.md)               | Dumps the CFG of project modules        |
| 3  | [DumpConfig](./tools/DumpConfig.md)         | Dumps the Misti configuration file in use |
