"use client"

import { createObjective } from "@/actions/scoreboard/createObjective"
import Button from "@/components/Button"
import InputText from "@/components/forms/InputText"
import SubmitButton from "@/components/forms/SubmitButton"
import Modal from "@/components/Modal"
import Objective from "@/models/Objective"
import { useState } from "react"
import { createPortal, useFormState } from "react-dom"

export default function CreateObjective({ applicationId }: { applicationId: string }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button onClick={() => setShowModal(true)} className="w-full sm:w-auto mb-3">
                New Objective
            </Button>
            {
                showModal && createPortal(
                    <CreateModal applicationId={applicationId} show={showModal} setShow={setShowModal} />,
                    document.body
                )
            }
        </>
    )
}

function CreateModal({ applicationId, show, setShow }: { applicationId: string, show: boolean, setShow: (value: boolean) => void }) {
    const [state, formAction] = useFormState(createObjective, { applicationId })

    if (state.result?.status === "success") {
        setShow(false)
    }

    return (
        <form action={formAction}>
            <Modal show={show} setShow={setShow}
                header={
                    <h3 className="text-xl">New Objective</h3>
                }
                footer={
                    <SubmitButton>Create</SubmitButton>
                }>
                <div className="mb-3">
                    <label htmlFor="name" className="block mb-1.5">
                        Name
                        <br />
                        <span className="text-sm">A unique name to reference the objective from code.</span>
                    </label>
                    <InputText id="name" name="name" autoFocus valid={state.errors?.name?.length ?? 0 > 0 ? false : undefined} />
                    <span className="text-sm text-negative">{state.errors?.name}</span>
                </div>

                <div className="mb-3">
                    <label htmlFor="displayName" className="block mb-1.5">
                        Display Name
                        <br />
                        <span className="text-sm">Publicly visible name describing the objective.</span>
                    </label>
                    <InputText id="displayName" name="displayName" valid={state.errors?.displayName ? false : undefined} />
                    <span className="text-sm text-negative">{state.errors?.displayName}</span>
                </div>
            </Modal>
        </form>
    )
}