import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

export default async function ShopLayout({ children, params }) {
  const parameters = await params;
  return (
    <div className="antialiased overflow-hidden h-screen">
      <Sidebar props={parameters}>
        <Navbar props={parameters} />
        <main className="w-full lg:w-[calc(100vw-13rem)] h-[calc(100vh-4rem)] grid grid-cols-1 auto-rows-min p-2 overflow-hidden">
          <div className="w-fit h-fit col-start-1 row-start-1 justify-self-end m-2">
            <ThemeToggle />
          </div>
          {children}
        </main>
      </Sidebar>
    </div>
  );
}
