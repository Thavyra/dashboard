import { TextareaHTMLAttributes } from "react";

interface InputTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    valid?: boolean
}

export default function InputTextArea({valid, className, ...props}: InputTextAreaProps) {
    return (
        <textarea
        className={`appearance-none
            w-full py-1.5 px-3
            rounded
            text-lg text-light
            bg-dark-900
            transition-colors
            focus:outline-none focus:bg-dark-950
            ${getValidClass(valid)}
            ${className}`}
            {...props}></textarea>

    )
}

function getValidClass(valid?: boolean) {
    switch (valid) {
        case undefined:
            return ""
        case true:
            return "border border-positive"
        case false:
            return "border border-negative"
    }
}