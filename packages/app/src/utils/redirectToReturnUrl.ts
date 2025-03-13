import { getParamFromUrl } from "#utils/getParamFromUrl"
import { isEmbedded } from "#utils/isEmbedded"

import type { Settings } from "App"

interface RedirectToReturnUrlConfig {
  scope: Settings["scope"]
  accessToken: Settings["customerAccessToken"]
  expires: Settings["customerAccessTokenExpires"]
}

/**
 * Redirects to returnUrl adding requested accessToken and scope get parameters.
 *
 * @param accessToken - The Bearer JWT token used to authenticate Commerce Layer API request.
 * @param scope - String specified during the authentication flow to restrict the scope of obtained access token to a market and/or to a stock location.
 */
export const redirectToReturnUrl = ({
  scope,
  accessToken,
  expires,
}: RedirectToReturnUrlConfig): void => {
  const returnUrl = getParamFromUrl("returnUrl")
  if (returnUrl != null && window !== undefined) {
    const topWindow = isEmbedded() ? window.parent : window
    const url = new URL(returnUrl)
    url.searchParams.append("accessToken", accessToken ?? "")
    url.searchParams.append("scope", scope)
    if (expires != null) {
      url.searchParams.append("expires", expires)
    }
    topWindow.location.href = url.href
  }
}
