import CommerceLayer from '@commercelayer/sdk'

import type { Customer } from '@commercelayer/sdk'
import type { SignUpFormValues } from 'Forms'

import { Settings } from 'App'

export type CreateCustomerConfig = Pick<
  SignUpFormValues,
  'customerEmail' | 'customerPassword'
> & {
  endpoint: Settings['endpoint']
  accessToken: Settings['accessToken']
}

/**
 * Create requested customer with auto-retries in case of network or timeout errors.
 *
 * @param endpoint - Base endpoint URL to be used for API requests by Commerce Layer libraries.
 * @param accessToken - Access Token for a sales channel API credentials obtained using login password flow
 * @param customerEmail - Customer email address
 * @param customerPassword - Customer password
 * @returns an object containing the created `Customer` and the status of async operation.
 */

export const createCustomer = async ({
  endpoint,
  accessToken,
  customerEmail,
  customerPassword
}: CreateCustomerConfig): Promise<Customer | undefined> => {
  if (customerEmail.length === 0 || customerPassword.length === 0)
    return undefined

  const slugAndDomain = endpoint.replace('https://', '').split(/\.(.*)/s)

  const client = CommerceLayer({
    organization: slugAndDomain[0] ?? '',
    accessToken: accessToken ?? '',
    domain: slugAndDomain[1] ?? ''
  })

  return await client.customers.create({
    email: customerEmail,
    password: customerPassword
  })
}
