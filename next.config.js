/** @type {import('next').NextConfig} */

const path = require('path');
const {withSuperjson} = require('next-superjson');

module.exports = withSuperjson()({
    reactStrictMode: false,
    poweredByHeader: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
})
