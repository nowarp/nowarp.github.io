# UnusedMethodArgument
**Severity**: Low | **Category**: Optimization

Detects method calls where an argument is always the same constant or contract field,
suggesting removal of the redundant parameter for gas optimization.

## Why is this bad?
Passing the same value every damn time wastes gas and clutters the code.
If an argument is always `self.a` or a literal like `42`, just hardcode it inside the method.

## What it checks
- Arguments that are always the same contract field (`self.x`, `self.y`, etc.).
- Arguments that are always the same literal (e.g., `true`, `42`, `"fixed_string"`).

## Example

```tact
contract C {
  a: Int = 0;
  receive() { self.nextA(self.a); }
  receive("whatever") { self.nextA(self.a); }
  fun nextA(a: Int): Int {
    return a + 1; // Bad: `self.a` is always passed, so the parameter is useless
  }
}
```

Use instead:
```tact
contract C {
  a: Int = 0;
  receive() { self.nextA(); }
  receive("whatever") { self.nextA(); }
  fun nextA(): Int {
    return self.a + 1; // OK: Use `self.a` directly
  }
}
```
