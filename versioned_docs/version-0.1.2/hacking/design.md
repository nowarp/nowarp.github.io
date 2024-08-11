# Design Overview

## Static Analysis

Misti is a static analyzer, a tool that examines code without executing it, identifying potential errors, security vulnerabilities, and code quality issues.

## Souffle Datalog Solver

Misti leverages the [Souffle Datalog solver](https://souffle-lang.github.io), an industry-grade and highly efficient Datalog solver designed specifically for program analysis. Souffle provides native parallel execution and is extremely fast, making it an ideal choice for analyzing complex codebases.

## Dataflow Analysis in Misti

Misti offers an interface to describe classic dataflow problems. It includes a lattice interface and provides a mechanism to solve these problems using the worklist algorithm. This allows for efficient and accurate analysis of data flow within the code.

## References

For those interested in learning more about static analysis and dataflow analysis, the following books are recommended:

- [Anders Møller and Michael I. Schwartzbach – Static Program Analysis](https://cs.au.dk/~amoeller/spa/spa.pdf)
- Uday Khedker et al. – Data Flow Analysis: Theory and Practice

These resources provide a solid foundation in the theory and practice of static and dataflow analysis.
