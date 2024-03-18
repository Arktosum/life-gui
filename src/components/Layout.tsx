import { Link, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { hamburgerIcon } from "../app/images";
import brandLogo from '../assets/brand-logo.svg'
import moment from "moment";

export default function Layout() {
  const [isVisible, setIsVisible] = useState(false);
  function setVisible(value: boolean) {
    setIsVisible(value);
  }
  return (
    <>
      <SideNav
        isOpen={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
      />
      <div className="h-[100dvh] flex flex-col">
        <TopNav setVisible={setVisible} />
        <Outlet />
      </div>
    </>
  );
}

export function TopNav({
  setVisible,
}: {
  setVisible: (value: boolean) => void;
}) {
  return (
    <>
      <nav className="px-3 py-5 bg-[#111111] flex justify-between">
        <div
          onClick={() => {
            setVisible(true);
          }}
        >
          {hamburgerIcon}
        </div>
        <img src={brandLogo} className="w-20" />
      </nav>
    </>
  );
}

export const SideNav = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const sideNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideNavRef.current &&
        !sideNavRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={sideNavRef}
      className={`z-10 absolute top-0 left-0 h-full w-64 bg-[#111111] transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-[10%] bg-[#111111] p-5">
        <div className="text-white text-xl font-bold">{moment(Date.now()).format("DD-mm-yyyy | HH:mm")}</div>
      </div>
      <div className="p-2 flex flex-col gap-2">
        <Link to="/main" onClick={onClose}>
          <div className="text-white font-bold text-xl bg-[#1e1e1e] p-2">
            🏠 Home
          </div>
        </Link>
        <Link to="/main/finance" onClick={onClose}>
          <div className="text-white font-bold text-xl bg-[#1e1e1e] p-2">
            💵 Finances
          </div>
        </Link>
        <Link to="/main/friend" onClick={onClose}>
          <div className="text-white font-bold text-xl bg-[#1e1e1e] p-2">
            🫂 Friends
          </div>
        </Link>
      </div>
    </div>
  );
};
