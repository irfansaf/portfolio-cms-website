import { Link } from 'react-router';
import { Separator } from '@/modules/shared/ui/separator';

export default function Footer() {
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
              Portfolio
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
              className="text-primary hover:underline"
            >
              Contact Me →
            </a>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="text-center text-muted-foreground">
          <p>© {currentYear} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
