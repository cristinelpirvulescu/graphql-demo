const mongoose = require('mongoose');

mongoose.set('debug', true);

class DB {
  constructor(config) {
    this.connectionURI = DB.getConnectionString(config);
  }

  static getConnectionString() {
    return `mongodb://database:27017/graphql`;
  }

  connect() {
    return mongoose.connect(this.connectionURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  }
}

module.exports = DB;
