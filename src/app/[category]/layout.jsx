import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

export default async function ShopLayout({ children, params }) {
  const parameters = await params;
  return (
    <div className="antialiased overflow-hidden">
      <Sidebar props={parameters}>
        <Navbar props={parameters} />
        <main className="flex-1 w-[calc(100vw-12rem)] h-full grid grid-cols-12 grid-rows-12 auto-rows-max auto-cols-max p-2 overflow-y-auto">
          <div className="w-fit h-fit col-start-12 row-start-1 justify-self-end m-2">
            <ThemeToggle />
          </div>
          {children}
        </main>
      </Sidebar>
    </div>
  );
}
