# Using Misti with Blueprint

[Blueprint](https://github.com/ton-org/blueprint/) is a platform for compiling, testing, and deploying contracts on the TON blockchain. It is similar to Hardhat and Truffle for Ethereum.

The [blueprint-misti](https://github.com/nowarp/blueprint-misti) plugin can be added to your Blueprint configuration. It adds the `blueprint misti` command, which runs the static analyzer over your selected Blueprint project.

This page describes how to use it.

## Getting Started

1. [Install Soufflé](https://souffle-lang.github.io/install) to use all detectors provided by Misti.

2. Add this plugin as a dependency to your Blueprint project:
```bash
yarn add @nowarp/blueprint-misti
```

3. Add this configuration to `blueprint.config.ts`:
```ts
import { MistiPlugin } from '@nowarp/blueprint-misti';
export const config = {
  plugins: [
    new MistiPlugin(),
  ],
};
```

## Usage

Run the following command:
```bash
yarn blueprint misti
```

This will run the analysis of the available project, if one exists, or display an interactive window to select a project:

![img](/img/blueprint-select-project.png)

You can also pass the [supported CLI options](./cli.md) for Misti, for example:
```bash
yarn blueprint misti --all-detectors /path/to/contracts
```

Or you can run analysis on a specific contract:
```bash
yarn blueprint misti path/to/my/contract.tact
```

## CI Integration

You can integrate `blueprint-misti` into GitHub Actions by following the installation steps above and adding the following lines to your workflow configuration:
```yml
- name: Run Misti
  run: yarn blueprint misti /path/to/contracts
```

For more information, see: [Integrating Misti into CI/CD](./ci-cd.md).

## Getting Help

If you encounter any issues, feel free to reach out to us in the [Misti discussion group](https://t.me/tonsec_chat) or [create an issue](https://github.com/nowarp/blueprint-misti).
