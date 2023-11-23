"use client";
import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/types';
import MediaItem from './MediaItem';
import useOnPlay from '@/hooks/useOnPlay';

interface LibraryProps {
  songs:Song[];
}

const Library:React.FC<LibraryProps> = ({
  songs
}) => {


  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const {user} = useUser();

  const onPlay = useOnPlay(songs);


    const onClick=()=>{
      if(!user){
       return authModal.onOpen();
      }else{
        return uploadModal.onOpen();
      }
    }


  return (
    <div className="flex flex-col">
    <div className='flex items-center justify-between px-5 py-3'>
        <div className='inline-flex gap-x-2 items-center'><TbPlaylist className="text-neutral-400" size={24} />
        <p className='text-neutral-400'>Your Library</p>
        </div>

        <button className='text-neutral-400 hover:cursor-pointer' onClick={onClick}>
          <AiOutlinePlus />
        </button>
      
    </div>
    <div className='flex flex-col gap-y-2 mt-4 px-3'>
        {songs.map((songs)=>(
          <MediaItem 
          onClick={ (id: string)=>onPlay(id)}
          key={songs.id}
          data={songs}/>
        ))}
    </div>
    </div>
  )
}

export default Library;
