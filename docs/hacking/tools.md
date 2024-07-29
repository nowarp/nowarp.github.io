# Tools Guide

This page describes the internal analyzer tools available in Misti to aid in development and debugging.

## CFG Dump

Misti provides a feature to dump the Control Flow Graph (CFG) in both JSON and DOT formats. This is essential for understanding the internal representation (IR) of the code and analyzing the control flow within contracts.

### Usage

To dump the CFG in JSON format, use the following command:

```bash
./bin/misti --dump-cfg="json" <TACT_CONFIG_PATH|TACT_FILE_PATH>
```

To dump the CFG in DOT format, use the following command:

```bash
./bin/misti --dump-cfg="dot" <TACT_CONFIG_PATH|TACT_FILE_PATH>
```

### Converting DOT to SVG

To convert the resulting DOT file to an SVG for visualization, you can save the generated DOT dump to a file and use [Graphviz](https://graphviz.org) with the following command:

```bash
./bin/misti --dump-cfg="dot" <TACT_CONFIG_PATH|TACT_FILE_PATH> > output.dot
dot -Tsvg output.dot -o output.svg
```

### Viewing the SVG

To view the SVG file in Firefox, use the following command:

```bash
firefox output.svg
```

For example, for the following contract:

```
fun test(): Int {
  let sum: Int = 0;
  let i: Int = 0;
  repeat (10) {
    i = i + 1;
    sum = sum + i;
  }
  return sum;
}
```

The following CFG will be generated:

![CFG Example](/img/cfg-example.svg)

### VS Code Plugin

For real-time visualization of DOT files, you can use [one of the available](https://marketplace.visualstudio.com/search?term=tag%3Agraphviz&target=VSCode&category=All%20categories&sortBy=Relevance) Graphviz plugins for Visual Studio Code. These plugins allows you to view DOT diagrams directly within the editor, facilitating easier debugging and development.

## Understanding the Dumps

- **JSON Dumps**: These are mostly helpful for understanding low-level details on how the IR is generated. They provide a comprehensive representation of the internal structures used by the analyzer.

- **DOT Dumps**: These provide a visual representation of the contract's control flow. They are particularly useful for gaining a better understanding of the control flow within contracts, making it easier to identify issues and optimize the code.

By utilizing these tools, developers can gain deeper insights into the workings of the static analyzer and effectively debug and enhance their custom detectors.
