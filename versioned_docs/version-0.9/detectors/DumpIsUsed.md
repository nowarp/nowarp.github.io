# DumpIsUsed
**Severity**: Info | **Category**: Security

An optional detector that highlights all the `dump` debug prints.

## Why is it bad?
The `dump` function is a debug print that shouldn't be in the final code.
Even though the compiler removes it in production, its presence suggests the
developer was debugging something. This can flag areas where issues might exist,
so auditors should take a closer look at these parts of the code.

## Example
```tact
fun test(): Int {
  // ... other computations
  let combined: Int = (RANDOM_SEED >> half_shift) &
                      (MAGIC_CONSTANT << DIVIDE_BY_TWO) ^ shift_mask;
  dump(combined); // Suspicious: Highlighted by the detector
}
```

Use instead:
```tact
fun test(): Int {
  // ... other computations
  let combined: Int = this.seed ^ shift_mask
  // OK: The code was reviewed and simplified; `dump` was removed
}
```
