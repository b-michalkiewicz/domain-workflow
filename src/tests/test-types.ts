import { Either } from "exceptionout";
import { AsyncWorkflow, Workflow } from "../types";

export type ParseStringToNumberError = {
    message: string;
};

type NumberProcessor = (_: number) => number;
type ComplexNumberProcessor = (_: number) => Either<string, number>;
type NumberFormatter = (_: number) => string;
type NumberParser = (_: string) => Either<ParseStringToNumberError, number>;

type AsyncNumberProcessor = (_: number) => Promise<number>;
type AsyncComplexNumberProcessor = (_: number) => Promise<Either<string, number>>;
type AsyncNumberFormatter = (_: number) => Promise<string>;
type AsyncNumberParser = (_: string) => Promise<Either<ParseStringToNumberError, number>>;

export type ValidWorkflow1 = Workflow<[NumberProcessor, NumberFormatter]>;
export type ValidWorkflow2 = Workflow<[NumberParser, NumberProcessor, NumberFormatter]>;
export type ValidWorkflow3 = Workflow<[NumberProcessor, ComplexNumberProcessor, NumberProcessor]>;
export type ValidWorkflow4 = Workflow<[NumberProcessor, ComplexNumberProcessor]>;
export type ValidWorkflow5 = Workflow<[NumberParser, NumberProcessor, ComplexNumberProcessor]>;

export type ValidAsyncWorkflow1 = AsyncWorkflow<[AsyncNumberProcessor, AsyncNumberFormatter]>;
export type ValidAsyncWorkflow2 = AsyncWorkflow<[AsyncNumberParser, AsyncNumberProcessor, AsyncNumberFormatter]>;
export type ValidAsyncWorkflow3 = AsyncWorkflow<[AsyncNumberProcessor, AsyncComplexNumberProcessor, AsyncNumberProcessor]>;
export type ValidAsyncWorkflow4 = AsyncWorkflow<[AsyncNumberProcessor, AsyncComplexNumberProcessor]>;
export type ValidAsyncWorkflow5 = AsyncWorkflow<[AsyncNumberParser, AsyncNumberProcessor, AsyncComplexNumberProcessor]>;

export type InvalidWorkflow1 = Workflow<[NumberFormatter, NumberProcessor]>;
export type InvalidWorkflow2 = Workflow<[NumberProcessor, AsyncNumberFormatter]>;
export type InvalidWorkflow3 = AsyncWorkflow<[NumberProcessor, NumberFormatter]>;

export type Assert<T extends true> = T;
export type AssertNot<T extends false> = T;
