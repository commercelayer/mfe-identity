import { isEmbedded } from '#utils/isEmbedded'
import { getReturnUrlFromUrl } from '#utils/getParamsFromUrl'

import type { Settings } from 'App'

interface RedirectToReturnUrlConfig {
  accessToken: Settings['accessToken']
  scope: Settings['scope']
}

/**
 * Redirects to returnUrl adding requested accessToken and scope get parameters.
 *
 * @param accessToken - The Bearer JWT token used to authenticate Commerce Layer API request.
 * @param scope - String specified during the authentication flow to restrict the scope of obtained access token to a market and/or to a stock location.
 */
export const redirectToReturnUrl = ({
  accessToken,
  scope
}: RedirectToReturnUrlConfig): void => {
  const returnUrl = getReturnUrlFromUrl()
  if (returnUrl != null && window !== undefined) {
    const topWindow = isEmbedded() ? window.parent : window
    const url = new URL(returnUrl)
    url.searchParams.append('accessToken', accessToken ?? '')
    url.searchParams.append('scope', scope)
    topWindow.location.href = url.href
  }
}
