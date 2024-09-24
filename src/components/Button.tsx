import React, { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    
}

export default function Button({children, ...props}: ButtonProps) {
    return (
        <button
        className="block transition appearance-none py-1.5 px-3 rounded text-lg text-bright bg-button hover:bg-button-hover"
        {...props}>
            {children}
        </button>
    )
}