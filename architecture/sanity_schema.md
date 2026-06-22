# Sanity Schema Standard Operating Procedure (SOP)

## Goal
Define the structure and bilingual patterns for Sanity.io CMS schemas.

## Schema Types

### 1. Bilingual Core Fields (Field-Level Translation)
To maintain identical structure across languages and prevent data drift, we use field-level localization:
- `localeString`: An object containing `en` (English) and `zh` (Traditional Chinese) strings.
- `localeText`: An object containing `en` (English) and `zh` (Traditional Chinese) block text/paragraphs.

### 2. Document Schemas
We will implement the following documents under Sanity Studio:
- `service`: Details for each treatment (title, price, duration, image, benefits).
- `celebrityEndorsement`: Endorsements from HK & international celebrities.
- `caseStudy`: Before & after photo progression journeys (4-session, 8-session, maintenance).
- `clientReview`: Traditional Google / everyday client reviews.
- `teamMember`: Bio and roles of founders Teresa & Charles.
- `tourSchedule`: Travel schedules for global tours.

## Rules & Invariants
- Default language is `en`. If `zh` is empty, fall back gracefully to `en`.
- Images are stored using Sanity's asset pipeline or Cloudinary integration. Cloudinary handles optimized public URLs.
- Always use the `order` field (integer) for custom sorting in the query layer.
