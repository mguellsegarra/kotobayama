const fs = require('fs');
const resPath = './src/res/';
const basePath = resPath + 'images/';
const iosAssets = 'Images.xcassets';

const defaultIosAssetContent = {
  images: [
    {
      idiom: 'universal',
      scale: '1x',
    },
    {
      idiom: 'universal',
      scale: '2x',
    },
    {
      idiom: 'universal',
      scale: '3x',
    },
  ],
  info: {
    author: 'xcode',
    version: 1,
  },
};

const iosArrayPosMedia = {
  '1x': 0,
  '2x': 1,
  '3x': 2,
};

const getDirectories = (source) =>
  fs
    .readdirSync(source, {withFileTypes: true})
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name + '/');

const getImages = (source) =>
  fs
    .readdirSync(source)
    .filter((file) => {
      return file.endsWith('.png');
    })
    .map((file) => {
      let key = file.replace('@2x', '').replace('@3x', '').replace('.png', '');
      return {key, filename: source + file};
    });

const getImagesForDirectories = () => {
  let images = [];
  getDirectories(basePath).forEach((directory) => {
    images = images.concat(getImages(basePath + directory));
  });
  return images;
};

const getEnumFileContent = (images) => {
  const keys = images
    .map((image) => {
      return `'${image.key}' = '${image.key}'`;
    })
    .join(',\n  ');

  return `export enum Images {
  ${keys}
  }`;
};

const getMediaTypeForFilename = (filename) => {
  if (filename.indexOf('@3x') !== -1) {
    return {android: 'xxhdpi', ios: '3x'};
  } else if (filename.indexOf('@2x') !== -1) {
    return {android: 'xhdpi', ios: '2x'};
  } else {
    return {android: 'mdpi', ios: '1x'};
  }
};

const getIosAssetsContentFileForFile = (filename) => {
  const contentFile = Object.assign({}, defaultIosAssetContent);
  const type = getMediaTypeForFilename(filename);
  const splittedFn = filename.split('/');
  const rootFilename = splittedFn[splittedFn.length - 1];

  const arrayPosition = iosArrayPosMedia[type.ios];
  contentFile.images[arrayPosition].filename = rootFilename;

  return contentFile;
};

const generate = () => {
  const enumFileContent = getEnumFileContent(getImagesForDirectories());
  fs.writeFileSync(resPath + '/images.tsx', enumFileContent, 'utf8');

  getImagesForDirectories().forEach((item) => {
    console.log(getIosAssetsContentFileForFile(item.filename));
  });
};

generate();
