import { Left, Right } from "exceptionout";

export type Equal<A, B> = UnwrapSuccessType<A> extends UnwrapSuccessType<B>
    ? UnwrapSuccessType<B> extends UnwrapSuccessType<A>
        ? true
        : false
    : false;

export type UnwrapSuccessType<A> = A extends PromiseLike<infer B>
    ? UnwrapSuccessType<B>
    : A extends Right<infer B>
    ? UnwrapSuccessType<B>
    : A extends Left<any>
    ? never
    : A;
