const config   = require('../config');
const {Schema} = require('mongoose');


module.exports = function () {

  const UserSchema = new Schema({
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    ucinetid:  {type: String, index: true, required: true},
    isAdmin:   {type: Boolean, default: false},
    canLogin:  {type: Boolean, default: false},
    // serverEndpoints: Array(Object)
  }, {
    timestamps: true
  });

  return {
    type:   'User',
    schema: UserSchema,
    // graphqlDef: graphDef
  };

};
//
//
//
// // const debug                                = require('debug')('model:user');
// const fortune                              = require('fortune');
// const {methods, errors: {BadRequestError}} = fortune;
//
// const schema = {
//   firstName:       String,
//   lastName:        String,
//   ucinetid:        String,
//   isAdmin:         Boolean,
//   canLogin:        Boolean,
//   serverEndpoints: Array(Object)
// };
//
// module.exports = {
//   type:  'user',
//   schema,
//   hooks: [userInput]
// };
//
//
// function userInput (context, record, update) {
//   const {request: {method}} = context;
//
//   let user;
//   let userIsAdmin = true;
//   const meta = context.request.meta;
//
//   // if there isn't a request, change is likely submitted internally
//   if (meta.request) {
//     user = meta.request.user;
//     userIsAdmin = false;
//
//     // if there is a request and no user or user is not administrator,
//     // they cannot change endpoints or admin status
//     if (user && user.isAdmin) {
//       userIsAdmin = true;
//     }
//   }
//
//   // if (method === methods.create) {
//   //   const store = require('../store');
//   //
//   //   return auth.check(record.accessToken)
//   //
//   //     .then(check => {
//   //       const {
//   //               // Error Only
//   //               // auth_contexts,
//   //               // auth_methods,
//   //               auth_fail,
//   //               error_code,
//   //
//   //               // Success Only
//   //               // last_checked,
//   //               // seconds_since_checked,
//   //               // uci_affiliations,
//   //               // x_forwarded_for,
//   //
//   //               // Mixed
//   //               // age_in_seconds,
//   //               // auth_host,
//   //               // campus_id,
//   //               // max_idle_time,
//   //               // time_created,
//   //               ucinetid,
//   //             } = check;
//   //
//   //       if (error_code || auth_fail) {
//   //         return Promise.reject(new BadRequestError(`Token not valid: ${auth_fail}`));
//   //       } else {
//   //         record.ucinetid = ucinetid;
//   //
//   //         return store
//   //           .request({
//   //             method:  'find',
//   //             type:    'user',
//   //             options: {
//   //               match: {
//   //                 ucinetid: ucinetid
//   //               }
//   //             }
//   //           })
//   //           .then(({payload, meta = {}}) => {
//   //             if (payload.count) {
//   //               record.user = payload.records[0].id;
//   //               return record;
//   //             } else {
//   //               return record;
//   //             }
//   //           })
//   //           ;
//   //       }
//   //     })
//   //     .catch(err => {
//   //       console.error(err.stack)
//   //     })
//   //     ;
//   //
//   // }
//
//   // debug(method);
//   // debug(record);
//
//   switch (method) {
//     case methods.create:
//
//       if (record.isAdmin && !userIsAdmin) {
//         throw new BadRequestError('Non admin users cannot create admin users.');
//       }
//
//       record.serverEndpoints = record.serverEndpoints || [];
//       record.serverEndpoints = record.serverEndpoints.concat(record.isAdmin ? config.auth.adminPerms : config.auth.userPerms);
//
//       break;
//     case methods.update:
//       if (!userIsAdmin) {
//         delete update.replace.serverEndpoints;
//         delete update.replace.isAdmin;
//       }
//
//       break;
//     // case methods.delete:
//   }
//
//   // return record
// }
