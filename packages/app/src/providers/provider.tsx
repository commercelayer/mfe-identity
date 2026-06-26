import type { ChildrenElement } from "App"
import { createContext, useContext, useEffect, useReducer } from "react"
import { useLocation } from "wouter"
import { DefaultSkeleton as DefaultSkeletonFC } from "#components/DefaultSkeleton"
import { PageErrorLayout } from "#components/layouts/PageErrorLayout"
import {
  SkeletonTemplate,
  withSkeletonTemplate,
} from "#components/SkeletonTemplate"
import { appRoutes } from "#data/routes"
import { reducer } from "#providers/reducer"
import type {
  IdentityProviderState,
  IdentityProviderValue,
} from "#providers/types"
import { getParamFromUrl } from "#utils/getParamFromUrl"
import { getSettings } from "#utils/getSettings"

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
  {} as IdentityProviderValue,
)
export const useIdentityContext = (): IdentityProviderValue =>
  useContext(IdentityContext)

export function IdentityProvider({
  config,
  children,
}: IdentityProviderProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
  } as IdentityProviderState)

  // Calculate current path and check if it matches any of the app routes to determine if it's an app URL
  const [location] = useLocation()
  const currentPath = location.replace("/identity", "")
  const isAppUrl = Object.values(appRoutes).some(({ path }) =>
    currentPath.startsWith(path),
  )

  const clientId = getParamFromUrl("clientId") ?? ""
  const scope = getParamFromUrl("scope") ?? ""
  const publicScope = getParamFromUrl("publicScope") ?? undefined
  const returnUrl = getParamFromUrl("returnUrl") ?? ""

  useEffect(() => {
    dispatch({ type: "identity/onLoad" })

    if (isAppUrl && clientId != null && scope != null) {
      getSettings({ clientId, scope, publicScope, config })
        .then((settings) => {
          if (settings.isValid) {
            dispatch({ type: "identity/loaded", payload: settings })
          } else {
            dispatch({ type: "identity/onError" })
          }
        })
        .catch(() => {
          dispatch({ type: "identity/onError" })
        })
    }
  }, [clientId, scope, config, publicScope, isAppUrl])

  // Render 404 error if the current path does not match any of the app routes
  if (!isAppUrl) {
    return <PageErrorLayout statusCode={404} message="Page not found" />
  }

  if (clientId.length === 0 || scope.length === 0 || returnUrl.length === 0) {
    return (
      <PageErrorLayout statusCode={500} message="Missing required parameter." />
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

  if (!state.settings?.isValid) {
    return <PageErrorLayout statusCode={500} message="Application error." />
  }

  const value: IdentityProviderValue = {
    settings: state.settings,
    config,
  }
  return (
    <IdentityContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </IdentityContext.Provider>
  )
}
