import cn from 'classnames'
import { InputHTMLAttributes, forwardRef } from 'react'
import { InputLabel } from '#components/atoms/InputLabel'
import { InputValidationError } from '#components/atoms/InputValidationError'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hasError?: boolean
  errorMessage?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label = '', hasError = false, errorMessage = '', type, ...props },
    ref
  ): JSX.Element => {
    const inputCss = cn([
      'block w-full px-4 mt-2 h-[44px] rounded ring-inset outline-0 focus:border-primary focus:ring-primary border-gray-200 text-md',
      hasError ? 'border-red-400 ring-red-400 ring-1' : ''
    ])
    return (
      <div className='field !mb-8'>
        <InputLabel label={label} />
        <input {...props} className={inputCss} type={type} ref={ref} />
        {hasError && <InputValidationError errorMessage={errorMessage} />}
      </div>
    )
  }
)
