"use server";

export async function createNewTeam(name, description, userId) {
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
