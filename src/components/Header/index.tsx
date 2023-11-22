import { ChartLineUp } from "phosphor-react";
import { HeaderLinks } from "./HeaderLinks";
import { HeaderMobile } from "./HeaderMobile";

export function Header(){
  return(
    <div className="w-full background-header fixed z-50 top-0 lg:relative flex items-center justify-between lg:justify-start lg:flex-col gap-12 lg:gap-4 p-4 sm:p-8 lg:p-6 h-[150px] lg:h-full">
      <div className="w-full flex items-center gap-2 lg:pb-8">
        <ChartLineUp color="#8381D9" size={34} />
        <strong className="text-center text-3xl custom-gradient-text">Finanças</strong>
      </div>
      <HeaderLinks />
      <HeaderMobile />
    </div>
  )
}