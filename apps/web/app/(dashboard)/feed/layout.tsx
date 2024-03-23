"use server";

import type { ReactNode } from "react";
import { Container } from "@/components/container";

export default async function FeedLayout({ children }: { readonly children: ReactNode }) {
	return (
		<div className="flex flex-1 overflow-hidden">
			<main className="flex-1 overflow-auto">
				<Container className="gap-y-8">{children}</Container>
			</main>
		</div>
	);
}
