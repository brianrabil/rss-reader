"use server";

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getSubscriptions } from "@/lib/actions";

export async function SubscriptionsSection() {
	const user = await getSubscriptions();

	return (
		<Card>
			<CardHeader>
				<CardTitle id="subscriptions">Subscriptions</CardTitle>
				<CardDescription>Manage your subscriptions.</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable columns={columns} data={user?.feeds} />
			</CardContent>
		</Card>
	);
}
