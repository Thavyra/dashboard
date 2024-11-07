"use client"

import { updatePermissions } from "@/actions/application/updatePermissions"
import { useFormState } from "react-dom"
import InputPermissions from "./InputPermissions"
import SubmitButton from "@/components/forms/SubmitButton"

const permissions = [
    {
        name: "scp:account.profile",
        label: "account.profile"
    },
    {
        name: "scp:account.profile.read",
        label: "account.profile.read"
    },
    {
        name: "scp:account.transactions",
        label: "account.transactions"
    },
    {
        name: "scp:applications",
        label: "applications"
    },
    {
        name: "scp:applications.read",
        label: "applications.read"
    },
    {
        name: "scp:transactions",
        label: "transactions"
    }
]

const adminPermissions = {
    scopes: [
        {
            permissionName: "scp:sudo",
            displayName: "sudo"
        },
        {
            permissionName: "scp:admin",
            displayName: "admin"
        },
        {
            permissionName: "scp:link_provider",
            displayName: "link_provider"
        },
        {
            permissionName: "scp:account",
            displayName: "account"
        },
        {
            permissionName: "scp:account.logins",
            displayName: "account.logins"
        },
        {
            permissionName: "scp:authorizations",
            displayName: "authorizations"
        },
        {
            permissionName: "scp:authorizations.read",
            displayName: "authorizations.read"
        }
    ],

    endpoints: [
        {
            permissionName: "ept:authorization",
            displayName: "Authorization"
        },
        {
            permissionName: "ept:token",
            displayName: "Token"
        },
        {
            permissionName: "ept:logout",
            displayName: "Logout"
        }
    ],

    consentTypes: [
        {
            permissionName: "cst:implicit",
            displayName: "Implicit"
        }
    ],

    responseTypes: [
        {
            permissionName: "rst:code",
            displayName: "Code"
        },
        {
            permissionName: "rst:id_token",
            displayName: "ID Token"
        }
    ],

    grantTypes: [
        {
            permissionName: "gt:authorization_code",
            displayName: "Authorization Code"
        },
        {
            permissionName: "gt:client_credentials",
            displayName: "Client Credentials"
        },
        {
            permissionName: "gt:refresh_token",
            displayName: "Refresh Token"
        },
        {
            permissionName: "gt:implicit",
            displayName: "Implicit"
        }
    ]
}

export interface PermissionsFormProps {
    applicationId: string
    currentPermissions: string[]
    disabled?: boolean
}

export default function PermissionsForm({ applicationId, currentPermissions, disabled }: PermissionsFormProps) {
    const [state, formAction] = useFormState(updatePermissions, { applicationId, currentPermissions, })

    const errors = Object.entries(state.errors ?? {})

    console.log(state.errors)

    return (
        <form action={formAction}>
            <InputPermissions permissions={permissions} value={state.currentPermissions}
            valid={state.result?.status === "failed" ? false : undefined} />
            <span className="text-sm text-negative">{errors}{state.message}</span>
            <SubmitButton disabled={disabled} className="mt-3">Save</SubmitButton>
        </form>
    )
}