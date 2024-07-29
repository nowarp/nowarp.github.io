# Contributing Guide

Thank you for your interest in contributing to Misti. This guide provides the information you need to start, from reporting issues to coding and documentation. Your participation makes this project better.

## Issues reporting
When Misti encounters an error and crashes, it generates a report and saves it to a file, displaying a message similar to the following:

```
The error report was saved to the file: /tmp/misti/reports/2024-07-29T08-48-59-308Z.txt.
Please help us by publishing it and the input sources at:
https://github.com/nowarp/misti/issues/new.
```

We encourage you to report these issues as it helps improve the project and enhances the tool's reliability for everyone. Sharing these reports ensures that we can address and fix problems promptly, benefiting all users.

## Documentation contribution

We welcome contributions to our documentation. If you find areas that need improvement or clarification, feel free to edit, add, or suggest changes. You can create new issues related to documentation in our docs repository: [nowarp.github.io Issues](https://github.com/nowarp/nowarp.github.io/issues). Additionally, many documentation pages have an `Edit` button that allows you to make direct contributions easily.

## Code contribution

1. **Navigate Issues and Find Tasks**
   - Browse the issues [here](https://github.com/nowarp/misti/issues). Sometimes, it can be beneficial to find TODOs in the source code and tests for easy issues.
   - Choose an issue suitable for you and mention in the issue that you're working on it.

2. **Implement Your Changes**
   - Implement your changes. Feel free to ask questions in the issue if needed.

3. **Ensure Tests Pass**
   - Before creating a PR, make sure all tests are passing by running:
     ```bash
     yarn test
     ```

4. **Create a PR**
   - Submit your pull request [here](https://github.com/nowarp/misti/pulls)

All guidelines and additional hacking tips are available in the repo. For low-level details not present in the docs, refer to [HACKING.md](https://github.com/nowarp/misti/blob/master/HACKING.md).

Thank you for your contributions!
