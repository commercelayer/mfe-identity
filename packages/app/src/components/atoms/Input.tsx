import cn from 'classnames'
import { InputHTMLAttributes } from 'react'
import { InputLabel } from '#components/atoms/InputLabel'
import { InputValidationError } from '#components/atoms/InputValidationError'
import { useFormContext } from 'react-hook-form'

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
  const hasError = form?.formState?.errors[name] != null
  const errorMessage = form?.formState?.errors[name]?.message as string

  const inputCss = cn([
    'block w-full px-4 py-2.5 mt-2 rounded outline-0 ring-1 ring-gray-200 border border-transparent focus:ring-primary focus:border-primary',
    hasError ? '!border-red-400 !ring-red-400 ring-1 border-1' : ''
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
