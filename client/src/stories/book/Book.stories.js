import React from 'react';

import { Book } from './Book';

const Template = (args) => <Book {...args} />;

export const AllBooks = Template.bind({});
AllBooks.args = {
  allBooks: true,
};

export const SingleBook = Template.bind({});
SingleBook.args = {
  authorId: '5f6e6f43ce43bf79695df7fc',
};

export default {
  title: 'Book',
  component: Book,
};
