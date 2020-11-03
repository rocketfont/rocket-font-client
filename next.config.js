module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/fonts',
                permanent: true,
            },
        ]
    },
}