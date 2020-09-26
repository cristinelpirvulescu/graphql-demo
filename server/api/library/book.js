const { Schema, model, Types } = require('mongoose');

const BookSchema = new Schema({
  title: String,
  id: Schema.Types.ObjectId,
  authorId: Schema.Types.ObjectId,
});

const BookModel = model('Book', BookSchema);

class Book extends BookModel {
  constructor(input) {
    const bookData = {
      ...input,
    };

    super(bookData);
  }

  static async getAll() {
    return this.find().lean({ virtuals: true });
  }

  static async getBook(id) {
    return this.findOne({ _id: id });
  }

  static async update(filter, data) {
    const book = await this.findOneAndUpdate(filter, data, {
      new: true,
      returnOriginal: true,
    });

    return book;
  }
}

module.exports = Book;
