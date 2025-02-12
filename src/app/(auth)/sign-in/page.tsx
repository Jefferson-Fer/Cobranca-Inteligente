import { Metadata } from 'next'

import { env } from '@/lib/env'

import SigninForm from './_components/signin-form'

const title = 'Login'
const description = 'Faça login para continuar.'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center w-full lg:w-[800px] px-8">
      <div className="mx-auto grid gap-6">
        <SigninForm />
      </div>
    </div>
  )
}
