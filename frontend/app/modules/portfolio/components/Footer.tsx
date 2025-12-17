import { Link, useOutletContext } from 'react-router';
import { Separator } from '@/modules/shared/ui/separator';
import { Link as LinkIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { AppContext } from '@/modules/shared/types';

export default function Footer() {
  const { socialLinks, siteName } = useOutletContext<AppContext>();
  const currentYear = new Date().getFullYear();

  const quickLinks: { label: string; href: string }[] = [
    { label: 'About', href: '/' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Diaries', href: '#diaries' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-muted py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-headline text-xl font-bold mb-4 text-foreground">
              {siteName}
            </h3>
            <p className="text-muted-foreground">
              Creative developer and designer crafting beautiful digital experiences.
            </p>
          </div>

          <div>
            <h3 className="font-headline text-xl font-bold mb-4 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-xl font-bold mb-4 text-foreground">
              Get In Touch
            </h3>
            <p className="text-muted-foreground mb-4">
              Have a project in mind? Let's work together.
            </p>
            <a
              href="#contact"
              className="text-primary hover:underline block mb-4"
            >
              Contact Me →
            </a>
            <a
              href="/feed.xml"
              className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 mb-6"
              title="RSS Feed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.429 2.571c0 1.893 1.536 3.429 3.429 3.429v1.714C3.536 7.714 1 5.178 1 2.571h2.429zM7.286 2.571c0 1.893 1.536 3.429 3.429 3.429v1.714c-3.322 0-6-2.678-6-6h2.571zM11.143 2.571c0 1.893 1.536 3.429 3.429 3.429v1.714c-3.322 0-6-2.678-6-6h2.571zM3.429 6.857c0 1.893 1.536 3.429 3.429 3.429v1.714C3.536 12 1 9.464 1 6.857h2.429zM7.286 6.857c0 1.893 1.536 3.429 3.429 3.429v1.714c-3.322 0-6-2.678-6-6h2.571zM11.143 6.857c0 1.893 1.536 3.429 3.429 3.429v1.714c-3.322 0-6-2.678-6-6h2.571z"/>
              </svg>
              RSS Feed
            </a>

            <div className="flex gap-4">
              {socialLinks.filter(link => link.is_active).map((link) => {
                // @ts-ignore
                const Icon = LucideIcons[link.icon] || LinkIcon;
                return (
                  <a
                    key={link.ID}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title={link.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground">
          <p>© {currentYear} {siteName}. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link to="/sitemap" className="hover:text-primary transition-colors">
              Sitemap
            </Link>
            <a href="/feed.xml" className="hover:text-primary transition-colors">
              RSS Feed
            </a>
            <a href="/sitemap.xml" className="hover:text-primary transition-colors">
              XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
