import { type HTMLAttributes, forwardRef } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: string
  forElement?: string
}

export const InputLabel = forwardRef<HTMLDivElement, Props>(
  ({ label = "", forElement, ...props }, ref): JSX.Element => {
    return (
      <>
        <div
          className="flex justify-between items-center mb-2"
          {...props}
          ref={ref}
        >
          <label
            htmlFor={forElement}
            className="text-black leading-6 font-semibold text-base"
          >
            {label}
          </label>
        </div>
      </>
    )
  },
)
