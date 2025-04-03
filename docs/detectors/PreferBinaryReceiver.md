# PreferBinaryReceiver
A detector that identifies usage of text receivers that could be replaced
with binary ones.

## Why is it bad?
To prevent conflicts with binary message bodies, text receivers route based
on the hash of the message body contents. This is an expensive operation
that requires more than 500 units of gas.

See: https://docs.tact-lang.org/book/gas-best-practices/#prefer-binary-receivers-to-text-receivers

## Example
```tact
receive("one") {}
```

Use instead:
```tact
message(1) One {}
receive(_: One) {}
```
