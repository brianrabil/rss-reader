import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	Card,
	CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { getUser, updateUser } from "@/lib/actions";
import { toast } from "sonner";

export default async function SettingsPage() {
	const user = await getUser();

	return (
		<div className="flex h-full w-full flex-col">
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-background p-4 md:gap-8 md:p-10">
				<div className="mx-auto grid w-full max-w-6xl gap-2">
					<h1 className="text-3xl font-semibold">Settings</h1>
				</div>
				<div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
					<nav className="grid gap-4 text-sm text-muted-foreground">
						<Link href="/settings/profile" className="font-semibold text-primary">
							Profile
						</Link>
						<Link href="/settings/notifications">Notifications</Link>
						<Link href="/settings/user-interface">User Interface</Link>
						<Link href="/settings/feeds">Stats</Link>
						<Link href="/settings/security">Security</Link>
						<Link href="/settings/advanced">Advanced</Link>
					</nav>
					<div className="grid gap-6">
						<form action={updateUser}>
							<Card>
								<CardHeader>
									<CardTitle>Profile</CardTitle>
									<CardDescription>Used to identify your store in the marketplace.</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-col gap-y-5">
									<div className="flex flex-row gap-2 items-center">
										<Avatar>
											<AvatarImage
												alt="profile pic"
												src={user?.image ?? `https://avatar.vercel.sh/${user?.email}`}
											/>
										</Avatar>
										<div className="grid w-full max-w-xs items-center gap-1.5">
											<Label htmlFor="picture">Picture</Label>
											<Input
												id="picture"
												name="picture"
												type="file"
												defaultValue={user?.image ?? undefined}
											/>
										</div>
									</div>

									<div className="grid w-full max-w-sm items-center gap-1.5">
										<Label id="username">Username</Label>
										<Input
											id="username"
											name="username"
											placeholder="Username"
											defaultValue={user?.name ?? undefined}
										/>
									</div>

									<div className="grid w-full max-w-sm items-center gap-1.5">
										<Label id="email">Email</Label>
										<Input
											id="email"
											name="email"
											required
											placeholder="Email"
											defaultValue={user?.email ?? undefined}
										/>
									</div>
								</CardContent>
								<CardFooter className="border-t px-6 py-4">
									<Button type="submit">Save</Button>
								</CardFooter>
							</Card>
						</form>

						<Card>
							<CardHeader>
								<CardTitle>Plugins Directory</CardTitle>
								<CardDescription>
									The directory within your project, in which your plugins are located.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form className="flex flex-col gap-4">
									<Input placeholder="Project Name" defaultValue="/content/plugins" />
									<div className="flex items-center space-x-2">
										<Checkbox id="include" defaultChecked />
										<label
											htmlFor="include"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Allow administrators to change the directory.
										</label>
									</div>
								</form>
							</CardContent>
							<CardFooter className="border-t px-6 py-4">
								<Button>Save</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
