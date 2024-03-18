// Import Required Modules
const Role = require('../models/roles-model');
const RelationshipTypes = require('../models/relationship-types-model');

// Roles Seeding Function
async function seedRoles() {
  // Check If Roles Exists Is Not Create Roles

  const roles = ['Administrator', 'Patient', 'Clinical Specialist', 'Surgeon', 'Physical Therapist', 'Strength Trainer']

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
    const relationshipTypes = ["Myself", "Child", "Other"]

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

// Initialize Seeding
exports.initializeSeeding = async () => {
  await seedRoles();
  await seedRelationshipType();
  console.log('Database Seeded Successfully');
};
