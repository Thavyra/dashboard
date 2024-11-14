import { ReactNode } from "react";

import { Outfit } from "next/font/google"

const outfit = Outfit({
    subsets: ['latin']
})

export default function ProfileLayout({ children, title }: { children: ReactNode, title: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="md:relative md:mt-20">
                <div className="h-40 sm:h-60 md:h-80 lg:h-[22rem] md:rounded-3xl md:shadow-xl max-w-5xl mx-auto bg-gradient-to-br from-red to-blue bg-400% animate-gradient"></div>
                <div className="flex justify-center w-full md:absolute md:bottom-0">
                    <header className="md:max-w-2xl w-full p-8 border-b border-dark-700 bg-dark-800 md:rounded-t-2xl md:shadow-lg">
                        {title}
                    </header>
                </div>
            </div>
            <main className="md:max-w-2xl w-full grow p-8 mx-auto md:shadow-lg bg-dark-800 z-10">
                {children}
            </main>
            <footer className="md:max-w-2xl w-full p-5 mx-auto md:mb-20 md:rounded-b-2xl md:shadow-lg border-t border-dark-700 bg-dark-900 text-center z-20"
                style={outfit.style}>
                Thavyra
            </footer>
        </div>
    )
}