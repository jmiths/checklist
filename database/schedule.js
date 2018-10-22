/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schedule', {
    scheduleid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    roomcode: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'room',
        key: 'roomcode'
      }
    },
    sunday: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    monday: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    tuesday: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    wednesday: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    thursday: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    friday: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    saturday: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    taskid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'task',
        key: 'taskid'
      }
    }
  }, {
    tableName: 'schedule'
  });
};
