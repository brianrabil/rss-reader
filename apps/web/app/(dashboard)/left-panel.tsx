"use server";

import Link, { LinkProps } from "next/link";
import * as Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import * as Text from "@/components/text";
import { getUser } from "@/lib/actions";
import { LucideIcon } from "lucide-react";

const navItems: { name: string; icon: LucideIcon; href: LinkProps<string>["href"] }[] = [
	{
		name: "Feed",
		icon: Icon.Newspaper,
		href: "/feed",
	},
	{
		name: "Bookmarks",
		icon: Icon.Bookmark,
		href: "/bookmarks",
	},
	{
		name: "Explore",
		icon: Icon.Earth,
		href: "/explore",
	},
	{
		name: "Settings",
		icon: Icon.Settings,
		href: "/settings",
	},
	{
		name: "Logout",
		icon: Icon.LogOut,
		href: "/logout",
	},
];

export async function LeftPanel() {
	const user = await getUser();

	return (
		<div className="grid min-h-screen w-full">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-16 items-center px-4 border-b justify-between">
						<Link className="flex items-center gap-2 font-semibold" href="#">
							<Icon.Rss className="h-5 w-5" />
							<span className="">RSS Reader</span>
						</Link>

						<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
							<Icon.Bell className="h-4 w-4 text-muted-foreground" />
							<span className="sr-only">Toggle notifications</span>
						</Button>
					</div>

					<div className="flex-1 overflow-auto py-2">
						<nav className="grid items-start px-4 text-sm font-medium">
							{navItems.map(({ href, icon: NavIcon, name }) => (
								<Link
									key={name}
									className="flex items-center gap-3 rounded-lg py-2 text-muted-foreground transition-all hover:text-primary"
									href={href}
								>
									<NavIcon className="h-4 w-4" />
									{name}
								</Link>
							))}
						</nav>
					</div>
					<div className="px-4 flex-0 overflow-auto py-3 gap-x-2 flex items-center gx-2">
						<Avatar>
							<AvatarImage
								alt="profile pic"
								src={user?.image ?? `https://avatar.vercel.sh/${user?.email}`}
							/>
						</Avatar>
						<div className="flex flex-col justify-center">
							<Text.P>{user?.name}</Text.P>
							<Text.Muted className="text-xs">{user?.email}</Text.Muted>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
