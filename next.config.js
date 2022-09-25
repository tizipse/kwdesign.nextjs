/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
    reactStrictMode: true,
    poweredByHeader: false,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
}
