export declare const BooleanConverter: {
    fromAttribute: (value: string) => boolean;
};
export declare const StringArrayConverter: {
    fromAttribute: (value: string) => string[];
    toAttribute: (value: string[]) => string;
};
export declare const NumberArrayConverter: {
    fromAttribute: (value: string) => number[];
    toAttribute: (value: number[]) => string;
};
