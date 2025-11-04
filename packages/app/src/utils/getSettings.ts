import CommerceLayer from "@commercelayer/sdk"
import type { InvalidSettings, Settings } from "App"
import { isEmpty } from "lodash"
import { getOrganization } from "#utils/getOrganization"
import { getSubdomain } from "#utils/getSubdomain"
import { getStoredSalesChannelToken } from "#utils/oauthStorage"

// default settings are by their nature not valid to show My Account data
// they will be used as fallback for errors or 404 page
export const defaultSettings: InvalidSettings = {
  primaryColor: "#000000",
  logoUrl: "",
  faviconUrl:
    "https://data.commercelayer.app/assets/images/favicons/favicon-32x32.png",
  companyName: "Commerce Layer",
  isValid: false,
  retryable: false,
}

const makeInvalidSettings = (): InvalidSettings => ({
  ...defaultSettings,
  retryable: false,
})

type GetSettingsProps = Pick<Settings, "clientId" | "scope"> & {
  config: CommerceLayerAppConfig
  publicScope?: Settings["publicScope"]
}

/**
 * Retrieves a list of `Settings` required to show the identity app
 *
 * @param clientId - Commerce Layer application's clientId.
 * @param scope - Commerce Layer access token scope (market, stock location).
 * @param publicScope - Commerce Layer access token scope suitable for public organization data in case main `scope` param is related to a private scope.
 * @param config - Commerce Layer app configuration available from global window object.
 * Read more at {@link https://docs.commercelayer.io/developers/authentication/client-credentials#sales-channel}, {@link https://docs.commercelayer.io/core/authentication/password}
 *
 * @returns an union type of `Settings` or `InvalidSettings`
 */
export const getSettings = async ({
  clientId,
  scope,
  publicScope,
  config,
}: GetSettingsProps): Promise<Settings | InvalidSettings> => {
  const hostname = window !== undefined ? window.location.hostname : ""
  const slug = getSubdomain({
    hostname,
    selfHostedSlug: config.selfHostedSlug,
  })
  const domain = config.domain

  const storedToken = await Promise.resolve(
    getStoredSalesChannelToken({
      app: "identity",
      slug,
      domain,
      clientId,
      scope: !isEmpty(publicScope) && publicScope != null ? publicScope : scope,
    }),
  )

  if (storedToken?.error != null) {
    return makeInvalidSettings()
  }

  const client = CommerceLayer({
    organization: storedToken?.slug ?? "",
    accessToken: storedToken?.access_token ?? "",
    domain,
  })

  const organization = await Promise.resolve(
    getOrganization({
      client,
    }),
  )

  // validating organization
  if (organization == null) {
    return makeInvalidSettings()
  }

  return {
    clientId,
    scope,
    publicScope,
    accessToken: storedToken?.access_token ?? "",
    isValid: true,
    companySlug: organization?.slug ?? slug,
    companyName: organization?.name ?? defaultSettings.companyName,
    primaryColor: organization?.primary_color ?? defaultSettings.primaryColor,
    logoUrl: organization?.logo_url ?? "",
    faviconUrl: organization?.favicon_url ?? defaultSettings.faviconUrl,
  }
}
