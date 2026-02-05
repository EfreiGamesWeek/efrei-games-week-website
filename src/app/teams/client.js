"use client";

import { getUserInfo } from "@/middleware/auth";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export default function TeamsPage({ createNewTeam, updateTeamById, deleteTeamById, updatePointToTeamById }) {
	const [userInfo, setUserInfo] = useState(null);
	const [allTeamsInfo, setAllTeamsInfo] = useState(null);
	const [myTeamInfo, setMyTeamInfo] = useState(null);
	const [members, setMembers] = useState([]);
	const [pointForm, setPointForm] = useState(0);

	useEffect(() => {
		async function fetchData() {
			const response = await getUserInfo();
			setUserInfo(response);
			if (response != null) {
				const responseTeam = await fetch("http://www.api.efreigamesweek.fr:8000/teams/" + response._id).then((resp) => resp.json());
				setMyTeamInfo(responseTeam.body);
				if (responseTeam.body == null) return;
				if (responseTeam.body.members == "") return;
				setMembers(JSON.parse(responseTeam.body.members));
			}
		}
		async function fetchTeams() {
			const response = await fetch("http://www.api.efreigamesweek.fr:8000/teams/").then((resp) => resp.json());
			setAllTeamsInfo(response);
		}
		fetchData();
		fetchTeams();
	}, []);

	async function createOrUpdateTeams() {
		if (myTeamInfo == null) {
			createNewTeam(document.getElementById("teamName").value, document.getElementById("descTeam").value, userInfo._id);
		} else {
			updateTeamById(document.getElementById("teamName").value, document.getElementById("descTeam").value, JSON.stringify(members), myTeamInfo._id);
		}
		window.location.reload();
	}
	return (
		<main className="flex flex-col align-middle justify-center">
			{userInfo != null ? (
				<Dialog>
					<section className="flex px-8 justify-center items-center text-center">
						<main className="max-w-7xl">
							<h2 className="text-4xl font-bold mb-8 font-hungry w-full">Mon équipe</h2>
							{myTeamInfo != null ? (
								<section className="flex w-full justify-center mb-8">
									<Card>
										<CardHeader>
											<main className="flex justify-center">
												<h4 className="text-xl font-semibold">{myTeamInfo.name}</h4>
											</main>
										</CardHeader>
										<CardContent className="w-full!">{myTeamInfo.description}</CardContent>
										<CardFooter className={"flex justify-center"}>
											<DialogTrigger asChild>
												<Button className="cursor-pointer">Modifier mon équipe</Button>
											</DialogTrigger>
										</CardFooter>
									</Card>
								</section>
							) : (
								<section className="w-full! justify-center mb-8">
									<Card>
										<CardHeader>
											<h4 className="text-xl font-semibold">Vous n'avez pas encore d'équipe</h4>
										</CardHeader>
										<CardContent>
											<DialogTrigger asChild>
												<Button className="cursor-pointer">Créer mon équipe</Button>
											</DialogTrigger>
										</CardContent>
									</Card>
								</section>
							)}
						</main>
						<DialogContent className="sm:max-w-md">
							<DialogHeader>
								<DialogTitle>Créer/Modifier mon équipe</DialogTitle>
								<DialogDescription>Tous les champs avec une * sont obligatoires</DialogDescription>
							</DialogHeader>
							<main>
								{myTeamInfo == null ? (
									<div>
										<Field className="pb-4">
											<FieldLabel htmlFor="teamName">Nom de l'équipe *</FieldLabel>
											<Input id="teamName" required placeholder="Le nom de votre équipe"></Input>
										</Field>
										<Field>
											<FieldLabel htmlFor="teamName">Description de l'équipe</FieldLabel>
											<Textarea id="descTeam" placeholder="La description de votre équipe"></Textarea>
										</Field>
									</div>
								) : (
									<div>
										<Field className="pb-4">
											<FieldLabel htmlFor="teamName">Nom de l'équipe *</FieldLabel>
											<Input defaultValue={myTeamInfo.name} id="teamName" required placeholder="Le nom de votre équipe"></Input>
										</Field>
										<Field>
											<FieldLabel htmlFor="teamName">Description de l'équipe</FieldLabel>
											<Textarea defaultValue={myTeamInfo.description} id="descTeam" placeholder="La description de votre équipe"></Textarea>
										</Field>
										<section>
											<header className="flex justify-between items-end">
												<h3 className={"mt-6 mb-2 font-bold"}>Membres de l'équipe</h3>
												<Button
													className={"cursor-pointer"}
													disabled={members.length > 2}
													onClick={() => {
														if (members.length < 3) {
															setMembers([...members, ["", ""]]);
														}
													}}
													variant="outline"
													size="icon"
												>
													<Plus />
												</Button>
											</header>
											<Field>
												<FieldLabel htmlFor="membre">Membre 1</FieldLabel>
												<div id="membre" className="flex gap-2">
													<Input defaultValue={userInfo.name} disabled required placeholder="Prénom"></Input>
													<Input defaultValue={userInfo.surname} required disabled placeholder="Nom"></Input>
												</div>
											</Field>
											{members.map((ele, idx) => (
												<Field key={idx} className={"mt-2"}>
													<FieldLabel htmlFor={"member" + idx}>Membre {idx + 2}</FieldLabel>
													<div id={"member" + idx} className="flex gap-2">
														<Input
															value={members[idx][0]}
															onChange={(e) => {
																const newMembers = members.slice();
																newMembers[idx][0] = e.target.value;
																setMembers(newMembers);
															}}
															placeholder="Prénom"
														></Input>
														<Input
															value={members[idx][1]}
															onChange={(e) => {
																const newMembers = members.slice();
																newMembers[idx][1] = e.target.value;
																setMembers(newMembers);
															}}
															placeholder="Nom"
														></Input>
														<Button
															className={"cursor-pointer"}
															onClick={() => {
																setMembers(members.filter((element) => JSON.stringify(element) != JSON.stringify(ele)));
															}}
															variant="outline"
															size="icon"
														>
															<Trash2 />
														</Button>
													</div>
												</Field>
											))}
										</section>
									</div>
								)}
							</main>
							<DialogFooter>
								<section className="flex justify-between w-full">
									{myTeamInfo == null ? null : (
										<Button
											type="submit"
											className={"cursor-pointer"}
											onClick={() => {
												deleteTeamById(myTeamInfo._id);
												window.location.reload();
											}}
										>
											Supprimer l'équipe
										</Button>
									)}

									<div className="ml-auto flex gap-2">
										<DialogClose asChild>
											<Button variant="outline" className={"cursor-pointer"}>
												Annuler
											</Button>
										</DialogClose>
										<Button type="submit" className={"cursor-pointer"} onClick={createOrUpdateTeams}>
											Sauvegarder
										</Button>
									</div>
								</section>
							</DialogFooter>
						</DialogContent>
					</section>
				</Dialog>
			) : null}
			<Dialog>
				<section className="flex px-8 justify-center items-center text-center">
					<main className="max-w-7xl">
						<h2 className="text-4xl font-bold mb-8 font-hungry">Toutes les équipes</h2>
						<section className="flex gap-4 w-full justify-center mb-8 flex-wrap">
							{allTeamsInfo != null
								? allTeamsInfo.map((ele, idx) => (
										<Card key={idx}>
											<CardHeader>
												<h4 className="text-xl font-semibold">{ele.name}</h4>
											</CardHeader>
											<CardContent className={"w-full!"}>{ele.description}</CardContent>
											<CardFooter className="flex justify-center text-sm">Score : {ele.numberOfPoints}</CardFooter>
											{userInfo == null ? null : userInfo.admin ? (
												<aside className="flex justify-center gap-4">
													<DialogTrigger asChild>
														<Button variant="outline" className={"cursor-pointer"}>
															Ajouter des points
														</Button>
													</DialogTrigger>
													<Button
														variant="outline"
														className={"cursor-pointer"}
														onClick={() => {
															deleteTeamById(ele._id);
															location.reload();
														}}
													>
														Supprimer
													</Button>
												</aside>
											) : null}
											<DialogContent className="sm:max-w-md">
												<DialogHeader>
													<DialogTitle>Ajouter/Supprimer des points</DialogTitle>
												</DialogHeader>
												<main>
													<Field className="pb-4">
														<FieldLabel htmlFor="point">Nombre de points à ajouter ou supprimer</FieldLabel>
														<Input type={"number"} id="point" required placeholder="Nombre de points" value={pointForm} onChange={(e) => setPointForm(e.target.value)}></Input>
													</Field>
												</main>
												<DialogFooter>
													<section className="flex justify-between w-full">
														<div className="ml-auto flex gap-2">
															<DialogClose asChild>
																<Button variant="outline" className={"cursor-pointer"}>
																	Annuler
																</Button>
															</DialogClose>
															<Button
																type="submit"
																className={"cursor-pointer"}
																onClick={() => {
																	console.log(ele);
																	updatePointToTeamById(parseInt(pointForm) + ele.numberOfPoints, ele._id);
																	location.reload();
																}}
															>
																Sauvergarder
															</Button>
														</div>
													</section>
												</DialogFooter>
											</DialogContent>
										</Card>
									))
								: null}
						</section>
					</main>
				</section>
			</Dialog>
		</main>
	);
}
