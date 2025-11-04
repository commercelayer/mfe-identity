import { isEmpty } from "lodash"
import { useState } from "react"
import { Alert } from "#components/atoms/Alert"
import { PageHeading } from "#components/atoms/PageHeading"
import { ResetPasswordForm } from "#components/forms/ResetPasswordForm"
import { LayoutDefault } from "#components/layouts/LayoutDefault"
import { getParamFromUrl } from "#utils/getParamFromUrl"

export default function ResetPasswordPage(): JSX.Element {
  const [showSuccess, setShowSuccess] = useState(false)
  const customerPasswordResetId = getParamFromUrl("customerPasswordResetId")
  const resetPasswordToken = getParamFromUrl("resetPasswordToken")

  if (
    isEmpty(customerPasswordResetId) ||
    customerPasswordResetId == null ||
    isEmpty(resetPasswordToken) ||
    resetPasswordToken == null
  ) {
    return (
      <LayoutDefault>
        <Alert variant="danger" title="Invalid password reset link." />
      </LayoutDefault>
    )
  }

  if (showSuccess) {
    return (
      <LayoutDefault>
        <Alert
          variant="success"
          title="Your password has been reset successfully. You can close this
            window."
        />
      </LayoutDefault>
    )
  }

  return (
    <LayoutDefault>
      <PageHeading title="Reset Password" description="Enter a new password." />
      <ResetPasswordForm
        customerPasswordResetId={customerPasswordResetId}
        resetPasswordToken={resetPasswordToken}
        onSuccess={() => setShowSuccess(true)}
      />
    </LayoutDefault>
  )
}
