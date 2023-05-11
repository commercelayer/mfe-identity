import { getInfoFromJwt } from '#utils/getInfoFromJwt'
import { getSubdomain } from './getSubdomain'

const isProduction = (forceProductionEnv?: boolean): boolean =>
  forceProductionEnv === true ? true : import.meta.env.PROD

/**
 * Checks if app is loaded from a valid URL and the `slug` found in JWT belongs
 * to the authorized subdomain.
 *
 * @param hostname - The full `window.location.hostname` Example: "my-org.commercelayer.app"
 * @param accessToken - The JWT used to authenticate Commerce Layer Api requests
 * @param forceProductionEnv - To be used to emulate production deployment during E2E tests
 * @param selfHostedSlug - The organization slug used to generate the accessToken.
 *
 * @returns a boolean flag set as `true` in case app is loaded from a valid URL.
 */
export const isValidHost = ({
  hostname,
  accessToken,
  forceProductionEnv,
  selfHostedSlug
}: {
  hostname: string
  accessToken: string
  forceProductionEnv?: boolean
  selfHostedSlug?: string | null
}): boolean => {
  const { slug, kind } = getInfoFromJwt(accessToken)

  const isInvalidChannel = kind !== 'sales_channel'
  if (isInvalidChannel) {
    return false
  }

  const subdomain = getSubdomain({ hostname, selfHostedSlug })

  const isInvalidSubdomain = subdomain !== slug
  if (isProduction(forceProductionEnv) && isInvalidSubdomain) {
    return false
  }

  return true
}
