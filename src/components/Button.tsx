import React, { ButtonHTMLAttributes } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    design?: "negative" | "positive"
}

export default function Button({children, className, design, type, ...props}: ButtonProps) {
    return (
        <button
        type={type ?? "button"}
        className={`block transition appearance-none py-1.5 px-3 rounded text-lg 
            border ${getDesignStyle(design)}
            hover:shadow-lg
            active:bg-dark-750
            disabled:opacity-75 disabled:cursor-not-allowed
            ${className}`}
        {...props}>
            {children}
        </button>
    )
}

function getDesignStyle(design?: "negative" | "positive") {
    switch (design) {
        case undefined:
            return "text-bright border-dark-700 hover:border-light"
        case "negative":
            return "text-negative border-negative-dark hover:border-negative"
        case "positive":
            return "text-positive border-positive-dark hover:border-positive"
    }
}