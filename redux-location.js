/*! github.com/ptb/redux-location, @license Apache-2.0 */
// For IE <= 8: https://cdn.polyfill.io/v2/polyfill.min.js?features=Array.isArray,Array.prototype.forEach,Window

var MODULE_NAME = "reduxLocation"
var ACTION_TYPE = "UPDATE_LOCATION";

/* eslint-disable no-shadow, no-undef, no-invalid-this */
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory)
  } else if (typeof exports === "object") {
    if (typeof module === "object") {
      module.exports = factory()
    } else {
      exports[MODULE_NAME] = factory()
    }
  } else {
    root[MODULE_NAME] = factory()
  }
})(this, function () {
/* eslint-enable no-shadow, no-undef, no-invalid-this */

  return function (a, b) {
    var c, d

    switch (b.type) {
      case ACTION_TYPE:
        c = {}
        d = window.location;
        [d.pathname, d.search, d.hash].forEach(function (e) {
          var f, g, i, m

          f = e.replace(/^(\?|#)/, "")
          g = function (h) {
            return h && decodeURIComponent(h.replace(/\+/g, " "))
          }
          i = function (j) {
            c.path = []
            j.replace(/([^\/]+)/g, function (_k, l) {
              c.path.push(g(l))
            })
          }
          m = function (n, o, p) {
            var q, r, s, t, u

            q = p || null
            r = (/(.+?)\[(.+?)?\](.+)?/g).exec(o)
            if (r) {
              s = r[1]
              t = r[2]
              u = r[3]
              if (typeof t === "undefined") {
                if (typeof n[s] === "undefined") {
                  n[s] = []
                }
                n[s].push(q)
              } else {
                if (typeof n[s] !== "object") {
                  n[s] = {}
                }
                if (u) {
                  m(n[s], t + u, q)
                } else {
                  m(n[s], t, q)
                }
              }
            } else if (n.hasOwnProperty(o)) {
              if (Array.isArray(n[o])) {
                n[o].push(q)
              } else {
                n[o] = [].concat.apply([n[o], q])
              }
            } else {
              n[o] = q
            }
          }
          if ((/^\//).test(f)) {
            i(f)
          } else {
            f.replace(/([^#&;=?]+)?=?([^&;]+)?/g, function (_v, w, x) {
              if (w === "path") {
                i(x)
              } else {
                w && m(c, g(w), g(x))
              }
            })
          }
        })
        return c
      default:
        return a || {}
    }
  }
})
