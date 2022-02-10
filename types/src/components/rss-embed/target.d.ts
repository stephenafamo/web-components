import { ComplexAttributeConverter } from 'lit';
export declare type target = '_self' | '_blank' | '_parent' | '_top';
export declare const TargetConverter: (fallback: target) => ComplexAttributeConverter;
