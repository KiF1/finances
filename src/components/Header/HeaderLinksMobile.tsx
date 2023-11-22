import { signOut } from "firebase/auth";
import { Bank, ChartLine, ProjectorScreenChart, SignOut } from "phosphor-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";

export function HeaderLinkMobile(){
  const routeActive = useLocation();
  const redirect = useNavigate();
  
  const homeActive = routeActive.pathname === '/home';
  const bankActive = routeActive.pathname === '/bank';
  const planningActive = routeActive.pathname === '/planning';

  async function logOut(){
    await signOut(auth);
    await localStorage.removeItem('user');
    await redirect("/");
  }
  
  return(
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-8">
      <NavLink to="/home" data-active={homeActive} className="w-full flex items-center px-5 data-[active=true]:px-4 font-medium data-[active=true]:border-l-4 data-[active=true]:rounded-l-[1px] data-[active=true]:border-l-[#9694F5] gap-2 text-white ">
        <ChartLine size={20} color="#ffffff" />
        Dashboard
      </NavLink>
      <NavLink to="/bank" data-active={bankActive} className="w-full flex items-center px-5 data-[active=true]:px-4 font-medium data-[active=true]:border-l-4 data-[active=true]:rounded-l-[1px] data-[active=true]:border-l-[#9694F5] gap-2 text-white ">
        <Bank size={20} color="#ffffff" />
        Bancos
      </NavLink>
      <NavLink to="/planning" data-active={planningActive} className="w-full flex items-center px-5 data-[active=true]:px-4 font-medium data-[active=true]:border-l-4 data-[active=true]:rounded-l-[1px] data-[active=true]:border-l-[#9694F5] gap-2 text-white ">
        <ProjectorScreenChart size={20} color="#ffffff" />
        Planejamento
      </NavLink>
      <button onClick={logOut} className="w-full flex items-center px-5 font-medium gap-2 text-white ">
        <SignOut size={20} color="#ffffff" />
        Sair
      </button>
    </div>
  )
}