import type { Sequelize } from "sequelize";

const db = require("../../models");

export const sequelize: Sequelize = db.sequelize;
export const SequelizeLib = db.Sequelize;
