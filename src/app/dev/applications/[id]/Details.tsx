"use client"

import { deleteApplication, updateApplication } from "@/actions/applications";
import Button from "@/components/Button";
import InputText from "@/components/forms/InputText";
import InputTextArea from "@/components/forms/InputTextArea";
import SubmitButton from "@/components/forms/SubmitButton";
import Modal from "@/components/Modal";
import Application from "@/models/Application";
import { redirect } from "next/navigation";
import { useState } from "react";
import { createPortal, useFormState } from "react-dom";

export default function Details({ application }: { application: Application | null }) {
    if (application === null) {
        redirect("/dev/applications")
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [state, formAction] = useFormState(updateApplication, {
        id: application.id,
        name: application.name,
        description: application.description
    })

    return (
        <>
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

                <div className="mb-3">
                    <SubmitButton className="w-full mb-3 sm:w-auto sm:mb-0">Save</SubmitButton>
                </div>

            </form>

            <div className="flex flex-row justify-end">
                <Button className="w-full sm:w-auto" design="negative"
                    onClick={() => setShowDeleteModal(true)}>Delete</Button>
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
                <p>All good things must come to an end. Enter your application's name to confirm you want to delete it.</p>
                <div className="mb-3">
                    <InputText id="name" name="name" autoFocus valid={state.errors ? false : undefined} />
                    <span className="text-sm text-negative">{state.errors}</span>
                </div>
            </Modal>
        </form>
    )
}