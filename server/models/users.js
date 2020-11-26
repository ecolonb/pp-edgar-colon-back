const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is reqired'],
    min: [1, 'Min char 1'],
    max: [100, 'Max char is 100']
  },
  lastName: {
    type: String,
    required: false,
    max: [100, 'Max char is 100']
  },
  email: {
    type: String,
    required: [true, 'The email is reqired'],
    unique: true
  },
  cellphone: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: [true, 'The birthdate is reqired']
  },
  gender: {
    type: String,
    required: [true, 'The gender is reqired'],
    enum: ['m', 'f']
  },
  hobby: {
    type: String,
    required: false
  },
  deleted_at: {
    type: Date,
    default: undefined,
    required: false
  },
  created_at: {
    type: Date,
    default: new Date(),
    required: false
  }
});

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = model('User', UserSchema);
