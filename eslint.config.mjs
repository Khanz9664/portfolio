export default [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
                IntersectionObserver: "readonly",
                requestAnimationFrame: "readonly",
                cancelAnimationFrame: "readonly",
                IntersectionObserverEntry: "readonly",
                localStorage: "readonly",
                fetch: "readonly",
                HTMLElement: "readonly",
                gsap: "readonly",
                ScrollTrigger: "readonly",
                CanvasNest: "readonly",
                Swiper: "readonly",
                navigator: "readonly",
                FormData: "readonly",
                MathJax: "readonly"
            }
        },
        rules: {
            "no-undef": "error",
            "no-unused-vars": "warn"
        }
    },
    {
        ignores: ["node_modules/**"]
    }
];
