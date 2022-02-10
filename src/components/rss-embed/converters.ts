// Contains converters specific to the RssEmbed element

import {ComplexAttributeConverter} from 'lit';

export type formatStyle = 'full' | 'long' | 'medium' | 'short' | undefined

export const FormatStyleConverter = (fallback: formatStyle): ComplexAttributeConverter => {
  return {
    fromAttribute: (value: string): formatStyle => {
      switch (value) {
        case 'full':
        case 'long':
        case 'medium':
        case 'short':
          return value
        default:
          return fallback
      }
    }
  }
}

export type target = '_self' | '_blank' | '_parent' | '_top'

export const TargetConverter = (fallback: target): ComplexAttributeConverter => {
  return {
    fromAttribute: (value: string): target => {
      switch (value) {
        case '_self':
        case '_blank':
        case '_parent':
        case '_top':
          return value
        default:
          return fallback
      }
    }
  }
}


export type tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'

export const TagConverter = (fallback: tag): ComplexAttributeConverter => {
  return {
    fromAttribute: (value: string): tag => {
      switch (value) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'p':
          return value
        default:
          return fallback
      }
    }
  }
}

