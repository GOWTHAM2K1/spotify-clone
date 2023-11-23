'use client';

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps{
    data:Song;
    onClick?:(id:string)=>void
}

const MediaItem:React.FC<MediaItemProps> = ({
    data,onClick
}) => {
    const image_src = useLoadImage(data);

    const handleClick = ()=>{
        if(onClick){
            return onClick(data.id);
        }

    }

  return (
    <div onClick={handleClick} className="flex flex-row cursor-pointer w-full rounded-md p-2 gap-x-1 hover:bg-neutral-800/50">
      <div className="relative overflow-hidden h-[48px]  w-[48px] rounded-md gap-x-2 gap-y-1 mr-2">
        <Image fill src={image_src||'/images/liked.png'} alt='media-element' className="object-cover"/>
      </div>
      <div>
        <p className="truncate ">
            {data.title}
        </p>
        <p className="text-neutral-400 text-sm truncate">
            {data.author}
        </p>
      </div>
    </div>
  )
}

export default MediaItem;
