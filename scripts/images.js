const fs = require('fs');
const base = './src/res/';
const rootPath = 'images/';

const imageFileNames = (path) => {
  const newPath = path || '';
  const array = fs
    .readdirSync(base + rootPath + newPath)
    .filter((file) => {
      return file.endsWith('.png') || file.endsWith('.jpg');
    })
    .map((file) => {
      let newFilename = file.replace('@2x', '');
      newFilename = newFilename.replace('@3x', '');
      let key = newFilename.replace('.png', '');
      key = key.replace('.jpg', '');

      return {key, filename: './' + rootPath + newPath + newFilename};
    });

  return Array.from(new Set(array));
};

const generate = () => {
  let properties = imageFileNames('ui/')
    .concat(imageFileNames('levels/'))
    .map(({key, filename}) => {
      return `${key}: require('${filename}')`;
    })
    .join(',\n  ');

  const string = `const images = {
  ${properties}
}

export default images;
`;

  fs.writeFileSync('src/res/images.tsx', string, 'utf8');
};

generate();
