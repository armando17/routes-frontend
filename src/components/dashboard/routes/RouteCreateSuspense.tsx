import { getDrivers } from "@/lib/data";
import RouterFormCreate from "./RouterFormCreate";

export default async function RouteCreateSuspense() {
  const { data: drivers, meta } = await getDrivers({
    orderBy: "id: asc",
    perPage: 100,
  });
  return <RouterFormCreate drivers={drivers} />;
}