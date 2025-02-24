const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllAuthors,
  getAuthorById,
  creatAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

//   /api/authors
router.route("/").get(getAllAuthors).post(verifyTokenAndAdmin, creatAuthor);

//   /api/authors/:id
router
  .route("/:id")
  .get(getAuthorById)
  .put(verifyTokenAndAdmin, updateAuthor)
  .delete(verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
