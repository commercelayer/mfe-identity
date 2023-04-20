import CommerceLayer from '@commercelayer/sdk'
import type { Settings, InvalidSettings } from 'App'

import { getOrganization } from '#utils/getOrganization'
import { getSubdomain } from '#utils/getSubdomain'
import { getStoredSalesChannelToken } from '#utils/oauthStorage'

// default settings are by their nature not valid to show My Account data
// they will be used as fallback for errors or 404 page
export const defaultSettings: InvalidSettings = {
  clientId: '',
  endpoint: '',
  scope: '',
  isValid: false,
  primaryColor: '#000000',
  faviconUrl:
    'https://data.commercelayer.app/assets/images/favicons/favicon-32x32.png',
  companyName: 'Commerce Layer',
  retryable: false
}

const makeInvalidSettings = (): InvalidSettings => ({
  ...defaultSettings,
  retryable: false
})

type GetSettingsProps = Pick<Settings, 'clientId' | 'scope'> & {
  config: CommerceLayerAppConfig
}

/**
 * Retrieves a list of `Settings` required to show the identity app
 *
 * @param clientId - Commerce Layer application's clientId.
 * @param scope - Commerce Layer access token scope (market, stock location).
 * @param config - Commerce Layer app configuration available from global window object.
 * Read more at {@link https://docs.commercelayer.io/developers/authentication/client-credentials#sales-channel}, {@link https://docs.commercelayer.io/core/authentication/password}
 *
 * @returns an union type of `Settings` or `InvalidSettings`
 */
export const getSettings = async ({
  clientId,
  scope,
  config
}: GetSettingsProps): Promise<Settings | InvalidSettings> => {
  const hostname = window !== undefined ? window.location.hostname : ''
  const slug = getSubdomain({
    hostname,
    selfHostedSlug: config.selfHostedSlug
  })
  const domain = config.domain

  const storedToken = await Promise.resolve(
    getStoredSalesChannelToken({
      app: 'identity',
      slug,
      domain,
      clientId,
      scope
    })
  )

  if (storedToken?.error != null) {
    return makeInvalidSettings()
  }

  const client = CommerceLayer({
    organization: slug,
    accessToken: storedToken?.access_token ?? '',
    domain
  })

  const organizationResponse = await Promise.resolve(
    getOrganization({
      client
    })
  )

  // validating organization
  const organization = organizationResponse?.object
  if (organization == null) {
    return makeInvalidSettings()
  }

  return {
    clientId,
    scope,
    accessToken: storedToken?.access_token ?? '',
    endpoint: `https://${slug}.${domain}`,
    isValid: true,
    companyName: organization?.name ?? defaultSettings.companyName,
    primaryColor: organization?.primary_color ?? defaultSettings.primaryColor,
    logoUrl: organization?.logo_url ?? '',
    faviconUrl: organization?.favicon_url ?? defaultSettings.faviconUrl
  }
}
