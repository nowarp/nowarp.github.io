# UnprotectedCall
A detector that identifies unprotected calls or state modifications.

## Why is it bad?
Without conditions or permission checks, some calls can be exploited to
disrupt the contract's intended behavior or allow malicious actors to
perform unauthorized actions. For example, a publicly accessible `set`
function in a mapping or an unguarded `send` call can enable draining
contract's funds, denial-of-service (DoS) attacks or other malicious
activities.

## Example
```tact
receive(msg: Insert) {
    // Bad: No protection for the mapping update
    m.set(msg.key, msg.val);
}
```

Use instead:
```tact
receive(msg: Insert) {
    // OK: Permission check ensures only the owner can modify the state
    require(ctx.sender == this.owner, "Invalid sender");
    m.set(msg.key, msg.val);
}
```
