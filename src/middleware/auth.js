"use server";

import { cookies } from "next/headers";

export async function getUserInfo(token) {
	console.log("oui");
	console.log(token);
	if (token == undefined) {
		const cookieStore = await cookies();
		const token = cookieStore.get("token");
		if (token == undefined) {
			return null;
		}
		const userInfo = await fetch(process.env.API_URI + "/users/userInfo/" + token.value)
			.then((data) => data.json())
			.catch((err) => null);
		return userInfo;
	} else {
		console.log(token);
		const cookieStore = await cookies();
		cookieStore.set("token", token);
		const userInfo = await fetch(process.env.API_URI + "/users/userInfo/" + token)
			.then((data) => data.json())
			.catch((err) => null);
		return userInfo;
	}
}
