"use server";

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { getSubscriptions } from "@/lib/actions/rss";

export async function SubscriptionsSection() {
	const user = await getSubscriptions();
	const feeds = user?.feeds ?? [];

	return (
		<Card>
			<CardHeader>
				<CardTitle id="subscriptions">Subscriptions</CardTitle>
				<CardDescription>Manage your subscriptions.</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable data={feeds} />
			</CardContent>
		</Card>
	);
}
