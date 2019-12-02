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
        this.username = this.Config.get('mongodb.username');
        this.password = this.Config.get('mongodb.password');
        this.dbName = this.Config.get('mongodb.database');
        this.options = this.Config.get('mongodb.options');
        if (this.username && this.password !== null && this.options.authSource) {
            this.url = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.dbName}?authSource=${this.options.authSource}`;
        }
        if (this.username && this.password !== null && !this.options.authSource) {
            this.url = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.dbName}`;
        }
        if (!this.username && !this.password) {
            this.url = `mongodb://${this.host}:${this.port}/${this.dbName}`;
        }
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
        console.log('Connection url', this.url);
        await this.Client.connect(this.url, { useNewUrlParser: true }, (err, db) => {
            console.log('DEBUG:: DB', db);
            this.db = db;
        });
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
