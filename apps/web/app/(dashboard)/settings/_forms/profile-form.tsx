"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Stack } from "@/components/stack";
import * as Text from "@/components/text";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { updateUser } from "@/lib/actions";
import { toast } from "sonner";
import type { User } from "@rss-reader/database";
import { SubmitButton } from "@/components/submit-button";
import { Separator } from "@/components/ui/separator";

export function ProfileForm({ user }: { user: User | null }) {
	return (
		<form action={updateUser}>
			<Stack direction="col" gapY={5} align="start">
				<Stack gap={2} align="center">
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
				</Stack>

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
			</Stack>
		</form>
	);
}
