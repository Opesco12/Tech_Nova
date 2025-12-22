import { useEffect, useState } from "react"
import useBlogStore from "../stores/blogStore"

export default function BlogDetail({ id }: { id: string }) {
  const fetchById = useBlogStore((s) => s.fetchById)
  const [post, setPost] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      const p = await fetchById(id)
      if (mounted) {
        setPost(p)
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [id, fetchById])

  if (loading) return <div className="p-8">Loading post…</div>
  if (!post) return <div className="p-8">Post not found.</div>

  const b = post
  const getImageUrl = () => {
    return b.coverImage?.formats?.large?.url ?? b.coverImage?.url ?? null
  }

  return (
    <article className="max-w-3xl mx-auto p-8">
      <a href="#/" className="text-sm text-blue-400 hover:underline">← Back</a>
      <h1 className="text-4xl font-bold mt-4">{b.title}</h1>
      {getImageUrl() && <img src={getImageUrl()} alt={b.title} className="w-full mt-6 rounded" />}
      <div className="mt-6 prose max-w-none">
        {Array.isArray(b.content) ? b.content.map((block: any, idx: number) => {
          if (block.type === 'paragraph') {
            const text = block.children?.map((c: any) => c.text).join('') ?? ''
            return <p key={idx}>{text}</p>
          }
          return <div key={idx}>{JSON.stringify(block)}</div>
        }) : <p>{String(b.content)}</p>}
      </div>
    </article>
  )
}
