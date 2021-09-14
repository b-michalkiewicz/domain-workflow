import { Right } from "exceptionout";
import { runAsyncWorkflow, runWorkflow } from "../domain-workflow";
import {
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

// todo: check stages input
describe("runAsyncWorkflow", () => {
    it("works fine for all kind of workflows", async () => {
        const workflow1: ValidAsyncWorkflow1 = [jest.fn(), jest.fn().mockReturnValue("1")];
        const workflow2: ValidAsyncWorkflow2 = [jest.fn(), jest.fn(), jest.fn().mockReturnValue("2")];
        const workflow3: ValidAsyncWorkflow3 = [jest.fn(), jest.fn(), jest.fn().mockReturnValue(3)];
        const workflow4: ValidAsyncWorkflow4 = [jest.fn(), jest.fn().mockReturnValue(Right.of(4))];
        const workflow5: ValidAsyncWorkflow5 = [jest.fn(), jest.fn(), jest.fn().mockReturnValue(Right.of(5))];

        expect(await runAsyncWorkflow(workflow1)(42)).toEqual("1");
        expect(await runAsyncWorkflow(workflow2)("42")).toEqual("2");
        expect(await runAsyncWorkflow(workflow3)(42)).toEqual(3);
        expect(await runAsyncWorkflow(workflow4)(42)).toEqual(Right.of(4));
        expect(await runAsyncWorkflow(workflow5)("42")).toEqual(Right.of(5));
    });
});

describe("runWorkflow", () => {
    it("works fine for all kind of workflows", () => {
        const workflow1: ValidWorkflow1 = [jest.fn(), jest.fn().mockReturnValue("1")];
        const workflow2: ValidWorkflow2 = [jest.fn(), jest.fn(), jest.fn().mockReturnValue("2")];
        const workflow3: ValidWorkflow3 = [jest.fn(), jest.fn(), jest.fn().mockReturnValue(3)];
        const workflow4: ValidWorkflow4 = [jest.fn(), jest.fn().mockReturnValue(Right.of(4))];
        const workflow5: ValidWorkflow5 = [jest.fn(), jest.fn(), jest.fn().mockReturnValue(Right.of(5))];

        expect(runWorkflow(workflow1)(42)).toEqual("1");
        expect(runWorkflow(workflow2)("42")).toEqual("2");
        expect(runWorkflow(workflow3)(42)).toEqual(3);
        expect(runWorkflow(workflow4)(42)).toEqual(Right.of(4));
        expect(runWorkflow(workflow5)("42")).toEqual(Right.of(5));
    });
});
