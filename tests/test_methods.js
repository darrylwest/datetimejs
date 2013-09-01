// Generated by CoffeeScript 1.6.3
var assert, datetime;

assert = require('assert');

datetime = require('../datetime');

datetime = datetime.datetime;

describe('datetime.datetime', function() {
  describe('#addDays()', function() {
    it('should add one day to date if passed date and 1', function() {
      var d;
      d = new Date(2013, 8, 1);
      d = datetime.addDays(d, 1);
      return assert.equal(d.getDate(), 2);
    });
    it('should go back 1 day if passed date and -1', function() {
      var d;
      d = new Date(2013, 8, 1);
      d = datetime.addDays(d, -1);
      assert.equal(d.getDate(), 31);
      return assert.equal(d.getMonth(), 7);
    });
    return it('even changes the year if necessary', function() {
      var d;
      d = new Date(2013, 11, 31);
      d = datetime.addDays(d, 1);
      assert.equal(d.getDate(), 1);
      assert.equal(d.getMonth(), 0);
      return assert.equal(d.getFullYear(), 2014);
    });
  });
  describe('#addMonths()', function() {
    it('should add one month if passed a date and 1', function() {
      var d;
      d = new Date(2013, 8, 1);
      d = datetime.addMonths(d, 1);
      return assert.equal(d.getMonth(), 9);
    });
    it('should go back one month if passed -1', function() {
      var d;
      d = new Date(2013, 8, 1);
      d = datetime.addMonths(d, -1);
      return assert.equal(d.getMonth(), 7);
    });
    return it('changes years if we push it', function() {
      var d;
      d = new Date(2013, 8, 1);
      d = datetime.addMonths(d, 4);
      assert.equal(d.getMonth(), 0);
      return assert.equal(d.getFullYear(), 2014);
    });
  });
  describe('#addYears()', function() {
    it('should add a year if passed 1', function() {
      var d;
      d = new Date(2013, 0, 1);
      d = datetime.addYears(d, 1);
      return assert.equal(d.getFullYear(), 2014);
    });
    it('should go back in time if passed -1', function() {
      var d;
      d = new Date(2013, 0, 1);
      d = datetime.addYears(d, -1);
      return assert.equal(d.getFullYear(), 2012);
    });
    return it('should go to to next date on leap year', function() {
      var d;
      d = new Date(2012, 1, 29);
      d = datetime.addYears(d, 1);
      assert.equal(d.getDate(), 1);
      assert.equal(d.getMonth(), 2);
      return assert.equal(d.getFullYear(), 2013);
    });
  });
  describe('#resetTime()', function() {
    return it('should reset the time to 0', function() {
      var d;
      d = new Date(2013, 8, 1, 15, 22, 59, 333);
      d = datetime.resetTime(d);
      assert.equal(d.getHours(), 0);
      assert.equal(d.getMinutes(), 0);
      assert.equal(d.getSeconds(), 0);
      return assert.equal(d.getMilliseconds(), 0);
    });
  });
  describe('#shiftTime()', function() {
    return it('should shift the time by 200ms', function() {
      var d;
      d = new Date(2013, 8, 1, 15, 0, 0, 100);
      d = datetime.shiftTime(200);
      assert.equal(d.getMilliseconds(), 300);
      d = datetime.shiftTime(-200);
      assert.equal(d.getMilliseconds(), 900);
      return assert.equal(d.getSeconds(), 59);
    });
  });
  describe('#today()', function() {
    it('should be today', function() {
      var d1, d2;
      d1 = new Date();
      d2 = datetime.today();
      assert.equal(d1.getFullYear(), d2.getFullYear());
      assert.equal(d1.getMonth(), d2.getMonth());
      return assert.equal(d1.getDate(), d2.getDate());
    });
    return it('should have reset time', function() {
      var d;
      d = datetime.today();
      assert.equal(d.getHours(), 0);
      assert.equal(d.getMinutes(), 0);
      assert.equal(d.getSeconds(), 0);
      return assert.equal(d.getMilliseconds(), 0);
    });
  });
  describe('#thisMonth()', function() {
    it("should be this month's 1st", function() {
      var d1, d2;
      d1 = new Date();
      d2 = datetime.thisMonth();
      assert.equal(d1.getFullYear(), d2.getFullYear());
      assert.equal(d1.getMonth(), d2.getMonth());
      return assert.equal(d2.getDate(), 1);
    });
    return it('should have reset time', function() {
      var d;
      d = datetime.thisMonth();
      assert.equal(d.getHours(), 0);
      assert.equal(d.getMinutes(), 0);
      assert.equal(d.getSeconds(), 0);
      return assert.equal(d.getMilliseconds(), 0);
    });
  });
  describe('#thisWeek()', function() {
    it('should be this Sunday', function() {
      var date, nativeDate;
      nativeDate = Date;
      date = null;
      GLOBAL.Date = function() {
        return {
          getDay: function() {
            return 4;
          },
          getDate: function() {
            return 10;
          },
          setDate: function(d) {
            return date = d;
          },
          setHours: function() {}
        };
      };
      datetime.thisWeek();
      assert.equal(date, 6);
      return GLOBAL.Date = nativeDate;
    });
    return it('should have reset time', function() {
      var d;
      d = datetime.thisWeek();
      assert.equal(d.getHours(), 0);
      assert.equal(d.getMinutes(), 0);
      assert.equal(d.getSeconds(), 0);
      return assert.equal(d.getMilliseconds(), 0);
    });
  });
  return describe('#delta()', function() {
    it('should return an object with required properties', function() {
      var d1, d2, delta;
      d1 = d2 = new Date();
      delta = datetime.delta(d1, d2);
      assert.ok(delta.hasOwnProperty('delta'), 'missing `delta`');
      assert.ok(delta.hasOwnProperty('milliseconds'), 'missing `milliseconds`');
      assert.ok(delta.hasOwnProperty('seconds'), 'missing `seconds`');
      assert.ok(delta.hasOwnProperty('minutes'), 'missing `minutes`');
      assert.ok(delta.hasOwnProperty('hours'), 'missing `hours`');
      return assert.ok(delta.hasOwnProperty('composite'), 'missing `composite`');
    });
    it('should return 0 if dates are equal', function() {
      var d1, d2, delta;
      d1 = d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.delta, 0);
    });
    it('should return difference in milliseconds', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 12, 0, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 10);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.delta, 10);
    });
    it('can return negative delta if d2 is before d1', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 12, 0, 0, 10);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.delta, -10);
    });
    it('returns absolute delta in milliseconds', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 12, 0, 0, 10);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.milliseconds, 10);
    });
    it('returns absolute delta in seconds', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 12, 0, 2, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.seconds, 2);
    });
    it('rounds delta in seconds up', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 12, 0, 2, 1);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.seconds, 3);
    });
    it('should express seconds in milliseconds as well', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 12, 0, 2, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.milliseconds, 2 * 1000);
    });
    it('returns absolute delta in minutes', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 12, 2, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.minutes, 2);
    });
    it('rounds delta in minutes up', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 12, 2, 0, 1);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.minutes, 3);
    });
    it('should express minutes in seconds as well', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 12, 2, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.seconds, 2 * 60);
    });
    it('should express minutes in milliseconds as well', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 12, 2, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.milliseconds, 2 * 60 * 1000);
    });
    it('returns absolute delta in hours', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 13, 0, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.hours, 1);
    });
    it('rounds delta in hours up', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 13, 0, 0, 1);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.hours, 2);
    });
    it('should express hours in minutes as well', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 13, 0, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.minutes, 60);
    });
    it('should express hours in seconds as well', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 13, 0, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.seconds, 60 * 60);
    });
    it('should express hours in milliseconds as well', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 1, 13, 0, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.milliseconds, 60 * 60 * 1000);
    });
    it('returns absolute delta in days', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 3, 12, 0, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.days, 2);
    });
    it('rounds delta in days up', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 3, 12, 0, 0, 1);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.days, 3);
    });
    it('should express days in hours as well', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 3, 12, 0, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.hours, 2 * 24);
    });
    it('should express days in minutes as well', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 3, 12, 0, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.minutes, 2 * 24 * 60);
    });
    it('should express days in seconds as well', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 3, 12, 0, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.seconds, 2 * 24 * 60 * 60);
    });
    it('should express days in milliseconds as well', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 3, 12, 0, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      return assert.equal(delta.milliseconds, 2 * 24 * 60 * 60 * 1000);
    });
    it('should give a composite delta', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 3, 12, 0, 0, 0);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      assert.equal(delta.composite[0], 2);
      assert.equal(delta.composite[1], 0);
      assert.equal(delta.composite[2], 0);
      assert.equal(delta.composite[3], 0);
      return assert.equal(delta.composite[4], 0);
    });
    return it('should give a composite delta with all values', function() {
      var d1, d2, delta;
      d1 = new Date(2013, 8, 3, 13, 1, 1, 1);
      d2 = new Date(2013, 8, 1, 12, 0, 0, 0);
      delta = datetime.delta(d1, d2);
      assert.equal(delta.composite[0], 2, 'days');
      assert.equal(delta.composite[1], 1, 'hours');
      assert.equal(delta.composite[2], 1, 'minutes');
      return assert.equal(delta.composite[3], 1, 'seconds');
    });
  });
});
