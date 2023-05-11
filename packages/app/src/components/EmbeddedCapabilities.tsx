import { FC, useEffect, useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet-async'

import { isEmbedded } from '#utils/isEmbedded'

function sendEventClose(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    window.parentIFrame?.sendMessage({ type: 'close' }, '*')
  }
}

function sendEventBlur(): void {
  window.parentIFrame?.sendMessage({ type: 'blur' }, '*')
}

const IframeResizerInit: FC = () => {
  const embedded = isEmbedded()

  useEffect(
    function setEventListeners() {
      if (!embedded) {
        return
      }

      window.addEventListener('keydown', sendEventClose)
      window.addEventListener('blur', sendEventBlur)
      return () => {
        window.removeEventListener('keydown', sendEventClose)
        window.removeEventListener('blur', sendEventBlur)
      }
    },
    [embedded]
  )

  useLayoutEffect(
    function initIFrameResizerSettings() {
      if (!embedded) {
        return
      }

      window.iFrameResizer = {
        onMessage: ({ type }) => {
          console.log('onMessage', type)
        }
      }
    },
    [embedded]
  )

  if (!embedded) {
    return null
  }

  return (
    <Helmet>
      <script
        src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.js'
        data-testid='iframe-resizer-script'
        type='text/javascript'
      />
    </Helmet>
  )
}

export const EmbeddedCapabilities = {
  IframeResizerInit
}
