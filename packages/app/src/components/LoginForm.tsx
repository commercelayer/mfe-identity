import { useForm, Resolver } from 'react-hook-form'

import { useIdentityContext } from '#providers/provider'

import type { LoginFormValues } from '#providers/types'

const resolver: Resolver<LoginFormValues> = async (values) => {
  const hasCustomerEmail = values.customerEmail !== ''
  const hasCustomerPassword = values.customerPassword !== ''
  const errors: any = {}
  if (!hasCustomerEmail)
    errors.customerEmail = {
      type: 'required',
      message: 'Email is required'
    }
  if (!hasCustomerPassword)
    errors.customerPassword = {
      type: 'required',
      message: 'Password is required'
    }

  return {
    values: hasCustomerEmail && hasCustomerPassword ? values : {},
    errors
  }
}

export const LoginForm: React.FC = () => {
  const { state, customerLogin } = useIdentityContext()
  const { isLoginOnError } = state

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({ resolver })
  const onSubmit = handleSubmit(async (formData) => {
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
            {...register('customerEmail', { required: true })}
            className='block w-full px-4 mt-2 h-[44px] rounded ring-inset outline-0 focus:border-primary focus:ring-primary border-gray-200 text-md'
            type='email'
          />
          {errors?.customerEmail != null && (
            <p className='text-sm text-red-400 mt-2'>
              {errors.customerEmail.message}
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
            {...register('customerPassword', { required: true })}
            className='block w-full px-4 mt-2 h-[44px] rounded ring-inset outline-0 focus:border-primary focus:ring-primary border-gray-200 text-md'
            type='password'
          />
          {errors?.customerPassword != null && (
            <p className='text-sm text-red-400 mt-2'>
              {errors.customerPassword.message}
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
