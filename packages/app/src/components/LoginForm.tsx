import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useIdentityContext } from '#providers/provider'

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
  const { isLoginOnError } = state

  const form: UseFormReturn<LoginFormValues, UseFormProps> =
    useForm<LoginFormValues>({
      resolver: yupResolver(validationSchema)
    })

  const onSubmit = form.handleSubmit(async (formData) => {
    void customerLogin({
      customerEmail: formData.customerEmail,
      customerPassword: formData.customerPassword
    })
  })

  return (
    <form
      className='mt-8 mb-0'
      onSubmit={(e) => {
        e.preventDefault()
        void onSubmit()
      }}
    >
      <div className='space-y-4'>
        <div className='field mb-8'>
          <div className='flex justify-between items-center mb-2'>
            <label className='text-black leading-6 font-semibold text-base'>
              Email
            </label>
          </div>
          <input
            {...form.register('customerEmail')}
            className='block w-full px-4 mt-2 h-[44px] rounded ring-inset outline-0 focus:border-primary focus:ring-primary border-gray-200 text-md'
            type='email'
          />
          {form.formState.errors?.customerEmail != null && (
            <p className='text-sm text-red-400 mt-2'>
              {form.formState.errors.customerEmail.message}
            </p>
          )}
        </div>
        <div className='field mb-8'>
          <div className='flex justify-between items-center mb-2'>
            <label className='text-black leading-6 font-semibold text-base'>
              Password
            </label>
          </div>
          <input
            {...form.register('customerPassword')}
            className='block w-full px-4 mt-2 h-[44px] rounded ring-inset outline-0 focus:border-primary focus:ring-primary border-gray-200 text-md'
            type='password'
          />
          {form.formState.errors?.customerPassword != null && (
            <p className='text-sm text-red-400 mt-2'>
              {form.formState.errors.customerPassword.message}
            </p>
          )}
        </div>
        <div className='flex pt-4'>
          <button
            type='submit'
            className='inline-flex items-center justify-center font-bold rounded text-sm leading-6 whitespace-nowrap transition duration-700 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 active:outline-none active:ring-2 active:ring-offset-0 border-primary text-white bg-primary hover:opacity-80 focus:ring-gray-300 active:ring-primary active:bg-primary py-2.5 px-12 w-full'
          >
            Login
          </button>
        </div>
        {isLoginOnError && (
          <div className=''>
            <span className='text-sm text-red-400 font-medium mt-2'>
              Invalid credentials
            </span>
          </div>
        )}
      </div>
    </form>
  )
}
