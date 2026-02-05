import { Suspense } from "react";
import Home from "./client";

export default function Page() {
	return (
		<Suspense>
			<Home />
		</Suspense>
	);
}
