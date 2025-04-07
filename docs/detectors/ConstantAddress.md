# ConstantAddress
**Severity**: Info | **Category**: Security

An optional detector that highlights all the constant addresses appearing in the source code.

## Why is it bad?
Using hardcoded addresses can sometimes indicate poor contract design.
Some constant addresses may need to be set dynamically, e.g., using
`contractAddress`, or at least have a way to change them at runtime, for
example, when upgrading a contract.

## Example
```tact
contract Main {
  proxy: Address;
  init() {
    // Bad: Constant address highlighted by the analyzer.
    self.proxy = address("UQBKgXCNLPexWhs2L79kiARR1phGH1LwXxRbNsCFF9doczSI");
  }
}
```

Use instead:
```tact
contract Main {
  proxy: Address;
  init() {
   let proxy: Proxy = initOf Proxy(myAddress());
    // OK: Address depends on how the proxy contact has been deployed
    self.proxy = contractAddress(proxy);
  }
}
```
