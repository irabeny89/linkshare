export const errorMessages = {
  client: {
    serverDown500:
      "Something went wrong. Try again later or contact the developer. Contact in the footer below.",
    pageNotFound404: "Page not found.",
    general:
      "Something went wrong. Check your internet connection and try again.",
  },
  server: {
    server500: "500 - Oops :(. Server error.",
    forbidden403: "You are not permitted. Only owner permitted.",
  },
};

export const environmentVariables = {
  secret: process.env.SECRET!,
};

export const siteData = {
  name: "LinkShare",
  author: "Ernest Irabor",
  email: "irabeny89@gmail.com",
  ACCESS_TOKEN_KEY: "linkShareAccessToken",
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
};
