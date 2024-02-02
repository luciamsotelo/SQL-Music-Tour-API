// FOLDER - models- FILE - stage.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    static associate ({ Event, StageEvent, SetTime }) {
      // EVENTS
      Stage.belongsToMany (Event, {
        foreignKey: "stage_id",
        as: "events",
        through: StageEvent
      })
      // SET TIMES
      Stage.hasMany(SetTime, {
        foreignKey: "stage_id",
        as: "set_times"
      })
    }
    static associate(models) {
      // define association here
    }
  }
  Stage.init(
    {
    stage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
  }, 
},
  {
    sequelize,
    modelName: 'Stage',
    tableName: 'stages',
    timestamps: false,
  });
  return Stage;
};