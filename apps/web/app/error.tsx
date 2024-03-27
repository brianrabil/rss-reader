"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";
import { Page } from "@/components/page";
import * as Text from "@/components/text";
import * as Icon from "@/components/icon";

interface ErrorPageProps {
	error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
	return (
		<Page className="justify-center">
			<Container>
				<Card>
					<div className="flex flex-col gap-1.5 p-10">
						<Text.H1 className="font-bold text-destructive">Opps!</Text.H1>
						<Text.Lead className="mt-3">Something went wrong.</Text.Lead>
						<Text.P className="mt-2 text-muted-foreground">{error.message}</Text.P>
						<Link href="/" className="mt-6" passHref>
							<Button variant="default" className="flex items-center gap-x-1">
								<Icon.Home className="h-4" />
								Go back home
							</Button>
						</Link>
					</div>
				</Card>
			</Container>
		</Page>
	);
}
