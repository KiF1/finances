import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export function DefaultLayout() {
  return (
    <div className="w-full grid grid-cols-1 mt-[150px] lg:mt-0 lg:grid-cols-[0.2fr_1fr] gap-8 lg:h-screen">
      <Header />
      <main className="h-full flex relative lg:overflow-y-scroll py-4">
        <div className="w-full absolute flex flex-col gap-12 p-4 lg:pr-8 pb-12">
          <Outlet />  
        </div>
      </main>
    </div>
  );
}