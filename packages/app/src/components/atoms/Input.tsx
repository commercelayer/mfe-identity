import cn from 'classnames'
import { type InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputLabel } from '#components/atoms/InputLabel'
import { InputValidationError } from '#components/atoms/InputValidationError'
import { useValidationFeedback } from '#components/forms/useValidationFeedback'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = ({
  name = '',
  label = '',
  type,
  ...props
}: Props): JSX.Element => {
  const form = useFormContext()
  const { hasError, errorMessage } = useValidationFeedback(name)
  const inputCss = cn([
    'w-full autofill:text-base px-4 py-2.5 mt-2 rounded outline-0 border-0 !ring-inset ring-1 ring-gray-200 transition-shadow duration-300 !bg-white !shadow-[0_0_0_1000px_white_inset] focus:ring-2 focus:ring-primary',
    hasError ? 'ring-red-400 ring-2' : ''
  ])
  return (
    <div className='field !mb-8'>
      <InputLabel label={label} />
      <input
        {...form?.register(name)}
        {...props}
        className={inputCss}
        type={type}
      />
      {hasError && <InputValidationError errorMessage={errorMessage} />}
    </div>
  )
}
