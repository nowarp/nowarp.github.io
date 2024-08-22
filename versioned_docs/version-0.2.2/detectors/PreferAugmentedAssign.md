# Prefer Augmented Assignment

Detects non-idiomatic statements that can be written using augmented assignment operators like `+=`, `-=`, etc.

## Why is it bad?
Using augmented assignment operations improves the readability of the source code and reduces the risk of mistakes, such as those that occur during copy-pasting and refactoring code.

## Example
```tact
msgValue = (msgValue - ctx.readForwardFee());
```

Use instead:
```tact
msgValue -= ctx.readForwardFee());
```
