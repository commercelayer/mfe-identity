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
import type { SignUpFormValues } from '#providers/types'

export const validationSchema = yup.object().shape({
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

export const SignUpForm: React.FC = () => {
  const { state, customerSignUp } = useIdentityContext()
  const router = useRouter()
  const { isSignUpOnError } = state
  const customerEmail = getCustomerEmailFromUrl()

  const form: UseFormReturn<SignUpFormValues, UseFormProps> =
    useForm<SignUpFormValues>({
      resolver: yupResolver(validationSchema),
      defaultValues: { customerEmail: customerEmail ?? '' }
    })

  const onSubmit = form.handleSubmit(async (formData) => {
    void customerSignUp({
      customerEmail: formData.customerEmail,
      customerPassword: formData.customerPassword,
      customerConfirmPassword: formData.customerConfirmPassword
    })
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
            <Button disabled={state.isSignUpLoading} type='submit'>
              {state.isSignUpLoading ? '...' : 'Sign up'}
            </Button>
          </div>
          {isSignUpOnError && (
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
