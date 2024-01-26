import { prisma } from "./../../../lib/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./../../../components/ui/card";
import { Button } from "./../../../components/ui/button";
import { Input } from "./../../../components/ui/input";
import { TypographyH1, TypographyP } from "../../../components/typography";
import { Carousel, CarouselContent, CarouselItem } from "./../../../components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./../../../components/ui/pagination";

export default async function DiscoverPage() {
  const feeds = await prisma.feed.findMany({
    orderBy: {
      title: "asc",
    },
    take: 50,
  });

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
                  )}{" "}
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
                <Button variant="outline">Subscribe</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center my-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious size="md" href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="md" href="#">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext size="md" href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
