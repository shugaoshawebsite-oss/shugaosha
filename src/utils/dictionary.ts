import en from '../dictionaries/en.json'
import zh from '../dictionaries/zh.json'

const dictionaries = {
  en,
  zh,
}

export type Dictionary = typeof en

export const getDictionary = (locale: 'en' | 'zh'): Dictionary => {
  return dictionaries[locale] || dictionaries.en
}
