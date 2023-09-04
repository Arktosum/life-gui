// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black min-h-[10dvh] p-4 border-b-white border-1">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Mein Lieben</div>
      </div>
    </nav>
  );
}

export default Navbar;
