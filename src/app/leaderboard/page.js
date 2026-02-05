"use client";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";

export default function Leaderboard() {
	const [allTeamsInfo, setAllTeamsInfo] = useState(null);
	useEffect(() => {
		function sort_by_key(array, key, way) {
			//way : ASC = 1; DESC = -1
			return array.sort(function (a, b) {
				var x = a[key];
				var y = b[key];
				return x < y ? -1 * way : x > y ? 1 * way : 0;
			});
		}
		async function fetchTeams() {
			const response = await fetch(process.env.API_URI + "/teams/").then((resp) => resp.json());
			setAllTeamsInfo(sort_by_key(response, "numberOfPoints", -1));
		}
		fetchTeams();
	}, []);
	return (
		<main className="max-w-7xl p-8 m-auto">
			<h2 className="text-4xl font-bold mb-8 font-hungry text-center">Le Leaderboard</h2>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="text-center w-20">Classement</TableHead>
							<TableHead className="text-center">Nom de l'équipe</TableHead>
							<TableHead className="text-center">Nombre de points</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{allTeamsInfo == null
							? null
							: allTeamsInfo.map((elem, idx) => (
									<TableRow key={idx} className="text-center">
										<TableCell>{idx + 1}</TableCell>
										<TableCell>{elem.name}</TableCell>
										<TableCell>{elem.numberOfPoints}</TableCell>
									</TableRow>
								))}
					</TableBody>
				</Table>
			</div>
		</main>
	);
}
