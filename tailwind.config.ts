import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: '#08080F',
        surface: '#0E0E1C',
        surface2: '#14142A',
        surface3: '#1A1A35',
        accent: '#818CF8',
        'accent-light': '#A5B4FC',
        cyan: '#67E8F9',
        green: '#4ADE80',
        orange: '#FB923C',
        'red-soft': '#F87171',
        'yellow-soft': '#FCD34D',
        'border-subtle': 'rgba(255,255,255,0.06)',
        'border-hover': 'rgba(255,255,255,0.12)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-accent': 'radial-gradient(ellipse at center, rgba(129,140,248,0.15) 0%, transparent 70%)',
        'glow-green': 'radial-gradient(ellipse at center, rgba(74,222,128,0.15) 0%, transparent 70%)',
        'glow-orange': 'radial-gradient(ellipse at center, rgba(251,146,60,0.2) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(129,140,248,0.2)',
        'glow-md': '0 0 40px rgba(129,140,248,0.25)',
        'glow-green': '0 0 30px rgba(74,222,128,0.25)',
        'glow-orange': '0 0 30px rgba(251,146,60,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'streak-fire': 'streakFire 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        streakFire: {
          '0%, 100%': { transform: 'scale(1) rotate(-2deg)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.1) rotate(2deg)', filter: 'brightness(1.3)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
