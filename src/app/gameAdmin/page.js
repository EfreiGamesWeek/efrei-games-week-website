"use client";
import { getUserInfo } from "@/middleware/auth";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";

let socket;

export default function AdminPanel() {
    const [playersJoined, setPlayersJoined] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const router = useRouter();
    useEffect(() => {
        async function fetchData() {
            const response = await getUserInfo();
            setUserInfo(response);
            if (!response.admin) router.push("/");
        }
        fetchData();
    }, []);

    useEffect(() => {
        socket = io("http://localhost:8000");

        socket.on("update_players_joined", (data) => {
            if (
                playersJoined.findIndex(
                    (element) => element.player.username == data.username,
                ) != -1
            )
                return;
            setPlayersJoined([
                ...playersJoined,
                { player: data, state: "wait" },
            ]);
        });

        socket.on("update_buzz_list", (data) => {
            const players = playersJoined.slice();
            players[
                players.findIndex(
                    (element) => element.player.username == data.username,
                )
            ] = { player: data, state: "answered" };
            setPlayersJoined(players);
        });

        return () => {
            socket.disconnect();
        };
    }, [playersJoined]);

    const handleRemovePlayers = () => {
        setPlayersJoined([]);
    };

    const handleResetPlayersState = () => {
        const players = playersJoined.slice();
        for (let i = 0; i < players.length; i++) {
            players[i].state = "wait";
        }
        setPlayersJoined(players);
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Session Admin</h1>
            <button
                onClick={handleRemovePlayers}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mr-4"
            >
                Remove all players
            </button>
            <button
                onClick={handleResetPlayersState}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Reset players state
            </button>

            <div className="space-y-2">
                {playersJoined.map((buzz, index) =>
                    buzz.state == "answered" ? (
                        <div
                            key={index}
                            className="flex justify-between bg-white p-4 shadow rounded border-l-4 border-green-500"
                        >
                            <span className="font-bold text-xl">
                                #{index + 1} {buzz.player.username} -- Equipe :{" "}
                                {buzz.player.team}
                            </span>
                            <span className="text-gray-500 text-sm">
                                {/* Calcul du delta temps si nécessaire, ou affichage brut */}
                                {new Date(
                                    buzz.player.time,
                                ).toLocaleTimeString()}{" "}
                                : {new Date(buzz.player.time).getMilliseconds()}
                                ms
                            </span>
                        </div>
                    ) : (
                        <div
                            key={index}
                            className="flex justify-between bg-white p-4 shadow rounded border-l-4 border-yellow-500"
                        >
                            <span className="font-bold text-xl">
                                #{index + 1} {buzz.player.username} -- Equipe :{" "}
                                {buzz.player.team}
                            </span>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}
