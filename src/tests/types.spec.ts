import { Either } from "exceptionout";
import { AsyncWorkflowResult, Equal, WorkflowResult } from "../types";
import {
    Assert,
    AssertNot,
    InvalidWorkflow1,
    InvalidWorkflow2,
    InvalidWorkflow3,
    ParseStringToNumberError,
    ValidAsyncWorkflow1,
    ValidAsyncWorkflow2,
    ValidAsyncWorkflow3,
    ValidAsyncWorkflow4,
    ValidAsyncWorkflow5,
    ValidWorkflow1,
    ValidWorkflow2,
    ValidWorkflow3,
    ValidWorkflow4,
    ValidWorkflow5,
} from "./test-types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type nevers = [
    Assert<Equal<InvalidWorkflow1, never>>, // type is `never` since input does not match output
    Assert<Equal<InvalidWorkflow2, never>>, // type is `never` since it has async operation and type is sync
    Assert<Equal<InvalidWorkflow3, never>>, // type is `never` since it hasn't got any async operation and type is async
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type valid = [
    AssertNot<Equal<ValidWorkflow1, never>>,
    AssertNot<Equal<ValidWorkflow2, never>>,
    AssertNot<Equal<ValidWorkflow3, never>>,
    AssertNot<Equal<ValidWorkflow4, never>>,
    AssertNot<Equal<ValidWorkflow5, never>>,

    Assert<Equal<WorkflowResult<ValidWorkflow1>, string>>,
    Assert<Equal<WorkflowResult<ValidWorkflow2>, string>>,
    Assert<Equal<WorkflowResult<ValidWorkflow3>, number>>,
    Assert<Equal<WorkflowResult<ValidWorkflow4>, Either<string, number>>>,
    Assert<Equal<WorkflowResult<ValidWorkflow5>, Either<string | ParseStringToNumberError, number>>>,

    AssertNot<Equal<ValidAsyncWorkflow1, never>>,
    AssertNot<Equal<ValidAsyncWorkflow2, never>>,
    AssertNot<Equal<ValidAsyncWorkflow3, never>>,
    AssertNot<Equal<ValidAsyncWorkflow4, never>>,
    AssertNot<Equal<ValidAsyncWorkflow5, never>>,

    Assert<Equal<AsyncWorkflowResult<ValidAsyncWorkflow1>, Promise<string>>>,
    Assert<Equal<AsyncWorkflowResult<ValidAsyncWorkflow2>, Promise<string>>>,
    Assert<Equal<AsyncWorkflowResult<ValidAsyncWorkflow3>, Promise<number>>>,
    Assert<Equal<AsyncWorkflowResult<ValidAsyncWorkflow4>, Promise<Either<string, number>>>>,
    Assert<Equal<AsyncWorkflowResult<ValidAsyncWorkflow5>, Promise<Either<string | ParseStringToNumberError, number>>>>,
];

describe("types tests", () => {
    it("complies fine = types are working as expected", (done) => done());
});
