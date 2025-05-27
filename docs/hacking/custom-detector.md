# Custom Detector Guide

## Introduction

Misti provides an API to write custom detectors, allowing you to implement your own linting rules. These custom detectors enable you to identify specific issues in your codebase, much like other static analysis tools. The API reference can be found here: [Misti API Reference](https://nowarp.io/api/misti/).

Detectors are designed to be dynamically loaded by the Misti driver, and they are present by TypeScript classes that implement the [`Detector`](https://nowarp.io/api/misti/classes/detectors_detector.Detector.html) interface.

## Creating a Detector

### Example implementation

You can find example of custom detectors in [the `examples` directory](https://github.com/nowarp/misti/tree/master/examples), which contains the template code for writing your own custom detector logic leveraging the Misti API.

Here's an example of how to implement a custom detector using Misti API ([source code](https://github.com/nowarp/misti/tree/master/examples/implicit-init)):

```typescript
import { AstDetector } from "@nowarp/misti/dist/detectors/detector";
import { CompilationUnit, FunctionName } from "@nowarp/misti/dist/internals/ir";
import {
  Warning,
  Severity,
} from "@nowarp/misti/dist/internals/warnings";

/**
 * An example of a custom detector that showcases the usage of the detector API.
 *
 * It reports all the contracts that doesn't have an explicit implementation of the init function.
 */
export class ImplicitInit extends AstDetector {
  severity = Severity.INFO;

  async check(cu: CompilationUnit): Promise<Warning[]> {
    return Array.from(cu.getContracts()).reduce(
      (foundErrors, [_, contract]) => {
        if (!cu.findMethodCFGByName(contract.name, "init" as FunctionName)) {
          const err = this.makeWarning(
            `Contract ${contract.name} doesn't define an init function`,
            contract.loc,
          );
          foundErrors.push(err);
        }
        return foundErrors;
      },
      [] as Warning[],
    );
  }
}
```

### Running detector
To run Misti with only your new detector, use the `--enabled-detectors` (`-de`) option, specifying the path to the detector and the Detector class name:
```bash
misti path/to/src/contracts -de path/to/implicitInit.ts:ImplicitInit
```

That's a good way to test the detector on the first run. You could also use the `--verbose` CLI option and set the environment variable `MISTI_TRACE=1` to facilitate debugging.

### Saving the configuration
After testing the detector, you can specify it in your configuration to enable it in future runs. Update your Misti configuration file to include the path to your custom detector implementation, e.g.:
```
{
  "detectors": [
    // Other detectors...
    { "className": "ImplicitInit", "modulePath": "ImplicitInit.ts" }
  ],
}
```

After this, you could run Misti specifying a path to a custom configuration which is less verbose when you have a few custom detectors:
```bash
misti --config path/to/misti.config.json path/src/contracts
```

## Example Detectors

The best way to examine how to use the Misti API is to look at the example detectors. Navigate to the [examples directory](https://github.com/nowarp/misti/tree/master/examples) in the Misti repository to see how various detectors are implemented. Additionally, the built-in detectors are present in the project and are well-documented, providing further insight into writing effective custom detectors.
