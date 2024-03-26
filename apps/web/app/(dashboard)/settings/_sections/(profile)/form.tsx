"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { updateUser } from "@/lib/actions/user";
import type { User } from "@rss-reader/database";
import { SubmitButton } from "@/components/submit-button";
import { Separator } from "@/components/ui/separator";

export function ProfileForm({ user }: { user: User | null }) {
	return (
		<form action={updateUser}>
			<div className="flex flex-col gap-y-5 items-start">
				<div className="flex gap-2 items-center">
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
				<Separator />
				<SubmitButton>Save</SubmitButton>
			</div>
		</form>
	);
}
