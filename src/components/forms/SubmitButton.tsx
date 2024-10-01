import { useFormStatus } from "react-dom"
import Button from "../Button"
import { ButtonHTMLAttributes } from "react"

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export default function SubmitButton({type, disabled, ...props}: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={disabled || pending} aria-disabled={disabled || pending} {...props}>Change</Button>
    )
}