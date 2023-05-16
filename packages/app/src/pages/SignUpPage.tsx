import { PageHeading } from '#components/atoms/PageHeading'
import { LayoutDefault } from '#components/LayoutDefault'
import { SignUpForm } from '#components/SignUpForm'

export default function SignUpPage(): JSX.Element {
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
