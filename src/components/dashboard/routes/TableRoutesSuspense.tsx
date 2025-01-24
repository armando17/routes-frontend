import { getRoutes } from "@/lib/data";
import RoutesList from "./RoutesList";

export default async function TableRoutesSuspense({ params, columns }: any) {
  const { data, meta } = await getRoutes({
    ...params,
    orderBy: "id: desc",
    include: ["driver", "orders"],
  });
  return (
    <>
      <RoutesList data={data} columns={columns} meta={meta} />
    </>
  );
}
