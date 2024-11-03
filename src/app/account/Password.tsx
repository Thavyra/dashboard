"use client"

import { changePassword, ChangePasswordState } from "@/actions/account/changePassword";
import Button from "@/components/Button";
import InputText from "@/components/forms/InputText";
import SubmitButton from "@/components/forms/SubmitButton";
import { PasswordLogin } from "@/models/Login";
import { DateTime } from "luxon";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function Password({ login }: { login: PasswordLogin }) {
    const [showModal, setShowModal] = useState(false)
    const [state, formAction] = useFormState(changePassword, { changedAt: login.changed_at })

    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <div>
                    <div>Last used {DateTime.fromISO(login.used_at).toRelative()}.</div>
                    <div>Changed {DateTime.fromISO(state.changedAt).toRelativeCalendar()}.</div>
                </div>

                <Button onClick={() => setShowModal(!showModal)}>
                    {showModal ? "Cancel" : "Change"}
                </Button>
            </div>

            {showModal && <ChangePasswordForm state={state} formAction={formAction} />}
        </>
    )
}

function ChangePasswordForm({ state, formAction }: { state: ChangePasswordState, formAction: (payload: FormData) => void }) {
    return (
        <form action={formAction} className="transition ease-in-out">
            <hr className="border-dark-700 my-3" />

            {state.message && <div className="text-negative">
                {state.message}
            </div>}

            <div className="mb-3">
                <label className="block mb-1.5" htmlFor="currentPassword">Current Password</label>
                <InputText type="password" id="currentPassword" name="currentPassword" autoFocus valid={state.errors?.currentPassword?.length ?? 0 > 0 ? false : undefined} />
                <span className="text-sm text-negative">{state.errors?.currentPassword?.at(0)}</span>
            </div>

            <div className="mb-3">
                <label className="block mb-1.5" htmlFor="password">New Password</label>
                <InputText type="password" id="password" name="password" valid={state.errors?.password?.length ?? 0 > 0 ? false : undefined} />
                <span className="text-sm text-negative">{state.errors?.password?.at(0)}</span>
            </div>

            <div className="mb-3">
                <label className="block mb-1.5" htmlFor="confirmPassword">Confirm New Password</label>
                <InputText type="password" id="confirmPassword" name="confirmPassword" valid={state.errors?.confirmPassword?.length ?? 0 > 0 ? false : undefined} />
                <span className="text-sm text-negative">{state.errors?.confirmPassword?.at(0)}</span>
            </div>

            <SubmitButton>Change</SubmitButton>
        </form>
    )
}