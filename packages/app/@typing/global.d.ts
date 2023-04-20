import { IFrameObject as IframeResizerObject } from 'iframe-resizer'

type IframeEvent = 'blur' | 'close'
type IframeReceivedEvent = 'update'

interface IframeMessagePayload {
  type: IframeEvent
  payload?: object
}

type IFrameObject = Omit<IframeResizerObject, 'sendMessage'> & {
  sendMessage: (message: IframeMessagePayload, targetOrigin: string) => void
}

export declare global {
  declare module '*.module.css'

  interface Window {
    parentIFrame?: IFrameObject
    iFrameResizer?: {
      onMessage?: (message: { type?: IframeReceivedEvent }) => void
    }
    /**
     * Commerce Layer app configuration available from global window object
     */
    clAppConfig: CommerceLayerAppConfig
  }

  interface CommerceLayerAppConfig {
    /**
     * Specific domain to use for Commerce Layer API requests.
     * It must be set as `commercelayer.io`.
     */
    domain: string
    /**
     * The organization slug that generates the accessToken.
     * When null it means the app is hosted by Commerce Layer.
     */
    selfHostedSlug?: string | null
  }
}
