"use client";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { productIcon } from "../Icons";
export default function DashboardMenu() {
  return (
    <Listbox variant="flat" aria-label="Listbox menu with sections">
      <ListboxSection title="Dashboard" showDivider>
        <ListboxItem key="ubications" startContent={productIcon()}>
          <Link className="text-gray w-full" href="/dashboard/routes">
            Rutas
          </Link>
        </ListboxItem>
      </ListboxSection>
    </Listbox>
  );
}
