/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('completion', {
    completionid: {
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
    uid: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    taskid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'task',
        key: 'taskid'
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'completion'
  });
};
