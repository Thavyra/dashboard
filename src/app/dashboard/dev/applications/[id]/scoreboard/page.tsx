import CreateObjectiveButton from "@/components/dashboard/dev/applications/scoreboard/CreateObjectiveButton";
import ObjectiveList from "@/components/dashboard/dev/applications/scoreboard/ObjectiveList";

export default function ScoreboardPage({ params }: { params: { id: string } }) {
    return (
        <>
            <div className="flex flex-row">
                <h2 className="text-3xl font-light">Scoreboard</h2>
                <div className="relative grow">
                    <CreateObjectiveButton className="absolute bottom-0 right-0" applicationId={params.id} />
                </div>
            </div>

            <hr className="border-dark-700 my-5" />

            <ObjectiveList applicationId={params.id} />

        </>
    )
}
