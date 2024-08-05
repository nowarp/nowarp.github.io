# Getting started
This guide will walk you through the steps to install and set up the Misti static analyzer.

## Prerequisites
Before you begin, ensure you have the following software installed on your system:
- Git
- Yarn
- Node.js
- [Soufflé](https://souffle-lang.github.io/install)

## Installation
Misti is distributed via npm and should be added to your Tact project [in the same way](https://github.com/tact-lang/tact?tab=readme-ov-file#installation) as Tact itself:
```bash
yarn add @nowarp/misti
```

## Running the analysis
Run Misti by specifying a Tact project configuration:
```
npx misti test/projects/simple/tactConfig.json
```

This will highlight any warnings the analyzer found.

## Troubleshooting
If you encounter any issues during the installation process, feel free to [create an issue](https://github.com/nowarp/misti/issues/new) or ask in the [Misti Telegram group](https://t.me/misti_dev).
