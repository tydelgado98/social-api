const router = require('express').Router();
const {
  getThoughts,
  addReaction,
  getSingleThought,
  createThought,
  deleteThought,
} = require('../../controllers/thoughtController');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction).delete();
module.exports = router;