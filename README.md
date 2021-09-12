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

- `FancyWorkflow` is statically validated and it's result will be `Either<ParseStringToNumberError, string>`.
- If we mess up your stages inputs and outputs or mix `sync`/`async` type your workflow will have `never` type so you cannot do anything with it.

Write the implementation of the stages elsewhere not to scare/bore the business team and run your workflow by:
```typescript
const fancyWorkflow: FancyWorkflow = [parseStringToNumber, numberProcessor, numberFormatter];
const fancyWorkflowResult = runWorkflow(fancyWorkflow)("42"); 
// fancyWorkflowResult is type is Either<ParseStringToNumberError, string> as parsing string into number can fail
```
Don't need to worry if the previous step is an async operation or can fail all of these are handled automatically so you can focus on writing your stages in separation.

See [here](./src/example.ts) for more references.
