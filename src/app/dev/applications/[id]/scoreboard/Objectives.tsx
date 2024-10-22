import Objective from "@/models/Objective"
import ObjectiveTable from "./ObjectiveTable"
import { auth, signIn } from "@/auth"
import { fetchObjectivesByApplication } from "@/data/scoreboard"

export async function Objectives({ applicationId }: { applicationId: string }) {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchObjectivesByApplication(session, applicationId)

    switch (result.status) {
        case "success":
            return <Loaded objectives={result.objectives} />
        default:
            throw new Error()
    }
}

function Loaded({ objectives }: { objectives: Objective[] }) {
    return (
        <>
            {objectives.map(objective => {
                return (<ObjectiveTable key={objective.id} objective={objective} />)
            })}
        </>
    )
}

export function ObjectivesSkeleton() {
    return (
        <>
            Loading objectives...
        </>
    )
}