"use client"

import Permission from "@/models/Permission";
import { ReactNode } from "react";

const scopes = [
    {
        permissionName: "scp:account.profile",
        displayName: "account.profile"
    },
    {
        permissionName: "scp:account.profile.read",
        displayName: "account.profile.read"
    },
    {
        permissionName: "scp:account.transactions",
        displayName: "account.transactions"
    },
    {
        permissionName: "scp:applications",
        displayName: "applications"
    },
    {
        permissionName: "scp:applications.read",
        displayName: "applications.read"
    },
    {
        permissionName: "scp:transactions",
        displayName: "transactions"
    }
]

export default function ScopePermissions({ permissions, errors }: { permissions: Permission[], errors?: string[] }) {
    return (
        <div className="mb-3">
            <div className={`p-5 rounded bg-dark-900 shadow-inner ${errors ? "border border-negative" : ""}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                    {scopes.map(permission => {
                        return (
                            <CheckBox permissionName={permission.permissionName}
                                defaultChecked={!!permissions.find(x => x.name === permission.permissionName)}>
                                {permission.displayName}
                            </CheckBox>
                        )
                    })}
                </div>
            </div>

            <span className="text-sm text-negative">{errors}</span>
        </div>

    )
}

function CheckBox({ children, permissionName, defaultChecked }: { children: ReactNode, permissionName: string, defaultChecked: boolean }) {
    return (
        <div className="flex flex-row items-center">
            <label htmlFor={permissionName} className="flex items-center justify-center w-6 h-6 cursor-pointer transition
             rounded border border-dark-700 has-[:hover]:border-light shadow-md 
             has-[:checked]:shadow-none has-[:checked]:bg-dark-950">

                <input id={permissionName} name={`permission:${permissionName}`} type="checkbox" defaultChecked={defaultChecked} className="peer appearance-none" />

                <svg className="hidden peer-checked:block size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>


            </label>

            <label htmlFor={permissionName} className="ml-2">
                {children}
            </label>
        </div>
    )
}