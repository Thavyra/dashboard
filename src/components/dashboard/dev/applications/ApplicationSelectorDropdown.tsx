"use client"

import NavLink from "@/components/nav/NavLink";
import Application from "@/models/Application";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface ApplicationSelectorDropdownProps {
    application: Application
    userApplications: Application[]
}

export default function ApplicationSelectorDropdown({ application, userApplications }: ApplicationSelectorDropdownProps) {
    const [showDropdown, setShowDropdown] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const click = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        addEventListener("click", click)

        return () => removeEventListener("click", click)
    })

    return (
        <div ref={containerRef} className="relative">
            <div 
            className={`${showDropdown ? "rounded-x rounded-t border-x border-t shadow-xl" : "rounded border"} border-dark-700 p-3 transition hover:bg-dark-700 active:bg-dark-750 cursor-pointer`}
                onClick={() => setShowDropdown(!showDropdown)}>
                <div className="flex flex-row gap-2 justify-center items-center text-lg text-bright font-semibold">
                    <Image src={`/application_icons/${application.id}`} alt={`${application.name} Icon`}
                        width={500} height={500} className="size-7 rounded-full" />
                    <div className="text-nowrap overflow-hidden">{application.name}</div>
                </div>
            </div>
            <div
                className={`${showDropdown ? "block" : "hidden"} absolute w-full rounded-b overflow-hidden bg-dark-800 shadow-lg`}>
                {userApplications.map(a => {
                    return (
                        <NavLink key={a.id} href={`/dashboard/dev/applications/${a.id}`} match="prefix"
                            className={`block p-3 transition hover:bg-dark-700`} activeClassName="bg-dark-750">

                            <div className="flex flex-row gap-2 items-center text-lg text-bright">
                                <Image src={`/application_icons/${a.id}`} alt={`${a.name} Icon`}
                                    width={500} height={500} className="size-7 rounded-full" />
                                <div className="text-nowrap overflow-hidden">{a.name}</div>
                            </div>

                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}