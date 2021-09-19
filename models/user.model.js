const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: {
    type: [String],
    default: [],
  },
  following: {
    type: [String],
    default: [],
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Post',
  },
  profileUrl: {
    type: String,
    default: '/assets/img/sys/defaultprofile.jpg',
  },
  userBio: {
    type: String,
    default: 'Hue Hue',
  },
  dob: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);