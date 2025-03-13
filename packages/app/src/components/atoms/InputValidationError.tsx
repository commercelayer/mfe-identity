import { WarningCircle } from "@phosphor-icons/react"
import { type HTMLAttributes, forwardRef } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  errorMessage?: string
}

export const InputValidationError = forwardRef<HTMLDivElement, Props>(
  ({ errorMessage = "", ...props }, ref): JSX.Element => {
    return (
      <>
        <div
          {...props}
          ref={ref}
          className="flex items-center gap-1 text-red-400 font-bold mt-2"
        >
          <WarningCircle size={20} weight="bold" />
          <div className="text-sm">{errorMessage}</div>
        </div>
      </>
    )
  },
)
