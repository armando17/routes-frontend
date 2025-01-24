import { Skeleton } from "@nextui-org/react";

export default function GeneralFormSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
     
    </div>
  );
}
