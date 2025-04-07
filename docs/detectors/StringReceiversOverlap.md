# StringReceiversOverlap
**Severity**: High | **Category**: Security

A detector that finds overlapping messages between general string receivers and string receivers.

## Why is it bad?
Constant string receivers and general string receivers can have overlapping messages
in which case the constant string receiver always takes precedence.

## Example
```tact
contract Test {
  receive("foobar") { throw(1042) }
  receive(msg: String) {
    if (msg == "foobar") { throw(1043)  } // Bad: Dead code
  }
}
```

Use instead:
```tact
contract Test {
  receive("foobar") { throw(1042) }
  receive(msg: String) {}
}
```
