# json.mustache.js

[![Circle CI](https://circleci.com/gh/bnorton/json.mustache.js.svg?style=svg)](https://circleci.com/gh/bnorton/json.mustache.js)
[![npm version](https://badge.fury.io/js/json.mustache.js.svg)](http://badge.fury.io/js/json.mustache.js)

##JSON configuration files with interpolated values

#Getting started

###Install it
```bash
$ npm install json.mustache.js
```

###Require it
```javascript
var template = require('json.mustache.js');
```

###Add your configuration file (i.e. config/sample.json)
```json
{
  "test": {
    "url": "mongodb://localhost:27017/{{id}}",
    "id": "test-db-name"
  },
  "development": {
    "url": "mongodb://localhost:27017/{{id}}",
    "id": "hookly-development"
  },
  "production": {
    "url": "mongodb://{{id}}:{{secret}}@sub.mongonodes.com:{{port}}/{{db}}",
    "id": "your-username",
    "secret": "your-password",
    "port": 27074
    "db": "your-db"
  }
}

###Use it
```javascript
process.env.NODE_ENV = 'production';
var config = template('config-file.json');
config.url
//=> "mongodb://your-username:your-password@sub.mongonodes.com:27074/your-db"
```
