# Contribute
Thank you for considering contributing to the project.
The project is in its very intial steps, so many of the porcesses are not finalized yet.

However, read through this document to learn more.

## Linting
The project uses ESLint's Flat Config, which is an experimental feature in VSCcode and has to be turned on.
```json
{
  "eslint.experimental.useFlatConfig": true
}
```

Make sure that your code is properly linted before raising a PR.

## Adding a new UI component
The project uses [shadcn/ui](https://ui.shadcn.com/) for UI components, which requires [TailwindCSS](https://tailwindcss.com/).

To add a new reusable component, take a look at their components' library, and if you find the component you're looking for, add it using [shadcn/ui's CLI](https://ui.shadcn.com/docs/cli).
The CLI will read the config from `components.json` and add the new component in the correct directory.

Note that some components, which involves portal, will require you to wrap some part of it in a `div` with `.tw-preflight` class. See the `components/ui/dialog` component as an example.
Read more about it in [tailwind.config.mjs](./tailwind.config.mjs).
