import { useIdentityContext } from '#providers/provider'

import { PageHeading } from '#components/atoms/PageHeading'
import { PageErrorLayout } from '#components/PageErrorLayout'
import { LayoutDefault } from '#components/LayoutDefault'
import { LoginForm } from '#components/LoginForm'

export default function LoginPage(): JSX.Element {
  const { state } = useIdentityContext()
  const { isOnError } = state

  if (isOnError) {
    return <PageErrorLayout statusCode={500} message='Application error.' />
  }

  return (
    <LayoutDefault>
      <PageHeading
        title='Login'
        description='Welcome back! Please enter your details.'
      />
      <LoginForm />
    </LayoutDefault>
  )
}
