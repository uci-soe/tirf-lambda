
const config                               = require('../config');
const {Schema} = require('mongoose');


module.exports = function () {

  const SupportSchema = new Schema({
    _id: { type: String, required: true },
    faculty: { type: String, ref: 'Faculty', required: true },
    student: { type: String, ref: 'Student', required: true },
    fundingSource: { type: String, required: true },
    notes: {type: String, default: ''},
    quarter: { type: String, required: true },
  }, {
    collection: 'support',
    timestamps: true
  });


  return {
    type: 'Support',
    schema: SupportSchema,
    // graphqlDef: graphDef
  };
};
