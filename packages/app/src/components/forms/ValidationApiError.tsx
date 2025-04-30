import { isEmpty } from "lodash"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Alert } from "#components/atoms/Alert"
import { API_ERROR_FIELD_NAME, setApiFormErrors } from "#utils/setApiFormErrors"
import { useValidationFeedback } from "./useValidationFeedback"

interface ValidationApiErrorProps {
  /**
   * An error object returned from a failed API request.
   * We expect an object that contain an `errors` property with the Core Api error items shape.
   */

  // biome-ignore lint/suspicious/noExplicitAny: SDK API error object is not typed
  apiError: any
  /**
   * Optional map of app field names to API error field names.
   * This is useful when the API returns field names that are different from the app field names.
   * For example, if the API returns `first_name` instead of `firstName`, you can pass `{ first_name: 'firstName' }`.
   *
   * Format is:
   * ```{ apiFieldName: appFieldName }```
   */
  fieldMap?: Record<string, string>
}

function ValidationApiError({
  apiError,
  fieldMap,
}: ValidationApiErrorProps): JSX.Element {
  const { setError, getValues } = useFormContext()

  useEffect(() => {
    if (apiError != null && !isEmpty(apiError?.errors)) {
      setApiFormErrors({
        apiError,
        setError,
        formFields: Object.keys(getValues()),
        fieldMap,
      })
    }
  }, [apiError, apiError?.errors, setError, getValues, fieldMap])

  const { hasError, errorMessage } = useValidationFeedback(API_ERROR_FIELD_NAME)
  if (!hasError) return <></>
  return (
    <div className="pt-4">
      <Alert variant="danger" title={errorMessage ?? ""} />
    </div>
  )
}

ValidationApiError.displayName = "ValidationApiError"
export { ValidationApiError }
