module.exports = {
    testEnvironment: "jsdom",
  
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  
    transform: {
      "^.+\\.(ts|tsx)$": "babel-jest",
    },
  
    moduleNameMapper: {
      "\\.(css|scss|sass)$": "identity-obj-proxy",
    },
  
    testMatch: ["**/?(*.)+(test).[tj]s?(x)"],
  };
  