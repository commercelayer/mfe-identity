import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import { useIdentityContext } from '#providers/provider'
import { Header } from '#components/composite/Header'
import { Footer } from '#components/composite/Footer'
import { PageHead } from '#components/PageHead'

import { isEmbedded } from '#utils/isEmbedded'

import type { ChildrenElement } from 'App'

interface Props {
  children: ChildrenElement
}

export function LayoutDefault({ children }: Props): JSX.Element {
  const { settings } = useIdentityContext()
  const { t } = useTranslation()

  const wrapperCss = cn([
    'relative w-full md:w-[420px] mx-auto px-8 md:px-0',
    !isEmbedded() && 'h-screen'
  ])

  return (
    <>
      <PageHead
        title={t('general.title', {
          companyName: settings.companyName
        }).toString()}
        faviconUrl={settings.faviconUrl}
      />
      <div className='container antialiased'>
        <div className={wrapperCss}>
          {!isEmbedded() ? <Header /> : null}
          <div className='flex flex-col w-full'>{children}</div>
          {!isEmbedded() ? <Footer /> : null}
        </div>
      </div>
    </>
  )
}
