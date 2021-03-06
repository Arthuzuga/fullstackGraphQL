const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/mongoDB/book');
const Author = require('../models/mongoDB/author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    // fields is a function to hold the declaration of types after the code run, if it's a simple object the author's propety doesn't recognize its type
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parentValue, agrs) {
                //return the author name
                //parentValue is used to give a reference to the resolve method about the context that is inside
                //return _.find(authorsArray,{id: parentValue.authorId})
                return Author.findById(
                    parentValue.authorId
                )
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args) {
                //return books array based in author's id
                //return _.filter(booksArray, {authorId: parentValue.id})
                return Book.find({
                    authorId: parentValue.id
                })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: (GraphQLID)
                }
            },
            resolve(parentValue, args) {
                //code to get data from db / outher source
                return Book.findById(args.id);

            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args) {
                //return all books from booksArray
                return Book.find({});

            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: (GraphQLID)
                }
            },
            resolve(parentValue, agrs) {
                //some code to get data from db
                return Author.findById(args.id)
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parentValue, args) {
                //return all authors from authorArray
                return Author.find({});
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
            },
            resolve(parentValue, args) {
                //configuration for mongoDB
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        updateAuthor: {
            type: AuthorType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                },
                name: {
                    type: GraphQLString,
                },
                age: {
                    type: GraphQLInt,
                },
            },
            resolve(parentValue, args) {
                if (args.name)
                    Author.updateOne(Author.findById(args.id), {
                        $set: {
                            name: args.name
                        }
                    }, (err, obj) => {
                        if (err) throw err;
                        console.log("Author's name was edited");
                    })
                if (args.age)
                    Author.updateOne(Author.findById(args.id), {
                        $set: {
                            age: args.age
                        }
                    }, (err, obj) => {
                        if (err) throw err;
                        console.log("Author's age was edited");
                    })
                return Author.findById(args.id);
            }
        },
        deleteAuthor: {
            type: AuthorType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
            },
            resolve(parentValue, args) {
                Author.deleteOne(Author.findById(args.id), (err, obj) => {
                    if (err) throw err;
                    console.log("Author deleted, id: ", args.id);
                });
                return Author.find({});
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID),
                }
            },
            resolve(parentValue, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                });
                return book.save();
            }
        },
        deleteBook: {
            type: BookType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
            },
            resolve(parentValue, args) {
                Book.deleteOne(Book.findById(args.id), (err, obj) => {
                    if (err) throw err;
                    console.log("Book deleted, id: ", args.id);
                });

                return Book.find({});
            }
        },
        updateBook: {
            type: BookType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                },
                name: {
                    type: GraphQLString,
                },
                genre: {
                    type: GraphQLString,
                },
            },
            resolve(parentValue, args) {
                if (args.name)
                    Book.updateOne(Book.findById(args.id), {
                        $set: {
                            name: args.name
                        }
                    }, (err, obj) => {
                        if (err) throw err;
                        console.log("Book's name was edited");
                    })
                if (args.genre)
                    Book.updateOne(Book.findById(args.id), {
                        $set: {
                            genre: args.genre
                        }
                    }, (err, obj) => {
                        if (err) throw err;
                        console.log("Book's genre was edited");
                    })
                return Book.findById(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})