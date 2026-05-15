import { useState, useEffect } from 'react'
import { TRANSLATIONS } from '../data/translations'

export function useLanguage() {
  const [lang, setLang] = useState(
    localStorage.getItem('lang') || 'en'
  )

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const t = TRANSLATIONS[lang]

  return { lang, setLang, t }
}