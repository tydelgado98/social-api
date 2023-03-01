const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
      reactionId: {
            type: Schema.Types.ObjectId,
            ref: 'reactionSchema',
          },
       reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        get: time => todo(time)
      },
    })

    module.exports = reactionSchema;