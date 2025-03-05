# SuspiciousLoop
An optional detector that identifies potentially problematic loops, such as those
with unbounded conditions or excessive iteration counts.

## Why is it bad?
Loops with always-true conditions or massive iteration limits can lead to high
gas consumption and even denial of service (DoS) issues. By flagging these loops,
this detector aids auditors in catching potential performance or security risks.

## Example
```tact
repeat (10_001) { // Bad: High iteration count
    // ...
}

while (true) { // Bad: Unbounded condition
    // ...
}
```
