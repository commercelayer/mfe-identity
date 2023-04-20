import cn from 'classnames'

import { useIdentityContext } from '#providers/provider'
import { Header } from '#components/Header'
import { Footer } from '#components/Footer'
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
  const { isLoading } = state

  const wrapperCss = cn([
    'relative w-full md:w-[420px] mx-auto px-8 md:px-0',
    !isEmbedded() && 'h-screen'
  ])

  return (
    <div className='container antialiased'>
      <div className={wrapperCss}>
        {!isEmbedded() ? <Header /> : null}
        {isLoading ? (
          <SkeletonTemplate isLoading={isLoading} delayMs={0}>
            <DefaultSkeleton />
          </SkeletonTemplate>
        ) : (
          children
        )}
        {!isEmbedded() ? <Footer /> : null}
      </div>
    </div>
  )
}
