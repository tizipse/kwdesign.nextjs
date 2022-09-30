/** @type {import('next').NextConfig} */
const path = require('path')
const {withSuperjson} = require('next-superjson')

module.exports = withSuperjson()({
    reactStrictMode: true,
    poweredByHeader: false,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
})
