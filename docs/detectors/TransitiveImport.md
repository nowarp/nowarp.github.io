# TransitiveImport
**Severity**: Medium | **Category**: Best Practices

A detector that warns about transitive imports.

## Why is it bad?
Tact allows transitive imports, which it should not have in the first place
since it might hinder the intended logic.

## Example
```tact
// a.tact
const Foo: Int = 42;

// b.tact
import "./a";
const Bar: Int = 43;

// c.tact
import "./b";

// here Foo and Bar are both available
```

Use instead:
```tact
// a.tact
const Foo: Int = 42;

// b.tact
import "./a";
const Bar: Int = 43;

// c.tact
import "./a"; // Fixed: Explicit import
import "./b";

// here Foo and Bar are both available
```
