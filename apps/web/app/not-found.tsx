import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";
import { Page } from "@/components/page";
import { Stack } from "@/components/stack";
import * as Text from "@/components/text";

export default function NonFoundPage() {
	return (
		<Page className="justify-center">
			<Container>
				<Card>
					<Stack direction="col" className="p-10">
						<Text.H1 weight="bold">404</Text.H1>
						<Text.Lead className="mt-3">Page not found</Text.Lead>
						<Text.P className="mt-2" color="muted-foreground">
							The page you&apos;re looking for doesn&apos;t seem to exist.
						</Text.P>
						<Link href="/feed" className="mt-6">
							<Button variant="default">Go back home</Button>
						</Link>
					</Stack>
				</Card>
			</Container>
		</Page>
	);
}
