export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.[jt]s$': 'babel-jest',
    },

    moduleNameMapper: {
        '^@vue/test-utils$': '<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js',
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
    transformIgnorePatterns: [
        'node_modules/(?!(swiper|axios|pinia|vue-chartjs|vue3-carousel|@testing-library/vue)/)', 
        'node_modules/(?!.*(@iconify/vue|otros-paquetes-esm)/)',
    ],
};