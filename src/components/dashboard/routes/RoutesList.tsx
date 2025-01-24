"use client";
import GeneralButtons from "@/components/GeneralButtons";
import GeneralTable from "@/components/GeneralTable";
import { editIcon } from "@/components/Icons";
import { FieldProps, GeneralListProps } from "@/lib/definitions";
import { formatDate } from "@/lib/util";
import { useCallback } from "react";

const RoutesList: React.FC<GeneralListProps> = ({
  deleteItem,
  editItem,
  data,
  columns,
  meta,
}) => {
  const renderCell = useCallback<any>(
    (item: FieldProps, columnKey: string) => {
      const cellValue: FieldProps = item[columnKey];
      switch (columnKey) {
        case "id":
          return cellValue;
        case "driver":
          return cellValue.name;
        case "date":
          return `${formatDate(cellValue as Date, "DD-MM-YYYY")} `;
        case "orders":
          return cellValue.length;
        case "actions":
          return (
            <GeneralButtons
              buttons={[
                {
                  children: editIcon(),
                  buttonProps: {
                    isIconOnly: true,
                    href: `/dashboard/routes/${item.id}/edit`,
                    size: "sm",
                  },
                  toolTipProps: {
                    content: "Editar",
                    color: "foreground",
                  },
                },
              ]}
            />
          );
      }
    },
    [,],
  );

  return (
    <GeneralTable
      columns={columns}
      items={data}
      renderCell={renderCell}
      meta={meta}
    />
  );
};

export default RoutesList;
