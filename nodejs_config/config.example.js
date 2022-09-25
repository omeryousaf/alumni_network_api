exports.App = {
    CouchServerIp: 'http://username:password@127.0.0.1:5984', //credentials should be replaced with couchdb credentials
    server: {
        ip: 'http://127.0.0.1',
        port: '3001',
        env: 'dev'
    },
    whiteListedClients: ['http://127.0.0.1:8000', 'http://localhost:8000'],
    mailGunApiKey: 'mailGunKeyHere',
    mailGunDomain : 'mailGunDomainHere',
    secretKey : 'secretKeyHere',
    httpStatuses: {
    	OK: 200,
    	SESSION_EXPIRED: 419,
        LOGOUT: 420
    }
};