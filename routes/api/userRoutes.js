const router = require('express').Router();
const {
    getUsers, getSingleUser, addUser, updateUser, deleteUser, addFriend, removeFriend, addThought
    } = require('../../controllers/userController');

router.route('/').get(getUsers).post(addUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/thoughts').post(addThought);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

//Extra Credit: DELETE user and all their thoughts

module.exports = router;