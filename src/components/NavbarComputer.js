import { Button } from "./ui/button";

export default function NavbarComputer() {
    return (
        <main className="flex justify-center p-3 bg-primary text-primary-foreground max-h-24 items-center z-50">
            <section className="max-w-7xl flex items-center gap-70">
                <section className="text-center h-20 flex-1/4" id="logo">
                    <img src="/baseLogo.png" className="h-full"></img>
                </section>
                <section
                    className="flex justify-center text-center flex-2/4 gap-4"
                    id="navigation"
                >
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
                    className="flex text-center justify-end gap-4 flex-1/4"
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
