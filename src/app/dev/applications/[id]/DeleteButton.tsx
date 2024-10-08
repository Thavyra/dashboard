"use client"

import { deleteApplication } from "@/actions/application/delete"
import Button from "@/components/Button"
import InputText from "@/components/forms/InputText"
import SubmitButton from "@/components/forms/SubmitButton"
import Modal from "@/components/Modal"
import Application from "@/models/Application"
import { useState } from "react"
import { createPortal, useFormState } from "react-dom"

export function DeleteButton({ application }: { application: Application }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    return (
        <>
            <div className="flex flex-row justify-end">
                <Button className="w-full sm:w-auto" design="negative" onClick={() => setShowDeleteModal(true)}>
                    Delete
                </Button>
            </div>

            {showDeleteModal && createPortal(
                <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} application={application} />,
                document.body
            )}
        </>
    )


}

function DeleteModal({ show, setShow, application }: {
    show: boolean,
    setShow: (value: boolean) => void,
    application: Application
}) {
    const [state, formAction] = useFormState(deleteApplication, {
        id: application.id,
        name: application.name
    })

    return (
        <form action={formAction}>
            <Modal show={show} setShow={setShow}
                header={
                    <h3 className="text-xl">Delete {application.name}</h3>
                }
                footer={
                    <SubmitButton design="negative">Delete</SubmitButton>
                }>
                {
                    state.message && <div className="rounded border border-negative text-negative py-1 px-1.5 mb-3">
                        {state.message}
                    </div>
                }
                <label className="block text-sm mb-1.5" htmlFor="deleteName">Enter your application's name to confirm you want to delete it.</label>
                <div className="mb-3">
                    <InputText id="deleteName" name="name" autoFocus valid={state.errors?.name ? false : undefined} />
                    <span className="text-sm text-negative">{state.errors?.name}</span>
                </div>
            </Modal>
        </form>
    )
}