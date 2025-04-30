import { isEmbedded } from "#utils/isEmbedded"

import type { Settings } from "App"

interface RedirectToLoginUrlConfig {
  loginUrl: string
  clientId: Settings["clientId"]
  scope: Settings["scope"]
  publicScope?: Settings["publicScope"]
  returnUrl?: string
  resetPasswordUrl?: string
  customerEmail?: string
}

/**
 * Redirects to loginUrl adding available get parameters.
 */
export const redirectToLoginUrl = ({
  loginUrl,
  clientId,
  scope,
  publicScope,
  returnUrl,
  resetPasswordUrl,
  customerEmail,
}: RedirectToLoginUrlConfig): void => {
  const topWindow = isEmbedded() ? window.parent : window
  const url = new URL(loginUrl)
  url.searchParams.append("clientId", clientId)
  url.searchParams.append("scope", scope)
  if (publicScope != null) {
    url.searchParams.append("publicScope", publicScope)
  }
  if (returnUrl != null) {
    url.searchParams.append("returnUrl", returnUrl)
  }
  if (resetPasswordUrl != null) {
    url.searchParams.append("resetPasswordUrl", resetPasswordUrl)
  }
  if (customerEmail != null) {
    url.searchParams.append("customerEmail", customerEmail)
  }
  topWindow.location.href = url.href
}
