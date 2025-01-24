"use client";

import { WAIT_BETWEEN_CHANGE } from "@/constants/common";
import { SearchInterface } from "@/lib/definitions";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { RiSearchLine } from "../Icons";

export default function Search({
  placeholder = "Buscar",
  columns,
}: SearchInterface) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filterColumms = columns
    ?.filter((colum) => !!colum.uid)
    .sort((a, b) => (b.selectOrder ?? 0) - (a.selectOrder ?? 0));

  const [searchBy, setSearchBy] = useState(
    searchParams.get("searchBy")?.toString() ?? filterColumms[0]?.uid ?? "",
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("where")
      ? (JSON.parse(searchParams.get("where") ?? "")?.value?.toString() ?? "")
      : "",
  );
  const [operator, setoperator] = useState(
    searchParams.get("where")
      ? (JSON.parse(searchParams.get("where") ?? "")?.operator?.toString() ??
          "contains")
      : "contains",
  );

  const typeofSearch =
    columns.filter((colum) => colum.uid === searchBy)?.[0]?.variableType ||
    "string";

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      const whereParam = JSON.stringify({
        key: searchBy,
        value: term,
        ...(typeofSearch !== "string" && { operator }),
        valueType: typeofSearch,
      });
      params.set("where", whereParam);
      params.set("searchBy", searchBy);
    } else {
      params.delete("where");
      params.delete("searchBy");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }, WAIT_BETWEEN_CHANGE);

  const handleSelect = (value: string) => {
    if (value) {
      setSearchBy(value as string);
    } else {
      setSearchBy("");
    }
  };

  useEffect(() => {
    if (searchParams.get("where") || searchTerm) {
      handleSearch(searchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchBy, operator]);

  const operatorItems = [
    {
      value: "",
      label: "Igual",
    },
    {
      value: "lt",
      label: "Menor que",
    },
    {
      value: "gt",
      label: "Mayor que",
    },
  ];

  const isOperatorPresent = operatorItems.some(
    (item) => item.value === operator,
  );

  return (
    <div className="relative flex flex-1 flex-shrink-0 gap-2">
      {filterColumms && (
        <Select
          className="w-64"
          items={filterColumms}
          disallowEmptySelection
          defaultSelectedKeys={[
            searchParams.get("searchBy")?.toString() ??
              filterColumms[0]?.uid ??
              "",
          ]}
          onChange={(value) => handleSelect(value.target.value)}
          variant="bordered"
        >
          {filterColumms?.map((column) => (
            <SelectItem key={column?.uid ?? ""} value={column.uid}>
              {column.name}
            </SelectItem>
          ))}
        </Select>
      )}

      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        onChange={(event) => setSearchTerm(event.target.value)}
        type={typeofSearch === "string" ? "text" : "number"}
        defaultValue={searchTerm}
        variant="bordered"
        startContent={<RiSearchLine className="text-xl text-gray-600" />}
        placeholder={placeholder}
      />
      {typeofSearch != "string" && (
        <Select
          className="w-64"
          items={operatorItems}
          disallowEmptySelection
          defaultSelectedKeys={[isOperatorPresent ? operator : ""]}
          onChange={(value) => setoperator(value.target.value)}
          variant="bordered"
        >
          {operatorItems?.map((operator) => (
            <SelectItem key={operator?.value ?? ""} value={operator.value}>
              {operator.label}
            </SelectItem>
          ))}
        </Select>
      )}
    </div>
  );
}
