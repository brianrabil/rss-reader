"use server";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as Icon from "@/components/icon";
import { getAllArticles } from "@/lib/actions/rss";
import * as Text from "@/components/text";
import { formatDistanceToNow } from "date-fns";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function FeedPage() {
	const articles = await getAllArticles();
	return (
		<>
			{articles.map(
				(article) =>
					!!article.feed && (
						<Card key={article.guid}>
							<CardHeader>
								<div className="flex flex-col items-start w-full gap-2">
									<div className="w-full flex justify-between">
										<div className="flex gap-2">
											{article.feed.favicon && (
												// eslint-disable-next-line @next/next/no-img-element
												<img
													className="h-5 object-contain"
													src={article.feed.favicon}
													alt={`${article.feed.title} favicon`}
												/>
											)}
											<Link href={`/articles/${article.feed.id}`}>
												<Text.Small>{article.feed.title}</Text.Small>
											</Link>
											{article.pubDate && (
												<Text.Muted>
													&middot; {formatDistanceToNow(article.pubDate, { addSuffix: true })}
												</Text.Muted>
											)}
										</div>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon" className="text-muted-foreground">
													<Icon.EllipsisVertical className="h-4" />
													<span className="sr-only">Toggle feed item menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>My Account</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuItem>Settings</DropdownMenuItem>
												<DropdownMenuItem>Support</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem>Logout</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
									<CardTitle>
										<Link href={`/articles/${article.id}`}>
											<Text.H3 className="hover:underline">{article.title}</Text.H3>
										</Link>
									</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								{!!article.imageUrl && (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										alt="Image Thumbnail"
										className="w-24 h-24 object-cover aspect-square"
										src={article.imageUrl}
									/>
								)}
								<Text.Muted className="line-clamp-1">{article.content}</Text.Muted>
							</CardContent>
							<CardFooter>
								<div className="flex items-start gap-1.5">
									<Button size="icon" variant="ghost" className="text-muted-foreground">
										<Icon.ThumbsUp className="h-5" />
										<span className="sr-only">Link</span>
									</Button>
									<Button size="icon" variant="ghost" className="text-muted-foreground">
										<Icon.ThumbsDown className="h-5" />
										<span className="sr-only">Dislike</span>
									</Button>
									<Button size="icon" variant="ghost" className="text-muted-foreground">
										<Icon.Bookmark className="h-5" />
										<span className="sr-only">Bookmark</span>
									</Button>
									<Button size="icon" variant="ghost" className="text-muted-foreground">
										<Icon.Share className="h-5" />
										<span className="sr-only">Share</span>
									</Button>
								</div>
							</CardFooter>
						</Card>
					)
			)}
			{/* <Card>
					<CardContent>
						<div className="flex flex-col bg-gradient-to-r from-blue-500 to-blue-700">
							<div className="flex flex-col items-center p-6 space-y-4 w-500 mx-auto">
								<h1 className="text-2xl font-semibold text-white">San Francisco</h1>
								<p className="text-sm text-gray-200">Monday, 12 April</p>
								<div className="flex flex-col items-center space-y-2">
									<svg
										className=" h-20 w-20 text-gray-300"
										fill="none"
										height="24"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										width="24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
									</svg>
									<p className="text-6xl font-bold text-white">72°</p>
									<p className="text-xl text-gray-300">Partly Cloudy</p>
								</div>
							</div>
							<div className="flex overflow-x-auto space-x-6 p-6 w-500 mx-auto">
								<div className="flex flex-col items-center space-y-2">
									<p className="text-sm font-medium text-white">4 PM</p>
									<svg
										className=" h-10 w-10 text-gray-300"
										fill="none"
										height="24"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										width="24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
									</svg>
									<p className="text-lg font-semibold text-white">70°</p>
								</div>
								<div className="flex flex-col items-center space-y-2">
									<p className="text-sm font-medium text-white">5 PM</p>
									<svg
										className=" h-10 w-10 text-yellow-300"
										fill="none"
										height="24"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										width="24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle cx="12" cy="12" r="4" />
										<path d="M12 2v2" />
										<path d="M12 20v2" />
										<path d="m4.93 4.93 1.41 1.41" />
										<path d="m17.66 17.66 1.41 1.41" />
										<path d="M2 12h2" />
										<path d="M20 12h2" />
										<path d="m6.34 17.66-1.41 1.41" />
										<path d="m19.07 4.93-1.41 1.41" />
									</svg>
									<p className="text-lg font-semibold text-white">68°</p>
								</div>
								<div className="flex flex-col items-center space-y-2">
									<p className="text-sm font-medium text-white">6 PM</p>
									<svg
										className=" h-10 w-10 text-gray-300"
										fill="none"
										height="24"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										width="24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
									</svg>
									<p className="text-lg font-semibold text-white">65°</p>
								</div>
								<div className="flex flex-col items-center space-y-2">
									<p className="text-sm font-medium text-white">7 PM</p>
									<svg
										className=" h-10 w-10 text-yellow-300"
										fill="none"
										height="24"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										width="24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle cx="12" cy="12" r="4" />
										<path d="M12 2v2" />
										<path d="M12 20v2" />
										<path d="m4.93 4.93 1.41 1.41" />
										<path d="m17.66 17.66 1.41 1.41" />
										<path d="M2 12h2" />
										<path d="M20 12h2" />
										<path d="m6.34 17.66-1.41 1.41" />
										<path d="m19.07 4.93-1.41 1.41" />
									</svg>
									<p className="text-lg font-semibold text-white">63°</p>
								</div>
							</div>
							<div className="flex-1 overflow-y-auto space-y-6 p-6 w-500 mx-auto">
								<div className="flex justify-between items-center mb-8 mr-4">
									<p className="text-lg font-medium text-white">Tuesday</p>
									<div className="flex items-center space-x-4">
										<svg
											className=" h-6 w-6 text-gray-300"
											fill="none"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
										</svg>
										<p className="text-lg font-semibold text-white">73° / 60°</p>
									</div>
								</div>
								<div className="flex justify-between items-center mb-8 mr-4">
									<p className="text-lg font-medium text-white pr-4">Wednesday</p>
									<div className="flex items-center space-x-4">
										<svg
											className=" h-6 w-6 text-yellow-300"
											fill="none"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle cx="12" cy="12" r="4" />
											<path d="M12 2v2" />
											<path d="M12 20v2" />
											<path d="m4.93 4.93 1.41 1.41" />
											<path d="m17.66 17.66 1.41 1.41" />
											<path d="M2 12h2" />
											<path d="M20 12h2" />
											<path d="m6.34 17.66-1.41 1.41" />
											<path d="m19.07 4.93-1.41 1.41" />
										</svg>
										<p className="text-lg font-semibold text-white">76° / 62°</p>
									</div>
								</div>
								<div className="flex justify-between items-center mb-8 mr-4">
									<p className="text-lg font-medium text-white">Thursday</p>
									<div className="flex items-center space-x-4">
										<svg
											className=" h-6 w-6 text-gray-300"
											fill="none"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
										</svg>
										<p className="text-lg font-semibold text-white">70° / 57°</p>
									</div>
								</div>
								<div className="flex justify-between items-center mb-8 mr-4">
									<p className="text-lg font-medium text-white">Friday</p>
									<div className="flex items-center space-x-4">
										<svg
											className=" h-6 w-6 text-gray-300"
											fill="none"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
										</svg>
										<p className="text-lg font-semibold text-white">70° / 57°</p>
									</div>
								</div>
								<div className="flex justify-between items-center mb-8 mr-4">
									<p className="text-lg font-medium text-white">Saturday</p>
									<div className="flex items-center space-x-4">
										<svg
											className=" h-6 w-6 text-yellow-300"
											fill="none"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle cx="12" cy="12" r="4" />
											<path d="M12 2v2" />
											<path d="M12 20v2" />
											<path d="m4.93 4.93 1.41 1.41" />
											<path d="m17.66 17.66 1.41 1.41" />
											<path d="M2 12h2" />
											<path d="M20 12h2" />
											<path d="m6.34 17.66-1.41 1.41" />
											<path d="m19.07 4.93-1.41 1.41" />
										</svg>
										<p className="text-lg font-semibold text-white">76° / 62°</p>
									</div>
								</div>
								<div className="flex justify-between items-center mb-8 mr-4">
									<p className="text-lg font-medium text-white">Sunday</p>
									<div className="flex items-center space-x-4">
										<svg
											className=" h-6 w-6 text-gray-300"
											fill="none"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
										</svg>
										<p className="text-lg font-semibold text-white">70° / 57°</p>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card> */}

			{/* <Card
					key="1"
					className="w-[500px] mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-3xl m-3"
				>
					<div className="md:flex">
						<div className="md:flex-shrink-0">
							<span className="object-cover md:w-48 rounded-md bg-muted w-[192px] h-[192px]" />
						</div>
						<div className="p-8 w-full">
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<img
										alt="Profile picture"
										className="rounded-full"
										height="40"
										src="/placeholder.svg"
										style={{
											aspectRatio: "40/40",
											objectFit: "cover",
										}}
										width="40"
									/>
									<div className="ml-4">
										<div className="uppercase tracking-wide text-sm text-black dark:text-white font-semibold">
											Chamath Palihapitiya
										</div>
										<div className="text-gray-400 dark:text-gray-300">@chamath</div>
									</div>
								</div>
								<TwitterIcon className="h-6 w-6 text-blue-500 fill-current" />
							</div>
							<p className="mt-4 text-gray-500 dark:text-gray-300">
								I’m in the arena trying stuff. Some will work, some won’t. But always learning.
								You’re anonymous and afraid of your own shadow. Enjoy the sidelines.
							</p>
							<div className="flex mt-6 justify-between items-center">
								<div className="flex space-x-4 text-gray-400 dark:text-gray-300">
									<div className="flex items-center">
										<HeartIcon className="h-6 w-6 text-red-500" />
										<span className="ml-1 text-red-500">566</span>
									</div>
									<div className="flex items-center">
										<MessageCircleIcon className="h-6 w-6 text-green-500" />
										<span className="ml-1 text-green-500">241</span>
									</div>
									<div className="flex items-center">
										<RepeatIcon className="h-6 w-6 text-blue-500" />
										<span className="ml-1 text-blue-500">487</span>
									</div>
								</div>
								<div className="text-gray-400 dark:text-gray-300">7:22 AM · Aug 22, 2023</div>
							</div>
						</div>
					</div>
				</Card>

				<div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4 px-4 md:px-6 lg:px-8 pb-4 md:pb-8">
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">How to Grow the Best Tomatoes in Your Backyard</h2>
						<p className="text-gray-500 dark:text-gray-400">Gardening Weekly</p>
					</div>
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">
							The Rise of the Robots: How Automation Is Changing the Workplace
						</h2>
						<p className="text-gray-500 dark:text-gray-400">Tech Today</p>
					</div>
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">Breaking: Alien Life Discovered on Mars!</h2>
						<p className="text-gray-500 dark:text-gray-400">Space News</p>
					</div>
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">The Art of Sourdough: Mastering the Perfect Loaf</h2>
						<p className="text-gray-500 dark:text-gray-400">Food & Wine</p>
					</div>
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">
							Can Meditation Improve Your Mental Health? The Science Behind Mindfulness
						</h2>
						<p className="text-gray-500 dark:text-gray-400">Health & Wellness</p>
					</div>
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">
							The Future of Travel: Sustainable Tourism and Eco-Friendly Destinations
						</h2>
						<p className="text-gray-500 dark:text-gray-400">Wanderlust Magazine</p>
					</div>
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">
							The Power of Music: How Melodies Can Heal the Soul
						</h2>
						<p className="text-gray-500 dark:text-gray-400">Harmony Times</p>
					</div>
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">
							In the Spotlight: The Latest Fashion Trends from the Runway
						</h2>
						<p className="text-gray-500 dark:text-gray-400">Style & Vogue</p>
					</div>
				</div> */}
		</>
	);
}
