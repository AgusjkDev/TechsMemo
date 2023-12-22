const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
export default {
    content: ["./src/**/*.{astro,svelte}"],
    theme: {
        extend: {
            fontFamily: {
                serif: ["RoyalAcid", ...defaultTheme.fontFamily.serif],
            },
        },
    },
    plugins: [],
};
