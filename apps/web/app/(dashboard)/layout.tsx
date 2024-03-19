import { type ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RssIcon, RefreshCwIcon, NewspaperIcon, ComputerIcon, MenuIcon } from "@/components/icon";
import { CommandPalette } from "@/components/command-palette";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TypographyMuted, TypographyP } from "@/components/typography";
import { auth } from "../auth";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import * as Icon from "lucide-react";

export const metadata: Metadata = {
	title: "RSS Reader | Dashboard",
	description: "RSS Reader Dashboard",
};

function Sidebar({ session }: { readonly session: any }) {
	return (
		<div className="hidden bg-gray-100/40 lg:block dark:bg-gray-800/40 h-full max-h-screen">
			<div className="flex max-h-screen h-full flex-col gap-2">
				<div className="flex h-[60px] items-center px-6">
					<Link className="flex items-center gap-2 font-semibold" href="#">
						<RssIcon className="h-6 w-6" />
						<span className="">RSS Reader</span>
					</Link>
					<Button className="ml-auto h-8 w-8" size="icon" variant="outline">
						<Icon.RefreshCcw className="h-4 w-4" />
						<span className="sr-only">Refresh feed</span>
					</Button>
				</div>
				<div className="flex-1 overflow-auto py-2">
					<nav className="grid items-start px-4 text-sm font-medium">
						<Link
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
							href="/feed"
						>
							<Icon.Activity className="h-4 w-4" />
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
							<Icon.Store className="h-4 w-4" />
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
				<div className="px-4 flex-0 overflow-auto py-3 flex items-center gx-2">
					<Avatar>
						<AvatarImage
							alt="Profile Picture"
							src="https://avatars.githubusercontent.com/u/499581?s=460&u=8b7f0d2f5c2b4d8a3f4f7d6b2c9e4c4e0f9b3b4d&v=4"
						/>
					</Avatar>
					<div className="flex flex-col justify-center ml-2">
						<TypographyP>{session?.user?.email}</TypographyP>
						<TypographyMuted>{session?.user?.id}</TypographyMuted>
					</div>
				</div>
			</div>
		</div>
	);
}

export default async function DashboardLayout({ children }: { readonly children: ReactNode }) {
	const session = await auth();
	return (
		<>
			<ResizablePanelGroup direction="horizontal" className="max-w-screen max-h-screen">
				<ResizablePanel defaultSize={33}>
					<Sidebar session={session} />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={67}>
					<div className="flex flex-col relative h-screen w-full overflow-hidden">
						<div className="h-screen w-full overflow-y-auto pt-14 lg:pt-[60px]">
							<header className="z-10 flex h-14 lg:h-[60px] absolute left-0 right-0 bottom-0 top-0  items-center justify-center gap-4 border-b bg-white px-6 dark:bg-gray-800">
								<Link className="lg:hidden" href="#">
									<MenuIcon className="h-6 w-6" />
									<span className="sr-only">Toggle menu</span>
								</Link>
								<div className="w-screen-lg mx-auto flex-1">
									<CommandPalette className="w-full max-w-3xl mx-auto" />
								</div>
							</header>
							<div className="w-full flex flex-1">{children}</div>
						</div>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</>
	);
}
