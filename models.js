module.exports = function(sequelize, DataTypes) {
  return {
    User: require('./model/user')(sequelize, DataTypes),
    Luv: require('./model/luv')(sequelize, DataTypes),
    Ticket: require('./model/ticket')(sequelize, DataTypes),
    Payment: require('./model/payment')(sequelize, DataTypes)
  }
  /**
   * All of your model definitions go here.
   * Return an object where each key is a model
   * name and the value is the result of sequelize.define
   * Don't forget to use the provided DataTypes object to define
   * your column data types
   */

}
