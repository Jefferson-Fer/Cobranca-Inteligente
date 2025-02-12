import { Metadata } from 'next'

import { env } from '@/lib/env'

import { SignupForm } from './_components/signup-form'

const title = 'Cadastro'
const description = 'Cadastre-se para continuar.'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center w-full lg:w-[800px] px-8">
      <div className="mx-auto grid gap-6">
        <SignupForm />
      </div>
    </div>
  )
}
