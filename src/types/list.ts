export type List<Element = any> = ReadonlyArray<Element>;

export type OneElementList<L extends List> = L extends [any] ? true : false;
export type TwoOrMoreElementsList<L extends List> = L extends [any, any, ...any] ? true : false;

export type First<L extends List> = L[0];
export type Second<L extends List> = L["length"] extends 1 ? never : L[1];
export type Tail<L extends List> = L extends [any, ...infer XS] ? XS : [];
export type Last<T extends List> = T[Tail<T>["length"]];
