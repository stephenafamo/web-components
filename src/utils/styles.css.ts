export interface variable { name: string, basedOn: string, defaultValue: string }

export function responsiveStyles (breakpoints: number[], variables: variable[]): string {
  if (!variables.length) return '';

  // remove breakpoints that are less than 1 and sort in ascending order
  breakpoints = breakpoints.filter(b => b > 0).sort((a, b) => a - b)
  breakpoints.unshift(0) // add the base breakpoint

  let hostVars: string = ''
  let mediaQueries: string = ''
  let prevBreakpoint: number = 0

  for (const breakpoint of breakpoints) {
    let mediaVars: string = ''

    for (const v of variables) {
      const fallback: string = !breakpoint
        ? v.defaultValue
        : prevBreakpoint 
          ? `var(--${v.name}-${prevBreakpoint})`
          : `var(--${v.basedOn})`

      hostVars += breakpoint 
      ? `\n--${v.name}-${breakpoint}: var(--${v.basedOn}-${breakpoint}, ${fallback});`
      : `\n--${v.name}: var(--${v.basedOn}, ${fallback});`

      mediaVars += `\n--${v.name}: var(--${v.name}-${breakpoint});`
    }

    if (breakpoint) {
      mediaQueries += `@media screen and (min-width: ${breakpoint}px) {
        :host {
          ${mediaVars.trim()}
        }
      }`
    }

    // set the prevBreakpoint to last used
    prevBreakpoint = breakpoint
  }

  return `
    :host {
      ${hostVars.trim()}
    }

    ${mediaQueries}`
}
