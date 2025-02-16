import { StatusCharge, TypeClient, TypeProfile } from '@prisma/client'

import { BadgeVariantsType } from '@/components/ui/badge/styles'
import { Option } from '@/contracts/commons'

export const userStatusText: Record<TypeClient, string> = {
  DEFAULTER: 'Inadimplente',
  STANDING: 'Em dia',
}

export const statusClientOptions: Option[] = [
  {
    label: 'Em dia',
    value: TypeClient.STANDING,
  },
  {
    label: 'Inadimplente',
    value: TypeClient.DEFAULTER,
  },
]

export const statusTypeProfileText: Record<TypeProfile, string> = {
  ADMIN: 'Administrador',
  USER: 'Usuário',
}

export const statusTypeProfileOptions: Option[] = [
  {
    label: 'Administrador',
    value: TypeProfile.ADMIN,
  },
  {
    label: 'Usuário',
    value: TypeProfile.USER,
  },
]

export const getBadgeVariantByTypeProfile: Record<
  TypeProfile,
  BadgeVariantsType['variant']
> = {
  ADMIN: 'default',
  USER: 'success',
}

export const getBadgeVariantByTypeClient: Record<
  TypeClient,
  BadgeVariantsType['variant']
> = {
  DEFAULTER: 'destructive',
  STANDING: 'success',
}

export const statusChargeText: Record<StatusCharge, string> = {
  PENDING: 'Pendente',
  PAID: 'Recebido',
  OVERDUE: 'Atrasado',
}

export const statusChargeOptions: Option[] = [
  {
    label: 'Pendente',
    value: StatusCharge.PENDING,
  },
  {
    label: 'Recebido',
    value: StatusCharge.PAID,
  },
  {
    label: 'Atrasado',
    value: StatusCharge.OVERDUE,
  },
]

export const getBadgeVariantByStatusCharge: Record<
  StatusCharge,
  BadgeVariantsType['variant']
> = {
  PENDING: 'default',
  PAID: 'success',
  OVERDUE: 'destructive',
}
