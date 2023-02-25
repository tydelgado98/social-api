const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');


// router.use('/courses', courseRoutes);
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
module.exports = router;
