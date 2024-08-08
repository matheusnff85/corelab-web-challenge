import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";

import Logo from "../images/logo-tasks.png";

export function Header() {
  return (
    <header className="bg-white flex gap-4 h-20 w-screen ps-6 pe-6 shadow-md shadow-zinc-400 items-center">
      <div className="flex gap-4 items-center">
        <Image src={Logo} alt="Logo do CoreNotes" />
        <span>CoreNotes</span>
      </div>
      <div className="flex items-center justify-between max-w-lg w-full h-1/2 p-3 rounded-md shadow-sm shadow-zinc-800">
        <input
          type="text"
          placeholder="Pesquisar notas"
          className="bg-white border-none w-full h-full text-base placeholder-zinc-600 focus-visible:outline-none"
        />
        <Search color="#464646" />
      </div>
    </header>
  );
}
