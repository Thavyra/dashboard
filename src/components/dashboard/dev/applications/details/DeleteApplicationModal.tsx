import Modal from "@/components/modal/Modal";
import ModalHeader from "@/components/modal/ModalHeader";
import Application from "@/models/Application";
import DeleteApplicationForm from "./DeleteApplicationForm";
import ModalFooter from "@/components/modal/ModalFooter";
import SubmitButton from "@/components/forms/SubmitButton";

export interface DeleteApplicationModalProps {
    application: Application
    show: boolean
    setShow: (value: boolean) => void
}

export default function DeleteApplicationModal({ application, show, setShow }: DeleteApplicationModalProps) {
    return (
        <Modal show={show} setShow={setShow}>
            <ModalHeader>
                <h3 className="text-xl">Delete <span className="font-bold">{application.name}</span></h3>
            </ModalHeader>
            <DeleteApplicationForm application={application} submit={
                <ModalFooter>
                    <SubmitButton appearance="negative">Delete</SubmitButton>
                </ModalFooter>
            } />
        </Modal>
    )
}
