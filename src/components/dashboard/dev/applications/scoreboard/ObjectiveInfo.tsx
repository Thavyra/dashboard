import Objective from "@/models/Objective";
import DeleteObjectiveButton from "./DeleteObjectiveButton";
import CopyButton from "@/components/CopyButton";
import ScoreTable from "./ScoreTable";

export interface ObjectiveInfoProps {
    objective: Objective
}

export default function ObjectiveInfo({ objective }: ObjectiveInfoProps) {
    return (
        <div className="p-3 rounded border border-dark-700">
            <div className="flex flex-row items-center justify-between mb-3">
                <h3 className="text-xl font-bold">
                    {objective.display_name}
                </h3>
                <DeleteObjectiveButton objective={objective} />
            </div>

            <div className="flex flex-row items-center gap-2 p-3 mb-3 rounded-lg shadow-md bg-dark-900">
                <CopyButton text={objective.name} className="text-xs">Copy Name</CopyButton>
                <div className="text font-bold font-mono">{objective.name}</div>
            </div>

            <ScoreTable objective={objective} />
        </div>
    )
}