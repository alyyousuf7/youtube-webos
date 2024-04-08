import tailwindcssAnimate from 'tailwindcss-animate';
import { scopedPreflightStyles } from 'tailwindcss-scoped-preflight';

// Tailwind has preflight styles that causes conflicts with YouTube's styles.
// To avoid that, we need to scope the preflight styles to a specific selector, so we can create own UI using tailwind
// without affecting the YouTube's UI.
//
// To do that, we use the `tailwindcss-scoped-preflight` plugin.
//
// The scoping strategy below, is a copy of the original `isolateInsideOfContainer` strategy with a small change.
// https://github.com/Roman86/tailwindcss-scoped-preflight/blob/main/src/strategies.ts#L33
//
// The original strategy used `:where` selector, but it's not supported by LG TV browser. Unfortunately, a polyfill
// is also not possible.
// https://caniuse.com/mdn-css_selectors_where
// https://github.com/csstools/postcss-plugins/discussions/509
//
// As a workaround, we use a custom strategy that uses a Descendant combinator instead of `:where` selector.
//
// However, the descendant combinator has a higher specificity than the `:where` selector, which causes conflicts
// with tailwind's own classes that overrides the preflight styles.
// For example, `inline-block` class now becomes a lower specificity than the preflight styles. :(
//
// To fix that, we added `!important` to all tailwind styles, except for the preflight styles using the
// `postcss-safe-important` plugin.
// This way, we can keep the tailwind preflight styles with a lower specificity than the tailwind classes, while
// keeping the preflight styles scoped to a specific selector.
const isolateInsideOfContainer = containerSelectors =>
  ({ ruleSelector }) =>
    ['html', 'body', ':host'].includes(ruleSelector)
      ? [containerSelectors].flat().join(',')
      : [containerSelectors]
          .flat()
          .map(s => `${s} ${ruleSelector}`) // Descendant combinator
          .join(',');

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [
    tailwindcssAnimate,
    // we need to scope the preflight styles to avoid conflicts with YouTube's styles
    //
    // we must use .tw-preflight class to all containers that needs to use tailwindcss classes
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer('.tw-preflight'),
    }),
  ],
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
};
