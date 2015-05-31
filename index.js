/*!
 * json.mustache.js (c) 2015 Brian Norton
 * This library may be freely distributed under the MIT license.
 */
var files = require('fs'),
  cache = {};

json = function(name, env) {
  env || (env = process.env.NODE_ENV);

  var cacheKey = name+':'+env;

  if(cache[cacheKey])
    return cache[cacheKey];

  var string, key, config = JSON.parse(files.readFileSync(process.cwd()+'/config/'+name+'.json'))[env],
    keys = Object.keys(config);

  for(var i=0; i<keys.length; ++i) {
    key = keys[i]; string = config[key];

    if(typeof string == 'string') {
      config[key] = string.replace(/\{\{(\w+)\}\}/g, function(match, group, start) {
        return config[group] || match;
      });
    }
  }

  return cache[cacheKey] = config;
};

exports = module.exports = json;
