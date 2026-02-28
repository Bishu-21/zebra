import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#FAFAFA",
                "background-light": "#F5F5F5",
                "background-dark": "#0A0A0A",
                "zebra-black": "#050505",
                "zebra-gray": "#1A1A1A",
            },
            fontFamily: {
                display: ["var(--font-space-grotesk)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.75rem",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                'grid-pattern': "linear-gradient(to right, #333333 1px, transparent 1px), linear-gradient(to bottom, #333333 1px, transparent 1px)",
            },
        },
    },
    plugins: [],
};
export default config;
