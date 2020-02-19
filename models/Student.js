const config   = require('../config');
const {Schema} = require('mongoose');


module.exports = function () {

  const StudentSchema = new Schema({
    _id: { type: String, required: true },
    firstName:       { type: String, required: true },
    lastName:        { type: String, required: true },
    ucinetid:        { type: String, required: true },
    canLogin:        {type: Boolean, default: false},
    accessOwnData:   {type: Boolean, default: false},
    // supportReceived: [Array('support'), 'student'],
  }, {
    timestamps: true
  });



  return {
    type: 'Student',
    schema: StudentSchema,
    // graphqlDef: graphDef
  };

};
// // const debug                                = require('debug')('model:faculty');
// // const config                               = require('../config');
// const User    = require('./User');
// const fortune = require('fortune');
// // const {methods, errors: {BadRequestError}} = fortune;
//
// const schema = {
//   accessOwnData:   Boolean,
//   supportReceived: [Array('support'), 'student'],
// };
//
// module.exports = {
//   type:   'student',
//   schema: Object.assign({}, User.schema, schema),
//   hooks:  []
// };
