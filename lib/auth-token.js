const {db} = require('../models');
const webauth = require('./uci-webauth');

async function getToken (token) {
    if (!token) {
      return null;
    } else {
      token = token.replace(/^bearer /i, '');
    }

    const access = await db.AccessToken.findById(token);
    if (access) {
      return access;
    } else {
    const authResp = await webauth.check(token);
    // console.log(authResp)
    authResp._id = token;

    if (authResp.ucinetid) {
      authResp.user = await db.User.findOne({ucinetid: authResp.ucinetid});
    }

    let out = new db.AccessToken(authResp);

    return await out.save();

  }
}

module.exports = getToken;
