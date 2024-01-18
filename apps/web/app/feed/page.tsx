import Link from 'next/link'

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

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-72 border-r overflow-auto dark:border-gray-800">
        <nav className="p-4 space-y-2">
          <Link
            id={`subscription-all-feeds`}
            className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50"
            href={`/feeds`}
          >
            <img alt="All Feeds Icon" className="w-5 h-5" src="/placeholder.svg" />
            All Feeds
          </Link>
          {/* {subscriptions.map(({ id, feed }) => (
            <Link
              key={id}
              className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-50"
              href={`/feed/${id}`}
            >
              {!!feed.favicon && (
                <img alt={`${feed.title} Icon`} className="w-5 h-5" src={feed.favicon} />
              )}
              {feed.title}
            </Link>
          ))} */}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <article className="p-4 border-b dark:border-gray-800">
          <div className="flex gap-4">
            <img
              alt="Article Thumbnail"
              className="w-24 h-24 object-cover"
              height="100"
              src="/placeholder.svg"
              style={{
                aspectRatio: '100/100',
                objectFit: 'cover',
              }}
              width="100"
            />
            <div>
              <h2 className="text-lg font-semibold">Article Title</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Published on January 16, 2024
              </p>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque egestas
                velit, non sollicitudin mauris. Nullam ut fermentum nunc...
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {/* <Button size="sm" variant="outline">
                Read More
              </Button>
              <Button size="sm" variant="ghost">
                Mark as Read
              </Button> */}
          </div>
        </article>
        <article className="p-4 border-b dark:border-gray-800">
          <div className="flex gap-4">
            <img
              alt="Article Thumbnail"
              className="w-24 h-24 object-cover"
              height="100"
              src="/placeholder.svg"
              style={{
                aspectRatio: '100/100',
                objectFit: 'cover',
              }}
              width="100"
            />
            <div>
              <h2 className="text-lg font-semibold">Article Title</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Published on January 15, 2024
              </p>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque egestas
                velit, non sollicitudin mauris. Nullam ut fermentum nunc...
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {/* <Button size="sm" variant="outline">
                Read More
              </Button>
              <Button size="sm" variant="ghost">
                Mark as Read
              </Button> */}
          </div>
        </article>
      </main>
    </div>
  )
}
