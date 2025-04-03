# PreferSenderFunction
A detector that finds `context().sender` calls that could be replaced with
more gas-effective `sender()` call.

## Why is it bad?
You can obtain the address of the message sender using either the `Context`
struct or the `sender` function. If you only need the address and no
additional context on the incoming message , you should prefer less
gas-expensive `sender()`.

See: https://docs.tact-lang.org/book/gas-best-practices/#use-sender-over-contextsender

## Example
```tact
let ctx = context(); // Bad: only .sender is accessed
message(MessageParameters{
  to: ctx.sender,
  value: ton("0.05"),
});
```

Use instead:
```tact
message(MessageParameters{
  to: sender(),
  value: ton("0.05"),
});
```
