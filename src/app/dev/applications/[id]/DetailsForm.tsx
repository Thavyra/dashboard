"use client"

import { updateApplication } from "@/actions/application/update"
import InputText from "@/components/forms/InputText"
import InputTextArea from "@/components/forms/InputTextArea"
import SubmitButton from "@/components/forms/SubmitButton"
import Application from "@/models/Application"
import { useFormState } from "react-dom"

export default function DetailsForm({ application }: { application: Application }) {
    const [state, formAction] = useFormState(updateApplication, {
        id: application.id,
        name: application.name,
        description: application.description
    })

    return (
        <form action={formAction}>

            <div className="mb-3">
                <label htmlFor="name" className="block mb-1.5">Name</label>
                <InputText id="name" name="name" valid={state.errors?.name ? false : undefined} defaultValue={application.name} />
                <span className="text-sm text-negative">{state.errors?.name}</span>
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="block mb-1.5">Description</label>
                <InputTextArea rows={4} id="description" name="description" valid={state.errors?.description ? false : undefined} defaultValue={application.description ?? ""} />
                <span className="text-sm text-negative">{state.errors?.description}</span>
            </div>

            <SubmitButton className="w-full mb-3 sm:w-auto sm:mb-0">Save</SubmitButton>

        </form>
    )
}