
var Entertainer = require('../../models/Entertainer');
const mongoose = require('mongoose');

const { checkIfCreateEntertainerIsValid } = require("../../validators/EntertainerValidator");
const { isNumber } = require('../../helperFunction/isNumber');


async function getAllEntertainers(req, res) {
  try {
     const allEntertainers = await Entertainer.find({});

     return res.status(200).send({
      success : true,
      data:  allEntertainers
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
 exports.getAllEntertainers = getAllEntertainers;



async function getEntertainer(req, res) {
  try {
   const {user_id} = req.user;

     const isEntertainer = await Entertainer.findOne({
       user_id
     });

     if(isEntertainer)
     {
       return res.status(200).send({
         success : true,
         data:  isEntertainer
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
 exports.getEntertainer = getEntertainer;


async function CreateEntertainer(req, res) {
 try {
    const {user_id} = req.user;

    const {success , error} = checkIfCreateEntertainerIsValid(req.body);

    if(!success)
    {
    return res.status(400).send({
        success : false,
        message: error.issues,
        errorCode: 400,
      });
    }

    const {experience, ...data }= req.body;

    const isValidExperience = isNumber(experience);

    if(!isValidExperience){
      return res.status(400).send({
        success : false,
        message: "Enter Valid Experience",
        errorCode: 400,
      });
    }

    const isEntertainer = await Entertainer.findOne({
      user_id
    });

    if(isEntertainer)
    {
      return res.status(400).send({
        success : false,
        message: "Data Already exist.",
        errorCode: 400,
      });
    }



    const EntertainerCreated= new Entertainer({
      ...data,
      experience:parseInt(experience),
      user_id
    });

    await EntertainerCreated.save();

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
exports.CreateEntertainer = CreateEntertainer;


async function UpdateEntertainer(req, res) {
  try {
     const {user_id} = req.user;

     const {success , error} = checkIfCreateEntertainerIsValid(req.body);

     if(!success)
     {
     return res.status(400).send({
         success : false,
         message: error.issues,
         errorCode: 400,
       });
     }

     const {experience, ...data }= req.body;

     const isValidExperience = isNumber(experience);

     if(!isValidExperience){
       return res.status(400).send({
         success : false,
         message: "Enter Valid Experience",
         errorCode: 400,
       });
     }

     const isEntertainer = await Entertainer.findOne({
       user_id
     });

     if(!isEntertainer)
     {
       return res.status(400).send({
         success : false,
         message: "Data Does not exist",
         errorCode: 400,
       });
     }


     await Entertainer.findOneAndUpdate(
      {
        user_id
      },
      {
        ...data,
        experience:parseInt(experience),
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
 exports.UpdateEntertainer = UpdateEntertainer;


 async function DeleteEntrtainer(req, res) {
  try {
   const {user_id} = req.user;

     const isEntertainer = await Entertainer.findOne({
       user_id
     });

     if(!isEntertainer)
     {
       return res.status(400).send({
         success : false,
         message: "Data does not exist.",
         errorCode: 400,
       });
     }

     const entertainerDeleted = await Entertainer.deleteOne(
      {
        user_id
      },
     );

     if(!entertainerDeleted.deletedCount)
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
 exports.DeleteEntrtainer = DeleteEntrtainer;