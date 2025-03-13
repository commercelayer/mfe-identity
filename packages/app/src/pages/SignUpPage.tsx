import { PageHeading } from "#components/atoms/PageHeading"
import { SignUpForm } from "#components/forms/SignUpForm"
import { LayoutDefault } from "#components/layouts/LayoutDefault"

export default function SignUpPage(): JSX.Element {
  return (
    <LayoutDefault>
      <PageHeading
        title="Sign up"
        description="Create your account for free."
      />
      <SignUpForm />
    </LayoutDefault>
  )
}
