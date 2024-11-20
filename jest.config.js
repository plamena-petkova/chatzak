// jest.config.js
module.exports = {
    transformIgnorePatterns: ['node_modules/(?!(swiper|ssr-window|dom7)/)'],
    moduleNameMapper: {
      '^swiper/css$': '<rootDir>/path/to/your/mock/css/file', // Adjust as necessary
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  };