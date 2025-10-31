const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { User } = require("./userModel");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Associations
Task.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Task, { foreignKey: "userId" });

module.exports = { Task };
