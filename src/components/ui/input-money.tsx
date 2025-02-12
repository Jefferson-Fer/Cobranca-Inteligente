import { forwardRef, InputHTMLAttributes, useReducer } from 'react'

import { Input } from '@/components/ui/input'
import { cn, formatMoney } from '@/lib/utils'

type CurrencyInputProps = {
  className?: string
  initialValue?: string
  isDisabled?: boolean
  onCallback?: (value: number) => void
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  CurrencyInputProps

const InputMoney = forwardRef<HTMLInputElement, InputProps>(
  ({ className, initialValue = '', onCallback, isDisabled, ...props }, ref) => {
    const [value, setValue] = useReducer((_: string, next: string) => {
      const digits = next.replace(/\D/g, '')
      return formatMoney(Number(digits) / 100)
    }, initialValue)

    function handleChange(formattedValue: string) {
      const digits = formattedValue.replace(/\D/g, '')
      const realValue = Number(digits) / 100
      if (onCallback) {
        onCallback(realValue)
      }
    }

    return (
      <Input
        ref={ref}
        className={cn('w-full', className)}
        disabled={isDisabled}
        {...props}
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value)
          handleChange(ev.target.value)
        }}
      />
    )
  },
)

InputMoney.displayName = 'InputMoney'

export { InputMoney }
