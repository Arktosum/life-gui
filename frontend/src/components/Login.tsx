import React, { useState } from "react";

import brandLogo from "../assets/brand.svg";

export default function Login() {
  const INITIAL_FORM_DATA = {
    email: "",
    password: "",
  };
  const [formData, setformData] = useState(INITIAL_FORM_DATA);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);

    setformData(INITIAL_FORM_DATA);
  }
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setformData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  return (
    <div className="h-[100dvh] bg-black flex flex-col items-center justify-center">
      <img src={brandLogo} alt="" width={200} height={100} />
      <form
        onSubmit={handleSubmit}
        className="h-[50%] bg-[#0C0C0C] flex flex-col justify-evenly px-5 m-5 rounded-xl border-2 border-gray-600"
      >
        <label htmlFor="email" className="text-white font-bold text-xl">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder=""
          onChange={handleInput}
          className="px-5 py-2 bg-inherit border-2 border-cyan-500 rounded-sm text-white text-sm"
        />
        <label htmlFor="password" className="text-white font-bold text-xl">
          Password <span className="text-red-600">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder=""
          onChange={handleInput}
          className="px-5 py-2 bg-inherit border-2 border-cyan-500 rounded-sm text-white text-sm"
        />
        <button className="px-5 py-2 border-2 border-green-600 rounded-sm uppercase text-white">
          Login
        </button>
        <p className="text-blue-300 text-sm">
          New to Life-gui? Sorry, we are not accepting any more users.
        </p>
      </form>
    </div>
  );
}
