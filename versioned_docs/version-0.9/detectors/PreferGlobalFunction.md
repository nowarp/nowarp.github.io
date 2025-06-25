# PreferGlobalFunction
**Severity**: Low | **Category**: Optimization

Detects contract methods that do not access internal state and suggests replacing them with global functions.

## Why is it bad?
- **Gas inefficiency**: Contract method calls (`self.func()`) cost more gas than global function calls (`func()`) due to unnecessary `self` context resolution.
- **Cleaner code**: Global functions better represent stateless logic, making intent clearer.

See: https://docs.tact-lang.org/book/gas-best-practices/#avoid-internal-contract-functions

## Example
```tact
contract Math {
  // Bad: `add()` doesn't use `self`
  fun add(a: Int, b: Int): Int {
    return a + b;
  }
  // other methods
}

```

Use instead:
```tact
// Good: Replace with a global function
fun add(a: Int, b: Int): Int {
  return a + b;
}
contract Math {
  // other methods
}
```
