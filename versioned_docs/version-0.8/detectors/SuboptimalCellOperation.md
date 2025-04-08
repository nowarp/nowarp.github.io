# SuboptimalCellOperation
**Severity**: Medium | **Category**: Optimization

A detector that highlights `Cell` operations that could be optimized with
more gas-effective calls.

### Why is it bad?
There are several methods in the stdlib structures that provide a more
efficient API for the intended logic.

Currently, this detector suggests:
* Replacing `load*` with `skip*` when the result is unused.

## Example
```tact
fun test(s: Slice) {
  s.loadInt(8); // Bad: result is unused
}
```

Use instead:
```tact
fun test(s: Slice) {
  s.skipBits(8); // OK
}
```
