import { StatusCharge } from '@prisma/client'
import { z } from 'zod'

const DEFAULTS = {
  minValue: 'O valor deve ser maior que 0',
  required: 'O campo é obrigatório',
  invalidID: 'ID do cliente inválido',
}

const validateValue = (value: number | undefined | null) => {
  if (value !== undefined && value !== null) {
    return value * 100
  }
  return value
}

export const chargeSchema = z.object({
  amount: z.coerce.number().min(1, { message: DEFAULTS.minValue }),
  client_name: z.string().min(1, { message: DEFAULTS.required }).optional(),
  day_tariff: z.coerce
    .number()
    .optional()
    .refine((value) => validateValue(value), {
      message: DEFAULTS.minValue,
    }),
  tariff: z.coerce
    .number()
    .optional()
    .refine((value) => validateValue(value), {
      message: DEFAULTS.minValue,
    }),
  dueDate: z.date().refine((date) => date >= new Date(), {
    message: 'A data de vencimento não pode ser no passado',
  }),
  description: z.string().min(1, { message: DEFAULTS.required }),
  clientId: z.string().cuid({ message: DEFAULTS.invalidID }),
})

export type ChargeSchemaType = z.infer<typeof chargeSchema>

export const deleteChargeSchema = z.object({
  id: z.string().cuid({ message: DEFAULTS.invalidID }),
})

export type DeleteChargeSchemaType = z.infer<typeof deleteChargeSchema>

export const deleteChargeBatchSchema = z.object({
  ids: z.array(
    z.string().cuid({
      message: DEFAULTS.invalidID,
    }),
  ),
})

export type DeleteChargeBatchSchemaType = z.infer<
  typeof deleteChargeBatchSchema
>

export const updateChargeSchema = z.object({
  ...chargeSchema.shape,
  id: z.string().cuid({ message: DEFAULTS.invalidID }),
})

export type UpdateChargeSchemaType = z.infer<typeof updateChargeSchema>

export const receiveChargeSchema = z.object({
  ...updateChargeSchema.shape,
  status: z.enum(
    [StatusCharge.PAID, StatusCharge.OVERDUE, StatusCharge.PENDING],
    {
      message: 'Status inválido',
    },
  ),
  additional_value: z.coerce.number().optional(),
  discount_value: z.coerce.number().optional(),
})

export type ReceiveChargeSchemaType = z.infer<typeof receiveChargeSchema>
