const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const EntertainerSchema = new mongoose.Schema({


    name:{
        type: String,
        required:true
      },

      country:{
        type: String,
        required:true
      },
     
      state:{
        type: String,
        required:true
      },

      experience:{
        type: Number,
        required:true
      },

      genre:{
        type: [String],
        required:true
      },

      entertainerType:{
        type: [String],
        required:true
        },

        description:{
            type: String,
            required:true
          },

          uploadImage:{
            type: [String],
            default: undefined
          },

          user_id:{
            type: Schema.Types.ObjectId,
            ref : "User",
            required : true,
            unique: true
          },

}, {
    timestamps: true
});

EntertainerSchema.set("toJSON", {
  virtuals: true,
});


const Entertainer = new mongoose.model("Entertainer", EntertainerSchema);

module.exports = Entertainer;