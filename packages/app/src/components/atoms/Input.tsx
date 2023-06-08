import cn from 'classnames'
import { InputHTMLAttributes } from 'react'
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
    'block w-full px-4 py-2.5 mt-2 rounded outline-0 border-0 ring-0 !bg-white transition-shadow duration-300 shadow-input shadow-gray-200 focus:outline-0 focus:ring-0 focus:shadow-input-focused focus:shadow-primary',
    hasError ? 'shadow-red-400 shadow-input-focused' : ''
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
