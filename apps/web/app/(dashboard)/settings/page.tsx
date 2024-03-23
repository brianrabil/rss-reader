"use server";

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import * as Text from "@/components/text";
import Link from "next/link";
import { getUser } from "@/lib/actions";
import { ProfileForm } from "@/app/(dashboard)/settings/_forms/profile-form";

export default async function SettingsPage() {
	const user = await getUser();
	return (
		<div className="flex h-full w-full flex-col">
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-background p-4 md:gap-8 md:p-10">
				<div className="mx-auto grid w-full max-w-6xl gap-2">
					<Text.H1 size="3xl" weight="semibold">
						Settings
					</Text.H1>
				</div>
				<div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
					<nav className="grid gap-4">
						<Link href="/settings#profile">
							<Text.Muted weight="semibold" color="primary">
								Profile
							</Text.Muted>
						</Link>
						<Link href="/settings#feeds">
							<Text.Muted>Feeds</Text.Muted>
						</Link>
						<Link href="/settings#notifications">
							<Text.Muted>Notifications</Text.Muted>
						</Link>
						<Link href="/settings#user-interface">
							<Text.Muted>User Interface</Text.Muted>
						</Link>
						<Link href="/settings#security">
							<Text.Muted>Security</Text.Muted>
						</Link>
						<Link href="/settings#advanced">
							<Text.Muted>Advanced</Text.Muted>
						</Link>
					</nav>
					<div className="grid gap-6">
						<Card>
							<CardHeader>
								<CardTitle id="profile">Profile</CardTitle>
								<CardDescription>Used to identify your store in the marketplace.</CardDescription>
							</CardHeader>
							<CardContent>
								<ProfileForm user={user} />
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle id="user-interface">User Interface</CardTitle>
								<CardDescription>Customize the look and feel of the app.</CardDescription>
							</CardHeader>
							<CardContent>{/* <ProfileForm user={user} /> */}</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
