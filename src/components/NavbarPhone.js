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

import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export default function NavbarPhone() {
    return (
        <Drawer direction="right">
            <section className="flex bg-primary justify-between items-center text-center h-20 flex-1/4">
                <img src="/baseLogo.png" className="h-full"></img>
                <DrawerTrigger asChild>
                    <MenuIcon className="m-4 text-primary-foreground" />
                </DrawerTrigger>
            </section>
            <DrawerContent className="bg-primary text-primary-foreground gap-8 p-3 flex flex-col justify-between items-center">
                <DrawerTitle className="sr-only">Menu</DrawerTitle>
                <section
                    className="flex flex-col justify-center text-center gap-4"
                    id="navigation"
                >
                    <Button variant="ghostSecondary">Home</Button>
                    <Button variant="ghostSecondary">News</Button>
                    <Button variant="ghostSecondary">Leaderboard</Button>
                    <Button variant="ghostSecondary">Teams</Button>
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
