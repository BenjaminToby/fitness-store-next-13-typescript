module.exports = {
    content: ["./components/**/*.{html,js,jsx,tsx}", "./pages/**/*.{jsx,tsx}", "./app/**/*.{html,js,jsx,tsx}"],
    theme: {
        screens: {
            xs: "350px",
            sm: "450px",
            md: "600px",
            sl: "800px",
            lg: "976px",
            xl: "1200px",
        },

        fontFamily: {
            sans: ["PT Sans", "sans-serif"],
        },
        extend: {
            colors: {
                primary: "#f33c3c",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
