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
        this.host = this.Config.get(`mongodb.host`);
        this.port = this.Config.get(`mongodb.port`);
        const url = `mongodb://${this.host}:${this.port}`;
        const client = new MongoClient(url);
        this.Client = client;
    }

    /**
     * Check if there's existing connections
     *
     * @method isConnected
     *
     * @return {Boolean}
     */
    isConnected() {
        return !!this.Client && !!this.Client.topology && this.Client.topology.isConnected();
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
            return this.Client;
        }
        this.Client.connect(err => {
            if (err) {
                throw new Error(err);
            }
            console.log(`Connected successfully to server ${this.host}:${this.port}`);
        });
        return this.Client;
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
