import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Button } from '@/modules/shared/ui/button';
import { Switch } from '@/modules/shared/ui/switch';
import { Label } from '@/modules/shared/ui/label';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/modules/shared/ui/navigation-menu';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface NavBarProps {
  siteName: string;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export default function NavBar({ siteName, theme, onThemeToggle }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems: { label: string; href: string }[] = [
    { label: 'About', href: '/#about' },
    { label: siteName, href: '/portfolio' }, // Also update link label? Maybe keep "Portfolio" as section name.
    { label: 'Diaries', href: '/diaries' },
    { label: 'Resume', href: '/#resume' },
    { label: 'Contact', href: '/#contact' },
  ];
  // Keeping "Portfolio" in menu items for now as it refers to the section/page.
  // Only updating the Logo/Brand name.

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    setMobileMenuOpen(false);
    
    // Check if it's a hash link (either starts with # or /#)
    const isHashLink = href.startsWith('#') || href.startsWith('/#');
    
    if (isHashLink) {
      // Clean up the href to get just the selector
      const selector = href.startsWith('/') ? href.substring(1) : href;
      
      // If we are already on the home page, smooth scroll
      if (location.pathname === '/') {
        if (e) e.preventDefault();
        const element = document.querySelector(selector);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // If we are not on home page, let the default navigation happen (to /#section)
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-headline text-2xl font-bold text-foreground hover:text-primary transition-colors"
        >
          {siteName}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    href={item.label === 'About' ? '/' : item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="px-4 py-2 text-foreground hover:text-primary transition-colors cursor-pointer font-normal"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
            <Label htmlFor="theme-toggle" className="sr-only">
              Toggle theme
            </Label>
            {theme === 'light' ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
            <Switch
              id="theme-toggle"
              checked={theme === 'dark'}
              onCheckedChange={onThemeToggle}
            />
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <div className="flex items-center gap-2">
            {theme === 'light' ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={onThemeToggle}
            />
          </div>
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-transparent text-foreground hover:bg-muted p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex flex-col w-full p-4 gap-2">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.label} className="w-full">
                  <NavigationMenuLink
                    href={item.label === 'About' ? '/' : item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="block px-4 py-3 text-foreground hover:bg-muted rounded-md transition-colors cursor-pointer font-normal"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </header>
  );
}
