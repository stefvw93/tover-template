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

const replaceName = 'COMPONENTNAME';
const replaceType = 'COMPONENTTYPE';
const replaceStyle = 'COMPONENTSTYLE';
const allowedTypes = ['element', 'screen'];
const bashArguments = process.argv.slice(2);
const componentName = bashArguments[0] || 'newComponent';
const type = bashArguments[1] || 'element';
const templatesPath = path.resolve(__dirname, 'code-templates');
const indexPath = path.resolve(templatesPath, 'index.txt');
const componentPath = path.resolve(templatesPath, 'component.txt');
const stylesPath = path.resolve(templatesPath, 'styles.txt');
const activityIndicator = new ActivityIndicator();

/**
 * Get the output directory for a component type and name
 * @param {'element' | 'screen'} type
 * @param {string} componentName
 */
function getOutDir(type, componentName) {
  const outDir = path.resolve(
    process.cwd(),
    paths.dirnames.source,
    'common',
    type + 's',
    componentName
  );

  return outDir;
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

    if (allowedTypes.indexOf(type) < 0) {
      activityIndicator.stop();
      reject(
        errorMessage("Invalid type, only 'element' or 'screen' is allowed.")
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
            .replace(new RegExp(replaceName, 'g'), componentName)
            .replace(new RegExp(replaceType, 'g'), type)
            .replace(
              new RegExp(replaceStyle, 'g'),
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
    await generateModule(componentPath, componentName, type, type);

    // component.style.ts
    await generateModule(stylesPath, componentName, type, 'style');

    // index.ts
    await generateModule(indexPath, componentName, type, null);

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
