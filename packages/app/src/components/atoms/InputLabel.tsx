import { forwardRef, type HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: string
}

export const InputLabel = forwardRef<HTMLDivElement, Props>(
  ({ label = '', ...props }, ref): JSX.Element => {
    return (
      <>
        <div
          className='flex justify-between items-center mb-2'
          {...props}
          ref={ref}
        >
          <label className='text-black leading-6 font-semibold text-base'>
            {label}
          </label>
        </div>
      </>
    )
  }
)
