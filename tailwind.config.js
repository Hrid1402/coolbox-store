/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#D6002A', // Coolbox red
                secondary: '#F5F5F5', // Light gray background
            }
        },
    },
    plugins: [],
}
