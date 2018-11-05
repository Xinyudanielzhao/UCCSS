var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    

var config = {
    production: {
        root: rootPath,
        app: { name: 'UCCSS' },
        port: 3300,
        db: 'mongodb://127.0.0.1/todo'

    },

};

module.exports = config[env];
