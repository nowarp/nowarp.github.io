# RedundantBooleanExpression
**Severity**: Medium | **Category**: Security

Detects redundant or duplicated operands in boolean expressions.

## Why is it bad?
Duplicate conditions add no logical value, waste computation, and may indicate
copy-paste errors or logic mistakes.

## Example

```tact
// Bad: (self.a == 0) is checked twice
return (self.a == 0) || (self.a == 0);
```

Use instead:
```tact
// Fix: Remove the duplicate
return (self.a == 0);
```
