import { SignupForm } from './_components/signup-form'

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center w-full lg:w-[800px] px-8">
      <div className="mx-auto grid gap-6">
        <SignupForm />
      </div>
    </div>
  )
}
