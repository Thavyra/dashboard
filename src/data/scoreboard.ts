import Objective from "@/models/Objective"
import { getBackend } from "./fetch"
import { Session } from "next-auth"
import Score from "@/models/Score"

export async function fetchObjectivesByApplication(session: Session, applicationId: string): Promise<{
    status: "success"
    objectives: Objective[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Objective[]>(session, `/applications/${applicationId}/objectives`)

    switch (response.status) {
        case 200:
            return { status: "success", objectives: response.data }
        default:
            return { status: "failed" }
    }
}

export async function fetchScoresByObjective(session: Session, objectiveId: string): Promise<{
    status: "success"
    scores: Score[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Score[]>(session, `/objectives/${objectiveId}/scores`)

    switch (response.status) {
        case 200:
            return { status: "success", scores: response.data }
        default:
            return { status: "failed" }
    }
}