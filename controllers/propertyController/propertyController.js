var Property = require('../../models/Property');
const mongoose = require('mongoose');

const { checkIfCreatePropertyIsValid } = require("../../validators/PropertyValidators");



async function getAllProperties(req, res) {
  try {
     const allProperties = await Property.find({});

     return res.status(200).send({
      success : true,
      data:  allProperties
    });

  }
  catch (error) {
     return res.status(400).send({
       success : false,
       message: error.message,
       errorCode: 400,
     });
  }
 };
 exports.getAllProperties = getAllProperties;



async function getProperty(req, res) {
  try {
   const {user_id} = req.user;

     const isProperty = await Property.findOne({
       user_id
     });

     if(isProperty)
     {
       return res.status(200).send({
         success : true,
         data:  isProperty
       });
     }

     return res.status(400).send({
      success : false,
      error:  "No data exist",
      errorCode: 400,
    });

  }
  catch (error) {
     return res.status(400).send({
       success : false,
       message: error.message,
       errorCode: 400,
     });
  }

 };
 exports.getProperty = getProperty;


async function CreateProperty(req, res) {
 try {
    const {user_id} = req.user;

    const {success , error} = checkIfCreatePropertyIsValid(req.body);

    if(!success)
    {
    return res.status(400).send({
        success : false,
        message: error.issues,
        errorCode: 400,
      });
    }

    const {...data }= req.body;


    const isProperty = await Property.findOne({
      user_id
    });

    if(isProperty)
    {
      return res.status(400).send({
        success : false,
        message: "Data Already exist.",
        errorCode: 400,
      });
    }




    const PropertyCreated= new Property({
      ...data,
      user_id
    });

    await PropertyCreated.save();

    return res.status(200).send({
      success : true,
      message: "Data Added Successfully",
    });

 }
 catch (error) {
    return res.status(400).send({
      success : false,
      message: error.message,
      errorCode: 400,
    });
 }

};
exports.CreateProperty = CreateProperty;


async function UpdateProperty(req, res) {
  try {
     const {user_id} = req.user;

     const {success , error} = checkIfCreatePropertyIsValid(req.body);

     if(!success)
     {
     return res.status(400).send({
         success : false,
         message: error.issues,
         errorCode: 400,
       });
     }

     const {...data }= req.body;

   

     const isProperty = await Property.findOne({
       user_id
     });

     if(!isProperty)
     {
       return res.status(400).send({
         success : false,
         message: "Data Does not exist",
         errorCode: 400,
       });
     }




     await Property.findOneAndUpdate(
      {
        user_id
      },
      {
        ...data,
        user_id
      },
      { new: true }
     );

     



     return res.status(200).send({
       success : true,
       message: "Data Updated Successfully",
     });

  }
  catch (error) {
     return res.status(400).send({
       success : false,
       message: error.message,
       errorCode: 400,
     });
  }

 };
 exports.UpdateProperty = UpdateProperty;


 async function DeleteProperty(req, res) {
  try {
   const {user_id} = req.user;

     const isProperty = await Property.findOne({
       user_id
     });

     if(!isProperty)
     {
       return res.status(400).send({
         success : false,
         message: "Data does not exist.",
         errorCode: 400,
       });
     }

     const propertyDeleted = await Property.deleteOne(
      {
        user_id
      },
     );

     if(!propertyDeleted.deletedCount)
     {
      return res.status(400).send(
        {
          success:false,
          message: "Data does not exist",
          errorCode: 400,
        });
    }

    return res.status(200).send(
      {
        success:true,
        message:"Data deleted successfully."
      });

  }
  catch (error) {
     return res.status(400).send({
       success : false,
       message: error.message,
       errorCode: 400,
     });
  }

 };
 exports.DeleteProperty = DeleteProperty;