module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payments', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true
  })
}
