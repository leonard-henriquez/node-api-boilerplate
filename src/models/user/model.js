const mongoose = require('mongoose')
const { schema } = require('./schema')

// add hooks here
// schema.pre('save', function() {
//   return doStuff().
//     then(() => doMoreStuff());
// });

const User = mongoose.model('User', schema)
module.exports = { User }
