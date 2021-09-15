import { Left, Right } from "exceptionout";
import { runAsyncWorkflow, runWorkflow } from "..";
import { ValidAsyncWorkflow5, ValidWorkflow5 } from "./test-types";

describe("runAsyncWorkflow", () => {
    const workflow: ValidAsyncWorkflow5 = [
        async (s: string) => {
            const result = Number(s);
            return Number.isNaN(result) ? Left.of({ message: `${s} cannot be parsed to number` }) : Right.of(result);
        },
        async (n: number) => n + 42,
        async (n: number) => (n % 2 === 0 ? Right.of(n) : Left.of(`${n} is not even`)),
    ];

    it("return Left with correct message when number parsing stage failed", async () => {
        expect(await runAsyncWorkflow(workflow)("foo")).toEqual(Left.of({ message: "foo cannot be parsed to number" }));
    });

    it("return Left with correct string when number even check stage failed", async () => {
        expect(await runAsyncWorkflow(workflow)("1")).toEqual(Left.of("43 is not even"));
    });

    it("return Right with correct value in happy flow", async () => {
        expect(await runAsyncWorkflow(workflow)("4")).toEqual(Right.of(46));
    });
});

describe("runWorkflow", () => {
    const workflow: ValidWorkflow5 = [
        (s: string) => {
            const result = Number(s);
            return Number.isNaN(result) ? Left.of({ message: `${s} cannot be parsed to number` }) : Right.of(result);
        },
        (n: number) => n + 42,
        (n: number) => (n % 2 === 0 ? Right.of(n) : Left.of(`${n} is not even`)),
    ];

    it("return Left with correct message when number parsing stage failed", () => {
        expect(runWorkflow(workflow)("foo")).toEqual(Left.of({ message: "foo cannot be parsed to number" }));
    });

    it("return Left with correct string when number even check stage failed", async () => {
        expect(runWorkflow(workflow)("1")).toEqual(Left.of("43 is not even"));
    });

    it("return Right with correct value in happy flow", async () => {
        expect(runWorkflow(workflow)("4")).toEqual(Right.of(46));
    });
});
