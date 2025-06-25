# Writing Custom Tools

## Introduction

Misti has an API to create custom code [tools](../tools.md) that can extract information about the source code.

Typical use-cases include:
- Visualization of source code structure to streamline audits
- Collection of statistics about the source code

These tools are useful for manual source code audits or when [integrating Misti](./integrating-misti.md) with external tools.

If you need to implement logic for bug-finding, refer to the [custom detectors page](./custom-detector.md).

## Creating a Tool

### Implementation

You should follow the examples of custom tools in [the `examples` directory](https://github.com/nowarp/misti/tree/master/examples). Pick an example tool and adapt it for your needs.

In your implementation, you need to implement the [`Tool`](https://nowarp.io/api/misti/classes/tools_tool.Tool.html) interface.

Create a custom tool and save it as a TypeScript file in a project that has the `@nowarp/misti` dependency installed.

### Running the Tool

To execute your custom tool, use the `--tools` (`-t`) option, specifying the path to your tool and the Tool class name:
```bash
misti path/to/src/contracts -t path/to/yourTool.ts:YourTool
```
