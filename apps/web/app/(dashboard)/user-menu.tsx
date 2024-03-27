"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import * as Text from "@/components/text";
import type { User } from "@rss-reader/database";

export function UserMenu({ user }: { user: User }) {
	return (
		<div className="px-4 flex-0 overflow-auto py-3 gap-x-2 flex items-center gx-2">
			<Avatar>
				<AvatarImage
					alt="profile pic"
					src={user.image ?? `https://avatar.vercel.sh/${user.email}`}
				/>
			</Avatar>
			<div className="flex flex-col justify-center">
				<Text.P>{user.name}</Text.P>
				<Text.Muted className="text-xs">{user.email}</Text.Muted>
			</div>
		</div>
	);
}
