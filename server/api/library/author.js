const { Schema, model, Types } = require('mongoose');

const AuthorSchema = new Schema({
  name: String,
  id: Schema.Types.ObjectId,
  books: [Schema.Types.ObjectId],
});

const AuthorModel = model('Author', AuthorSchema);

class Author extends AuthorModel {
  constructor(input) {
    const authorData = {
      ...input,
    };

    super(authorData);
  }

  static async getAll() {
    return this.find().lean({ virtuals: true });
  }

  static async getAuthor({ id, name }) {
    return this.findOne({ $or: [{ _id: id }, { name }] });
  }

  static async update(filter, data) {
    const author = await this.findOneAndUpdate(filter, data, {
      new: true,
      returnOriginal: true,
    });

    return author;
  }
}

module.exports = Author;
