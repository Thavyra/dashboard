"use client"

import { useState } from "react";
import Button, { ButtonProps } from "./Button";

export interface CopyButtonProps extends ButtonProps {
    text: string
}

export default function CopyButton({ text, children, ...props }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const writeText = async () => {
        await navigator.clipboard.writeText(text)

        setCopied(true)

        setTimeout(() => setCopied(false), 700)
    }

    return (
        <Button appearance={copied ? "positive" : undefined} onClick={writeText} {...props}>
            {
                copied ? <>Copied!</>
                : children ?? <>Copy</>
            }
        </Button>
    )
}