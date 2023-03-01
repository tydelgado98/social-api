const { Thought, User } = require('../models');

module.exports = {
  // Get all Thoughts
  async getThoughts(req, res)  { 
      const thought = await Thought.find();
      console.log(thought);
     return res.json(thought)
  },
  // Get a Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((Thought) => User.findOneAndUpdate(
        {username: Thought.username},
        {$push:{thoughts:Thought._id}},
        {new:true}
      )).then(data=>res.json(data))
      .catch((err) => res.status(500).json(err)); 
  },
  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : User.findOneAndUpdate({thoughts: req.params.thoughtId },
            {$pull:{thoughts: req.params.thoughtId}},
            {new:true}
          )
      )
      .then(() => res.json({ message: 'Thought is Gone Forever!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req,res) {
    Thought.findOneAndUpdate(
      {_id:req.params.thoughtId},
      {$addToSet:{reactions:req.body}},
      {runValidators:true, new:true}
    ).then(data=>{
      !data
      ? res.status(404).json({ message: 'No thought with this id!' })
      : res.json(data)
    })
  }
};