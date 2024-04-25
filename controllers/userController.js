const { ObjectId } = require('mongoose').Types;
const {User, Thought} = require('../models');


module.exports = {
    //GET all users
    async getUsers(req, res){
        try {
            const users = await User.find();

            const userObj = {
                users
            }
            res.json(userObj)
        }
        catch (err){
            return res.status(500).json(err);
        }
    },

    //GET a single user
    async getSingleUser(req, res){
        try {
            const user = await User.findOne({ _id: req.params.userId}).populate({ path: 'thoughts', select: '-__v'}).select('-__v');
            if (!user){
                return res.status(404).json({ message: 'User not found'})
            }
            res.json(user)
        }
        catch (err){
            return res.status(500).json(err);
        }
    },
    //POST User
    async addUser(req, res){
        try{
           const user = await User.create(req.body);
           res.json(user);
        }  
        catch (err){
            return res.status(500).json(err)
        }
    },
    //PUT User
    async updateUser(req, res){
        try{
           const user = await User.findOneAndUpdate({ _id: req.params.userId}, {$set: req.body}, {runValidators: true, new: true}).select('-__v');
           if (!user){
                return res.status(404).json({ message: 'User not found'})
            }
            res.json({
                user
            })
        }  
        catch (err){
            return res.status(500).json(err)
        }
    },
    //DELETE User
    async deleteUser(req, res){
        try{
            const user = await User.findOneAndDelete({ _id: req.params.userId})

            if (!user){
                return res.status(404).json({message: 'User not found'})
            }
            res.json({ message: 'User deleted'});
        }
        catch(err) {
            return res.status(500).json(err)
        }
    },
    //POST Friend
    async addFriend(req, res){
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } }, 
                { runValidators: true, new: true}
            );
            if (!user) {
                return res.status(404).json({ message: 'User not found '});
            }
            res.json(user);
        } catch (err){
            return res.status(500).json(err)
        }
    },
    // DELETE Friend
    async removeFriend(req, res){
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId}}, 
                { runValidators: true, new: true}
            );
            if (!user){
                return res.status(404).json({ message: 'User not found'});
            }
            res.json(user);
        } catch (err){
            return res.status(500).json(err)
        }
    },
    //POST Thought
     async addThought(req, res){
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $addToSet: { thoughts: req.body }},
                {runValidators: true, new: true}
            )
            if (!user){
                return res.status(404).json({ message: 'Unable to add thought'})
            }
            res.json(user)
        } catch (err){
            return res.status(500).json({ message: 'Unable to add thought'})
        }
    }

}