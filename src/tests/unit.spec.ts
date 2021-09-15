import { Left, Right } from "exceptionout";
import { runAsyncWorkflow, runWorkflow } from "..";
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

beforeEach(() => {
    jest.resetAllMocks();
});

describe("runAsyncWorkflow", () => {
    const asyncNumberProcessor = jest.fn();
    const asyncNumberFormatter = jest.fn();
    const asyncNumberParser = jest.fn();
    const asyncComplexNumberProcessor = jest.fn();

    const workflow1: ValidAsyncWorkflow1 = [asyncNumberProcessor, asyncNumberFormatter];
    const workflow2: ValidAsyncWorkflow2 = [asyncNumberParser, asyncNumberProcessor, asyncNumberFormatter];
    const workflow3: ValidAsyncWorkflow3 = [asyncNumberProcessor, asyncComplexNumberProcessor, asyncNumberProcessor];
    const workflow4: ValidAsyncWorkflow4 = [asyncNumberProcessor, asyncComplexNumberProcessor];
    const workflow5: ValidAsyncWorkflow5 = [asyncNumberParser, asyncNumberProcessor, asyncComplexNumberProcessor];

    it("works fine for all kind of workflows in happy flow", async () => {
        asyncNumberProcessor.mockResolvedValueOnce(1);
        asyncNumberFormatter.mockResolvedValueOnce("1");
        expect(await runAsyncWorkflow(workflow1)(1)).toEqual("1");
        expect(asyncNumberProcessor).toHaveBeenLastCalledWith(1);
        expect(asyncNumberFormatter).toHaveBeenLastCalledWith(1);
        jest.resetAllMocks();

        asyncNumberParser.mockResolvedValueOnce(Right.of(2));
        asyncNumberProcessor.mockResolvedValueOnce(2);
        asyncNumberFormatter.mockResolvedValueOnce("2");
        expect(await runAsyncWorkflow(workflow2)("2")).toEqual("2");
        expect(asyncNumberParser).toHaveBeenLastCalledWith("2");
        expect(asyncNumberProcessor).toHaveBeenLastCalledWith(2);
        expect(asyncNumberFormatter).toHaveBeenLastCalledWith(2);
        jest.resetAllMocks();

        asyncNumberProcessor.mockResolvedValueOnce(3);
        asyncComplexNumberProcessor.mockResolvedValueOnce(Right.of(3));
        asyncNumberProcessor.mockResolvedValueOnce(3);
        expect(await runAsyncWorkflow(workflow3)(3)).toEqual(3);
        expect(asyncNumberProcessor).toHaveBeenNthCalledWith(1, 3);
        expect(asyncComplexNumberProcessor).toHaveBeenLastCalledWith(3);
        expect(asyncNumberProcessor).toHaveBeenLastCalledWith(3);
        jest.resetAllMocks();

        asyncNumberProcessor.mockResolvedValueOnce(4);
        asyncComplexNumberProcessor.mockResolvedValueOnce(Right.of(4));
        expect(await runAsyncWorkflow(workflow4)(4)).toEqual(Right.of(4));
        expect(asyncNumberProcessor).toHaveBeenLastCalledWith(4);
        expect(asyncComplexNumberProcessor).toHaveBeenLastCalledWith(4);
        jest.resetAllMocks();

        asyncNumberParser.mockResolvedValueOnce(Right.of(5));
        asyncNumberProcessor.mockResolvedValueOnce(5);
        asyncComplexNumberProcessor.mockResolvedValueOnce(Right.of(5));
        expect(await runAsyncWorkflow(workflow5)("5")).toEqual(Right.of(5));
        expect(asyncNumberParser).toHaveBeenLastCalledWith("5");
        expect(asyncNumberProcessor).toHaveBeenLastCalledWith(5);
        expect(asyncComplexNumberProcessor).toHaveBeenLastCalledWith(5);
    });

    it("works fine for all kind of workflows in error flow", async () => {
        asyncNumberParser.mockResolvedValueOnce(Left.of({ message: "error" }));
        expect(await runAsyncWorkflow(workflow2)("2")).toEqual(Left.of({ message: "error" }));
        expect(asyncNumberParser).toHaveBeenLastCalledWith("2");
        expect(asyncNumberProcessor).toHaveBeenCalledTimes(0);
        expect(asyncNumberFormatter).toHaveBeenCalledTimes(0);
        jest.resetAllMocks();

        asyncNumberProcessor.mockResolvedValueOnce(3);
        asyncComplexNumberProcessor.mockResolvedValueOnce(Left.of("error"));
        expect(await runAsyncWorkflow(workflow3)(3)).toEqual(Left.of("error"));
        expect(asyncNumberProcessor).toHaveBeenNthCalledWith(1, 3);
        expect(asyncComplexNumberProcessor).toHaveBeenLastCalledWith(3);
        expect(asyncNumberProcessor).toHaveBeenCalledTimes(1);
        jest.resetAllMocks();

        asyncNumberProcessor.mockResolvedValueOnce(Left.of("error"));
        expect(await runAsyncWorkflow(workflow4)(4)).toEqual(Left.of("error"));
        expect(asyncNumberProcessor).toHaveBeenLastCalledWith(4);
        expect(asyncComplexNumberProcessor).toHaveBeenCalledTimes(0);
        jest.resetAllMocks();

        asyncNumberParser.mockResolvedValueOnce(Right.of(5));
        asyncNumberProcessor.mockResolvedValueOnce(5);
        asyncComplexNumberProcessor.mockResolvedValueOnce(Left.of({ message: "error" }));
        expect(await runAsyncWorkflow(workflow5)("5")).toEqual(Left.of({ message: "error" }));
        expect(asyncNumberParser).toHaveBeenLastCalledWith("5");
        expect(asyncNumberProcessor).toHaveBeenLastCalledWith(5);
        expect(asyncComplexNumberProcessor).toHaveBeenLastCalledWith(5);
    });
});

describe("runWorkflow", () => {
    const numberProcessor = jest.fn();
    const numberFormatter = jest.fn();
    const numberParser = jest.fn();
    const complexNumberProcessor = jest.fn();

    const workflow1: ValidWorkflow1 = [numberProcessor, numberFormatter];
    const workflow2: ValidWorkflow2 = [numberParser, numberProcessor, numberFormatter];
    const workflow3: ValidWorkflow3 = [numberProcessor, complexNumberProcessor, numberProcessor];
    const workflow4: ValidWorkflow4 = [numberProcessor, complexNumberProcessor];
    const workflow5: ValidWorkflow5 = [numberParser, numberProcessor, complexNumberProcessor];

    it("works fine for all kind of workflows in happy flow", () => {
        numberProcessor.mockReturnValueOnce(1);
        numberFormatter.mockReturnValueOnce("1");
        expect(runWorkflow(workflow1)(1)).toEqual("1");
        expect(numberProcessor).toHaveBeenLastCalledWith(1);
        expect(numberFormatter).toHaveBeenLastCalledWith(1);
        jest.resetAllMocks();

        numberParser.mockReturnValueOnce(Right.of(2));
        numberProcessor.mockReturnValueOnce(2);
        numberFormatter.mockReturnValueOnce("2");
        expect(runWorkflow(workflow2)("2")).toEqual("2");
        expect(numberParser).toHaveBeenLastCalledWith("2");
        expect(numberProcessor).toHaveBeenLastCalledWith(2);
        expect(numberFormatter).toHaveBeenLastCalledWith(2);
        jest.resetAllMocks();

        numberProcessor.mockReturnValueOnce(3);
        complexNumberProcessor.mockReturnValueOnce(Right.of(3));
        numberProcessor.mockReturnValueOnce(3);
        expect(runWorkflow(workflow3)(3)).toEqual(3);
        expect(numberProcessor).toHaveBeenNthCalledWith(1, 3);
        expect(complexNumberProcessor).toHaveBeenLastCalledWith(3);
        expect(numberProcessor).toHaveBeenLastCalledWith(3);
        jest.resetAllMocks();

        numberProcessor.mockReturnValueOnce(4);
        complexNumberProcessor.mockReturnValueOnce(Right.of(4));
        expect(runWorkflow(workflow4)(4)).toEqual(Right.of(4));
        expect(numberProcessor).toHaveBeenLastCalledWith(4);
        expect(complexNumberProcessor).toHaveBeenLastCalledWith(4);
        jest.resetAllMocks();

        numberParser.mockReturnValueOnce(Right.of(5));
        numberProcessor.mockReturnValueOnce(5);
        complexNumberProcessor.mockReturnValueOnce(Right.of(5));
        expect(runWorkflow(workflow5)("5")).toEqual(Right.of(5));
        expect(numberParser).toHaveBeenLastCalledWith("5");
        expect(numberProcessor).toHaveBeenLastCalledWith(5);
        expect(complexNumberProcessor).toHaveBeenLastCalledWith(5);
    });

    it("works fine for all kind of workflows in error flow", () => {
        numberParser.mockReturnValueOnce(Left.of({ message: "error" }));
        expect(runWorkflow(workflow2)("2")).toEqual(Left.of({ message: "error" }));
        expect(numberParser).toHaveBeenLastCalledWith("2");
        expect(numberProcessor).toHaveBeenCalledTimes(0);
        expect(numberFormatter).toHaveBeenCalledTimes(0);
        jest.resetAllMocks();

        numberProcessor.mockReturnValueOnce(3);
        complexNumberProcessor.mockReturnValueOnce(Left.of("error"));
        expect(runWorkflow(workflow3)(3)).toEqual(Left.of("error"));
        expect(numberProcessor).toHaveBeenNthCalledWith(1, 3);
        expect(complexNumberProcessor).toHaveBeenLastCalledWith(3);
        expect(numberProcessor).toHaveBeenCalledTimes(1);
        jest.resetAllMocks();

        numberProcessor.mockReturnValueOnce(Left.of("error"));
        expect(runWorkflow(workflow4)(4)).toEqual(Left.of("error"));
        expect(numberProcessor).toHaveBeenLastCalledWith(4);
        expect(complexNumberProcessor).toHaveBeenCalledTimes(0);
        jest.resetAllMocks();

        numberParser.mockReturnValueOnce(Right.of(5));
        numberProcessor.mockReturnValueOnce(5);
        complexNumberProcessor.mockReturnValueOnce(Left.of({ message: "error" }));
        expect(runWorkflow(workflow5)("5")).toEqual(Left.of({ message: "error" }));
        expect(numberParser).toHaveBeenLastCalledWith("5");
        expect(numberProcessor).toHaveBeenLastCalledWith(5);
        expect(complexNumberProcessor).toHaveBeenLastCalledWith(5);
    });
});
