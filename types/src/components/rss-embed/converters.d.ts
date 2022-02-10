import { ComplexAttributeConverter } from 'lit';
export declare type formatStyle = 'full' | 'long' | 'medium' | 'short' | undefined;
export declare const FormatStyleConverter: (fallback: formatStyle) => ComplexAttributeConverter;
export declare type target = '_self' | '_blank' | '_parent' | '_top';
export declare const TargetConverter: (fallback: target) => ComplexAttributeConverter;
export declare type tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
export declare const TagConverter: (fallback: tag) => ComplexAttributeConverter;
