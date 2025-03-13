import { PageHeading } from "#components/atoms/PageHeading"
import { LoginForm } from "#components/forms/LoginForm"
import { LayoutDefault } from "#components/layouts/LayoutDefault"

export default function LoginPage(): JSX.Element {
  return (
    <LayoutDefault>
      <PageHeading
        title="Login"
        description="Welcome back! Please enter your details."
      />
      <LoginForm />
    </LayoutDefault>
  )
}
