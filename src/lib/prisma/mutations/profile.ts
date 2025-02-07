import { TypeProfile } from '@prisma/client'

import { CreateUserProfilePayload } from '@/contracts/profile'
import { prisma } from '@/lib/prisma'

export const createUserProfileQuery = async ({
  lastName,
  name,
  userId,
}: CreateUserProfilePayload) => {
  return prisma.profile.create({
    data: {
      lastName,
      name,
      type: TypeProfile.USER,
      userId,
    },
  })
}
