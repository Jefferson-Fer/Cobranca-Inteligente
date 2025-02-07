import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  minimo: 'Informe ao mínimo 3 caracteres.',
  minimo10: 'Informe ao mínimo 10 caracteres.',
  email: 'Informe um email válido!',
  password: 'Informe ao mínimo 8 caracteres.',
}

const baseSchema = {
  name: z.string({ required_error: DEFAULTS.required_error }).min(3, {
    message: DEFAULTS.minimo,
  }),
  lastName: z.string({ required_error: DEFAULTS.required_error }).min(3, {
    message: DEFAULTS.minimo,
  }),
}

export const createProfileSchema = z
  .object({
    ...baseSchema,
    email: z.string({ required_error: DEFAULTS.required_error }).email({
      message: DEFAULTS.email,
    }),
    password: z.string().min(8, { message: DEFAULTS.password }),
    confirmPassword: z.string().min(8, { message: DEFAULTS.password }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  })

export type CreateProfileSchemaType = z.infer<typeof createProfileSchema>
