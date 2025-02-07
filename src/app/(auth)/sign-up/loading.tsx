import { Skeleton } from '@/components/ui/skeleton'

export default function SignUpLoading() {
  return (
    <div className="flex items-center justify-center w-full lg:w-[800px] px-8">
      <div className="mx-auto grid gap-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}
