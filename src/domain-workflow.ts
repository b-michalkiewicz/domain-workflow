import { Either, isEither } from "exceptionout";
import { AsyncWorkflow, AsyncWorkflowResult, First, Stage, StageInput, StageList, Workflow, WorkflowResult } from "./types";

export const runAsyncWorkflow =
    <Stages extends StageList>(workflow: AsyncWorkflow<Stages>) =>
    (workflowInput: StageInput<First<Stages>>): AsyncWorkflowResult<Stages> =>
        workflow.reduce(async (input, stage) => processStage(await Promise.resolve(input), stage), workflowInput);

export const runWorkflow =
    <Stages extends StageList>(workflow: Workflow<Stages>) =>
    (workflowInput: StageInput<First<Stages>>): WorkflowResult<Stages> =>
        workflow.reduce(processStage, workflowInput);

const processStage = (input: unknown, stage: Stage) => (isEither(input) ? processEither(input.map(stage)) : stage(input));
const processEither = (either: Either<unknown, unknown>) => (either.isLeft() ? either : either.value);
