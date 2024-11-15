# UnboundMap
An optional detector that highlights cases where a map field allows inserting
values (e.g., via `.set`) but lacks functionality for removing entries (e.g., via `.del`).

## Why is it bad?
A map without a method to remove elements can lead to storage overflow, particularly
in long-term contract usage. Failing to provide a way to clear or delete entries
can result in uncontrolled storage growth, which not only wastes resources but
may also increase the cost of contract execution and maintenance over time.

## Example
```tact
contract Test {
    map: Map<Int, String>;

    setEntry(key: Int, value: String) {
        self.map.set(key, value); // Bad
    }
}
```

Use instead:
```tact
contract Test {
    map: Map<Int, String>;

    setEntry(key: Int, value: String) {
        self.map.set(key, value);
    }

    delEntry(key: Int) {
        self.map.del(key); // Fixed: Added a new API method
    }
}
```
