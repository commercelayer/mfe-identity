import { useFormContext } from 'react-hook-form'
import get from 'lodash/get'

interface ValidationError {
  hasError: boolean
  errorMessage: string | undefined
}

export function useValidationFeedback(name: string): ValidationError {
  const {
    formState: { errors }
  } = useFormContext()
  const message = get(errors, name)?.message

  return {
    hasError: message != null && typeof message === 'string',
    errorMessage: message as string
  }
}
