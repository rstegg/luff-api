const crypto = require('crypto')

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    stripe_customer_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stripe_account_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    payment_bank_accounts: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: []
    },
    payment_card_accounts: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: []
    },
    withdrawal_bank_accounts: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: []
    },
    withdrawal_card_accounts: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: []
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'US'
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'individual'
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true,
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$",'i'],
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$",'i'],
      }
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    send_method: {
      type: DataTypes.STRING,
      allowNull: true
    },
    receive_method: {
      type: DataTypes.STRING,
      allowNull: true
    },
    legal_entity: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    verify_needed: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.hasMany(sequelize.models['stubs'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['payments'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    },
    instanceMethods: {
      validPassword(password) {
        const testhash = crypto.createHash('md5').update(password + this.salt).digest("hex");
        if(testhash === this.password) {
          return true;
        } else {
          return false;
        }
      }
    }
  })
}
