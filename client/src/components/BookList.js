import React, { Component } from 'react';
import  { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';



class BookList extends Component {
  constructor(){
    super()
    this.state={
      bookId: "",
    }
  }

  displayBooks(){
    let data = this.props.data;
    if (data.loading){
      return (<div>Loading Books...</div>)
    } else {
      return data.books.map((book) => (
        <li key={book.id} onClick={() => this.setState({bookId: book.id})}>{book.name}</li>
      ))
    }
  }

  render() {
    return (
      <div>
          <ul id="book-list">
            {this.displayBooks()}
          </ul>
          <BookDetails bookId={this.state.bookId}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
