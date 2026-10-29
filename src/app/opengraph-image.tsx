import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';
import { site } from '@/data/site';

export const alt = site.previewAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#111210', padding: 32, color: '#f0ece5', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', border: '1px solid #393c34', borderRadius: 24, padding: '40px 44px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', color: '#74c69d', fontSize: 20, letterSpacing: 2, textTransform: 'uppercase' }}>{profile.role}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 16, background: '#74c69d', color: '#111210', fontWeight: 700, fontSize: 27 }}>RR</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 70, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
            <div style={{ display: 'flex', marginTop: 16, fontSize: 32, color: '#74c69d' }}>Frontend Engineering &amp; Full-Stack Development</div>
            <div style={{ display: 'flex', marginTop: 22, fontSize: 23, color: '#a8a098' }}>4+ years of professional frontend experience.</div>
            <div style={{ display: 'flex', marginTop: 8, fontSize: 23, color: '#a8a098' }}>SaaS products, web and mobile, and SkillConnect.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #393c34', paddingTop: 24 }}>
            <div style={{ display: 'flex', fontSize: 21 }}>React / Next.js / TypeScript</div>
            <div style={{ display: 'flex', fontSize: 19, color: '#a8a098' }}>{new URL(site.url).hostname}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
