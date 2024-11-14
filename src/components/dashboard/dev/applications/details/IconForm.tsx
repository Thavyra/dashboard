"use client"

import { changeIcon } from "@/actions/application/changeIcon";
import { deleteIcon } from "@/actions/application/deleteIcon";
import InputAvatar from "@/components/forms/InputAvatar";
import { useFormState } from "react-dom";

export default function IconForm({ applicationId }: { applicationId: string }) {
    const [uploadState, uploadAction] = useFormState(changeIcon, { applicationId })
    const [, deleteAction] = useFormState(deleteIcon, { applicationId })

    const cacheQuery = (uploadState.cacheVersion ? `?v=${uploadState.cacheVersion}` : "")

    return (
        <div>
            <label htmlFor="icon" className="block mb-1.5">Icon</label>
            <InputAvatar imageSrc={`/application_icons/${applicationId}${cacheQuery}`} imageAlt="Icon"
                uploadId="icon" uploadName="icon" uploadAction={uploadAction} deleteAction={deleteAction}>
                Upload Icon
            </InputAvatar>
        </div>
    )
}