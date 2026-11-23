import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/page-container";

export default function Loading() {
  return (
    <PageContainer className="space-y-6 py-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>

      <Skeleton className="h-[300px] w-full rounded-lg" />
      <Skeleton className="h-[250px] w-full rounded-lg" />
    </PageContainer>
  );
}
