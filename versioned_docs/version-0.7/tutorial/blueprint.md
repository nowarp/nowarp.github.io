# Using Misti with Blueprint

[Blueprint](https://github.com/ton-org/blueprint/) is a platform to compile, test, and deploy contracts on the TON blockchain. It is quite similar to Hardhat and Truffle for Ethereum.

There is a [blueprint-misti](https://github.com/nowarp/blueprint-misti) plugin that can be added to a Blueprint configuration. It adds the `blueprint misti` command, which runs the static analyzer over the selected Blueprint project.

This page describes how to use it.

## Getting Started

1. [Install Soufflé](https://souffle-lang.github.io/install) to use all detectors provided by Misti.

2. Add this plugin as a dependency of your Blueprint project:
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

It will run the analysis of the available project, if there is one, or show an interactive window to select a project:

![img](/img/blueprint-select-project.png)

You could also pass the [supported CLI options](./cli.md) for Misti, for example:
```bash
yarn blueprint misti --all-detectors /path/to/contracts
```

Or you can run analysis of a specific contract:
```bash
yarn blueprint misti path/to/my/contract.tact
```

## CI Integration

You could integrate `blueprint-misti` into Github Actions by following the installation steps above and adding the following lines to your workflow configuration:
```yml
- name: Run Misti
  run: yarn blueprint misti /path/to/contracts
```

See: [Integrating Misti into CI/CD](./ci-cd.md) for more information.

If you have any problems, feel free to reach out to us in the [Misti discussion group](https://t.me/tonsec_chat) or [create an issue](https://github.com/nowarp/blueprint-misti).
