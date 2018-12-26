import React, { Component } from 'react';
import  { graphql,compose  } from 'react-apollo'
import {getAuthorsQuery, addBookMutations, getBooksQuery} from '../queries/queries';



class AddBook extends Component {
    constructor() {
        super()
        this.state= {
            authorId: "",
            bookName: "",
            bookGenre: ""
        }
    }

  displayAuthors(){
    let data = this.props.getAuthorsQuery;
    if (data.loading){
      return (<option disabled={true}>Loading Authors...</option>)
    } else {
      return data.authors.map((author) => (
        <option value={author.id} key={author.id}>{author.name}</option>
      ))
    }
  }

  handleAuthorSelectChange = (authorId) => {
      this.setState({
          authorId,
      })
  }

  handleBookNameChange = (bookName) => {
      this.setState({
          bookName,
      })
  }
  handleBookGenreChange = (bookGenre) => {
      this.setState({
          bookGenre,
      })
  }

  sendBooksInfo = () => {
      console.log(this.state);
     this.props.addBookMutations({
         variables: {
            name: this.state.bookName, 
            genre: this.state.bookGenre, 
            authorId: this.state.authorId
        },
        refetchQueries: [{
            query: getBooksQuery
        }]
    })
  }

  render() {
    return (
            <div>
                <input placeholder="Book's Name" value={this.state.bookName} onChange={(e) => this.handleBookNameChange(e.target.value)}/>
                <input placeholder="Book's Genre" value={this.state.bookGenre} onChange={(e) => this.handleBookGenreChange(e.target.value)}/>
                <select onChange={(e) => this.handleAuthorSelectChange(e.target.value)}>
                    <option value={null}>Select an author</option>
                    {this.displayAuthors()}
                </select>
                <button onClick={this.sendBooksInfo}>Add Book into Database</button>
            </div>
    );
  }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutations, {name: "addBookMutations"})
    )(AddBook);
