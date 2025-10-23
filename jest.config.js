module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
        transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.[jt]s$': 'babel-jest',
    },

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@router/(.*)$': '<rootDir>/src/router/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@css/(.*)$': '<rootDir>/src/assets/css/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@views/(.*)$': '<rootDir>/src/views/$1',
        '^@composables/(.*)$': '<rootDir>/src/composables/$1',
        '^@store/(.*)$': '<rootDir>/src/store/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@libs/(.*)$': '<rootDir>/src/libs/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
};