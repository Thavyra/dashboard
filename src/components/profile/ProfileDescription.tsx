import User from "@/models/User"
import Link from "next/link"
import Markdown from "react-markdown"
import remarkMentions from "remark-mentions"

export interface ProfileDescriptionProps {
    user: User
}

export default function ProfileDescription({ user }: ProfileDescriptionProps) {
    return (
        <Markdown
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
            }}>
                {user.description}
            </Markdown>
    )
}