'use client';
import LikedButton from "@/app/components/LikedButton";
import MediaItem from "@/app/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps{
    songs:Song[];
}
const LikedContent:React.FC<LikedContentProps> = ({
    songs
}) => {

    const router = useRouter();
    const {user,isLoading} = useUser();

    useEffect(()=>{
        if(!isLoading&&!user){
            router.replace('/');
        }
    },[isLoading,user,router]);

    const onPlay = useOnPlay(songs);

    if(songs.length===0){
        return(
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400 truncate">No liked songs.</div>
        )
    }

  return (
    <div className="flex flex-col gap-y-2 p-6 w-full ">
      {songs.map((song)=>(
        <div className="flex items-center gap-x-4 w-full" key={song.id}>
            <div className="flex-1">
                <MediaItem data={song} onClick={(id:string)=>onPlay(id)}/>
            </div>
            <LikedButton songId={song.id}/>
        </div>
      ))}
    </div>
  )
}

export default LikedContent
