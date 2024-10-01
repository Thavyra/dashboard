import React, { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    
}

export default function Button({children, className, ...props}: ButtonProps) {
    return (
        <button
        className={`block transition appearance-none py-1.5 px-3 rounded text-lg text-bright bg-dark-700 hover:bg-dark-600 disabled:bg-dark-750 ${className}`}
        {...props}>
            {children}
        </button>
    )
}