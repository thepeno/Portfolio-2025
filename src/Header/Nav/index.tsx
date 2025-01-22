"use client";

import React from "react";

import type { Header as HeaderType } from "@/payload-types";

import { NavLink } from "@/components/NavLink";
import { KeyPressListener } from "../KeyPressListener";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeaderNav: React.FC<{ header: HeaderType, expanded: boolean }> = ({ header, expanded }) => {
  const navItems = header?.navItems || [];

  const path = usePathname()

  const currentPath = path === "/"

  return (
    <nav className="flex gap-2 justify-center w-full m-4 md:m-0 md:items-start md:flex-col">
      <Link className="hover:no-underline grow flex" href="/"	>
        <Button className={`py-2 px-[10px] grow rounded-[8px] text-[#382E1C] bg-transparent hover:bg-[#EFEEEC] h-fit md:hidden
          ${currentPath && "bg-white shadow-nav hover:bg-white"}
        `}>
          <div className='w-[20px]'>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M3.2998 7.49984L10.7998 1.6665L18.2998 7.49984V16.6665C18.2998 17.1085 18.1242 17.5325 17.8116 17.845C17.4991 18.1576 17.0752 18.3332 16.6331 18.3332H4.96647C4.52444 18.3332 4.10052 18.1576 3.78796 17.845C3.4754 17.5325 3.2998 17.1085 3.2998 16.6665V7.49984Z" stroke="#382E1C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.2998 18.3333V10H13.2998V18.3333" stroke="#382E1C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Button>
      </Link>
      {navItems.map(({ link, icon, subItems }, i) => (
        <NavLink key={i} {...link} icon={icon} number={i} subItems={subItems} expanded={expanded} />
      ))}
      <KeyPressListener />
    </nav>
  );
};
