# Typescript React Boilerplate

## Usage

### Set up your project

```bash
$ npm run setup
```

This will prompt some questions to create an initial project setup.

### Configure your project

You can edit `project-config.js` to change basic project configuration settings.

Webpack configuration is in `_webpack/webpack.<mode>.js`.

### Generate components

You can generate React components by running this command:

```bash
$ npm run generate <name> <type>
```

Where name is your component name, and type is either `"element"` (default) or `"screen"`.

```bash
$ npm run generate Button
```
