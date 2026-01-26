"use client";

import { getUserInfo } from "@/middleware/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavbarComputer() {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const response = await getUserInfo();
            setUserInfo(response);
        }
        fetchData();
    }, []);
    return (
        <main className="flex justify-center p-3 bg-primary text-primary-foreground mb-16 max-h-24 items-center z-50 font-hungry">
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
                        <Link href="/teams">Teams</Link>
                    </Button>
                    <Button
                        variant="ghostSecondary"
                        className="cursor-pointer text-2xl"
                    >
                        <Link href="/gamePlayer">Game</Link>
                    </Button>
                    {userInfo != null && userInfo.admin == true ? (
                        <div>
                            <Button
                                variant="ghostSecondary"
                                className="cursor-pointer text-2xl"
                            >
                                <Link href="/admin">Panel Admin</Link>
                            </Button>
                            <Button
                                variant="ghostSecondary"
                                className="cursor-pointer text-2xl"
                            >
                                <Link href="/gameAdmin">Admin Game</Link>
                            </Button>
                        </div>
                    ) : null}
                </section>
                <section
                    className="flex-1 flex justify-center ml-auto text-center gap-4"
                    id="login"
                >
                    {userInfo == null ? (
                        <Link
                            href={"http://localhost:8000/users/discord/login"}
                        >
                            <Button
                                variant="secondary"
                                className="cursor-pointer text-2xl"
                            >
                                Se connecter via Discord
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/profile">
                            <Avatar className={"w-16 h-16"}>
                                <AvatarImage
                                    src={`https://cdn.discordapp.com/avatars/${userInfo.discordID}/${userInfo.avatar}`}
                                />
                                <AvatarFallback>
                                    {userInfo.username}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    )}
                </section>
            </section>
        </main>
    );
}
