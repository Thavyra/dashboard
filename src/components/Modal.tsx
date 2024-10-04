import { ReactNode, useEffect, useState } from "react"
import Button from "./Button"

interface ModalProps {
    show: boolean
    setShow: (value: boolean) => void,
    header?: ReactNode
    children: ReactNode
    closeButton?: ReactNode
}

export default function Modal({ show, setShow, children, header, closeButton }: ModalProps) {
    const [visible, setVisible] = useState(false)

    const close = () => {
        setVisible(false)
        setTimeout(() => {
            setShow(false)
        }, 300)
    }

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setVisible(true)
            }, 300)
        }
    }, [show])

    useEffect(() => {
        const escape = (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                close()
            }
        }

        document.addEventListener("keydown", escape)

        return () => document.removeEventListener("keydown", escape)
    })

    if (!show) {
        return null
    }

    return (
        <div className={`${visible ? "bg-opacity-50" : "opacity-0"} absolute left-0 top-0 h-full w-full ease-out duration-300 bg-black`}
        >
            <div className={`${visible ? "opacity-1" : "opacity-0"} relative h-auto w-full sm:max-w-[500px] mx-auto my-20 rounded-md ease-out duration-300 bg-dark-800 text-light`}>
                {
                    header && <div className="px-5 py-5 border-b border-dark-750">
                        {header}
                    </div>
                }

                <div className="px-5 py-5">
                {children}
                </div>
                
                <div className="px-5 py-3 border-t border-dark-750 bg-dark-950 rounded-b-md">
                    <Button onClick={close}>
                        {closeButton ?? <>Close</>}
                    </Button>
                </div>
            </div>
        </div>
    )
}