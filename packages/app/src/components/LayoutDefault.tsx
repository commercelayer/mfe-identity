import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import { useIdentityContext } from '#providers/provider'
import { Header } from '#components/Header'
import { Footer } from '#components/Footer'
import { PageHead } from '#components/PageHead'
import { PageErrorLayout } from '#components/PageErrorLayout'
import {
  SkeletonTemplate,
  withSkeletonTemplate
} from '#components/SkeletonTemplate'
import { isEmbedded } from '#utils/isEmbedded'

import type { ChildrenElement } from 'App'

const DefaultSkeletonFC: React.FC = () => (
  <div className='flex flex-col w-full'>
    <h1 className='text-[32px] leading-[38px] text-black font-semibold'>
      Title
    </h1>
    <p className='pt-2 text-sm text-gray-500 font-medium'>
      Lorem ipsum dolor sit amnet
    </p>
  </div>
)

const DefaultSkeleton = withSkeletonTemplate(DefaultSkeletonFC)

interface Props {
  children: ChildrenElement
}

export function LayoutDefault({ children }: Props): JSX.Element {
  const { state } = useIdentityContext()
  const { t } = useTranslation()
  const { isLoading, isOnError } = state

  if (isOnError) {
    return <PageErrorLayout statusCode={500} message='Application error.' />
  }

  const wrapperCss = cn([
    'relative w-full md:w-[420px] mx-auto px-8 md:px-0',
    !isEmbedded() && 'h-screen'
  ])

  return (
    <>
      <PageHead
        title={t('general.title', {
          companyName: state.settings.companyName
        }).toString()}
        faviconUrl={state.settings.faviconUrl}
      />
      <div className='container antialiased'>
        <div className={wrapperCss}>
          {!isEmbedded() ? <Header /> : null}
          {isLoading ? (
            <SkeletonTemplate isLoading={isLoading} delayMs={0}>
              <DefaultSkeleton />
            </SkeletonTemplate>
          ) : (
            <div className='flex flex-col w-full'>{children}</div>
          )}
          {!isEmbedded() ? <Footer /> : null}
        </div>
      </div>
    </>
  )
}
