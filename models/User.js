const { Schema, model } = require('mongoose');
const {Thought} = require('./Thought2');


const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }, 
        thoughts: [{type: Schema.Types.ObjectId, ref: 'thought'}],
        friends: [{type: Schema.Types.ObjectId, ref: 'user'}]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }, 
        id: false
    }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;