"use client";

import { getUserInfo } from "@/middleware/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export default function TeamsPage({ createNewTeam }) {
    const [userInfo, setUserInfo] = useState(null);
    const [allTeamsInfo, setAllTeamsInfo] = useState(null);
    const [myTeamInfo, setMyTeamInfo] = useState(null);
    const [valid, setValid] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await getUserInfo();
            setUserInfo(response);
            if (response != null) {
                const responseTeam = await fetch(
                    "http://localhost:8000/teams/" + response._id
                ).then((resp) => resp.json());
                setMyTeamInfo(responseTeam.body);
            }
        }
        async function fetchTeams() {
            const response = await fetch("http://localhost:8000/teams/");
            setAllTeamsInfo(response);
        }
        fetchData();
        fetchTeams();
    }, []);

    async function createOrUpdateTeams() {
        const result = createNewTeam(
            document.getElementById("teamName").value,
            document.getElementById("descTeam").value,
            userInfo._id
        );
        console.log(result);
        window.location.reload();
    }
    return (
        <Dialog>
            <main className="flex flex-col align-middle justify-center">
                {userInfo != null ? (
                    <section className="flex px-8 justify-center items-center text-center">
                        <main className="max-w-7xl">
                            <h2 className="text-4xl font-bold mb-8 font-hungry w-full">
                                Mon équipe
                            </h2>
                            {myTeamInfo != null ? (
                                <section className="flex w-full justify-center mb-8">
                                    <Card>
                                        <CardHeader>
                                            <main className="flex justify-center">
                                                <h4 className="text-xl font-semibold">
                                                    {myTeamInfo.name}
                                                </h4>
                                            </main>
                                        </CardHeader>
                                        <CardContent className="w-full!">
                                            {myTeamInfo.description}
                                        </CardContent>
                                        <CardFooter>
                                            <Button>Modifier mon équipe</Button>
                                        </CardFooter>
                                    </Card>
                                </section>
                            ) : (
                                <section className="w-full! justify-center mb-8">
                                    <Card>
                                        <CardHeader>
                                            <h4 className="text-xl font-semibold">
                                                Vous n'avez pas encore d'équipe
                                            </h4>
                                        </CardHeader>
                                        <CardContent>
                                            <DialogTrigger asChild>
                                                <Button>
                                                    Créer mon équipe
                                                </Button>
                                            </DialogTrigger>
                                        </CardContent>
                                    </Card>
                                </section>
                            )}
                        </main>
                    </section>
                ) : null}
                <section className="flex px-8 justify-center items-center text-center">
                    <main className="max-w-7xl">
                        <h2 className="text-4xl font-bold mb-8 font-hungry">
                            Toutes les équipes
                        </h2>
                        <section className="flex gap-4 w-full justify-center mb-8 flex-wrap">
                            <Card className="md:flex-1/4 md:basis-[30%] md:grow-0">
                                <CardHeader>
                                    <h3 className="text-xl font-semibold">
                                        Nom équipe
                                    </h3>
                                </CardHeader>
                                <CardContent>
                                    Mus mauris facilisis nunc potenti efficitur
                                    conubia! Blandit nibh donec vulputate
                                    consequat lacinia natoque. Ultricies finibus
                                    eget torquent eget adipiscing. Imperdiet
                                    risus feugiat ut mollis elit netus. Est
                                    libero donec interdum tristique inceptos.
                                    Egestas mus mattis molestie dignissim nisl
                                    sollicitudin. Efficitur ac fusce augue eros
                                    semper.
                                </CardContent>
                                <CardFooter className="flex justify-end text-sm">
                                    <Link
                                        href="#"
                                        className="relative after:bg-primary after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                                    >
                                        En savoir plus
                                    </Link>
                                </CardFooter>
                            </Card>
                            <Card className="md:flex-1/4 md:basis-[30%] md:grow-0">
                                <CardHeader>
                                    <h4 className="text-xl font-semibold">
                                        Les inscriptions sont lancées
                                    </h4>
                                </CardHeader>
                                <CardContent>
                                    Mus mauris facilisis nunc potenti efficitur
                                    conubia! Blandit nibh donec vulputate
                                    consequat lacinia natoque. Ultricies finibus
                                    eget torquent eget adipiscing. Imperdiet
                                    risus feugiat ut mollis elit netus. Est
                                    libero donec interdum tristique inceptos.
                                    Egestas mus mattis molestie dignissim nisl
                                    sollicitudin. Efficitur ac fusce augue eros
                                    semper.
                                </CardContent>
                                <CardFooter className="flex justify-end text-sm">
                                    <Link
                                        href="#"
                                        className="relative after:bg-primary after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                                    >
                                        En savoir plus
                                    </Link>
                                </CardFooter>
                            </Card>
                            <Card className="md:flex-1/4 md:basis-[30%] md:grow-0">
                                <CardHeader>
                                    <h4 className="text-xl font-semibold">
                                        Les inscriptions sont lancées
                                    </h4>
                                </CardHeader>
                                <CardContent>
                                    Mus mauris facilisis nunc potenti efficitur
                                    conubia! Blandit nibh donec vulputate
                                    consequat lacinia natoque. Ultricies finibus
                                    eget torquent eget adipiscing. Imperdiet
                                    risus feugiat ut mollis elit netus. Est
                                    libero donec interdum tristique inceptos.
                                    Egestas mus mattis molestie dignissim nisl
                                    sollicitudin. Efficitur ac fusce augue eros
                                    semper.
                                </CardContent>
                                <CardFooter className="flex justify-end text-sm">
                                    <Link
                                        href="#"
                                        className="relative after:bg-primary after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                                    >
                                        En savoir plus
                                    </Link>
                                </CardFooter>
                            </Card>
                            <Card className="md:flex-1/4 md:basis-[30%] md:grow-0">
                                <CardHeader>
                                    <h4 className="text-xl font-semibold">
                                        Les inscriptions sont lancées
                                    </h4>
                                </CardHeader>
                                <CardContent>
                                    Mus mauris facilisis nunc potenti efficitur
                                    conubia! Blandit nibh donec vulputate
                                    consequat lacinia natoque. Ultricies finibus
                                    eget torquent eget adipiscing. Imperdiet
                                    risus feugiat ut mollis elit netus. Est
                                    libero donec interdum tristique inceptos.
                                    Egestas mus mattis molestie dignissim nisl
                                    sollicitudin. Efficitur ac fusce augue eros
                                    semper.
                                </CardContent>
                                <CardFooter className="flex justify-end text-sm">
                                    <Link
                                        href="#"
                                        className="relative after:bg-primary after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                                    >
                                        En savoir plus
                                    </Link>
                                </CardFooter>
                            </Card>
                        </section>
                    </main>
                </section>
            </main>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Créer/Modifier mon équipe</DialogTitle>
                    <DialogDescription>
                        Tous les champs avec une * sont obligatoires
                    </DialogDescription>
                </DialogHeader>
                <main>
                    <Field className="pb-4">
                        <FieldLabel htmlFor="teamName">
                            Nom de l'équipe *
                        </FieldLabel>
                        <Input
                            id="teamName"
                            required
                            placeholder="Le nom de votre équipe"
                        ></Input>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="teamName">
                            Description de l'équipe
                        </FieldLabel>
                        <Textarea
                            id="descTeam"
                            placeholder="La description de votre équipe"
                        ></Textarea>
                    </Field>
                </main>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={createOrUpdateTeams}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
