# Style Guide

## Overview

This style guide documents the design system for the Portfolio CMS & Personal Website project. The project uses **Tailwind CSS v4** with a custom theme configuration, **Shadcn/ui** components, and **Framer Motion** for animations. The design system supports both light and dark themes with a comprehensive color palette, typography system, and component patterns.

### Design Philosophy

- **Modern & Clean**: Minimalist design with focus on content
- **Accessible**: WCAG-compliant color contrasts and semantic HTML
- **Responsive**: Mobile-first approach with breakpoints
- **Consistent**: Unified spacing, typography, and component patterns
- **Performant**: Optimized animations and transitions

---

## Color Palette

The color system uses HSL (Hue, Saturation, Lightness) values with CSS custom properties for theme support. All colors are defined in `app/app.css` and support both light and dark modes.

### Primary Colors

| Color | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| **Primary** | `hsl(142, 76%, 36%)` | `hsl(142, 76%, 36%)` | Main brand color, buttons, links, accents |
| **Primary Foreground** | `hsl(0, 0%, 100%)` | `hsl(0, 0%, 100%)` | Text on primary backgrounds |

**Primary Color Details:**
- **Hex (Light/Dark)**: `#22c55e` (Green-500 equivalent)
- **RGB**: `rgb(34, 197, 94)`
- **Usage**: CTAs, active states, highlights, icons, badges

### Semantic Colors

#### Background & Foreground

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--background` | `hsl(0, 0%, 100%)` | `hsl(240, 10%, 3.9%)` | Main page background |
| `--foreground` | `hsl(240, 10%, 3.9%)` | `hsl(0, 0%, 98%)` | Primary text color |

#### Card Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--card` | `hsl(0, 0%, 100%)` | `hsl(240, 10%, 7%)` | Card backgrounds |
| `--card-foreground` | `hsl(240, 10%, 3.9%)` | `hsl(0, 0%, 98%)` | Text on cards |

#### Secondary Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--secondary` | `hsl(240, 4.8%, 95.9%)` | `hsl(240, 3.7%, 15.9%)` | Secondary backgrounds |
| `--secondary-foreground` | `hsl(240, 5.9%, 10%)` | `hsl(0, 0%, 98%)` | Text on secondary backgrounds |

#### Muted Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--muted` | `hsl(240, 4.8%, 95.9%)` | `hsl(240, 3.7%, 15.9%)` | Muted backgrounds, badges |
| `--muted-foreground` | `hsl(240, 3.8%, 46.1%)` | `hsl(240, 5%, 64.9%)` | Secondary text, descriptions |

#### Accent Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--accent` | `hsl(240, 4.8%, 95.9%)` | `hsl(240, 3.7%, 15.9%)` | Hover states, interactive elements |
| `--accent-foreground` | `hsl(240, 5.9%, 10%)` | `hsl(0, 0%, 98%)` | Text on accent backgrounds |

#### Destructive Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--destructive` | `hsl(0, 84.2%, 60.2%)` | `hsl(0, 62.8%, 30.6%)` | Error states, delete actions |
| `--destructive-foreground` | `hsl(0, 0%, 98%)` | `hsl(0, 0%, 98%)` | Text on destructive backgrounds |

#### Border & Input Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--border` | `hsl(240, 5.9%, 90%)` | `hsl(240, 3.7%, 15.9%)` | Borders, dividers |
| `--input` | `hsl(240, 5.9%, 90%)` | `hsl(240, 3.7%, 15.9%)` | Input borders |
| `--ring` | `hsl(142, 76%, 36%)` | `hsl(142, 76%, 36%)` | Focus rings |

#### Popover Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--popover` | `hsl(0, 0%, 100%)` | `hsl(240, 10%, 3.9%)` | Popover/dropdown backgrounds |
| `--popover-foreground` | `hsl(240, 10%, 3.9%)` | `hsl(0, 0%, 98%)` | Text in popovers |

### Color Usage Examples

```tsx
// Primary color usage
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click Me
</Button>

// Muted background with primary accent
<div className="bg-primary/10 text-primary rounded-lg">
  Badge
</div>

// Card with proper foreground
<Card className="bg-card text-card-foreground">
  Content
</Card>

// Border usage
<div className="border border-border">
  Bordered content
</div>
```

### Color Accessibility

All color combinations meet WCAG AA standards:
- Primary on white: ✅ 4.5:1 contrast ratio
- Foreground on background: ✅ 4.5:1 contrast ratio
- Muted text: ✅ 4.5:1 contrast ratio

---

## Typography

The typography system uses three font families with specific use cases and a hierarchical scale.

### Font Families

#### 1. Inter (Sans Serif) - Primary
- **CSS Variable**: `--font-sans`
- **Usage**: Body text, UI elements, default text
- **Font Stack**: `"Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
- **Weights**: 100-900 (variable)
- **Loaded from**: Google Fonts

#### 2. DM Sans (Headline) - Display
- **CSS Variable**: `--font-headline`
- **Usage**: Headings, hero text, prominent titles
- **Font Stack**: `"DM Sans", ui-sans-serif, system-ui, sans-serif`
- **Tailwind Class**: `.font-headline`
- **Weights**: Variable (typically 400-700)

#### 3. IBM Plex Mono (Monospace) - Code
- **CSS Variable**: `--font-mono`
- **Usage**: Code snippets, technical terms, badges, inline code
- **Font Stack**: `"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
- **Tailwind Class**: `.font-mono`

### Type Scale

The typography scale follows a consistent hierarchy:

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **Hero/Display** | `text-7xl` (4.5rem / 72px) | `font-bold` (700) | Default | Hero sections, landing pages |
| **H1** | `text-5xl` (3rem / 48px) to `text-6xl` (3.75rem / 60px) | `font-bold` (700) | Default | Main page titles |
| **H2** | `text-4xl` (2.25rem / 36px) to `text-5xl` (3rem / 48px) | `font-bold` (700) | Default | Section headings |
| **H3** | `text-2xl` (1.5rem / 24px) to `text-3xl` (1.875rem / 30px) | `font-semibold` (600) | Default | Subsection headings |
| **H4** | `text-xl` (1.25rem / 20px) to `text-2xl` (1.5rem / 24px) | `font-semibold` (600) | Default | Card titles, component headings |
| **Body Large** | `text-lg` (1.125rem / 18px) to `text-xl` (1.25rem / 20px) | `font-normal` (400) | Default | Lead paragraphs, emphasis |
| **Body** | `text-base` (1rem / 16px) | `font-normal` (400) | Default | Standard body text |
| **Body Small** | `text-sm` (0.875rem / 14px) | `font-normal` (400) | Default | Secondary text, descriptions |
| **Caption** | `text-xs` (0.75rem / 12px) | `font-normal` (400) | Default | Labels, metadata, badges |

### Typography Examples

```tsx
// Hero heading
<h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
  Software Engineer
</h1>

// Section heading
<h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-foreground">
  Skills & Experience
</h2>

// Card title
<CardTitle className="font-semibold leading-none tracking-tight">
  Project Title
</CardTitle>

// Body text
<p className="text-xl md:text-2xl mb-12 max-w-2xl text-muted-foreground">
  Building scalable systems and solving complex problems
</p>

// Monospace badge
<span className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-mono text-sm">
  Full Stack
</span>
```

### Font Loading

Fonts are preloaded in `root.tsx` for optimal performance:

```tsx
// Inter font (variable weight)
href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
```

**Note**: DM Sans and IBM Plex Mono should be added to the font loading if not already included.

---

## Spacing System

The spacing system uses Tailwind's default scale based on a 4px base unit. All spacing values are multiples of 4px.

### Spacing Scale

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `0` | `0` | 0px | Reset spacing |
| `1` | `0.25rem` | 4px | Tight spacing, icon padding |
| `2` | `0.5rem` | 8px | Small gaps, tight layouts |
| `3` | `0.75rem` | 12px | Compact spacing |
| `4` | `1rem` | 16px | **Base unit**, standard gaps |
| `6` | `1.5rem` | 24px | Medium spacing, card padding |
| `8` | `2rem` | 32px | **Common**, section gaps, grid gaps |
| `12` | `3rem` | 48px | Large spacing, section margins |
| `16` | `4rem` | 64px | Extra large spacing |
| `20` | `5rem` | 80px | Hero spacing, large sections |
| `24` | `6rem` | 96px | Maximum spacing |

### Common Spacing Patterns

#### Component Padding

```tsx
// Card padding
<CardHeader className="p-6">  // 24px all sides
<CardContent className="p-6 pt-0">  // 24px except top

// Button padding
<Button className="px-4 py-2">  // 16px horizontal, 8px vertical
<Button size="lg" className="px-8">  // 32px horizontal
```

#### Layout Spacing

```tsx
// Section spacing
<section className="space-y-12">  // 48px vertical gap between children

// Grid gaps
<div className="grid gap-8">  // 32px gap between grid items

// Flex gaps
<div className="flex gap-4">  // 16px gap between flex items
<div className="flex gap-6">  // 24px gap (common for icon groups)
```

#### Margin Patterns

```tsx
// Section margins
<div className="mb-8">  // 32px bottom margin
<div className="mb-12">  // 48px bottom margin (common for sections)

// Container padding
<div className="px-8">  // 32px horizontal padding (common for containers)
<div className="max-w-7xl mx-auto px-8">  // Centered container with padding
```

### Responsive Spacing

Spacing can be adjusted for different breakpoints:

```tsx
// Responsive padding
<div className="px-4 md:px-8 lg:px-12">
  Content
</div>

// Responsive gaps
<div className="grid gap-4 md:gap-8">
  Items
</div>
```

---

## Component Styles

The project uses **Shadcn/ui** components with custom variants. Components follow consistent styling patterns.

### Button Component

The Button component uses `class-variance-authority` for variant management.

#### Variants

| Variant | Classes | Usage |
|---------|---------|-------|
| `default` | `bg-primary text-primary-foreground shadow hover:bg-primary/90` | Primary actions, CTAs |
| `destructive` | `bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90` | Delete, dangerous actions |
| `outline` | `border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground` | Secondary actions |
| `secondary` | `bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80` | Tertiary actions |
| `ghost` | `hover:bg-accent hover:text-accent-foreground` | Subtle actions, icon buttons |
| `link` | `text-primary underline-offset-4 hover:underline` | Text links styled as buttons |

#### Sizes

| Size | Height | Padding | Usage |
|------|--------|---------|-------|
| `default` | `h-9` (36px) | `px-4 py-2` | Standard buttons |
| `sm` | `h-8` (32px) | `px-3` | Small buttons, compact UI |
| `lg` | `h-10` (40px) | `px-8` | Large buttons, prominent CTAs |
| `icon` | `h-9 w-9` (36px) | - | Icon-only buttons |

#### Button Examples

```tsx
// Primary CTA
<Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
  View Projects
</Button>

// Outline button
<Button variant="outline" size="lg">
  Get In Touch
</Button>

// Icon button
<Button variant="ghost" size="icon">
  <Menu className="w-6 h-6" />
</Button>

// Destructive action
<Button variant="destructive">
  Delete
</Button>
```

### Card Component

Cards provide consistent container styling with shadow and border.

#### Card Structure

```tsx
<Card>                    // Container with border, shadow, rounded corners
  <CardHeader>            // Header section with padding
    <CardTitle>           // Bold title
    <CardDescription>     // Muted description text
  </CardHeader>
  <CardContent>           // Main content area
  <CardFooter>            // Footer section
</Card>
```

#### Card Styling

- **Border Radius**: `rounded-xl` (0.75rem / 12px)
- **Border**: `border` (uses `--border` color)
- **Background**: `bg-card` (theme-aware)
- **Shadow**: `shadow` (default elevation)
- **Padding**: `p-6` (24px) in header/content

#### Card Examples

```tsx
// Basic card
<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
    <CardDescription>Project description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>

// Interactive card with hover
<Card className="cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
  Content
</Card>

// Card with custom styling
<Card className="h-full hover:shadow-lg transition-shadow">
  Content
</Card>
```

### Input Component

Inputs use consistent styling with focus states.

#### Input Styling

- **Height**: `h-9` (36px)
- **Border**: `border border-input`
- **Border Radius**: `rounded-md` (uses `--radius-md`)
- **Padding**: `px-3 py-1`
- **Focus Ring**: `focus-visible:ring-1 focus-visible:ring-ring`
- **Placeholder**: `placeholder:text-muted-foreground`

#### Input Example

```tsx
<Input
  type="text"
  placeholder="Enter your name"
  className="w-full"
/>
```

### Dialog Component

Dialogs use Radix UI primitives with custom styling.

#### Dialog Styling

- **Overlay**: `bg-black/80` with fade animation
- **Content**: `max-w-lg`, centered, with shadow
- **Border Radius**: `sm:rounded-lg`
- **Padding**: `p-6` (24px)
- **Animations**: Fade in/out, zoom, slide

#### Dialog Example

```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    Content
    <DialogFooter>
      <Button>Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Navigation Menu

Navigation uses custom styling with hover states.

#### Navigation Styling

- **Link Hover**: `hover:text-primary transition-colors`
- **Active State**: Uses primary color
- **Spacing**: `gap-2` or `gap-8` depending on context
- **Font**: `font-normal` (not bold by default)

#### Navigation Example

```tsx
<NavigationMenu>
  <NavigationMenuList className="flex gap-2">
    <NavigationMenuItem>
      <NavigationMenuLink className="px-4 py-2 text-foreground hover:text-primary transition-colors">
        About
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

---

## Shadows & Elevation

Shadows provide depth and hierarchy. The system uses Tailwind's shadow utilities.

### Shadow Scale

| Shadow | Usage | Example |
|--------|-------|---------|
| `shadow-sm` | Subtle elevation, inputs, small cards | Input fields, badges |
| `shadow` | Default elevation, cards | Standard cards |
| `shadow-md` | Medium elevation | Elevated cards |
| `shadow-lg` | Large elevation, modals | Important cards, hover states |
| `shadow-xl` | Extra large elevation | Prominent elements, hover states |

### Shadow Usage

```tsx
// Default card shadow
<Card className="shadow">
  Content
</Card>

// Hover elevation
<Card className="hover:shadow-xl transition-shadow">
  Content
</Card>

// Button shadows
<Button className="shadow">  // Primary buttons
<Button variant="outline" className="shadow-sm">  // Outline buttons
```

### Custom Shadows

For special effects, custom shadows can be applied:

```tsx
// Backdrop blur with shadow (navbar)
<header className="bg-background/95 backdrop-blur-sm border-b border-border">
  Navbar
</header>
```

---

## Animations & Transitions

The project uses **Framer Motion** for complex animations and **Tailwind CSS** utilities for simple transitions.

### Framer Motion Patterns

#### Page Entry Animations

```tsx
// Fade and slide up
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  Content
</motion.div>

// Scale animation
<motion.div
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

#### Staggered Animations

```tsx
// Container with staggered children
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.div variants={container} initial="hidden" animate="show">
  <motion.div variants={item}>Item 1</motion.div>
  <motion.div variants={item}>Item 2</motion.div>
</motion.div>
```

#### Scroll-triggered Animations

```tsx
<motion.div
  variants={item}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### Tailwind Transitions

#### Common Transition Patterns

```tsx
// Color transitions
<div className="hover:text-primary transition-colors">
  Link
</div>

// Transform transitions
<Card className="hover:-translate-y-2 transition-all duration-300">
  Card
</Card>

// Shadow transitions
<Card className="hover:shadow-xl transition-shadow">
  Card
</Card>

// Combined transitions
<Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
  Card
</Card>
```

#### Transition Durations

- **Fast**: `duration-150` (150ms) - Quick interactions
- **Default**: `duration-200` (200ms) - Standard transitions
- **Medium**: `duration-300` (300ms) - Smooth animations
- **Slow**: `duration-500` (500ms) - Deliberate animations

#### Transition Timing

```tsx
// Ease-in-out (default)
<div className="transition-all duration-300">

// Custom timing (via Framer Motion)
<motion.div
  transition={{ duration: 0.8, ease: "easeOut" }}
>
```

### Animation Examples

```tsx
// Hero section with staggered animations
<motion.h1
  className="font-headline text-5xl font-bold"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  Title
</motion.h1>

// Card hover with transform
<Card className="cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
  Content
</Card>

// Image zoom on hover
<img
  className="transition-transform duration-500 group-hover:scale-110"
  src="image.jpg"
/>
```

---

## Border Radius

Border radius values are defined using CSS custom properties for consistency.

### Radius Scale

| Variable | Value | Usage |
|----------|-------|-------|
| `--radius` | `0.75rem` (12px) | Base radius value |
| `--radius-lg` | `var(--radius)` | Large radius (12px) |
| `--radius-md` | `calc(var(--radius) - 2px)` | Medium radius (10px) |
| `--radius-sm` | `calc(var(--radius) - 4px)` | Small radius (8px) |

### Tailwind Classes

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | `0.125rem` (2px) | Very small radius |
| `rounded-md` | `0.375rem` (6px) or `--radius-md` | Buttons, inputs |
| `rounded-lg` | `0.5rem` (8px) | Cards, badges |
| `rounded-xl` | `0.75rem` (12px) or `--radius-lg` | **Cards (default)** |
| `rounded-2xl` | `1rem` (16px) | Large cards, hero elements |

### Border Radius Usage

```tsx
// Card (default)
<Card className="rounded-xl">
  Content
</Card>

// Buttons
<Button className="rounded-md">  // Uses --radius-md

// Badges
<span className="px-4 py-2 bg-primary/10 text-primary rounded-lg">
  Badge
</span>

// Icon containers
<div className="w-12 h-12 bg-primary/10 rounded-lg">
  Icon
</div>

// Hero elements
<div className="w-20 h-20 bg-primary/10 rounded-2xl">
  Icon
</div>
```

---

## Opacity & Transparency

Opacity is used for overlays, hover states, and visual hierarchy.

### Common Opacity Values

| Value | Usage | Example |
|-------|-------|---------|
| `opacity-0` | Hidden | Fade out animations |
| `opacity-30` | Subtle overlay | Background elements |
| `opacity-50` | Disabled state | Disabled buttons |
| `opacity-70` | Semi-transparent | Dialog close button |
| `opacity-100` | Fully opaque | Default state |

### HSL Alpha Channel

Colors can use alpha transparency via HSL:

```tsx
// Primary with 10% opacity (background)
<div className="bg-primary/10">
  Content
</div>

// Primary with 90% opacity (hover)
<Button className="hover:bg-primary/90">
  Button
</Button>

// Primary with 20% opacity (borders)
<div className="border-primary/20">
  Content
</div>
```

### Backdrop Opacity

```tsx
// Navbar with backdrop blur
<header className="bg-background/95 backdrop-blur-sm">
  Navbar
</header>

// Dialog overlay
<div className="bg-black/80">
  Overlay
</div>
```

### Opacity Examples

```tsx
// Badge with primary background
<span className="bg-primary/10 text-primary">
  Badge
</span>

// Hover state with reduced opacity
<Button className="hover:bg-primary/90">
  Button
</Button>

// Canvas overlay
<canvas className="opacity-30 dark:opacity-20" />

// Disabled state
<Button disabled className="opacity-50">
  Disabled
</Button>
```

---

## Common Tailwind CSS Usage

This section documents frequently used Tailwind patterns in the project.

### Layout Patterns

#### Container & Centering

```tsx
// Centered container with max width
<div className="max-w-7xl mx-auto px-8">
  Content
</div>

// Full width container
<div className="w-full">
  Content
</div>

// Flex centering
<div className="flex items-center justify-center">
  Content
</div>
```

#### Grid Layouts

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  Items
</div>

// Multi-column grid
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  Items
</div>
```

#### Flex Layouts

```tsx
// Horizontal flex with gap
<div className="flex items-center gap-4">
  Items
</div>

// Vertical flex
<div className="flex flex-col space-y-4">
  Items
</div>

// Responsive flex
<div className="flex flex-col sm:flex-row sm:justify-between">
  Items
</div>
```

### Responsive Design

#### Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | **Common breakpoint** |
| `lg` | 1024px | Desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Extra large screens |

#### Responsive Patterns

```tsx
// Responsive text
<h1 className="text-5xl md:text-6xl lg:text-7xl">
  Title
</h1>

// Responsive padding
<div className="px-4 md:px-8 lg:px-12">
  Content
</div>

// Responsive display
<div className="hidden md:flex">
  Desktop only
</div>
<div className="md:hidden">
  Mobile only
</div>
```

### State Modifiers

#### Hover States

```tsx
// Color change
<div className="hover:text-primary transition-colors">
  Link
</div>

// Background change
<Button className="hover:bg-primary/90">
  Button
</Button>

// Shadow elevation
<Card className="hover:shadow-xl transition-shadow">
  Card
</Card>

// Transform
<Card className="hover:-translate-y-2 transition-all">
  Card
</Card>
```

#### Focus States

```tsx
// Focus ring
<Input className="focus-visible:ring-1 focus-visible:ring-ring" />

// Focus outline
<Button className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
  Button
</Button>
```

#### Group Hover

```tsx
// Parent hover affects child
<div className="group">
  <img className="group-hover:scale-110 transition-transform" />
  <h3 className="group-hover:text-primary transition-colors">
    Title
  </h3>
</div>
```

### Utility Combinations

#### Common Patterns

```tsx
// Card with hover effects
<Card className="cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full group">
  Content
</Card>

// Badge styling
<span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-mono">
  Badge
</span>

// Icon container
<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
  <Icon className="w-6 h-6 text-primary" />
</div>

// Section spacing
<section className="space-y-12 py-20">
  Content
</section>
```

---

## Example Component Reference

Here's a complete example component demonstrating the style guide principles:

```tsx
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/modules/shared/ui/card';
import { Button } from '@/modules/shared/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  onView: () => void;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  onView,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full group"
        onClick={onView}
      >
        {/* Image Section */}
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <CardHeader>
          {/* Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-mono">
              Full Stack
            </span>
          </div>

          {/* Title */}
          <CardTitle className="text-foreground group-hover:text-primary transition-colors">
            {title}
          </CardTitle>

          {/* Description */}
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        {/* Technologies */}
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            variant="outline"
            className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
          >
            View Project
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

### Style Guide Compliance

This example demonstrates:

✅ **Color System**: Uses semantic color tokens (`bg-primary`, `text-foreground`, `text-muted-foreground`)  
✅ **Typography**: Proper heading hierarchy and font families  
✅ **Spacing**: Consistent padding (`p-6`, `gap-2`, `mb-4`)  
✅ **Shadows**: Hover elevation (`hover:shadow-xl`)  
✅ **Animations**: Framer Motion entry animation and CSS transitions  
✅ **Border Radius**: Consistent rounded corners (`rounded-md`, `rounded-xl`)  
✅ **Opacity**: Alpha transparency (`bg-primary/10`)  
✅ **Responsive**: Works across breakpoints  
✅ **Accessibility**: Semantic HTML and proper contrast

---

## Best Practices

### Do's

✅ **Use semantic color tokens** (`bg-primary`, `text-foreground`) instead of hardcoded colors  
✅ **Follow the spacing scale** (multiples of 4px)  
✅ **Use consistent border radius** values  
✅ **Apply transitions** to interactive elements  
✅ **Use Framer Motion** for complex animations  
✅ **Maintain typography hierarchy** with proper heading sizes  
✅ **Test in both light and dark modes**  
✅ **Ensure accessibility** with proper contrast ratios

### Don'ts

❌ **Don't use arbitrary values** for spacing (use the scale)  
❌ **Don't hardcode colors** (use CSS variables)  
❌ **Don't mix animation libraries** unnecessarily  
❌ **Don't skip hover states** on interactive elements  
❌ **Don't use inline styles** (use Tailwind classes)  
❌ **Don't ignore responsive breakpoints**  
❌ **Don't forget focus states** for accessibility

---

## Conclusion

This style guide provides a comprehensive reference for maintaining consistency across the Portfolio CMS & Personal Website project. By following these guidelines, developers can create cohesive, accessible, and performant user interfaces that align with the project's design system.

For questions or updates to this style guide, please refer to the project's design tokens in `frontend/app/app.css` and component implementations in `frontend/app/modules/shared/ui/`.

