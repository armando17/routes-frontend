import DashboardMenu from "@/components/dashboard/DashboardMenu";
import MainMenu from "@/components/MainMenu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainMenu />
      <div className="container  mx-auto mt-5 px-4">
        <div className="mt-5 flex flex-row gap-5">
          <div className="w-1/5 flex-auto bg-slate-100">
            <DashboardMenu />
          </div>
          <div className="w-4/5 flex-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
