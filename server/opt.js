'use strict';

const fs = require('fs');
const conf = require('./config.js');

const cwd = process.cwd();
const base = [cwd, conf.dir, 'templates'].join('/');
const templates = fs.readdirSync(base);

var settings = {};

function getTemplate(){
    let idx = Math.floor(Math.random() * templates.length);
    return templates[idx];
}

function getSettings(template){
    let settings = require([base, template, 'template.json'].join('/'));
    settings = settings || {};
    settings.name = template;
    settings.template = conf.template;
    settings.service = conf.service;
    return settings;
}

function createBody(settings){
    let keys = Object.keys(settings);
    let strSettings = JSON.stringify(settings, keys, 8);
    return `(function(global){
    global && global.init(${ strSettings });
})(__PI__);`;
}

module.exports = ctx => {
    let template = getTemplate();
    if(!settings.hasOwnProperty(template)){
        settings[template] = getSettings(template);
    }
    ctx.body = createBody(settings[template]);
};
