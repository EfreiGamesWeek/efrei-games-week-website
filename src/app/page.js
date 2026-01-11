"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownFromLine } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
    function fixTextToXDigits(number, x) {
        return number < 10 ? "0".repeat(x - 1) + number : number;
    }
    var countDownDate = new Date("Feb 5, 2026 19:30:00").getTime();
    const [countDownTimer, setCountDownTimer] = useState("");
    const plugin = React.useRef(Autoplay({ delay: 2000 }));

    const infoRef = useRef(null);
    const scrollToElement = () => {
        if (infoRef.current) {
            infoRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    var x = setInterval(function () {
        var now = new Date().getTime();

        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountDownTimer(
            fixTextToXDigits(days, 2) +
                ":" +
                fixTextToXDigits(hours, 2) +
                ":" +
                fixTextToXDigits(minutes, 2) +
                ":" +
                fixTextToXDigits(seconds, 2)
        );

        if (distance < 0) {
            clearInterval(x);
        }
    }, 1000);
    return (
        <main className="flex flex-col align-middle justify-center">
            <section className="flex flex-col gap-4 justify-center items-center h-[90dvh] text-center mx-8 font-hungry">
                <main className="max-w-7xl">
                    <h2 className="md:text-5xl text-2xl font-bold">
                        La GameJam nationale commence dans :
                    </h2>
                    <h1 className="md:text-9xl text-5xl font-extrabold">
                        {countDownTimer}
                    </h1>
                    <Button className="mt-4 w-40 md:text-3xl text-xl h-12 cursor-pointer">
                        S'inscrire
                    </Button>
                    <footer className="flex flex-col items-center transition-[filter] duration-300 hover:drop-shadow-(--drop-shadow-primary) cursor-pointer">
                        <Link
                            href=""
                            className="w-fit h-fit items-center flex flex-col justify-center"
                            scroll={false}
                            onClick={scrollToElement}
                        >
                            <h2 className="md:text-2xl text-sm font-semibold mt-4">
                                En savoir plus
                            </h2>
                            <ArrowDownFromLine size={30} />
                        </Link>
                    </footer>
                </main>
            </section>

            <section
                ref={infoRef}
                className="flex flex-col gap-4 px-8 py-16 justify-center items-center text-center bg-primary text-primary-foreground"
            >
                <main className="max-w-7xl">
                    <h2 className="text-4xl font-bold mb-8 font-hungry">
                        Votre GameJam, qu'est ce que c'est ?
                    </h2>
                    <p className="tracking-tight">
                        La GameJam de Efrei Games Week est l'évenement jeu vidéo
                        à ne pas manquer.
                        <br />
                        <br />
                        Id conubia tortor tellus ipsum litora euismod
                        consectetur etiam. Quis malesuada molestie nostra nunc
                        sem. Lacinia lectus facilisis eget augue? Integer
                        blandit fringilla aptent conubia rutrum sagittis fames.
                        Eu semper nibh cras mattis hendrerit hendrerit.
                        <br />
                        <br />
                        Mus mauris facilisis nunc potenti efficitur conubia!
                        Blandit nibh donec vulputate consequat lacinia natoque.
                        Ultricies finibus eget torquent eget adipiscing.
                        Imperdiet risus feugiat ut mollis elit netus. Est libero
                        donec interdum tristique inceptos. Egestas mus mattis
                        molestie dignissim nisl sollicitudin. Efficitur ac fusce
                        augue eros semper.
                    </p>
                </main>
            </section>

            <section className="flex px-8 py-16 justify-center items-center text-center">
                <main className="max-w-7xl">
                    <h2 className="text-4xl font-bold mb-8 font-hungry">
                        Les dernières informations
                    </h2>
                    <section className="flex gap-4 mb-8">
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl font-semibold">
                                    Les inscriptions sont lancées
                                </h3>
                            </CardHeader>
                            <CardContent>
                                Mus mauris facilisis nunc potenti efficitur
                                conubia! Blandit nibh donec vulputate consequat
                                lacinia natoque. Ultricies finibus eget torquent
                                eget adipiscing. Imperdiet risus feugiat ut
                                mollis elit netus. Est libero donec interdum
                                tristique inceptos. Egestas mus mattis molestie
                                dignissim nisl sollicitudin. Efficitur ac fusce
                                augue eros semper.
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
                        <Card>
                            <CardHeader>
                                <h4 className="text-xl font-semibold">
                                    Les inscriptions sont lancées
                                </h4>
                            </CardHeader>
                            <CardContent>
                                Mus mauris facilisis nunc potenti efficitur
                                conubia! Blandit nibh donec vulputate consequat
                                lacinia natoque. Ultricies finibus eget torquent
                                eget adipiscing. Imperdiet risus feugiat ut
                                mollis elit netus. Est libero donec interdum
                                tristique inceptos. Egestas mus mattis molestie
                                dignissim nisl sollicitudin. Efficitur ac fusce
                                augue eros semper.
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
                    <footer className="flex justify-end">
                        <Link
                            href="/news"
                            className="relative after:bg-primary after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                        >
                            Voir toutes les informations
                        </Link>
                    </footer>
                </main>
            </section>

            <section className="flex flex-col gap-4 py-16 justify-center items-center text-center bg-primary text-primary-foreground">
                <h2 className="text-4xl font-bold mb-8 font-hungry">
                    Les associations partenaires
                </h2>
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        <CarouselItem className="pl-4 md:basis-1/6 basis-1/3">
                            <img src="/logoAssociation/efc.png"></img>
                        </CarouselItem>
                        <CarouselItem className="pl-4 md:basis-1/6 basis-1/3">
                            <img src="/logoAssociation/efrei3d.png"></img>
                        </CarouselItem>
                        <CarouselItem className="pl-4 md:basis-1/6 basis-1/3">
                            <img src="/logoAssociation/efrei-poker.png"></img>
                        </CarouselItem>
                        <CarouselItem className="pl-4 md:basis-1/6 basis-1/3">
                            <img src="/logoAssociation/EFREIKA-logo.png"></img>
                        </CarouselItem>
                        <CarouselItem className="pl-4 md:basis-1/6 basis-1/3">
                            <img src="/logoAssociation/eps.png"></img>
                        </CarouselItem>
                        <CarouselItem className="pl-4 md:basis-1/6 basis-1/3">
                            <img src="/logoAssociation/live-logo.png"></img>
                        </CarouselItem>
                        <CarouselItem className="pl-4 md:basis-1/6 basis-1/3">
                            <img src="/logoAssociation/make-me-up.jpg"></img>
                        </CarouselItem>
                        <CarouselItem className="pl-4 md:basis-1/6 basis-1/3">
                            <img src="/logoAssociation/pandora.png"></img>
                        </CarouselItem>
                        <CarouselItem className="pl-4 md:basis-1/6 basis-1/3">
                            <img src="/logoAssociation/taverne-troll.jpg"></img>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </section>
        </main>
    );
}
