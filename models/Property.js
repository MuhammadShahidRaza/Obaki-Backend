const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const PropertySchema = new mongoose.Schema({


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

      zipcode:{
        type: Number,
        required:true
      },

      typeOfStay:{
        type: String,
        required:true
      },

      typeOfRoom:{
        type: String,
        required:true
      },

      amenities:{
        type: [String],
        required:true
      },

      totalPerson:{
        type: Number,
        required:true
      },

      PricePerNight:{
        type: String,
        required:true
      },


      bookingDate:{
        type: Date,
        required:true
        },

        description:{
            type: String,
            required:true
          },

          propertyImages:{
            type: [String],
            maxlength: 5,
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

PropertySchema.set("toJSON", {
  virtuals: true,
});


const Property = new mongoose.model("Property", PropertySchema);

module.exports = Property;