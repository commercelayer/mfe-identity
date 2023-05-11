export {}

declare global {
  interface Window {
    clAppConfig: {
      /**
       * Specific domain to use for Commerce Layer API requests.
       * It must be set as `commercelayer.io`.
       */
      domain: string
    }
  }
}
