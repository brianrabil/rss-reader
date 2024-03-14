import { database } from "@/lib/database";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
	const articles = await database.article.findMany();

	return (
		<div className="flex flex-1 overflow-hidden">
			<main className="flex-1 overflow-auto container mx-auto p-8 flex flex-col gap-y-8 max-w-4xl">
				{articles.map((article) => (
					<Card key={article.guid} className="p-4 border-b dark:border-gray-800">
						<CardHeader>
							<CardTitle>{article.title}</CardTitle>
						</CardHeader>
						<CardContent>
							{!!article.imageUrl && (
								<img
									alt="Article Thumbnail"
									className="w-24 h-24 object-cover"
									height="100"
									src={article.imageUrl}
									style={{
										aspectRatio: "100/100",
										objectFit: "cover",
									}}
									width="100"
								/>
							)}
							<p className="mt-2">{article.content}</p>
						</CardContent>
						<CardFooter>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Published on January 16, 2024
							</p>
							<div className="gx-1 flex align-center">
								<Button variant="link">Save</Button>
								<Button variant="link">Share</Button>
							</div>
						</CardFooter>
					</Card>
				))}
			</main>
		</div>
	);
}
