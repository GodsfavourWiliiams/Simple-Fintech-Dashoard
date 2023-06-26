import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  WalletIcon,
  SendIcon,
  TransactionIcon,
  DashboardIcon,
  BeneficiaryIcon,
  CloseIcon,
  SettingsIcon,
  Help,
} from "./providerIcon";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const route = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    exact: true,
  },
  {
    path: "/send",
    name: "Send",
    icon: SendIcon,
  },
  {
    path: "/wallet",
    name: "Wallet",
    icon: WalletIcon,
  },
  {
    path: "/beneficiary",
    name: "Beneficiary",
    icon: BeneficiaryIcon,
  },
  {
    path: "/transaction",
    name: "Transaction",
    icon: TransactionIcon,
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 index-200 flex h-screen w-[280px] flex-col overflow-y-hidden duration-300 ease-linear bg-white shahow-sm lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 mt-5 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <h1 className="text-xl font-semibold">F&G</h1>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden cursor-pointer">
          <CloseIcon width={40} height={40} color={"292D32"} />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-0 py-4 px-4 lg:mt-14 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                {route.map((item, index) => (
                  <NavLink
                    to={item.path}
                    key={index}
                    className={`group relative flex items-center gap-2.5 rounded-md py-3 px-4 my-3 font-medium duration-300 ease-in-out hover:bg-[#F5F7F9] ${
                      pathname.includes(item.path) ||
                      (pathname === "/" && item.exact)
                        ? "bg-[#F5F7F9] text-[#292D32]"
                        : "text-[#83879B]"
                    }`}>
                    <item.icon
                      width={20}
                      height={20}
                      color={pathname.includes(item.path) ? "black" : "#83879B"}
                    />
                    {item.name}
                  </NavLink>
                ))}
              </li>
            </ul>
          </div>

          {/* <!-- SideBar Footer --> */}
          <div className="absolute bottom-0 ">
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="#"
                  className={`group relative flex items-center gap-2.5 rounded-md py-3 px-4 my-3 font-medium duration-300 ease-in-out hover:bg-[#F5F7F9]`}>
                  <Help />
                  Get Help
                </NavLink>
                <NavLink
                  to="#"
                  className={`group relative flex items-center gap-2.5 rounded-md py-3 px-4 my-3 font-medium duration-300 ease-in-out hover:bg-[#F5F7F9] }`}>
                  <SettingsIcon />
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
