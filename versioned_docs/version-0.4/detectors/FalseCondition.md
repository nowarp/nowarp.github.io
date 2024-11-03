# FalseCondition
A detector that highlights conditions that evaluate to a constant `true` or `false`
in `if`, `while`, or `until` statements, and zero iterations in `repeat` statements.

## Why is it bad?
Conditions that always evaluate to a constant `true` or `false` are likely the result of a typo
or logic error. Such conditions can lead to unintended behavior, dead code, or incorrect control flow.
This detector helps identify these cases so they can be corrected, improving the code's reliability.

## Example
```tact
const FALSE: Bool = false;
// Bad: Always false because of operator precedence
if ((param | value) & FALSE) {
 // ... never executed
}
```

Use instead:
```tact
const FALSE: Bool = false;
// OK: Fixed after the analyzer highlighted this
if (param) {}
```
