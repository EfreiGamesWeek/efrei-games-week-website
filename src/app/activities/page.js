import ClientPage from "./client";

async function createActivity(name, description, organizer, location, time, numberOfPointsAvailable, numberOfContestantByTeam) {
	"use server";
	const result = await fetch(process.env.API_URI + "/activities/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name,
			description: description,
			organizer: organizer,
			location: location,
			time: time,
			numberOfPointsAvailable: numberOfPointsAvailable,
			numberOfContestantByTeam: numberOfContestantByTeam,
		}),
	}).then((res) => res.json);
	return result;
}

async function enrollActivity(idActivity, idTeam, nameTeam, teamMember, numberOfContestantMax, numberOfContestantByTeam) {
	"use server";
	const result = await fetch(process.env.API_URI + "/enroll/activity/" + idActivity, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((resp) => {
		return resp.json();
	});
	if (result.length * numberOfContestantByTeam == numberOfContestantMax) {
		return null;
	}
	const postResult = await fetch(process.env.API_URI + "/enroll/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			idActivity: idActivity,
			idTeam: idTeam,
			nameTeam: nameTeam,
			teamMember: teamMember,
		}),
	}).then((res) => res.json);
	return postResult;
}

async function updateActivityById(idActivity, name, description, organizer, location, time, numberOfPointsAvailable, numberOfContestantByTeam) {
	"use server";
	const result = await fetch(process.env.API_URI + "/activities/" + idActivity, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name,
			description: description,
			organizer: organizer,
			location: location,
			time: time,
			numberOfPointsAvailable: numberOfPointsAvailable,
			numberOfContestantByTeam: numberOfContestantByTeam,
		}),
	}).then((res) => res.json);
	return result;
}

async function deleteEnrollById(idEnroll) {
	"use server";
	const result = await fetch(process.env.API_URI + "/enroll/" + idEnroll, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json);
	console.log(result);
	return result;
}

async function deleteActivityById(idActivity) {
	"use server";
	const result = await fetch(process.env.API_URI + "/activity/" + idActivity, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json);
	console.log(result);
	return result;
}

export default function Client() {
	return <ClientPage createActivity={createActivity} updateActivityById={updateActivityById} deleteActivityById={deleteActivityById} deleteEnrollById={deleteEnrollById} enrollActivity={enrollActivity} />;
}
