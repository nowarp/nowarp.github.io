# SuspiciousMessageMode
Detects suspicious usage of the `mode` field in `SendParameters` struct instances.

## Why is it bad?
Incorrect usage of the `mode` field in `SendParameters` can lead to unintended behavior when sending messages,
such as incorrect flags being set, which can cause security vulnerabilities or unexpected contract behavior.

**What it checks:**
- Ensures that the `mode` expression only uses the bitwise OR operator `|`.
- Warns if integer literals are used instead of symbolic constants.
- Warns if the same flag is used multiple times in the `mode` expression.

## Example

```tact
// Suspicious usage:
send(SendParameters{
    to: recipient,
    value: amount,
    mode: SendRemainingBalance | SendRemainingBalance // Bad: Duplicate flag
});

// Correct usage:
send(SendParameters{
    to: recipient,
    value: amount,
    mode: SendRemainingBalance | SendDestroyIfZero // Ok
});
```
