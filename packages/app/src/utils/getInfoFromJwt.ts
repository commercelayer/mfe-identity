import jwtDecode from 'jwt-decode'

interface JWTProps {
  /**
   * The Organization `slug` and `id` present in the provided access token.
   */
  organization: {
    slug: string
    id: string
  }
  /**
   * The API credentials `kind` or type, for example "sales_channel".
   * Read more at {@link https://docs.commercelayer.io/core/api-credentials}
   */
  application: {
    kind: string
  }
  /**
   * The API credentials `owner`. If set it means that the credentials belongs to a valid customer with its own id.
   * Read more at {@link https://docs.commercelayer.io/core/authentication/password}
   */
  owner?: {
    id?: string
  }
  /**
   * The expiry time of token in milliseconds.
   */
  exp: number
  /**
   * If `true` it means the  Organization is working in test mode and live mode is not enabled.
   */
  test: boolean
}

/**
 * Decodes a JWT string in order to retrieve some required organization info.
 *
 * @param accessToken - The Bearer JWT token used to authenticate Commerce Layer API request.
 * @returns an object of type `JWTProps` or an empty object in case of failure.
 *
 */
export const getInfoFromJwt = (
  accessToken: string
): {
  slug?: string
  kind?: string
  customerId?: string
  exp?: number
  isTest?: any
} => {
  try {
    const {
      organization: { slug },
      application: { kind },
      exp,
      owner,
      test
    } = jwtDecode<JWTProps>(accessToken)
    return { slug, kind, customerId: owner?.id, exp, isTest: test }
  } catch (e) {
    return {}
  }
}
