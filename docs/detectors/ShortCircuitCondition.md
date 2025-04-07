# ShortCircuitCondition
**Severity**: Low | **Category**: Optimization

A detector that suggests optimizing boolean expressions to leverage short-circuit evaluation.

## Why is it bad?
TVM supports short-circuit operations. When using logical AND (`&&`) or logical OR (`||`) operations,
placing constant or cheaper conditions first can prevent unnecessary execution
of expensive operations when the result is already determined.

## Example
```tact
// Bad: Expensive operation is always executed
if (expensive_function() && constant_false) {
  // ...
}
```

Use instead:
```tact
// Good: Expensive operation is skipped when constant_false is false
if (constant_false && expensive_function()) {
  // ...
}
```
