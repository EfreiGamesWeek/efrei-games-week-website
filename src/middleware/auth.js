"use server";

import { cookies } from "next/headers";

export async function getUserInfo() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token");
	if (token == undefined) {
		return null;
	}
	const userInfo = await fetch("https://www.api.efreigamesweek.fr/users/userInfo/" + token.value)
		.then((data) => data.json())
		.catch((err) => null);
	return userInfo;
}
