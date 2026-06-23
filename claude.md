# Project Constitution & Map

## 1. Project Overview
A bilingual (English / Traditional Chinese) web application for **Shugaosha (修顏社)**, a beauty service company specializing in Japanese face slimming realignment.

- **Status**: Development Completed (Local Build Verified)
- **Current Objective**: Awaiting GitHub push and Vercel deployment.
- **Tech Stack**: Next.js App Router, Tailwind CSS v4, Sanity.io CMS, Cloudinary, TypeScript.

## 2. Behavioral Rules
- Follow the B.L.A.S.T. protocol strictly.
- Prioritize reliability over speed.
- Never guess at business logic.
- Follow the Data-First Rule: Define schemas in `gemini.md` before coding.
- Fall back gracefully to English if Chinese translations are missing.
- Load all optimized media assets from Cloudinary.

## 3. Architectural Invariants
- 3-Layer Build structure:
  - Layer 1: `architecture/` - SOPs (Markdown)
    - [sanity_schema.md](file:///Users/rmac/AntiGravity/shugaosha/architecture/sanity_schema.md)
    - [i18n_routing.md](file:///Users/rmac/AntiGravity/shugaosha/architecture/i18n_routing.md)
    - [cloudinary_images.md](file:///Users/rmac/AntiGravity/shugaosha/architecture/cloudinary_images.md)
  - Layer 2: Navigation - Next.js dynamic routing (`/[locale]/`) and middleware redirection.
  - Layer 3: `tools/` - Verification handshake scripts:
    - [verify_sanity.py](file:///Users/rmac/AntiGravity/shugaosha/tools/verify_sanity.py)
    - [verify_cloudinary.py](file:///Users/rmac/AntiGravity/shugaosha/tools/verify_cloudinary.py)
- All temporary workbench files reside in `.tmp/`.
- Credentials reside in `.env`.
