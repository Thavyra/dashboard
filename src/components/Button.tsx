import React, { ButtonHTMLAttributes } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    design?: "negative"
}

export default function Button({children, className, design, ...props}: ButtonProps) {
    return (
        <button
        className={`block transition appearance-none py-1.5 px-3 rounded text-lg 
            border ${getDesignStyle(design)}
            hover:shadow-lg
            disabled:opacity-75
            ${className}`}
        {...props}>
            {children}
        </button>
    )
}

function getDesignStyle(design?: "negative") {
    switch (design) {
        case undefined:
            return "text-bright border-dark-700 hover:bg-dark-700 active:bg-dark-750"
        case "negative":
            return "text-negative border-negative hover:bg-dark-750 active:bg-dark-700"
    }
}