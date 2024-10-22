import { fetchScoresByObjective } from "@/data/scoreboard"
import ScoreRow from "./ScoreRow"
import { auth, signIn } from "@/auth"
import Score from "@/models/Score"

export default async function Scores({ objectiveId }: { objectiveId: string }) {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchScoresByObjective(session, objectiveId)

    switch (result.status) {
        case "success":
            return <Loaded scores={result.scores} />
        default:
            throw new Error()
    }
}

function Loaded({ scores }: { scores: Score[] }) {
    return (
        <table className="table-auto border-collapse border border-dark-700">
            <tbody>
                {scores.map(score => {
                    return (<ScoreRow key={score.id} score={score} />)
                })}
            </tbody>
        </table>
    )
}