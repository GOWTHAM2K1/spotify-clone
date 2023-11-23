"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import SidebarItem from "./SidebarItem";
import Box from "./Box";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface LeftPanelProps {
    children: React.ReactNode;
    songs:Song[]
}

const LeftPanel: React.FC<LeftPanelProps> = (
    {
        children,
        songs
    }
) => {

    const pathName = usePathname();
    const player = usePlayer();

    const routes = useMemo(() => [
        {
            label: 'Home',
            icon: HiHome,
            active: pathName !== "/search",
            href: "/"
        },
        {
            label: "Search",
            icon: BiSearch,
            active: pathName === "/search",
            href: "/search"

        }
    ], [pathName])

    return (
        <div className={twMerge(`flex h-full`,player.activeId&&"h-[calc(100%-80px)]")} >
            <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px]">
                <Box className="px-5 py-4 ">

                    {routes.map((item, ind) => (
                        <div className="m-2" key={ind}>
                            <SidebarItem  {...item} />
                        </div>
                    ))}
                </Box>
                {/* <button className="hover:opacity-80 transition"><div className="flex gap-2 items-center"><HiHome/>Home</div></button> */}
                {/* <button className="hover:opacity-80 transition"><div className=" flex mt-2  gap-2 items-center"><BiSearch/> Search</div></button> */}

                <Box className="overflow-y-auto h-full ">
                    <Library songs={songs}/>
                </Box>

            </div>
            
            <main className="w-full">{children}</main>
            


        </div>



    )
}

export default LeftPanel
