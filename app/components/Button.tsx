import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>{

    }


const Button = forwardRef<HTMLButtonElement,ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props},ref)=>{
  return (
    <button className={twMerge(`w-fit px-3 py-3 text-black font-semibold rounded-full bg-green-500 disabled:cursor-not-allowed disabled:opacity-50 text-bold hover:opacity-75 transition`,className)}
    disabled={disabled}
    type={type}
    ref={ref}
    {...props} 
    >
      {children}
    </button>
  )
})
Button.displayName = "Button";
export default Button
