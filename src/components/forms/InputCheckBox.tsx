import { InputHTMLAttributes } from "react";

export interface InputCheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {

}

export default function InputCheckBox({ children, name, id, className, ...props }: InputCheckBoxProps) {
    return (
        <div className={`flex flex-row items-center ${className}`}>
            <label htmlFor={name} 
            className="flex justify-center items-center w-6 h-6 cursor-pointer rounded border border-dark-700 transition has-[:hover]:border-light has-[:checked]:bg-dark-950">

                <input type="checkbox" name={name} id={id} className="peer appearance-none" {...props} />

                <svg className="hidden peer-checked:block size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                
            </label>

            <label htmlFor={name} className="ml-2">
                {children}
            </label>
        </div>
    )
}