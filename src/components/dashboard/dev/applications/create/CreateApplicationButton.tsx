"use client"

import Button, { ButtonProps } from "@/components/Button";
import { useState } from "react";
import { createPortal } from "react-dom";
import CreateApplicationModal from "./CreateApplicationModal";

export default function CreateApplicationButton({ onClick, ...props }: ButtonProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button onClick={() => setShowModal(true)} {...props}>
                New Application
            </Button>

            {showModal && createPortal(
                <CreateApplicationModal show={showModal} setShow={setShowModal} />,
                document.body
            )}
        </>
    )
}