import create from "zustand"

const STRAPI_URL = "https://fruitful-appliance-ba347b6e40.strapiapp.com"

type ContentBlock = { type: string; children?: Array<{ text: string }> }

export type Blog = {
  id: number | string
  title: string
  content?: ContentBlock[]
  coverImage?: any
  publishedAt?: string
}

type BlogState = {
  blogs: Blog[] | null
  loading: boolean
  error: string | null
  fetchAll: () => Promise<void>
  fetchById: (id: string | number) => Promise<Blog | null>
}

export const useBlogStore = create<BlogState>((set, get) => ({
  blogs: null,
  loading: false,
  error: null,

  fetchAll: async () => {
    // If already loaded, skip
    if (get().blogs) return
    set({ loading: true, error: null })
    try {
      // Fetch necessary fields for the list: title, publishedAt, and content (excerpt),
      // and populate coverImage (thumbnail if present). This keeps the payload small
      // while allowing the UI to show descriptions.
      const url = `${STRAPI_URL}/api/blogs?fields=title,publishedAt,content&populate=coverImage`
      console.debug("blogStore.fetchAll: requesting", url)

      // Try a standard CORS fetch first
      let res: Response | null = null
      try {
        res = await fetch(url, { method: "GET", mode: "cors", cache: "no-store", headers: { Accept: "application/json" } })
      } catch (err) {
        console.warn("blogStore.fetchAll: primary fetch failed", err)
      }

      // If primary fetch failed (network/CORS), attempt a public proxy as a diagnostic fallback
      if (!res || !res.ok) {
        // Avoid silently overwriting existing errors -- only try fallback when direct fetch fails
        const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
        console.debug("blogStore.fetchAll: attempting fallback proxy", proxy)
        try {
          res = await fetch(proxy, { method: "GET", cache: "no-store", headers: { Accept: "application/json" } })
        } catch (err) {
          console.warn("blogStore.fetchAll: fallback fetch failed", err)
        }
      }

      if (!res) throw new Error("No response from fetch (possible network/CORS error)")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const json = await res.json()
      // When using the proxy, the shape may already be the `data` object or raw JSON from Strapi
      const data = json.data ?? json
      set({ blogs: data || [], loading: false })
      return
    } catch (err: any) {
      console.error("blogStore.fetchAll error", err)
      set({ error: String(err?.message || err), loading: false, blogs: [] })
    }
  },

  fetchById: async (id) => {
    set({ loading: true, error: null })
    try {
      const safeId = encodeURIComponent(String(id))
      const res = await fetch(`${STRAPI_URL}/api/blogs/${safeId}?populate=*`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      const blog = json.data || null
      // Optionally merge into cached list
      const list = get().blogs ?? []
      if (blog) {
        const exists = list.find((b) => String(b.id) === String(blog.id))
        if (!exists) set({ blogs: [...list, blog] })
      }
      set({ loading: false })
      return blog
    } catch (err: any) {
      console.error("blogStore.fetchById error", err)
      set({ error: String(err?.message || err), loading: false })
      return null
    }
  },
}))

export default useBlogStore
