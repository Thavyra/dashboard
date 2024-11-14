import Link from "next/link";

import { Outfit } from "next/font/google"

const outfit = Outfit({
    subsets: ['latin']
})

export default function NotFound() {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="flex flex-col w-full sm:w-auto min-w-96 h-full sm:h-auto sm:rounded-lg sm:shadow-lg overflow-hidden ">
                <main className="grow p-8 bg-dark-800">
                    <h1 className="text-center text-3xl font-semibold" style={outfit.style}>Thavyra</h1>
                    <hr className="border-dark-700 my-5" />
                    <h2 className="mt-12 mb-4 text-center text-2xl font-extralight">404 Not Found</h2>
                </main>
                <footer className="flex justify-center gap-3 p-5 border-t border-dark-700 bg-dark-900">
                    <Link href={"/dashboard"}>Dashboard</Link>
                </footer>
            </div>
        </div>
    )
}
