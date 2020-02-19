const config   = require('../config');
const {Schema} = require('mongoose');


module.exports = function () {

  const AccessTokenSchema = new Schema({
    _id: {type: String, required: true },

    ucinetid: String,
    auth_host: String,
    x_forwarded_for: String,
    time_created: Number,
    last_checked: Number,
    max_idle_time: Number,
    campus_id: String,
    uci_affiliations: [String],
    age_in_seconds: Number,
    seconds_since_checked: Number,

    user: Object,
  }, {
    timestamps: true
  });

  AccessTokenSchema.index({createdAt: 1},{expires: '5 minutes'});

  return {
    type:   'AccessToken',
    schema: AccessTokenSchema,
    // graphqlDef: graphDef
  };

};
