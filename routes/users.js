const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const {
  updateUser,
  getAllUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");

router
  .route("/:id")
  .put(verifyTokenAndAuthorization, updateUser)
  .get(verifyTokenAndAdmin, getUser)
  .delete(verifyTokenAndAdmin, deleteUser);

router.get("/", verifyTokenAndAdmin, getAllUsers);

module.exports = router;
