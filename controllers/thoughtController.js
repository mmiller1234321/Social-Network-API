const { ObjectId } = require('mongoose').Types;
const {User, Thought} = require('../models');

module.exports = {
    //GET all thoughts
    async getThoughts(req, res){
        try {
            const thought = await Thought.find();
            res.json(thought)
        }
        catch (err){
            return res.status(500).json(err);
        }
    },
    //GET single thought
    async getSingleThought(req, res){
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId});
            if (!thought){
                return res.status(404).json({ message: 'Thought not found'})
            }
            res.json(thought)
        }
        catch (err){
            return res.status(500).json(err);
        }
    },
    // POST thought
    async addThought(req, res){
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: { thoughts: thought._id}},
                { new: true}
            )
            res.json(thought)

        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // PUT thought
    async updateThought(req, res){
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body},
                { runValidators: true, new: true}
            );
            if (!thought){
                res.status(404).json({ message: 'Thought not found'});
            };
            res.json(thought)
        } catch (err){
            res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
    
          res.json({ message: 'Thought deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

    
    //POST reaction
    async addReaction(req, res){
        try {
           const thought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: req.body}},
            { runValidators: true, new: true}
           );

           if (!thought){
            return res.status(404).json({ message: 'Thought not found'})
           }

           res.json(thought);
        } catch (err){
            return res.status(500).json(err)
        }
    },
    //DELETE reaction
    async deleteReaction(req, res){
        try{
            const thought  = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: { reactions: {reactionId: req.params.reactionId}}},
                { runValidators: true, new: true}
            );

            if (!thought){
                res.status(404).json({ message: 'Thought not found'});
            }
            res.json({ message: 'Reaction deleted'})
        } catch (err){
            return res.status(500).json(err);
        }
    }
}