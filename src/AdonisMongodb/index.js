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
        const { host, port } = Config;
        const url = `mongodb://${host}:${port}`;
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
        const { host, port } = this.Config;
        if (this.isConnected()) {
            return this.Client;
        }
        this.Client.connect(err => {
            if (err) {
                throw new Error(err);
            }
            console.log(`Connected successfully to server ${host}:${port}`);
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
