# Typescript React Boilerplate

Opinionated but flexible project boilerplate, featuring:

- [Typescript](https://www.typescriptlang.org)
- [React](https://reactjs.org)
- [Webpack](https://webpack.js.org/)

Delivers an optimized build because of:

- Small bundle size through tree-shaking optimization, compression and webpack optimization.
- Cache-friendly bundle, using i.e. [emit-changed-only-webpack-plugin](https://www.npmjs.com/package/emit-changed-only-webpack-plugin)

With some handy pre-implemented libraries, like:

- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Typestyle](https://typestyle.github.io/) - CSS in JS
- [Mobx](https://mobx.js.org/README.html) - state management

Boosts your productivity with:

- Extensive development environment
- Auxiliary build tools
- [Code generation](#generate-code)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

...and more!

## Usage

#### Set up

```bash
% npm run setup
# This will prompt some questions to create an initial project setup, and installs dependencies.
```

#### Start

```bash
% npm start
# runs typescript compiler in watch mode and starts a webpack dev server
```

#### Build

```bash
% npm run build
# runs the linter on your source code, compiles typescript and bundles your build using webpack
```

#### Clean

```bash
% npm run clean
# cleans out node_modules, cache and distribution directories
```

#### Lint

```bash
% npm run lint
# runs the linter on all but compiled code in the project and attempts to fix code style where possible
```

#### Generate code

Creating new components can be a tedious task. Therefor a code generation script is included in this boilerplate. Just run the following command:

```bash
% npm run generate <name> <type>
```

Where `name` is your component name, and `type` is either `"element"` (default) or `"screen"`. (See [Existing source code](#existing-source-code))

This script will create a `component`, `styles` and `index` file with related types and exports.

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

Code templates can be edited in `_environment/code-templates`.

## Existing source code

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
> Utility code or code that does not fall into other categories.

#### Code file structure and code/naming style

This section explains the current file structure and code/naming style. The source code has OOP-language style naming and consistency. Obviously you can ignore this and do things your own way, but note you might want to edit [code templates](#generate-components). A general rule of thumb is that file/module names should match their exported code's leading concern.

File structure concerning a leading class called `MyComponent` is used as an example here.

##### `MyComponent`

This is a directory. The directory's leading concern is the `MyComponent` class, so it inherits the class name - note the capitalization.

##### `MyComponent/MyComponent.element.tsx`

Exports class `MyComponent`

##### `MyComponent/myComponent.style.ts`

Exports styles related to `MyComponent`. Note that this module's file name is not capitalized, as it does not expose a class.

##### `MyComponent/index.ts`

Use to export modules and types related to `MyComponent`. Also, this is where you make last alterations: For example, apply decorators, rename exports or export extra types.

Classes should be named exports - never default exports, so the class name is consistent across the project, like so:

```typescript
// MyComponent/MyComponent.element.ts
export class MyComponent {
  ...
}
```

```typescript
// MyComponent/index.ts

export { MyComponent } from './MyComponent.element';
```

```typescript
// some other module

import { MyComponent } from "common/elements/MyComponent"`
```

## Settings

You can edit `project-config.js` to customize settings like app properties, entry point, dev server and paths.

Webpack configurations are found in `_webpack` (by default).

Various (node) package scripts can be found in `_environment`, if you wish to change these.

## Other

Using an ESLint plugin for your IDE is recommended.

Directories prefixed with a _"\_"_ can generally remain untouched, unless you know what you are doing and want to change things about the project setup. Directories prefixed with a _"."_ should not be touched. These contain compiled or otherwise processed code.
