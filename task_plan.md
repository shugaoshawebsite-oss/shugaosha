# Project Task Plan (task_plan.md)

## Phase 1: Blueprint (Vision & Logic)
- [x] Ask 5 Discovery Questions to the user
- [x] Gather initial requirements (Next.js, Tailwind, Sanity.io, Cloudinary, Vercel, GitHub)
- [x] Define initial data schema in `gemini.md`
- [x] Receive site structure from user
- [x] Receive color & font guidelines from user
- [x] Finalize and approve the Blueprint

## Phase 2: Link (Connectivity)
- [ ] Scaffold Next.js application (using TypeScript and Tailwind CSS)
- [ ] Setup Sanity Studio config and schemas
- [ ] Configure Cloudinary for media asset management
- [ ] Establish environment variables in `.env` and verify connectivity (handshake scripts)
- [ ] Link local workspace to GitHub repository

## Phase 3: Architect (3-Layer Build)
- [ ] Write SOPs in `architecture/` for i18n, Sanity fetching, and Cloudinary image rendering
- [ ] Build Sanity schema files (Locale fields, Services, Contact, Pages)
- [ ] Develop Next.js i18n routing logic and components
- [ ] Assemble Next.js frontend pages (Home, Services, Contact, etc.)
- [ ] Test client fetches and validation against schemas in `gemini.md`

## Phase 4: Stylize (Refinement & UI)
- [ ] Implement color scheme, typography, and spacing from guidelines (Soft Modern Minimal)
- [ ] Apply premium transitions, animations, and responsive layouts
- [ ] Conduct visual quality checks and solicit user feedback

## Phase 5: Trigger (Deployment)
- [ ] Push clean codebase to GitHub repository
- [ ] Deploy Next.js frontend to Vercel
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set up triggers/hooks for Sanity content changes if necessary
- [ ] Finalize Maintenance Log in `gemini.md`
