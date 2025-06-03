import cn from "classnames"

import { PageHead } from "#components/PageHead"
import { LogoCL } from "#components/atoms/LogoCL"
import { Footer } from "#components/composite/Footer"
import { isEmbedded } from "#utils/isEmbedded"

interface Props {
  /**
   * Page title, if `undefined` default app title will be used.
   */
  title?: string
  /**
   * Short identifier to be shown as error code. This is meant to be for displaying only, it does not affect HTTP response status.
   */
  statusCode: string | number
  /**
   * A brief description of the encountered error.
   */
  message: string
}

export function PageErrorLayout({ statusCode, message }: Props): JSX.Element {
  const wrapperCss = cn([
    "relative items-center w-full md:w-[420px] mx-auto px-8 md:px-0",
    !isEmbedded() && "h-screen",
  ])

  return (
    <>
      <PageHead />
      <div className="container">
        <div className={wrapperCss}>
          {!isEmbedded() ? (
            <div className="m-0 mb-[112px] pt-[90px] text-xs text-gray-400">
              <LogoCL className="text-black max-h-8 max-w-full" />
            </div>
          ) : null}
          <div className="py-20 flex flex-1 justify-center">
            <div className="flex items-center pb-20">
              <div className="p-4 text-xl font-bold border-gray-300 text-gray-800 border-b md:border-r md:border-b-0">
                {statusCode}
              </div>
              <div className="p-4 text-sm text-gray-500 leading-none">
                {message}
              </div>
            </div>
          </div>
          {!isEmbedded() ? <Footer /> : null}
        </div>
      </div>
    </>
  )
}
