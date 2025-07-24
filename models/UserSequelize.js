const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
    name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // 0 = author, 1 = reviewer, 2 = editor
      get() {
        const rawValue = this.getDataValue('role');
        return parseInt(rawValue, 10); // Ensure it's always a number
      },
      set(value) {
        // Convert string numbers to actual numbers
        const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
        this.setDataValue('role', numValue);
      },
      validate: {
        isIn: {
          args: [[0, 1, 2]],
          msg: 'Role must be 0 (author), 1 (reviewer), or 2 (editor)'
        }
      }
    },
    institution: {
    type: DataTypes.STRING,
  },
    avatar: {
    type: DataTypes.STRING,
  },
    bio: {
    type: DataTypes.TEXT,
  },
    website: {
    type: DataTypes.STRING,
  },
    orcid: {
    type: DataTypes.STRING,
  },
    researchInterests: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
    position: {
      type: DataTypes.STRING,
    },
    education: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
      get() {
        const value = this.getDataValue('education');
        return value || [];
      },
      set(value) {
        this.setDataValue('education', Array.isArray(value) ? value : []);
      }
    },
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  },
});

  // Instance method to check password
  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  // Instance method to get user info without sensitive data
  User.prototype.getPublicProfile = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  return User;
};