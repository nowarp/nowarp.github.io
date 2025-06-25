# NeverAccessedVariables
**Severity**: Medium | **Category**: Security

A detector that identifies write-only or unused variables, fields and constants.

## Why is it bad?
These variables are either assigned but never used in any meaningful computation,
or they are declared and never used at all, which may indicate redundant code
or an incomplete implementation of the intended logic.

## Example
```tact
// Error: the developer forgot to use the constant
const MAX_SUPPLY: Int = 1000;

fun mint(to: Address, amount: Int) {
  balances.set(to, balances.get(to)!! + amount);
  totalSupply += amount;
}
```

Use instead:
```tact
const MAX_SUPPLY: Int = 1000;

fun mint(to: Address, amount: Int) {
  // OK: Fixed after the analyzer highlighted this warning
  require(totalSupply + amount <= MAX_SUPPLY, "Exceeds max supply");
  balances.set(to, balances.get(to)!! + amount);
  totalSupply += amount;
}
```
