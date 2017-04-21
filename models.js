module.exports = function(sequelize, DataTypes) {
  return {
    User: require('./model/user')(sequelize, DataTypes),
    Luv: require('./model/luv')(sequelize, DataTypes),
    Payment: require('./model/payment')(sequelize, DataTypes),
    Charge: require('./model/charge')(sequelize, DataTypes)
  }
}
