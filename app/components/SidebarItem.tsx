import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

interface SidebarItemProps{
  label:string;
  icon:IconType;
  href:string;
  active:boolean;
}
const SidebarItem:React.FC<SidebarItemProps> = ({
  label,
  icon,
  href,
  active
}) => {
  const Icon = icon;
  const router  = useRouter();

  const handleClick = ()=>{
    router.push(href)
  }

  return (
    <div onClick={handleClick} className="flex items-center justify-start gap-2 flex-row ">
      <button className={`flex flex-row items-center gap-2 hover:opacity-70 transition ${active?"text-white":"text-neutral-400"}`} >
      <Icon size={18}/>{label}
      </button>
      

      
    </div>
  )
}

export default SidebarItem;
