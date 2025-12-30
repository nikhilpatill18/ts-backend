"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTs = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../db/sequelize");
exports.UserTs = sequelize_2.sequelize.define("UsersTs", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: sequelize_1.DataTypes.VIRTUAL,
        get() {
            // NOTE: normal function, NOT arrow
            const firstName = this.getDataValue("firstName");
            const lastName = this.getDataValue("lastName");
            return `${firstName} ${lastName}`;
        },
    },
}, {
    timestamps: true,
    tableName: "UsersTs",
});
//# sourceMappingURL=user-ts.model.js.map