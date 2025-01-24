import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import TableRoutesSuspense from "@/components/dashboard/routes/TableRoutesSuspense";
import GeneralButtons from "@/components/GeneralButtons";
import { createIcon } from "@/components/Icons";
import Search from "@/components/shared/SearchBar";
import { TableSkeleton } from "@/components/Skeletons";
import { PageInterface } from "@/lib/definitions";
import { Suspense } from "react";

export default function RoutesPage({ searchParams }: PageInterface) {
  const params = searchParams;
  const columns = [
    { label: "RUTA", uid: "id" },
    { label: "CONDUCTOR", uid: "driver" },
    { label: "FECHA", uid: "date" },
    { label: "ORDENES", uid: "orders" },
    { label: "ACCIONES", uid: "actions" },
  ];
  const breadcrumbs: any = [
    {
      label: "Rutas",
    },
  ];
  const columns2: any = [
    { name: "ID", uid: "id", variableType: "int" },
    { name: "CONDUCTOR", uid: "driver.name" },
  ];
  return (
    <>
      <div className="mb-5 flex flex-col gap-5">
        <CustomBreadcrumbs items={breadcrumbs} />
        <div className="flex items-center justify-between gap-5">
          <Suspense fallback={<div>Loading...</div>}>
            <Search columns={columns2} placeholder="Buscar Rutas..." />
          </Suspense>

          <GeneralButtons
            buttons={[
              {
                children: "Nueva Ruta",
                buttonProps: {
                  href: `/dashboard/routes/create`,
                  startContent: createIcon(),
                },
              },
            ]}
          />
        </div>

        <Suspense fallback={<TableSkeleton columns={columns} />}>
          {/* @ts-expect-error */}
          <TableRoutesSuspense columns={columns} params={params} />
        </Suspense>
      </div>
    </>
  );
}
