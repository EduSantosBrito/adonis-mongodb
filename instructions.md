## Registering provider

Make sure to register the adonis-mongodb provider to make use of `MongoClient`. The providers are registered inside `start/app.js`

```js
const providers = ['adonis-mongodb/providers/AdonisMongodbProvider'];
```

### Config mongodb collection

the config automatic create to `config/mongodb.js` file

```js
module.exports = {
    host: Env.get('DB_HOST', 'localhost'),
    port: Env.get('DB_PORT', 27017),
    username: Env.get('DB_USER', 'admin'),
    password: Env.get('DB_PASSWORD', ''),
    database: Env.get('DB_DATABASE', 'adonis'),
    options: {
        // authSource: Env.get('DB_AUTH_SOURCE', '')
    },
};
```

## Usage

Once done you can access `Database` provider and run mongo queries as follows.

```js
const MongoClient = use('MongoClient')
const { ObjectID } = use('mongodb')

await MongoClient.collection('users').find().toArray()

await MongoClient.collection('users').findOne(_id: ObjectID('5de505539f99ff6318da7292'))

await MongoClient.collection('users').aggregate([
    {
        $match: {
            _id: {
                $eq: ObjectID('5de505539f99ff6318da7292')
            }
        }
    }
]).toArray()
```