const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../utils/database");

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "Andree",
    },
    lastname: {
      type: DataTypes.STRING(30),
      defaultValue: "Chiquis",
    },
    username: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    emailVerifed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        try {
          const salt = await bcrypt.genSalt(10);
          const passwodHash = await bcrypt.hash(user.password, salt);
          user.password = passwodHash;
        } catch (error) {
          throw error;
        }
      },
    },
  }
);

module.exports = Users;
