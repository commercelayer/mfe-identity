import { getSalesChannelToken } from '#utils/oauthRequests'
import { getInfoFromJwt } from '#utils/getInfoFromJwt'

import type { OauthResponse } from '#utils/oauthRequests'

type StoredOauthResponse = Pick<
  OauthResponse,
  | 'access_token'
  | 'scope'
  | 'token_type'
  | 'refresh_token'
  | 'error'
  | 'error_description'
> & {
  cliend_id?: string
  expires?: number
}

interface GetStoredTokenKeyConfig {
  app: string
  slug: string
  scope: string
}

const getStoredTokenKey = ({
  app,
  slug,
  scope
}: GetStoredTokenKeyConfig): string => {
  return `cLayer-${app}-${slug}-${scope}`
}

interface GetStoredTokenDataConfig extends GetStoredTokenKeyConfig {}

const getStoredTokenData = ({
  app,
  slug,
  scope
}: GetStoredTokenDataConfig): StoredOauthResponse | null => {
  const storageKey = getStoredTokenKey({ app, slug, scope })
  const storageContent = localStorage.getItem(storageKey) ?? ''
  if (storageContent?.includes('{')) {
    return JSON.parse(storageContent)
  }
  return null
}

interface IsTokenExpiredConfig {
  expires?: number
}

const isTokenExpired = ({ expires = 0 }: IsTokenExpiredConfig): boolean => {
  return Math.trunc(new Date().getTime() / 1000) > expires
}

interface IsValidStoreTokenDataConfig {
  tokenData: StoredOauthResponse | null
  clientId: string
}

const isValidStoredTokenData = ({
  tokenData,
  clientId
}: IsValidStoreTokenDataConfig): boolean => {
  return (
    tokenData != null &&
    clientId === tokenData?.cliend_id &&
    !isTokenExpired({ expires: tokenData?.expires })
    // TODO: Check also if token is not about to expire in XXX seconds (TBD)
  )
}

interface GetStoredSalesChannelTokenConfig {
  app: string
  slug: string
  domain: string
  clientId: string
  scope: string
}

// TODO: Define if storageKey needs a naming differentiation for sales channel tokens and customer tokens
export const getStoredSalesChannelToken = async ({
  app,
  slug,
  domain,
  clientId,
  scope
}: GetStoredSalesChannelTokenConfig): Promise<StoredOauthResponse | null> => {
  const tokenData = getStoredTokenData({ app, slug, scope })
  if (!isValidStoredTokenData({ tokenData, clientId })) {
    const endpoint = `https://${slug}.${domain}`
    const accessTokenResponse = await Promise.resolve(
      getSalesChannelToken({ clientId, endpoint, scope })
    )
    if (accessTokenResponse?.access_token != null) {
      const tokenData = {
        client_id: clientId,
        access_token: accessTokenResponse?.access_token,
        scope,
        token_type: accessTokenResponse?.token_type,
        refresh_token: accessTokenResponse?.refresh_token,
        expires: getInfoFromJwt(accessTokenResponse?.access_token)?.exp
      }
      const storageKey = getStoredTokenKey({ app, slug, scope })
      localStorage.setItem(storageKey, JSON.stringify(tokenData))
      return tokenData
    } else {
      return accessTokenResponse
    }
  } else {
    return tokenData
  }
}
