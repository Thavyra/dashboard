"use client"

import Button, { ButtonProps } from "@/components/Button";
import { useState } from "react";
import { createPortal } from "react-dom";
import CreateObjectiveModal from "./CreateObjectiveModal";

export interface CreateObjectiveButtonProps extends ButtonProps {
    applicationId: string
}

export default function CreateObjectiveButton({ applicationId,  onClick, ...props }: CreateObjectiveButtonProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button onClick={() => setShowModal(true)} {...props}>
                New Objective
            </Button>

            {showModal && createPortal(
                <CreateObjectiveModal applicationId={applicationId} show={showModal} setShow={setShowModal} />,
                document.body
            )}
        </>
    )
}
