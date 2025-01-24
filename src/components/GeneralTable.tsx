import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { FieldProps, GeneralTableProps } from "@/lib/definitions";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";
const GeneralTable: React.FC<GeneralTableProps> = ({
  tableProps,
  columns,
  items,
  meta,
  renderCell,
}) => {
  const [page, setPage] = React.useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;
  const createPageUrl = (page: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathName}?${params.toString()}`, { scroll: false } );
  };

  return (
    <>
      <Table
        {...tableProps}
        isStriped
        bottomContent={
          <div className="flex flex-row justify-between">
            <div className="flex w-1/3 justify-start">
              <p className="text-default-400 text-small">
                Total {meta?.total} registros
              </p>
            </div>
            <div className="flex w-1/3">
              {meta &&
                (meta.perPage && meta.total > meta.perPage ? (
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="primary"
                      page={currentPage}
                      total={meta.lastPage}
                      onChange={(page) => createPageUrl(page)}
                    />
                  </div>
                ) : null)}
            </div>
            <div className="flex w-1/3"></div>
          </div>
        }
      >
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
        <TableBody
          emptyContent={"No hay items"}
          items={items}
          loadingContent={<Spinner />}
          //loadingState={loadingState}
        >
          {(item: FieldProps) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default GeneralTable;
