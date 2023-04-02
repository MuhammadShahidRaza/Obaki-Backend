const z = require('zod');

const CreateProperty = z
  .object({
    name: z.string(),
    country: z.string(),
    state: z.string(),
    zipcode: z.string(),
    typeOfStay: z.string().array(),
    typeOfRoom: z.string().array(),
    amenities: z.string().array(),
    sceneryType: z.string().array(),
    totalPerson: z.string(),
    PricePerNight:z.string(),
    bookingDate:z.string(),
    description: z.string(),
    propertyImages: z.string().array().max(5).optional(),
  })
  .strict();


// -----   FUNCTIONS --------- //

function checkIfCreatePropertyIsValid(body) {
  return CreateProperty.safeParse(body);
}


exports.checkIfCreatePropertyIsValid = checkIfCreatePropertyIsValid;
