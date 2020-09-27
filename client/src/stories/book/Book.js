import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import getBooksQuery from '../../graphql/queries/books.graphql';
import './book.css';

const GET_BOOKS_QUERY = gql`
  ${getBooksQuery}
`;

// console.log('GET_BOOKS_QUERY:::', GET_BOOKS_QUERY);

export const Book = ({ allBooks, authorId }) => {
  // console.log('GET_BOOKS_QUERY:::', GET_BOOKS_QUERY);
  // const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

  console.log('loading::::', loading);
  if (loading) {
    return 'Loading...';
  }

  if (error || !data.books) {
    return null;
  }

  return (
    <ul>
      {[].map((book) => (
        <li>
          ${book.title} - ${book.author.name}
        </li>
      ))}
    </ul>
  );
};

Book.propTypes = {
  allBooks: PropTypes.bool,
  authorId: PropTypes.string,
};
