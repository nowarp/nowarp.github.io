# PreferredStdlibApi
An optional detector that flags the use of advanced functions from the standard library.

## Why is it bad?
Auditors should pay extra attention to these functions, as incorrect usage can
lead to subtle bugs. Safer stdlib alternatives should be preferred in the code.

Supported functions:
* Use `send` instead of [`nativeSendMessage`](https://docs.tact-lang.org/ref/core-advanced#nativesendmessage)
* Prefer `randomInt` instead of [`nativeRandom`](https://docs.tact-lang.org/ref/core-advanced#nativerandom)
* Replace `emptyCell().asSlice()` with `emptySlice()`
* Replace `beginCell().endCell()` with `emptyCell()`
* Replace `require` with `throwUnless`

## Example
```tact
let pkg: Slice = msg.transfer;
let _seqno: Int = pkg.loadInt(32);
let mode: Int = pkg.loadInt(8);
let body: Cell = pkg.loadRef();
// Bad: prefer `send` to avoid low-level manipulation of Slice
nativeSendMessage(body, mode);
```

Use instead:
```tact
// Safer: More explicit definition of the send operation
send(SendParameters{ value: amount,
                     to: self.owner,
                     mode: mode,
                     body: beginCell().endCell() });
```
