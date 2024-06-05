import { authenticate } from '@commercelayer/js-auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'wouter'
import * as yup from 'yup'

import { A } from '#components/atoms/A'
import { Alert } from '#components/atoms/Alert'
import { Button } from '#components/atoms/Button'
import { Input } from '#components/atoms/Input'
import { appRoutes } from '#data/routes'
import { useIdentityContext } from '#providers/provider'

import { getParamFromUrl } from '#utils/getParamFromUrl'
import { redirectToReturnUrl } from '#utils/redirectToReturnUrl'

import type { LoginFormValues } from 'Forms'
import type { UseFormProps, UseFormReturn } from 'react-hook-form'

const validationSchema = yup.object().shape({
  customerEmail: yup
    .string()
    .email('Email is invalid')
    .required('Email is required'),
  customerPassword: yup.string().required('Password is required')
})

export const LoginForm = (): JSX.Element => {
  const { settings, config } = useIdentityContext()
  const router = useRouter()

  const customerEmail = getParamFromUrl('customerEmail')
  const resetPasswordUrl = getParamFromUrl('resetPasswordUrl') ?? ''

  const form: UseFormReturn<LoginFormValues, UseFormProps> =
    useForm<LoginFormValues>({
      resolver: yupResolver(validationSchema),
      defaultValues: { customerEmail: customerEmail ?? '' }
    })

  const isSubmitting = form.formState.isSubmitting
  const onSubmit = form.handleSubmit(async (formData) => {
    await authenticate('password', {
      clientId: settings.clientId,
      domain: config.domain,
      scope: settings.scope,
      username: formData.customerEmail,
      password: formData.customerPassword
    })
      .then((tokenData) => {
        if (tokenData.accessToken != null) {
          redirectToReturnUrl({
            scope: tokenData.scope,
            accessToken: tokenData.accessToken,
            expires: tokenData.expires.toISOString()
          })
        } else {
          form.setError('root', {
            type: 'custom',
            message: 'Invalid credentials'
          })
        }
      })
      .catch(() => {
        form.setError('root', {
          type: 'custom',
          message: 'Invalid credentials'
        })
      })
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
          {resetPasswordUrl.length > 0 && (
            <div className='text-right'>
              <A href={`${resetPasswordUrl}`} target='_blank'>
                Forgot password?
              </A>
            </div>
          )}
          <div className='flex pt-4'>
            <Button disabled={isSubmitting} type='submit'>
              {isSubmitting ? '...' : 'Login'}
            </Button>
          </div>
          {form.formState.errors?.root != null && (
            <div className='pt-4'>
              <Alert variant='danger' title='Invalid credentials' />
            </div>
          )}
        </div>
      </form>
      <div>
        <p className='pt-6 text-base text-gray-500 font-medium'>
          Don't have an account?{' '}
          <A
            href={`${router.base}${appRoutes.signUp.makePath()}${
              window?.location.search ?? ''
            }`}
          >
            Sign up for free
          </A>
          .
        </p>
      </div>
    </FormProvider>
  )
}
