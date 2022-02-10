export const BooleanConverter = {
  fromAttribute: (value: string): boolean => {
    return value != 'false'
  }
}

export const StringArrayConverter = {
  fromAttribute: (value: string): string[] => {
    return value.split(',')
  },
  toAttribute: (value: string[]): string => {
    return value.join(',')
  }
}

export const NumberArrayConverter = {
  fromAttribute: (value: string): number[] => {
    return value.split(',').map(strVal => Number(strVal))
  },
  toAttribute: (value: number[]): string => {
    return value.join(',')
  }
}
