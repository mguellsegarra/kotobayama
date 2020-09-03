const fs = require('fs');
const resPath = './src/res/';
const basePath = resPath + 'images/';
const iosAssets = 'Images.xcassets';
const assetExtension = '.imageset';
const pjson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const rimraf = require('rimraf');

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
      const fileLc = file.toLowerCase();
      return (
        fileLc.toLowerCase().endsWith('.jpg') ||
        fileLc.toLowerCase().endsWith('.jpeg') ||
        fileLc.toLowerCase().endsWith('.png')
      );
    })
    .map((file) => {
      let key = cleanMediaSuffixes(file).split('.')[0];

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

const getRootFilename = (filename) => {
  const splittedFn = filename.split('/');
  return splittedFn[splittedFn.length - 1];
};

const cleanMediaSuffixes = (filename) => {
  return filename.replace('@2x', '').replace('@3x', '');
};

const getIosAssetsContentFileForFile = (filename) => {
  const contentFile = Object.assign({}, defaultIosAssetContent);
  const type = getMediaTypeForFilename(filename);
  const rootFilename = getRootFilename(filename);

  const arrayPosition = iosArrayPosMedia[type.ios];
  contentFile.images[arrayPosition].filename = rootFilename;

  return contentFile;
};

const createIosAssetForFilename = (filename) => {
  const rootFilename = getRootFilename(filename);
  const cleanFilename = cleanMediaSuffixes(rootFilename).split('.')[0];
  const fileAssetFolder =
    './ios/' +
    pjson.name +
    '/' +
    iosAssets +
    '/' +
    cleanFilename +
    assetExtension;

  if (fs.existsSync(fileAssetFolder)) {
    rimraf.sync(fileAssetFolder);
  }
  fs.mkdirSync(fileAssetFolder);

  const contentJson = getIosAssetsContentFileForFile(filename);
  fs.writeFileSync(
    fileAssetFolder + '/Contents.json',
    JSON.stringify(contentJson, null, 2),
    'utf8',
  );
  fs.copyFileSync(filename, fileAssetFolder + '/' + rootFilename);
};

const createAndroidDrawablesForFilename = (filename) => {
  const rootFilename = getRootFilename(filename);
  const fileAssetFolder =
    './android/app/src/main/res/drawable-' +
    getMediaTypeForFilename(filename).android;

  if (!fs.existsSync(fileAssetFolder)) {
    fs.mkdirSync(fileAssetFolder);
  }

  fs.copyFileSync(
    filename,
    fileAssetFolder + '/' + cleanMediaSuffixes(rootFilename),
  );
};

const generate = () => {
  const imagesForDirectories = getImagesForDirectories();

  const enumFileContent = getEnumFileContent(imagesForDirectories);
  fs.writeFileSync(resPath + '/images.tsx', enumFileContent, 'utf8');

  imagesForDirectories.forEach((item) => {
    createIosAssetForFilename(item.filename);
    createAndroidDrawablesForFilename(item.filename);
  });
};

generate();
