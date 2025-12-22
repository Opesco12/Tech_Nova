import { useEffect } from "react"
import BlogFooter from "../components/BlogFooter"
import useBlogStore from "../stores/blogStore"

function estimateReadTime(content: any) {
  if (!content) return "1 min read"
  const text = Array.isArray(content)
    ? content.map((b: any) => b.children?.map((c: any) => c.text).join(" ") || "").join(" ")
    : String(content)
  const words = text.trim().split(/\s+/).length || 0
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

function getTextFromContent(content: any) {
  if (!content || !Array.isArray(content)) return ""
  return (
    content
      .map((block: any) => block.children?.map((c: any) => c.text).join(" "))
      .join(" ")
      .substring(0, 150) + "..."
  )
}

function getImageSrc(img: any) {
  const STRAPI_URL = "https://fruitful-appliance-ba347b6e40.strapiapp.com"
  const url = img?.formats?.thumbnail?.url ?? img?.formats?.medium?.url ?? img?.url
  if (!url) return null
  return url.startsWith("http") ? url : STRAPI_URL + url
}

export default function BlogsPage() {
  const blogs = useBlogStore((s) => s.blogs)
  const loading = useBlogStore((s) => s.loading)
  const error = useBlogStore((s) => s.error)
  const fetchAll = useBlogStore((s) => s.fetchAll)

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  if (loading)
    return (
      <div className="p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-6 items-start p-6 blog-card">
                <div className="w-44 h-28 bg-gray-200 rounded" />
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )

  if (error) return <div className="p-8 text-center text-red-400">Error: {error}</div>
  if (!blogs || blogs.length === 0) return <div className="p-8 text-center">No posts found.</div>

  const sorted = [...blogs].sort((a: any, b: any) => {
    const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return tb - ta
  })

  const hero = sorted[0]
  const cards = sorted.slice(0, 6)
  const latest = sorted.slice(0, 3)

  return (
    <>
      <section className="py-12 bg-gray-50 min-h-screen pt-24">
        <div className="max-w-6xl mx-auto px-4">
          {/* Top big hero */}
          {hero && (
            <div className="relative rounded-2xl overflow-hidden mb-12 top-hero">
              {getImageSrc(hero.coverImage) ? (
                <img
                  loading="lazy"
                  src={getImageSrc(hero.coverImage) ?? undefined}
                  alt={hero.title}
                  className="w-full h-64 sm:h-96 object-cover"
                />
              ) : (
                <div className="w-full h-64 sm:h-96 bg-gray-200" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent flex items-end p-8">
                <div className="text-white">
                  <div className="mb-2">
                    <span className="inline-block bg-white/10 text-white text-sm px-3 py-1 rounded-full">Blog</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white/90 font-bold leading-tight">{hero.title}</h1>
                  <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/90">{getTextFromContent(hero.content)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Cards grid */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Explore articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((article: any) => (
                <a key={article.id} href={`#/blogs/${article.documentId ?? article.id}`} className="block blog-card overflow-hidden">
                  <div className="relative h-44 sm:h-48">
                    {getImageSrc(article.coverImage) ? (
                      <img loading="lazy" src={getImageSrc(article.coverImage) ?? undefined} alt={article.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent p-4 flex items-end">
                      <div>
                        <h3 className="text-white text-lg font-semibold leading-tight">{article.title}</h3>
                        <div className="text-xs text-white/80 mt-1">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''} • {estimateReadTime(article.content)}</div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Latest horizontal scroller */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Latest</h2>
              <a href="#/blogs" className="text-sm text-muted-foreground">Browse all articles</a>
            </div>

            <div className="horizontal-scroll">
              <div className="w-full">
                <div className="flex gap-6">
                  {latest.map((article: any) => (
                    <a
                      key={article.id}
                      href={`#/blogs/${article.documentId ?? article.id}`}
                      className="latest-card w-[720px] sm:w-[820px] flex-shrink-0 snap-center blog-card overflow-hidden"
                    >
                      <div className="relative h-44">
                        {getImageSrc(article.coverImage) ? (
                          <img
                            loading="lazy"
                            src={getImageSrc(article.coverImage) ?? undefined}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100" />
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-1">{article.title}</h3>
                        <div className="text-sm blog-meta">
                          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''} • {estimateReadTime(article.content)}
                        </div>
                        <p className="mt-3 text-sm text-gray-700">{getTextFromContent(article.content)}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BlogFooter />
    </>
  )
}
