import { PageHeading } from '#components/atoms/PageHeading'
import { LayoutDefault } from '#components/layouts/LayoutDefault'
import { LoginForm } from '#components/forms/LoginForm'

export default function LoginPage(): JSX.Element {
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
