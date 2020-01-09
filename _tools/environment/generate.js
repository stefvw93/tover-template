const fs = require('fs-extra');
const kleur = require('kleur');
const path = require('path');
const { paths } = require('../tover-config');
const {
  ActivityIndicator,
  errorMessage,
  progressMessage,
  rewriteLine,
  successMessage,
  writeLine,
} = require('../utils');

const activityIndicator = new ActivityIndicator();
const bashArguments = process.argv.slice(2);
const generateFunctionComponent = bashArguments.indexOf('--sfc');

// Settings
// Edit these if you changed directories or filenames regarding templates or source output
const COMPONENT_NAME_PLACEHOLDER = 'COMPONENTNAME';
const COMPONENT_TYPE_PLACEHOLDER = 'COMPONENTTYPE';
const COMPONENT_STYLE_PLACEHOLDER = 'COMPONENTSTYLE';
const COMPONENT_TYPES = ['element', 'screen', 'template'];
const TEMPLATES_DIR = path.resolve(__dirname, 'code-templates');
const INDEX_TEMPLATE = path.resolve(TEMPLATES_DIR, 'index.txt');
const COMPONENT_TEMPLATE = generateFunctionComponent
  ? path.resolve(TEMPLATES_DIR, 'sf-component.txt')
  : path.resolve(TEMPLATES_DIR, 'component.txt');
const STYLE_TEMPLATE = path.resolve(TEMPLATES_DIR, 'styles.txt');
const COMPONENT_OUTPUT_DIR = path.resolve(
  process.cwd(),
  paths.dirnames.source,
  'components'
);

const componentName = bashArguments[0] || 'newComponent';
const type = bashArguments[1] || 'element';

/**
 * Get the output directory for a component type and name
 * @param {'element' | 'screen'} type
 * @param {string} componentName
 */
function getOutDir(type, componentName) {
  return path.resolve(COMPONENT_OUTPUT_DIR, `${type}s`, componentName);
}

/**
 * Generate a module
 * @param {string} templateFile
 * @param {string} name
 * @param {'element' | 'screen'} type
 * @param {'element' | 'screen' | 'type'} subtype
 */
async function generateModule(templateFile, name, type, subtype) {
  return new Promise(function(resolve, reject) {
    activityIndicator.message = progressMessage(
      `Creating new component of type ${type}`
    );
    activityIndicator.start();

    if (COMPONENT_TYPES.indexOf(type) < 0) {
      activityIndicator.stop();
      reject(
        errorMessage(
          `Invalid module type "${type}". Allowed types are: ${COMPONENT_TYPES.join(
            ', '
          )}.`
        )
      );
    }

    fs.readFile(templateFile, function(error, buffer) {
      if (error) {
        activityIndicator.stop();
        reject(errorMessage('Could not read file ' + templateFile));
      }

      const componentName = name.charAt(0).toUpperCase() + name.slice(1);
      const fileName = !subtype
        ? 'index'
        : (subtype === 'style'
            ? name.charAt(0).toLowerCase()
            : name.charAt(0).toUpperCase()) + name.slice(1);

      const outDir = getOutDir(type, componentName);

      let writeFileName = path.resolve(outDir, fileName);
      if (subtype) writeFileName += `.${subtype}`;
      writeFileName += type === subtype ? '.tsx' : '.ts';

      if (buffer) {
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
        fs.writeFile(
          writeFileName,
          buffer
            .toString()
            .replace(new RegExp(COMPONENT_NAME_PLACEHOLDER, 'g'), componentName)
            .replace(new RegExp(COMPONENT_TYPE_PLACEHOLDER, 'g'), type)
            .replace(
              new RegExp(COMPONENT_STYLE_PLACEHOLDER, 'g'),
              name.charAt(0).toLowerCase() + name.slice(1)
            ),

          function(error) {
            if (error) {
              activityIndicator.stop();
              reject(kleur.bold().red(error.message));
            } else {
              activityIndicator.stop();
              rewriteLine(successMessage(`Created ${subtype || 'index'}`));
              resolve();
            }
          }
        );
      } else {
        reject(errorMessage('Could not read file ' + templateFile));
      }
    });
  });
}

if (fs.existsSync(getOutDir(type, componentName))) {
  writeLine(errorMessage(`"${componentName}" already exists!`));
  process.exit();
}

async function generate() {
  try {
    // Component.element.ts
    await generateModule(COMPONENT_TEMPLATE, componentName, type, type);

    // component.style.ts
    await generateModule(STYLE_TEMPLATE, componentName, type, 'style');

    // index.ts
    await generateModule(INDEX_TEMPLATE, componentName, type, null);

    activityIndicator.stop();
  } catch (error) {
    activityIndicator.stop();
    rewriteLine(
      errorMessage(`Something went wrong while generating a new component.`)
    );
    writeLine(error);
  }
}

generate()
  .then(_ => process.exit(0))
  .catch(_ => process.exit(0));
