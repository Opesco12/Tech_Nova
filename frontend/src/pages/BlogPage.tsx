import { useEffect, useState } from "react"
import useBlogStore from "../stores/blogStore"
import BlogFooter from "../components/BlogFooter"

function estimateReadTime(content: any) {
  if (!content) return "1 min read"
  const text = Array.isArray(content)
    ? content.map((b: any) => b.children?.map((c: any) => c.text).join(" ") || "").join(" ")
    : String(content)
  const words = text.trim().split(/\s+/).length || 0
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

export default function BlogPage({ id }: { id: string }) {
  const fetchById = useBlogStore((s) => s.fetchById)
  const [post, setPost] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      // sanitize id: prefer numeric part if present
      const match = String(id || "").match(/\d+/)
      const pid = match ? match[0] : String(id || "").trim()
      if (!pid) {
        if (mounted) {
          setPost(null)
          setLoading(false)
        }
        return
      }

      const p = await fetchById(pid)
      if (mounted) {
        setPost(p)
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [id, fetchById])

  if (loading) return <div className="p-8 pt-24">Loading post…</div>
  if (!post) return <div className="p-8 pt-24">Post not found.</div>

  const b = post
  const getImageUrl = () => {
    return b.coverImage?.formats?.large?.url ?? b.coverImage?.url ?? null
  }

  return (
    <>
      <article className="max-w-3xl mx-auto p-6 pt-24">
        <a href="#/" className="text-sm read-more hover:underline">← Back</a>
        <h1 className="text-4xl font-bold mt-4 mb-2 blog-title">{b.title}</h1>
        <div className="text-sm blog-meta mb-6">{b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : ''} • {estimateReadTime(b.content)}</div>
        {getImageUrl() && <img loading="lazy" src={getImageUrl()} alt={b.title} className="w-full mt-4 rounded blog-hero" />}
        <div className="mt-8 prose max-w-none">
          {Array.isArray(b.content) ? b.content.map((block: any, idx: number) => {
            if (block.type === 'paragraph') {
              const text = block.children?.map((c: any) => c.text).join('') ?? ''
              return <p key={idx}>{text}</p>
            }
            return <div key={idx}>{JSON.stringify(block)}</div>
          }) : <p>{String(b.content)}</p>}
        </div>
      </article>
      <BlogFooter />
    </>
  )
}
