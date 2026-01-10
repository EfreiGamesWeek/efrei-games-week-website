import { Button } from "./ui/button";

export default function NavbarComputer() {
  return (
    <main className="p-3 bg-primary text-primary-foreground flex max-h-24 items-center z-50">
      <section className="text-center h-20 flex-1/4" id="logo">
        <img src="/baseLogo.png" className="h-full"></img>
      </section>
      <section
        className="flex justify-center text-center flex-2/4 gap-4"
        id="navigation"
      >
        <Button variant="ghostSecondary">Home</Button>
        <Button variant="ghostSecondary">News</Button>
        <Button variant="ghostSecondary">Leaderboard</Button>
        <Button variant="ghostSecondary">Teams</Button>
      </section>
      <section
        className="flex text-center justify-end gap-4 flex-1/4"
        id="login"
      >
        <Button variant="outline">S'inscrire</Button>
        <Button variant="secondary">Se connecter</Button>
      </section>
    </main>
  );
}
