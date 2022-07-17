const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/thoughts')
  .get(getAllThoughts)
  .post(createThought);

// /api/Thoughts/:id
router
  .route('/thoughts/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Add and delete reaction
router
    .route('/thoughts/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;
