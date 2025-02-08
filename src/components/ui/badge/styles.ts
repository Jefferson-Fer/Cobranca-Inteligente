import { cva, type VariantProps } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-muted text-muted-foreground hover:bg-muted/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        success: ' bg-green-700 text-green-50 hover:bg-green-700/80',
        attributes:
          'flex-inline gap-2 justify-center bg-gray-700 text-gray-50 hover:bg-gray-700/80',
        offer:
          'text-secondary-foreground bg-gradient-to-br from-secondary to-[#ff8a50] border-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariantsType = VariantProps<typeof badgeVariants>
