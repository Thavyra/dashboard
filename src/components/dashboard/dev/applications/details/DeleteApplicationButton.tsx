"use client"

import Button, { ButtonProps } from "@/components/Button";
import Application from "@/models/Application";
import { useState } from "react";
import { createPortal } from "react-dom";
import DeleteApplicationModal from "./DeleteApplicationModal";

export interface DeleteApplicationButtonProps extends ButtonProps {
    application: Application
}

export default function DeleteApplicationButton({ application, appearance, onClick, ...props }: DeleteApplicationButtonProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button appearance={appearance ?? "negative"} onClick={() => setShowModal(true)} {...props}>
                Delete
            </Button>

            {showModal && createPortal(
                <DeleteApplicationModal show={showModal} setShow={setShowModal} application={application} />,
                document.body
            )}
        </>
    )
}
