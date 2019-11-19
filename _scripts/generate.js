const fs = require('fs');
const path = require('path');
const { paths } = require('../project-config');
const replaceName = 'COMPONENTNAME';
const replaceType = 'COMPONENTTYPE';
const replaceStyle = 'COMPONENTSTYLE';
const allowedTypes = ['element', 'screen'];
const bashArguments = process.argv.slice(2);
const componentName = bashArguments[0] || 'newComponent';
const type = bashArguments[1] || 'element';
const indexPath = path.resolve(__dirname, 'code-templates/index.txt');
const componentPath = path.resolve(__dirname, 'code-templates/component.txt');
const stylesPath = path.resolve(__dirname, 'code-templates/styles.txt');

function getOutDir(type, componentName) {
  const outDir = path.resolve(
    __dirname,
    '..',
    'src',
    'common',
    type + 's',
    componentName,
  );

  return outDir;
}

function generateModule(templateFile, name, type, subtype) {
  if (allowedTypes.indexOf(type) < 0) {
    console.log("Invalid type, only 'element' or 'screen' is allowed.");
    return;
  }

  fs.readFile(templateFile, function(error, buffer) {
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

    console.log('Writing file to ' + writeFileName.split(paths.root)[1]);

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
            name.charAt(0).toLowerCase() + name.slice(1),
          ),

        function(error) {
          if (error) console.log('Uh-oh', error);
          console.log('Created ' + (subtype || 'index'));
        },
      );
    }
  });
}

if (fs.existsSync(getOutDir(type, componentName))) {
  console.log(`"${componentName}" already exists!`);
  return;
}

console.log('Creating new component', type, componentName);

// index.ts
generateModule(indexPath, componentName, type, null);

// Component.element.ts
generateModule(componentPath, componentName, type, type);

// component.style.ts
generateModule(stylesPath, componentName, type, 'style');
