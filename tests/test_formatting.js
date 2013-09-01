// Generated by CoffeeScript 1.6.3
var assert, d, d1, datetime, eq, sft;

assert = require('assert');

datetime = require('../datetime');

eq = assert.equal;

sft = datetime.strftime;

d = new Date(2013, 8, 1, 18, 7, 8, 200);

d1 = new Date(2013, 8, 1, 8, 7, 8, 200);

describe('datetime.strftime', function() {
  it('should return the short week day name', function() {
    return eq(sft(d, '%a'), 'Sun');
  });
  it('should return the long week day name', function() {
    return eq(sft(d, '%A'), 'Sunday');
  });
  it('should return the short month name', function() {
    return eq(sft(d, '%b'), 'Sep');
  });
  it('should return the long month name', function() {
    return eq(sft(d, '%B'), 'September');
  });
  it('should return the zero-padded date', function() {
    return eq(sft(d, '%d'), '01');
  });
  it('should return the non-padded date', function() {
    return eq(sft(d, '%D'), '1');
  });
  it('should return zero-padded seconds with fraction', function() {
    return eq(sft(d, '%f'), '08.20');
  });
  it('should return zero-padded hours in 24-hour format', function() {
    return eq(sft(d, '%H'), '18');
  });
  it('should return non-padded hours in 12-hour format', function() {
    return eq(sft(d, '%i'), '6');
  });
  it('should return zero-padded hours in 12-hour format', function() {
    return eq(sft(d, '%I'), '06');
  });
  it('should return zer-padded day of year', function() {
    return eq(sft(d, '%j'), '244');
  });
  it('should return zero-padded numeric month', function() {
    return eq(sft(d, '%m'), '09');
  });
  it('should return zero-padded minutes', function() {
    return eq(sft(d, '%M'), '07');
  });
  it('should return non-padded month', function() {
    return eq(sft(d, '%n'), '9');
  });
  it('should return non-padded minutes', function() {
    return eq(sft(d, '%N'), '7');
  });
  it('should return PM', function() {
    return eq(sft(d, '%p'), 'p.m.');
  });
  it('should return AM', function() {
    d.setHours(9);
    eq(sft(d, '%p'), 'a.m.');
    return d.setHours(18);
  });
  it('should return non-padded seconds', function() {
    return eq(sft(d, '%s'), '8');
  });
  it('should return padded seconds', function() {
    return eq(sft(d, '%S'), '08');
  });
  it('should return miliseconds', function() {
    return eq(sft(d, '%r'), '200');
  });
  it('should return numeric weed day', function() {
    return eq(sft(d, '%w'), '0');
  });
  it('should return year without century', function() {
    return eq(sft(d, '%y'), '13');
  });
  it('should return full year', function() {
    return eq(sft(d, '%Y'), '2013');
  });
  it('should return timezone', function() {
    var original;
    original = d.getTimezoneOffset;
    d.getTimezoneOffset = function() {
      return -120;
    };
    eq(sft(d, '%z'), '-0200');
    d.getTimezoneOffset = function() {
      return 360;
    };
    eq(sft(d, '%z'), '+0600');
    return d.getTimezoneOffset = original;
  });
  it('should return literal percent', function() {
    return eq(sft(d, '%%'), '%');
  });
  return it('should retain non-formatting character', function() {
    var f;
    f = sft(d, 'The year is %Y, around %i %p on %B %D');
    return eq(f, "The year is 2013, around 6 p.m. on September 1");
  });
});
