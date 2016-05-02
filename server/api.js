'use strict';

const fs = require('fs');
const conf = require('./config.js');

const cwd = process.cwd();
const base = [cwd, conf.dir, 'stub'].join('/');

var data = {};

function getData(api){
    api = api.replace(/\//ig, '-');
    let data = require([base, api].join('/') + '.json');
    data = data || {};
    return data;
}

module.exports = (ctx, api) => {
    if(!data.hasOwnProperty(api)){
        data[api] = getData(api);
    }
    ctx.jsonp = data[api];
};
