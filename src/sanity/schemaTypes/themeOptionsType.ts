export const themeOptionsType = {
  name: "themeOptions",
  type: "document",
  title: "Theme Options",
  fields: [
    {
      name: "userName",
      type: "string",
    },
    {
      name: "userTitle",
      type: "string",
    },
    {
      name: "siteTitle",
      type: "string",
      description: "The title is used for HTML page title as well as opengraph.",
    },
    {
      name: "siteDescription",
      type: "text",
      description: "This description will appear in the site meta and opengraph.",
    },
    {
      name: "siteImage",
      type: "image",
      description: "This image is used in opengraph site previews.",
    },
  ],
};
