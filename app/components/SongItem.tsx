"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";

interface SongItemProps {
    data:Song;
    onClick:(id:string)=>void;
   
}

const SongItem:React.FC<SongItemProps> = ({
    data,
    onClick,
    
}) => {
    const imagePath = useLoadImage(data);
  return (
    <div
    onClick={ ()=> onClick(data.id)}
    className="
    relative
    group
    flex
    flex-col
    items-center
    rounded-md
    overflow-hidden
    gap-x-4
    bg-neutral-400/5
    cursor-pointer
    hover:bg-neutral-400/10
    transition 
    p-3
    ">
        <div className="
        relative
        aspect-square
        w-full
        h-full
        rounded-md
        overflow-hidden
        ">
            <Image className="object-cover" src={imagePath||'/public/images/liked.png'} fill alt="image"></Image>
        </div>

        <div className="flex flex-col items-start w-full gap-y-1 p-4">
           <p className="w-full truncate font-semibold">{data.title}</p> 
           <p className="text-neutral-400 pb-4 w-full truncate">By {data.author}</p> 

        </div>
        <div className="absolute bottom-28 right-5 ">
            <PlayButton/>
        </div>
    </div>
  )
}

export default SongItem;
