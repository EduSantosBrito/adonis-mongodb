const { ServiceProvider } = require('@adonisjs/fold');
const { MongoClient, ObjectID } = require('mongodb');

class AdonisMongodbProvider extends ServiceProvider {
    register() {
        this.app.singleton('MongoClient', () => {
            const Config = this.app.use('Adonis/Src/Config');
            return new (require('../src/AdonisMongodb'))({ Config, MongoClient, ObjectID });
        });
    }

    boot() {
        /** @type {import('../src/AdonisMongodb')} */
        const Client = this.app.use('MongoClient');
        Client.connect();
    }
}

module.exports = AdonisMongodbProvider;
