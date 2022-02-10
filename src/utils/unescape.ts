/** Used to map HTML entities to characters. */
const htmlUnescapes: {[key: string]: string} = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#xA;': '\n',
}

/** Used to match HTML entities and HTML characters. */
const reEscapedHtml = /&(?:amp|lt|gt|quot|#(0+)?39|#(0+)?xA);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)

/**
 * The inverse of `escape`this method converts the HTML entities
 * `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;` in `string` to
 * their corresponding characters.
 *
 * **Note:** No other HTML entities are unescaped. To unescape additional
 * HTML entities use a third-party library like [_he_](https://mths.be/he).
 *
 * @since 0.6.0
 * @category String
 * @param {string} [string=''] The string to unescape.
 * @returns {string} Returns the unescaped string.
 * @see escape, escapeRegExp
 * @example
 *
 * unescape('fred, barney, &amp; pebbles')
 * // => 'fred, barney, & pebbles'
 */
function unescape(input: string): string {
  return (input && reHasEscapedHtml.test(input))
    ? input.replace(reEscapedHtml, (entity) => (htmlUnescapes[entity] || "'"))
    : (input || '')
}

export default unescape
