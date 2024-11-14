import { auth } from "@/auth"
import { fetchObjectivesByApplication } from "@/data/scoreboard"
import ObjectiveInfo from "./ObjectiveInfo"
import { Suspense } from "react"

export interface ObjectiveListProps {
    applicationId: string
}

export default function ObjectiveList({ applicationId }: ObjectiveListProps) {
    return (
        <div className="flex flex-col gap-3">
            <Suspense>
                <ObjectiveList_ applicationId={applicationId} />
            </Suspense>
        </div>
    )
}

async function ObjectiveList_({ applicationId }: ObjectiveListProps) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchObjectivesByApplication(session, applicationId)

    if (result.status !== "success") {
        return null
    }

    return result.objectives.map(objective => {
        return <ObjectiveInfo key={objective.id} objective={objective} />
    })
}
