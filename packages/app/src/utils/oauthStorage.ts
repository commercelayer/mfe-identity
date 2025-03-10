import {
  authenticate,
  jwtDecode,
  jwtIsSalesChannel,
} from "@commercelayer/js-auth"

interface StoredOauthResponse {
  access_token?: string
  scope?: string
  token_type?: string
  refresh_token?: string
  error?: string
  error_description?: string
  client_id?: string
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
  scope,
}: GetStoredTokenKeyConfig): string => {
  return `cLayer-${app}-${slug}-${scope}`
}

interface GetStoredTokenDataConfig extends GetStoredTokenKeyConfig {}

const getStoredTokenData = ({
  app,
  slug,
  scope,
}: GetStoredTokenDataConfig): StoredOauthResponse | null => {
  const storageKey = getStoredTokenKey({ app, slug, scope })
  const storageContent = localStorage.getItem(storageKey) ?? ""
  if (storageContent?.includes("{")) {
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
  clientId,
}: IsValidStoreTokenDataConfig): boolean => {
  return (
    tokenData != null &&
    clientId === tokenData?.client_id &&
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
  scope,
}: GetStoredSalesChannelTokenConfig): Promise<StoredOauthResponse | null> => {
  const tokenData = getStoredTokenData({ app, slug, scope })
  if (!isValidStoredTokenData({ tokenData, clientId })) {
    const auth = await authenticate("client_credentials", {
      domain,
      clientId,
      scope,
    })
    if (auth.accessToken != null) {
      const decodedJWT = jwtDecode(auth.accessToken)
      const slug = jwtIsSalesChannel(decodedJWT.payload)
        ? decodedJWT.payload.organization.slug
        : ""

      const tokenData: StoredOauthResponse = {
        client_id: clientId,
        access_token: auth.accessToken,
        scope,
        token_type: auth.tokenType,
        expires: decodedJWT.payload.exp,
      }
      const storageKey = getStoredTokenKey({ app, slug, scope })
      localStorage.setItem(storageKey, JSON.stringify(tokenData))
      return tokenData
    }
    return null
  }
  return tokenData
}
