import { useEffect } from 'react'

export function useSEO({ title, description, url }) {
  useEffect(() => {
    document.title = title

    const set = (sel, attr, val) => {
      const el = document.querySelector(sel)
      if (el) el.setAttribute(attr, val)
    }

    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', title)
    set('meta[property="og:description"]', 'content', description)

    if (url) {
      set('meta[property="og:url"]', 'content', url)
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) canonical.setAttribute('href', url)
    }
  }, [title, description, url])
}
