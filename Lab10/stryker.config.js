// stryker.conf.js

export default {
  testRunner: 'jest',
  jest: {
    projectType: 'custom',
    configFile: 'jest.config.js', 
    enableFindRelatedTests: false,
  },
  // Используй ignorePatterns вместо files
  ignorePatterns: [
    'node_modules',
    'reports',
    '!jest.config.js',  
    '!setup-chai.js',   
  ],
  reporters: ['html', 'progress'],
  logLevel: 'info',
  mutate: [
    'src/Graph.js', 
  ],
};