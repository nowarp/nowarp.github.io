# Integrating Misti into CI/CD

Integrating Misti into your CI/CD pipeline ensures continuous code quality checks, catching issues early in the development cycle.

## GitHub Actions

To integrate Misti into your GitHub Actions workflow, you need to add a command that runs Misti as part of your CI process. Here's how you can do it:

1. Open your GitHub repository.
2. Create or edit the GitHub Actions workflow YAML file (e.g., `.github/workflows/main.yml`).

3. Add the step to run Misti to your YAML file. For example:

   ```yaml
   name: Run Misti
   on: [push, pull_request]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout code
           uses: actions/checkout@v2

         - name: Install dependencies
           run: npm install

         - name: Run Misti
           run: npx misti /path/to/your/tact.config.json
           ```

The `npx misti /path/to/your/tact.config.json` command will run Misti against your project. If Misti detects any issues that are not suppressed by your configuration, it will return a non-zero exit code, causing the CI pipeline to fail.

4. Adjusting the Misti Configuration:

If you find that Misti is too noisy (e.g., detecting issues that are not relevant to your project), you can adjust your Misti configuration file to suppress those warnings. Refer to the [Configuration](./configuration) section for more details on how to customize your settings.
