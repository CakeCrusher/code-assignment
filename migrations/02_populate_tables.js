const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    // populate tables with data from sample_data/input_data.json
    await queryInterface.bulkInsert("creator", [
      {
        firstname: "John",
        lastname: "Doe",
      },
      {
        firstname: "Jane",
        lastname: "Doe",
      }
    ]);
    await queryInterface.bulkInsert("install", [
      {
        platform: "ios",
        country: "US",
        creator_id: 1,
      },
    ]);
    await queryInterface.bulkInsert("campaign", [
      {
        icon_url: "https://www.google.com",
        conversion_event: "install",
      }
    ]);
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete("creator", null, {});
    await queryInterface.bulkDelete("install", null, {});
    await queryInterface.bulkDelete("campaign", null, {});
  },
};
