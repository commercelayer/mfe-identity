declare module 'App' {
  export interface Settings {
    /**
     * Commerce Layer Oauth applications' unique identifier used to identify the client during the authentication flow.
     * Read more at {@link https://docs.commercelayer.io/core/applications} and {@link https://docs.commercelayer.io/core/authentication}
     */
    clientId: string
    /**
     * String specified during the authentication flow to restrict the scope of obtained access token to a market and/or to a stock location.
     * Example: `market:1234` or `stock_location:4567` or `market:1234 stock_location:4567`
     * Read more at {@link https://docs.commercelayer.io/core/authentication#authorization-scopes}
     */
    scope: string
    /**
     * Access Token for a sales channel API credentials to be used to authenticate all Commerce Layer API requests.
     * Read more at {@link https://docs.commercelayer.io/core/authentication/client-credentials#sales-channel}, {@link https://docs.commercelayer.io/core/authentication/client-credentials}
     */
    accessToken: string
    /**
     * Access Token for a sales channel API credentials obtained using login password flow.
     * Read more at {@link https://docs.commercelayer.io/core/authentication/client-credentials#password}, {@link https://docs.commercelayer.io/core/authentication/password}
     */
    customerAccessToken?: string
    /**
     * Access Token expiry date for a sales channel API credentials obtained using login password flow.
     * Read more at {@link https://docs.commercelayer.io/core/authentication/client-credentials#password}, {@link https://docs.commercelayer.io/core/authentication/password}
     */
    customerAccessTokenExpires?: string
    /**
     * Organization slug.
     * Read more at {@link https://docs.commercelayer.io/core/v/api-reference/organization/object}.
     */
    companySlug: string
    /**
     * Organization name.
     * Read more at {@link https://docs.commercelayer.io/core/v/api-reference/organization/object}.
     */
    companyName: string
    /**
     * Primary color HEX code found, if set, in current organization.
     * It will be used to generate custom CSS (example: primary button style).
     * Read more at {@link https://docs.commercelayer.io/core/v/api-reference/organization/object}.
     */
    primaryColor: string
    /**
     * Logo URL found in current organization (if set).
     * Read more at {@link https://docs.commercelayer.io/core/v/api-reference/organization/object}.
     */
    logoUrl?: string
    /**
     * Favicon URL found, if set, in current organization.
     * Read more at {@link https://docs.commercelayer.io/core/v/api-reference/organization/object}.
     */
    faviconUrl: string
    /**
     * This flag allows TypeScript to discriminate between `Settings` and `InvalidSettings` union type.
     */
    isValid: true
  }

  type InvalidSettings = Pick<
    Settings,
    'primaryColor' | 'companyName' | 'logoUrl' | 'faviconUrl'
  > & {
    /**
     * This flag allows TypeScript to discriminate between `Settings` and `InvalidSettings` union type.
     */
    isValid: false
    /**
     * When `true`, it indicates the encountered error might be temporary (eg. connectivity error)
     * and the user can manually retry by refreshing browser tab.
     */
    retryable: boolean
  }
}
