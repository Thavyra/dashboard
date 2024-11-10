import ConnectionList from "@/components/dashboard/account/connections/ConnectionList";

export default function Page() {
    return (
        <>
            <h2 className="text-3xl font-light">Connections</h2>
            <hr className="border-dark-700 my-5" />
            <ConnectionList />
        </>
    )
}