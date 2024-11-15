# ReadOnlyVariables
A detector that identifies read-only variables and fields.

## Why is it bad?
These variables could typically be replaced with constants to optimize performance.
Alternatively, identifying read-only variables may reveal issues where unused values are being replaced unintentionally.

## Example
```tact
fun calculateFinalPrice(price: Int): Int {
  // Warning: the developer uses a read-only variable that could be a constant
  let DISCOUNT_AMOUNT: Int = 10;
  return price - DISCOUNT_AMOUNT;
}
```

Use instead:
```tact
const DISCOUNT_AMOUNT: Int = 10;

fun calculateFinalPrice(price: Int): Int {
  // OK: Fixed after the analyzer highlighted this warning
  return price - DISCOUNT_AMOUNT;
}
```
