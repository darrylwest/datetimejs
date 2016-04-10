#!/usr/bin/env node

// dpw@seattle.local
// 2016.04.10
'use strict';

const delta = require('../datetime').dtdelta;

let start = new Date("2016-01-01T00:00:00")
let end = new Date("2016-01-10T01:25:52.243")

let d = delta.delta(start, end);

console.log( d.composite );

let values = d.composite.map(x => { 
    let v = Math.round( x );
    return v < 10 ? '0' + v : '' + v; 
} );

console.log( values );

