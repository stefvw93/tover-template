# Typescript React Boilerplate

Featuring

- [Typescript](https://www.typescriptlang.org)
- [React](https://reactjs.org)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Typestyle](https://typestyle.github.io/) CSS in JS
- [Webpack](https://webpack.js.org/)
- [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/)

Optimized build
- Small bundle size because of tree-shaking optimization, compression and webpack optimization.
- Cache-friendly bundle, using i.e. [emit-changed-only-webpack-plugin](https://www.npmjs.com/package/emit-changed-only-webpack-plugin)

## Usage

### Set up

```bash
% npm run setup
```

This will prompt some questions to create an initial project setup, and installs dependencies.

### Run

```bash
% npm start
```

### Build

```bash
% npm run build
```

### Settings

You can edit `project-config.js` to change basic project configuration settings like dev server port, display name or paths.

Webpack configuration is in `_webpack/webpack.<mode>.js`.

### Generate code

Where `name` is your component name, and `type` is either `"element"` (default) or `"screen"`. (See [Existing source code](#existing-source-code))

```bash
% npm run generate <name> <type>
```

This script will create a React Component, style map and `index.ts` file with types and exports.

```bash
% npm run generate Button
# creates an element module called "Button"
```

```bash
% npm run generate Image element
# creates an element module called "Image"
```

```bash
% npm run generate Login screen
# creates a screen module called "Login"
```

Code templates can be edited in `_scripts/code-templates`.

### Existing source code

This section roughly explains the out-of-the-box boilerplate code. All existing modules are documented with comments.

> `src/index.tsx`
> Bootstrap code

> `src/Main`
> Root app component

> `src/style`
> Style controller and other style related code

> `src/common/elements`, `src/common/screens`
> Common/reusable components like (ui) elements and screens.

> `src/utilities`
> Utility or all code that does not fall into other categories code

#### Code file structure

This section just explains the current file structure. Obviously you can ignore this and do things your own way, but note you might want to edit [code templates](#generate-components).

File structure concerning a leading class called `MyComponent` is used as an example here.

##### `MyComponent`

This is a directory. The directory's leading concern is the `MyComponent` class, so it inherits the class name - note the capitalization.

##### `MyComponent/MyComponent.element.tsx`

Exports class `MyComponent`

##### `MyComponent/myComponent.style.ts`

Exports styles related to `MyComponent`. Note that this module's file name is not capitalized, as it does not expose a class.

##### `MyComponent/index.ts`

Use to export modules and types related to `MyComponent`. Also, this is where you make last alterations: For example, apply decorators, rename exports or export extra types.

The project source uses OOP language style naming - like Swift or Kotlin. Classes should be named exports - never default exports, so the class name is consistent across the project, like so:

```typescript
// MyComponent/MyComponent.element.ts
export class MyComponent {
  ...
}
```

```typescript
// MyComponent/index.ts

export { MyComponent } from "./MyComponent.element";
```

```typescript
// some other module

import { MyComponent } from "common/elements/MyComponent"`
```
