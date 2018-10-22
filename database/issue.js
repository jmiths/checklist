/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('issue', {
    issueid: {
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
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    reportedat: {
      type: DataTypes.DATE,
      allowNull: false
    },
    reportedby: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    solved: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    solvedat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    solvedby: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'issue'
  });
};
