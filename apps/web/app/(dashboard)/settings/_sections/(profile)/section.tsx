"use server";

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { getUser } from "@/lib/actions/user";
import { ProfileForm } from "@/app/(dashboard)/settings/_sections/(profile)/form";

export async function ProfileSection() {
	const user = await getUser();
	return (
		<Card>
			<CardHeader>
				<CardTitle id="profile">Profile</CardTitle>
				<CardDescription>Used to identify your store in the marketplace.</CardDescription>
			</CardHeader>
			<CardContent>
				<ProfileForm user={user} />
			</CardContent>
		</Card>
	);
}
