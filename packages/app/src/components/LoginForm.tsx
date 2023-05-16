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
import { getCustomerEmailFromUrl } from '#utils/getParamsFromUrl'

import type { UseFormReturn, UseFormProps } from 'react-hook-form'
import type { LoginFormValues } from '#providers/types'

export const validationSchema = yup.object().shape({
  customerEmail: yup
    .string()
    .email('Email is invalid')
    .required('Email is required'),
  customerPassword: yup.string().required('Password is required')
})

export const LoginForm: React.FC = () => {
  const { state, customerLogin } = useIdentityContext()
  const signUpSuccess =
    localStorage.getItem('cLayer-identity-signUpStatus') === 'success'
  const [showSignUpSuccess, setShowSignUpSuccess] = useState(
    Boolean(signUpSuccess)
  )
  const { isLoginOnError } = state
  const router = useRouter()
  const customerEmail = getCustomerEmailFromUrl()

  const form: UseFormReturn<LoginFormValues, UseFormProps> =
    useForm<LoginFormValues>({
      resolver: yupResolver(validationSchema),
      defaultValues: { customerEmail: customerEmail ?? '' }
    })

  const onSubmit = form.handleSubmit(async (formData) => {
    void customerLogin({
      customerEmail: formData.customerEmail,
      customerPassword: formData.customerPassword
    })
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
            <Button disabled={state.isLoginLoading} type='submit'>
              {state.isLoginLoading ? '...' : 'Login'}
            </Button>
          </div>
          {isLoginOnError && (
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
