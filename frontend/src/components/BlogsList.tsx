import { useEffect } from "react"
import useBlogStore from "../stores/blogStore"

export default function BlogsList() {
  const blogs = useBlogStore((s) => s.blogs)
  const loading = useBlogStore((s) => s.loading)
  const error = useBlogStore((s) => s.error)
  const fetchAll = useBlogStore((s) => s.fetchAll)

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const getTextFromContent = (content: any) => {
    if (!content || !Array.isArray(content)) return ""
    return (
      content
        .map((block: any) => block.children?.map((c: any) => c.text).join(" "))
        .join(" ")
        .substring(0, 150) + "..."
    )
  }

  const getImageSrc = (img: any) => {
    const STRAPI_URL = "https://fruitful-appliance-ba347b6e40.strapiapp.com"
    const url = img?.formats?.medium?.url ?? img?.url
    if (!url) return null
    return url.startsWith("http") ? url : STRAPI_URL + url
  }

  if (loading)
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto animate-pulse space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4 items-start p-4 bg-white rounded-md shadow-sm border border-gray-200">
              <div className="w-28 h-20 bg-gray-200 rounded" />
              <div className="flex-1 space-y-3 py-1">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  if (error) return <div className="p-8 text-center text-red-400">Error: {error}</div>
  if (!blogs || blogs.length === 0) return <div className="p-8 text-center">No posts found.</div>

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Branded banner matching landing page title style */}
        <div className="bg-black text-center rounded-md p-8 mb-6">
          <h1
            className="font-bold mb-2 hero-title"
            style={{
              fontSize: "40px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            TechNova Global
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto">A movement of young African innovators using technology and AI to solve real-world problems.</p>
        </div>
        <div className="space-y-6">
          {blogs.map((article: any) => (
            <article
              key={article.id}
              className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 p-4">
                {getImageSrc(article.coverImage) ? (
                  <div className="w-full sm:w-40 flex-shrink-0">
                    <img
                      className="w-full h-28 sm:h-24 object-cover rounded"
                      src={getImageSrc(article.coverImage) ?? undefined}
                      alt={article.title}
                    />
                  </div>
                ) : null}

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight">{article.title}</h3>
                  <div className="text-xs text-gray-500 mt-2 mb-3">
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ""}
                    {" \u2022 "}
                    {article.category ?? "Blog"}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{getTextFromContent(article.content)}</p>
                  <div className="mt-3">
                    <a href={`#/blogs/${article.documentId ?? article.id}`} className="text-yellow-600 hover:underline font-medium">Read more →</a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
