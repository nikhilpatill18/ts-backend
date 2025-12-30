import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";
import { User_Profile } from "./user_profile.model";

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      // autoIncrement: true,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        // NOTE: normal function, NOT arrow
        const firstName = this.getDataValue("firstName");
        const lastName = this.getDataValue("lastName");
        return `${firstName} ${lastName}`;
      },
    },
    phoneNumber:{
      type:DataTypes.STRING,
      validate:{min:10}
    },
    isVerified:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    isProfileCompleted:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    otp:{
      type:DataTypes.STRING
    },
    otpExpiry:{
      type:DataTypes.DATE,
    }
  },
  {
    timestamps: true,
    tableName: "Users",
  },
);

Users.hasOne(User_Profile,{
  as:"user_details",
  foreignKey:"user_id",
  onDelete:"CASACDE"
});
User_Profile.belongsTo(Users,{
    foreignKey:"user_id",
    as:"user"
})


export {Users}

