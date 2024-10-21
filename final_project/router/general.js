const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  const formattedBooks = JSON.stringify(books, null, 2);
  return res.status(200).send(formattedBooks);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  // Retrieve the ISBN from the request parameters
  const isbn = req.params.isbn;

  const book = books[isbn];

  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const authorName = req.params.author;
  const bookKeys = Object.keys(books);

  const booksByAuthor = bookKeys
    .map((key) => books[key])
    .filter((book) => book.author.toLowerCase() === authorName.toLowerCase());

  if (booksByAuthor.length === 0) {
    return res.status(404).json({ message: "No books found for this author" });
  }

  return res.status(200).json({ books: booksByAuthor });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const titleName = req.params.title;
  const bookKeys = Object.keys(books);

  const booksByTitle = bookKeys
    .map((key) => books[key])
    .filter((book) => book.title.toLowerCase() === titleName.toLowerCase());

  if (booksByTitle.length === 0) {
    return res.status(404).json({ message: "No books found with this title" });
  }
  return res.status(200).json({ books: booksByTitle });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
