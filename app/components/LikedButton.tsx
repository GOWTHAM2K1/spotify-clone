'use client';

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikedButtonProps{
    songId:String
}

const LikedButton:React.FC<LikedButtonProps> = ({
    songId
}) => {

    const router = useRouter();
    const {supabaseClient} = useSessionContext();

    const authModal = useAuthModal();
    const {user} = useUser();

    const [liked,setLiked] = useState(false)

    useEffect(()=>{

        if(!user?.id){
            return
        };

        const fetchData = async ()=>{
            const {data,error} = await supabaseClient
            .from('Liked_songs')
            .select('*')
            .eq('user_id',user.id)
            .eq('song_id',songId)
            .single();

            if(!error && data){
                setLiked(true)
            }
        }

        fetchData()
    },[songId,supabaseClient,user?.id])

    const Icon = liked?AiFillHeart:AiOutlineHeart

    const handleLike =async ()=>{
        if(!user){
            authModal.onOpen()
        }

        if(liked){
            const {error} = await supabaseClient
            .from('Liked_songs')
            .delete()
            .eq('user_id',user?.id)
            .eq('song_id',songId)

        if(error){
            toast.error(error.message)
        }else{
            setLiked(false)
        }
        }else{
            const {error} = await supabaseClient
            .from('Liked_songs')
            .insert({
                song_id:songId,
                user_id:user?.id
            })

            if(error){
                toast.error(error.message)
            }
            else{
                setLiked(true)
                toast.success('Liked!')
            }
        }
    }

  return (
    <div>
      <button className="hover:opacity-70 transition" onClick={handleLike}>
        <Icon color={liked?'#22c55e':'white'} size={25}/>
      </button>
    </div>
  )
}

export default LikedButton
