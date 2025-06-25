# DuplicatedImport
**Severity**: Medium | **Category**: Optimization

A detector that warns about duplicated imports.

## Why is it bad?
Duplicated imports lead to compilation time overhead and might reveal poor
contract design when a developer forgets to add a real import.

## Example
```tact
import "./utils";
import "./utils.tact";
```

Use instead:
```tact
import "./utils";
```
