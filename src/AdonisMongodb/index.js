/**
 * adonis-mongodb is a provider that gives you power to use MongoDB whitout limitation
 *
 * @constructor
 * @singleton
 * @uses (['Adonis/Src/Config'])
 *
 * @class AdonisMongodb
 */
class AdonisMongodb {
    constructor({ Config, MongoClient }) {
        this.Config = Config;
        this.host = this.Config.get('mongodb.host');
        this.port = this.Config.get('mongodb.port');
        this.dbName = this.Config.get('mongodb.dbName');
        this.url = `mongodb://${this.host}:${this.port}`;
        this.Client = MongoClient;
    }

    /**
     * Check if there's existing connections
     *
     * @method isConnected
     *
     * @return {Boolean}
     */
    isConnected() {
        return !!this.db;
    }

    /**
     * Creates a new database connection for the config defined inside
     * `config/mongodb` file. If there's existing connections, this method
     * will reuse and returns it.
     *
     * @method connect
     *
     * @return
     */
    async connect() {
        if (this.isConnected()) {
            console.log('Client is already connected, returning...');
            return this.db;
        }
        this.db = (await this.Client.connect(this.url, { useNewUrlParser: true })).db(this.dbName);
        return this.db;
    }

    /**
     * Closes the connection
     *
     * @method close
     *
     * @return {void}
     */
    close() {
        this.Client.close();
        console.log(`Connection closed successfully.`);
    }
}

module.exports = AdonisMongodb;
