import { auth } from "@/auth";
import { fetchUserById } from "@/data/account";
import { Transfer } from "@/models/Transaction";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export interface UserTitleProps {
    transfer: Transfer
}

export default function UserTitle({ transfer }: UserTitleProps) {
    return (
        <Suspense>
            <UserTitle_ transfer={transfer} />
        </Suspense>
    )
}

async function UserTitle_({ transfer }: UserTitleProps) {
    const session = await auth()

    if (!session) {
        return null
    }

    console.log(transfer)

    const isRecipient = transfer.recipient_id === session?.user?.id

    const otherUser = isRecipient
        ? transfer.subject_id
        : transfer.recipient_id

    const result = await fetchUserById(session, otherUser)

    switch (result.status) {
        case "success":
            return (
                <div className="flex items-center">
                    <Link href={`/@${result.user.username}`}
                        className="flex flex-row items-center p-2 rounded transition hover:bg-dark-700 hover:shadow-md active:bg-dark-750">
                        <Image src={`/avatars/${result.user.id}`} alt={`${result.user.username} Avatar`}
                            width={500} height={500} className="size-7 rounded-full mr-2" />
                        <div className="text-bright font-bold text-lg">
                            @{result.user.username}
                        </div>
                    </Link>
                    {isRecipient
                        ? <div title={`Transfer from`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                className="size-6" aria-label={`Transfer to ${result.user.username}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </div>


                        : <div title={`Transfer to`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </div>
                    }
                </div>
            )
    }
}
