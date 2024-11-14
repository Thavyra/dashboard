import Modal from "@/components/modal/Modal"
import ModalHeader from "@/components/modal/ModalHeader"
import CreateApplicationForm from "./CreateApplicationForm"
import SubmitButton from "@/components/forms/SubmitButton"
import ModalFooter from "@/components/modal/ModalFooter"

export interface CreateApplicationModalProps {
    show: boolean
    setShow: (value: boolean) => void
}

export default function CreateApplicationModal({ show, setShow }: CreateApplicationModalProps) {
    return (
        <Modal show={show} setShow={setShow}>
            <ModalHeader>
                <h3 className="text-xl">New Application</h3>
            </ModalHeader>
            <CreateApplicationForm submit={
                <ModalFooter>
                    <SubmitButton>Create</SubmitButton>
                </ModalFooter>
            } />
        </Modal>
    )
}