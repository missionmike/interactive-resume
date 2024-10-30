# Interactive Resume with Next.js and Sanity.io

The Interactive Resume can organize work history, positions, and projects within. Skills can be
organized by duration of experience, and can be applied to projects.

## Getting Started

### Pulling to Local

To set up your own Interactive Resume, you can either fork your own copy of this repository, or
check out this code locally and spin it up. The primary differences between the two options is how
they're deployed (if you're deploying to Vercel).

- **Forking** - if you fork the repo, you can set up your own deployment through Vercel to trigger
  when you make changes to your own `main` branch. See:
  https://vercel.com/docs/deployments/git/vercel-for-github
- **Cloning** - if you clone the repo locally, you can manually configure your deployment through
  the Vercel CLI. See: https://vercel.com/docs/cli/project-linking

Either way, you can always run the local utility `npm run deploy:vercel` to trigger a deployment to
`prod`.

### Installing Dependencies

1. Ensure you have `nvm` installed: https://github.com/nvm-sh/nvm
2. In the project root folder, run `nvm use` to run on the Node version defined in the `.nvmrc`
   file. If you don't already have that version installed, follow the steps to install with `nvm`.
3. Run `npm i` to install dependencies.

### Setting up Sanity to Host Content

1. If you don't already have a free account, head over to https://www.sanity.io/ and sign up. Then,
   create a new project.
2. Copy the `.env.example` file to `.env.local` and update the values. `NEXT_PUBLIC_SANITY_DATASET`
   can stay as `"production"` unless you plan on using different environment name.
3. Run `npm run deploy:graphql` to ensure your Sanity project's GraphQL endpoint is set up. After
   this command is run successfully, you should find a GraphQL endpoint in your terminal in a format
   like: `https://[SANITY_PROJECT_ID].api.sanity.io/v2023-08-01/graphql/[SANITY_DATASET]/default`.
   Copy this value to `SANITY_GRAPHQL_ENDPOINT` in `.env.local`.
4. If the date value in the URL differs from the value in `NEXT_PUBLIC_SANITY_API_VERSION` in
   `.env.local`, update the value in `.env.local` to match the date value from the URL (exclude the
   `"v"` prefix).
5. Ensure you have `localhost:3000` and your production/other domains listed in the CORS section of
   the Sanity API settings. If you're not allowing your domain to access, the GraphQL requests will
   be blocked.

### Populate Data in Sanity

You can spin up locally with `npm run dev`, then visit http://localhost:3000/studio and sign in with
your preferred credentials.

From there, visit the following pages to populate data:

-**Theme Options**: http://localhost:3000/studio/structure/themeOptions this is where you can set
your name, title, location, and other global meta.

- **Skills**: http://localhost:3000/studio/structure/skill this is where you can add skills and
  years' experience. Each skill includes optional description which would appear to users when they
  click the skill icon. The Skill Icon can be set as a string based on any icon found here:
  https://icon-sets.iconify.design/ e.g. `devicon:react`
- **Companies**: http://localhost:3000/studio/structure/company add companies where you've worked.
  Values are flexible.
- **Positions**: http://localhost:3000/studio/structure/position add positions. Each position can be
  linked to a company. Within each position, you can add Projects. The project's title appears as
  the bullet point in the resume. The desciprion and skills appear within.
- **Education**: http://localhost:3000/studio/structure/education add education experience.

#### TODO (work in progress)

This project is a work in progress. To find planned features, visit the
[Issues](https://github.com/missionmike/interactive-resume/issues) page in GitHub.

### Fetch Content from Sanity

After setting up Sanity and ensuring GraphQL is published, you an test out your GraphQL endpoint
with Postman. I've set up an example collection that you can fork to test, or view the saved example
responses.

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/2595954-32a4a40a-8daa-45b4-b570-4e533469a20c?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D2595954-32a4a40a-8daa-45b4-b570-4e533469a20c%26entityType%3Dcollection%26workspaceId%3D034c1af6-8d72-472b-8943-f6291da07e69#?env%5BInteractive%20Resume%5D=W3sia2V5IjoiR1JBUEhRTF9FTkRQT0lOVCIsInZhbHVlIjoiaHR0cDovL3lvdXItZ3JhcGhxbC1lbmRwb2ludC9ncmFwaHFsIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJodHRwOi8veW91ci1ncmFwaHFsLWVuZHBvaW50L2dyYXBocWwiLCJjb21wbGV0ZVNlc3Npb25WYWx1ZSI6Imh0dHA6Ly95b3VyLWdyYXBocWwtZW5kcG9pbnQvZ3JhcGhxbCIsInNlc3Npb25JbmRleCI6MH1d)

> You need to ensure that the Environment value for `{{GRAPHQL_ENDPOINT}}` is set in Postman to
> test!

### Running on Local

After dependencies are installed, GraphQL is deployed and environment variables are set, spin up the
local server with `npm run dev`.

- Access the Sanity studio at: http://localhost:3000/studio
- Access your local front-end view at: http://localhost:3000

From here, populate your data in the Sanity Studio, then perform a full refresh in the local browser
to view the changes.

## Deploying to Vercel

To deploy your Interactive Resume to Vercel, first ensure you have an account and project set up in
Vercel. If you forked the Interactive Resume repository, you can authenticate with GitHub and have
it automatically deploy when you make changes to your `main` branch.

If you'd prefer to manually deploy and link projects, you can run the `npm run deploy:vercel`
command.

The following environment variables will need to be set in Vercel to match what we're using in
`.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_GRAPHQL_ENDPOINT`

Here is a live example: https://resume.missionmike.dev/

## Design Choices

You might wonder, "Why can't I edit data in the Sanity Studio and immediately see my changes in the
front-end after refresh?"

Well, this installation is using Next.js to fetch and render the data on the initial page load only.
After the page is rendered with SSR, the data is cached and saved. Refreshing the page will not
re-fetch the data from the GraphQL endpoint. The reason I set it up this way is because the Sanity
Free plan has a limit on API requests and data fetching. In an effort to stay well under the paid
thresholds and keep usage in the free tier, the data is only fetched on the first render.

If you make changes in Sanity Studio and you want to ensure you can see the latest updates on
`production`, you'll need to manually redeploy with `npm run deploy:vercel`, which will trigger a
full rebuild and deployment.

## Troubleshooting

If you run into issues setting this up or running it on local, please feel free to open an Issue in
GitHub, or open a Pull Request if you have an idea or solution to share.
