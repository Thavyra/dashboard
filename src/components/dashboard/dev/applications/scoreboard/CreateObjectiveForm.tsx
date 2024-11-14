import { createObjective } from "@/actions/scoreboard/createObjective"
import InputText from "@/components/forms/InputText"
import { ReactNode } from "react"
import { useFormState } from "react-dom"

export interface CreateObjectiveFormProps {
    applicationId: string
    submit: ReactNode
    onCreated?: () => void
}

export default function CreateObjectiveForm({ applicationId, submit, onCreated }: CreateObjectiveFormProps) {
    const [state, formAction] = useFormState(createObjective, { applicationId })

    if (state.result?.status === "success" && onCreated) {
        onCreated()
    }

    return (
        <form action={formAction}>
            <div className="px-5">

                <section className="mb-3">
                    <label htmlFor="name" className="block mb-1.5">
                        Name
                        <p className="text-sm">A unique name to reference the objective from code.</p>
                    </label>
                    <InputText id="name" name="name" autoFocus required maxLength={40}
                        valid={state.errors?.name?.length ?? 0 > 0 ? false : undefined}
                        className="font-mono" />
                    <span className="text-sm text-negative">{state.errors?.name?.at(0)}</span>
                </section>

                <section className="mb-3">
                    <label htmlFor="displayName" className="block mb-1.5">
                        Display Name
                        <p className="text-sm">Publicly visible name describing the objective.</p>
                    </label>
                    <InputText id="displayName" name="displayName" required maxLength={40}
                        valid={state.errors?.displayName?.length ?? 0 > 0 ? false : undefined} />
                    <span className="text-sm text-negative">{state.errors?.displayName}</span>
                </section>

            </div>

            {submit}
        </form>
    )
}