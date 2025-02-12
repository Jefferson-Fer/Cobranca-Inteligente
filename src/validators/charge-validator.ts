import { z } from 'zod'

const DEFAULTS = {
  minValue: 'O valor deve ser maior que 0',
  required: 'O campo é obrigatório',
}

export const chargeSchema = z.object({
  amount: z.coerce.number().min(1, { message: DEFAULTS.minValue }),
  day_tariff: z.coerce
    .number()
    .min(1, { message: DEFAULTS.minValue })
    .optional(),
  tariff: z.coerce.number().min(1, { message: DEFAULTS.minValue }).optional(),
  dueDate: z.date().refine((date) => date >= new Date(), {
    message: 'A data de vencimento não pode ser no passado',
  }),
  additional_value: z.coerce
    .number()
    .min(1, { message: DEFAULTS.minValue })
    .optional(),
  discount_value: z.coerce
    .number()
    .min(1, { message: DEFAULTS.minValue })
    .optional(),
  description: z.string().min(1, { message: DEFAULTS.required }),
  clientId: z.string().cuid({ message: 'ID do cliente inválido' }),
})

export type ChargeSchemaType = z.infer<typeof chargeSchema>

export const deleteChargeSchema = z.object({
  id: z.string().cuid({ message: 'ID inválido' }),
})

export type DeleteChargeSchemaType = z.infer<typeof deleteChargeSchema>
