# Using Misti with Blueprint

[Blueprint](https://github.com/ton-org/blueprint) is a development environment for writing, testing, and deploying TON smart contracts.

Misti can be used in Blueprint projects by leveraging the [`blueprint-misti`](https://github.com/nowarp/blueprint-misti) plugin.

## Getting started

Add the plugin and the recent version of Tact to the `package.json` of your Blueprint project by running:
```bash
yarn add tact
yarn add @nowarp/blueprint-misti
```

Then, add this configuration to `blueprint.config.ts`:
```ts
import { MistiPlugin } from '@nowarp/blueprint-misti';
export const config = {
  plugins: [
    new MistiPlugin(),
  ],
};
```

Now, try to run Misti:
```bash
yarn blueprint misti ./path/to/tact.config.json
```

## Resources
For more information, please refer to the README of the [`blueprint-misti`](https://github.com/nowarp/blueprint-misti) project. If you have any problems, feel free to reach out to us in the [Misti discussion group](https://t.me/misti_dev).
