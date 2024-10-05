import { getRedirects } from "@/actions/redirects";
import RedirectList from "./RedirectList";

export default async function Redirects({ id }: { id: string }) {
    "use server"
    const redirects = await getRedirects(id)

    return(
        <RedirectList applicationId={id} redirects={redirects} />
    )
}
