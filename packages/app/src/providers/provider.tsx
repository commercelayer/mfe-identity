import { createContext, useContext, useEffect, useReducer } from 'react'

import { PageErrorLayout } from '#components/layouts/PageErrorLayout'

import type { ChildrenElement } from 'App'
import type {
  IdentityProviderState,
  IdentityProviderValue
} from '#providers/types'

import { reducer } from '#providers/reducer'

import { getParamFromUrl } from '#utils/getParamFromUrl'
import { getSettings } from '#utils/getSettings'

import { DefaultSkeleton as DefaultSkeletonFC } from '#components/DefaultSkeleton'

import {
  SkeletonTemplate,
  withSkeletonTemplate
} from '#components/SkeletonTemplate'

interface IdentityProviderProps {
  /**
   * If needed, context value can be also accessed using a function as a child.
   *
   * Example:
   * ```
   * <IdentityProvider config={config}>
   *  {(ctx) => <div>identity</div>}
   * </IdentityProvider>
   * ```
   */
  children:
    | ((props: IdentityProviderValue) => ChildrenElement)
    | ChildrenElement
  config: CommerceLayerAppConfig
}

const IdentityContext = createContext<IdentityProviderValue>(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as IdentityProviderValue
)
export const useIdentityContext = (): IdentityProviderValue =>
  useContext(IdentityContext)

export function IdentityProvider({
  config,
  children
}: IdentityProviderProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true
  } as IdentityProviderState)

  const clientId = getParamFromUrl('clientId') ?? ''
  const scope = getParamFromUrl('scope') ?? ''
  const returnUrl = getParamFromUrl('returnUrl') ?? ''

  useEffect(() => {
    dispatch({ type: 'identity/onLoad' })

    if (clientId != null && scope != null) {
      getSettings({ clientId, scope, config })
        .then((settings) => {
          if (settings.isValid) {
            dispatch({ type: 'identity/loaded', payload: settings })
          } else {
            dispatch({ type: 'identity/onError' })
          }
        })
        .catch(() => {
          dispatch({ type: 'identity/onError' })
        })
    }
  }, [clientId, scope])

  if (clientId.length === 0 || scope.length === 0 || returnUrl.length === 0) {
    return (
      <PageErrorLayout statusCode={500} message='Missing required parameter.' />
    )
  }

  if (state.isLoading) {
    // Skeleton loader
    const DefaultSkeleton = withSkeletonTemplate(DefaultSkeletonFC)
    return (
      <SkeletonTemplate isLoading delayMs={0}>
        <DefaultSkeleton />
      </SkeletonTemplate>
    )
  }

  if (state.settings === undefined || !state.settings?.isValid) {
    return <PageErrorLayout statusCode={500} message='Application error.' />
  }

  const value: IdentityProviderValue = {
    settings: state.settings,
    config
  }
  return (
    <IdentityContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </IdentityContext.Provider>
  )
}
