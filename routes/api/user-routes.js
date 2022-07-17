const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

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
    .router('/api/users/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;
