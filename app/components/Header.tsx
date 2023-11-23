"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import Button from "./Button";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";


interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  children,
  className
}) => {
  const router = useRouter();
  const authModel = useAuthModal();


  const supabaseClient = useSupabaseClient();
  const {user} = useUser();


  const handleLogout =async () => {
    const {error} = await supabaseClient.auth.signOut();
    router.refresh();

    if(error){
      toast.error(error.message);
    }else{
      toast.success('logged out successfully')
    }
  }

  const previousPage = () => {
    router.back()
  }

  const forwardPage = () => {
    router.forward()
  }

  const login = () =>{
    //login
  }

  const signUp =() =>{
    //signup
  }

  return (
    <div className={twMerge(`bg-gradient-to-b from-emerald-800 p-6 rounded-lg`,className)}>
      <div className='flex justify-between'>
        <div className="hidden md:flex gap-x-2 items-center">
          <button className="rounded-full bg-black hover:opacity-75 transition"><RxCaretLeft size={35} onClick={previousPage} /></button>
          <button className="rounded-full bg-black hover:opacity-75 transition"><RxCaretRight size={35} onClick={forwardPage} /></button>
        </div>

        <div className="hidden max-md:flex items-center gap-x-2">
          <button className="rounded-full bg-black hover:opacity-75 transition p-2"><HiHome size={25}/></button>
          <button className="rounded-full bg-black hover:opacity-75 transition p-2"><BiSearch size={25}/></button>

        </div>
        {user?(
          <div className="">
            <Button className="bg-white text-black px-4 py-2" onClick={handleLogout}>Log out</Button>
            <Button onClick={()=>router.push('/account')} className="bg-white mx-1"><FaUserAlt className='bg-white text-black' size={14}/></Button>
          </div>
        ):
        (<div>
          <Button onClick={authModel.onOpen} className="text-white bg-opacity-0 px-4 py-2">Sign up</Button>
          <Button onClick={authModel.onOpen} className="text-black bg-white px-4 py-2">Login</Button>
        </div>)
}


      </div>
      <div className="mt-2">{children}</div>
    
      
    </div>
  )
}

export default Header;
