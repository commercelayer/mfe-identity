import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter, useLocation } from 'wouter'

import { appRoutes } from '#data/routes'
import { Alert } from '#components/atoms/Alert'
import { Button } from '#components/atoms/Button'
import { Input } from '#components/atoms/Input'
import { useIdentityContext } from '#providers/provider'
import { getCustomerEmailFromUrl } from '#utils/getParamsFromUrl'
import { createCustomer } from '#utils/createCustomer'

import type { UseFormReturn, UseFormProps } from 'react-hook-form'
import type { SignUpFormValues } from 'Forms'

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
  const { state } = useIdentityContext()
  const router = useRouter()
  const [, setLocation] = useLocation()
  const customerEmail = getCustomerEmailFromUrl()

  const form: UseFormReturn<SignUpFormValues, UseFormProps> =
    useForm<SignUpFormValues>({
      resolver: yupResolver(validationSchema),
      defaultValues: { customerEmail: customerEmail ?? '' }
    })

  const isSubmitting = form.formState.isSubmitting
  const onSubmit = form.handleSubmit(async (formData) => {
    try {
      const createCustomerResponse = await Promise.resolve(
        createCustomer({
          endpoint: state.settings.endpoint,
          accessToken: state.settings.accessToken,
          customerEmail: formData.customerEmail,
          customerPassword: formData.customerPassword
        })
      )

      if (createCustomerResponse?.id != null) {
        localStorage.setItem('cLayer-identity-signUpStatus', 'success')

        const urlSearchParams = new URLSearchParams(
          window?.location.search ?? ''
        )
        urlSearchParams.set('customerEmail', formData.customerEmail)

        setLocation(
          `${appRoutes.login.makePath()}?${urlSearchParams.toString()}`
        )
      }
    } catch (e) {
      form.setError('root', {
        type: 'custom',
        message: 'Sign up error'
      })
    }
  })

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
          <Input
            {...form.register('customerConfirmPassword')}
            label='Confirm password'
            hasError={form.formState.errors?.customerConfirmPassword != null}
            errorMessage={
              form.formState.errors.customerConfirmPassword?.message
            }
            type='password'
          />
          <div className='flex pt-4'>
            <Button disabled={isSubmitting} type='submit'>
              {isSubmitting ? '...' : 'Sign up'}
            </Button>
          </div>
          {form.formState.errors?.root != null && (
            <div className='pt-4'>
              <Alert variant='danger' title='Sign up error' />
            </div>
          )}
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
    </>
  )
}
