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

Where name is your component name, and type is either `"element"` (default) or `"screen"`. (See [Existing source code](#existing-source-code))

```bash
$ npm run generate Button
# creates a Button element component
```

```bash
$ npm run generate Login screen
# creates a Login screen component
```

Code templates and output can be edited in `_scripts/code-templates` and `_scripts/generate.js`.

### Existing source code

This section roughly explains the out-of-the-box boilerplate code. All existing modules are documented with comments.

> `src/index.tsx`
> Mounts your react app after styles are created.

> `src/Main`
> Root app component

> `src/style`
> Style controller and other style related code

> `src/utilities`
> Utility code

> `src/common/elements`, `src/common/screens`
> Common/reusable components like (ui) elements and screens.

#### Code file structure

This section just explains the current file structure. Obviously you can ignore this and do things your own way, but note you might want to edit [code templates](#generate-components).

File structure concerning a leading class called `MyComponent` is used as an example here.

##### `MyComponent`

This is a directory. The directory's leading concern is the `MyComponent` class, so it inherits the class name - note the capitalization.

##### `MyComponent/MyComponent.element.tsx`

Exposes class `MyComponent`

##### `MyComponent/myComponent.style.ts`

Exposes styles related to `MyComponent`. Note that this module's file name is not capitalized, as it does not expose a class.

##### `MyComponent/index.ts`

Use to export modules and types. Also, this is where you make last alterations: For example, wrap a react component in `withRouter`, rename an export or expose typings.

Classes should be named exports, so the class name is consistent across the project, e.g:

```typescript
// MyComponent.element.ts
export class MyComponent {
  // ...
}
```

```typescript
// index.ts
export MyComponent from "./MyComponent.element";
```

```typescript
// some other module
import { MyComponent } from "common/elements/MyComponent"`
```

Never use default exports.
