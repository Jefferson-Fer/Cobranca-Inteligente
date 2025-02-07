import { z } from 'zod'

const baseSchema = {
  name: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  phone: z
    .string()
    .min(11, { message: 'O telefone deve ter pelo menos 11 caracteres' }),
  email: z.string().email({ message: 'O email deve ser válido' }),
}

export const clientSchema = z.object({
  ...baseSchema,
})

export type ClientSchemaType = z.infer<typeof clientSchema>

export const deleteClientSchema = z.object({
  id: z.string({ required_error: 'ID é obrigatório' }).cuid({
    message: 'ID inválido',
  }),
})

export type DeleteClientSchemaType = z.infer<typeof deleteClientSchema>

export const deleteClientBatchSchema = z.object({
  ids: z.array(
    z.string({ required_error: 'IDs são obrigatórios' }).cuid({
      message: 'ID inválido',
    }),
  ),
})

export type DeleteClientBatchSchemaType = z.infer<
  typeof deleteClientBatchSchema
>

export const updateClientSchema = z.object({
  ...baseSchema,
  id: z.string({ required_error: 'ID é obrigatório' }).cuid({
    message: 'ID inválido',
  }),
})

export type UpdateClientSchemaType = z.infer<typeof updateClientSchema>
