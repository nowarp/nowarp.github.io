# Installation Guide
This guide will walk you through the steps to install and set up the Misti static analyzer.

## Prerequisites
Before you begin, ensure you have the following software installed on your system:
- Git
- Yarn
- Node.js

## Steps to Install

### 1. Clone the Repository

First, clone the repository from GitHub to your local machine.

```bash
git clone https://github.com/nowarp/misti
cd misti
```

### 2. Install Dependencies

Navigate to the cloned repository's directory and install the necessary dependencies using Yarn.

```bash
yarn install
```

### 3. Build the Project

After installing the dependencies, build the project with the following command:

```bash
yarn build
```

## Verifying the Installation

To verify that the installation was successful, you can run the following command to check the version of the static analyzer:

```bash
./bin/misti --version
```

If everything is set up correctly, you should see the version number of the static analyzer displayed in your terminal.

## Troubleshooting

If you encounter any issues during the installation process, feel free to [create an issue](https://github.com/nowarp/misti/issues/new).
