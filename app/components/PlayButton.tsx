import { FaPlay } from "react-icons/fa";


const PlayButton = () => {
  return (
    <button className="bg-green-500 rounded-full p-2 opacity-0 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 transition">
        <FaPlay className='text-black' />
    </button>
  )
}

export default PlayButton;
