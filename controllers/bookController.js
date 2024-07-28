const {
  Book,
  validateCreatebook,
  validateUpdatebook,
} = require("../models/Book");
const asyncHandler = require("express-async-handler");

/**
 *  @desc  Get all books
 *  @route /api/books
 *  @method Get
 *  @access public
 */
const getAllBooks = asyncHandler(async (req, res) => {
  //{$eq -$ne -$lt -$lte -$gt -$gte -$in[,] -$nin[,]}
  const { minprice, maxprice } = req.query;
  let books;
  if (minprice && maxprice) {
    books = await Book.find({
      price: { $gte: minprice, $lte: maxprice },
    }).populate("author", ["_id", "firstName", "lastName"]);
  } else {
    books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
  }

  res.status(200).json(books);
});

/**
 *  @desc  Get book by id
 *  @route /api/books/:id
 *  @method GET
 *  @access public
 */
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 *  @desc  Create new book
 *  @route /api/books
 *  @method POST
 *  @access  private ( admin=> {isAdmin & token} )
 */
const createBook = asyncHandler(async (req, res) => {
  const { error } = validateCreatebook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  //Create prosses
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  });
  const result = await book.save();
  res.status(201).json(result);
});

/**
 *  @desc   Update book by id
 *  @route /api/books/:id
 *  @method PUT
 *  @access  private ( admin=> {isAdmin & token} )
 */
const updateBook = asyncHandler(async (req, res) => {
  const { error } = validateUpdatebook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  //Update prosses
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
      },
    },
    { new: true }
  );
  if (updatedBook) {
    res.status(200).json({ message: "Book has been update" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 *  @desc  Delete a book by id
 *  @route /api/books/:id
 *  @method DELETE
 *  @access  private ( admin=> {isAdmin & token} )
 */
const deleteBook = asyncHandler(async (req, res) => {
  //Delete prosses
  const deletedBook = await Book.findById(req.params.id);
  if (deletedBook) {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book has been delete" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
