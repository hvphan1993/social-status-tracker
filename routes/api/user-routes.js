const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
  iLive
} = require('../../controllers/user-controller.js');

// /api/alive
router
  .route('/api/alive')
  console.log("It works!");

// /api/user
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Add and delete friends
router
    .route('/:id/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
