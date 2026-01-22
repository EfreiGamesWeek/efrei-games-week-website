import TeamsPage from "./client";

async function createNewTeam(name, description, userId) {
    "use server";
    const result = await fetch("http://localhost:8000/teams/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            description: description,
            idAdmin: userId,
        }),
    }).then((res) => res.json);
    return result;
}

async function updateTeamById(name, description, idTeam) {
    "use server";
    const result = await fetch("http://localhost:8000/teams/" + idTeam, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            description: description,
        }),
    }).then((res) => res.json);
    console.log(result);
    return result;
}

export default function Team() {
    return (
        <TeamsPage
            createNewTeam={createNewTeam}
            updateTeamById={updateTeamById}
        />
    );
}
