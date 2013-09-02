// Generated by CoffeeScript 1.6.3
/*!
@author Branko Vukelic <branko@brankovukelic.com>
@license MIT
*/

var define,
  __slice = [].slice;

define = (function(root) {
  if (typeof root.define === 'function' && root.define.amd) {
    return root.define;
  } else {
    if (typeof module === 'object' && module.exports) {
      return function(factory) {
        return module.exports = factory();
      };
    } else {
      return function(factory) {
        return root.datetime = factory();
      };
    }
  }
})(this);

define(function() {
  var DAY_MS, cycle, datetime, dt, dtdelta, format, hour24, parse, zeroPad;
  dt = {};
  dt.utils = {
    zeroPad: function(i, digits, tail) {
      var f, _ref;
      if (digits == null) {
        digits = 3;
      }
      if (tail == null) {
        tail = false;
      }
      if (tail === false) {
        return ((new Array(digits)).join('0') + i).slice(-digits);
      } else {
        _ref = i.toString().split('.'), i = _ref[0], f = _ref[1];
        if (tail === 0) {
          return zeroPad(i, digits - tail, false);
        } else {
          f || (f = '0');
          i = zeroPad(i, digits - 1 - tail, false);
          f = zeroPad(f.split('').reverse().join(''), tail, false);
          f = f.split('').reverse().join('');
          return [i, f].join('.');
        }
      }
    },
    cycle: function(i, max, zeroIndex) {
      if (zeroIndex == null) {
        zeroIndex = false;
      }
      return i % max || (zeroIndex ? 0 : max);
    },
    hour24: function(h, pm) {
      if (!pm) {
        return h;
      }
      h += 12;
      if (h === 24) {
        return 0;
      } else {
        return h;
      }
    }
  };
  zeroPad = dt.utils.zeroPad;
  cycle = dt.utils.cycle;
  hour24 = dt.utils.hour24;
  dt.DAY_MS = DAY_MS = 86400000;
  dt.REGEXP_CHARS = '^$[]().{}+*?|'.split('');
  dt.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dt.MNTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dt.DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dt.DY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dt.AM = 'a.m.';
  dt.PM = 'p.m.';
  dt.WEEK_START = 0;
  dt.FORMAT_TOKENS = {
    '%a': function() {
      return dt.DY[this.getDay()];
    },
    '%A': function() {
      return dt.DAYS[this.getDay()];
    },
    '%b': function() {
      return dt.MNTH[this.getMonth()];
    },
    '%B': function() {
      return dt.MONTHS[this.getMonth()];
    },
    '%c': function() {
      return this.toLocaleString();
    },
    '%d': function() {
      return zeroPad(this.getDate(), 2);
    },
    '%D': function() {
      return "" + (this.getDate());
    },
    '%f': function() {
      var fs, m, s;
      s = this.getSeconds();
      m = this.getMilliseconds();
      fs = Math.round((s + m / 1000) * 100) / 100;
      return zeroPad(fs, 5, 2);
    },
    '%H': function() {
      return zeroPad(this.getHours(), 2);
    },
    '%i': function() {
      return cycle(this.getHours(), 12);
    },
    '%I': function() {
      return zeroPad(cycle(this.getHours(), 12), 2);
    },
    '%j': function() {
      var firstOfYear;
      firstOfYear = new Date(this.getFullYear(), 0, 1);
      return zeroPad(Math.ceil((this - firstOfYear) / dt.DAY_MS), 3);
    },
    '%m': function() {
      return zeroPad(this.getMonth() + 1, 2);
    },
    '%M': function() {
      return zeroPad(this.getMinutes(), 2);
    },
    '%n': function() {
      return "" + (this.getMonth() + 1);
    },
    '%N': function() {
      return "" + (this.getMinutes());
    },
    '%p': function() {
      return (function(h) {
        if ((0 <= h && h < 12)) {
          return dt.AM;
        } else {
          return dt.PM;
        }
      })(this.getHours());
    },
    '%s': function() {
      return "" + (this.getSeconds());
    },
    '%S': function() {
      return zeroPad(this.getSeconds(), 2);
    },
    '%r': function() {
      return "" + (this.getMilliseconds());
    },
    '%w': function() {
      return "" + (this.getDay());
    },
    '%y': function() {
      return ("" + (this.getFullYear())).slice(-2);
    },
    '%Y': function() {
      return "" + (this.getFullYear());
    },
    '%x': function() {
      return this.toLocaleDateString();
    },
    '%X': function() {
      return this.toLocaleTimeString();
    },
    '%z': function() {
      var pfx, tz;
      pfx = this.getTimezoneOffset() <= 0 ? '+' : '-';
      tz = Math.abs(this.getTimezoneOffset());
      return "" + pfx + (zeroPad(~~(tz / 60), 2)) + (zeroPad(tz % 60, 2));
    },
    '%%': function() {
      return '%';
    },
    '%U': function() {
      return '';
    },
    '%Z': function() {
      return '';
    }
  };
  dt.PARSE_RECIPES = {
    '%b': function() {
      return {
        re: "" + (dt.MNTH.join('|')),
        fn: function(s, meta) {
          var mlc, mo;
          mlc = (function() {
            var _i, _len, _ref, _results;
            _ref = dt.MNTH;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              mo = _ref[_i];
              _results.push(mo.toLowerCase());
            }
            return _results;
          })();
          return meta.month = mlc.indexOf(s.toLowerCase());
        }
      };
    },
    '%B': function() {
      return {
        re: "" + (dt.MONTHS.join('|')),
        fn: function(s, meta) {
          var mlc, mo;
          mlc = (function() {
            var _i, _len, _ref, _results;
            _ref = dt.MONTHS;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              mo = _ref[_i];
              _results.push(mo.toLowerCase());
            }
            return _results;
          })();
          return meta.month = mlc.indexOf(s.toLowerCase());
        }
      };
    },
    '%d': function() {
      return {
        re: '[0-2][0-9]|3[01]',
        fn: function(s, meta) {
          return meta.date = parseInt(s, 10);
        }
      };
    },
    '%D': function() {
      return {
        re: '3[01]|[12]?\\d',
        fn: function(s, meta) {
          return meta.date = parseInt(s, 10);
        }
      };
    },
    '%f': function() {
      return {
        re: '\\d{2}\\.\\d{2}',
        fn: function(s, meta) {
          s = parseFloat(s);
          meta.second = ~~s;
          return meta.millisecond = (s - ~~s) * 1000;
        }
      };
    },
    '%H': function() {
      return {
        re: '[0-1]\\d|2[0-3]',
        fn: function(s, meta) {
          return meta.hour = parseInt(s, 10);
        }
      };
    },
    '%i': function() {
      return {
        re: '1[0-2]|\\d',
        fn: function(s, meta) {
          return meta.hour = parseInt(s, 10);
        }
      };
    },
    '%I': function() {
      return {
        re: '0\\d|1[0-2]',
        fn: function(s, meta) {
          return meta.hour = parseInt(s, 10);
        }
      };
    },
    '%m': function() {
      return {
        re: '0\\d|1[0-2]',
        fn: function(s, meta) {
          return meta.month = parseInt(s, 10) - 1;
        }
      };
    },
    '%M': function() {
      return {
        re: '[0-5]\\d',
        fn: function(s, meta) {
          return meta.minute = parseInt(s, 10);
        }
      };
    },
    '%n': function() {
      return {
        re: '1[0-2]|\\d',
        fn: function(s, meta) {
          return meta.month = parseInt(s, 10) - 1;
        }
      };
    },
    '%N': function() {
      return {
        re: '[1-5]?\\d',
        fn: function(s, meta) {
          return meta.minute = parseInt(s, 10);
        }
      };
    },
    '%p': function() {
      return {
        re: "" + (dt.PM.replace(/\./g, '\\.')) + "|" + (dt.AM.replace(/\./g, '\\.')),
        fn: function(s, meta) {
          return meta.timeAdjust = dt.PM.toLowerCase() === s.toLowerCase();
        }
      };
    },
    '%s': function() {
      return {
        re: '[1-5]?\\d',
        fn: function(s, meta) {
          return meta.second = parseInt(s, 10);
        }
      };
    },
    '%S': function() {
      return {
        re: '[0-5]\\d',
        fn: function(s, meta) {
          return meta.second = parseInt(s, 10);
        }
      };
    },
    '%r': function() {
      return {
        re: '\\d{1,3}',
        fn: function(s, meta) {
          return meta.millisecond = parseInt(s, 10);
        }
      };
    },
    '%y': function() {
      return {
        re: '\\d{2}',
        fn: function(s, meta) {
          var c;
          c = (new Date()).getFullYear().toString().slice(0, 2);
          return meta.year = parseInt(c + s, 10);
        }
      };
    },
    '%Y': function() {
      return {
        re: '\\d{4}',
        fn: function(s, meta) {
          return meta.year = parseInt(s, 10);
        }
      };
    },
    '%z': function() {
      return {
        re: '[+-](?1[01]|0\\d)[0-5]\\d|Z',
        fn: function(s, meta) {
          var h, m, mult;
          if (s === 'Z') {
            return meta.timezone = 0;
          } else {
            mult = s[0] === '-' ? 1 : -1;
            h = parseInt(s.slice(1, 3), 10);
            m = parseInt(s.slice(3, 5), 10);
            return meta.timezone = mult * (h * 60) + m;
          }
        }
      };
    }
  };
  dt.ISO_FORMAT = '%Y-%m-%dT%H:%M:%f';
  dt.datetime = datetime = {
    clone: function(d) {
      return new Date(d.getTime());
    },
    addDays: function(d, v) {
      d = datetime.clone(d);
      d.setDate(d.getDate() + v);
      return d;
    },
    addMonths: function(d, v) {
      d = datetime.clone(d);
      d.setMonth(d.getMonth() + v);
      return d;
    },
    addYears: function(d, v) {
      d = datetime.clone(d);
      d.setFullYear(d.getFullYear() + v);
      return d;
    },
    resetTime: function(d) {
      d = datetime.clone(d);
      d.setHours(0, 0, 0, 0);
      return d;
    },
    today: function() {
      var d;
      d = new Date();
      return datetime.resetTime(d);
    },
    thisMonth: function() {
      var d;
      d = new Date();
      d.setDate(1);
      return datetime.resetTime(d);
    },
    thisWeek: function() {
      var d, diff;
      d = new Date();
      diff = d.getDay() - dt.WEEK_START;
      d.setDate(d.getDate() - diff);
      return datetime.resetTime(d);
    },
    toUTC: function(d) {
      return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
    }
  };
  dt.dtdelta = dtdelta = {
    delta: function(d1, d2) {
      var absD, days, delta, hrs, mins, msecs, secs;
      d1 = datetime.clone(d1);
      d2 = datetime.clone(d2);
      delta = d2 - d1;
      absD = Math.abs(delta);
      days = absD / 1000 / 60 / 60 / 24;
      hrs = (days - ~~days) * 24;
      mins = (hrs - ~~hrs) * 60;
      secs = (mins - ~~mins) * 60;
      msecs = (secs - ~~secs) * 1000;
      return {
        delta: delta,
        milliseconds: absD,
        seconds: Math.ceil(absD / 1000),
        minutes: Math.ceil(absD / 1000 / 60),
        hours: Math.ceil(absD / 1000 / 60 / 60),
        days: Math.ceil(days),
        composite: [~~days, ~~hrs, ~~mins, ~~secs, msecs]
      };
    },
    reorder: function() {
      var d,
        _this = this;
      d = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      d.sort(function(d1, d2) {
        return d1 - d2;
      });
      return d;
    },
    isBefore: function(d, d1) {
      return d1 - d > 0;
    },
    isAfter: function(d, d1) {
      return d1 - d < 0;
    },
    isBetween: function(d, d1, d2) {
      var _ref;
      _ref = dtdelta.reorder(d1, d2), d1 = _ref[0], d2 = _ref[1];
      return dtdelta.isAfter(d, d1) && dtdelta.isBefore(d, d2);
    },
    isDateBefore: function(d, d1) {
      d = datetime.resetTime(d);
      d1 = datetime.resetTime(d1);
      return dtdelta.isBefore(d, d1);
    },
    isDateAfter: function(d, d1) {
      d = datetime.resetTime(d);
      d1 = datetime.resetTime(d1);
      return dtdelta.isAfter(d, d1);
    },
    isDateBetween: function(d, d1, d2) {
      var _ref;
      d = datetime.resetTime(d);
      d1 = datetime.resetTime(d1);
      d2 = datetime.resetTime(d2);
      _ref = dtdelta.reorder(d1, d2), d1 = _ref[0], d2 = _ref[1];
      return dtdelta.isDateAfter(d, d1) && dtdelta.isDateBefore(d, d2);
    },
    isLeapYear: function(d) {
      d = datetime.clone(d);
      d.setMonth(1);
      d.setDate(29);
      return d.getDate() === 29;
    }
  };
  dt.format = format = {
    strftime: function(d, sformat) {
      var r, token;
      for (token in dt.FORMAT_TOKENS) {
        r = new RegExp(token, 'g');
        sformat = sformat.replace(r, function() {
          return dt.FORMAT_TOKENS[token].call(d);
        });
      }
      return sformat;
    },
    isoformat: function(d) {
      d = datetime.toUTC(d);
      return format.strftime(d, dt.ISO_FORMAT);
    }
  };
  dt.parse = parse = {
    strptime: function(s, sformat) {
      var converters, d, fn, idx, key, localOffset, matches, meta, offset, parseTokenRe, parseTokens, rxp, schr, _i, _j, _len, _len1, _ref;
      rxp = sformat.replace(/\\/, '\\\\');
      _ref = dt.REGEXP_CHARS;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        schr = _ref[_i];
        rxp = rxp.replace(new RegExp('\\' + schr, 'g'), "\\" + schr);
      }
      parseTokens = (function() {
        var _results;
        _results = [];
        for (key in dt.PARSE_RECIPES) {
          _results.push(key);
        }
        return _results;
      })();
      parseTokenRe = new RegExp("(" + (parseTokens.join('|')) + ")", "g");
      converters = [];
      rxp = rxp.replace(parseTokenRe, function(m, token) {
        var fn, re, _ref1;
        _ref1 = dt.PARSE_RECIPES[token](), re = _ref1.re, fn = _ref1.fn;
        converters.push(fn);
        return "(" + re + ")";
      });
      rxp = new RegExp("^" + rxp + "$", "i");
      matches = s.match(rxp);
      if (!matches) {
        return null;
      }
      matches.shift();
      meta = {
        year: 0,
        month: 0,
        date: 0,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        timeAdjust: false,
        timezone: null
      };
      for (idx = _j = 0, _len1 = converters.length; _j < _len1; idx = ++_j) {
        fn = converters[idx];
        fn(matches[idx], meta);
      }
      d = new Date(meta.year, meta.month, meta.date, (meta.timeAdjust ? hour24(meta.hour) : meta.hour), meta.minute, meta.second, meta.millisecond);
      if (meta.timezone != null) {
        localOffset = d.getTimezoneOffset();
        offset = localOffset - meta.timezone;
        d.setMinutes(d.getMinutes() + offset);
      }
      return d;
    },
    isoparse: function(s) {
      var d;
      d = parse.strptime(s, dt.ISO_FORMAT);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d;
    }
  };
  dt.strftime = format.strftime;
  dt.strptime = parse.strptime;
  dt.isoformat = format.isoformat;
  dt.isoparse = parse.isoparse;
  return dt;
});
