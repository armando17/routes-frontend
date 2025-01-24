import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import RouteCreateSuspense from "@/components/dashboard/routes/RouteCreateSuspense";
import GeneralFormSkeleton from "@/components/shared/GeneralFormSkeleton";
import { Suspense } from "react";

export default function Page() {
  const breadcrumbs: any = [
    {
      label: "Routes",
      href: "/dashboard/routes",
    },
    {
      label: "Crear Nueva Ruta",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-5">
        <CustomBreadcrumbs items={breadcrumbs} />
        <Suspense fallback={<GeneralFormSkeleton />}>
          {/* @ts-expect-error */}
          <RouteCreateSuspense  />
        </Suspense>
       
      </div>
    </>
  );
}
