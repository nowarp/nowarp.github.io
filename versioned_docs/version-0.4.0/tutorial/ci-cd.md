# Integrating Misti into CI/CD

Integrating Misti into your CI/CD pipeline ensures continuous code quality checks, catching issues early in the development cycle.

## Using Tact Template
[`tact-template`](https://github.com/tact-lang/tact-template) is a template project for Tact. If you started your project from this template, Misti is already installed in [the CI](https://github.com/tact-lang/tact-template/tree/main/.github/workflows). You also have the `yarn lint` command available in your `package.json`.

## GitHub Actions
To integrate Misti into your GitHub Actions workflow, you need to add a command that runs Misti as part of your CI process. Here's how you can do it:

**1. Open your GitHub repository**

**2. Create or edit the GitHub Actions workflow YAML file**

It could be located at e.g., `.github/workflows/ci.yml`.

**3. Add the step to run Misti to your YAML file**

For example:

```yaml
name: CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  test:
    strategy:
      fail-fast: false
      matrix:
        node-version: [22]
        os: [ubuntu-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Install Soufflé on Ubuntu
        if: matrix.os == 'ubuntu-latest'
        run: |
          sudo wget https://souffle-lang.github.io/ppa/souffle-key.public -O /usr/share/keyrings/souffle-archive-keyring.gpg
          echo "deb [signed-by=/usr/share/keyrings/souffle-archive-keyring.gpg] https://souffle-lang.github.io/ppa/ubuntu/ stable main" | sudo tee /etc/apt/sources.list.d/souffle.list
          sudo apt update
          sudo apt install souffle

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: yarn install

      - name: Run Misti
        run: yarn misti --min-severity medium /path/to/your/tact.config.json
```

The `yarn misti --min-severity medium /path/to/your/tact.config.json` command will run Misti against your project. If Misti detects any issues that are not suppressed by your configuration, it will return a non-zero exit code, causing the CI pipeline to fail.

The `--min-severity medium` will filter out low-priority warnings. You can always run Misti with all the detectors enabled locally in order to get the most comprehensive warnings output: `yarn misti --all-detectors /path/to/your/tact.config.json`

**4. Adjusting the Misti Configuration**

If you find that Misti is too noisy (e.g., detecting issues that are not relevant to your project), you can adjust your Misti configuration file to suppress those warnings. Refer to the [Configuration](./configuration) section for more details on how to customize your settings.

## Integration with Blueprint Projects
To add Misti to the CI for your Blueprint project, follow these steps:
1. [Install `blueprint-misti`](./blueprint.md).
2. Follow the steps to set up the GitHub action above, but replace the `yarn misti` command with `npx blueprint misti --blueprint-project <PROJECT_NAME>`, where `<PROJECT_NAME>` is the name of the project displayed when you run `npx blueprint build`.
