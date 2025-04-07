# UnusedExpressionResult
**Severity**: Medium | **Category**: Security

A detector that identifies expression statements whose result is unused.

## Why is it bad?
Expression statements that don't alter the contract's state and whose results are not used
can lead to inefficiency, dead code, and potential confusion. They add unnecessary complexity
without contributing to the logic or state of the contract.

## Example
```tact
self.foo == 3; // Warning: unused boolean expression
inc(a); // Warning: unused return value
```

Use instead:
```tact
self.foo = 3; // Fixed: corrected assignment
newValue = inc(a); // OK: result is now used
let _ = inc(a); // OK: explicitly ignored
```
