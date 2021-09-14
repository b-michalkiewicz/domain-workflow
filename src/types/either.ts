import { Either } from "exceptionout";
import { UnwrapPromiseResult } from "./async";
import { List } from "./list";

export type HasEitherOperation<Operations extends List> = Operations extends [infer HeadOperation, ...infer TailOperations]
    ? IsEitherOperation<HeadOperation> extends true
        ? true
        : HasEitherOperation<TailOperations>
    : false;

export type EitherOperationLefts<Operations extends List> = { [K in keyof Operations]: EitherOperationLeft<Operations[K]> }[number];

export type EitherOperationRight<Operation> = Operation extends (arg: any) => any
    ? UnwrapPromiseResult<ReturnType<Operation>> extends Either<any, infer Right>
        ? Right
        : never
    : never;

type EitherOperationLeft<Operation> = Operation extends (arg: any) => any
    ? UnwrapPromiseResult<ReturnType<Operation>> extends Either<infer Left, any>
        ? Left
        : never
    : never;

type IsEitherOperation<A> = A extends (arg: any) => any ? (UnwrapPromiseResult<ReturnType<A>> extends Either<any, any> ? true : false) : false;
