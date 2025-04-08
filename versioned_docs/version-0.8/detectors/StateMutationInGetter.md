# StateMutationInGetter
**Severity**: Info | **Category**: Security

An optional detector that identifies cases where a state-mutating function is called within a getter method.

## Why is it important?
While getter methods are generally expected to be pure functions that don’t modify state,
they sometimes contain state-modifying logic (directly or indirectly). This can lead to
misunderstandings for developers who assume getters are read-only. This detector is intended
for auditors to highlight such cases as potential design concerns.

## Example
```tact
contract Example {
  value: Int = 0;

  get fun getValue(): Int {
    self.updateCounter(); // Suspicious: calls a function that modifies state
    return self.value;
  }

  fun updateCounter() {
    self.value = self.value + 1; // Modifies state
  }
}
```

Use instead:
```tact
contract Example {
  value: Int = 0;
  get fun getValue(): Int {
    return self.value; // OK: Pure getter
  }

  fun getAndIncrement(): Int {
    let current = self.value;
    self.value = self.value + 1;
    return current;
  }
}
```
