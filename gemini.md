# Project Constitution: The Law (gemini.md)

> [!IMPORTANT]
> This file is the source of truth for all schemas, invariants, rules, and system logs. Do not write any tool code until payload schemas are defined here and approved.

## 1. JSON Data Schemas
*Bilingual (English / Traditional Chinese) data structures for GitHub CMS (Local JSON Files) and Next.js frontend.*

### Input Schema (GitHub/Local JSON Repository Files)

All content data is stored in the `/content` folder of the repository as JSON files:

- `content/services.json`
- `content/celebrities.json`
- `content/caseStudies.json`
- `content/reviews.json`
- `content/team.json`
- `content/tours.json`

The JSON structure for each file conforms to:

```json
{
  "localeString": {
    "type": "object",
    "properties": {
      "en": { "type": "string" },
      "zh": { "type": "string" }
    },
    "required": ["en", "zh"]
  },
  "localeText": {
    "type": "object",
    "properties": {
      "en": { "type": "string" },
      "zh": { "type": "string" }
    },
    "required": ["en", "zh"]
  },
  "service": {
    "type": "object",
    "properties": {
      "_id": { "type": "string" },
      "title": { "$ref": "#/localeString" },
      "slug": {
        "type": "object",
        "properties": {
          "current": { "type": "string" }
        },
        "required": ["current"]
      },
      "description": { "$ref": "#/localeText" },
      "benefits": {
        "type": "array",
        "items": { "$ref": "#/localeString" }
      },
      "price": { "type": "number" },
      "duration": { "type": "string" },
      "imageRelativeUrl": { "type": "string" }
    },
    "required": ["_id", "title", "slug", "description", "benefits"]
  },
  "celebrity": {
    "type": "object",
    "properties": {
      "_id": { "type": "string" },
      "name": { "$ref": "#/localeString" },
      "role": { "$ref": "#/localeString" },
      "quote": { "$ref": "#/localeText" },
      "imageRelativeUrl": { "type": "string" }
    },
    "required": ["_id", "name", "role", "quote"]
  },
  "caseStudy": {
    "type": "object",
    "properties": {
      "_id": { "type": "string" },
      "title": { "$ref": "#/localeString" },
      "sessionsCount": { "type": "number" },
      "category": { "type": "string", "enum": ["4-session", "8-session", "maintenance"] },
      "imageRelativeUrl": { "type": "string" },
      "description": { "$ref": "#/localeText" }
    },
    "required": ["_id", "title", "sessionsCount", "category", "imageRelativeUrl"]
  },
  "clientReview": {
    "type": "object",
    "properties": {
      "_id": { "type": "string" },
      "clientName": { "type": "string" },
      "location": { "type": "string" },
      "rating": { "type": "number", "minimum": 1, "maximum": 5 },
      "reviewText": { "$ref": "#/localeText" }
    },
    "required": ["_id", "clientName", "location", "rating", "reviewText"]
  },
  "teamMember": {
    "type": "object",
    "properties": {
      "_id": { "type": "string" },
      "name": { "$ref": "#/localeString" },
      "role": { "$ref": "#/localeString" },
      "bio": { "$ref": "#/localeText" },
      "imageRelativeUrl": { "type": "string" }
    },
    "required": ["_id", "name", "role", "bio"]
  },
  "tourSchedule": {
    "type": "object",
    "properties": {
      "_id": { "type": "string" },
      "city": { "$ref": "#/localeString" },
      "dates": {
        "type": "array",
        "items": { "type": "string" }
      },
      "isActive": { "type": "boolean" }
    },
    "required": ["_id", "city", "dates", "isActive"]
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
- **Asset Management**: Store high-quality visual assets locally under `/public/images/` and optimize them using standard Next.js Image component.
- **Tone & Aesthetics**: Soft modern minimal style. Primary color `#C13825` (rich warm red), neutral `#494c53` (charcoal), white/off-white background.
- **Typography**: 
  - English: `Montserrat` (Sans-serif)
  - Chinese: `Noto Sans TC` (Traditional Chinese, lightweight sans-serif)

## 3. Architectural Invariants
- **Next.js Structure**: App Router under `src/app` using TypeScript and Tailwind CSS.
- **Internationalization (i18n)**: Subpath routing (e.g. `/zh` vs default `/` for English).
- **CMS Linkage**: GitHub CMS retrieving bilingual JSON documents from `/content/` locally or dynamically via raw GitHub content URL.
- **Image Optimization**: Default Next.js Image component optimization for local repository assets.

## 4. Maintenance Log
- **2026-06-22**: System initialized.
- **2026-06-22**: Updated with initial bilingual Sanity data schema and tech stack invariants.
- **2026-06-23**: Updated schemas to cover Celebrities, Case Studies, Reviews, Team, and Tours based on site structure input. Added typography advice (`Noto Sans TC` for Chinese, `Montserrat` for English) and colors (`#C13825` and `#494c53`).
- **2026-06-23**: Completed Next.js + Tailwind v4 frontend layout. Setup i18n routing, static translations, custom Cloudinary loader, and verified production build compilation.
- **2026-06-23**: Migrated content and asset hosting from Sanity.io and Cloudinary to GitHub/local JSON-based CMS and Next.js native local image optimization. Updated data fetches and layouts.
