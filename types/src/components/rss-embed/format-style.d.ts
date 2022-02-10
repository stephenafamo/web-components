import { ComplexAttributeConverter } from 'lit';
export declare type formatStyle = 'full' | 'long' | 'medium' | 'short' | undefined;
export declare const FormatStyleConverter: (fallback: formatStyle) => ComplexAttributeConverter;
