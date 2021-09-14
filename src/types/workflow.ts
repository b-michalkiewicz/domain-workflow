import { Either } from "exceptionout";
import { HasAsyncOperation } from "./async";
import { Equal, UnwrapSuccessType } from "./common";
import { EitherOperationLefts, EitherOperationRight, HasEitherOperation } from "./either";
import { First, Last, List, OneElementList, Second, Tail, TwoOrMoreElementsList } from "./list";

export type Stage<Input = any, Output = any> = (input: Input) => Output;
export type StageList = List<Stage>;
export type StageInput<TStage extends Stage> = First<Parameters<TStage>>;

export type Workflow<Stages extends StageList> = HasAsyncOperation<Stages> extends true
    ? never
    : HasOnlyValidStages<Stages> extends true
    ? Stages
    : never;
export type AsyncWorkflow<Stages extends StageList> = HasAsyncOperation<Stages> extends false
    ? never
    : HasOnlyValidStages<Stages> extends true
    ? Stages
    : never;

export type WorkflowResult<Stages extends StageList> = HasAsyncOperation<Stages> extends true
    ? never
    : HasEitherOperation<Stages> extends true
    ? Either<EitherOperationLefts<Stages>, WorkflowResultType<Stages>>
    : WorkflowResultType<Stages>;
export type AsyncWorkflowResult<Stages extends StageList> = HasAsyncOperation<Stages> extends false
    ? never
    : HasEitherOperation<Stages> extends true
    ? Promise<Either<EitherOperationLefts<Stages>, WorkflowResultType<Stages>>>
    : Promise<WorkflowResultType<Stages>>;

type WorkflowResultType<Stages extends StageList> = UnwrapSuccessType<ReturnType<Last<Stages>>>;

type IsValidStagePair<First extends Stage, Second extends Stage> = Equal<ReturnType<First>, StageInput<Second>> extends true
    ? true
    : Equal<EitherOperationRight<First>, StageInput<Second>>;

type HasOnlyValidStages<Stages extends StageList> = TwoOrMoreElementsList<Stages> extends true
    ? IsValidStagePair<First<Stages>, Second<Stages>> extends true
        ? HasOnlyValidStages<Tail<Stages>>
        : false
    : OneElementList<Stages>;
