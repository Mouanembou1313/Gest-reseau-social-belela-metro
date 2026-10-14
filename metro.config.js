const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
    server: {
        // Evite l'erreur de lecture multipart d'Android pendant le chargement du bundle.
        enhanceMiddleware: (middleware) => (req, res, next) => {
            if (req.url && req.url.split('?')[0].endsWith('.bundle')) {
                req.headers.accept = 'application/javascript';
            }
            return middleware(req, res, next);
        },
    },
    resolver: {
        assetExts: [...defaultConfig.resolver.assetExts, 'ttf', 'otf'],
    },
};

module.exports = mergeConfig(defaultConfig, config);
