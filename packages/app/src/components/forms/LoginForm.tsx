import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'wouter'

import { appRoutes } from '#data/routes'
import { Alert } from '#components/atoms/Alert'
import { Button } from '#components/atoms/Button'
import { Input } from '#components/atoms/Input'
import { useIdentityContext } from '#providers/provider'
import { isEmbedded } from '#utils/isEmbedded'
import { getCustomerToken } from '#utils/oauthRequests'
import {
  getClientIdFromUrl,
  getCustomerEmailFromUrl,
  getScopeFromUrl,
  getReturnUrlFromUrl
} from '#utils/getParamsFromUrl'

import type { UseFormReturn, UseFormProps } from 'react-hook-form'
import type { LoginFormValues } from 'Forms'

const validationSchema = yup.object().shape({
  customerEmail: yup
    .string()
    .email('Email is invalid')
    .required('Email is required'),
  customerPassword: yup.string().required('Password is required')
})

export const LoginForm = (): JSX.Element => {
  const { state } = useIdentityContext()
  const router = useRouter()
  const signUpSuccess =
    localStorage.getItem('cLayer-identity-signUpStatus') === 'success'
  const [showSignUpSuccess, setShowSignUpSuccess] = useState(
    Boolean(signUpSuccess)
  )

  const customerEmail = getCustomerEmailFromUrl()

  const form: UseFormReturn<LoginFormValues, UseFormProps> =
    useForm<LoginFormValues>({
      resolver: yupResolver(validationSchema),
      defaultValues: { customerEmail: customerEmail ?? '' }
    })

  const isSubmitting = form.formState.isSubmitting
  const onSubmit = form.handleSubmit(async (formData) => {
    try {
      const clientId = getClientIdFromUrl() ?? ''
      const scope = getScopeFromUrl() ?? ''
      const customerTokenResponse = await getCustomerToken({
        clientId,
        endpoint: state.settings.endpoint,
        scope,
        username: formData.customerEmail,
        password: formData.customerPassword
      })

      if (customerTokenResponse.access_token != null) {
        const returnUrl = getReturnUrlFromUrl()
        if (returnUrl != null && window !== undefined) {
          const topWindow = isEmbedded() ? window.parent : window
          const url = new URL(returnUrl)
          url.searchParams.append(
            'accessToken',
            customerTokenResponse.access_token
          )
          url.searchParams.append('scope', scope)
          topWindow.location.href = url.href
        }
      } else {
        form.setError('root', {
          type: 'custom',
          message: 'Invalid credentials'
        })
      }
    } catch (e) {
      form.setError('root', {
        type: 'custom',
        message: 'Invalid credentials'
      })
    }
  })

  useEffect(() => {
    if (showSignUpSuccess) {
      setTimeout(() => {
        setShowSignUpSuccess(false)
        localStorage.removeItem('cLayer-identity-signUpStatus')
      }, 2000)
    }
  }, [showSignUpSuccess])

  return (
    <>
      <form
        className='mt-8 mb-0'
        onSubmit={(e) => {
          e.preventDefault()
          void onSubmit()
        }}
      >
        <div className='space-y-4'>
          <Input
            {...form.register('customerEmail')}
            label='Email'
            hasError={form.formState.errors?.customerEmail != null}
            errorMessage={form.formState.errors.customerEmail?.message}
            type='email'
          />
          <Input
            {...form.register('customerPassword')}
            label='Password'
            hasError={form.formState.errors?.customerPassword != null}
            errorMessage={form.formState.errors.customerPassword?.message}
            type='password'
          />
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
          {showSignUpSuccess && (
            <div className='pt-4'>
              <Alert variant='success' title='Sign up successful' />
            </div>
          )}
        </div>
      </form>
      <div>
        <p className='pt-6 text-base text-gray-500 font-medium'>
          Don't have an account?{' '}
          <a
            className='text-primary font-bold hover:opacity-80'
            href={`${router.base}${appRoutes.signUp.makePath()}${
              window?.location.search ?? ''
            }`}
          >
            Sign up for free
          </a>
          .
        </p>
      </div>
    </>
  )
}
