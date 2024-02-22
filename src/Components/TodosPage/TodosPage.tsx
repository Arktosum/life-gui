import { Dispatch, SetStateAction, useEffect, useState } from "react";
import brandSVG from "../../assets/lifegui-logo.svg";
import axios from "axios";
const hamburgerJSX = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="white"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

export default function TodosPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen bg-black">
      <Dashboard props={{ isOpen, setIsOpen }} />
      <div className="h-[10%] bg-[#0F0F0F] flex items-center justify-center">
        <div className="flex-1 mx-5" onClick={() => setIsOpen(!isOpen)}>
          {hamburgerJSX}
        </div>
        <img className="mx-5" src={brandSVG} width={100} height={100} />
      </div>
      <div className="h-[90%]"></div>
    </div>
  );
}

interface DashboardProps {
  props: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  };
}

function Dashboard({ props }: DashboardProps) {
  const isOpen = props.isOpen;
  const setIsOpen = props.setIsOpen;
  const [quoteAPI, setQuote] = useState({
    quote: "",
    author: "",
  });
  useEffect(() => {
    axios.get("https://api.quotable.io/random?maxLength=80").then((res) => {
      quoteAPI.quote = res.data.content;
      quoteAPI.author = res.data.author;
      setQuote(quoteAPI);
    });
  }, [quoteAPI]);

  function handleCopy() {
    const textToCopy = quoteAPI.quote + " - " + quoteAPI.author;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Text copied to clipboard");
      })
      .catch((err) => {
        alert("Unable to copy text: " + err);
      });
  }
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white shadow-lg z-40 transition-transform ${
          isOpen ? "transform translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Dashboard content */}
        <div className="h-[20%] bg-[#0F0F0F] p-5">
          <span
            className="text-white text-sm text-pretty font-light"
            onClick={handleCopy}
          >
            {quoteAPI.quote} -{" "}
            <span className="text-blue-300 font-bold">{quoteAPI.author}</span>
          </span>
        </div>
        <div className="h-[80%] bg-[#181818]"></div>
      </div>
    </>
  );
}
