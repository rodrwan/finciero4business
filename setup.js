'use strict';

var fs;

fs = require('fs');

fs.createReadStream('.sample-env').pipe(fs.createWriteStream('.env'));
