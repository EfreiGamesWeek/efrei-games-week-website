import ProfilePage from "./client";

async function updateUserById(name, surname, location, idUser) {
	"use server";
	const result = await fetch("https://www.api.efreigamesweek.fr/users/" + idUser, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name,
			surname: surname,
			location: location,
		}),
	}).then((res) => res.json);
	return result;
}

async function deleteUserById(idUser) {
	"use server";
	const result = await fetch("https://www.api.efreigamesweek.fr/users/" + idUser, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json);
	console.log(result);
	return result;
}

export default function Team() {
	return <ProfilePage updateUserById={updateUserById} deleteUserById={deleteUserById} />;
}
