# Rohit Singh Rawat: Portfolio

Next.js (App Router), TypeScript, Tailwind CSS, React Three Fiber and Framer Motion.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values (see "Contact form")
npm run dev                  # http://localhost:3000
```

Other commands: `npm run build`, `npm start`, `npm run typecheck`.

## Where to change things

| I want to change...                   | Edit                                        |
| ------------------------------------- | ------------------------------------------- |
| Name, intro, about text, stats, email | `src/data/profile.ts`                       |
| Work history                          | `src/data/experience.ts`                    |
| Projects and their links              | `src/data/projects.ts`                      |
| Skills                                | `src/data/skills.ts`                        |
| LinkedIn, GitHub, X, email links      | `src/data/socials.ts`                       |
| Floating 3D tiles in the hero         | `src/data/techstack.ts`                     |
| Nav items                             | `src/data/navigation.ts`                    |
| Resume                                | Replace `public/resume.pdf` (same filename) |
| Colors (dark and light)               | `src/app/globals.css`                       |
| Fonts                                 | `src/app/layout.tsx`                        |
| Section layout and animation          | `src/components/sections/`                  |
| 3D scene                              | `src/components/three/TechScene.tsx`        |

Search the project for `TODO` and `example.com` to find the placeholder links.

## Folder structure

```
public/                 resume.pdf and static files
src/app/                layout, page, global CSS, /api/contact
src/components/
  layout/               Navbar, Footer, ThemeProvider, ThemeToggle
  sections/             Hero, About, Experience, Projects, Skills, Contact
  three/                3D scene, tile textures, no-WebGL fallback
  ui/                   Button, Container, Section, SectionHeading, SocialLinks
src/data/               All your content, one file per topic
src/hooks/              useIsMobile, useActiveSection, useWebGLSupport, ...
src/lib/                cn, animation easing, form validators
src/types/              Shared TypeScript types
```

## Contact form

The form posts to `src/app/api/contact/route.ts`, which sends email through [Resend](https://resend.com).

1. Create a free Resend account and an API key.
2. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in `.env.local` (and in your host's environment settings when you deploy).
3. `CONTACT_FROM_EMAIL` defaults to Resend's test sender. Verify your own domain in Resend to send from it.

Without `RESEND_API_KEY` the form shows a friendly error and points visitors to your email.
The route includes a honeypot field and a basic per-IP rate limit.

## Deploy

Push to GitHub and import the repo in Vercel. Add the three env vars from `.env.example`.

## Notes

- The 3D scene pauses when it scrolls out of view, lowers resolution on phones, and falls back to a plain list without WebGL.
- Reduced-motion users get a static scene, no intro animation and an instant theme switch.
- `public/resume.pdf` is publicly downloadable. Check what contact details it contains.
