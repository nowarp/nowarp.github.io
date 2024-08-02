# Zero Address

A detector that identifies uses of the zero address.

## Why is it bad?
Using the zero address in smart contracts is typically problematic because it can be
exploited as a default or uninitialized address, leading to unintended transfers and
security vulnerabilities. Additionally, operations involving the zero address can
result in loss of funds or tokens, as there is no private key to access this address.

## Example
```tact
contract Proxy {
  to: Address;
  init() {
    // Warning: Insecure usage of zero address as default value
    self.to = newAddress(0, 0);
  }
  fun setAddress(to: Address) {
    self.to = to
  }
}
```

Use instead:
```tact
contract Proxy {
  to: Address;
  init(to: Address) {
    // Fixed: Using the input value on initializaiton.
    self.to = to;
  }
  fun setAddress(to: Address) {
    self.to = to
  }
}
```
