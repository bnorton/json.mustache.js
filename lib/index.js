var files = require('fs');

json = function(name, env) {
  env || (env = process.env.NODE_ENV);

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

  return config;
};

exports = module.exports = json;
