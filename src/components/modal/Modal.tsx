import { createContext, ReactNode, useEffect, useRef, useState } from "react";

export const ModalContext = createContext({
    close: () => { }
})

export interface ModalProps {
    children: ReactNode
    show: boolean
    setShow: (value: boolean) => void
}

export default function Modal({ children, show, setShow }: ModalProps) {
    const [visible, setVisible] = useState(false)
    const bodyRef = useRef<HTMLDivElement>(null)

    const close = () => {
        setVisible(false)
        setTimeout(() => {
            setShow(false)
        }, 300)
    }

    useEffect(() => {
        if (show) {
            setVisible(true)
        }
    }, [show])

    useEffect(() => {
        const escape = (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                close()
            }
        }

        const clickOutside = (event: MouseEvent) => {
            if (!bodyRef.current?.contains(event.target as HTMLElement)) {
                close()
            }
        }

        document.addEventListener("keydown", escape)
        document.addEventListener("click", clickOutside)

        return () => {
            document.removeEventListener("keydown", escape)
            document.removeEventListener("click", clickOutside)
        }
    })

    if (!show) {
        return null
    }

    return (
        <div role="dialog"
        className={`${visible ? "bg-opacity-50" : "opacity-0"} absolute left-0 top-0 h-full w-full ease-out duration-300 bg-black bg-opacity-50`}>
            <div ref={bodyRef} autoFocus className="relative h-auto w-full sm:max-w-[500px] mx-auto my-20 rounded-md overflow-hidden bg-dark-800 shadow-md">
                <ModalContext.Provider value={{ close }}>
                    {children}
                </ModalContext.Provider>
            </div>
        </div>
    )
}
