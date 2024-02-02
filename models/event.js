'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate ({ Stage, StageEvent, MeetGreet, SetTime }) {
      // STAGES
    Event.belongsToMany (Stage, {
      foreignKey: "event_id",
      as: "stages",
      through: StageEvent
    })
      // MEET AND GREET
      Event.hasMany(MeetGreet, {
        foreignKey: "event_id",
        as: "meet_greets"
      })
      // SET TIMES
      Event.hasMany(SetTime, {
        foreignKey: "event_id",
        as: "set_times"
      })
    }
    static associate(models) {
      // define association here
    }
  }
  Event.init(
  {
    event_id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
  },
    date: {
      type: DataTypes.DATE,
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
},
{
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false,
  });
  
  return Event;
};