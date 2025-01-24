import { Skeleton } from "@nextui-org/react";
import { Children } from "react";


export default function ContainerSection({ children, ...props }: any) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-4 md:py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
      {children}
    </div>
  );
}
