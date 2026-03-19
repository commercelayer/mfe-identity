import CommerceLayer, { CommerceLayerStatic } from "@commercelayer/sdk"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "#components/atoms/Button"
import { Input } from "#components/atoms/Input"
import { useIdentityContext } from "#providers/provider"

import { useState } from "react"
import { ValidationApiError } from "./ValidationApiError"

const validationSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .superRefine((data, ctx) => {
    if (
      data.password.length > 0 &&
      data.confirmPassword.length > 0 &&
      data.confirmPassword !== data.password
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords must match",
      })
    }
  })

type ResetPasswordFormValues = z.infer<typeof validationSchema>

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
    resolver: zodResolver(validationSchema),
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
