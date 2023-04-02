const z = require('zod');

const CreateEntertainer= z
  .object({
    name: z.string(),
    country: z.string(),
    state: z.string(),
    experience: z.string().regex(new RegExp('[0-9]'),{message:"Enter Valid Number of Experience"}),
    genre: z.string(),
    entertainerType: z.string(),
    description: z.string(),
    uploadImage: z.string().optional(),
   
  })
  .strict();


// -----   FUNCTIONS --------- //

function checkIfCreateEntertainerIsValid(body) {
  return CreateEntertainer.safeParse(body);
}


exports.checkIfCreateEntertainerIsValid = checkIfCreateEntertainerIsValid;