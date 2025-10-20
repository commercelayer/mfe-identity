import CommerceLayer, { CommerceLayerStatic } from "@commercelayer/sdk"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormProvider, useForm } from "react-hook-form"
import * as yup from "yup"

import { Button } from "#components/atoms/Button"
import { Input } from "#components/atoms/Input"
import { useIdentityContext } from "#providers/provider"

import { useState } from "react"
import { ValidationApiError } from "./ValidationApiError"

const validationSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
})

type ResetPasswordFormValues = yup.InferType<typeof validationSchema>

interface ResetPasswordFormProps {
  customerPasswordResetId: string
  resetPasswordToken: string
  onSuccess: () => void
}

export const ResetPasswordForm = ({
  customerPasswordResetId,
  resetPasswordToken,
  onSuccess,
}: ResetPasswordFormProps): JSX.Element => {
  const { settings, config } = useIdentityContext()
  const [apiError, setApiError] = useState({})

  const form = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: { password: "", confirmPassword: "" },
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = form.handleSubmit(async (formData) => {
    const client = CommerceLayer({
      organization: settings.companySlug,
      accessToken: settings.accessToken,
      domain: config.domain,
    })

    try {
      await client.customer_password_resets.update({
        id: customerPasswordResetId ?? "",
        _reset_password_token: resetPasswordToken ?? "",
        customer_password: formData.password,
      })
      onSuccess()
    } catch (e: unknown) {
      const apiError = {
        errors: CommerceLayerStatic.isApiError(e)
          ? e.errors
          : "Problem resetting password. Please try again or contact support.",
      }
      setApiError(apiError)
    }
  })

  return (
    <FormProvider {...form}>
      <form className="mt-8 mb-0" onSubmit={onSubmit}>
        <div className="space-y-4">
          <Input name="password" label="Password" type="password" />
          <Input
            name="confirmPassword"
            label="Confirm password"
            type="password"
          />
          <div className="flex pt-4">
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "..." : "Set password"}
            </Button>
          </div>
          <ValidationApiError apiError={apiError} />
        </div>
      </form>
    </FormProvider>
  )
}
