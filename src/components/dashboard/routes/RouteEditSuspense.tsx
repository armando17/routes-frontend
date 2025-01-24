import { getDrivers, getRoute } from "@/lib/data";
import RouteFormEdit from "./RouteFormEdit";

export default async function RouteEditSuspense({
  itemId,
}: {
  itemId: string;
}) {
  const { data: item } = await getRoute(itemId);
  const { data: drivers, meta } = await getDrivers({
    orderBy: "id: asc",
    perPage: 100,
  });
  return <RouteFormEdit item={item} drivers={drivers} />;
}
