module.exports = {
  testMatch: ["<rootDir>/tests/**/*.(test|spec).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "vue"], // Added 'json' and 'vue'
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest", // Transforms .vue files
    "^.+\\.js$": "babel-jest", // Transforms JavaScript files
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Map '@' to 'src' directory
    "\\.(css|less|sass|scss)$": "<rootDir>/tests/__mocks__/styleMock.js", // Mock CSS files
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"], // Fixes issues with certain dependencies
  },
};
