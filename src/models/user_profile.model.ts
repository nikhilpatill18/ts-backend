import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";
import { Users } from "./user.model";
const User_Profile = sequelize.define(
  "Users_Profile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUID,
      primaryKey:true
    },

    user_id: {
      type: DataTypes.UUID,
      references:{
        model:'Users',
        key:"id"
      },
      allowNull: false,
    },

    underGraduation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     underGraduationyear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     postGraduation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     postGraduationYear: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    previousExperience: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    state:{ 
        type:DataTypes.UUID,
        allowNull:false
    },
    city:{
        type:DataTypes.UUID,
        allowNull:false
    },
    skills:{
        type:DataTypes.JSON,
        allowNull:false
    },
    isStudying:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
  },
  {
    timestamps: true,
    tableName: "Users_Profile",
  },

);


export {User_Profile}




