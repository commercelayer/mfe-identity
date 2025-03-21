import cn from "classnames"
import {
  Children,
  type FC,
  type FunctionComponent,
  type ReactNode,
  type ReactPortal,
  cloneElement,
  isValidElement,
} from "react"
import type { Simplify } from "type-fest"
import { useDelayShow } from "#hooks/useDelayShow"
import { isFunctionComponent } from "#utils/children"

type ReactNodeNoPortal = Exclude<ReactNode, ReactPortal>

type SkeletonTemplateProps<P = Record<string, unknown>> = Simplify<
  P & {
    /**
     * This prevents `SkeletonTemplate` to appear immediately.
     * It can be used when loading times are too short and you don't want flashing of content
     * @default 500
     */
    delayMs?: number
    /**
     * When `true` it shows pulsing gray elements instead of the real content.
     */
    isLoading?: boolean
  }
>

function childrenRecursiveMap(
  children: ReactNodeNoPortal,
  options: SkeletonTemplateProps,
  fn: (child: ReactNodeNoPortal) => ReactNodeNoPortal,
): ReactNodeNoPortal {
  if (Children.count(children) === 1) {
    return childRecursiveMap(children, options, fn)
  }

  return Children.map(children, (child) =>
    childRecursiveMap(child, options, fn),
  )
}

function childRecursiveMap(
  child: ReactNodeNoPortal,
  options: SkeletonTemplateProps,
  fn: (child: ReactNodeNoPortal) => ReactNodeNoPortal,
): ReactNodeNoPortal {
  if (isValidElement<React.PropsWithChildren>(child)) {
    if (isSkeletonTemplate(child)) {
      return cloneElement(child, {
        isLoading: child.props.isLoading ?? options.isLoading,
        delayMs: child.props.delayMs ?? options.delayMs,
      })
    }

    if (child.props.children != null) {
      return fn(
        cloneElement(child, {
          children: childrenRecursiveMap(
            child.props.children as JSX.Element,
            options,
            fn,
          ),
        }),
      )
    }
  }

  return fn(child)
}

export interface SkeletonTemplateComponent<P = Record<string, unknown>>
  extends FunctionComponent<P> {
  isSkeletonTemplate: true
}

export function withSkeletonTemplate<P>(
  Element: FC<SkeletonTemplateProps<P>>,
): SkeletonTemplateComponent<SkeletonTemplateProps<P>> {
  const withSkeletonTemplate: SkeletonTemplateComponent<
    SkeletonTemplateProps<P>
  > = (props) => {
    const { isLoading, delayMs } = props
    const element = Element({ ...props, isLoading, delayMs })

    if (element != null) {
      return (
        <SkeletonTemplate isLoading={isLoading} delayMs={delayMs}>
          {element}
        </SkeletonTemplate>
      )
    }

    return element
  }

  withSkeletonTemplate.displayName = "withSkeletonTemplate"
  withSkeletonTemplate.isSkeletonTemplate = true

  return withSkeletonTemplate
}

export function isSkeletonTemplate(
  child: ReactNode,
): child is React.ReactElement<
  Pick<SkeletonTemplateProps, "delayMs" | "isLoading">
> {
  if (child == null) {
    return false
  }

  return (
    isFunctionComponent(child) &&
    "isSkeletonTemplate" in child.type &&
    (child.type as SkeletonTemplateComponent).isSkeletonTemplate
  )
}

const SkeletonTemplate: SkeletonTemplateComponent<
  SkeletonTemplateProps<{ children: ReactNodeNoPortal }>
> = ({ children, isLoading, delayMs = 500 }) => {
  const [show] = useDelayShow(delayMs)
  const skeletonClass =
    "select-none !border-gray-50 pointer-events-none animate-pulse !bg-gray-50 rounded text-transparent [&>*]:invisible object-out-of-bounds"

  if (isLoading !== true) {
    return <>{children}</>
  }

  return (
    <div
      className="select-none pointer-events-none inline"
      style={{ opacity: show ? undefined : 0 }}
    >
      {childrenRecursiveMap(
        children,
        {
          isLoading,
          delayMs,
        },
        (child) => {
          if (child == null) {
            return child
          }

          if (
            !isValidElement<React.PropsWithChildren<{ className?: string }>>(
              child,
            )
          ) {
            return <span className={skeletonClass}>{child}</span>
          }

          const props = Object.fromEntries(
            Object.entries(child.props as Record<string, unknown>).map(
              ([key, value]) => {
                if (key !== "children" && isValidElement(value)) {
                  const newValue = (
                    <SkeletonTemplate delayMs={0} isLoading>
                      {value}
                    </SkeletonTemplate>
                  )

                  return [key, newValue]
                }

                return [key, value]
              },
            ),
          )

          if (child.type === "input" || child.type === "button") {
            return cloneElement(child, {
              ...props,
              className: cn(props.className as string, skeletonClass),
            })
          }

          return cloneElement(child, props)
        },
      )}
    </div>
  )
}

SkeletonTemplate.displayName = "SkeletonTemplate"
SkeletonTemplate.isSkeletonTemplate = true
export { SkeletonTemplate }
