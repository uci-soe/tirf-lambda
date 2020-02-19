const fs       = require('fs');
const path     = require('path');
const mongoose = require('mongoose');
const basename = path.basename(module.filename);

const { ObjectId } = require('mongodb');


const mongoConf = {
  database: process.env.DATABASE,
  host:     process.env.HOST,
  port:     process.env.PORT,
  user:     process.env.USERNAME,
  pass:     process.env.PASSWORD,
};

const userStr  = mongoConf.user ? `${mongoConf.user}:${mongoConf.pass}@` : '';
const mongoStr = `mongodb://${userStr}${mongoConf.host}:${mongoConf.port}/${mongoConf.database}?socketTimeoutMS=90000`;

mongoose.connect(mongoStr, { useNewUrlParser: true });


let models  = { mongoose };
let gqlDefs = [];
fs
  .readdirSync(__dirname)
  .filter(file => !/^\./.test(file))
  .filter(file => !/^_/.test(file))
  .filter(file => file !== basename && /\.js$/i.test(file))
  .forEach(function (file) {
    const name  = file.replace(/\.js$/i, '');
    const model = require(path.join(__dirname, name))();

    // debug(`Loading ./models/${name}.js :: ${model.type}`);

    models[model.type] = mongoose.model(model.type, model.schema);
  });


module.exports = { db: models, gqlDefs, ObjectId };
