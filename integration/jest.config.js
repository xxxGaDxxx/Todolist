module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js'],
    testTimeout:7000
};

//testTimeout:7000 если не успевает запустить  тест