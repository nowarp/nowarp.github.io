# FieldDoubleInit
**Severity**: Medium | **Category**: Optimization

A detector that highlights cases where a field is initialized both in the
`init` function and at the point of definition.

## Why is it bad?
Double initialization of fields can either be a programmer's mistake or simply
a waste of gas. It is always preferred to initialize values in the field declaration
if they have a compile-time evaluatable default value, or in the `init` function if
they must be initialized dynamically.

## Example
```tact
contract Test {
    a: Int = 0; // Bad
    init(x: Int) { self.a = x }
}
```

Use instead:
```tact
contract Test {
    a: Int; // Fixed
    init(x: Int) { self.a = x }
}
```
