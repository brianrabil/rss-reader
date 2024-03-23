import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import cn from "clsx";
import { Input } from "@/components/ui/input";
import { TypographyH1, TypographyP } from "@/components/typography";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { subscribeFeed } from "@/lib/actions";
import { prisma } from "@/lib/database";

export default async function DiscoverPage({ searchParams }) {
	const session = await auth();
	const userId = session?.user?.id;

	const { page = 1, limit = 10 } = searchParams;

	const skip = (parseInt(page) - 1) * parseInt(limit);
	const take = parseInt(limit);

	const totalCount = await prisma.feed.count();
	const feeds = await prisma.feed.findMany({
		take,
		skip,
		orderBy: {
			title: "asc",
		},
	});

	const totalPages = Math.ceil(totalCount / take);

	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container px-4 md:px-6 mx-auto">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<TypographyH1 className="">Discover RSS Feeds</TypographyH1>
					<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
						Search and subscribe to your favorite RSS feeds from one place.
					</p>
					<div className="w-full max-w-md">
						<Input placeholder="Search for RSS feeds..." type="search" />
					</div>
				</div>
				<div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-3">
					{feeds.map((feed) => (
						<Card key={feed.id} className="relative group">
							<CardHeader>
								<CardTitle className="flex items-center gap-x-2">
									{!!feed.favicon && (
										<img alt={`${feed.title} favicon`} src={feed.favicon} className="h-5 w-5" />
									)}
									{feed.title}
								</CardTitle>
								<CardDescription>
									<p className="text-xs text-gray-400 dark:text-gray-300 mt-2">{feed.url}</p>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<TypographyP>{feed.description}</TypographyP>
							</CardContent>
							<CardFooter>
								<form action={subscribeFeed}>
									<input type="hidden" name="feedId" value={feed.id} />
									<Button variant="outline" type="submit">
										Subscribe
									</Button>
								</form>
							</CardFooter>
						</Card>
					))}
				</div>
				<div className="flex justify-center my-8">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									className={cn(
										page <= 1 ? "text-gray-500 pointer-events-none cursor-not-allowed" : undefined
									)}
									href={`/explore?page=${page - 1}&limit=${limit}`}
								/>
							</PaginationItem>
							{Array.from({ length: totalPages }).map((_, index) => (
								<PaginationItem key={index}>
									<PaginationLink size="icon" href={`/explore?page=${index + 1}&limit=${limit}`}>
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem>
								<PaginationNext
									className={cn(
										page >= totalPages
											? "text-gray-500 pointer-events-none cursor-not-allowed"
											: undefined
									)}
									href={`/explore?page=${page + 1}&limit=${limit}`}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</section>
	);
}
