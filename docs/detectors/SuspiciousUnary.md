# SuspiciousUnary
**Severity**: Low | **Category**: Security

A detector that highlights unusual unary expressions that look like a typo.

## Why is it bad?
Having unary expressions such as `x =+ 1` or `return + 1;` is probably a
typo. Most likely, the developer intended to use a binary operation in that
case and forgot the left-hand side expression.

## Example
```tact
a =+ 1; // Suspicious
```

Use instead:
```tact
a += 1; // Fixed
```
