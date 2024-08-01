# Installation Guide
This guide will walk you through the steps to install and set up the Misti static analyzer.

## Prerequisites
Before you begin, ensure you have the following software installed on your system:
- Git
- Yarn
- Node.js
- [Soufflé](https://souffle-lang.github.io/install)

## Steps to Install
Misti is distributed via npm and should be added to your Tact project [in the same way](https://github.com/tact-lang/tact?tab=readme-ov-file#installation) as Tact itself:
```bash
yarn add @nowarp/misti
```

## Verifying the Installation

To verify that the installation was successful, you can run the following command to check the version of the static analyzer:

```bash
yarn misti --version
```

If everything is set up correctly, you should see the version number of the static analyzer and the supported version of Tact displayed in your terminal.

## Troubleshooting

If you encounter any issues during the installation process, feel free to [create an issue](https://github.com/nowarp/misti/issues/new).
