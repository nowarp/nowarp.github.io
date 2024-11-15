# DumpCallGraph

Misti provides a feature to dump the [Call Graph (CG)](https://en.wikipedia.org/wiki/Call_graph) in JSON, DOT, and Mermaid formats. This is essential for understanding the function call relationships within your Tact contracts and analyzing the flow of function calls within contracts.

## Usage

To dump the CG in Mermaid format, use the following command:

```bash
misti -t "DumpCallGraph:format=mmd" <TACT_CONFIG_PATH|TACT_FILE_PATH> > callgraph.mmd
```

To dump the CG in Graphviz DOT format, use the following command:

```bash
misti -t "DumpCallGraph:format=dot" <TACT_CONFIG_PATH|TACT_FILE_PATH> > callgraph.dot
```

To dump the CG in JSON format, use the following command:

```bash
misti -t "DumpCallGraph:format=json" <TACT_CONFIG_PATH|TACT_FILE_PATH> > callgraph.json
```

## Working with Mermaid

[Mermaid](https://mermaid.js.org) is a JavaScript-based diagramming and charting tool that allows you to create dynamic visualizations, such as flowcharts and sequence diagrams, using a simple syntax. It is integrated into various platforms, including Visual Studio Code.

To view Mermaid diagrams in Visual Studio Code, you can use the [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid) extension. You can also use the [Mermaid Live Editor](https://mermaid.live) to preview your diagrams online.

To dump the CG in Mermaid format using Misti, run the following command:

```bash
misti -t "DumpCallGraph:format=mmd" <TACT_CONFIG_PATH|TACT_FILE_PATH> > callgraph.mmd
```

The output can be viewed directly in the VS Code plugin or the online editor.

## Working with Graphviz

### Converting DOT to SVG

To convert the resulting DOT file to an SVG for visualization, save the generated DOT dump to a file and use [Graphviz](https://graphviz.org) with the following command:

```bash
misti -t "DumpCallGraph:format=dot" <TACT_CONFIG_PATH|TACT_FILE_PATH> > callgraph.dot
dot -Tsvg callgraph.dot -o callgraph.svg
```

### Viewing the SVG

To view the SVG file in Firefox, use the following command:

```bash
firefox callgraph.svg
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

The following CG will be generated:

![CG Example](/img/cg-example.svg)

### VS Code Plugin

For real-time visualization of DOT files, you can use [one of the available Graphviz plugins](https://marketplace.visualstudio.com/search?term=graphviz&target=VSCode&category=All%20categories&sortBy=Relevance) for Visual Studio Code. These plugins allow you to view DOT diagrams directly within the editor, facilitating easier debugging and development.

## Understanding the Dumps

- **JSON Dumps**: These provide a detailed representation of the call graph, including nodes and edges with their respective identifiers. This format is useful for programmatic analysis or when integrating with other tools.

- **DOT Dumps**: These provide a visual representation of the contract's call relationships. They are particularly useful for understanding the function call flow within contracts, making it easier to identify issues and optimize the code.

- **Mermaid Dumps**: The Mermaid format allows you to generate flowcharts that are easy to read and share. They offer a convenient way to visualize the CG without requiring additional tools, as they can be directly embedded in markdown files or viewed in the Mermaid Live Editor.

## Benefits of Using DumpCallGraph

- **Code Analysis**: Understand the structure and dependencies of your code by visualizing function calls.
- **Debugging**: Identify unintended call relationships or recursive calls that may lead to issues.
- **Optimization**: Spot redundant or inefficient call patterns that can be refactored.
- **Documentation**: Enhance your project's documentation with clear diagrams representing function interactions.

By leveraging the `DumpCallGraph` tool, developers can gain valuable insights into their Tact contracts, leading to better code quality and maintainability.

---
**Note:** Replace `<TACT_CONFIG_PATH|TACT_FILE_PATH>` with the actual path to your Tact configuration file or Tact contract file when running the commands.