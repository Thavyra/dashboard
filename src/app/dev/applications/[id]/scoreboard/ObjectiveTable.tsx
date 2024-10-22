import Objective from "@/models/Objective";
import { Suspense } from "react";
import Scores from "./Scores";
import DeleteButton from "./DeleteButton";

export default function ObjectiveTable({ objective }: { objective: Objective }) {


    return (
        <div className="rounded mb-3 border border-dark-700">
            <div className="flex flex-row p-3">
                <div>
                    <h3 className="inline text-lg font-light my-auto">{objective.display_name}</h3>
                    <span className="ml-3 font-bold">{objective.name}</span>
                </div>


                <div className="ml-auto">
                    <DeleteButton objective={objective} />
                </div>
            </div>
            <Suspense fallback={<p>Loading scores...</p>}>
                <Scores objectiveId={objective.id} />
            </Suspense>
        </div>
    )
}