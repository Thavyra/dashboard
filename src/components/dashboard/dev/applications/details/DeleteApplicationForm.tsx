import { deleteApplication } from "@/actions/application/delete";
import InputText from "@/components/forms/InputText";
import Application from "@/models/Application";
import { ReactNode } from "react";
import { useFormState } from "react-dom";

export interface DeleteApplicationFormProps {
    application: Application
    submit: ReactNode
}

export default function DeleteApplicationForm({ application, submit }: DeleteApplicationFormProps) {
    const [state, formAction] = useFormState(deleteApplication, application)

    return (
        <form action={formAction}>
            <div className="px-5">
                {state.message &&
                    <div className="mb-3 text-negative">
                        {state.message}
                    </div>
                }

                <section className="mb-3">
                    <label htmlFor="deleteName" className="block mb-1.5 text-sm">
                        Enter your application's name ({application.name}) to confirm you want to delete it.
                    </label>
                    <InputText id="deleteName" name="name" autoFocus required
                        valid={state.errors?.name?.length ?? 0 > 0 ? false : undefined} />
                    <span className="text-sm text-negative">
                        {state.errors?.name?.at(0)}
                    </span>
                </section>
            </div>

            {submit}
        </form>
    )
}
