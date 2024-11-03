# UnusedOptional
A detector variables and fields with unused optional modifier.

## Why is it bad?
`Optional` is a nullable value that has a special `null` value indicating the absence
of a value. If a developer creates an optional variable or field, he should leverage
its functionality by accessing the `null` value somewhere in his code. Otherwise,
the optional type should be removed to simplify and optimize the code.

## Example
```tact
contract Test {
  a: Int?; // Bad: null value is never accessed
  init() { self.a = 42; }
  get fun getA(): Int { return self.a!!; }
}
```

Use instead:
```tact
contract Test {
  a: Int = 42; // OK: Removed optional
  get fun getA(): Int { return self.a; }
}
```
