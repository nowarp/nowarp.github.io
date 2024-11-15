# DivideBeforeMultiply
A detector that identifies and corrects instances of division before multiplication to
ensure accurate mathematical operations.

## Why is it bad?
Performing division before multiplication can lead to unexpected results due to precision loss and rounding errors:
* **Precision Loss:** Dividing first can result in significant precision loss, especially when dealing with integers or fixed-point numbers.
* **Rounding Errors:** Early division might cause rounding errors that propagate through subsequent calculations.
* **Unexpected Behavior:** Incorrectly ordered operations can lead to incorrect outcomes, making debugging and maintenance more challenging.

## Example
```tact
let a: Int = 10;
let b: Int = 3;
let c: Int = 2;
// Bad: Division before multiplication
let result: Int = a / b * c;
```

Use instead:
```tact
let a: Int = 10;
let b: Int = 3;
let c: Int = 2;
// Correct: Multiplication before division
let result: Int = a * c / b;
```
