const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            require: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: false
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

thoughtSchema.virtual('formatDate').get(function (){
    const time = new Date(this.createdAt);
    return time.toLocaleString('en-US')
  });


const Thought = model('thought', thoughtSchema);
module.exports = Thought, thoughtSchema;