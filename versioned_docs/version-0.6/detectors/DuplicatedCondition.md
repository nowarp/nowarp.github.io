# DuplicatedCondition
A detector that finds duplicated conditions appearing in conditional expressions.

## Why is it bad?
Typically, these cases are developer errors caused by copy-pasting code, leading
to unreachable code.

## Example
```tact
fun test(a: Int): Int {
  if (a < 1) { return 1; }
  else if (a > 4) { return 2; }
  // Bad: A developer copy-pasted the condition
  else if (a > 4) { return 3; }
  return 4;
}
```

Use instead:
```tact
fun test(a: Int): Int {
  if (a < 1) { return 1; }
  else if (a > 4) { return 2; }
  // OK: Fixed
  else if (a < x) { return 3; }
  return 4;
}
```
