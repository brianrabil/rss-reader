import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "./auth";
import { database } from "@/lib/database";

// `app/page.tsx` is the UI for the `/` URL
export default async function Page() {
	const session = await auth();
	database.user.findMany().then(console.log);
	console.log("session: ", session);
	return (
		<div className="flex flex-col min-h-[100dvh]">
			<header className="px-4 lg:px-6 h-14 flex items-center">
				<Link className="flex items-center justify-center" href="#">
					<MountainIcon className="h-6 w-6" />
					<span className="sr-only">Acme Inc</span>
				</Link>
				<nav className="ml-auto flex items-center gap-4 sm:gap-6">
					<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
						Features
					</Link>
					<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
						Pricing
					</Link>
					<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
						About
					</Link>
					{!!session?.user?.id ? (
						<Link href="/feed">
							<Button variant="outline">Dashboard</Button>
						</Link>
					) : (
						<React.Fragment>
							<Link
								className="text-sm font-medium hover:underline underline-offset-4"
								href="/login"
							>
								Login
							</Link>
							<Link
								className="text-sm font-medium hover:underline underline-offset-4"
								href="/register"
							>
								Register
							</Link>
						</React.Fragment>
					)}
				</nav>
			</header>
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
									The Complete Platform for Building the Web
								</h1>
								<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
									Give your team the toolkit to stop configuring and start innovating. Securely
									build, deploy, and scale the best web experiences.
								</p>
							</div>
							<div className="space-x-4">
								<Link
									className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
									href="#"
								>
									Get Started
								</Link>
								<Link
									className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
									href="#"
								>
									Contact Sales
								</Link>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 border-t">
					<div className="container grid items-center gap-6 px-4 text-center md:px-6 lg:grid-cols-[1fr_600px] lg:gap-10 xl:grid-cols-[1fr_800px]">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
								Experience the workflow the best frontend teams love.
							</h2>
							<p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								Let your team focus on shipping features instead of managing infrastructure with
								automated CI/CD.
							</p>
						</div>
						<div className="mx-auto w-full max-w-sm space-y-2">
							<form className="flex space-x-2">
								<Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
								<Button type="submit">Sign Up</Button>
							</form>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Sign up to get notified when we launch.
								<Link className="underline underline-offset-2" href="#">
									Terms & Conditions
								</Link>
							</p>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-gray-500 dark:text-gray-400">
					© 2024 Acme Inc. All rights reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Link className="text-xs hover:underline underline-offset-4" href="#">
						Terms of Service
					</Link>
					<Link className="text-xs hover:underline underline-offset-4" href="#">
						Privacy
					</Link>
				</nav>
			</footer>
		</div>
	);
}

function MountainIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m8 3 4 8 5-5 5 15H2L8 3z" />
		</svg>
	);
}
