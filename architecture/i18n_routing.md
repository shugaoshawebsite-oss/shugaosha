# Next.js i18n Routing Standard Operating Procedure (SOP)

## Goal
Implement routing and language negotiation for English (main) and Traditional Chinese (zh).

## Routing Pattern
- Default Locale: English (`en`) routed at `/` (or `/en` if preferred, but `/` is cleanest for default).
- Chinese Locale: Traditional Chinese (`zh`) routed at `/zh`.
- File structure:
  - `src/app/[locale]/layout.tsx` -> Root layout wraps all localized pages.
  - `src/app/[locale]/page.tsx` -> Home Page.
  - `src/app/[locale]/success-stories/page.tsx` -> Success Stories Page.
  - `src/app/[locale]/about/page.tsx` -> About Us Page.
  - `src/app/[locale]/news-tours/page.tsx` -> News & Tours Page.
  - `src/app/[locale]/contact/page.tsx` -> Contact Page.

## Middleware Redirection
- We will implement a `src/middleware.ts` to inspect requests.
- If the path has no locale prefix (e.g. `/about`), we default to `en` or redirect based on headers. To keep it simple and robust, we can support `/` as English, and `/zh` as Chinese.
- Supported locales: `['en', 'zh']`.

## Dictionaries
- Non-dynamic text (e.g., footer, nav links, button text) is stored in static JSON dictionaries:
  - `src/dictionaries/en.json`
  - `src/dictionaries/zh.json`
- A utility helper `getDictionary(locale)` returns the correct translations for static UI elements.
