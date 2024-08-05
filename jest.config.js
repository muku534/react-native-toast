module.exports = {
    preset: 'react-native',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect',
        './jest.setup.js'
    ],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@react-native-community|@expo)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
