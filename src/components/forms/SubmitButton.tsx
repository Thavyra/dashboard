import { useFormStatus } from "react-dom"
import Button, { ButtonProps } from "../Button"

interface SubmitButtonProps extends ButtonProps {

}

export default function SubmitButton({children, type, disabled, ...props}: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={disabled || pending} aria-disabled={disabled || pending} {...props}>
            {children}
        </Button>
    )
}