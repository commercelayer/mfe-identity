import { useFormContext } from 'react-hook-form'
import get from 'lodash/get'

export function useValidationFeedback(name: string): string | undefined {
  const {
    formState: { errors }
  } = useFormContext()
  const message = get(errors, name)?.message
  const hasErrorMessage = message != null && typeof message === 'string'

  if (hasErrorMessage) {
    return message
  }
}
