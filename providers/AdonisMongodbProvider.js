import { ServiceProvider } from '@adonisjs/fold';
import { MongoClient } from 'mongodb';

class AdonisMongodbProvider extends ServiceProvider {
    register() {
        this.app.singleton('Brito/Mongodb', () => {
            const Config = this.app.use('Adonis/Src/Config');
            return new (require('../src/AdonisMongodb'))({ Config, MongoClient });
        });
    }
}

export default AdonisMongodbProvider;
