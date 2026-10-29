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
| Resume                                | Replace `public/Rohit_Rawat_Resume.pdf` |
| Colors (dark and light)               | `src/app/globals.css`                       |
| Fonts                                 | `src/app/layout.tsx`                        |
| Section layout and animation          | `src/components/sections/`                  |
| 3D scene                              | `src/components/three/TechScene.tsx`        |

Search the project for `TODO` and `example.com` to find the placeholder links.

## Folder structure

```
public/                 Rohit_Rawat_Resume.pdf and static files
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

## Resume download

The Hero button downloads `public/Rohit_Rawat_Resume.pdf` using the URL and download
filename in `src/data/profile.ts`. Replace that PDF when updating the resume and
keep the filename unchanged. If you rename it, update both the profile data and
`next.config.ts`.

The PDF response uses `Cache-Control: no-store` and an attachment header with the
correct filename. The former `/resume.pdf` URL temporarily redirects to the latest
asset, preserving old links without permanently caching the redirect. The new PDF
filename also separates it from the previously published asset.

Include the replacement PDF in the deployment. After deployment, manually check
the download and its response headers on the production URL; local source changes
do not update the already deployed file.

## Contact form

The form posts to `src/app/api/contact/route.ts`, which sends email through [Resend](https://resend.com).

1. Create a free Resend account and an API key.
2. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in `.env.local` (and in your host's environment settings when you deploy).
3. `CONTACT_FROM_EMAIL` defaults to Resend's test sender. Verify your own domain in Resend to send from it.

Without `RESEND_API_KEY` the form shows a friendly error and points visitors to your email.
The route includes a honeypot field and a basic per-IP rate limit.

## Metadata and sharing

Public SEO content and the stable production URL live in `src/data/site.ts`.
The root layout defines the title, description, canonical URL, Open Graph and
Twitter card metadata. `src/app/opengraph-image.tsx` generates a branded sharing
image with Next.js ImageResponse, without remote images or extra dependencies.
`icon.svg` and `apple-icon.tsx` provide browser and mobile bookmark icons.

The home page includes escaped ProfilePage/Person JSON-LD based on the visible
profile and public GitHub/LinkedIn links. `robots.ts` advertises the sitemap and
excludes API paths; `sitemap.ts` lists the canonical home page. If the production
domain changes, update `site.url` and redeploy. Sharing previews and crawler
responses still need to be checked on the deployed site.

## Deploy

Push to GitHub and import the repo in Vercel. Add the three env vars from `.env.example`.

## Notes

- The 3D scene pauses when it scrolls out of view, lowers resolution on phones, and falls back to a plain list without WebGL.
- Reduced-motion users get a static scene, no intro animation and an instant theme switch.
- `public/Rohit_Rawat_Resume.pdf` is publicly downloadable. Check what contact details it contains.
