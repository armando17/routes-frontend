"use client";
import { FieldProps } from "@/lib/definitions";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface ColumnsInterface {
  name: string;
  uid?: string;
  selectOrder?: number;
  className?: React.ComponentProps<"div">["className"];
}
export const TableSkeleton = ({ columns }: { columns: Array<any> }) => {
  return (
    <>
      <Table isStriped>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No hay items"} items={[{ id: "1" }]}>
          {(item: FieldProps) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  <Skeleton className="rounded-lg">
                    <div className="h-10 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
