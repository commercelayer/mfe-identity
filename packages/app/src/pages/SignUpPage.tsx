import { useIdentityContext } from '#providers/provider'

import { PageErrorLayout } from '#components/PageErrorLayout'
import { LayoutDefault } from '#components/LayoutDefault'
import { SignUpForm } from '#components/SignUpForm'

export default function SignUpPage(): JSX.Element {
  const { state } = useIdentityContext()
  const { isOnError } = state

  if (isOnError) {
    return <PageErrorLayout statusCode={500} message='Application error.' />
  }

  return (
    <LayoutDefault>
      <div className='flex flex-col w-full'>
        <h1 className='text-[32px] leading-[38px] text-black font-semibold'>
          Sign up
        </h1>
        <p className='pt-2 text-sm text-gray-500 font-medium'>
          Create your account for free.
        </p>
        <SignUpForm />
      </div>
    </LayoutDefault>
  )
}
