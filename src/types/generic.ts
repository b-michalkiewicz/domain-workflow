import { Either } from "exceptionout";

type List = ReadonlyArray<any>;
type Length<L extends List> = L["length"];

type IsAsyncOp<A> = A extends (arg: any) => any ? (ReturnType<A> extends PromiseLike<any> ? true : false) : false;
type IsEitherOp<A> = A extends (arg: any) => any ? (PromiseLikeArg<ReturnType<A>> extends Either<any, any> ? true : false) : false;
type EitherOpLeft<A> = A extends (arg: any) => Either<infer Left, any>
    ? Left
    : A extends (arg: any) => PromiseLike<Either<infer Left, any>>
    ? Left
    : never;

export type PromiseLikeArg<A> = A extends PromiseLike<infer B> ? B : A;

export type OneElementList<L extends List> = L extends [any] ? true : false;
export type TwoOrMoreElementsList<L extends List> = L extends [any, any, ...any] ? true : false;

export type First<L extends List> = L[0];
export type Second<L extends List> = Length<L> extends 1 ? never : L[1];
export type Tail<L extends List> = L extends [any, ...infer XS] ? XS : [];
export type Last<T extends List> = T[Length<Tail<T>>];

export type HasAsyncOp<L extends List> = L extends [infer X, ...infer XS] ? (IsAsyncOp<X> extends true ? true : HasAsyncOp<XS>) : false;

export type HasEitherOp<L extends List> = L extends [infer X, ...infer XS] ? (IsEitherOp<X> extends true ? true : HasEitherOp<XS>) : false;

export type EitherOpRight<A> = IsAsyncOp<A> extends true
    ? A extends (arg: any) => PromiseLike<Either<any, infer Right>>
        ? Right
        : never
    : A extends (arg: any) => Either<any, infer Right>
    ? Right
    : never;
export type EitherOpsLefts<L extends List> = { [K in keyof L]: EitherOpLeft<L[K]> }[number];

export type Equal<A, B> = PromiseLikeArg<A> extends PromiseLikeArg<B> ? (PromiseLikeArg<B> extends PromiseLikeArg<A> ? true : false) : false;
