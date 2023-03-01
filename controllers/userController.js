const { User } = require('../models');


module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const user =  await User.find();
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  
   // .then( (Users) => {
      //    res.json(Users);
      // })
      // .catch((err) => {
      //   console.log(err);
      //   return res.status(500).json(err);
      // });

  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json({
              User,
              grade: await grade(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a User and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No such User exists' })
          : User.findOneAndUpdate(
              { friends: req.params.userId },
              { $pull: { friends: req.params.userId } },
              { new: true }
            )
      )
      .then((userData) =>
        !userData
          ? res.status(404).json({
              message: 'User deleted, but no friends found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a User
  addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a User
  removeAssignment(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
};
