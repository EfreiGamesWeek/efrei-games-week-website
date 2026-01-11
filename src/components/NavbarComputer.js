import { Button } from "./ui/button";

export default function NavbarComputer() {
    return (
        <main className="flex justify-center p-3 bg-primary text-primary-foreground max-h-24 items-center z-50">
            <section className="flex items-center w-screen">
                <section
                    className="text-center h-20 flex-1 flex justify-center mr-auto"
                    id="logo"
                >
                    <img src="/baseLogo.png" className="h-full"></img>
                </section>
                <section className="mx-12 text-center gap-4" id="navigation">
                    <Button variant="ghostSecondary" className="cursor-pointer">
                        Home
                    </Button>
                    <Button variant="ghostSecondary" className="cursor-pointer">
                        News
                    </Button>
                    <Button variant="ghostSecondary" className="cursor-pointer">
                        Leaderboard
                    </Button>
                    <Button variant="ghostSecondary" className="cursor-pointer">
                        Teams
                    </Button>
                </section>
                <section
                    className="flex-1 flex justify-center ml-auto text-center gap-4"
                    id="login"
                >
                    <Button variant="outline" className="cursor-pointer">
                        S'inscrire
                    </Button>
                    <Button variant="secondary" className="cursor-pointer">
                        Se connecter
                    </Button>
                </section>
            </section>
        </main>
    );
}
