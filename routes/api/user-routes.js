const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controller.js');

// /api/user
router
  .route('/api/users')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/api/users/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Add and delete friends
router
    .route('/api/users/:userId/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
