const { MongoClient, ObjectId } = require('mongodb');

class BaseDAO {
  constructor(collectionName) {
    this.client = new MongoClient("mongodb://localhost:27017");
    this.dbName = "meubanco";
    this.collectionName = collectionName;
  }

  async connect() {
    if (!this.client.topology?.isConnected()) {
      await this.client.connect();
    }
    return this.client.db(this.dbName).collection(this.collectionName);
  }

  async findAll() {
    const collection = await this.connect();
    return collection.find().toArray();
  }

  async insertOne(doc) {
    const collection = await this.connect();
    return collection.insertOne(doc);
  }

  async deleteById(id) {
    const collection = await this.connect();
    return collection.deleteOne({ _id: new ObjectId(id) });
  }

  async findById(id) {
    const collection = await this.connect();
    return collection.findOne({ _id: new ObjectId(id) });
  }

}

module.exports = BaseDAO;
