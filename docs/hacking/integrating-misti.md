# Integrating Misti

Misti can be integrated into third-party tools such as custom DevSecOps pipelines, code security platforms, IDEs, or editors.

## Running Misti in Web Environment
Misti can be executed directly in a web browser environment. In this context, all detectors will be enabled except those requiring Souffle.

For a reference implementation, see the [TON Studio Web IDE](https://github.com/tact-lang/web-ide/).

## Accessing Misti Output
When the `--output-format json` [flag](../tutorial/configuration.md) is set, Misti will output structured information about warnings in JSON format.

The JSON schema for this output can be found in the repository: [mistiOutput.json](https://github.com/nowarp/misti/blob/master/mistiOutput.json)

## Integration Examples
* [TON Studio Web IDE](https://github.com/tact-lang/web-ide/)
* [Tact Language Server](https://github.com/tact-lang/tact-language-server/)
