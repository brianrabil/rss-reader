"use server";

import Link from "next/link";
import * as Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import * as Text from "@/components/text";
import { getUser } from "@/lib/actions";

export async function LeftPanel() {
	const user = await getUser();
	return (
		<aside className="hidden  lg:block bg-background h-full max-h-screen">
			<div className="flex max-h-screen h-full flex-col gap-2">
				<div className="flex h-[60px] items-center px-4 justify-between">
					<Link className="flex items-center gap-2 font-semibold" href="#">
						<Icon.Rss className="h-5 w-5" />
						<span className="">RSS Reader</span>
					</Link>
					<Button size="icon" variant="ghost">
						<Icon.RefreshCcw className="h-5 w-5" />
						<span className="sr-only">Refresh feed</span>
					</Button>
				</div>
				<div className="flex-1 overflow-auto py-2">
					<nav className="grid items-start px-4 text-sm font-medium">
						<Link
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
							href="/feed"
						>
							<Icon.Newspaper className="h-4 w-4" />
							Feed
						</Link>
						<Link
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
							href="/bookmarks"
						>
							<Icon.Bookmark className="h-4 w-4" />
							Bookmarks
						</Link>

						<Link
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
							href="/explore"
						>
							<Icon.Earth className="h-4 w-4" />
							Explore
						</Link>
						<Link
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
							href="/settings"
						>
							<Icon.Settings className="h-4 w-4" />
							Settings
						</Link>
						<Link
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
							href="/logout"
						>
							<Icon.LogOut className="h-4 w-4" />
							Logout
						</Link>
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
						<Text.Muted size="xs">{user?.email}</Text.Muted>
					</div>
				</div>
			</div>
		</aside>
	);
}
