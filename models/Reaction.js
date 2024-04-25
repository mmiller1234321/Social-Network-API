const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectID,
            default: () => new Types.ObjectId(),

        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String, 
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    {
      toJSON: {
        virtuals: true
      },
      id: false
    }
);

reactionSchema.virtual('formatDate').get(function (){
  const time = new Date(this.createdAt);
  return time.toLocaleString('en-US')
})

module.exports = reactionSchema;