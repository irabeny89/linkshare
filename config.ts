const config = {
  siteData: {
    name: "LinkShare",
    author: "Ernest Irabor",
    email: "irabeny89@gmail.com",
    ACCESS_TOKEN_KEY: "linkShareAccessToken",
    error: {
      client: {
        serverDown:
          "Something went wrong. Try again later or contact the developer. Contact in the footer below.",
        pageNotFound: "Page not found.",
        general:
          "Something went wrong. Check your internet connection and try again.",
      },
      server: {
        general: "500 - Oops :(. Server error.",
      },
    },
    pages: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Member",
        href: "/member",
      },
      {
        title: "Dashboard",
        href: "/dashboard",
      },
    ],
  },
  environmentVariable: {
    secret: process.env.SECRET!,
  },
};

export default config;
