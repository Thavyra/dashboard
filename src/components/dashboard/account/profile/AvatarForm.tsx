"use client"

import { changeAvatar } from "@/actions/account/changeAvatar"
import { deleteAvatar } from "@/actions/account/deleteAvatar"
import InputAvatar from "@/components/forms/InputAvatar"
import { useFormState } from "react-dom"

export default function AvatarForm({ userId }: { userId: string }) {
    const [uploadState, uploadAction] = useFormState(changeAvatar, { userId })
    const [deleteState, deleteAction] = useFormState(deleteAvatar, { userId })

    const cacheQuery = (uploadState.cacheVersion ? `?v=${uploadState.cacheVersion}` : "")

    return (
        <div>
            <label htmlFor="avatar" className="block mb-1.5">Avatar</label>
            <InputAvatar imageSrc={`/avatars/${userId}${cacheQuery}`} imageAlt="Avatar"
                uploadId="avatar" uploadName="avatar" uploadAction={uploadAction}
                deleteAction={deleteAction}>
                Upload Avatar
            </InputAvatar>
        </div>

    )
}