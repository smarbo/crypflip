"use client"
import "react-icons/fa6"
import "react-icons/gi"
import { FaBars, FaGem, FaRocket, FaX, } from "react-icons/fa6"
import { GiCardAceSpades, GiStoneTower } from "react-icons/gi";
import { FaDice } from "react-icons/fa";
import { IconType } from "react-icons";
import Link from "next/link";
import { useState } from "react";
export default function Sidebar() {
  const [toggled, setToggled] = useState(false);

  function toggleMenu() {
    setToggled((prev) => !prev);
  }

  return (
    <div className={`fixed flex z-[999] transition-[0.3s] xl:left-0 ${!toggled ? "-left-[240px]" : "left-0"} bottom-0 w-[240px] xl:w-[13%] bg-background h-[calc(100vh-4rem)] border-r-2 border-gray-500 flex-col text-left`}>
      <SidebarButton icon={FaRocket} name="Crash" />
      <SidebarButton icon={FaGem} name="Mines" />
      <SidebarButton icon={GiStoneTower} name="Towers" />
      <SidebarButton icon={FaDice} name="Dice" />
      <SidebarButton icon={GiCardAceSpades} name="Blackjack" />

      <button onClick={toggleMenu} className="z-[99999999] fixed flex xl:hidden items-center justify-center top-[15px] right-[15px] w-8 h-8 rounded-md bg-accent">
        {toggled && <FaX className="text-text"></FaX>}
        {!toggled && <FaBars className="text-text"></FaBars>}
      </button>
    </div>
  )
}

interface SidebarButtonProps {
  icon: IconType;
  name: string;
}

function SidebarButton({ icon: Icon, name }: SidebarButtonProps) {
  return (
    <Link className="flex" href={"/" + name.toLowerCase()}>
      <button className="group hover:text-text text-xl xl:text-[1vw] transition-colors grow rounded-md py-4 mx-4 mt-4 flex pl-4 text-left items-center font-bold text-primary"><Icon size={24} className="mr-6" /><span className="group-hover:text-text transition-colors text-primary">{name}</span></button>

    </Link>
  )
}
