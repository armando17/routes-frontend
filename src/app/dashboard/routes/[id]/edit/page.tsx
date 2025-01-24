import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import RouteEditSuspense from "@/components/dashboard/routes/RouteEditSuspense";
import GeneralFormSkeleton from "@/components/shared/GeneralFormSkeleton";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const itemId: string = params.id;
  const breadcrumbs: any = [
    {
      label: "Rutas",
      href: "/dashboard/routes",
    },
    {
      label: "Editar Ruta",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-5">
        <CustomBreadcrumbs items={breadcrumbs} />
        <Suspense fallback={<GeneralFormSkeleton />}>
          {/* @ts-expect-error */}
          <RouteEditSuspense itemId={itemId} />
        </Suspense>
      </div>
    </>
  );
}
