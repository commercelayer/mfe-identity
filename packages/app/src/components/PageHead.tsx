import { Settings } from 'App'
import { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import { defaultSettings } from '#utils/getSettings'

type Props = Partial<Pick<Settings, 'faviconUrl'>> & {
  /**
   * Page title, if `undefined` default app title will be used.
   */
  title?: string
}

export const PageHead: FC<Props> = ({
  title = '',
  faviconUrl = defaultSettings.faviconUrl
}) => {
  const { t } = useTranslation()

  return (
    <Helmet>
      <title>
        {title ??
          t('general.title', { companyName: defaultSettings.companyName })}
      </title>
      <link rel='icon' href={faviconUrl} />
    </Helmet>
  )
}
