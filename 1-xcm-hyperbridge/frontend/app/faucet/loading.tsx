import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col gap-8 max-w-[768px] mx-auto min-h-screen items-center justify-center">
      <Skeleton className="w-[40px] h-[40px] rounded-md" />
      <Skeleton className="w-[200px] h-[32px] rounded-md" />
      <Skeleton className="w-[320px] md:w-[425px] h-[400px] rounded-md" />
    </div>
  )
}
