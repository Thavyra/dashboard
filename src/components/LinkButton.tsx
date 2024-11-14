import { ButtonHTMLAttributes } from "react";

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

export default function LinkButton({ children, type, className, ...props }: LinkButtonProps) {
    return (
        <button type={type ?? "button"} 
        className={`appearance-none transition text-link hover:text-link-hover hover:underline ${className}`}
        {...props}>
            {children}
        </button>
    )
}