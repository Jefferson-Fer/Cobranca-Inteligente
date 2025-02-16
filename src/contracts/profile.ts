import { Prisma, Profile, TypeProfile } from '@prisma/client'

import { CreateProfileSchemaType } from '@/validators'

type UserGenericType = {
  id: string
  name: string
  preferences: Prisma.JsonValue
  email: string
  image?: string
}

export type ProfileAuth = UserGenericType & {
  role: TypeProfile
}

export type PreferencesType = {
  theme: 'light' | 'dark' | 'system'
}

export type CreateUserProfilePayload = Omit<
  CreateProfileSchemaType,
  'confirmPassword' | 'email' | 'password'
> & {
  userId: string
}

export type ProfileWithUser = Profile
