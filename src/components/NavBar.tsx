import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface NavBarProps {
  currentPage: string;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export default function NavBar({ currentPage, theme, onThemeToggle }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Diaries', href: '#diaries' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-headline text-2xl font-bold text-foreground hover:text-primary transition-colors"
        >
          Portfolio
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    href={item.label === 'About' ? '/' : item.href}
                    onClick={(e) => {
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }
                    }}
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
                    onClick={(e) => {
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
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
