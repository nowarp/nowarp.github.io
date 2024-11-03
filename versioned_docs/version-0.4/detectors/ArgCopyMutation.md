# ArgCopyMutation
A detector that highlights cases where function argument mutations are ineffective
due to [call-by-value semantics](https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_value) in Tact.

## Why is it bad?
In Tact, function arguments are passed by value, meaning that any mutations applied
to these arguments will only affect the local copy of the variable within the function.
Such mutations are unobservable outside the function, except for potentially
increasing gas consumption or causing exceptions.

## Example
```tact
fun addEntry(m: map<Int,Int>) {
  m.set(1, 10); // Bad: Mutating the copy
}
```

Use instead:
```tact
fun addEntry() {
  self.m.set(1, 10); // OK: Changing contract's state
}
```

Alternatively, you could redesign the method:
```tact
fun generateNewValue(): Int {
  // ... produce new value for the map
  return self.nextValue + 1;
}

m.set(self.nextKey, self.generateNewValue()); // OK
```
