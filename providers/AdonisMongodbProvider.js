import { ServiceProvider } from '@adonisjs/fold';

class AdonisMongodbProvider extends ServiceProvider {
    register() {
        this.app.singleton('Brito/Mongodb', () => {
            const Config = this.app.use('Adonis/Src/Config');
            return new (require('../src/AdonisMongodb'))(Config);
        });
    }
}

export default AdonisMongodbProvider;
