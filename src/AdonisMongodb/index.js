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
        this.url = `mongodb://${this.host}:${this.port}/${this.dbName}`;
        this.Client = MongoClient;
        this.connect();
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
    connect() {
        if (this.isConnected()) {
            console.log('Client is already connected, returning...');
            return this.db;
        }
        this.Client.connect(this.url, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                throw new Error(err);
            }
            console.log(`Connected successfully to server ${this.host}:${this.port}`);
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
