# Typescript React Boilerplate

Featuring:

- [Typescript](https://www.typescriptlang.org)
- [React](https://reactjs.org)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- CSS in JS with [Typestyle](https://typestyle.github.io/)
- [Webpack dev server](https://reacttraining.com/react-router/web/guides/quick-start) with [hot module replacement](https://github.com/gaearon/react-hot-loader) for React components
- Typescript tree-shaking for smaller build size
- [emit-changed-only-webpack-plugin](https://www.npmjs.com/package/emit-changed-only-webpack-plugin)

## Usage

### Set up your project

```bash
$ npm run setup
```

This will prompt some questions to create an initial project setup.

### Run your project

```bash
$ npm run start
```

### Build your project

```bash
$ npm run build
```

### Configure your project

You can edit `project-config.js` to change basic project configuration settings like dev server port, display name or paths.

Webpack configuration is in `_webpack/webpack.<mode>.js`.

### Generate components

```bash
$ npm run generate <name> <type>
```

Where name is your component name, and type is either `"element"` (default) or `"screen"`. (See [File structure](#file-structure))

```bash
$ npm run generate Button
# creates a Button element component
```

```bash
$ npm run generate Login screen
# creates a Login screen component
```

Code templates and output can be edited in `_scripts/code-templates` and `_scripts/generate.js`.

### File structure

> `src/index.tsx`
> Mounts your react app after styles are created.

> `src/Main`
> React root component

> `src/style`
> Style controller and other style related code

> `src/utilities`
> Utility code

> `src/common/elements`, `src/common/screens`
> Common/reusable components like (ui) elements and screens.

### Code dir structure

`MyComponent`

> This directory's leading concern is the `MyComponent` class. So the directory name is the same as the component class - thus capitalized.

`./MyComponent.element.tsx`

> component logic

`./MyComponent.style.ts`

> component styles

`./index.ts`

> Make last alterations and export. For example, wrap a react component in `withRouter`, rename a component or expose types. Classes should be named exports, so the class name is consistent across the project, e.g.

> `import { MyComponent } from "common/elements/MyComponent"`

> instead of a default export like so;

> `import IChangedTheName from "common/elements/MyComponent`.
