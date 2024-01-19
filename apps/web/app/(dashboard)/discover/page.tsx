import { PrismaClient } from 'database'

const prisma = new PrismaClient()

export default async function DiscoverPage() {
  const feeds = await prisma.feed.findMany({
    orderBy: {
      title: 'asc',
    },
    take: 50,
  })

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
            Discover RSS Feeds
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Search and subscribe to your favorite RSS feeds from one place.
          </p>
          <div className="w-full max-w-md">
            <input placeholder="Search for RSS feeds..." type="search" />
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-3">
          {feeds.map((feed) => (
            <div key={feed.id} className="relative group">
              <div className="bg-white p-4 dark:bg-gray-900">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {!!feed.favicon && (
                      <img alt={`${feed.title} favicon`} src={feed.favicon} className="h-5 w-5" />
                    )}
                    <h3 className="font-semibold text-lg md:text-xl text-gray-900 dark:text-gray-100">
                      {feed.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feed.description || 'No description available.'}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-300 mt-2">
                  Feed URL: {feed.url}
                </p>
                <button className="mt-4 px-3 py-2 border-gray-600 border dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md">
                  Subscribe
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="border px-3 py2 medium border-gray-400 dark:border-gray-800">
            Load More
          </button>
        </div>
      </div>
    </section>
  )
}

function ComputerIcon(props) {
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
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h2" />
      <path d="M12 18h6" />
    </svg>
  )
}

function GoalIcon(props) {
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
      <path d="M12 13V2l8 4-8 4" />
      <path d="M20.55 10.23A9 9 0 1 1 8 4.94" />
      <path d="M8 10a5 5 0 1 0 8.9 2.02" />
    </svg>
  )
}

function NewspaperIcon(props) {
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
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  )
}
