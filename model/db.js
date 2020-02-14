const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const mongoUrl = 'mongodb://localhost:27017/';
const dbName = 'exnode';
const colName = 'todolist';

const client = new MongoClient(mongoUrl);

client.connect().catch((err) => {
    console.log('Error: MongoDB connection failed');
    process.exit(1);
});

module.exports = {
    getAction,
    addAction,
    delAction,
    getAllAction,
    updateCheck
};

function getAllAction() {
    const db = client.db(dbName);
    const collection = db.collection(colName);
    /*   collection.find({}).toArray(function(err, result) {
          if (err) throw err;
          return result;
      }); */
    return collection.find({}).toArray();
}

function getAction(action) {
    const db = client.db(dbName);
    const collection = db.collection(colName);

    return collection.find({ action: action }).toArray();
}

function addAction(action) {
    const db = client.db(dbName);
    const collection = db.collection(colName);

    return collection.insertOne({ action: action, ischeck: 'false' });
}

function delAction(id) {
    const db = client.db(dbName);
    const collection = db.collection(colName);
    const query = { _id: objectId(id) }
    return collection.deleteOne(query);
}

function updateCheck(id, isCheck) {
    const db = client.db(dbName);
    const collection = db.collection(colName);
    const query = { _id: objectId(id) }
    const newQuery = { $set: { isCheck: isCheck } }

    return collection.updateOne(query, newQuery);
}