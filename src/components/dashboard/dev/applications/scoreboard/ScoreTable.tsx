import { auth } from "@/auth";
import { fetchScoresByObjective } from "@/data/scoreboard";
import Objective from "@/models/Objective";
import ScoreInfo from "./ScoreInfo";
import { Suspense } from "react";

export interface ScoreTableProps {
    objective: Objective
}

export default function ScoreTable({ objective }: ScoreTableProps) {
    return (
        <table className="w-full table-auto border border-collapse border-dark-700">
            <thead className="border-b border-dark-700">
                <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Created</th>
                </tr>
            </thead>
            <tbody>
                <Suspense>
                    <ScoreTable_ objective={objective} />
                </Suspense>
            </tbody>
        </table>
    )
}

async function ScoreTable_({ objective }: ScoreTableProps) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchScoresByObjective(session, objective.id)

    if (result.status !== "success") {
        return (
            <tr>
                <td colSpan={3} className="p-4 text-center">Could not load scores...</td>
            </tr>
        )
    }

    const highscore = [...result.scores.sort(x => x.score)][0]?.score

    return (
        <>
            {result.scores.map(score => {
                return <ScoreInfo key={score.id} score={score} highscore={highscore} />
            })}
            {result.scores.length === 0 &&
                <tr>
                    <td colSpan={3} className="p-4 text-center">No scores yet!</td>
                </tr>
            }
        </>

    )
}
