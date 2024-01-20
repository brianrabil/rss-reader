import { type ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "./../../components/ui/button";
import { Input } from "./../../components/ui/input";
import {
  RssIcon,
  RefreshCwIcon,
  BookmarkIcon,
  NewspaperIcon,
  ComputerIcon,
  MenuIcon,
  SearchIcon,
} from "./../../components/icon";
import { CommandPalette } from "./../../components/command-palette";
import { Avatar } from "./../../components/ui/avatar";

export const metadata: Metadata = {
  title: "RSS Reader | Dashboard",
  description: "Generated by Next.js",
};

export default function DashboardLayout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="grid min-h-screen max-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 max-h-screen">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <RssIcon className="h-6 w-6" />
              <span className="">RSS Reader</span>
            </Link>
            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
              <RefreshCwIcon className="h-4 w-4" />
              <span className="sr-only">Refresh feed</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <BookmarkIcon className="h-4 w-4" />
                Saved Articles
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="/feed"
              >
                <NewspaperIcon className="h-4 w-4" />
                Feed
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="/discover"
              >
                <ComputerIcon className="h-4 w-4" />
                Discover
              </Link>
            </nav>
          </div>
          <div className="flex-0 overflow-auto py-2">
            <Avatar />
            Username
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Link>
          <div className="w-full flex-1">
            <CommandPalette />
          </div>
        </header>
        <div className="flex flex-1 overflow-scroll">{children}</div>
      </div>
    </div>
  );
}