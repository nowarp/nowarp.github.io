# OptimalMathFunction
A detector that highlights standard library math function calls that have more gas-efficient alternatives.

## Why is it bad?
Tact supports `log2`/`pow2` functions, which are more gas-efficient than `log(x, 2)`/`pow(x, 2)`.

## Example
```tact
log(x, 2);
```

Use instead:
```tact
log2(x)
```
