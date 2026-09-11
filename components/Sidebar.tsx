"use client";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  UserRound,
  Settings,
  Search,
  CircleUserRound
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed left-8 top-8 bottom-8 w-[72px] rounded-[36px] bg-black flex flex-col items-center py-6 justify-between shadow-xl">

      <div className="h-12 w-12 rounded-full bg-lime-400 flex items-center justify-center">
        <span className="text-black font-bold text-xl">
          S
        </span>
      </div>


      <div className="flex flex-col gap-4">

        <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center">
          <LayoutDashboard size={21} />
        </div>

        <div className="h-11 w-11 rounded-full bg-[#292929] flex items-center justify-center">
          <BriefcaseBusiness size={21} className="text-white"/>
        </div>

        <div className="h-11 w-11 rounded-full bg-[#292929] flex items-center justify-center">
          <Search size={21} className="text-white"/>
        </div>

        <div className="h-11 w-11 rounded-full bg-[#292929] flex items-center justify-center">
          <UserRound size={21} className="text-white"/>
        </div>

        <div className="h-11 w-11 rounded-full bg-[#292929] flex items-center justify-center">
          <Settings size={21} className="text-white"/>
        </div>

      </div>


      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
        <CircleUserRound size={25}/>
      </div>


    </aside>
  );
}
