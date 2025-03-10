import get from "lodash/get"
import { useFormContext } from "react-hook-form"

interface ValidationError {
  hasError: boolean
  errorMessage: string | undefined
}

export function useValidationFeedback(name: string): ValidationError {
  const {
    formState: { errors },
  } = useFormContext()
  const message = get(errors, name)?.message

  return {
    hasError: message != null && typeof message === "string",
    errorMessage: message as string,
  }
}
