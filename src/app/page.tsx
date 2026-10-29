import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { profile } from '@/data/profile';
import { site } from '@/data/site';
import { socials } from '@/data/socials';

const personId = `${site.url}/#person`;
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${site.url}/#profile-page`,
      url: `${site.url}/`,
      name: site.title,
      description: site.description,
      mainEntity: { '@id': personId },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: profile.name,
      jobTitle: profile.role,
      url: `${site.url}/`,
      description: profile.intro,
      address: { '@type': 'PostalAddress', addressLocality: 'Delhi', addressCountry: 'IN' },
      sameAs: socials.filter((social) => social.id === 'linkedin' || social.id === 'github').map((social) => social.href),
      knowsAbout: ['Frontend Engineering', 'React', 'Next.js', 'TypeScript', 'Full-Stack Development'],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <main id="main-content" tabIndex={-1} className="overflow-x-clip">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
