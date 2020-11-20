const SiteConfig = Object.seal({
    // must not end with '/'
    djangoApiBackend : 'http://localhost:8000',
    playApiBackend : 'https://api-backend.localhost.rocketfont.net/backoffice',
    fontCdnURL : 'https://cdn.localhost.rocketfont.net/fonts/api/v1/fonts',
    fontMeasureURL: 'https://font-measure.localhost.rocketfont.net/fontUsageMeasure/api/v1/fontUsageMeasure'
})

export default SiteConfig;