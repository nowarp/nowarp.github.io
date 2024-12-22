# Developing Misti

## Prerequisites

Before you begin, please refer to the [Getting Started documentation](https://nowarp.io/tools/misti/docs/next/tutorial/getting-started) for the required system dependencies.

## Cloning the Repository

Clone the Misti repository:

```bash
git clone 'https://github.com/nowarp/misti'
```

## Building the Project

Navigate to the project directory, install dependencies, generate necessary files, and build the project:

```bash
cd misti && yarn install && yarn gen && yarn build
```

## Running the Analyzer

During development, you can run the analyzer using:

```bash
yarn misti
```

For example, to run it for tests:

```bash
yarn misti test/detectors/NeverAccessedVariables.tact
```

## Adding Backtraces to the Logger

To add debug traces to all log messages, set the `MISTI_TRACE` environment variable to `1`:

```bash
MISTI_TRACE=1 yarn misti test/detectors/NeverAccessedVariables.tact
```

## Updating Expected Outputs of Tests

To update the expected outputs of tests, set the `BLESS` environment variable and run the tests:

```bash
BLESS=1 yarn test
```

You can also run a single test or update its expected output when working with a specific test file:

```bash
BLESS=1 yarn test test/tactIR.spec.ts tests/detectors/NeverAccessedVariables.tact
```

And for another specific test:

```bash
BLESS=1 yarn test test/builtinDetectors.spec.ts test/detectors/BranchDuplicate.tact
```
