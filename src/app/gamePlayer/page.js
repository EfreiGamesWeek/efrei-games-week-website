"use client"; // Important pour NextJS App Router
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/middleware/auth";
import { useRouter } from "next/navigation";

let socket;

export default function PlayerPage() {
	const [canBuzz, setCanBuzz] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [myTeamInfo, setMyTeamInfo] = useState(null);
	const router = useRouter();

	useEffect(() => {
		async function fetchData() {
			const response = await getUserInfo();
			setUserInfo(response);
			if (response != null) {
				const responseTeam = await fetch(process.env.API_URI + "/teams/" + response._id).then((resp) => resp.json());
				if (responseTeam.body == null) router.push("/");
				setMyTeamInfo(responseTeam.body);
				socket = io(process.env.API_URI);

				socket.emit("join_session", {
					username: response.username,
					team: responseTeam.body.name,
					campus: userInfo.location,
				});

				return () => {
					socket.disconnect();
				};
			} else {
				router.push("/");
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		socket = io(process.env.API_URI);
		socket.on("update_player_buzz_state", (data) => {
			setCanBuzz(data.state);
		});
	}, [canBuzz]);

	const handleBuzz = () => {
		if (canBuzz) {
			socket.emit("player_buzz", {
				username: userInfo.username,
				team: myTeamInfo.name,
				time: Date.now(),
				campus: userInfo.location,
			});
		}
		setCanBuzz(false);
	};

	return (
		<section className="flex justify-between items-center h-screen flex-col text-center">
			<header>
				<h2 className="md:text-6xl text-3xl font-extrabold font-hungry mb-5">Bienvenue sur l'interface de jeu !</h2>
				<p className="md:text-xl text-md font-extrabold">Lorsque vous en serez informé, merci d'appuyer sur le bouton Répondre pour jouer.</p>
			</header>
			<Button onClick={handleBuzz} disabled={!canBuzz} className={"px-30 py-30 rounded-full text-5xl transition-all active:scale-95 font-hungry!"}>
				Répondre !
			</Button>
			<div></div>
		</section>
	);
}
