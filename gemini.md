# Project Constitution: The Law (gemini.md)

> [!IMPORTANT]
> This file is the source of truth for all schemas, invariants, rules, and system logs. Do not write any tool code until payload schemas are defined here and approved.

## 1. JSON Data Schemas
*Bilingual (English / Traditional Chinese) data structures for Sanity CMS and Next.js frontend.*

### Input Schema (Sanity CMS)

```json
{
  "localeString": {
    "type": "object",
    "fields": {
      "en": { "type": "string" },
      "zh": { "type": "string", "title": "Traditional Chinese" }
    }
  },
  "localeText": {
    "type": "object",
    "fields": {
      "en": { "type": "text" },
      "zh": { "type": "text", "title": "Traditional Chinese" }
    }
  },
  "service": {
    "type": "document",
    "fields": {
      "title": { "type": "localeString" },
      "slug": { "type": "slug" },
      "description": { "type": "localeText" },
      "benefits": {
        "type": "array",
        "of": [{ "type": "localeString" }]
      },
      "price": { "type": "number" },
      "duration": { "type": "string" },
      "image": { "type": "image" }
    }
  },
  "celebrityEndorsement": {
    "type": "document",
    "fields": {
      "name": { "type": "localeString" },
      "role": { "type": "localeString" },
      "quote": { "type": "localeText" },
      "image": { "type": "image" },
      "order": { "type": "number" }
    }
  },
  "caseStudy": {
    "type": "document",
    "fields": {
      "title": { "type": "localeString" },
      "sessionsCount": { "type": "number" },
      "category": { "type": "string", "options": ["4-session", "8-session", "maintenance"] },
      "beforeImage": { "type": "image" },
      "afterImage": { "type": "image" },
      "description": { "type": "localeText" },
      "order": { "type": "number" }
    }
  },
  "clientReview": {
    "type": "document",
    "fields": {
      "clientName": { "type": "string" },
      "location": { "type": "string" },
      "rating": { "type": "number", "validation": "min(1).max(5)" },
      "reviewText": { "type": "localeText" },
      "order": { "type": "number" }
    }
  },
  "teamMember": {
    "type": "document",
    "fields": {
      "name": { "type": "localeString" },
      "role": { "type": "localeString" },
      "bio": { "type": "localeText" },
      "image": { "type": "image" },
      "order": { "type": "number" }
    }
  },
  "tourSchedule": {
    "type": "document",
    "fields": {
      "city": { "type": "localeString" },
      "dates": {
        "type": "array",
        "of": [{ "type": "string" }]
      },
      "isActive": { "type": "boolean" },
      "order": { "type": "number" }
    }
  }
}
```

### Output Schema (Next.js Page Payloads)

```json
{
  "locale": "en | zh",
  "navigation": {
    "home": "string",
    "successStories": "string",
    "aboutUs": "string",
    "globalTour": "string",
    "contact": "string"
  },
  "homePage": {
    "hero": {
      "title": "string",
      "subtitle": "string",
      "description": "string"
    },
    "whatWeDo": {
      "heading": "string",
      "text": "string",
      "benefits": ["string"]
    },
    "celebrityTeaser": {
      "heading": "string",
      "text": "string",
      "ctaText": "string"
    },
    "howItWorks": {
      "heading": "string",
      "steps": [
        { "stepNumber": 1, "title": "string", "desc": "string" }
      ]
    },
    "ctaSection": {
      "text": "string",
      "buttonText": "string",
      "phoneNumber": "string"
    }
  }
}
```

## 2. Behavioral Rules
- **No Guessing**: Halt execution if logic is ambiguous or external requirements are unclear.
- **Self-Healing**: If a script in `tools/` fails, repair the script, test it, and update the corresponding SOP in `architecture/` before proceeding.
- **Data Integrity**: Validate all inputs and outputs against schemas defined in this document.
- **Bilingual Consistency**: Fall back gracefully to English if Traditional Chinese translations are empty.
- **Asset Offloading**: Use Cloudinary for all optimized image rendering.
- **Tone & Aesthetics**: Soft modern minimal style. Primary color `#C13825` (rich warm red), neutral `#494c53` (charcoal), white/off-white background.
- **Typography**: 
  - English: `Montserrat` (Sans-serif)
  - Chinese: `Noto Sans TC` (Traditional Chinese, lightweight sans-serif)

## 3. Architectural Invariants
- **Next.js Structure**: App Router under `src/app` using TypeScript and Tailwind CSS.
- **Internationalization (i18n)**: Subpath routing (e.g. `/zh` vs default `/` for English).
- **CMS Linkage**: Unified Sanity Client fetching from Sanity CDN.
- **Image Optimization**: Cloudinary loader for Next.js Image component to offload assets.

## 4. Maintenance Log
- **2026-06-22**: System initialized.
- **2026-06-22**: Updated with initial bilingual Sanity data schema and tech stack invariants.
- **2026-06-23**: Updated schemas to cover Celebrities, Case Studies, Reviews, Team, and Tours based on site structure input. Added typography advice (`Noto Sans TC` for Chinese, `Montserrat` for English) and colors (`#C13825` and `#494c53`).
- **2026-06-23**: Completed Next.js + Tailwind v4 frontend layout. Setup i18n routing, static translations, custom Cloudinary loader, and verified production build compilation.
