import { useIdentityContext } from '#providers/provider'

import { PageHeading } from '#components/atoms/PageHeading'
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
      <PageHeading
        title='Sign up'
        description='Create your account for free.'
      />
      <SignUpForm />
    </LayoutDefault>
  )
}
