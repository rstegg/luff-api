module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stubs', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'open'
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    goal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    feeType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'self'
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.hasMany(sequelize.models['tickets'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        // this.hasMany(sequelize.models['forms'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    }
  })
}
