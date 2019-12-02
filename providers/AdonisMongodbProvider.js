const { ServiceProvider } = require('@adonisjs/fold');
const { MongoClient } = require('mongodb');

class AdonisMongodbProvider extends ServiceProvider {
    register() {
        this.app.singleton('MongoClient', () => {
            const Config = this.app.use('Adonis/Src/Config');
            return new (require('../src/AdonisMongodb'))({ Config, MongoClient });
        });
    }

    boot() {
        /** @type {import('../src/AdonisMongodb')} */
        const Client = this.app.use('MongoClient');
        Client.connect();
    }
}

module.exports = AdonisMongodbProvider;
