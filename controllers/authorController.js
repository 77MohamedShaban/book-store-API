const {
  Author,
  validateCreateauthor,
  validateUpdateauthor,
} = require("../models/Author");
// instead of (try-catch) => express-async-handler
const asyncHandler = require("express-async-handler");

/**
 *  @desc  Get all authors
 *  @route /api/authors
 *  @method GET
 *  @access public
 */
const getAllAuthors = asyncHandler(async (req, res) => {
  const { pageNumber } = req.query; // skip
  const authorsPerPage = 2; // I can take it from query
  let authorlist;
  if (pageNumber) {
    authorlist = await Author.find()
      .skip((pageNumber - 1) * authorsPerPage)
      .limit(authorsPerPage);
    res.status(200).json(authorlist);
  } else {
    authorlist = await Author.find();
    // .sort({ firstName: 1 }) // sort by (firstName) from bigger to smaller
    // .select("firstName lastName -_id"); // just select (firstName-lastName) | do not show _id
  }

  res.status(200).json(authorlist);
});

/**
 *  @desc  Get autor by id
 *  @route /api/authors/:id
 *  @method GET
 *  @access public
 */
const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

/**
 *  @desc  Create new author
 *  @route /api/authors
 *  @method POST
 *  @access private ( admin=> {isAdmin & token} )
 */
const creatAuthor = asyncHandler(async (req, res) => {
  const { error } = validateCreateauthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  });
  const result = await author.save();
  res.status(201).json(result); // 201 => created successfully
});

/**
 *  @desc  Update author by id
 *  @route /api/authors/:id
 *  @method PUT
 *  @access private ( admin=> {isAdmin & token} )
 */
const updateAuthor = asyncHandler(async (req, res) => {
  const { error } = validateUpdateauthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedAuthor = await Author.findByIdAndUpdate(
    req.params.id,
    // Update
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      },
    },
    { new: true } // The new object appears to the user
  );
  if (updatedAuthor) {
    res.status(200).json(updatedAuthor);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

/**
 *  @desc  Delete a author by id
 *  @route /api/authors/:id
 *  @method DELETE
 *  @access  private ( admin=> {isAdmin & token} )
 */
const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Author has been delete" });
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

module.exports = {
  getAllAuthors,
  getAuthorById,
  creatAuthor,
  updateAuthor,
  deleteAuthor,
};
