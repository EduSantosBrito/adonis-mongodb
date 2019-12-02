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
    constructor({ Config, MongoClient, ObjectID }) {
        this.Config = Config;
        this.ObjectID = ObjectID;
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
        await this.Client.connect(this.url, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                throw new Error(err);
            }
            this.db = client.db(this.dbName);
            console.log(`Connected successfully to ${this.host}:${this.port}/${this.dbName}`);
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

    /**
     * Update a single document
     *
     * @private
     * @param {String} collection
     * @param {Object} document
     */
    async updateDocument(collection, document) {
        await this.db
            .collection(collection)
            .updateOne({ _id: this.ObjectID(document._id) }, { $set: { ...document, updatedAt: new Date() } });
        return this.db.collection(collection).findOne({ _id: this.ObjectID(document._id) });
    }

    /**
     * Create a single document
     *
     * @private
     * @param {String} collection
     * @param {Object} document
     */
    async createDocument(collection, document) {
        const documentId = new this.ObjectID();
        await this.db.collection(collection).insertOne({ ...document, createdAt: new Date(), updatedAt: new Date(), _id: documentId });
        return this.db.collection(collection).findOne({ _id: documentId });
    }

    /**
     * Check if document exists
     * @private
     * @param {String} collection
     * @param {*} _id
     * @returns {Boolean}
     */
    async documentExists(collection, _id) {
        const document = await this.db.collection(collection).findOne({ _id: this.ObjectID(_id) }, { _id: 1 });
        return !!document;
    }

    /**
     * Create or update a single document
     *
     * @param {String} collection
     * @param {Object} document
     */
    async createOrUpdate(collection, document) {
        console.log('DEBUG:: document', document);
        console.log('DEBUG:: document._id && !this.ObjectID.isValid(document._id)', document._id && !this.ObjectID.isValid(document._id));
        console.log(
            'DEBUG:: document._id && this.documentExists(collection, document._id)',
            document._id && this.documentExists(collection, document._id),
        );
        if (document._id && !this.ObjectID.isValid(document._id)) {
            throw new Error('Invalid ObjectId');
        } else if (document._id && this.documentExists(collection, document._id)) {
            return this.updateDocument(collection, document);
        } else {
            return this.createDocument(collection, document);
        }
    }
}

module.exports = AdonisMongodb;
