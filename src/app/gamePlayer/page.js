"use client"; // Important pour NextJS App Router
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/middleware/auth";
import { useRouter } from "next/navigation";

let socket;

export default function PlayerPage() {
    const [hasBuzzed, setHasBuzzed] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [myTeamInfo, setMyTeamInfo] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const response = await getUserInfo();
            setUserInfo(response);
            if (response != null) {
                const responseTeam = await fetch(
                    "http://localhost:8000/teams/" + response._id,
                ).then((resp) => resp.json());
                setMyTeamInfo(responseTeam.body);
                socket = io("http://localhost:8000");

                socket.emit("join_session", {
                    username: response.username,
                    team: responseTeam.body.name,
                });

                return () => {
                    socket.disconnect();
                };
            }
        }
        fetchData();
    }, []);

    const handleBuzz = () => {
        if (!hasBuzzed) {
            socket.emit("player_buzz", {
                username: userInfo.username,
                team: userInfo.name,
                time: Date.now(),
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Button
                onClick={handleBuzz}
                className={
                    "px-8 py-8 rounded-full text-2xl transition-all active:scale-95 font-hungry!"
                }
            >
                {hasBuzzed ? "Réponse envoyée !" : "RÉPONDRE"}
            </Button>
        </div>
    );
}
