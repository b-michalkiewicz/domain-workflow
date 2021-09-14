import { List } from "./list";

export type UnwrapPromiseResult<A> = A extends PromiseLike<infer B> ? UnwrapPromiseResult<B> : A;

export type HasAsyncOperation<L extends List> = L extends [infer X, ...infer XS]
    ? IsAsyncOperation<X> extends true
        ? true
        : HasAsyncOperation<XS>
    : false;

type IsAsyncOperation<A> = A extends (arg: any) => any ? (ReturnType<A> extends PromiseLike<any> ? true : false) : false;
