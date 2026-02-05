"use client";

import { getUserInfo } from "@/middleware/auth";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { SelectValue, Select, SelectContent, SelectItem, SelectGroup, SelectTrigger } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ProfilePage({ updateUserById, deleteUserById }) {
	const [userInfo, setUserInfo] = useState(null);
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [campus, setCampus] = useState("");

	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	useEffect(() => {
		async function fetchData() {
			console.log(token);
			if (token != null) {
				await getUserInfo(token).then(() => {
					router.push("/profile");
				});
			} else {
				const response = await getUserInfo();
				setUserInfo(response);
				if (response == null) {
					router.push("/");
					return;
				}
				setName(response.name);
				setSurname(response.surname);
				setCampus(response.location);
			}
		}
		fetchData();
	}, []);

	return (
		<main className="flex flex-col align-middle justify-center">
			{userInfo != null ? (
				<section className="flex px-8 justify-center items-center text-center">
					<main className="max-w-7xl w-full">
						<h2 className="text-4xl font-bold mb-8 font-hungry w-full">Mon profil</h2>
						<section className="flex w-full justify-center mb-8">
							<Card className={"w-full"}>
								<CardContent className="w-full! flex items-center gap-5">
									<Avatar className={"w-32 h-32"}>
										<AvatarImage src={`https://cdn.discordapp.com/avatars/${userInfo.discordID}/${userInfo.avatar}`} />
										<AvatarFallback>{userInfo.username}</AvatarFallback>
									</Avatar>
									<Field>
										<FieldLabel htmlFor="name">Prénom</FieldLabel>
										<Input value={name} onChange={(e) => setName(e.target.value)} id="name" required placeholder="Prénom"></Input>
									</Field>
									<Field>
										<FieldLabel htmlFor="surname">Nom de famille</FieldLabel>
										<Input value={surname} onChange={(e) => setSurname(e.target.value)} id="surname" required placeholder="Nom"></Input>
									</Field>
									<Field>
										<FieldLabel htmlFor="surname">Campus</FieldLabel>
										<Select
											value={campus}
											onValueChange={(value) => {
												setCampus(value);
											}}
										>
											<SelectTrigger>
												<SelectValue placeholder="Campus" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="bordeaux">Bordeaux</SelectItem>
													<SelectItem value="paris">Paris</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</Field>
								</CardContent>
								<CardFooter className={"flex justify-center"}>
									<Button
										className="cursor-pointer"
										onClick={() => {
											updateUserById(name, surname, campus, userInfo._id);
											location.reload();
										}}
									>
										Sauvegarder
									</Button>
								</CardFooter>
							</Card>
						</section>
						<section className="flex w-full justify-center mb-8">
							<Card className={"w-full"}>
								<CardContent className="w-full!">
									{/* <Button
										className="cursor-pointer mr-4"
										onClick={() => {
											cookieStore.delete("token");
											location.reload();
										}}
										variant="outline"
									>
										Se déconnecter
									</Button> */}
									<Button
										className="cursor-pointer"
										onClick={() => {
											deleteUserById(userInfo._id);
											location.reload();
										}}
									>
										Supprimer mon compte
									</Button>
								</CardContent>
							</Card>
						</section>
					</main>
				</section>
			) : null}
		</main>
	);
}
