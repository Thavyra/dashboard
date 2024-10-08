"use client"

import Button from "@/components/Button"
import { useState } from "react"
import { createPortal, useFormState } from "react-dom"
import { redirect } from "next/navigation"
import Modal from "@/components/Modal"
import InputText from "@/components/forms/InputText"
import SubmitButton from "@/components/forms/SubmitButton"
import { createApplication } from "@/actions/application/create"

export default function CreateButton() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button onClick={() => setShowModal(true)}
                className="w-full sm:w-auto">
                New Application</Button>
            {showModal && createPortal(
                <CreateModal show={showModal} setShow={setShowModal} />,
                document.body
            )}
        </>
    )
}

function CreateModal({ show, setShow }: { show: boolean, setShow: (value: boolean) => void }) {
    const [state, formAction] = useFormState(createApplication, {})

    if (state.result?.status === "success") {
        redirect(`/dev/applications/${state.result.id}`)
    }

    return (
        <form action={formAction}>
            <Modal show={show} setShow={setShow}
                header={
                    <h3 className="text-xl">New Application</h3>
                }
                footer={
                    <SubmitButton>Create</SubmitButton>
                }>

                {state.message &&
                    <div className="mb-3 py-1 px-2 rounded transition border border-negative text-negative">
                        {state.message}
                    </div>
                }


                <div className="mb-3">
                    <label htmlFor="name" className="block mb-1.5">Name</label>
                    <InputText id="name" name="name" autoFocus valid={state.result?.status === "failed" ? false : undefined} />
                    <span className="text-sm text-negative">{state.errors?.name}</span>
                </div>

                <input type="hidden" name="type" value="native" />
            </Modal>
        </form>
    )
}