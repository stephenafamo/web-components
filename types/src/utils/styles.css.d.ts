export interface variable {
    name: string;
    basedOn: string;
    defaultValue: string;
}
export declare function responsiveStyles(breakpoints: number[], variables: variable[]): string;
