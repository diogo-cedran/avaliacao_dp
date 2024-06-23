module.exports = {
    roots: ['<rootDir>/test/src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '.spec.ts$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  