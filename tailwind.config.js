/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,ts,css,scss}"],
  theme: {
    extend: {},
    screens: {
      small: "324px",
      xxm: "344px",
      xm: "360px",
      s375: "375px",
      s384: "384px",
      s390: "390px",
      s393: "393px",
      s412: "412px",
      s414: "414px",
      s425: "425px",
      s430: "430px",
      s431: "431px",
      s445: "445px",
      s480: "480px",
      s540: "540px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }
      m820: "820px",
      m850: "850px",
      m910: "910px",
      m998: "998px",
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      xxxl:'1441px',
      // => @media (min-width: 1441px) { ... }

      xxl: "1536px",
      // => @media (min-width: 1536px) { ... }

    },
  },
  plugins: [],
};
