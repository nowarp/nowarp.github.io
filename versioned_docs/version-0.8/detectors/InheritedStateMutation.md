# InheritedStateMutation
**Severity**: Low | **Category**: Best Practices

An optional detector that highlights all instances where inherited trait variables
are directly modified.

## Why is it bad?
Traits should provide setter methods to ensure that invariants related to their
state are preserved. Directly modifying trait variables (e.g., `self.traitVar = 42`)
can violate these invariants, leading to potential bugs or security vulnerabilities.
This detector warns when such direct modifications occur, prompting further review
by auditors.

## Example
```tact
trait T {
  balance: Int;
}

contract C with T {
  balance: Int = 42;
  fun updateBalance() {
    self.balance = 100; // Suspicious: Highlighted by the detector
  }
}
```

Use instead:
```tact
trait T {
  balance: Int;
  fun setBalance(newBalance: Int) {
    require(newBalance > 0, "balance cannot be negative"); // Invariant check
    self.balance = newBalance;
  }
}

contract C with T {
  balance: Int = 42;
  fun updateBalance() {
    self.setBalance(100); // OK: Invariant preserved
  }
}
```
