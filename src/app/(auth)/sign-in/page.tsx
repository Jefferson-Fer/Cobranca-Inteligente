import SigninForm from './_components/signin-form'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center w-full lg:w-[800px] px-8">
      <div className="mx-auto grid gap-6">
        <SigninForm />
      </div>
    </div>
  )
}
