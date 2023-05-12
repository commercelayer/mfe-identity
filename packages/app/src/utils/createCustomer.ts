import CommerceLayer from '@commercelayer/sdk'

import type { CommerceLayerClient, Customer } from '@commercelayer/sdk'

import { SignUpFormValues } from '#providers/types'

import { getSubdomain } from '#utils/getSubdomain'
import { retryCall } from '#utils/retryCall'

import type { FetchResource } from '#utils/retryCall'
import { Settings } from 'App'

type CreateCustomerConfig = Pick<
  SignUpFormValues,
  'customerEmail' | 'customerPassword'
> & {
  config: CommerceLayerAppConfig
  accessToken: Settings['accessToken']
}

type CreateAsyncCustomerConfig = Pick<
  SignUpFormValues,
  'customerEmail' | 'customerPassword'
> & {
  client: CommerceLayerClient
}

/**
 * Create requested customer with auto-retries in case of network or timeout errors.
 *
 * @param config - Commerce Layer app configuration available from global window object
 * @param accessToken - Access Token for a sales channel API credentials obtained using login password flow
 * @param customerEmail - Customer email address
 * @param customerPassword - Customer password
 * @returns an object containing the created `Customer` and the status of async operation.
 */

export const createCustomer = async ({
  config,
  accessToken,
  customerEmail,
  customerPassword
}: CreateCustomerConfig): Promise<FetchResource<Customer> | undefined> =>
  await retryCall(async () => {
    const hostname = window !== undefined ? window.location.hostname : ''
    const slug = getSubdomain({
      hostname,
      selfHostedSlug: config.selfHostedSlug
    })
    const domain = config.domain

    const client = CommerceLayer({
      organization: slug,
      accessToken: accessToken ?? '',
      domain
    })

    return await createAsyncCustomer({
      client,
      customerEmail,
      customerPassword
    })
  })

const createAsyncCustomer = async ({
  client,
  customerEmail,
  customerPassword
}: CreateAsyncCustomerConfig): Promise<Customer> =>
  await client.customers.create({
    email: customerEmail,
    password: customerPassword
  })
