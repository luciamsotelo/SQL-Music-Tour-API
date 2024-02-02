'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Set_Time extends Model {
    static associate({ Band, Event, Stage }) {
      // BAND
      Set_Time.belongsTo(Band, {
          foreignKey: "band_id",
          as: "band",
      })
       // EVENT
    Set_Time.belongsTo(Event, {
      foreignKey: "event_id",
      as: "event"
    })
    // STAGE
    Set_Time.belongsTo(Stage, {
      foreignKey: "stage_id",
      as: "stage"
    })
    }
    static associate(models) {
      // define association here
    }
  };
  Set_Time.init(
    {
    set_time_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Set_Time',
    tableName: 'set_times',
    timestamps: false,
  });
  return Set_Time;
};