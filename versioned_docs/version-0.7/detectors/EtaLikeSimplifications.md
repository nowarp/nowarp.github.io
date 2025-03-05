# EtaLikeSimplifications
Detects opportunities for simplifying code by eliminating redundant boolean expressions and statements.

## Why is it bad?
Redundant code can make programs less efficient and harder to read. Simplifying such code improves readability,
maintainability, and can prevent potential logical errors.

**What it checks:**
- `if` statements that return boolean literals directly based on a condition.
- Comparisons of boolean expressions with boolean literals (`true` or `false`).
- Conditional expressions (ternary operators) that return boolean literals.

## Example

```tact
// Redundant 'if' statement:
if (condition) {
    return true;
} else {
    return false;
}
// Simplify to:
return condition;

// Redundant comparison:
return a == true;
// Simplify to:
return a;

// Redundant conditional expression:
return b ? true : false;
// Simplify to:
return b;
```
