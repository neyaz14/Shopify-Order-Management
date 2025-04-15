const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  storeIDs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserStoreDetail',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);