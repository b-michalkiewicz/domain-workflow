import { isEither } from "exceptionout";
import { AsyncWorkflow, AsyncWorkflowResult, First, Stage, StageInput, StageList, Workflow, WorkflowResult } from "./types";

const processStage = (input: StageInput<any>, stage: Stage) => (isEither(input) ? input.map(stage) : stage(input));

export const runAsyncWorkflow =
    <S extends StageList>(workflow: AsyncWorkflow<S>) =>
    (workflowInput: StageInput<First<S>>): AsyncWorkflowResult<S> =>
        workflow.reduce(async (input, stage) => processStage(await Promise.resolve(input), stage), workflowInput);

export const runWorkflow =
    <S extends StageList>(workflow: Workflow<S>) =>
    (workflowInput: StageInput<First<S>>): WorkflowResult<S> =>
        workflow.reduce(processStage, workflowInput);
