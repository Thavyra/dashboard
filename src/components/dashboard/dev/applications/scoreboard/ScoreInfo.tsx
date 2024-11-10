import { auth } from "@/auth";
import { fetchUserById } from "@/data/account";
import Score from "@/models/Score";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export interface ScoreInfoProps {
    score: Score
    highscore: number
}

export default function ScoreInfo({ score, highscore }: ScoreInfoProps) {
    const createdAt = DateTime.fromISO(score.created_at)

    return (
        <tr>
            <td className="p-2">
                <div className="flex flex-row items-center gap-2 font-semibold">
                    <Suspense fallback={<Skeleton />}>
                        <ScoreInfo_ score={score} highscore={highscore} />
                    </Suspense>
                </div>
            </td>
            <td className="p-4 text-center">
                {score.score}
            </td>
            <td className="p-4 text-center" title={`${createdAt.day} ${createdAt.monthLong} ${createdAt.year}`}>
                {createdAt.toRelative()}
            </td>
        </tr>
    )
}

function Skeleton() {
    return (
        <>
            <div className="size-7 bg-dark-700 animate-pulse rounded-full"></div>
            <div className="h-5 grow bg-dark-700 animate-pulse rounded"></div>
        </>
    )
}

async function ScoreInfo_({ score, highscore }: ScoreInfoProps) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchUserById(session, score.user_id)

    if (result.status !== "success") {
        return null
    }

    return (
        <>
            <Link href={`/@${result.user.username}`}
                className="flex flex-row items-center p-2 rounded transition bg-opacity-20 hover:bg-dark-700 hover:shadow-md active:bg-dark-750">
                <Image src={`/avatars/${result.user.id}`} alt={`${result.user.username} Avatar`}
                    width={500} height={500} className="size-7 rounded-full mr-2" />
                <div className="text-bright">
                    {result.user.username ?? "Untitled User"}
                </div>
            </Link>
            {score.score === highscore &&
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
            }
        </>
    )
}
