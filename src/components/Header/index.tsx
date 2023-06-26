import { Link } from "react-router-dom";
import { Hamburger, Notification, PlusIcon } from "./providerIcons";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 index flex w-full bg-white">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block lg:hidden">
            <Hamburger width={24} height={24} />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            F&G
          </Link>
        </div>

        <button className="bg-[#1F28EB] flex items-center gap-3 text-white rounded-md py-3 px-5">
          <PlusIcon width={14} height={14} color={"white"} />
          <span> Add Money</span>
        </button>

        <div className="flex items-center gap-4 sm:gap-7">
          {/* <!-- User Area --> */}
          <Notification />
          <img
            alt="profile"
            src={"https://i.pravatar.cc/300"}
            className="mx-auto object-cover rounded-full h-10 w-10 cursor-pointer bg-gray-200"
          />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
