import Modal from "@/components/modal/Modal"
import CreateObjectiveForm from "./CreateObjectiveForm"
import ModalFooter from "@/components/modal/ModalFooter"
import SubmitButton from "@/components/forms/SubmitButton"
import ModalHeader from "@/components/modal/ModalHeader"

export interface CreateObjectiveModalProps {
    applicationId: string
    show: boolean
    setShow: (value: boolean) => void
}

export default function CreateObjectiveModal({ applicationId, show, setShow }: CreateObjectiveModalProps) {
    return (
        <Modal show={show} setShow={setShow}>
            <ModalHeader>
                <h3 className="text-xl">New Objective</h3>
            </ModalHeader>
            <CreateObjectiveForm applicationId={applicationId} onCreated={() => setShow(false)} submit={
                <ModalFooter>
                    <SubmitButton>Create</SubmitButton>
                </ModalFooter>
            } />
        </Modal>
    )
}