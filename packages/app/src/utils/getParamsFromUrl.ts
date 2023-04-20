/**
 * @returns the value of `clientId` query string parameter or `undefined` if it's not present.
 */
export const getClientIdFromUrl = (): string | null | undefined => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    return params.get('clientId')
  }
}

/**
 * @returns the value of `scope` query string parameter or `undefined` if it's not present.
 */
export const getScopeFromUrl = (): string | null | undefined => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    return params.get('scope')
  }
}

/**
 * @returns the value of `returnUrl` query string parameter or `undefined` if it's not present.
 */
export const getReturnUrlFromUrl = (): string | null | undefined => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    return params.get('returnUrl')
  }
}
