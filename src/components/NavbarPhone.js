import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import Link from "next/link";

import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Separator } from "./ui/separator";

export default function NavbarPhone() {
    return (
        <Drawer direction="right">
            <section className="flex bg-primary justify-between items-center text-center h-20 flex-1/4 font-hungry">
                <img src="/baseLogo.png" className="h-full"></img>
                <DrawerTrigger asChild>
                    <MenuIcon className="m-4 text-primary-foreground" />
                </DrawerTrigger>
            </section>
            <DrawerContent className="bg-primary text-primary-foreground gap-8 p-10 flex flex-col justify-between items-center">
                <DrawerTitle className="sr-only">Menu</DrawerTitle>
                <section>
                    <h2 className="font-bold text-xl">Menu</h2>
                </section>
                <section
                    className="flex w-full flex-col justify-center text-center gap-4"
                    id="navigation"
                >
                    <div>
                        <Button variant="ghostSecondary" asChild>
                            <Link href="/">Home</Link>
                        </Button>
                        <Separator className="m-0 bg-border/40" />
                    </div>
                    <div>
                        <Button variant="ghostSecondary" asChild>
                            <Link href="/news">News</Link>
                        </Button>
                        <Separator className="m-0 bg-border/40" />
                    </div>
                    <div>
                        <Button variant="ghostSecondary" asChild>
                            <Link href="/leaderboard">Leaderboard</Link>
                        </Button>
                        <Separator className="m-0 bg-border/40" />
                    </div>
                    <div>
                        <Button variant="ghostSecondary">Teams</Button>
                        <Separator className="m-0 bg-border/40" />
                    </div>
                </section>
                <section
                    className="flex flex-col text-center justify-end gap-4 "
                    id="login"
                >
                    <Button variant="outline">S'inscrire</Button>
                    <Button variant="secondary">Se connecter</Button>
                </section>
            </DrawerContent>
        </Drawer>
    );
}
