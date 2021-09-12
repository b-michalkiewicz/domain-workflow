import { isEither } from "exceptionout";
import { AsyncWorkflow, AsyncWorkflowOutput, First, Stage, StageInput, Stages, Workflow, WorkflowOutput } from "./types";

const processStage = (input: StageInput, stage: Stage) => (isEither(input) ? input.map(stage) : stage(input));

export const runAsyncWorkflow =
    <S extends Stages>(workflow: AsyncWorkflow<S>) =>
    (workflowInput: StageInput<First<S>>): AsyncWorkflowOutput<S> =>
        workflow.reduce(async (input, stage) => processStage(await Promise.resolve(input), stage), workflowInput);

export const runWorkflow =
    <S extends Stages>(workflow: Workflow<S>) =>
    (workflowInput: StageInput<First<S>>): WorkflowOutput<S> =>
        workflow.reduce(processStage, workflowInput);
