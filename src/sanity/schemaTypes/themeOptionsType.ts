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
      name: "userContact",
      type: "string",
      description: "Enter any contact information. Emails and phone numbers will not be linked.",
    },
    {
      name: "userLocation",
      type: "string",
      description: "Enter any general location, such as City, State.",
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
