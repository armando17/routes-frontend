"use client";
import { Pagination } from "@nextui-org/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function GeneralPagination({ meta }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageUrl = (page: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="mb-10 mt-5 flex justify-end">
      <Pagination
        isCompact
        showControls
        initialPage={currentPage}
        total={meta?.lastPage}
        onChange={(page) => createPageUrl(page)}
      />
    </div>
  );
}
