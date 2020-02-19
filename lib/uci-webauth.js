'use strict';

const fetch = require('node-fetch');

const addresses = {
  // The URLs to the web authentication at login.uci.edu
  login:  'https://login.uci.edu/ucinetid/webauth',
  logout: 'https://login.uci.edu/ucinetid/webauth_logout',
  check:  'http://login.uci.edu/ucinetid/webauth_check',
};






module.exports = {
  addresses,
  check,
  parseText,
};

/**
 * @typedef {Object} WebauthResp
 * @property {String} ucinetid
 *            rhett
 * @property {String} auth_host
 *            the IP number of the host that the key was authenticated from
 * @property {String} x_forwarded_for
 *
 * @property {Number} time_created
 *            the seconds since epoch that this key was authenticated
 * @property {Number} last_checked
 *            the seconds since epoch to when webauth_check was last
 *            run on this key
 * @property {Number} max_idle_time
 *            146375
 * @property {String} campus_id
 *            A unique number for every person on campus that will never be
 *            duplicated or repeated. This should be used as a key in a database.
 * @property {String} uci_affiliations
 *            employee,staff
 * @property {Number} age_in_seconds
 *            how many seconds ago the UCInetID was authenticated
 * @property {Number} seconds_since_checked
 *            seconds since the last time webauth_check was run on this key
 * @property {fetch.Response} _resp
 *            Original response from Fetch API
 */

/**
 * Convert fetch body response to response object
 *
 * @param {Response} resp
 *          Response from fetch call
 * @return {Promise<WebauthResp>}
 *          Eventually returns WebauthResp Object
 */
function parseText (resp) {
  return resp.text()
    .then(text => {
      let out = text
        .split(/\n/g)
        .filter(i => !!i)
        .map(i => i.split(/=/))
        .reduce((obj, [k, v]) => {
          obj[k] = v;
          return obj;
        }, {})
      ;
      out._resp = resp;

      [
        'time_created',
        'last_checked',
        'max_idle_time',
        'age_in_seconds',
        'seconds_since_checked',
      ].forEach(k => {
        const tmp = parseInt(out[k]);
        out[k] = isNaN(tmp) ? 0 : tmp;
      } );

      return out;
    })
}


/**
 *
 *
 * @param {String} token
 *          64 character string stored in the database as the key to
 *          other information about the login. this variable is required.
 * @return {Promise<WebauthResp>}
 */
function check(token) {
  return fetch(`${addresses.check}?ucinetid_auth=${token}`)
    .then(parseText)
}
