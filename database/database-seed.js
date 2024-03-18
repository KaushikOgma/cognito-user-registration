/* Seed Some data in the database */

// Import Required Modules
const AWS = require('aws-sdk');
const Role = require('../models/roles-model');
const RelationshipTypes = require('../models/relationship-types-model');
const VideoTypes = require('../models/video-types-model');
const Speciality = require('../models/speciality-model');
const InsuranceProvider = require('../models/insurance-provider-model');
const DocumentType = require('../models/document-types-model');
const Users = require('../models/users-model');

const {
  _s3AwsId,
  _s3AwsSecret,
  _snsAwsRegion,
  _cognitoAdminClientId,
  _cognitoAdminClientSecret,
  _cognitoAdminPoolId,
} = require('../helpers/settings-helper');
const { getRoleId, calculateSecretHash } = require('../helpers/auth-helper');

// Initialize AWS
AWS.config.update({
  accessKeyId: _s3AwsId,
  secretAccessKey: _s3AwsSecret,
  region: _snsAwsRegion,
});

// Roles Seeding Function
async function seedRoles() {
  // Check If Roles Exists Is Not Create Roles

  const roles = [
    'Administrator',
    'Patient',
    'Clinical Specialist',
    'Surgeon',
    'Physical Therapist',
    'Strength Trainer',
  ];

  for await (let role of roles) {
    try {
      const existingRole = await Role.findOne({
        where: {
          title: role,
        },
      });
      if (!existingRole) {
        await Role.create({
          title: role,
          description: role,
        });

        console.log(`Default ${role} Role Created`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log('Default Roles Created');
}

// Relationship Type Seeding Function
async function seedRelationshipType() {
  try {
    const relationshipTypes = ['Myself', 'Child', 'Other'];

    for await (let relationshipType of relationshipTypes) {
      try {
        const existingType = await RelationshipTypes.findOne({
          where: {
            type: relationshipType,
          },
        });
        if (!existingType) {
          await RelationshipTypes.create({
            type: relationshipType,
          });

          console.log(`Default ${relationshipType} RelationShip Type Created`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// Users Seeding Function
async function seedUsers() {
  // Check If Administrator Account Present
  const administratorRoleId = await getRoleId('Administrator');
  const administrators = await Users.count({
    where: {
      roleId: administratorRoleId,
    },
  });

  if (administrators === 0) {
    // Initiate The Administrator User Data
    const administratorUserInfo = {
      roleId: administratorRoleId,
      firstName: 'Tanmay',
      lastName: 'Paul',
      emailAddress: 'tanmay@appstango.com',
      gender: 'male',
      phoneCountryCode: '+91',
      phoneNumber: '8967902954',
      dob: '1997-10-12',
      userSettings: {
        isAvailable: false,
        isSuperAdmin: true,
        needToChangePassword: false,
      },
      accountStatus: 'approved',
    };

    // Create User In Cognito
    const poolData = {
      UserPoolId: _cognitoAdminPoolId,
      ClientId: _cognitoAdminClientId,
      ClientSecret: _cognitoAdminClientSecret,
    };
    const cognito = new AWS.CognitoIdentityServiceProvider({
      region: _snsAwsRegion,
    });

    // Initiate The Cognito Registration Process
    try {
      const adminUser = await cognito
        .adminGetUser({
          UserPoolId: _cognitoAdminPoolId,
          Username: administratorUserInfo.emailAddress,
        })
        .promise();
      // Assign Cognito User ID Into administratorUserInfo Object
      Object.assign(administratorUserInfo, {
        cognitoUserId: adminUser.Username,
      });
    } catch (error) {
      const registrationResponse = await cognito
        .signUp({
          ClientId: poolData.ClientId,
          Username: administratorUserInfo.emailAddress,
          Password: 'Tanmay@123',
          SecretHash: calculateSecretHash(
            poolData.ClientId,
            poolData.ClientSecret,
            administratorUserInfo.emailAddress
          ),
          UserAttributes: [
            {
              Name: 'given_name',
              Value: administratorUserInfo.firstName,
            },
            {
              Name: 'family_name',
              Value: administratorUserInfo.lastName,
            },
            {
              Name: 'email',
              Value: administratorUserInfo.emailAddress,
            },
          ],
        })
        .promise();

      // Assign Cognito User ID Into administratorUserInfo Object
      Object.assign(administratorUserInfo, {
        cognitoUserId: registrationResponse.UserSub,
      });
    }

    // Create User In Local DB
    await Users.create(administratorUserInfo);

    console.log('Default Administrator Created');
  }
}

// Video Types Seeding Function
async function seedVideoTypes() {
  // Check If  Roles Is Not Created or not
  const videoTypes = {
    'Surgeon': [
      {
        title: "Intro",
        description: "Intro video",
      },
      {
        title: "Speciality",
        description: "Speciality video",
      }
    ],
    'Physical Therapist': [
      {
        title: "Intro",
        description: "Intro video",
      },
      {
        title: "Speciality",
        description: "Speciality video",
      }
    ],
    'Strength Trainer': [
      {
        title: "Intro",
        description: "Intro video",
      },
      {
        title: "Speciality",
        description: "Speciality video",
      }
    ]
  };

  for await (let role of Object.keys(videoTypes)) {
    try{
      const existingRole = await Role.findOne({
        where: {
          title: role,
        },
      });
      if (existingRole) {
        types = videoTypes[role]
        for await (let type of types) {
          try {
            const existingRoleVideoType = await VideoTypes.findOne({
              where: {
                title: type.title,
                roleId: existingRole.id
              },
            });
            if (!existingRoleVideoType) {
              await VideoTypes.create({
                ...type,
                roleId: existingRole.id
              });
              console.log(`Default ${type.title} type Video Created for role ${role}`);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log('Default Video Types Created');
}

async function seedDocumentTypea() {
  // Check If  Roles Is Not Created or not
  const documentTypes = {
    'Surgeon': [
      {
        title: "Patient Paper Work",
        description: "New Patient Paper Work",
      }
    ],
    'Physical Therapist': [
      {
        title: "Patient Paper Work",
        description: "New Patient Paper Work",
      }
    ],
    'Strength Trainer': [
      {
        title: "Patient Paper Work",
        description: "New Patient Paper Work",
      }
    ]
  };

  for await (let role of Object.keys(documentTypes)) {
    try{
      const existingRole = await Role.findOne({
        where: {
          title: role,
        },
      });
      if (existingRole) {
        types = documentTypes[role]
        for await (let type of types) {
          try {
            const existingRoleDocumentType = await DocumentType.findOne({
              where: {
                title: type.title,
                roleId: existingRole.id
              },
            });
            if (!existingRoleDocumentType) {
              await DocumentType.create({
                ...type,
                roleId: existingRole.id
              });
              console.log(`Default ${type.title} type Document Created for role ${role}`);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log('Default Document Types Created');
}

async function seedSpecialities() {
  // Check If specialities Exists Is Not Create Roles

  const specialities = [
    'ACL',
    'Knee',
    'Shoulder'
  ];

  for await (let speciality of specialities) {
    try {
      const existingSpeciality = await Speciality.findOne({
        where: {
          title: speciality,
        },
      });
      if (!existingSpeciality) {
        await Speciality.create({
          title: speciality
        });

        console.log(`Default ${speciality} speciality Created`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log('Default specialities Created');
}


async function seedInsuarnces() {
  // Check If specialities Exists Is Not Create Roles

  const insurances = [
    'Aetna',
    'Blue Cross'
  ];

  for await (let insurance of insurances) {
    try {
      const existingInsurance = await InsuranceProvider.findOne({
        where: {
          title: insurance,
        },
      });
      if (!existingInsurance) {
        await InsuranceProvider.create({
          title: insurance
        });

        console.log(`Default ${insurance} insurance Created`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log('Default specialities Created');
}

// Initialize Seeding
exports.initializeSeeding = async () => {
  await seedRoles();
  await seedRelationshipType();
  await seedUsers();
  await seedVideoTypes();
  await seedDocumentTypea();
  await seedSpecialities();
  await seedInsuarnces();
  console.log('Database Seeded Successfully');
};
