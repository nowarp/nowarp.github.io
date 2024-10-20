# UnboundLoop
A detector that analyzes loop conditions and control flow to ensure loops have proper termination criteria.

## Why is it bad?
An unbounded loop can be problematic for several reasons:
* **Unexpected Behavior:** Without a defined termination, loops can lead to unpredictable contract behavior and make debugging difficult.
* **Out-of-gas Attacks:** Continuous looping without termination can lead to out-of-gas attacks.
* **DoS Attacks:** Malicious actors can exploit unbounded loops to create denial-of-service attacks, impacting contract's availability.

## Example
```tact
let x: Int = 10;
while (x > 0) {
  // Bad: x is not changed due looping
  send(SendParameters{ to: sender(), ... });
}
```

Use instead:
```tact
let x: Int = 10;
while (x > 0) {
  send(SendParameters{ to: sender(), ... });
  x = x - 1;
}
```
