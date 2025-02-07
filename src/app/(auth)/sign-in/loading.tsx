import { Skeleton } from '@/components/ui/skeleton'

export default function LoginLoading() {
  return (
    <div className="flex items-center justify-center w-full lg:w-[800px] px-8">
      <div className="mx-auto grid gap-6 w-full max-w-[400px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex items-center justify-center mt-4 gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  )
}
