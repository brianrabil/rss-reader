"use server";

import * as Text from "@/components/text";
import Link from "next/link";
import { getUser } from "@/lib/actions/user";
import { ProfileSection } from "@/app/(dashboard)/settings/_sections/(profile)/section";
import { SubscriptionsSection } from "@/app/(dashboard)/settings/_sections/(subscriptions)/section";

export default async function SettingsPage() {
	const user = await getUser();
	return (
		<div className="flex h-full w-full flex-col">
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-background p-4 md:gap-8 md:p-10">
				<div className="mx-auto grid w-full max-w-6xl gap-2">
					<Text.H1 className="text-3xl font-semibold">Settings</Text.H1>
				</div>
				<div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
					<nav className="grid gap-4">
						<Link href="/settings#profile">
							<Text.Muted className="font-semibold text-primary">Profile</Text.Muted>
						</Link>
						<Link href="/settings#subscriptions">
							<Text.Muted>Subscriptions</Text.Muted>
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
						<ProfileSection />
						<SubscriptionsSection />
					</div>
				</div>
			</main>
		</div>
	);
}
