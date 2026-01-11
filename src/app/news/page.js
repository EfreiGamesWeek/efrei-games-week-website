import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";

import Link from "next/link";

export default function News() {
    return (
        <main className="flex flex-col align-middle justify-center">
            <section className="flex px-8 py-16 justify-center items-center text-center">
                <main className="max-w-7xl">
                    <h2 className="text-2xl font-bold mb-8">
                        Les dernières informations
                    </h2>
                    <section className="flex gap-4 w-full justify-center mb-8 flex-wrap">
                        <Card className="md:flex-1/4 md:basis-[30%] md:grow-0">
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
                        <Card className="md:flex-1/4 md:basis-[30%] md:grow-0">
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
                        <Card className="md:flex-1/4 md:basis-[30%] md:grow-0">
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
                        <Card className="md:flex-1/4 md:basis-[30%] md:grow-0">
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
                </main>
            </section>
        </main>
    );
}
