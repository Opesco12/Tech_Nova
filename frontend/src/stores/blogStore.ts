import create from "zustand"

  const STRAPI_URL = "https://fruitful-appliance-ba347b6e40.strapiapp.com"
  // Use the Vite dev proxy in development to avoid CORS (config in vite.config.ts)
  const BASE_URL = import.meta.env.DEV ? '/strapi' : STRAPI_URL

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
      const url = `${BASE_URL}/api/blogs?fields=title,publishedAt,content,documentId&populate=coverImage`
      console.debug("blogStore.fetchAll: requesting", url)

      // Try a standard CORS fetch first
      let res: Response | null = null
      try {
        res = await fetch(url, { method: "GET", mode: "cors", cache: "no-store", headers: { Accept: "application/json" } })
        console.debug("blogStore.fetchAll: primary fetch response", res);
      } catch (err) {
        console.warn("blogStore.fetchAll: primary fetch failed", err)
      }

      // If primary fetch failed (network/CORS), attempt a public proxy as a diagnostic fallback
      if (!res || !res.ok) {
        // Avoid silently overwriting existing errors -- only try fallback when direct fetch fails
        // Fallback proxy removed for reliability — prefer fixing CORS or using the dev proxy.
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
      const identifier = String(id)

      // If identifier is a plain numeric id, use the direct endpoint.
      // Otherwise assume it's the `documentId` and query with a filter.
      let res: Response
      if (/^\d+$/.test(identifier)) {
        const safeId = encodeURIComponent(identifier)
        res = await fetch(`${BASE_URL}/api/blogs/${safeId}?populate=*`)
      } else {
        // Query by documentId field. Strapi returns an array in `data` when using filters.
        const q = `${BASE_URL}/api/blogs?filters[documentId][$eq]=${encodeURIComponent(identifier)}&populate=*`
        res = await fetch(q)
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()

      // Normalize to a single blog object whether the response was a single resource
      // or a list from a filtered query.
      let blog: any = null
      if (json.data) {
        if (Array.isArray(json.data)) blog = json.data[0] ?? null
        else blog = json.data
      } else {
        blog = json
      }

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
