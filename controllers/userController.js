const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateuser } = require("../models/User");

/**
 *  @desc  Update User
 *  @route /api/users/:id
 *  @method PUT
 *  @access private ( user=> {id & token}  , admin=> {isAdmin & token}  )
 */
const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateuser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      },
    },
    { new: true }
  ).select("-password");
  res.status(200).json(updatedUser);
});

/**
 *  @desc  Get All Users
 *  @route /api/users
 *  @method GET
 *  @access private ( admin=> {isAdmin & token} )
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/**
 *  @desc  Get User
 *  @route /api/users/:id
 *  @method GET
 *  @access private ( user=> {id & token}  , admin=> {isAdmin & token}  )
 */
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

/**
 *  @desc  Delete User
 *  @route /api/users/:id
 *  @method DELETE
 *  @access private ( user=> {id & token}  , admin=> {isAdmin & token}  )
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "user has been deleted successfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

module.exports = {
  updateUser,
  getAllUsers,
  getUser,
  deleteUser,
};
