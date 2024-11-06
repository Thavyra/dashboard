import Image from "next/image";
import { ChangeEvent, ReactNode } from "react";
import SubmitButton from "./SubmitButton";

export interface InputAvatarProps {
    children: ReactNode
    uploadAction: (payload: FormData) => void
    deleteAction: (payload: FormData) => void
    imageSrc: string
    imageAlt?: string
    uploadId?: string
    uploadName?: string
}

export default function InputAvatar({ children, uploadAction, deleteAction, imageSrc, imageAlt, uploadId, uploadName }: InputAvatarProps) {
    const fileChanged = (event: ChangeEvent<HTMLInputElement>) => {
        event.currentTarget.form?.requestSubmit()
        event.currentTarget.value = null!
    }

    return (
        <div className="rounded-xl max-w-40 p-4 me-3 bg-dark-900 shadow-md">

            <div className="w-32 h-32 mb-3">
                <div className="relative rounded-full overflow-hidden">

                    <form action={uploadAction}>
                        <Image src={imageSrc} alt={imageAlt ?? "Avatar"} width={500} height={500} />
                        <label htmlFor={uploadId} className="absolute top-0 left-0 flex justify-center items-center h-full w-full
                    bg-dark-950 transition opacity-0 hover:opacity-100 hover:bg-opacity-80 cursor-pointer">
                            <div className="text-sm text-bright">
                                {children}
                            </div>
                        </label>
                        <input className="hidden" type="file" id={uploadId} name={uploadName} onChange={fileChanged} />
                    </form>

                </div>
            </div>

            <form action={deleteAction}>
                <SubmitButton appearance="negative" className="text-xs w-full">
                    Remove
                </SubmitButton>
            </form>

        </div>
    )
}