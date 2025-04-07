# ImplicitOpcode
**Severity**: Info | **Category**: Best Practices

An optional detector that highlights messages with implicitly defined opcode.

## Why is it bad?
Tact automatically generates these unique IDs (opcodes) for every received
message, but developers can specify a message opcode explicitly. This enables
handling of specific opcodes in the receiver explicitly, which may be
convenient when interacting with FunC contracts.

See:
* https://docs.tact-lang.org/book/structs-and-messages/#message-opcodes

## Example
```tact
message TokenNotification {
  forwardPayload: Slice as remaining;
}
```

Use instead:
```tact
message(0x7362d09c) TokenNotification {
  forwardPayload: Slice as remaining;
}
```
