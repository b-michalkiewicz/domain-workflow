import { Either } from "exceptionout";
import {
    EitherOpRight,
    EitherOpsLefts,
    Equal,
    First,
    HasAsyncOp,
    HasEitherOp,
    Last,
    OneElementList,
    PromiseLikeArg,
    Second,
    Tail,
    TwoOrMoreElementsList,
} from "./generic";

export type Stage<Input = any, Output = any> = (input: Input) => Output;
export type Stages = ReadonlyArray<Stage>;
export type StageInput<S extends Stage = any> = First<Parameters<S>>;

export type Workflow<S extends Stages> = HasAsyncOp<S> extends true ? never : HasValidStages<S> extends true ? S : never;
export type AsyncWorkflow<S extends Stages> = HasAsyncOp<S> extends true ? (HasValidStages<S> extends true ? S : never) : never;

export type WorkflowOutput<S extends Stages> = HasAsyncOp<S> extends true
    ? never
    : HasEitherOp<S> extends true
    ? Either<EitherOpsLefts<S>, ReturnType<Last<S>>>
    : ReturnType<Last<S>>;
export type AsyncWorkflowOutput<S extends Stages> = HasAsyncOp<S> extends true
    ? HasEitherOp<S> extends true
        ? Promise<Either<EitherOpsLefts<S>, PromiseLikeArg<ReturnType<Last<S>>>>>
        : ReturnType<Last<S>>
    : never;

type IsValidStagePair<First extends Stage, Second extends Stage> = Equal<ReturnType<First>, StageInput<Second>> extends true
    ? true
    : Equal<EitherOpRight<First>, StageInput<Second>>;

type HasValidStages<S extends Stages> = TwoOrMoreElementsList<S> extends true
    ? IsValidStagePair<First<S>, Second<S>> extends true
        ? HasValidStages<Tail<S>>
        : false
    : OneElementList<S>;
