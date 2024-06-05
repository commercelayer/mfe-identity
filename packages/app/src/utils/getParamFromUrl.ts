type UrlParam =
  | 'clientId'
  | 'scope'
  | 'returnUrl'
  | 'resetPasswordUrl'
  | 'customerEmail'

/**
 * @returns the value of specified query string parameter or `undefined` if it's not present.
 *
 * @param param: the specified query string parameter.
 */
export const getParamFromUrl = (param: UrlParam): string | null | undefined => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    return params.get(param)
  }
}
