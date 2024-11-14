import { auth } from "@/auth";
import AvatarForm from "./AvatarForm";

export default async function AvatarInfo() {
    const session = await auth()

    if (!session) {
        return null
    }

    return (
        <AvatarForm userId={session.user!.id!} />
    )
}