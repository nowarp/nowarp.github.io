# DumpCallGraph

Misti provides a feature to dump the [Call Graph (CG)](https://en.wikipedia.org/wiki/Call_graph) in JSON, DOT, and Mermaid formats. This is essential for understanding the function call relationships within your Tact contracts and analyzing the flow of function calls.

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

## Further Information

For detailed instructions on how to work with the generated Mermaid, Graphviz DOT, and JSON files—including how to view, convert, and visualize them—please refer to the [DumpCfg documentation](./DumpCfg.md#working-with-graphviz). The steps and tools used for `DumpCallGraph` outputs are the same as those described for `DumpCfg`.

By utilizing the `DumpCallGraph` tool, developers can gain deeper insights into the function call structure of their contracts and effectively debug and enhance their code.

---

**Note:** Replace `<TACT_CONFIG_PATH|TACT_FILE_PATH>` with the actual path to your Tact configuration file or Tact contract file when running the commands.