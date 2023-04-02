const z = require('zod');

const CreateChef = z
  .object({
    name: z.string(),
    country: z.string(),
    state: z.string(),
    experience: z.string().regex(new RegExp('[0-9]'),{message:"Enter Valid Number of Experience"}),
    foodCountry: z.string().array(),
    foodType: z.string().array(),
    dietaryType: z.string().array(),
    description: z.string(),
    profilePicture: z.string().optional(),
    dishImage: z.string().array().max(5).optional(),
    certificate: z.string().optional(),
    restaurantHouse:z.string().optional(),
  })
  .strict();


// -----   FUNCTIONS --------- //

function checkIfCreateChefIsValid(body) {
  return CreateChef.safeParse(body);
}


exports.checkIfCreateChefIsValid = checkIfCreateChefIsValid;
