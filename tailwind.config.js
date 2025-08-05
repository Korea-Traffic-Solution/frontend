/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'toss-blue': '#3182f6',
        'toss-blue-light': '#ebf4ff',
        'toss-blue-dark': '#1b64da',
        'toss-gray': {
          50: '#f9fafb',
          100: '#f1f3f4',
          200: '#e5e8eb',
          300: '#d1d6db',
          400: '#b0b8c1',
          500: '#8b95a1',
          600: '#6b7684',
          700: '#4e5968',
          800: '#333d4b',
          900: '#191f28',
        }
      },
      fontFamily: {
        'pretendard': ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
      },
      boxShadow: {
        'toss': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'toss-lg': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'toss-xl': '0 8px 25px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'toss': '12px',
        'toss-lg': '16px',
      }
    },
  },
  plugins: [],
}