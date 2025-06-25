# Design Overview

## Static Analysis

Misti is a static analyzer, a tool that examines code without executing it, identifying potential errors, security vulnerabilities, and code quality issues.

## Detector Types

### AST-Based Analyses

Typically, having only an AST is sufficient to implement simple detectors that can produce findings and highlight dangerous patterns in the source code. Misti provides access to the AST of the contracts through a specialized [`AstStore`](https://nowarp.io/api/misti/classes/internals_ir_astStore.AstStore.html) class that maps unique AST identifiers to their definitions.

### Dataflow Analyses Based on the Monotone Framework

Misti offers an interface for describing classic dataflow problems. It includes a lattice interface and provides a mechanism to solve these problems using the worklist algorithm, allowing for efficient and accurate analysis of data flow within the code.

Those interested in the implementation of Dataflow analysis should refer to the API documentation of Misti internals and review the source code of built-in detectors inherited from the [`DataflowDetector`](https://nowarp.io/api/misti/classes/detectors_detector.DataflowDetector.html) class.

### Soufflé-Based Analyses

Misti leverages the [Soufflé Datalog solver](https://souffle-lang.github.io), an industry-grade and highly efficient Datalog solver specifically designed for program analysis. Soufflé provides native parallel execution and is extremely fast, making it an ideal choice for analyzing complex codebases.

Typically, you should implement Soufflé-based analysis if it is simpler to express your problem in Datalog than to write a transfer function for monotone framework.

## References

For those interested in learning more about static analysis and dataflow analysis, the following books are recommended:

- [Anders Møller and Michael I. Schwartzbach – Static Program Analysis](https://cs.au.dk/~amoeller/spa/spa.pdf)
- Uday Khedker et al. – Data Flow Analysis: Theory and Practice

These resources provide a solid foundation in the theory and practice of static and dataflow analysis.
