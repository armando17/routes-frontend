"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";

export default function CustomBreadcrumbs({ items }: any) {
  return (
    <Breadcrumbs color="foreground">
      <BreadcrumbItem key={0}>
        <Link href={"/dashboard"}>Home</Link>
      </BreadcrumbItem>
      {items.length > 0 &&
        items.map((item: any, index: number) => (
          <BreadcrumbItem key={index + 1}>
            {index === items.length - 1 ? (
              item.label
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </BreadcrumbItem>
        ))}
    </Breadcrumbs>
  );
}
