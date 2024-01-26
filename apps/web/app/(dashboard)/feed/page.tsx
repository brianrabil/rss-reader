import Link from "next/link";
import { PrismaClient } from "database";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const prisma = new PrismaClient();
export default async function FeedPage() {
  // const subscriptions = await prisma.subscription.findMany({
  //   include: {
  //     articles: {
  //       include: {
  //         author: true,
  //       },
  //     },
  //     feed: true,
  //   },
  // })

  const articles = await prisma.article.findMany({});

  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 overflow-auto container mx-auto p-8 flex flex-col gap-y-8">
        {articles.map((article) => (
          <Card key={article.guid} className="p-4 border-b dark:border-gray-800">
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <img
                alt="Article Thumbnail"
                className="w-24 h-24 object-cover"
                height="100"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              /> */}
              <p className="mt-2">{article.content}</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Published on January 16, 2024
              </p>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}
