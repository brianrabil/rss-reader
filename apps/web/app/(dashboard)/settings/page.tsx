import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TypographyH1, TypographyLead, TypographyMuted } from "@/components/typography";
import { Container } from "@/components/container";
import { auth } from "@/app/auth";

export default async function SettingsPage() {
	const session = await auth();
	return (
		<Container className="space-y-12">
			<section className="max-w-3xl space-y-4">
				<div className="space-y-2">
					<TypographyH1>Account Settings</TypographyH1>
					<TypographyLead>Update your account information.</TypographyLead>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>General</CardTitle>
						<CardDescription>Update your account information.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" placeholder="Enter your name" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								placeholder="Enter your email"
								type="email"
								defaultValue={session?.user?.email ?? undefined}
							/>
						</div>
					</CardContent>
				</Card>
			</section>
			<section className="max-w-3xl space-y-4">
				<Card>
					<CardHeader>
						<CardTitle>Privacy</CardTitle>
						<CardDescription>Control who can see your profile and activity.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-4">
							<div className="flex items-center space-x-4">
								<div className="flex-1">
									<Label htmlFor="profile">Profile visibility</Label>
									<TypographyMuted>Choose who can see your profile information.</TypographyMuted>
								</div>
								<div className="w-24">
									<Switch defaultChecked id="profile" />
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<div className="flex-1">
									<Label htmlFor="activity">Activity feed</Label>
									<TypographyMuted>Choose who can see your activity feed.</TypographyMuted>
								</div>
								<div className="w-24">
									<Switch id="activity" />
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
			<section className="max-w-3xl space-y-4">
				<Card>
					<CardHeader>
						<CardTitle>Notifications</CardTitle>
						<CardDescription>Choose how you want to be notified.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-4">
							<div className="flex items-center space-x-4">
								<div className="flex-1">
									<Label htmlFor="email">Email notifications</Label>
									<TypographyMuted>Receive daily summary emails.</TypographyMuted>
								</div>
								<div className="w-24">
									<Switch defaultChecked id="email" />
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<div className="flex-1">
									<Label htmlFor="push">Push notifications</Label>
									<TypographyMuted>Get notified on your mobile device.</TypographyMuted>
								</div>
								<div className="w-24">
									<Switch id="push" />
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
		</Container>
	);
}
