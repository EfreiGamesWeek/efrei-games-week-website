"use client";
import { getUserInfo } from "@/middleware/auth";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

let socket;

export default function AdminPanel() {
  const [playersJoined, setPlayersJoined] = useState([]);
  const [playersAnswered, setPlayersAnswered] = useState([]);
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
    socket = io(process.env.API_URI);

    socket.on("update_players_joined", (data) => {
      if (
        playersJoined.findIndex(
          (element) => element.username == data.username,
        ) != -1 ||
        playersAnswered.findIndex(
          (element) => element.username == data.username,
        ) != -1
      )
        return;
      setPlayersJoined([...playersJoined, data]);
    });

    socket.on("update_buzz_list", (data) => {
      const players = playersJoined.slice();
      console.log(data);
      players.splice(
        players.findIndex((element) => element.username == data.username),
        1,
      );
      setPlayersJoined(players);
      setPlayersAnswered([...playersAnswered, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [playersJoined]);

  const handleRemovePlayers = () => {
    setPlayersJoined([]);
    setPlayersAnswered([]);
  };

  const allowAnswer = () => {
    socket = io(process.env.API_URI);
    socket.emit("set_player_buzz_state", {
      state: true,
    });
  };

  const disableAnswer = () => {
    socket = io(process.env.API_URI);
    socket.emit("set_player_buzz_state", {
      state: false,
    });
  };

  const handleResetPlayersState = () => {
    console.log(playersJoined.concat(playersAnswered));
    setPlayersJoined(playersJoined.concat(playersAnswered));
    setPlayersAnswered([]);
    allowAnswer();
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Session Admin</h1>
      <Button
        variant="outline"
        onClick={handleRemovePlayers}
        className="cursor-pointer mb-4 mr-4"
      >
        Remove all players
      </Button>
      <Button
        variant="outline"
        onClick={handleResetPlayersState}
        className="cursor-pointer mb-4 mr-4"
      >
        Reset players state
      </Button>
      <Button onClick={allowAnswer} className="cursor-pointer mb-4 mr-4">
        Allow Answers
      </Button>
      <Button onClick={disableAnswer} className="cursor-pointer mb-4 mr-4">
        Disable Answers
      </Button>

      <div className="space-y-2 mb-6">
        {playersAnswered.map((buzz, index) => (
          <div
            key={index}
            className="flex justify-between bg-white p-4 shadow rounded border-l-4 border-green-500"
          >
            <span className="font-bold text-xl">
              #{index + 1} {buzz.username} -- Equipe : {buzz.team} -{" "}
              {buzz.campus}
            </span>
            <span className="text-gray-500 text-sm">
              {/* Calcul du delta temps si nécessaire, ou affichage brut */}
              {new Date(buzz.time).toLocaleTimeString()} :{" "}
              {new Date(buzz.time).getMilliseconds()}
              ms
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {playersJoined.map((buzz, index) => (
          <div
            key={index}
            className="flex justify-between bg-white p-4 shadow rounded border-l-4 border-yellow-500"
          >
            <span className="font-bold text-xl">
              #{index + 1} {buzz.username} -- Equipe : {buzz.team} -{" "}
              {buzz.campus}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
