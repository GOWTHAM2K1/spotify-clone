"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {FaPlay} from "react-icons/fa"

interface ListItemProps {
    image:string;
    name:string;
    href:string;
}

const ListItem:React.FC<ListItemProps> = ({
    image,
    name,
    href
}) => {

    const router = useRouter();

    const onClick = () =>{
        router.push(href)
    }
  return (
    <button className="relative group flex items-center overflow-hidden rounded-md gap-x-2 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4" onClick={onClick}>
        <div className="relative min-h-[64px] min-w-[64px]">
            <Image className="object-cover" fill src={image} alt="liked image"></Image>
        </div>
        <p className="truncate font-medium py-5">
            {name}
        </p>
        <div className="bg-green-500 rounded-full overflow-hidden drop-shadow-md p-2 items-center text-black justify-center absolute right-4 opacity-0 group-hover:opacity-100 transition hover:scale-110 ">
            <FaPlay/>
        </div>
    </button>
  )
}

export default ListItem;
