# BranchDuplicate
Detector that reports duplicated code in conditional branches.

## Why is it bad?
Duplicated code in branches is bad because it:
1. **Reduces Readability**: Repetition makes the code harder to understand.
2. **Increases Maintenance**: Changes must be made in multiple places, risking errors.
3. **Signals Poor Design**: It suggests missed opportunities for cleaner, more abstract code.

## Example
```tact
if (a > 42) {
  a = 43; // bad: duplicated code
} else {
  a = 43;
}
```

Use instead:
```tact
if (a > 42) {
  a = inc(b); // ok
} else {
  a = 43;
}
```
