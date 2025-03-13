/**
 * Gets the subdomain from a full hostname
 *
 * @param hostname - Example: "my-org.commercelayer.app"
 * @returns the last level of subdomain found. Example `my-org`
 */
export const makeSubdomain = (hostname: string): string => {
  return hostname?.split(":")[0].split(".")[0]
}

/**
 * Obtain a subdomain starting from the current `window.hostname` and the `selfHostedSlug` environment variable.
 *
 * @param hostname - The full `window.location.hostname` Example: "my-org.commercelayer.app"
 * @param selfHostedSlug - The organization slug used to generate the accessToken.
 *
 * @returns a string containing the calculated subdomain.
 */
export const getSubdomain = ({
  hostname,
  selfHostedSlug,
}: {
  hostname: string
  selfHostedSlug?: string | null
}): string => {
  // when app is not hosted by CL we can't rely on subdomain to match organization slug
  // so we require to fill `selfHostedSlug` prop in `public/config.js`
  const isCommerceLayerHosted = selfHostedSlug == null
  const subdomain = isCommerceLayerHosted
    ? makeSubdomain(hostname)
    : selfHostedSlug
  return subdomain
}
