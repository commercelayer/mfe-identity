import { authenticate } from "@commercelayer/js-auth"
import CommerceLayer from "@commercelayer/sdk"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { useRouter } from "wouter"
import { z } from "zod"

import { A } from "#components/atoms/A"
import { Button } from "#components/atoms/Button"
import { Input } from "#components/atoms/Input"
import { appRoutes } from "#data/routes"
import { useIdentityContext } from "#providers/provider"
import { getParamFromUrl } from "#utils/getParamFromUrl"
import { redirectToLoginUrl } from "#utils/redirectToLoginUrl"
import { redirectToReturnUrl } from "#utils/redirectToReturnUrl"

import type { SignUpFormValues } from "Forms"
import { useState } from "react"
import type { UseFormProps, UseFormReturn } from "react-hook-form"
import { ValidationApiError } from "./ValidationApiError"

const validationSchema = z
  .object({
    customerEmail: z
      .string()
      .min(1, "Email is required")
      .email("Email is invalid"),
    customerPassword: z.string().min(1, "Password is required"),
    customerConfirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .superRefine((data, ctx) => {
    if (
      data.customerPassword.length > 0 &&
      data.customerConfirmPassword.length > 0 &&
      data.customerConfirmPassword !== data.customerPassword
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customerConfirmPassword"],
        message: "Passwords must match",
      })
    }
  })

export const SignUpForm = (): JSX.Element => {
  const { settings, config } = useIdentityContext()
  const [apiError, setApiError] = useState({})
  const router = useRouter()
  const customerEmail = getParamFromUrl("customerEmail")

  const form: UseFormReturn<SignUpFormValues, UseFormProps> =
    useForm<SignUpFormValues>({
      resolver: zodResolver(validationSchema),
      defaultValues: { customerEmail: customerEmail ?? "" },
    })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = form.handleSubmit(async (formData) => {
    const client = CommerceLayer({
      organization: settings.companySlug,
      accessToken: settings.accessToken,
      domain: config.domain,
    })

    const createCustomerResponse = await client.customers
      .create({
        email: formData.customerEmail,
        password: formData.customerPassword,
      })
      .catch((e) => {
        const apiError = { errors: e.errors }
        setApiError(apiError)
      })

    if (createCustomerResponse?.id != null) {
      await authenticate("password", {
        clientId: settings.clientId,
        domain: config.domain,
        scope: settings.scope,
        username: formData.customerEmail,
        password: formData.customerPassword,
      })
        .then((tokenData) => {
          if (tokenData.accessToken != null) {
            redirectToReturnUrl({
              scope: tokenData.scope,
              accessToken: tokenData.accessToken,
              expires: tokenData.expires.toISOString(),
            })
          } else {
            redirectToLoginUrl({
              loginUrl: `${window.location.protocol}//${window.location.host}${router.base}${appRoutes.login.makePath()}`,
              clientId: settings.clientId,
              scope: settings.scope,
              publicScope: settings.publicScope,
              returnUrl: getParamFromUrl("returnUrl") ?? "",
              resetPasswordUrl: getParamFromUrl("resetPasswordUrl") ?? "",
              customerEmail: formData.customerEmail ?? "",
            })
          }
        })
        .catch(() => {
          redirectToLoginUrl({
            loginUrl: `${window.location.protocol}//${window.location.host}${router.base}${appRoutes.login.makePath()}`,
            clientId: settings.clientId,
            scope: settings.scope,
            publicScope: settings.publicScope,
            returnUrl: getParamFromUrl("returnUrl") ?? "",
            resetPasswordUrl: getParamFromUrl("resetPasswordUrl") ?? "",
            customerEmail: formData.customerEmail ?? "",
          })
        })
    }
  })

  return (
    <FormProvider {...form}>
      <form
        className="mt-8 mb-0"
        onSubmit={(e) => {
          void onSubmit(e)
        }}
      >
        <div className="space-y-4">
          <Input name="customerEmail" label="Email" type="email" />
          <Input name="customerPassword" label="Password" type="password" />
          <Input
            name="customerConfirmPassword"
            label="Confirm password"
            type="password"
          />
          <div className="flex pt-4">
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "..." : "Sign up"}
            </Button>
          </div>
          <ValidationApiError
            apiError={apiError}
            fieldMap={{
              email: "customerEmail",
              password: "customerPassword",
            }}
          />
        </div>
      </form>
      <div>
        <p className="pt-6 text-base text-gray-500 font-medium">
          Already have an account?{" "}
          <A
            href={`${router.base}${appRoutes.login.makePath()}${
              window?.location.search ?? ""
            }`}
          >
            Login
          </A>
          .
        </p>
      </div>
    </FormProvider>
  )
}
