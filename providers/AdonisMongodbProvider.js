const { ServiceProvider } = require('@adonisjs/fold');
const { MongoClient } = require('mongodb');

class AdonisMongodbProvider extends ServiceProvider {
    register() {
        this.app.singleton('Brito/Mongodb', () => {
            const Config = this.app.use('Adonis/Src/Config');
            return new (require('../src/AdonisMongodb'))({ Config, MongoClient });
        });
    }
}

module.exports = AdonisMongodbProvider;
