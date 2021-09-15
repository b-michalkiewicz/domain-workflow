# domain-workflow

## Human readable workflows with error handling made easy.

Express your workflows in explicit form so anyone can understand and/or write them:

```typescript
type ParseStringToNumberError = {
    message: string;
};

type ParseStringToNumber = (_: string) => Either<ParseStringToNumberError, number>;
type NumberProcessor = (_: number) => number;
type NumberFormatter = (_: number) => string;

type FancyWorkflow = Workflow<[ParseStringToNumber, NumberProcessor, NumberFormatter]>;
```

-   `FancyWorkflow` is statically validated and it's result will be `Either<ParseStringToNumberError, string>`.
-   If we mess up your stages inputs and outputs or mix `sync`/`async` type your workflow will have `never` type so you cannot do anything with it.

Write the implementation of the stages elsewhere not to scare/bore the business team then run your workflow by:

```typescript
const fancyWorkflow: FancyWorkflow = [parseStringToNumber, numberProcessor, numberFormatter];
const fancyWorkflowResult = runWorkflow(fancyWorkflow)("42");
// fancyWorkflowResult is type is Either<ParseStringToNumberError, string>
```

Don't need to worry if the previous step is an async operation or can fail as all of these are handled automatically so you can focus on writing your stages in separation.

### Notes

Read [this](https://github.com/b-michalkiewicz/exceptionout#Either) to understand how `Either` type works.

This library was inspired by [Domain Modeling Made Functional](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/) and [The Pragmatic Programmer](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/) (part about `Transforming Programming`) books.
