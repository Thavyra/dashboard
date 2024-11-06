import React, { ButtonHTMLAttributes } from "react"

export type ButtonAppearance = "positive" | "negative" | "cautious"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    appearance?: ButtonAppearance
}

export default function Button({children, className, appearance: appearance, type, ...props}: ButtonProps) {
    return (
        <button
        type={type ?? "button"}
        className={`block transition appearance-none py-1.5 px-3 rounded text-lg 
            border ${getStyle(appearance)}
            hover:shadow-lg
            active:bg-dark-750
            disabled:opacity-75 disabled:cursor-not-allowed
            ${className}`}
        {...props}>
            {children}
        </button>
    )
}

function getStyle(appearance?: ButtonAppearance) {
    switch (appearance) {
        case "negative":
            return "text-negative border-negative-dark hover:border-negative"
        case "positive":
            return "text-positive border-positive-dark hover:border-positive"
        case "cautious":
            return "text-cautious border-cautious hover:border-cautious"
        default:
            return "text-bright border-dark-700 hover:border-light"
        
    }
}