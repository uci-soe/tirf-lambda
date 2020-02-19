const config                               = require('../config');
const {Schema} = require('mongoose');


module.exports = function () {

  const SettingSchema = new Schema({
    _id: { type: String, required: true },
    key:   {type: String, index: true, required: true},
    dataType:  { type: String, required: true },
    adminOnly: { type: Boolean, default: true },
    dataValue: { type: String, required: true },
  }, {
    timestamps: true
  });



  return {
    type: 'Setting',
    schema: SettingSchema,
    // graphqlDef: graphDef
  };
};
