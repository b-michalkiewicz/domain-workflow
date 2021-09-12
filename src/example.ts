/* eslint-disable @typescript-eslint/no-unused-vars */
import { Either, Left, Right } from "exceptionout";
import { runAsyncWorkflow, runWorkflow } from "./domain-workflow";
import { AsyncWorkflow, Workflow } from "./types";

// Write these types with your domain expert
type ParseStringToNumberError = {
    message: string;
};

type NumberProcessor = (_: number) => number;
type NumberFormatter = (_: number) => string;
type ParseStringToNumber = (_: string) => Either<ParseStringToNumberError, number>;
type AsyncNumberFormatter = (_: number) => Promise<string>;

type SimpleWorkflow = Workflow<[NumberProcessor, NumberFormatter]>;
type WorkflowWithPossibleError = Workflow<[ParseStringToNumber, NumberProcessor, NumberFormatter]>;

type AsyncSimpleWorkflow = AsyncWorkflow<[NumberProcessor, AsyncNumberFormatter]>;
type AsyncWorkflowWithPossibleError = AsyncWorkflow<[ParseStringToNumber, NumberProcessor, AsyncNumberFormatter]>;

type InvalidWorkflow1 = Workflow<[NumberFormatter, NumberProcessor]>; // type is `never` since input does not match output
type InvalidWorkflow2 = Workflow<[NumberProcessor, AsyncNumberFormatter]>; // type is `never` since it has async operation and type is sync
type InvalidWorkflow3 = AsyncWorkflow<[NumberProcessor, NumberFormatter]>; // type is `never` since it hasn't got any async operation and type is async

// Write implementation after event storming session
const numberProcessor: NumberProcessor = (n: number) => n + 42;
const numberFormatter: NumberFormatter = (n: number) => `our secret number is ${n.toString()}`;
const asyncNumberFormatter: AsyncNumberFormatter = (n: number) => Promise.resolve(`our secret number from the future is ${n.toString()}`);
const parseStringToNumber: ParseStringToNumber = (s: string) => {
    const n = Number(s);
    return Number.isNaN(n) ? Left.of({ message: `'${s}' cannot be parsed to number` }) : Right.of(n);
};

const simpleWorkflow: SimpleWorkflow = [numberProcessor, numberFormatter];
const workflowWithPossibleError: WorkflowWithPossibleError = [parseStringToNumber, numberProcessor, numberFormatter];
const asyncSimpleWorkflow: AsyncSimpleWorkflow = [numberProcessor, asyncNumberFormatter];
const asyncWorkflowWithPossibleError: AsyncWorkflowWithPossibleError = [parseStringToNumber, numberProcessor, asyncNumberFormatter];

// Results
const simpleWorkflowResult = runWorkflow(simpleWorkflow)(12); // type is string
console.log(simpleWorkflowResult); // => our secret number is 54

const workflowWithPossibleErrorResult = runWorkflow(workflowWithPossibleError)("34"); // type is Either<ParseStringToNumberError, string>
console.log(workflowWithPossibleErrorResult.value); // => our secret number is 76

const workflowWithError: Workflow<[NumberFormatter, ParseStringToNumber, NumberProcessor]> = [numberFormatter, parseStringToNumber, numberProcessor];
const workflowWithErrorResult = runWorkflow(workflowWithError)(42); // type is Either<ParseStringToNumberError, number>
console.log(workflowWithErrorResult.value)

const asyncSimpleWorkflowResult = runAsyncWorkflow(asyncSimpleWorkflow)(56); // type is Promise<string>
asyncSimpleWorkflowResult.then(console.log); // => our secret number from the future is 98

const asyncWorkflowWithPossibleErrorResult = runAsyncWorkflow(asyncWorkflowWithPossibleError)("78"); // type is Promise<Either<ParseStringToNumberError, string>>
asyncWorkflowWithPossibleErrorResult.then(console.log);
