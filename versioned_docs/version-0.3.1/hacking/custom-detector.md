# Custom Detector Guide

## Introduction

Misti provides an API to write custom detectors, allowing you to implement your own linting rules. These custom detectors enable you to identify specific issues in your codebase, much like other static analysis tools. The API reference can be found here: [Misti API Reference](https://nowarp.io/tools/misti/api/).

Detectors are designed to be dynamically loaded by the Misti driver, and they are present by TypeScript classes that implement the [`Detector`](https://nowarp.io/tools/misti/api/classes/detectors_detector.Detector.html) interface.

## Creating a Detector

You can create a new custom detector by executing Misti with the `--new-detector` option: `npx misti --new-detector implicitInit`.

This will create the `implicitInit.ts` file, which contains the template code for writing your own custom detector logic leveraging the Misti API.

Here's an example of how to implement a custom detector using Misti API:

```typescript
import { Detector } from "@nowarp/misti/dist/detectors/detector";
import { CompilationUnit } from "@nowarp/misti/dist/internals/ir";
import {
  MistiTactWarning,
  Severity,
} from "@nowarp/misti/dist/internals/errors";

/**
 * An example of a custom detector that showcases the usage of the detector API.
 *
 * It reports all the contracts that doesn't have an explicit implementation of the init function.
 */
export class ImplicitInit extends Detector {
  async check(cu: CompilationUnit): Promise<MistiTactWarning[]> {
    return Array.from(cu.contracts).reduce((foundErrors, [_, contract]) => {
      if (!cu.findMethodCFGByName(contract.name, "init")) {
        const err = this.makeError(
          `Contract ${contract.name} doesn't define an init function`,
          Severity.INFO,
          contract.ref,
        );
        foundErrors.push(err);
      }
      return foundErrors;
    }, [] as MistiTactWarning[]);
  }
}
```

### Testing the detector
To run Misti with only your new detector, use the `--detectors` option, specifying the path to the detector and the Detector class name: `npx misti path/to/your/tact.config.json --detectors path/to/implicitInit.ts:ImplicitInit`.

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

After this, you could run Misti specifying a path to a custom configuration `npx misti --config path/to/misti.config.json path/to/your/tact.config.json`.

## Example Detectors

The best way to examine how to use the Misti API is to look at the example detectors. Navigate to the [examples directory](https://github.com/nowarp/misti/tree/master/examples) in the Misti repository to see how various detectors are implemented. Additionally, the built-in detectors are present in the project and are well-documented, providing further insight into writing effective custom detectors.
