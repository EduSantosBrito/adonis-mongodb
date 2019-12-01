const { ServiceProvider } = require('@adonisjs/fold');
const { MongoClient } = require('mongodb');

class AdonisMongodbProvider extends ServiceProvider {
    register() {
        this.app.singleton('Brito/Mongodb', () => {
            console.log('DEBUG:: Entered in provider');
            const Config = this.app.use('Adonis/Src/Config');
            console.log('Config Object -> ');
            console.dir(Config, { depth: null });
            return new (require('../src/AdonisMongodb'))({ Config, MongoClient });
        });
    }
}

module.exports = AdonisMongodbProvider;
