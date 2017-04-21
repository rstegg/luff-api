module.exports = function(sequelize, DataTypes) {
  return sequelize.define('charges', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    charge: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    freezeTableName: true
  })
}
