/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('room', {
    roomcode: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    building: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    roomnumber: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'room'
  });
};
