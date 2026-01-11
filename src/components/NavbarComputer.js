import { Button } from "./ui/button";
import Link from "next/link";

export default function NavbarComputer() {
    return (
        <main className="flex justify-center p-3 bg-primary text-primary-foreground max-h-24 items-center z-50 font-hungry">
            <section className="flex items-center w-screen">
                <section
                    className="text-center h-20 flex-1 flex justify-center mr-auto"
                    id="logo"
                >
                    <img src="/baseLogo.png" className="h-full"></img>
                </section>
                <section className="mx-12 text-center gap-4" id="navigation">
                    <Button
                        variant="ghostSecondary"
                        className="cursor-pointer text-2xl"
                        asChild
                    >
                        <Link href="/">Home</Link>
                    </Button>
                    <Button
                        variant="ghostSecondary"
                        className="cursor-pointer text-2xl"
                        asChild
                    >
                        <Link href="/news">News</Link>
                    </Button>
                    <Button
                        variant="ghostSecondary"
                        className="cursor-pointer text-2xl"
                        asChild
                    >
                        <Link href="/leaderboard">Leaderboard</Link>
                    </Button>
                    <Button
                        variant="ghostSecondary"
                        className="cursor-pointer text-2xl"
                    >
                        Teams
                    </Button>
                </section>
                <section
                    className="flex-1 flex justify-center ml-auto text-center gap-4"
                    id="login"
                >
                    <Button
                        variant="outline"
                        className="cursor-pointer text-2xl"
                    >
                        S'inscrire
                    </Button>
                    <Button
                        variant="secondary"
                        className="cursor-pointer text-2xl"
                    >
                        Se connecter
                    </Button>
                </section>
            </section>
        </main>
    );
}
