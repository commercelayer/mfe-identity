type UrlParam =
  | "clientId"
  | "scope"
  | "publicScope"
  | "returnUrl"
  | "resetPasswordUrl"
  | "customerEmail"
  | "customerPasswordResetId"
  | "resetPasswordToken"

/**
 * @returns the value of specified query string parameter or `undefined` if it's not present.
 *
 * @param param: the specified query string parameter.
 */
export const getParamFromUrl = (param: UrlParam): string | null | undefined => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search)
    if (param === "customerEmail") {
      return params.get(param)?.replace(" ", "+")
    }
    if (param === "returnUrl") {
      return params.get(param)?.slice(0, 1) === "/"
        ? params.get(param)?.slice(1)
        : params.get(param)
    }
    return params.get(param)
  }
}
