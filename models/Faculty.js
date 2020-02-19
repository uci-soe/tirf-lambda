/**
 * Created by rhett on 3/30/17.
 */
'use strict';

const { gql }    = require('apollo-server');
const { Schema } = require('mongoose');

// const debug                                = require('debug')('model:faculty');
// const config                               = require('../config');
// const User                                 = require('./User');
// const fortune                              = require('fortune');
// const {methods, errors: {BadRequestError}} = fortune;


module.exports = function () {

  const FacultySchema = new Schema({
    _id:       { type: String, required: true },
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    ucinetid:  { type: String, required: true },
    canLogin:  { type: Boolean, default: false },

    accessOwnData: { type: Boolean, default: false },
    projects:      { type: [ String ], default: () => [] },
    // supportGiven:   [ Array('support'), 'faculty' ],
    initialCredit: { type: Number, default: 0 },
  }, {
    collection: 'faculty',
    timestamps: true
  });

  FacultySchema.statics.findByUCINetID = function (ucinetid) {
    return this.findOne({ ucinetid });
  };


  return {
    type:   'Faculty',
    schema: FacultySchema,
    // graphqlDef: graphDef
  };
};



// const schema = {
//   accessOwnData:  Boolean,
//   projects:       Array(String),
//   supportGiven:   [ Array('support'), 'faculty' ],
//   initialCredit:  Number,
// };
//
// module.exports = {
//   type:   'faculty',
//   schema: Object.assign({}, User.schema, schema),
//   hooks: []
// };
