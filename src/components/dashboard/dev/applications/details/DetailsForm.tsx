"use client"

import { updateApplication } from "@/actions/application/update";
import InputText from "@/components/forms/InputText";
import InputTextArea from "@/components/forms/InputTextArea";
import SubmitButton from "@/components/forms/SubmitButton";
import Application from "@/models/Application";
import { useFormState } from "react-dom";

export default function DetailsForm({ application }: { application: Application }) {
    const [state, formAction] = useFormState(updateApplication, { id: application.id })

    return (
        <form action={formAction} className="grow">

            <div className="mb-3">
                <label htmlFor="name" className="block mb-1.5">Name</label>

                <InputText id="name" name="name" defaultValue={application.name} required maxLength={40}
                    valid={state.errors?.name ? false : undefined} />

                <span className="text-sm text-negative">
                    {state.errors?.name?.at(0)}
                </span>
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="block mb-1.5">Description</label>

                <InputTextArea rows={4} id="description" name="description" maxLength={400} defaultValue={application.description ?? ""}
                    valid={state.errors?.description ? false : undefined} />

                <span className="text-sm text-negative">
                    {state.errors?.description?.at(0)}
                </span>
            </div>

            <div className="sm:flex sm:flex-row sm:items-center">
                <SubmitButton className="w-full mb-3 sm:w-auto sm:mb-0">Save</SubmitButton>
                <span className="text-negative">
                    {state.message}
                </span>
            </div>

        </form>
    )
}