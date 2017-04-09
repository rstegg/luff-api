module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tickets', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'open'
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        // this.hasMany(sequelize.models['ticketQuestions'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    }
  })
}
