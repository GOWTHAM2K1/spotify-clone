"use client";

interface UserProviderProps{
    children:React.ReactNode;
}

import { MyUserContextProvider } from "@/hooks/useUser";

const UserProvider: React.FC<UserProviderProps> = ({
    children
})=>{
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
}

export default UserProvider;