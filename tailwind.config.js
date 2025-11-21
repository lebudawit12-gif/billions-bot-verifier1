/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'void-black': '#050505',
                'neon-cyan': '#00f3ff',
                'glitch-red': '#ff003c',
                'billions-green': '#00ff9d',
                'dark-gray': '#1a1a1a',
            },
            fontFamily: {
                mono: ['"Courier New"', 'Courier', 'monospace'],
                pixel: ['"Press Start 2P"', 'cursive'], // We might need to import this or use a fallback
            },
            animation: {
                'glitch': 'glitch 1s linear infinite',
                'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                glitch: {
                    '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                    '62%': { transform: 'translate(0,0) skew(5deg)' },
                }
            }
        },
    },
    plugins: [],
}
