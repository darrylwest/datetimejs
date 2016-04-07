#!/usr/bin/env node

// dpw@oakland.local
// 2016.04.07
'use strict';

const strftime = require('../datetime').strftime;

let formats = [ '%d-%b-%Y', '%i:%M %p', '%A, %B %D', '%I:%M:%s.%r', '%x %X' ];
let dt = new Date();

formats.forEach(fmt => console.log( `${fmt}: ${strftime(dt, fmt)}` ));

