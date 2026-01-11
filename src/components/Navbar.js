"use client";
import NavbarComputer from "./NavbarComputer";
import NavbarPhone from "./NavbarPhone";

import { useMediaQuery } from "@/hooks/use-media-query";

export default function Navbar() {
    return useMediaQuery("(min-width: 768px)") ? (
        <NavbarComputer />
    ) : (
        <NavbarPhone />
    );
}
