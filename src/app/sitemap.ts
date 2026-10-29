import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  // Sections are anchors on a single page, not separate indexable routes.
  return [{ url: `${site.url}/` }];
}
