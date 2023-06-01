import type { CommerceLayerClient, Organization } from '@commercelayer/sdk'

interface GetOrganizationConfig {
  /**
   * The signed Commerce Layer SDK client
   */
  client: CommerceLayerClient
}

/**
 * Retrieves the organization info with auto-retries in case of network or timeout errors.
 *
 * @param config - the `GetOrganizationConfig` object containing the signed sdk `client`
 * @returns an object containing the resolved `Organization` and the status of async operation.
 */

export const getOrganization = async ({
  client
}: GetOrganizationConfig): Promise<Organization> =>
  await getAsyncOrganization(client)

const getAsyncOrganization = async (
  client: CommerceLayerClient
): Promise<Organization> =>
  await client.organization.retrieve({
    fields: {
      organizations: [
        'id',
        'logo_url',
        'name',
        'primary_color',
        'favicon_url',
        'gtm_id',
        'gtm_id_test',
        'support_email',
        'support_phone'
      ]
    }
  })
