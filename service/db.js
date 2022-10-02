
require('dotenv').config();
const os = require('os');
const { Umzug, SequelizeStorage } = require("umzug");
const { Sequelize } = require('sequelize');

console.log("process.env.DB_URL", process.env.DB_URL);
const sequelize = new Sequelize(process.env.DB_URL);

const migrationConf = {
    migrations: {
        glob: "./migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
};

const runMigrations = async () => {
    const migrator = new Umzug(migrationConf);
    const migrations = await migrator.up();
    console.log("Migrations up to date", {
        files: migrations.map((mig) => mig.name),
    });
};

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await runMigrations();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    return null;
};

const rollbackMigrations = async () => {
    await sequelize.authenticate();
    const migrator = new Umzug(migrationConf);
    await migrator.down();
};

module.exports = {
    connectToDatabase,
    rollbackMigrations,
    sequelize,
}