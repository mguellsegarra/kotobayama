module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '^@library/(.+)': './src/library/\\1',
          '^@screens/(.+)': './src/screens/\\1',
          '^@res/(.+)': './src/res/\\1',
          '^@assets/(.+)': './src/assets/\\1',
        },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
      },
    ],
  ],
};
