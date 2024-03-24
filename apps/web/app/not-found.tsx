import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";
import { Page } from "@/components/page";
import * as Text from "@/components/text";

export default function NonFoundPage() {
	return (
		<Page className="justify-center">
			<Container>
				<Card>
					<div className="flex flex-col gap-1.5 p-10">
						<Text.H1 className="font-bold">404</Text.H1>
						<Text.Lead className="mt-3">Page not found</Text.Lead>
						<Text.P className="mt-2 text-muted-foreground">
							The page you&apos;re looking for doesn&apos;t seem to exist.
						</Text.P>
						<Link href="/feed" className="mt-6">
							<Button variant="default">Go back home</Button>
						</Link>
					</div>
				</Card>
			</Container>
		</Page>
	);
}
