import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                foreground: "rgb(var(--foreground) / <alpha-value>)",
                surface:    "rgb(var(--surface)    / <alpha-value>)",
                muted:      "rgb(var(--muted)      / <alpha-value>)",
                accent: {
                    DEFAULT: "rgb(var(--accent)      / <alpha-value>)",
                    fg:      "rgb(var(--accent-fg)   / <alpha-value>)",
                    soft:    "rgb(var(--accent-soft) / <alpha-value>)",
                },
                success: "rgb(var(--success) / <alpha-value>)",
                warning: "rgb(var(--warning) / <alpha-value>)",
                danger:  "rgb(var(--danger)  / <alpha-value>)",
            },
            fontFamily: {
                sans:    ['var(--font-inter)',   'system-ui', 'sans-serif'],
                display: ['var(--font-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
                mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
            },
            spacing: {
                '4.5': '1.125rem',
            },
            boxShadow: {
                'card': '0 1px 0 0 rgb(0 0 0 / 0.02), 0 4px 12px -4px rgb(0 0 0 / 0.04)',
                'pop':  '0 1px 0 0 rgb(0 0 0 / 0.02), 0 12px 32px -8px rgb(0 0 0 / 0.08)',
            },
            borderRadius: {
                'xl2': '16px',
            },
            animation: {
                "fade-in":        "fadeIn 0.3s ease-out forwards",
                "fade-in-up":     "fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "slide-in-right": "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "shimmer":        "shimmer 1.8s linear infinite",
                "pulse-soft":     "pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                fadeIn:   { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
                fadeInUp: { "0%": { opacity: "0", transform: "translateY(8px)" },
                            "100%": { opacity: "1", transform: "translateY(0)" } },
                slideInRight: { "0%": { transform: "translateX(100%)" },
                                "100%": { transform: "translateX(0)" } },
                shimmer: { "0%": { backgroundPosition: "-200% 0" },
                           "100%": { backgroundPosition: "200% 0" } },
                pulseSoft: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.6" } },
            },
        },
    },
    plugins: [],
};
export default config;
