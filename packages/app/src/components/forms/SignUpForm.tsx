import { authentication } from '@commercelayer/js-auth'
import CommerceLayer from '@commercelayer/sdk'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider } from 'react-hook-form'
import * as yup from 'yup'
import { useRouter } from 'wouter'

import { appRoutes } from '#data/routes'
import { Button } from '#components/atoms/Button'
import { Input } from '#components/atoms/Input'
import { useIdentityContext } from '#providers/provider'
import { getParamFromUrl } from '#utils/getParamFromUrl'
import { redirectToReturnUrl } from '#utils/redirectToReturnUrl'

import type { UseFormReturn, UseFormProps } from 'react-hook-form'
import type { SignUpFormValues } from 'Forms'
import { ValidationApiError } from './ValidationApiError'
import { useState } from 'react'

const validationSchema = yup.object().shape({
  customerEmail: yup
    .string()
    .email('Email is invalid')
    .required('Email is required'),
  customerPassword: yup.string().required('Password is required'),
  customerConfirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('customerPassword'), ''], 'Passwords must match')
})

export const SignUpForm = (): JSX.Element => {
  const { settings, config } = useIdentityContext()
  const [apiError, setApiError] = useState({})
  const router = useRouter()
  const customerEmail = getParamFromUrl('customerEmail')

  const form: UseFormReturn<SignUpFormValues, UseFormProps> =
    useForm<SignUpFormValues>({
      resolver: yupResolver(validationSchema),
      defaultValues: { customerEmail: customerEmail ?? '' }
    })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = form.handleSubmit(async (formData) => {
    const client = CommerceLayer({
      organization: settings.companySlug,
      accessToken: settings.accessToken,
      domain: config.domain
    })

    const createCustomerResponse = await client.customers
      .create({
        email: formData.customerEmail,
        password: formData.customerPassword
      })
      .catch((e) => {
        const apiError = { errors: e.errors }
        setApiError(apiError)
      })

    if (createCustomerResponse?.id != null) {
      await authentication('password', {
        clientId: settings.clientId,
        slug: settings.companySlug,
        domain: config.domain,
        scope: settings.scope,
        username: formData.customerEmail,
        password: formData.customerPassword
      })
        .then((tokenData) => {
          if (tokenData.accessToken != null) {
            redirectToReturnUrl({
              accessToken: tokenData.accessToken,
              scope: tokenData.scope
            })
          }
        })
        .catch(() => {
          form.setError('root', {
            type: 'custom',
            message: 'Invalid credentials'
          })
        })
    }
  })

  return (
    <FormProvider {...form}>
      <form
        className='mt-8 mb-0'
        onSubmit={(e) => {
          void onSubmit(e)
        }}
      >
        <div className='space-y-4'>
          <Input name='customerEmail' label='Email' type='email' />
          <Input name='customerPassword' label='Password' type='password' />
          <Input
            name='customerConfirmPassword'
            label='Confirm password'
            type='password'
          />
          <div className='flex pt-4'>
            <Button disabled={isSubmitting} type='submit'>
              {isSubmitting ? '...' : 'Sign up'}
            </Button>
          </div>
          <ValidationApiError
            apiError={apiError}
            fieldMap={{
              email: 'customerEmail',
              password: 'customerPassword'
            }}
          />
        </div>
      </form>
      <div>
        <p className='pt-6 text-base text-gray-500 font-medium'>
          Already have an account?{' '}
          <a
            className='text-primary font-bold hover:opacity-80'
            href={`${router.base}${appRoutes.login.makePath()}${
              window?.location.search ?? ''
            }`}
          >
            Login
          </a>
          .
        </p>
      </div>
    </FormProvider>
  )
}
