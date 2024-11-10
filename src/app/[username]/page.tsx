import { fetchUserByName } from "@/data/account";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkMentions from "remark-mentions";

type Props = { params: { username: string } }

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const decoded = decodeURIComponent(params.username)

    if (!decoded.startsWith("@")) {
        notFound()
    }

    const username = decoded.slice(1)

    const user = await fetchUserByName(username)

    if (user === "NotFound") {
        const resolved = await parent
        return {
            title: resolved.title
        }
    }

    return {
        title: `@${user.username} · Thavyra`,
        description: user.description
    }
}

export default async function Page({ params }: Props) {
    const decoded = decodeURIComponent(params.username)

    if (!decoded.startsWith("@")) {
        notFound()
    }

    const username = decoded.slice(1)
    const user = await fetchUserByName(username)

    if (user === "NotFound") {
        notFound()
    }

    return (
        <div className="flex flex-col items-center min-h-screen max-w-5xl mx-auto pt-20 pb-8">
            <div className="flex justify-center items-end h-80 w-full rounded-3xl shadow-lg bg-gradient-to-br from-red to-blue bg-400% animate-gradient">
                <div className="h-2/5 w-full max-w-2xl px-10 rounded-t-2xl bg-dark-800">
                    <div className="flex flex-row items-center h-full border-b border-dark-700">
                        <Image src={`/avatars/${user.id}`} alt="Avatar" width={500} height={500}
                            className="rounded-full size-14 mr-4" />
                        <h1 className="text-4xl text-bright font-semibold">{user.username}</h1>
                    </div>
                </div>
            </div>
            <div className="grow flex flex-col w-full max-w-2xl bg-dark-800 rounded-b-2xl overflow-hidden shadow-lg">
                <main className="grow px-10 pt-8">
                    <Markdown children={user.description}
                        remarkPlugins={[[remarkMentions as any, {
                            usernameLink: (name: string) => {
                                return `/@${name}`
                            }
                        }]]}
                        components={{
                            h1(props) {
                                const { children } = props
                                return <h1 className="text-4xl font-bold">{children}</h1>
                            },
                            h2(props) {
                                const { children } = props
                                return <h2 className="text-3xl font-bold">{children}</h2>
                            },
                            h3(props) {
                                const { children } = props
                                return <h3 className="text-2xl font-bold">{children}</h3>
                            },
                            h4(props) {
                                const { children } = props
                                return <h4 className="text-xl font-bold">{children}</h4>
                            },
                            h5(props) {
                                const { children } = props
                                return <h5 className="text-lg font-bold">{children}</h5>
                            },
                            h6(props) {
                                const { children } = props
                                return <h6 className="font-bold">{children}</h6>
                            },
                            a(props) {
                                const { children, href } = props

                                return (
                                    <Link href={href!}
                                        className="text-link hover:text-link-hover transition">{children}
                                    </Link>
                                )
                            },
                        }} />
                </main>
                <footer className="flex flex-row p-5 border-t border-dark-700 mt-3 bg-dark-900">
                    <div className="mx-auto">Thavyra</div>
                </footer>
            </div>
        </div>
    )
}
