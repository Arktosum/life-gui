import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
// import FriendPage from "./FriendPage";
import brandLogo from "../assets/brand-logo.svg";

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);
  // Automatic Deploy check!
  return (
    <>
      <div className="min-h-[100dvh]">
        <TopNav setIsVisible={setIsVisible} />
        <SideNav isVisible={isVisible} onClose={() => setIsVisible(false)} />
        <Outlet />
      </div>
      {/* <FinancePage /> */}
    </>
  );
}

const SideNav = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`absolute w-72 z-20 bg-black shadow-md transition-transform transform ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <SideNavContent onClose={onClose} />
    </div>
  );
};

function TopNav({ setIsVisible }: { setIsVisible: () => void }) {
  return (
    <nav className="flex items-center justify-between bg-[#121212] p-4 sticky top-0 z-10">
      {/* Hamburger Icon */}
      <button
        onClick={() => {
          setIsVisible((prev) => !prev);
        }}
        className="text-white focus:outline-none hover:scale-125 duration-200 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      {/* Brand Logo SVG */}
      <img src={brandLogo} alt="brand-logo" width="100" />
    </nav>
  );
}

function SideNavContent({ onClose }) {
  return (
    <>
      <div>
        <Link
          to="/finance"
          onClick={() => {
            onClose();
          }}
        >
          <div className="text-white">Finance</div>
        </Link>
        <Link to="/friend">
          <div className="text-white">Friend</div>
        </Link>
      </div>
    </>
  );
}
