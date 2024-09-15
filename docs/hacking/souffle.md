# Soufflé Integration Guide

## What is Soufflé?

[Soufflé](https://souffle-lang.github.io) is a highly efficient Datalog solver designed specifically for program analysis. It offers native parallel execution, making it incredibly fast and suitable for handling complex static analysis tasks. By leveraging Soufflé, Misti can perform deep and scalable analyses of smart contracts.

## Benefits of Using Soufflé for Static Analysis

Soufflé allows to express static analysis problems declaratively, making it easier to define and solve complex queries over the code's intermediate representation (IR). In some cases writing a Soufflé program might be more straightforward then implementing a complex transfer function in for a classic monotone framework.

## Soufflé Integration in Misti

The API for interacting with Soufflé in Misti is implemented in the [Souffle.js library](https://github.com/nowarp/souffle.js). See the [Souffle.js API reference](https://nowarp.io/lib/souffle-js/api/) for more detailed information.

### Creating Soufflé Programs

To create a Soufflé program within Misti, you need to declare relations, rules and generate facts based on the IR. Here is an example from the built-in "readonly variables" detector:

```typescript
addDecls(ctx: Context<SrcInfo>) {
  ctx.add(
    Relation.from(
      "varDecl",
      [
        ["var", FactType.Symbol],
        ["func", FactType.Symbol],
      ],
      undefined,
    ),
  );
  // other declarations
}
```

```typescript
addRules(ctx: Context<SrcInfo>) {
    // readOnly(var, func) :-
    //     varDecl(var, func),
    //     !varAssign(var, func),
    //     !varUse(var, func).
    ctx.add(
      Rule.from(
        [makeAtom("readOnly", ["var", "func"])],
        makeRuleBody(makeAtom("varDecl", ["var", "func"])),
        makeRuleBody(makeAtom("varAssign", ["var", "func"]), {
          negated: true,
        }),
        makeRuleBody(makeAtom("varUse", ["var", "func"]), { negated: true }),
      ),
    );
  }
```

### Generating Facts and Executing Soufflé

After declaring the necessary relations, you need to iterate over the IR to generate facts for these declarations. Then, use the built-in Soufflé executor to run the analysis:

```typescript
const executor = ctx.config.soufflePath
  ? new Executor<SrcInfo>({
      inputDir: ctx.config.soufflePath,
      outputDir: ctx.config.soufflePath,
    })
  : new Executor<SrcInfo>();

const result = executor.executeSync(program);

if (!result.success) {
  throw new Error(
    `Error executing Soufflé for ${this.id}:\n${result.stderr}`,
  );
}

const warnings = Array.from(result.results.entries.values()).map((fact) => {
  // raise warnings
});
```

### Learning from Existing Code

We recommend studying the existing codebase, as it is well-documented and provides a comprehensive overview of integrating Soufflé with Misti. This will help you understand the intricacies of generating IR and executing Soufflé programs effectively.

## Further Reading

For a deeper understanding of static analysis using Soufflé, refer to the textbook *[Program Analysis: An Appetizer](https://arxiv.org/pdf/2012.10086)* by Flemming Nielson and Hanne Riis Nielson. It discusses Soufflé-based analysis in greater detail and is an excellent resource for both beginners and experienced developers in the field.
