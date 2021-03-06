// Generated by CoffeeScript 1.6.3
var assert, chai, d, d1, datetime,
  __slice = [].slice;

if (typeof require !== "undefined" && require !== null) {
  chai = require('chai');
  datetime = require('../datetime');
}

assert = chai.assert;

d = new Date(2013, 8, 1, 18, 7, 8, 200);

d1 = new Date(2013, 8, 1, 8, 7, 8, 200);

describe('datetime.format', function() {
  describe('strftime()', function() {
    it('should return the short week day name', function() {
      return assert.equal(datetime.strftime(d, '%a'), 'Sun');
    });
    it('should return the long week day name', function() {
      return assert.equal(datetime.strftime(d, '%A'), 'Sunday');
    });
    it('should return the short month name', function() {
      return assert.equal(datetime.strftime(d, '%b'), 'Sep');
    });
    it('should return the long month name', function() {
      return assert.equal(datetime.strftime(d, '%B'), 'September');
    });
    it('should return the zero-padded date', function() {
      return assert.equal(datetime.strftime(d, '%d'), '01');
    });
    it('should return the non-padded date', function() {
      return assert.equal(datetime.strftime(d, '%D'), '1');
    });
    it('should return zero-padded seconds with fraction', function() {
      return assert.equal(datetime.strftime(d, '%f'), '08.20');
    });
    it('should return zero-padded hours in 24-hour format', function() {
      return assert.equal(datetime.strftime(d, '%H'), '18');
    });
    it('should return non-padded hours in 12-hour format', function() {
      return assert.equal(datetime.strftime(d, '%i'), '6');
    });
    it('should return zero-padded hours in 12-hour format', function() {
      return assert.equal(datetime.strftime(d, '%I'), '06');
    });
    it('should return zer-padded day of year', function() {
      return assert.equal(datetime.strftime(d, '%j'), '244');
    });
    it('should return zero-padded numeric month', function() {
      return assert.equal(datetime.strftime(d, '%m'), '09');
    });
    it('should return zero-padded minutes', function() {
      return assert.equal(datetime.strftime(d, '%M'), '07');
    });
    it('should return non-padded month', function() {
      return assert.equal(datetime.strftime(d, '%n'), '9');
    });
    it('should return non-padded minutes', function() {
      return assert.equal(datetime.strftime(d, '%N'), '7');
    });
    it('should return PM', function() {
      return assert.equal(datetime.strftime(d, '%p'), 'p.m.');
    });
    it('should return AM', function() {
      d.setHours(9);
      assert.equal(datetime.strftime(d, '%p'), 'a.m.');
      return d.setHours(18);
    });
    it('should return non-padded seconds', function() {
      return assert.equal(datetime.strftime(d, '%s'), '8');
    });
    it('should return padded seconds', function() {
      return assert.equal(datetime.strftime(d, '%S'), '08');
    });
    it('should return miliseconds', function() {
      return assert.equal(datetime.strftime(d, '%r'), '200');
    });
    it('should return numeric weed day', function() {
      return assert.equal(datetime.strftime(d, '%w'), '0');
    });
    it('should return year without century', function() {
      return assert.equal(datetime.strftime(d, '%y'), '13');
    });
    it('should return full year', function() {
      return assert.equal(datetime.strftime(d, '%Y'), '2013');
    });
    it('should return timezone', function() {
      var original;
      original = d.getTimezoneOffset;
      d.getTimezoneOffset = function() {
        return -120;
      };
      assert.equal(datetime.strftime(d, '%z'), '+0200');
      d.getTimezoneOffset = function() {
        return 360;
      };
      assert.equal(datetime.strftime(d, '%z'), '-0600');
      return d.getTimezoneOffset = original;
    });
    it('should return literal percent', function() {
      return assert.equal(datetime.strftime(d, '%%'), '%');
    });
    return it('should retain non-formatting character', function() {
      var f;
      f = datetime.strftime(d, 'The year is %Y, around %i %p on %B %D');
      return assert.equal(f, "The year is 2013, around 6 p.m. on September 1");
    });
  });
  describe('#isoformat()', function() {
    return it('should format date as ISO', function() {
      d = new Date(2013, 8, 1, 16);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return assert.equal(datetime.isoformat(d), '2013-09-01T16:00:00.00');
    });
  });
  return describe('#reformat()', function() {
    it('should reformat date', function() {
      var s;
      s = '12 May 2013';
      return assert.equal(datetime.reformat(s, '%D %B %Y', '%Y-%m-%d'), '2013-05-12');
    });
    return it('should isoparse if only output format is specified', function() {
      var isoparseArgs, origIsoparse, s;
      s = '2013-05-12T12:00:00.00';
      origIsoparse = datetime.parse.isoparse;
      isoparseArgs = [];
      datetime.parse.isoparse = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        isoparseArgs = args;
        return origIsoparse.apply(null, args);
      };
      datetime.reformat(s, '%Y %B %d');
      assert.deepEqual(isoparseArgs, [s]);
      return datetime.parse.isoparse = origIsoparse;
    });
  });
});
