// Import Required Modules
const sequelize = require('./utilities/database');
const Patients = require('./models/patients-model');

async function add_patient(data){
  try{
    // check if the patient already exits with email id
    const existingPatient = await Patients.findOne({
      where: {
        emailAddress: data.email,
        cognitoUserId: data.sub
      },
    });

    if (!existingPatient) {
      // create new patient
      // await Patients.create({
      //   emailAddress: data.email,
      //   cognitoUserId: data.sub
      // });
      console.log(`Patient ${data.email} Created`);
    } else {
      console.log(`Patient (${data.email} - ${data.sub}) already exists`);
    }
  } catch (error) {
    console.log(error);
  }
}

// Lambda handler function
exports.handler = async (event, context) => {
  // // Sync Sequelize DB
  // await sequelize.sync();

  console.log("event:: ",event)
  console.log("event.request.userAttributes:: ",event.request.userAttributes)
  if (event.request.userAttributes.email){
    await add_patient(event.request.userAttributes)
  }
  console.log("event.request.clientMetadata:: ",event.request.clientMetadata)
  return event;
};
