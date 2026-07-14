/**
 * @returns `true` if the given string is an absolute URL with an `http:` or `https:` scheme, `false` otherwise.
 *
 * @param url: the string to check.
 */
export const isAbsoluteUrl = (url: string): boolean => {
  try {
    const { protocol } = new URL(url)
    return protocol === "http:" || protocol === "https:"
  } catch {
    return false
  }
}
