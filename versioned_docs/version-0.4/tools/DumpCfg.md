# DumpCfg

Misti provides a feature to dump the [Control Flow Graph (CFG)](https://en.wikipedia.org/wiki/Control-flow_graph) in JSON, DOT, and Mermaid formats. This is essential for understanding the Internal Representation (IR) of the code and analyzing the control flow within contracts.

## Usage

To dump the CFG in Mermaid format, use the following command:

```bash
npx misti -t "DumpCfg:format=mmd" <TACT_CONFIG_PATH|TACT_FILE_PATH>
```

To dump the CFG in Graphviz DOT format, use the following command:

```bash
npx misti -t "DumpCfg:format=dot" <TACT_CONFIG_PATH|TACT_FILE_PATH>
```

To dump the CFG in JSON format, use the following command:

```bash
npx misti -t "DumpCfg:format=json" <TACT_CONFIG_PATH|TACT_FILE_PATH>
```

You could also include Tact standard library functions to the dump adding `dumpStdlib=true` to the `DumpCfg` options.

## Working with Mermaid

[Mermaid](https://mermaid.js.org) is a JavaScript-based diagramming and charting tool that allows you to create dynamic visualizations, such as flowcharts and sequence diagrams, using a simple syntax. It is integrated into various platforms, including Visual Studio Code.

To view Mermaid diagrams in Visual Studio Code, you can use the [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid) extension. You can also use the [Mermaid Live Editor](https://mermaid.live) to preview your diagrams online.

To dump the CFG in Mermaid format using Misti, run the following command:

```bash
npx misti -t "DumpCfg:format=mermaid" <TACT_CONFIG_PATH|TACT_FILE_PATH>
```

The output can be viewed directly in the VS Code plugin or the online editor.

## Working with Graphviz

### Converting DOT to SVG

To convert the resulting DOT file to an SVG for visualization, save the generated DOT dump to a file and use [Graphviz](https://graphviz.org) with the following command:

```bash
npx misti -t "DumpCfg:format=dot" <TACT_CONFIG_PATH|TACT_FILE_PATH> > output.dot
dot -Tsvg output.dot -o output.svg
```

### Viewing the SVG

To view the SVG file in Firefox, use the following command:

```bash
firefox output.svg
```

For example, for the following contract:

```tact
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

For real-time visualization of DOT files, you can use [one of the available](https://marketplace.visualstudio.com/search?term=tag%3Agraphviz&target=VSCode&category=All%20categories&sortBy=Relevance) Graphviz plugins for Visual Studio Code. These plugins allow you to view DOT diagrams directly within the editor, facilitating easier debugging and development.

## Understanding the Dumps

- **JSON Dumps**: These are mostly helpful for understanding low-level details on how the IR is generated. They provide a comprehensive representation of the internal structures used by the analyzer.

- **DOT Dumps**: These provide a visual representation of the contract's control flow. They are particularly useful for understanding the control flow within contracts, making it easier to identify issues and optimize the code.

- **Mermaid Dumps**: The Mermaid format allows you to generate flowcharts that are easy to read and share. They offer a convenient way to visualize the CFG without requiring additional tools, as they can be directly embedded in markdown files or viewed in the Mermaid Live Editor.

By utilizing these tools, developers can gain deeper insights into the workings of the static analyzer and effectively debug and enhance their custom detectors.
