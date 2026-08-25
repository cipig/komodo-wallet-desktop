var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var highstock = { exports: {} };
(function(module) {
  (function(S, N) {
    module.exports ? (N["default"] = N, module.exports = S.document ? N(S) : N) : (S.Highcharts && S.Highcharts.error(16, true), S.Highcharts = N(S));
  })("undefined" !== typeof window ? window : commonjsGlobal, function(S) {
    function N(q, e, r2, A) {
      q.hasOwnProperty(e) || (q[e] = A.apply(null, r2));
    }
    var r = {};
    N(r, "parts/Globals.js", [], function() {
      var q = "undefined" !== typeof S ? S : "undefined" !== typeof window ? window : {}, e = q.document, r2 = q.navigator && q.navigator.userAgent || "", A = e && e.createElementNS && !!e.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, D = /(edge|msie|trident)/i.test(r2) && !q.opera, F = -1 !== r2.indexOf("Firefox"), K = -1 !== r2.indexOf("Chrome"), C = F && 4 > parseInt(r2.split("Firefox/")[1], 10);
      return {
        product: "Highcharts",
        version: "8.1.1",
        deg2rad: 2 * Math.PI / 360,
        doc: e,
        hasBidiBug: C,
        hasTouch: !!q.TouchEvent,
        isMS: D,
        isWebKit: -1 !== r2.indexOf("AppleWebKit"),
        isFirefox: F,
        isChrome: K,
        isSafari: !K && -1 !== r2.indexOf("Safari"),
        isTouchDevice: /(Mobile|Android|Windows Phone)/.test(r2),
        SVG_NS: "http://www.w3.org/2000/svg",
        chartCount: 0,
        seriesTypes: {},
        symbolSizes: {},
        svg: A,
        win: q,
        marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
        noop: function() {
        },
        charts: [],
        dateFormats: {}
      };
    });
    N(r, "parts/Utilities.js", [r["parts/Globals.js"]], function(q) {
      function e(c2, g2, a2, l2) {
        var b2 = y(c2), G2 = b2 ? "Highcharts error #" + c2 + ": www.highcharts.com/errors/" + c2 + "/" : c2.toString(), f2 = function() {
          if (g2)
            throw Error(G2);
          H.console && -1 === e.messages.indexOf(G2) && console.log(G2);
        };
        if ("undefined" !== typeof l2) {
          var n2 = "";
          b2 && (G2 += "?");
          W(l2, function(c3, g3) {
            n2 += "\n" + g3 + ": " + c3;
            b2 && (G2 += encodeURI(g3) + "=" + encodeURI(c3));
          });
          G2 += n2;
        }
        a2 ? U(a2, "displayError", { code: c2, message: G2, params: l2 }, f2) : f2();
        e.messages.push(G2);
      }
      function r2() {
        var c2, g2 = arguments, a2 = {}, l2 = function(c3, g3) {
          "object" !== typeof c3 && (c3 = {});
          W(g3, function(a3, b3) {
            !A(a3, true) || u(a3) || p(a3) ? c3[b3] = g3[b3] : c3[b3] = l2(c3[b3] || {}, a3);
          });
          return c3;
        };
        true === g2[0] && (a2 = g2[1], g2 = Array.prototype.slice.call(g2, 2));
        var b2 = g2.length;
        for (c2 = 0; c2 < b2; c2++)
          a2 = l2(a2, g2[c2]);
        return a2;
      }
      function A(c2, g2) {
        return !!c2 && "object" === typeof c2 && (!g2 || !x(c2));
      }
      function D(c2, g2, a2) {
        var l2;
        L(g2) ? h(a2) ? c2.setAttribute(g2, a2) : c2 && c2.getAttribute && ((l2 = c2.getAttribute(g2)) || "class" !== g2 || (l2 = c2.getAttribute(g2 + "Name"))) : W(g2, function(g3, a3) {
          c2.setAttribute(a3, g3);
        });
        return l2;
      }
      function F() {
        for (var c2 = arguments, g2 = c2.length, a2 = 0; a2 < g2; a2++) {
          var l2 = c2[a2];
          if ("undefined" !== typeof l2 && null !== l2)
            return l2;
        }
      }
      function K(c2, g2) {
        if (!c2)
          return g2;
        var a2 = c2.split(".").reverse();
        if (1 === a2.length)
          return g2[c2];
        for (c2 = a2.pop(); "undefined" !== typeof c2 && "undefined" !== typeof g2 && null !== g2; )
          g2 = g2[c2], c2 = a2.pop();
        return g2;
      }
      q.timers = [];
      var C = q.charts, m = q.doc, H = q.win;
      (e || (e = {})).messages = [];
      q.error = e;
      var M = function() {
        function c2(c3, g2, a2) {
          this.options = g2;
          this.elem = c3;
          this.prop = a2;
        }
        c2.prototype.dSetter = function() {
          var c3 = this.paths, g2 = c3 && c3[0];
          c3 = c3 && c3[1];
          var a2 = [], l2 = this.now || 0;
          if (1 !== l2 && g2 && c3)
            if (g2.length === c3.length && 1 > l2)
              for (var b2 = 0; b2 < c3.length; b2++) {
                for (var G2 = g2[b2], f2 = c3[b2], n2 = [], O2 = 0; O2 < f2.length; O2++) {
                  var d2 = G2[O2], h2 = f2[O2];
                  n2[O2] = "number" === typeof d2 && "number" === typeof h2 && ("A" !== f2[0] || 4 !== O2 && 5 !== O2) ? d2 + l2 * (h2 - d2) : h2;
                }
                a2.push(n2);
              }
            else
              a2 = c3;
          else
            a2 = this.toD || [];
          this.elem.attr(
            "d",
            a2,
            void 0,
            true
          );
        };
        c2.prototype.update = function() {
          var c3 = this.elem, g2 = this.prop, a2 = this.now, l2 = this.options.step;
          if (this[g2 + "Setter"])
            this[g2 + "Setter"]();
          else
            c3.attr ? c3.element && c3.attr(g2, a2, null, true) : c3.style[g2] = a2 + this.unit;
          l2 && l2.call(c3, a2, this);
        };
        c2.prototype.run = function(c3, g2, a2) {
          var l2 = this, b2 = l2.options, G2 = function(c4) {
            return G2.stopped ? false : l2.step(c4);
          }, f2 = H.requestAnimationFrame || function(c4) {
            setTimeout(c4, 13);
          }, n2 = function() {
            for (var c4 = 0; c4 < q.timers.length; c4++)
              q.timers[c4]() || q.timers.splice(c4--, 1);
            q.timers.length && f2(n2);
          };
          c3 !== g2 || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +/* @__PURE__ */ new Date(), this.start = c3, this.end = g2, this.unit = a2, this.now = this.start, this.pos = 0, G2.elem = this.elem, G2.prop = this.prop, G2() && 1 === q.timers.push(G2) && f2(n2)) : (delete b2.curAnim[this.prop], b2.complete && 0 === Object.keys(b2.curAnim).length && b2.complete.call(this.elem));
        };
        c2.prototype.step = function(c3) {
          var g2 = +/* @__PURE__ */ new Date(), a2 = this.options, l2 = this.elem, b2 = a2.complete, G2 = a2.duration, f2 = a2.curAnim;
          if (l2.attr && !l2.element)
            c3 = false;
          else if (c3 || g2 >= G2 + this.startTime) {
            this.now = this.end;
            this.pos = 1;
            this.update();
            var n2 = f2[this.prop] = true;
            W(f2, function(c4) {
              true !== c4 && (n2 = false);
            });
            n2 && b2 && b2.call(l2);
            c3 = false;
          } else
            this.pos = a2.easing((g2 - this.startTime) / G2), this.now = this.start + (this.end - this.start) * this.pos, this.update(), c3 = true;
          return c3;
        };
        c2.prototype.initPath = function(c3, g2, a2) {
          function l2(c4, g3) {
            for (; c4.length < v2; ) {
              var a3 = c4[0], l3 = g3[v2 - c4.length];
              l3 && "M" === a3[0] && (c4[0] = "C" === l3[0] ? ["C", a3[1], a3[2], a3[1], a3[2], a3[1], a3[2]] : ["L", a3[1], a3[2]]);
              c4.unshift(a3);
              n2 && c4.push(c4[c4.length - 1]);
            }
          }
          function b2(c4, g3) {
            for (; c4.length < v2; )
              if (g3 = c4[c4.length / O2 - 1].slice(), "C" === g3[0] && (g3[1] = g3[5], g3[2] = g3[6]), n2) {
                var a3 = c4[c4.length / O2].slice();
                c4.splice(c4.length / 2, 0, g3, a3);
              } else
                c4.push(g3);
          }
          var G2 = c3.startX, f2 = c3.endX;
          g2 = g2 && g2.slice();
          a2 = a2.slice();
          var n2 = c3.isArea, O2 = n2 ? 2 : 1;
          if (!g2)
            return [a2, a2];
          if (G2 && f2) {
            for (c3 = 0; c3 < G2.length; c3++)
              if (G2[c3] === f2[0]) {
                var d2 = c3;
                break;
              } else if (G2[0] === f2[f2.length - G2.length + c3]) {
                d2 = c3;
                var h2 = true;
                break;
              } else if (G2[G2.length - 1] === f2[f2.length - G2.length + c3]) {
                d2 = G2.length - c3;
                break;
              }
            "undefined" === typeof d2 && (g2 = []);
          }
          if (g2.length && y(d2)) {
            var v2 = a2.length + d2 * O2;
            h2 ? (l2(g2, a2), b2(a2, g2)) : (l2(a2, g2), b2(g2, a2));
          }
          return [g2, a2];
        };
        c2.prototype.fillSetter = function() {
          c2.prototype.strokeSetter.apply(
            this,
            arguments
          );
        };
        c2.prototype.strokeSetter = function() {
          this.elem.attr(this.prop, q.color(this.start).tweenTo(q.color(this.end), this.pos), null, true);
        };
        return c2;
      }();
      q.Fx = M;
      q.merge = r2;
      var w = q.pInt = function(c2, g2) {
        return parseInt(c2, g2 || 10);
      }, L = q.isString = function(c2) {
        return "string" === typeof c2;
      }, x = q.isArray = function(c2) {
        c2 = Object.prototype.toString.call(c2);
        return "[object Array]" === c2 || "[object Array Iterator]" === c2;
      };
      q.isObject = A;
      var p = q.isDOMElement = function(c2) {
        return A(c2) && "number" === typeof c2.nodeType;
      }, u = q.isClass = function(c2) {
        var g2 = c2 && c2.constructor;
        return !(!A(c2, true) || p(c2) || !g2 || !g2.name || "Object" === g2.name);
      }, y = q.isNumber = function(c2) {
        return "number" === typeof c2 && !isNaN(c2) && Infinity > c2 && -Infinity < c2;
      }, k = q.erase = function(c2, g2) {
        for (var a2 = c2.length; a2--; )
          if (c2[a2] === g2) {
            c2.splice(a2, 1);
            break;
          }
      }, h = q.defined = function(c2) {
        return "undefined" !== typeof c2 && null !== c2;
      };
      q.attr = D;
      var d = q.splat = function(c2) {
        return x(c2) ? c2 : [c2];
      }, t = q.syncTimeout = function(c2, g2, a2) {
        if (0 < g2)
          return setTimeout(c2, g2, a2);
        c2.call(0, a2);
        return -1;
      }, b = q.clearTimeout = function(c2) {
        h(c2) && clearTimeout(c2);
      }, f = q.extend = function(c2, g2) {
        var a2;
        c2 || (c2 = {});
        for (a2 in g2)
          c2[a2] = g2[a2];
        return c2;
      };
      q.pick = F;
      var a = q.css = function(c2, g2) {
        q.isMS && !q.svg && g2 && "undefined" !== typeof g2.opacity && (g2.filter = "alpha(opacity=" + 100 * g2.opacity + ")");
        f(c2.style, g2);
      }, v = q.createElement = function(c2, g2, l2, b2, G2) {
        c2 = m.createElement(c2);
        g2 && f(c2, g2);
        G2 && a(c2, { padding: "0", border: "none", margin: "0" });
        l2 && a(c2, l2);
        b2 && b2.appendChild(c2);
        return c2;
      }, E = q.extendClass = function(c2, g2) {
        var a2 = function() {
        };
        a2.prototype = new c2();
        f(a2.prototype, g2);
        return a2;
      }, J = q.pad = function(c2, g2, a2) {
        return Array((g2 || 2) + 1 - String(c2).replace("-", "").length).join(a2 || "0") + c2;
      }, B = q.relativeLength = function(c2, g2, a2) {
        return /%$/.test(c2) ? g2 * parseFloat(c2) / 100 + (a2 || 0) : parseFloat(c2);
      }, n = q.wrap = function(c2, g2, a2) {
        var l2 = c2[g2];
        c2[g2] = function() {
          var c3 = Array.prototype.slice.call(arguments), g3 = arguments, b2 = this;
          b2.proceed = function() {
            l2.apply(b2, arguments.length ? arguments : g3);
          };
          c3.unshift(l2);
          c3 = a2.apply(this, c3);
          b2.proceed = null;
          return c3;
        };
      }, z = q.format = function(c2, g2, a2) {
        var l2 = "{", b2 = false, G2 = [], f2 = /f$/, n2 = /\.([0-9])/, O2 = q.defaultOptions.lang, d2 = a2 && a2.time || q.time;
        for (a2 = a2 && a2.numberFormatter || Y; c2; ) {
          var h2 = c2.indexOf(l2);
          if (-1 === h2)
            break;
          var v2 = c2.slice(0, h2);
          if (b2) {
            v2 = v2.split(":");
            l2 = K(v2.shift() || "", g2);
            if (v2.length && "number" === typeof l2)
              if (v2 = v2.join(":"), f2.test(v2)) {
                var P2 = parseInt((v2.match(n2) || ["", "-1"])[1], 10);
                null !== l2 && (l2 = a2(l2, P2, O2.decimalPoint, -1 < v2.indexOf(",") ? O2.thousandsSep : ""));
              } else
                l2 = d2.dateFormat(v2, l2);
            G2.push(l2);
          } else
            G2.push(v2);
          c2 = c2.slice(h2 + 1);
          l2 = (b2 = !b2) ? "}" : "{";
        }
        G2.push(c2);
        return G2.join("");
      }, I = q.getMagnitude = function(c2) {
        return Math.pow(10, Math.floor(Math.log(c2) / Math.LN10));
      }, P = q.normalizeTickInterval = function(c2, g2, a2, l2, b2) {
        var G2 = c2;
        a2 = F(a2, 1);
        var f2 = c2 / a2;
        g2 || (g2 = b2 ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], false === l2 && (1 === a2 ? g2 = g2.filter(function(c3) {
          return 0 === c3 % 1;
        }) : 0.1 >= a2 && (g2 = [1 / a2])));
        for (l2 = 0; l2 < g2.length && !(G2 = g2[l2], b2 && G2 * a2 >= c2 || !b2 && f2 <= (g2[l2] + (g2[l2 + 1] || g2[l2])) / 2); l2++)
          ;
        return G2 = Q(G2 * a2, -Math.round(Math.log(1e-3) / Math.LN10));
      }, l = q.stableSort = function(c2, g2) {
        var a2 = c2.length, l2, b2;
        for (b2 = 0; b2 < a2; b2++)
          c2[b2].safeI = b2;
        c2.sort(function(c3, a3) {
          l2 = g2(c3, a3);
          return 0 === l2 ? c3.safeI - a3.safeI : l2;
        });
        for (b2 = 0; b2 < a2; b2++)
          delete c2[b2].safeI;
      }, g = q.arrayMin = function(c2) {
        for (var g2 = c2.length, a2 = c2[0]; g2--; )
          c2[g2] < a2 && (a2 = c2[g2]);
        return a2;
      }, c = q.arrayMax = function(c2) {
        for (var g2 = c2.length, a2 = c2[0]; g2--; )
          c2[g2] > a2 && (a2 = c2[g2]);
        return a2;
      }, G = q.destroyObjectProperties = function(c2, g2) {
        W(c2, function(a2, l2) {
          a2 && a2 !== g2 && a2.destroy && a2.destroy();
          delete c2[l2];
        });
      }, O = q.discardElement = function(c2) {
        var g2 = q.garbageBin;
        g2 || (g2 = v("div"));
        c2 && g2.appendChild(c2);
        g2.innerHTML = "";
      }, Q = q.correctFloat = function(c2, g2) {
        return parseFloat(c2.toPrecision(g2 || 14));
      }, aa = q.setAnimation = function(c2, g2) {
        g2.renderer.globalAnimation = F(
          c2,
          g2.options.chart.animation,
          true
        );
      }, Z = q.animObject = function(c2) {
        return A(c2) ? r2(c2) : { duration: c2 ? 500 : 0 };
      }, ba = q.timeUnits = { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5, month: 24192e5, year: 314496e5 }, Y = q.numberFormat = function(c2, g2, a2, l2) {
        c2 = +c2 || 0;
        g2 = +g2;
        var b2 = q.defaultOptions.lang, G2 = (c2.toString().split(".")[1] || "").split("e")[0].length, f2 = c2.toString().split("e");
        if (-1 === g2)
          g2 = Math.min(G2, 20);
        else if (!y(g2))
          g2 = 2;
        else if (g2 && f2[1] && 0 > f2[1]) {
          var n2 = g2 + +f2[1];
          0 <= n2 ? (f2[0] = (+f2[0]).toExponential(n2).split("e")[0], g2 = n2) : (f2[0] = f2[0].split(".")[0] || 0, c2 = 20 > g2 ? (f2[0] * Math.pow(10, f2[1])).toFixed(g2) : 0, f2[1] = 0);
        }
        var O2 = (Math.abs(f2[1] ? f2[0] : c2) + Math.pow(10, -Math.max(g2, G2) - 1)).toFixed(g2);
        G2 = String(w(O2));
        n2 = 3 < G2.length ? G2.length % 3 : 0;
        a2 = F(a2, b2.decimalPoint);
        l2 = F(l2, b2.thousandsSep);
        c2 = (0 > c2 ? "-" : "") + (n2 ? G2.substr(0, n2) + l2 : "");
        c2 += G2.substr(n2).replace(/(\d{3})(?=\d)/g, "$1" + l2);
        g2 && (c2 += a2 + O2.slice(-g2));
        f2[1] && 0 !== +c2 && (c2 += "e" + f2[1]);
        return c2;
      };
      Math.easeInOutSine = function(c2) {
        return -0.5 * (Math.cos(Math.PI * c2) - 1);
      };
      var ca = q.getStyle = function(c2, g2, a2) {
        if ("width" === g2)
          return g2 = Math.min(
            c2.offsetWidth,
            c2.scrollWidth
          ), a2 = c2.getBoundingClientRect && c2.getBoundingClientRect().width, a2 < g2 && a2 >= g2 - 1 && (g2 = Math.floor(a2)), Math.max(0, g2 - q.getStyle(c2, "padding-left") - q.getStyle(c2, "padding-right"));
        if ("height" === g2)
          return Math.max(0, Math.min(c2.offsetHeight, c2.scrollHeight) - q.getStyle(c2, "padding-top") - q.getStyle(c2, "padding-bottom"));
        H.getComputedStyle || e(27, true);
        if (c2 = H.getComputedStyle(c2, void 0))
          c2 = c2.getPropertyValue(g2), F(a2, "opacity" !== g2) && (c2 = w(c2));
        return c2;
      }, da = q.inArray = function(c2, g2, a2) {
        e(32, false, void 0, { "Highcharts.inArray": "Array.indexOf" });
        return g2.indexOf(c2, a2);
      }, T = q.find = Array.prototype.find ? function(c2, g2) {
        return c2.find(g2);
      } : function(c2, g2) {
        var a2, l2 = c2.length;
        for (a2 = 0; a2 < l2; a2++)
          if (g2(c2[a2], a2))
            return c2[a2];
      };
      q.keys = function() {
        e(32, false, void 0, { "Highcharts.keys": "Object.keys" });
        return Object.keys.apply(arguments);
      };
      var X = q.offset = function(c2) {
        var g2 = m.documentElement;
        c2 = c2.parentElement || c2.parentNode ? c2.getBoundingClientRect() : { top: 0, left: 0 };
        return { top: c2.top + (H.pageYOffset || g2.scrollTop) - (g2.clientTop || 0), left: c2.left + (H.pageXOffset || g2.scrollLeft) - (g2.clientLeft || 0) };
      }, ha = q.stop = function(c2, g2) {
        for (var a2 = q.timers.length; a2--; )
          q.timers[a2].elem !== c2 || g2 && g2 !== q.timers[a2].prop || (q.timers[a2].stopped = true);
      }, W = q.objectEach = function(c2, g2, a2) {
        for (var l2 in c2)
          Object.hasOwnProperty.call(c2, l2) && g2.call(a2 || c2[l2], c2[l2], l2, c2);
      };
      W({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function(c2, g2) {
        q[g2] = function(a2) {
          var l2;
          e(32, false, void 0, (l2 = {}, l2["Highcharts." + g2] = "Array." + c2, l2));
          return Array.prototype[c2].apply(a2, [].slice.call(arguments, 1));
        };
      });
      var ja = q.addEvent = function(c2, g2, a2, l2) {
        void 0 === l2 && (l2 = {});
        var b2 = c2.addEventListener || q.addEventListenerPolyfill;
        var G2 = "function" === typeof c2 && c2.prototype ? c2.prototype.protoEvents = c2.prototype.protoEvents || {} : c2.hcEvents = c2.hcEvents || {};
        q.Point && c2 instanceof q.Point && c2.series && c2.series.chart && (c2.series.chart.runTrackerClick = true);
        b2 && b2.call(c2, g2, a2, false);
        G2[g2] || (G2[g2] = []);
        G2[g2].push({ fn: a2, order: "number" === typeof l2.order ? l2.order : Infinity });
        G2[g2].sort(function(c3, g3) {
          return c3.order - g3.order;
        });
        return function() {
          V(c2, g2, a2);
        };
      }, V = q.removeEvent = function(c2, g2, a2) {
        function l2(g3, a3) {
          var l3 = c2.removeEventListener || q.removeEventListenerPolyfill;
          l3 && l3.call(c2, g3, a3, false);
        }
        function b2(a3) {
          var b3;
          if (c2.nodeName) {
            if (g2) {
              var G3 = {};
              G3[g2] = true;
            } else
              G3 = a3;
            W(G3, function(c3, g3) {
              if (a3[g3])
                for (b3 = a3[g3].length; b3--; )
                  l2(g3, a3[g3][b3].fn);
            });
          }
        }
        var G2;
        ["protoEvents", "hcEvents"].forEach(function(f2, n2) {
          var O2 = (n2 = n2 ? c2 : c2.prototype) && n2[f2];
          O2 && (g2 ? (G2 = O2[g2] || [], a2 ? (O2[g2] = G2.filter(function(c3) {
            return a2 !== c3.fn;
          }), l2(g2, a2)) : (b2(O2), O2[g2] = [])) : (b2(O2), n2[f2] = {}));
        });
      }, U = q.fireEvent = function(c2, g2, a2, l2) {
        var b2;
        a2 = a2 || {};
        if (m.createEvent && (c2.dispatchEvent || c2.fireEvent)) {
          var G2 = m.createEvent("Events");
          G2.initEvent(g2, true, true);
          f(G2, a2);
          c2.dispatchEvent ? c2.dispatchEvent(G2) : c2.fireEvent(g2, G2);
        } else
          a2.target || f(a2, { preventDefault: function() {
            a2.defaultPrevented = true;
          }, target: c2, type: g2 }), function(g3, l3) {
            void 0 === g3 && (g3 = []);
            void 0 === l3 && (l3 = []);
            var G3 = 0, f2 = 0, n2 = g3.length + l3.length;
            for (b2 = 0; b2 < n2; b2++)
              false === (g3[G3] ? l3[f2] ? g3[G3].order <= l3[f2].order ? g3[G3++] : l3[f2++] : g3[G3++] : l3[f2++]).fn.call(c2, a2) && a2.preventDefault();
          }(c2.protoEvents && c2.protoEvents[g2], c2.hcEvents && c2.hcEvents[g2]);
        l2 && !a2.defaultPrevented && l2.call(c2, a2);
      }, ea = q.animate = function(c2, g2, a2) {
        var l2, b2 = "", G2, f2;
        if (!A(a2)) {
          var n2 = arguments;
          a2 = { duration: n2[2], easing: n2[3], complete: n2[4] };
        }
        y(a2.duration) || (a2.duration = 400);
        a2.easing = "function" === typeof a2.easing ? a2.easing : Math[a2.easing] || Math.easeInOutSine;
        a2.curAnim = r2(g2);
        W(g2, function(n3, O2) {
          ha(c2, O2);
          f2 = new M(c2, a2, O2);
          G2 = null;
          "d" === O2 && x(g2.d) ? (f2.paths = f2.initPath(c2, c2.pathArray, g2.d), f2.toD = g2.d, l2 = 0, G2 = 1) : c2.attr ? l2 = c2.attr(O2) : (l2 = parseFloat(ca(c2, O2)) || 0, "opacity" !== O2 && (b2 = "px"));
          G2 || (G2 = n3);
          G2 && G2.match && G2.match("px") && (G2 = G2.replace(/px/g, ""));
          f2.run(l2, G2, b2);
        });
      }, ka = q.seriesType = function(c2, g2, a2, l2, b2) {
        var G2 = ia(), f2 = q.seriesTypes;
        G2.plotOptions[c2] = r2(G2.plotOptions[g2], a2);
        f2[c2] = E(f2[g2] || function() {
        }, l2);
        f2[c2].prototype.type = c2;
        b2 && (f2[c2].prototype.pointClass = E(q.Point, b2));
        return f2[c2];
      }, fa, N2 = q.uniqueKey = function() {
        var c2 = Math.random().toString(36).substring(2, 9) + "-", g2 = 0;
        return function() {
          return "highcharts-" + (fa ? "" : c2) + g2++;
        };
      }(), la = q.useSerialIds = function(c2) {
        return fa = F(c2, fa);
      }, ma = q.isFunction = function(c2) {
        return "function" === typeof c2;
      }, ia = q.getOptions = function() {
        return q.defaultOptions;
      }, na = q.setOptions = function(c2) {
        q.defaultOptions = r2(true, q.defaultOptions, c2);
        (c2.time || c2.global) && q.time.update(r2(q.defaultOptions.global, q.defaultOptions.time, c2.global, c2.time));
        return q.defaultOptions;
      };
      H.jQuery && (H.jQuery.fn.highcharts = function() {
        var c2 = [].slice.call(arguments);
        if (this[0])
          return c2[0] ? (new q[L(c2[0]) ? c2.shift() : "Chart"](this[0], c2[0], c2[1]), this) : C[D(this[0], "data-highcharts-chart")];
      });
      return {
        Fx: q.Fx,
        addEvent: ja,
        animate: ea,
        animObject: Z,
        arrayMax: c,
        arrayMin: g,
        attr: D,
        clamp: function(c2, g2, a2) {
          return c2 > g2 ? c2 < a2 ? c2 : a2 : g2;
        },
        clearTimeout: b,
        correctFloat: Q,
        createElement: v,
        css: a,
        defined: h,
        destroyObjectProperties: G,
        discardElement: O,
        erase: k,
        error: e,
        extend: f,
        extendClass: E,
        find: T,
        fireEvent: U,
        format: z,
        getMagnitude: I,
        getNestedProperty: K,
        getOptions: ia,
        getStyle: ca,
        inArray: da,
        isArray: x,
        isClass: u,
        isDOMElement: p,
        isFunction: ma,
        isNumber: y,
        isObject: A,
        isString: L,
        merge: r2,
        normalizeTickInterval: P,
        numberFormat: Y,
        objectEach: W,
        offset: X,
        pad: J,
        pick: F,
        pInt: w,
        relativeLength: B,
        removeEvent: V,
        seriesType: ka,
        setAnimation: aa,
        setOptions: na,
        splat: d,
        stableSort: l,
        stop: ha,
        syncTimeout: t,
        timeUnits: ba,
        uniqueKey: N2,
        useSerialIds: la,
        wrap: n
      };
    });
    N(r, "parts/Color.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function(q, e) {
      var r2 = e.isNumber, A = e.merge, D = e.pInt;
      e = function() {
        function e2(q2) {
          this.parsers = [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function(e3) {
            return [D(e3[1]), D(e3[2]), D(e3[3]), parseFloat(e3[4], 10)];
          } }, {
            regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
            parse: function(e3) {
              return [D(e3[1]), D(e3[2]), D(e3[3]), 1];
            }
          }];
          this.rgba = [];
          if (!(this instanceof e2))
            return new e2(q2);
          this.init(q2);
        }
        e2.parse = function(q2) {
          return new e2(q2);
        };
        e2.prototype.init = function(q2) {
          var C, m;
          if ((this.input = q2 = e2.names[q2 && q2.toLowerCase ? q2.toLowerCase() : ""] || q2) && q2.stops)
            this.stops = q2.stops.map(function(w) {
              return new e2(w[1]);
            });
          else {
            if (q2 && q2.charAt && "#" === q2.charAt()) {
              var H = q2.length;
              q2 = parseInt(q2.substr(1), 16);
              7 === H ? C = [(q2 & 16711680) >> 16, (q2 & 65280) >> 8, q2 & 255, 1] : 4 === H && (C = [(q2 & 3840) >> 4 | (q2 & 3840) >> 8, (q2 & 240) >> 4 | q2 & 240, (q2 & 15) << 4 | q2 & 15, 1]);
            }
            if (!C)
              for (m = this.parsers.length; m-- && !C; ) {
                var M = this.parsers[m];
                (H = M.regex.exec(q2)) && (C = M.parse(H));
              }
          }
          this.rgba = C || [];
        };
        e2.prototype.get = function(e3) {
          var q2 = this.input, m = this.rgba;
          if ("undefined" !== typeof this.stops) {
            var H = A(q2);
            H.stops = [].concat(H.stops);
            this.stops.forEach(function(m2, w) {
              H.stops[w] = [H.stops[w][0], m2.get(e3)];
            });
          } else
            H = m && r2(m[0]) ? "rgb" === e3 || !e3 && 1 === m[3] ? "rgb(" + m[0] + "," + m[1] + "," + m[2] + ")" : "a" === e3 ? m[3] : "rgba(" + m.join(",") + ")" : q2;
          return H;
        };
        e2.prototype.brighten = function(e3) {
          var q2, m = this.rgba;
          if (this.stops)
            this.stops.forEach(function(m2) {
              m2.brighten(e3);
            });
          else if (r2(e3) && 0 !== e3)
            for (q2 = 0; 3 > q2; q2++)
              m[q2] += D(255 * e3), 0 > m[q2] && (m[q2] = 0), 255 < m[q2] && (m[q2] = 255);
          return this;
        };
        e2.prototype.setOpacity = function(e3) {
          this.rgba[3] = e3;
          return this;
        };
        e2.prototype.tweenTo = function(e3, q2) {
          var m = this.rgba, H = e3.rgba;
          H.length && m && m.length ? (e3 = 1 !== H[3] || 1 !== m[3], q2 = (e3 ? "rgba(" : "rgb(") + Math.round(H[0] + (m[0] - H[0]) * (1 - q2)) + "," + Math.round(H[1] + (m[1] - H[1]) * (1 - q2)) + "," + Math.round(H[2] + (m[2] - H[2]) * (1 - q2)) + (e3 ? "," + (H[3] + (m[3] - H[3]) * (1 - q2)) : "") + ")") : q2 = e3.input || "none";
          return q2;
        };
        e2.names = { white: "#ffffff", black: "#000000" };
        return e2;
      }();
      q.Color = e;
      q.color = e.parse;
      return q.Color;
    });
    N(r, "parts/SVGElement.js", [r["parts/Color.js"], r["parts/Globals.js"], r["parts/Utilities.js"]], function(q, e, r2) {
      var A = e.deg2rad, D = e.doc, F = e.hasTouch, K = e.isFirefox, C = e.noop, m = e.svg, H = e.SVG_NS, M = e.win, w = r2.animate, L = r2.animObject, x = r2.attr, p = r2.createElement, u = r2.css, y = r2.defined, k = r2.erase, h = r2.extend, d = r2.fireEvent, t = r2.isArray, b = r2.isFunction, f = r2.isNumber, a = r2.isString, v = r2.merge, E = r2.objectEach, J = r2.pick, B = r2.pInt, n = r2.stop, z = r2.uniqueKey;
      r2 = function() {
        function I() {
          this.height = this.element = void 0;
          this.opacity = 1;
          this.renderer = void 0;
          this.SVG_NS = H;
          this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ");
          this.width = void 0;
        }
        I.prototype._defaultGetter = function(a2) {
          a2 = J(this[a2 + "Value"], this[a2], this.element ? this.element.getAttribute(a2) : null, 0);
          /^[\-0-9\.]+$/.test(a2) && (a2 = parseFloat(a2));
          return a2;
        };
        I.prototype._defaultSetter = function(a2, l, g) {
          g.setAttribute(
            l,
            a2
          );
        };
        I.prototype.add = function(a2) {
          var l = this.renderer, g = this.element;
          a2 && (this.parentGroup = a2);
          this.parentInverted = a2 && a2.inverted;
          "undefined" !== typeof this.textStr && "text" === this.element.nodeName && l.buildText(this);
          this.added = true;
          if (!a2 || a2.handleZ || this.zIndex)
            var c = this.zIndexSetter();
          c || (a2 ? a2.element : l.box).appendChild(g);
          if (this.onAdd)
            this.onAdd();
          return this;
        };
        I.prototype.addClass = function(a2, l) {
          var g = l ? "" : this.attr("class") || "";
          a2 = (a2 || "").split(/ /g).reduce(
            function(c, a3) {
              -1 === g.indexOf(a3) && c.push(a3);
              return c;
            },
            g ? [g] : []
          ).join(" ");
          a2 !== g && this.attr("class", a2);
          return this;
        };
        I.prototype.afterSetters = function() {
          this.doTransform && (this.updateTransform(), this.doTransform = false);
        };
        I.prototype.align = function(b2, l, g) {
          var c, G = {};
          var f2 = this.renderer;
          var n2 = f2.alignedObjects;
          var d2, v2;
          if (b2) {
            if (this.alignOptions = b2, this.alignByTranslate = l, !g || a(g))
              this.alignTo = c = g || "renderer", k(n2, this), n2.push(this), g = void 0;
          } else
            b2 = this.alignOptions, l = this.alignByTranslate, c = this.alignTo;
          g = J(g, f2[c], f2);
          c = b2.align;
          f2 = b2.verticalAlign;
          n2 = (g.x || 0) + (b2.x || 0);
          var h2 = (g.y || 0) + (b2.y || 0);
          "right" === c ? d2 = 1 : "center" === c && (d2 = 2);
          d2 && (n2 += (g.width - (b2.width || 0)) / d2);
          G[l ? "translateX" : "x"] = Math.round(n2);
          "bottom" === f2 ? v2 = 1 : "middle" === f2 && (v2 = 2);
          v2 && (h2 += (g.height - (b2.height || 0)) / v2);
          G[l ? "translateY" : "y"] = Math.round(h2);
          this[this.placed ? "animate" : "attr"](G);
          this.placed = true;
          this.alignAttr = G;
          return this;
        };
        I.prototype.alignSetter = function(a2) {
          var l = { left: "start", center: "middle", right: "end" };
          l[a2] && (this.alignValue = a2, this.element.setAttribute("text-anchor", l[a2]));
        };
        I.prototype.animate = function(a2, l, g) {
          var c = L(J(l, this.renderer.globalAnimation, true));
          J(D.hidden, D.msHidden, D.webkitHidden, false) && (c.duration = 0);
          0 !== c.duration ? (g && (c.complete = g), w(this, a2, c)) : (this.attr(a2, void 0, g), E(a2, function(g2, a3) {
            c.step && c.step.call(this, g2, { prop: a3, pos: 1 });
          }, this));
          return this;
        };
        I.prototype.applyTextOutline = function(a2) {
          var l = this.element, g;
          -1 !== a2.indexOf("contrast") && (a2 = a2.replace(/contrast/g, this.renderer.getContrast(l.style.fill)));
          a2 = a2.split(" ");
          var c = a2[a2.length - 1];
          if ((g = a2[0]) && "none" !== g && e.svg) {
            this.fakeTS = true;
            a2 = [].slice.call(l.getElementsByTagName("tspan"));
            this.ySetter = this.xSetter;
            g = g.replace(/(^[\d\.]+)(.*?)$/g, function(c2, g2, a3) {
              return 2 * g2 + a3;
            });
            this.removeTextOutline(a2);
            var b2 = l.textContent ? /^[\u0591-\u065F\u066A-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(l.textContent) : false;
            var f2 = l.firstChild;
            a2.forEach(function(a3, G) {
              0 === G && (a3.setAttribute("x", l.getAttribute("x")), G = l.getAttribute("y"), a3.setAttribute("y", G || 0), null === G && l.setAttribute("y", 0));
              G = a3.cloneNode(true);
              x(b2 && !K ? a3 : G, {
                "class": "highcharts-text-outline",
                fill: c,
                stroke: c,
                "stroke-width": g,
                "stroke-linejoin": "round"
              });
              l.insertBefore(G, f2);
            });
            b2 && K && a2[0] && (a2 = a2[0].cloneNode(true), a2.textContent = " ", l.insertBefore(a2, f2));
          }
        };
        I.prototype.attr = function(a2, l, g, c) {
          var b2 = this.element, f2, d2 = this, v2, h2, t2 = this.symbolCustomAttribs;
          if ("string" === typeof a2 && "undefined" !== typeof l) {
            var z2 = a2;
            a2 = {};
            a2[z2] = l;
          }
          "string" === typeof a2 ? d2 = (this[a2 + "Getter"] || this._defaultGetter).call(this, a2, b2) : (E(a2, function(g2, l2) {
            v2 = false;
            c || n(this, l2);
            this.symbolName && -1 !== t2.indexOf(l2) && (f2 || (this.symbolAttr(a2), f2 = true), v2 = true);
            !this.rotation || "x" !== l2 && "y" !== l2 || (this.doTransform = true);
            v2 || (h2 = this[l2 + "Setter"] || this._defaultSetter, h2.call(this, g2, l2, b2), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(l2) && this.updateShadows(l2, g2, h2));
          }, this), this.afterSetters());
          g && g.call(this);
          return d2;
        };
        I.prototype.clip = function(a2) {
          return this.attr("clip-path", a2 ? "url(" + this.renderer.url + "#" + a2.id + ")" : "none");
        };
        I.prototype.crisp = function(a2, l) {
          l = l || a2.strokeWidth || 0;
          var g = Math.round(l) % 2 / 2;
          a2.x = Math.floor(a2.x || this.x || 0) + g;
          a2.y = Math.floor(a2.y || this.y || 0) + g;
          a2.width = Math.floor((a2.width || this.width || 0) - 2 * g);
          a2.height = Math.floor((a2.height || this.height || 0) - 2 * g);
          y(a2.strokeWidth) && (a2.strokeWidth = l);
          return a2;
        };
        I.prototype.complexColor = function(a2, l, g) {
          var c = this.renderer, b2, f2, n2, h2, k2, P, B2, I2, u2, J2, p2 = [], x2;
          d(this.renderer, "complexColor", { args: arguments }, function() {
            a2.radialGradient ? f2 = "radialGradient" : a2.linearGradient && (f2 = "linearGradient");
            if (f2) {
              n2 = a2[f2];
              k2 = c.gradients;
              P = a2.stops;
              u2 = g.radialReference;
              t(n2) && (a2[f2] = n2 = {
                x1: n2[0],
                y1: n2[1],
                x2: n2[2],
                y2: n2[3],
                gradientUnits: "userSpaceOnUse"
              });
              "radialGradient" === f2 && u2 && !y(n2.gradientUnits) && (h2 = n2, n2 = v(n2, c.getRadialAttr(u2, h2), { gradientUnits: "userSpaceOnUse" }));
              E(n2, function(c2, g2) {
                "id" !== g2 && p2.push(g2, c2);
              });
              E(P, function(c2) {
                p2.push(c2);
              });
              p2 = p2.join(",");
              if (k2[p2])
                J2 = k2[p2].attr("id");
              else {
                n2.id = J2 = z();
                var G = k2[p2] = c.createElement(f2).attr(n2).add(c.defs);
                G.radAttr = h2;
                G.stops = [];
                P.forEach(function(g2) {
                  0 === g2[1].indexOf("rgba") ? (b2 = q.parse(g2[1]), B2 = b2.get("rgb"), I2 = b2.get("a")) : (B2 = g2[1], I2 = 1);
                  g2 = c.createElement("stop").attr({
                    offset: g2[0],
                    "stop-color": B2,
                    "stop-opacity": I2
                  }).add(G);
                  G.stops.push(g2);
                });
              }
              x2 = "url(" + c.url + "#" + J2 + ")";
              g.setAttribute(l, x2);
              g.gradient = p2;
              a2.toString = function() {
                return x2;
              };
            }
          });
        };
        I.prototype.css = function(a2) {
          var l = this.styles, g = {}, c = this.element, b2 = "", f2 = !l, n2 = ["textOutline", "textOverflow", "width"];
          a2 && a2.color && (a2.fill = a2.color);
          l && E(a2, function(c2, a3) {
            l && l[a3] !== c2 && (g[a3] = c2, f2 = true);
          });
          if (f2) {
            l && (a2 = h(l, g));
            if (a2) {
              if (null === a2.width || "auto" === a2.width)
                delete this.textWidth;
              else if ("text" === c.nodeName.toLowerCase() && a2.width)
                var d2 = this.textWidth = B(a2.width);
            }
            this.styles = a2;
            d2 && !m && this.renderer.forExport && delete a2.width;
            if (c.namespaceURI === this.SVG_NS) {
              var v2 = function(c2, g2) {
                return "-" + g2.toLowerCase();
              };
              E(a2, function(c2, g2) {
                -1 === n2.indexOf(g2) && (b2 += g2.replace(/([A-Z])/g, v2) + ":" + c2 + ";");
              });
              b2 && x(c, "style", b2);
            } else
              u(c, a2);
            this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a2 && a2.textOutline && this.applyTextOutline(a2.textOutline));
          }
          return this;
        };
        I.prototype.dashstyleSetter = function(a2) {
          var l = this["stroke-width"];
          "inherit" === l && (l = 1);
          if (a2 = a2 && a2.toLowerCase()) {
            var g = a2.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
            for (a2 = g.length; a2--; )
              g[a2] = "" + B(g[a2]) * J(l, NaN);
            a2 = g.join(",").replace(/NaN/g, "none");
            this.element.setAttribute("stroke-dasharray", a2);
          }
        };
        I.prototype.destroy = function() {
          var a2 = this, l = a2.element || {}, g = a2.renderer, c = g.isSVG && "SPAN" === l.nodeName && a2.parentGroup || void 0, b2 = l.ownerSVGElement;
          l.onclick = l.onmouseout = l.onmouseover = l.onmousemove = l.point = null;
          n(a2);
          if (a2.clipPath && b2) {
            var f2 = a2.clipPath;
            [].forEach.call(b2.querySelectorAll("[clip-path],[CLIP-PATH]"), function(c2) {
              -1 < c2.getAttribute("clip-path").indexOf(f2.element.id) && c2.removeAttribute("clip-path");
            });
            a2.clipPath = f2.destroy();
          }
          if (a2.stops) {
            for (b2 = 0; b2 < a2.stops.length; b2++)
              a2.stops[b2].destroy();
            a2.stops.length = 0;
            a2.stops = void 0;
          }
          a2.safeRemoveChild(l);
          for (g.styledMode || a2.destroyShadows(); c && c.div && 0 === c.div.childNodes.length; )
            l = c.parentGroup, a2.safeRemoveChild(c.div), delete c.div, c = l;
          a2.alignTo && k(g.alignedObjects, a2);
          E(a2, function(c2, g2) {
            a2[g2] && a2[g2].parentGroup === a2 && a2[g2].destroy && a2[g2].destroy();
            delete a2[g2];
          });
        };
        I.prototype.destroyShadows = function() {
          (this.shadows || []).forEach(function(a2) {
            this.safeRemoveChild(a2);
          }, this);
          this.shadows = void 0;
        };
        I.prototype.destroyTextPath = function(a2, l) {
          var g = a2.getElementsByTagName("text")[0];
          if (g) {
            if (g.removeAttribute("dx"), g.removeAttribute("dy"), l.element.setAttribute("id", ""), this.textPathWrapper && g.getElementsByTagName("textPath").length) {
              for (a2 = this.textPathWrapper.element.childNodes; a2.length; )
                g.appendChild(a2[0]);
              g.removeChild(this.textPathWrapper.element);
            }
          } else if (a2.getAttribute("dx") || a2.getAttribute("dy"))
            a2.removeAttribute("dx"), a2.removeAttribute("dy");
          this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy());
        };
        I.prototype.dSetter = function(a2, l, g) {
          t(a2) && ("string" === typeof a2[0] && (a2 = this.renderer.pathToSegments(a2)), this.pathArray = a2, a2 = a2.reduce(function(c, g2, a3) {
            return g2 && g2.join ? (a3 ? c + " " : "") + g2.join(" ") : (g2 || "").toString();
          }, ""));
          /(NaN| {2}|^$)/.test(a2) && (a2 = "M 0 0");
          this[l] !== a2 && (g.setAttribute(l, a2), this[l] = a2);
        };
        I.prototype.fadeOut = function(a2) {
          var l = this;
          l.animate({ opacity: 0 }, { duration: J(a2, 150), complete: function() {
            l.attr({ y: -9999 }).hide();
          } });
        };
        I.prototype.fillSetter = function(a2, l, g) {
          "string" === typeof a2 ? g.setAttribute(l, a2) : a2 && this.complexColor(a2, l, g);
        };
        I.prototype.getBBox = function(a2, l) {
          var g, c = this.renderer, f2 = this.element, n2 = this.styles, d2 = this.textStr, v2 = c.cache, t2 = c.cacheKeys, E2 = f2.namespaceURI === this.SVG_NS;
          l = J(l, this.rotation, 0);
          var k2 = c.styledMode ? f2 && I.prototype.getStyle.call(f2, "font-size") : n2 && n2.fontSize;
          if (y(d2)) {
            var z2 = d2.toString();
            -1 === z2.indexOf("<") && (z2 = z2.replace(/[0-9]/g, "0"));
            z2 += ["", l, k2, this.textWidth, n2 && n2.textOverflow, n2 && n2.fontWeight].join();
          }
          z2 && !a2 && (g = v2[z2]);
          if (!g) {
            if (E2 || c.forExport) {
              try {
                var B2 = this.fakeTS && function(c2) {
                  [].forEach.call(f2.querySelectorAll(".highcharts-text-outline"), function(g2) {
                    g2.style.display = c2;
                  });
                };
                b(B2) && B2("none");
                g = f2.getBBox ? h({}, f2.getBBox()) : { width: f2.offsetWidth, height: f2.offsetHeight };
                b(B2) && B2("");
              } catch (T) {
              }
              if (!g || 0 > g.width)
                g = { width: 0, height: 0 };
            } else
              g = this.htmlGetBBox();
            c.isSVG && (a2 = g.width, c = g.height, E2 && (g.height = c = { "11px,17": 14, "13px,20": 16 }[n2 && n2.fontSize + "," + Math.round(c)] || c), l && (n2 = l * A, g.width = Math.abs(c * Math.sin(n2)) + Math.abs(a2 * Math.cos(n2)), g.height = Math.abs(c * Math.cos(n2)) + Math.abs(a2 * Math.sin(n2))));
            if (z2 && 0 < g.height) {
              for (; 250 < t2.length; )
                delete v2[t2.shift()];
              v2[z2] || t2.push(z2);
              v2[z2] = g;
            }
          }
          return g;
        };
        I.prototype.getStyle = function(a2) {
          return M.getComputedStyle(this.element || this, "").getPropertyValue(a2);
        };
        I.prototype.hasClass = function(a2) {
          return -1 !== ("" + this.attr("class")).split(" ").indexOf(a2);
        };
        I.prototype.hide = function(a2) {
          a2 ? this.attr({ y: -9999 }) : this.attr({ visibility: "hidden" });
          return this;
        };
        I.prototype.htmlGetBBox = function() {
          return { height: 0, width: 0, x: 0, y: 0 };
        };
        I.prototype.init = function(a2, l) {
          this.element = "span" === l ? p(l) : D.createElementNS(this.SVG_NS, l);
          this.renderer = a2;
          d(this, "afterInit");
        };
        I.prototype.invert = function(a2) {
          this.inverted = a2;
          this.updateTransform();
          return this;
        };
        I.prototype.on = function(a2, l) {
          var g, c, b2 = this.element, f2;
          F && "click" === a2 ? (b2.ontouchstart = function(a3) {
            g = a3.touches[0].clientX;
            c = a3.touches[0].clientY;
          }, b2.ontouchend = function(a3) {
            g && 4 <= Math.sqrt(Math.pow(g - a3.changedTouches[0].clientX, 2) + Math.pow(c - a3.changedTouches[0].clientY, 2)) || l.call(b2, a3);
            f2 = true;
            a3.preventDefault();
          }, b2.onclick = function(c2) {
            f2 || l.call(b2, c2);
          }) : b2["on" + a2] = l;
          return this;
        };
        I.prototype.opacitySetter = function(a2, l, g) {
          this[l] = a2;
          g.setAttribute(l, a2);
        };
        I.prototype.removeClass = function(b2) {
          return this.attr("class", ("" + this.attr("class")).replace(a(b2) ? new RegExp("(^| )" + b2 + "( |$)") : b2, " ").replace(/ +/g, " ").trim());
        };
        I.prototype.removeTextOutline = function(a2) {
          for (var l = a2.length, g; l--; )
            g = a2[l], "highcharts-text-outline" === g.getAttribute("class") && k(a2, this.element.removeChild(g));
        };
        I.prototype.safeRemoveChild = function(a2) {
          var l = a2.parentNode;
          l && l.removeChild(a2);
        };
        I.prototype.setRadialReference = function(a2) {
          var l = this.element.gradient && this.renderer.gradients[this.element.gradient];
          this.element.radialReference = a2;
          l && l.radAttr && l.animate(this.renderer.getRadialAttr(a2, l.radAttr));
          return this;
        };
        I.prototype.setTextPath = function(a2, l) {
          var g = this.element, c = { textAnchor: "text-anchor" }, b2 = false, n2 = this.textPathWrapper, d2 = !n2;
          l = v(true, { enabled: true, attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" } }, l);
          var h2 = l.attributes;
          if (a2 && l && l.enabled) {
            n2 && null === n2.element.parentNode ? (d2 = true, n2 = n2.destroy()) : n2 && this.removeTextOutline.call(n2.parentGroup, [].slice.call(g.getElementsByTagName("tspan")));
            this.options && this.options.padding && (h2.dx = -this.options.padding);
            n2 || (this.textPathWrapper = n2 = this.renderer.createElement("textPath"), b2 = true);
            var t2 = n2.element;
            (l = a2.element.getAttribute("id")) || a2.element.setAttribute("id", l = z());
            if (d2)
              for (a2 = g.getElementsByTagName("tspan"); a2.length; )
                a2[0].setAttribute("y", 0), f(h2.dx) && a2[0].setAttribute("x", -h2.dx), t2.appendChild(a2[0]);
            b2 && n2 && n2.add({ element: this.text ? this.text.element : g });
            t2.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + l);
            y(h2.dy) && (t2.parentNode.setAttribute("dy", h2.dy), delete h2.dy);
            y(h2.dx) && (t2.parentNode.setAttribute("dx", h2.dx), delete h2.dx);
            E(h2, function(g2, a3) {
              t2.setAttribute(c[a3] || a3, g2);
            });
            g.removeAttribute("transform");
            this.removeTextOutline.call(n2, [].slice.call(g.getElementsByTagName("tspan")));
            this.text && !this.renderer.styledMode && this.attr({ fill: "none", "stroke-width": 0 });
            this.applyTextOutline = this.updateTransform = C;
          } else
            n2 && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(g, a2), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
          return this;
        };
        I.prototype.shadow = function(a2, l, g) {
          var c = [], b2 = this.element, f2 = false, n2 = this.oldShadowOptions;
          var d2 = { color: "#000000", offsetX: 1, offsetY: 1, opacity: 0.15, width: 3 };
          var v2;
          true === a2 ? v2 = d2 : "object" === typeof a2 && (v2 = h(d2, a2));
          v2 && (v2 && n2 && E(v2, function(c2, g2) {
            c2 !== n2[g2] && (f2 = true);
          }), f2 && this.destroyShadows(), this.oldShadowOptions = v2);
          if (!v2)
            this.destroyShadows();
          else if (!this.shadows) {
            var t2 = v2.opacity / v2.width;
            var z2 = this.parentInverted ? "translate(-1,-1)" : "translate(" + v2.offsetX + ", " + v2.offsetY + ")";
            for (d2 = 1; d2 <= v2.width; d2++) {
              var k2 = b2.cloneNode(false);
              var B2 = 2 * v2.width + 1 - 2 * d2;
              x(k2, { stroke: a2.color || "#000000", "stroke-opacity": t2 * d2, "stroke-width": B2, transform: z2, fill: "none" });
              k2.setAttribute("class", (k2.getAttribute("class") || "") + " highcharts-shadow");
              g && (x(k2, "height", Math.max(x(k2, "height") - B2, 0)), k2.cutHeight = B2);
              l ? l.element.appendChild(k2) : b2.parentNode && b2.parentNode.insertBefore(k2, b2);
              c.push(k2);
            }
            this.shadows = c;
          }
          return this;
        };
        I.prototype.show = function(a2) {
          return this.attr({ visibility: a2 ? "inherit" : "visible" });
        };
        I.prototype.strokeSetter = function(a2, l, g) {
          this[l] = a2;
          this.stroke && this["stroke-width"] ? (I.prototype.fillSetter.call(
            this,
            this.stroke,
            "stroke",
            g
          ), g.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = true) : "stroke-width" === l && 0 === a2 && this.hasStroke ? (g.removeAttribute("stroke"), this.hasStroke = false) : this.renderer.styledMode && this["stroke-width"] && (g.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = true);
        };
        I.prototype.strokeWidth = function() {
          if (!this.renderer.styledMode)
            return this["stroke-width"] || 0;
          var a2 = this.getStyle("stroke-width"), l = 0;
          if (a2.indexOf("px") === a2.length - 2)
            l = B(a2);
          else if ("" !== a2) {
            var g = D.createElementNS(H, "rect");
            x(g, { width: a2, "stroke-width": 0 });
            this.element.parentNode.appendChild(g);
            l = g.getBBox().width;
            g.parentNode.removeChild(g);
          }
          return l;
        };
        I.prototype.symbolAttr = function(a2) {
          var l = this;
          "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(g) {
            l[g] = J(a2[g], l[g]);
          });
          l.attr({ d: l.renderer.symbols[l.symbolName](l.x, l.y, l.width, l.height, l) });
        };
        I.prototype.textSetter = function(a2) {
          a2 !== this.textStr && (delete this.textPxLength, this.textStr = a2, this.added && this.renderer.buildText(this));
        };
        I.prototype.titleSetter = function(a2) {
          var l = this.element.getElementsByTagName("title")[0];
          l || (l = D.createElementNS(this.SVG_NS, "title"), this.element.appendChild(l));
          l.firstChild && l.removeChild(l.firstChild);
          l.appendChild(D.createTextNode(String(J(a2, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")));
        };
        I.prototype.toFront = function() {
          var a2 = this.element;
          a2.parentNode.appendChild(a2);
          return this;
        };
        I.prototype.translate = function(a2, l) {
          return this.attr({ translateX: a2, translateY: l });
        };
        I.prototype.updateShadows = function(a2, l, g) {
          var c = this.shadows;
          if (c)
            for (var b2 = c.length; b2--; )
              g.call(c[b2], "height" === a2 ? Math.max(l - (c[b2].cutHeight || 0), 0) : "d" === a2 ? this.d : l, a2, c[b2]);
        };
        I.prototype.updateTransform = function() {
          var a2 = this.translateX || 0, l = this.translateY || 0, g = this.scaleX, c = this.scaleY, b2 = this.inverted, f2 = this.rotation, n2 = this.matrix, d2 = this.element;
          b2 && (a2 += this.width, l += this.height);
          a2 = ["translate(" + a2 + "," + l + ")"];
          y(n2) && a2.push("matrix(" + n2.join(",") + ")");
          b2 ? a2.push("rotate(90) scale(-1,1)") : f2 && a2.push("rotate(" + f2 + " " + J(
            this.rotationOriginX,
            d2.getAttribute("x"),
            0
          ) + " " + J(this.rotationOriginY, d2.getAttribute("y") || 0) + ")");
          (y(g) || y(c)) && a2.push("scale(" + J(g, 1) + " " + J(c, 1) + ")");
          a2.length && d2.setAttribute("transform", a2.join(" "));
        };
        I.prototype.visibilitySetter = function(a2, l, g) {
          "inherit" === a2 ? g.removeAttribute(l) : this[l] !== a2 && g.setAttribute(l, a2);
          this[l] = a2;
        };
        I.prototype.xGetter = function(a2) {
          "circle" === this.element.nodeName && ("x" === a2 ? a2 = "cx" : "y" === a2 && (a2 = "cy"));
          return this._defaultGetter(a2);
        };
        I.prototype.zIndexSetter = function(a2, l) {
          var g = this.renderer, c = this.parentGroup, b2 = (c || g).element || g.box, f2 = this.element, n2 = false;
          g = b2 === g.box;
          var d2 = this.added;
          var v2;
          y(a2) ? (f2.setAttribute("data-z-index", a2), a2 = +a2, this[l] === a2 && (d2 = false)) : y(this[l]) && f2.removeAttribute("data-z-index");
          this[l] = a2;
          if (d2) {
            (a2 = this.zIndex) && c && (c.handleZ = true);
            l = b2.childNodes;
            for (v2 = l.length - 1; 0 <= v2 && !n2; v2--) {
              c = l[v2];
              d2 = c.getAttribute("data-z-index");
              var h2 = !y(d2);
              if (c !== f2) {
                if (0 > a2 && h2 && !g && !v2)
                  b2.insertBefore(f2, l[v2]), n2 = true;
                else if (B(d2) <= a2 || h2 && (!y(a2) || 0 <= a2))
                  b2.insertBefore(f2, l[v2 + 1] || null), n2 = true;
              }
            }
            n2 || (b2.insertBefore(f2, l[g ? 3 : 0] || null), n2 = true);
          }
          return n2;
        };
        return I;
      }();
      r2.prototype["stroke-widthSetter"] = r2.prototype.strokeSetter;
      r2.prototype.yGetter = r2.prototype.xGetter;
      r2.prototype.matrixSetter = r2.prototype.rotationOriginXSetter = r2.prototype.rotationOriginYSetter = r2.prototype.rotationSetter = r2.prototype.scaleXSetter = r2.prototype.scaleYSetter = r2.prototype.translateXSetter = r2.prototype.translateYSetter = r2.prototype.verticalAlignSetter = function(a2, b2) {
        this[b2] = a2;
        this.doTransform = true;
      };
      e.SVGElement = r2;
      return e.SVGElement;
    });
    N(r, "parts/SVGLabel.js", [
      r["parts/SVGElement.js"],
      r["parts/Utilities.js"]
    ], function(q, e) {
      var r2 = this && this.__extends || function() {
        var e2 = function(m, M) {
          e2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, m2) {
            e3.__proto__ = m2;
          } || function(e3, m2) {
            for (var x in m2)
              m2.hasOwnProperty(x) && (e3[x] = m2[x]);
          };
          return e2(m, M);
        };
        return function(m, M) {
          function w() {
            this.constructor = m;
          }
          e2(m, M);
          m.prototype = null === M ? Object.create(M) : (w.prototype = M.prototype, new w());
        };
      }(), A = e.defined, D = e.extend, F = e.isNumber, K = e.merge, C = e.removeEvent;
      return function(e2) {
        function m(M, w, q2, x, p, u, y, k, h, d) {
          var t = e2.call(this) || this;
          t.init(M, "g");
          t.textStr = w;
          t.x = q2;
          t.y = x;
          t.anchorX = u;
          t.anchorY = y;
          t.baseline = h;
          t.className = d;
          "button" !== d && t.addClass("highcharts-label");
          d && t.addClass("highcharts-" + d);
          t.text = M.text("", 0, 0, k).attr({ zIndex: 1 });
          if ("string" === typeof p) {
            var b = /^url\((.*?)\)$/.test(p);
            if (t.renderer.symbols[p] || b)
              t.symbolKey = p;
          }
          t.bBox = m.emptyBBox;
          t.padding = 3;
          t.paddingLeft = 0;
          t.baselineOffset = 0;
          t.needsBox = M.styledMode || b;
          t.deferredAttr = {};
          t.alignFactor = 0;
          return t;
        }
        r2(m, e2);
        m.prototype.alignSetter = function(m2) {
          m2 = { left: 0, center: 0.5, right: 1 }[m2];
          m2 !== this.alignFactor && (this.alignFactor = m2, this.bBox && F(this.xSetting) && this.attr({ x: this.xSetting }));
        };
        m.prototype.anchorXSetter = function(m2, e3) {
          this.anchorX = m2;
          this.boxAttr(e3, Math.round(m2) - this.getCrispAdjust() - this.xSetting);
        };
        m.prototype.anchorYSetter = function(m2, e3) {
          this.anchorY = m2;
          this.boxAttr(e3, m2 - this.ySetting);
        };
        m.prototype.boxAttr = function(m2, e3) {
          this.box ? this.box.attr(m2, e3) : this.deferredAttr[m2] = e3;
        };
        m.prototype.css = function(e3) {
          if (e3) {
            var w = {};
            e3 = K(e3);
            m.textProps.forEach(function(x) {
              "undefined" !== typeof e3[x] && (w[x] = e3[x], delete e3[x]);
            });
            this.text.css(w);
            var M = "fontSize" in w || "fontWeight" in w;
            if ("width" in w || M)
              this.updateBoxSize(), M && this.updateTextPadding();
          }
          return q.prototype.css.call(this, e3);
        };
        m.prototype.destroy = function() {
          C(this.element, "mouseenter");
          C(this.element, "mouseleave");
          this.text && this.text.destroy();
          this.box && (this.box = this.box.destroy());
          q.prototype.destroy.call(this);
        };
        m.prototype.fillSetter = function(m2, e3) {
          m2 && (this.needsBox = true);
          this.fill = m2;
          this.boxAttr(e3, m2);
        };
        m.prototype.getBBox = function() {
          var m2 = this.bBox, e3 = this.padding;
          return { width: m2.width + 2 * e3, height: m2.height + 2 * e3, x: m2.x - e3, y: m2.y - e3 };
        };
        m.prototype.getCrispAdjust = function() {
          return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2;
        };
        m.prototype.heightSetter = function(m2) {
          this.heightSetting = m2;
        };
        m.prototype.on = function(m2, e3) {
          var w = this, x = w.text, p = x && "SPAN" === x.element.tagName ? x : void 0;
          if (p) {
            var u = function(u2) {
              ("mouseenter" === m2 || "mouseleave" === m2) && u2.relatedTarget instanceof Element && (w.element.contains(u2.relatedTarget) || p.element.contains(u2.relatedTarget)) || e3.call(w.element, u2);
            };
            p.on(m2, u);
          }
          q.prototype.on.call(w, m2, u || e3);
          return w;
        };
        m.prototype.onAdd = function() {
          var m2 = this.textStr;
          this.text.add(this);
          this.attr({ text: A(m2) ? m2 : "", x: this.x, y: this.y });
          this.box && A(this.anchorX) && this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
        };
        m.prototype.paddingSetter = function(m2) {
          A(m2) && m2 !== this.padding && (this.padding = m2, this.updateTextPadding());
        };
        m.prototype.paddingLeftSetter = function(m2) {
          A(m2) && m2 !== this.paddingLeft && (this.paddingLeft = m2, this.updateTextPadding());
        };
        m.prototype.rSetter = function(m2, e3) {
          this.boxAttr(e3, m2);
        };
        m.prototype.shadow = function(m2) {
          m2 && !this.renderer.styledMode && (this.updateBoxSize(), this.box && this.box.shadow(m2));
          return this;
        };
        m.prototype.strokeSetter = function(m2, e3) {
          this.stroke = m2;
          this.boxAttr(e3, m2);
        };
        m.prototype["stroke-widthSetter"] = function(m2, e3) {
          m2 && (this.needsBox = true);
          this["stroke-width"] = m2;
          this.boxAttr(e3, m2);
        };
        m.prototype["text-alignSetter"] = function(m2) {
          this.textAlign = m2;
        };
        m.prototype.textSetter = function(m2) {
          "undefined" !== typeof m2 && this.text.attr({ text: m2 });
          this.updateBoxSize();
          this.updateTextPadding();
        };
        m.prototype.updateBoxSize = function() {
          var e3 = this.text.element.style, w = {}, q2 = this.padding, x = this.paddingLeft, p = F(this.widthSetting) && F(this.heightSetting) && !this.textAlign || !A(this.text.textStr) ? m.emptyBBox : this.text.getBBox();
          this.width = (this.widthSetting || p.width || 0) + 2 * q2 + x;
          this.height = (this.heightSetting || p.height || 0) + 2 * q2;
          this.baselineOffset = q2 + Math.min(this.renderer.fontMetrics(
            e3 && e3.fontSize,
            this.text
          ).b, p.height || Infinity);
          this.needsBox && (this.box || (e3 = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), e3.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), e3.add(this), e3 = this.getCrispAdjust(), w.x = e3, w.y = (this.baseline ? -this.baselineOffset : 0) + e3), w.width = Math.round(this.width), w.height = Math.round(this.height), this.box.attr(D(w, this.deferredAttr)), this.deferredAttr = {});
          this.bBox = p;
        };
        m.prototype.updateTextPadding = function() {
          var m2 = this.text, e3 = this.baseline ? 0 : this.baselineOffset, q2 = this.paddingLeft + this.padding;
          A(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (q2 += { center: 0.5, right: 1 }[this.textAlign] * (this.widthSetting - this.bBox.width));
          if (q2 !== m2.x || e3 !== m2.y)
            m2.attr("x", q2), m2.hasBoxWidthChanged && (this.bBox = m2.getBBox(true), this.updateBoxSize()), "undefined" !== typeof e3 && m2.attr("y", e3);
          m2.x = q2;
          m2.y = e3;
        };
        m.prototype.widthSetter = function(m2) {
          this.widthSetting = F(m2) ? m2 : void 0;
        };
        m.prototype.xSetter = function(m2) {
          this.x = m2;
          this.alignFactor && (m2 -= this.alignFactor * ((this.widthSetting || this.bBox.width) + 2 * this.padding), this["forceAnimate:x"] = true);
          this.xSetting = Math.round(m2);
          this.attr("translateX", this.xSetting);
        };
        m.prototype.ySetter = function(m2) {
          this.ySetting = this.y = Math.round(m2);
          this.attr("translateY", this.ySetting);
        };
        m.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
        m.textProps = "color cursor direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
        return m;
      }(q);
    });
    N(r, "parts/SVGRenderer.js", [r["parts/Color.js"], r["parts/Globals.js"], r["parts/SVGElement.js"], r["parts/SVGLabel.js"], r["parts/Utilities.js"]], function(q, e, r2, A, D) {
      var F = D.addEvent, K = D.attr, C = D.createElement, m = D.css, H = D.defined, M = D.destroyObjectProperties, w = D.extend, L = D.isArray, x = D.isNumber, p = D.isObject, u = D.isString, y = D.merge, k = D.objectEach, h = D.pick, d = D.pInt, t = D.splat, b = D.uniqueKey, f = e.charts, a = e.deg2rad, v = e.doc, E = e.isFirefox, J = e.isMS, B = e.isWebKit;
      D = e.noop;
      var n = e.svg, z = e.SVG_NS, I = e.symbolSizes, P = e.win, l = function() {
        function g(c, g2, a2, l2, b2, f2, n2) {
          this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
          this.init(c, g2, a2, l2, b2, f2, n2);
        }
        g.prototype.init = function(c, g2, a2, l2, b2, f2, n2) {
          var G = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" });
          n2 || G.css(this.getStyle(l2));
          l2 = G.element;
          c.appendChild(l2);
          K(c, "dir", "ltr");
          -1 === c.innerHTML.indexOf("xmlns") && K(l2, "xmlns", this.SVG_NS);
          this.isSVG = true;
          this.box = l2;
          this.boxWrapper = G;
          this.alignedObjects = [];
          this.url = (E || B) && v.getElementsByTagName("base").length ? P.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
          this.createElement("desc").add().element.appendChild(v.createTextNode("Created with Highcharts 8.1.1"));
          this.defs = this.createElement("defs").add();
          this.allowHTML = f2;
          this.forExport = b2;
          this.styledMode = n2;
          this.gradients = {};
          this.cache = {};
          this.cacheKeys = [];
          this.imgCount = 0;
          this.setSize(g2, a2, false);
          var d2;
          E && c.getBoundingClientRect && (g2 = function() {
            m(c, { left: 0, top: 0 });
            d2 = c.getBoundingClientRect();
            m(c, { left: Math.ceil(d2.left) - d2.left + "px", top: Math.ceil(d2.top) - d2.top + "px" });
          }, g2(), this.unSubPixelFix = F(P, "resize", g2));
        };
        g.prototype.definition = function(c) {
          function g2(c2, l2) {
            var b2;
            t(c2).forEach(function(c3) {
              var f2 = a2.createElement(c3.tagName), n2 = {};
              k(c3, function(c4, g3) {
                "tagName" !== g3 && "children" !== g3 && "textContent" !== g3 && (n2[g3] = c4);
              });
              f2.attr(n2);
              f2.add(l2 || a2.defs);
              c3.textContent && f2.element.appendChild(v.createTextNode(c3.textContent));
              g2(c3.children || [], f2);
              b2 = f2;
            });
            return b2;
          }
          var a2 = this;
          return g2(c);
        };
        g.prototype.getStyle = function(c) {
          return this.style = w({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, c);
        };
        g.prototype.setStyle = function(c) {
          this.boxWrapper.css(this.getStyle(c));
        };
        g.prototype.isHidden = function() {
          return !this.boxWrapper.getBBox().width;
        };
        g.prototype.destroy = function() {
          var c = this.defs;
          this.box = null;
          this.boxWrapper = this.boxWrapper.destroy();
          M(this.gradients || {});
          this.gradients = null;
          c && (this.defs = c.destroy());
          this.unSubPixelFix && this.unSubPixelFix();
          return this.alignedObjects = null;
        };
        g.prototype.createElement = function(c) {
          var g2 = new this.Element();
          g2.init(this, c);
          return g2;
        };
        g.prototype.getRadialAttr = function(c, g2) {
          return { cx: c[0] - c[2] / 2 + g2.cx * c[2], cy: c[1] - c[2] / 2 + g2.cy * c[2], r: g2.r * c[2] };
        };
        g.prototype.truncate = function(c, g2, a2, l2, b2, f2, n2) {
          var G = this, d2 = c.rotation, O, h2 = l2 ? 1 : 0, t2 = (a2 || l2).length, E2 = t2, k2 = [], z2 = function(c2) {
            g2.firstChild && g2.removeChild(g2.firstChild);
            c2 && g2.appendChild(v.createTextNode(c2));
          }, B2 = function(f3, d3) {
            d3 = d3 || f3;
            if ("undefined" === typeof k2[d3])
              if (g2.getSubStringLength)
                try {
                  k2[d3] = b2 + g2.getSubStringLength(0, l2 ? d3 + 1 : d3);
                } catch (oa) {
                }
              else
                G.getSpanWidth && (z2(n2(a2 || l2, f3)), k2[d3] = b2 + G.getSpanWidth(c, g2));
            return k2[d3];
          }, Q;
          c.rotation = 0;
          var I2 = B2(g2.textContent.length);
          if (Q = b2 + I2 > f2) {
            for (; h2 <= t2; )
              E2 = Math.ceil((h2 + t2) / 2), l2 && (O = n2(l2, E2)), I2 = B2(E2, O && O.length - 1), h2 === t2 ? h2 = t2 + 1 : I2 > f2 ? t2 = E2 - 1 : h2 = E2;
            0 === t2 ? z2("") : a2 && t2 === a2.length - 1 || z2(O || n2(a2 || l2, E2));
          }
          l2 && l2.splice(0, E2);
          c.actualWidth = I2;
          c.rotation = d2;
          return Q;
        };
        g.prototype.buildText = function(c) {
          var g2 = c.element, a2 = this, l2 = a2.forExport, b2 = h(c.textStr, "").toString(), f2 = -1 !== b2.indexOf("<"), t2 = g2.childNodes, E2, B2 = K(g2, "x"), I2 = c.styles, J2 = c.textWidth, p2 = I2 && I2.lineHeight, y2 = I2 && I2.textOutline, x2 = I2 && "ellipsis" === I2.textOverflow, e2 = I2 && "nowrap" === I2.whiteSpace, P2 = I2 && I2.fontSize, w2, q2 = t2.length;
          I2 = J2 && !c.added && this.box;
          var H2 = function(c2) {
            var b3;
            a2.styledMode || (b3 = /(px|em)$/.test(c2 && c2.style.fontSize) ? c2.style.fontSize : P2 || a2.style.fontSize || 12);
            return p2 ? d(p2) : a2.fontMetrics(b3, c2.getAttribute("style") ? c2 : g2).h;
          }, L2 = function(c2, g3) {
            k(a2.escapes, function(a3, b3) {
              g3 && -1 !== g3.indexOf(a3) || (c2 = c2.toString().replace(new RegExp(a3, "g"), b3));
            });
            return c2;
          }, C2 = function(c2, g3) {
            var a3 = c2.indexOf("<");
            c2 = c2.substring(a3, c2.indexOf(">") - a3);
            a3 = c2.indexOf(g3 + "=");
            if (-1 !== a3 && (a3 = a3 + g3.length + 1, g3 = c2.charAt(a3), '"' === g3 || "'" === g3))
              return c2 = c2.substring(a3 + 1), c2.substring(0, c2.indexOf(g3));
          }, r3 = /<br.*?>/g;
          var M2 = [b2, x2, e2, p2, y2, P2, J2].join();
          if (M2 !== c.textCache) {
            for (c.textCache = M2; q2--; )
              g2.removeChild(t2[q2]);
            f2 || y2 || x2 || J2 || -1 !== b2.indexOf(" ") && (!e2 || r3.test(b2)) ? (I2 && I2.appendChild(g2), f2 ? (b2 = a2.styledMode ? b2.replace(/<(b|strong)>/g, '<span class="highcharts-strong">').replace(
              /<(i|em)>/g,
              '<span class="highcharts-emphasized">'
            ) : b2.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">'), b2 = b2.replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(r3)) : b2 = [b2], b2 = b2.filter(function(c2) {
              return "" !== c2;
            }), b2.forEach(function(b3, f3) {
              var G = 0, d2 = 0;
              b3 = b3.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
              var h2 = b3.split("|||");
              h2.forEach(function(b4) {
                if ("" !== b4 || 1 === h2.length) {
                  var O = {}, t3 = v.createElementNS(
                    a2.SVG_NS,
                    "tspan"
                  ), k2, Q;
                  (k2 = C2(b4, "class")) && K(t3, "class", k2);
                  if (k2 = C2(b4, "style"))
                    k2 = k2.replace(/(;| |^)color([ :])/, "$1fill$2"), K(t3, "style", k2);
                  if ((Q = C2(b4, "href")) && !l2 && -1 === Q.split(":")[0].toLowerCase().indexOf("javascript")) {
                    var I3 = v.createElementNS(a2.SVG_NS, "a");
                    K(I3, "href", Q);
                    K(t3, "class", "highcharts-anchor");
                    I3.appendChild(t3);
                    a2.styledMode || m(t3, { cursor: "pointer" });
                  }
                  b4 = L2(b4.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                  if (" " !== b4) {
                    t3.appendChild(v.createTextNode(b4));
                    G ? O.dx = 0 : f3 && null !== B2 && (O.x = B2);
                    K(t3, O);
                    g2.appendChild(I3 || t3);
                    !G && w2 && (!n && l2 && m(t3, { display: "block" }), K(t3, "dy", H2(t3)));
                    if (J2) {
                      var u2 = b4.replace(/([^\^])-/g, "$1- ").split(" ");
                      O = !e2 && (1 < h2.length || f3 || 1 < u2.length);
                      I3 = 0;
                      Q = H2(t3);
                      if (x2)
                        E2 = a2.truncate(c, t3, b4, void 0, 0, Math.max(0, J2 - parseInt(P2 || 12, 10)), function(c2, g3) {
                          return c2.substring(0, g3) + "…";
                        });
                      else if (O)
                        for (; u2.length; )
                          u2.length && !e2 && 0 < I3 && (t3 = v.createElementNS(z, "tspan"), K(t3, { dy: Q, x: B2 }), k2 && K(t3, "style", k2), t3.appendChild(v.createTextNode(u2.join(" ").replace(/- /g, "-"))), g2.appendChild(t3)), a2.truncate(c, t3, null, u2, 0 === I3 ? d2 : 0, J2, function(c2, g3) {
                            return u2.slice(
                              0,
                              g3
                            ).join(" ").replace(/- /g, "-");
                          }), d2 = c.actualWidth, I3++;
                    }
                    G++;
                  }
                }
              });
              w2 = w2 || g2.childNodes.length;
            }), x2 && E2 && c.attr("title", L2(c.textStr || "", ["&lt;", "&gt;"])), I2 && I2.removeChild(g2), u(y2) && c.applyTextOutline && c.applyTextOutline(y2)) : g2.appendChild(v.createTextNode(L2(b2)));
          }
        };
        g.prototype.getContrast = function(c) {
          c = q.parse(c).rgba;
          c[0] *= 1;
          c[1] *= 1.2;
          c[2] *= 0.5;
          return 459 < c[0] + c[1] + c[2] ? "#000000" : "#FFFFFF";
        };
        g.prototype.button = function(c, g2, a2, b2, l2, f2, n2, d2, v2, h2) {
          var G = this.label(c, g2, a2, v2, void 0, void 0, h2, void 0, "button"), O = 0, t2 = this.styledMode;
          c = l2 && l2.style || {};
          l2 && l2.style && delete l2.style;
          G.attr(y({ padding: 8, r: 2 }, l2));
          if (!t2) {
            l2 = y({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontWeight: "normal" } }, { style: c }, l2);
            var E2 = l2.style;
            delete l2.style;
            f2 = y(l2, { fill: "#e6e6e6" }, f2);
            var k2 = f2.style;
            delete f2.style;
            n2 = y(l2, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, n2);
            var z2 = n2.style;
            delete n2.style;
            d2 = y(l2, { style: { color: "#cccccc" } }, d2);
            var B2 = d2.style;
            delete d2.style;
          }
          F(G.element, J ? "mouseover" : "mouseenter", function() {
            3 !== O && G.setState(1);
          });
          F(G.element, J ? "mouseout" : "mouseleave", function() {
            3 !== O && G.setState(O);
          });
          G.setState = function(c2) {
            1 !== c2 && (G.state = O = c2);
            G.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][c2 || 0]);
            t2 || G.attr([l2, f2, n2, d2][c2 || 0]).css([E2, k2, z2, B2][c2 || 0]);
          };
          t2 || G.attr(l2).css(w({ cursor: "default" }, E2));
          return G.on("click", function(c2) {
            3 !== O && b2.call(G, c2);
          });
        };
        g.prototype.crispLine = function(c, g2, a2) {
          void 0 === a2 && (a2 = "round");
          var b2 = c[0], l2 = c[1];
          b2[1] === l2[1] && (b2[1] = l2[1] = Math[a2](b2[1]) - g2 % 2 / 2);
          b2[2] === l2[2] && (b2[2] = l2[2] = Math[a2](b2[2]) + g2 % 2 / 2);
          return c;
        };
        g.prototype.path = function(c) {
          var g2 = this.styledMode ? {} : { fill: "none" };
          L(c) ? g2.d = c : p(c) && w(g2, c);
          return this.createElement("path").attr(g2);
        };
        g.prototype.circle = function(c, g2, a2) {
          c = p(c) ? c : "undefined" === typeof c ? {} : { x: c, y: g2, r: a2 };
          g2 = this.createElement("circle");
          g2.xSetter = g2.ySetter = function(c2, g3, a3) {
            a3.setAttribute("c" + g3, c2);
          };
          return g2.attr(c);
        };
        g.prototype.arc = function(c, g2, a2, b2, l2, f2) {
          p(c) ? (b2 = c, g2 = b2.y, a2 = b2.r, c = b2.x) : b2 = {
            innerR: b2,
            start: l2,
            end: f2
          };
          c = this.symbol("arc", c, g2, a2, a2, b2);
          c.r = a2;
          return c;
        };
        g.prototype.rect = function(c, g2, a2, b2, l2, f2) {
          l2 = p(c) ? c.r : l2;
          var n2 = this.createElement("rect");
          c = p(c) ? c : "undefined" === typeof c ? {} : { x: c, y: g2, width: Math.max(a2, 0), height: Math.max(b2, 0) };
          this.styledMode || ("undefined" !== typeof f2 && (c.strokeWidth = f2, c = n2.crisp(c)), c.fill = "none");
          l2 && (c.r = l2);
          n2.rSetter = function(c2, g3, a3) {
            n2.r = c2;
            K(a3, { rx: c2, ry: c2 });
          };
          n2.rGetter = function() {
            return n2.r;
          };
          return n2.attr(c);
        };
        g.prototype.setSize = function(c, g2, a2) {
          var b2 = this.alignedObjects, l2 = b2.length;
          this.width = c;
          this.height = g2;
          for (this.boxWrapper.animate({ width: c, height: g2 }, { step: function() {
            this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
          }, duration: h(a2, true) ? void 0 : 0 }); l2--; )
            b2[l2].align();
        };
        g.prototype.g = function(c) {
          var g2 = this.createElement("g");
          return c ? g2.attr({ "class": "highcharts-" + c }) : g2;
        };
        g.prototype.image = function(c, g2, a2, b2, l2, f2) {
          var n2 = { preserveAspectRatio: "none" }, G = function(c2, g3) {
            c2.setAttributeNS ? c2.setAttributeNS("http://www.w3.org/1999/xlink", "href", g3) : c2.setAttribute(
              "hc-svg-href",
              g3
            );
          }, d2 = function(g3) {
            G(v2.element, c);
            f2.call(v2, g3);
          };
          1 < arguments.length && w(n2, { x: g2, y: a2, width: b2, height: l2 });
          var v2 = this.createElement("image").attr(n2);
          f2 ? (G(v2.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), n2 = new P.Image(), F(n2, "load", d2), n2.src = c, n2.complete && d2({})) : G(v2.element, c);
          return v2;
        };
        g.prototype.symbol = function(c, g2, a2, b2, l2, n2) {
          var G = this, d2 = /^url\((.*?)\)$/, O = d2.test(c), t2 = !O && (this.symbols[c] ? c : "circle"), E2 = t2 && this.symbols[t2], k2;
          if (E2) {
            "number" === typeof g2 && (k2 = E2.call(
              this.symbols,
              Math.round(g2 || 0),
              Math.round(a2 || 0),
              b2 || 0,
              l2 || 0,
              n2
            ));
            var z2 = this.path(k2);
            G.styledMode || z2.attr("fill", "none");
            w(z2, { symbolName: t2, x: g2, y: a2, width: b2, height: l2 });
            n2 && w(z2, n2);
          } else if (O) {
            var B2 = c.match(d2)[1];
            z2 = this.image(B2);
            z2.imgwidth = h(I[B2] && I[B2].width, n2 && n2.width);
            z2.imgheight = h(I[B2] && I[B2].height, n2 && n2.height);
            var Q = function() {
              z2.attr({ width: z2.width, height: z2.height });
            };
            ["width", "height"].forEach(function(c2) {
              z2[c2 + "Setter"] = function(c3, g3) {
                var a3 = {}, b3 = this["img" + g3], l3 = "width" === g3 ? "translateX" : "translateY";
                this[g3] = c3;
                H(b3) && (n2 && "within" === n2.backgroundSize && this.width && this.height && (b3 = Math.round(b3 * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(g3, b3), this.alignByTranslate || (a3[l3] = ((this[g3] || 0) - b3) / 2, this.attr(a3)));
              };
            });
            H(g2) && z2.attr({ x: g2, y: a2 });
            z2.isImg = true;
            H(z2.imgwidth) && H(z2.imgheight) ? Q() : (z2.attr({ width: 0, height: 0 }), C("img", { onload: function() {
              var c2 = f[G.chartIndex];
              0 === this.width && (m(this, { position: "absolute", top: "-999em" }), v.body.appendChild(this));
              I[B2] = { width: this.width, height: this.height };
              z2.imgwidth = this.width;
              z2.imgheight = this.height;
              z2.element && Q();
              this.parentNode && this.parentNode.removeChild(this);
              G.imgCount--;
              if (!G.imgCount && c2 && !c2.hasLoaded)
                c2.onload();
            }, src: B2 }), this.imgCount++);
          }
          return z2;
        };
        g.prototype.clipRect = function(c, g2, a2, l2) {
          var f2 = b() + "-", n2 = this.createElement("clipPath").attr({ id: f2 }).add(this.defs);
          c = this.rect(c, g2, a2, l2, 0).add(n2);
          c.id = f2;
          c.clipPath = n2;
          c.count = 0;
          return c;
        };
        g.prototype.text = function(c, g2, a2, b2) {
          var l2 = {};
          if (b2 && (this.allowHTML || !this.forExport))
            return this.html(c, g2, a2);
          l2.x = Math.round(g2 || 0);
          a2 && (l2.y = Math.round(a2));
          H(c) && (l2.text = c);
          c = this.createElement("text").attr(l2);
          b2 || (c.xSetter = function(c2, g3, a3) {
            var b3 = a3.getElementsByTagName("tspan"), l3 = a3.getAttribute(g3), f2;
            for (f2 = 0; f2 < b3.length; f2++) {
              var n2 = b3[f2];
              n2.getAttribute(g3) === l3 && n2.setAttribute(g3, c2);
            }
            a3.setAttribute(g3, c2);
          });
          return c;
        };
        g.prototype.fontMetrics = function(c, g2) {
          c = !this.styledMode && /px/.test(c) || !P.getComputedStyle ? c || g2 && g2.style && g2.style.fontSize || this.style && this.style.fontSize : g2 && r2.prototype.getStyle.call(g2, "font-size");
          c = /px/.test(c) ? d(c) : 12;
          g2 = 24 > c ? c + 3 : Math.round(1.2 * c);
          return { h: g2, b: Math.round(0.8 * g2), f: c };
        };
        g.prototype.rotCorr = function(c, g2, b2) {
          var l2 = c;
          g2 && b2 && (l2 = Math.max(l2 * Math.cos(g2 * a), 4));
          return { x: -c / 3 * Math.sin(g2 * a), y: l2 };
        };
        g.prototype.pathToSegments = function(c) {
          for (var g2 = [], a2 = [], b2 = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 }, l2 = 0; l2 < c.length; l2++)
            u(a2[0]) && x(c[l2]) && a2.length === b2[a2[0].toUpperCase()] && c.splice(l2, 0, a2[0].replace("M", "L").replace("m", "l")), "string" === typeof c[l2] && (a2.length && g2.push(a2.slice(0)), a2.length = 0), a2.push(c[l2]);
          g2.push(a2.slice(0));
          return g2;
        };
        g.prototype.label = function(c, g2, a2, b2, l2, f2, n2, d2, v2) {
          return new A(this, c, g2, a2, b2, l2, f2, n2, d2, v2);
        };
        return g;
      }();
      l.prototype.Element = r2;
      l.prototype.SVG_NS = z;
      l.prototype.draw = D;
      l.prototype.escapes = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
      l.prototype.symbols = { circle: function(g, c, a2, b2) {
        return this.arc(g + a2 / 2, c + b2 / 2, a2 / 2, b2 / 2, { start: 0.5 * Math.PI, end: 2.5 * Math.PI, open: false });
      }, square: function(g, c, a2, b2) {
        return [["M", g, c], ["L", g + a2, c], ["L", g + a2, c + b2], ["L", g, c + b2], ["Z"]];
      }, triangle: function(g, c, a2, b2) {
        return [[
          "M",
          g + a2 / 2,
          c
        ], ["L", g + a2, c + b2], ["L", g, c + b2], ["Z"]];
      }, "triangle-down": function(g, c, a2, b2) {
        return [["M", g, c], ["L", g + a2, c], ["L", g + a2 / 2, c + b2], ["Z"]];
      }, diamond: function(g, c, a2, b2) {
        return [["M", g + a2 / 2, c], ["L", g + a2, c + b2 / 2], ["L", g + a2 / 2, c + b2], ["L", g, c + b2 / 2], ["Z"]];
      }, arc: function(g, c, a2, b2, l2) {
        var f2 = [];
        if (l2) {
          var n2 = l2.start || 0, d2 = l2.end || 0, G = l2.r || a2;
          a2 = l2.r || b2 || a2;
          var v2 = 1e-3 > Math.abs(d2 - n2 - 2 * Math.PI);
          d2 -= 1e-3;
          b2 = l2.innerR;
          v2 = h(l2.open, v2);
          var t2 = Math.cos(n2), O = Math.sin(n2), z2 = Math.cos(d2), E2 = Math.sin(d2);
          n2 = h(l2.longArc, 1e-3 > d2 - n2 - Math.PI ? 0 : 1);
          f2.push([
            "M",
            g + G * t2,
            c + a2 * O
          ], ["A", G, a2, 0, n2, h(l2.clockwise, 1), g + G * z2, c + a2 * E2]);
          H(b2) && f2.push(v2 ? ["M", g + b2 * z2, c + b2 * E2] : ["L", g + b2 * z2, c + b2 * E2], ["A", b2, b2, 0, n2, H(l2.clockwise) ? 1 - l2.clockwise : 0, g + b2 * t2, c + b2 * O]);
          v2 || f2.push(["Z"]);
        }
        return f2;
      }, callout: function(g, c, a2, b2, l2) {
        var f2 = Math.min(l2 && l2.r || 0, a2, b2), n2 = f2 + 6, d2 = l2 && l2.anchorX || 0;
        l2 = l2 && l2.anchorY || 0;
        var G = [["M", g + f2, c], ["L", g + a2 - f2, c], ["C", g + a2, c, g + a2, c, g + a2, c + f2], ["L", g + a2, c + b2 - f2], ["C", g + a2, c + b2, g + a2, c + b2, g + a2 - f2, c + b2], ["L", g + f2, c + b2], ["C", g, c + b2, g, c + b2, g, c + b2 - f2], ["L", g, c + f2], ["C", g, c, g, c, g + f2, c]];
        d2 && d2 > a2 ? l2 > c + n2 && l2 < c + b2 - n2 ? G.splice(
          3,
          1,
          ["L", g + a2, l2 - 6],
          ["L", g + a2 + 6, l2],
          ["L", g + a2, l2 + 6],
          ["L", g + a2, c + b2 - f2]
        ) : G.splice(3, 1, ["L", g + a2, b2 / 2], ["L", d2, l2], ["L", g + a2, b2 / 2], ["L", g + a2, c + b2 - f2]) : d2 && 0 > d2 ? l2 > c + n2 && l2 < c + b2 - n2 ? G.splice(7, 1, ["L", g, l2 + 6], ["L", g - 6, l2], ["L", g, l2 - 6], ["L", g, c + f2]) : G.splice(7, 1, ["L", g, b2 / 2], ["L", d2, l2], ["L", g, b2 / 2], ["L", g, c + f2]) : l2 && l2 > b2 && d2 > g + n2 && d2 < g + a2 - n2 ? G.splice(5, 1, ["L", d2 + 6, c + b2], ["L", d2, c + b2 + 6], ["L", d2 - 6, c + b2], ["L", g + f2, c + b2]) : l2 && 0 > l2 && d2 > g + n2 && d2 < g + a2 - n2 && G.splice(1, 1, ["L", d2 - 6, c], ["L", d2, c - 6], ["L", d2 + 6, c], ["L", a2 - f2, c]);
        return G;
      } };
      e.SVGRenderer = l;
      e.Renderer = e.SVGRenderer;
      return e.Renderer;
    });
    N(r, "parts/Html.js", [r["parts/Globals.js"], r["parts/SVGElement.js"], r["parts/SVGRenderer.js"], r["parts/Utilities.js"]], function(q, e, r2, A) {
      var D = A.attr, F = A.createElement, K = A.css, C = A.defined, m = A.extend, H = A.pick, M = A.pInt, w = q.isFirefox, L = q.isMS, x = q.isWebKit, p = q.win;
      m(e.prototype, { htmlCss: function(u) {
        var p2 = "SPAN" === this.element.tagName && u && "width" in u, k = H(p2 && u.width, void 0);
        if (p2) {
          delete u.width;
          this.textWidth = k;
          var h = true;
        }
        u && "ellipsis" === u.textOverflow && (u.whiteSpace = "nowrap", u.overflow = "hidden");
        this.styles = m(this.styles, u);
        K(this.element, u);
        h && this.htmlUpdateTransform();
        return this;
      }, htmlGetBBox: function() {
        var u = this.element;
        return { x: u.offsetLeft, y: u.offsetTop, width: u.offsetWidth, height: u.offsetHeight };
      }, htmlUpdateTransform: function() {
        if (this.added) {
          var u = this.renderer, p2 = this.element, k = this.translateX || 0, h = this.translateY || 0, d = this.x || 0, t = this.y || 0, b = this.textAlign || "left", f = { left: 0, center: 0.5, right: 1 }[b], a = this.styles, v = a && a.whiteSpace;
          K(p2, { marginLeft: k, marginTop: h });
          !u.styledMode && this.shadows && this.shadows.forEach(function(a2) {
            K(a2, { marginLeft: k + 1, marginTop: h + 1 });
          });
          this.inverted && [].forEach.call(p2.childNodes, function(a2) {
            u.invertChild(a2, p2);
          });
          if ("SPAN" === p2.tagName) {
            a = this.rotation;
            var E = this.textWidth && M(this.textWidth), J = [a, b, p2.innerHTML, this.textWidth, this.textAlign].join(), B;
            (B = E !== this.oldTextWidth) && !(B = E > this.oldTextWidth) && ((B = this.textPxLength) || (K(p2, { width: "", whiteSpace: v || "nowrap" }), B = p2.offsetWidth), B = B > E);
            B && (/[ \-]/.test(p2.textContent || p2.innerText) || "ellipsis" === p2.style.textOverflow) ? (K(p2, { width: E + "px", display: "block", whiteSpace: v || "normal" }), this.oldTextWidth = E, this.hasBoxWidthChanged = true) : this.hasBoxWidthChanged = false;
            J !== this.cTT && (v = u.fontMetrics(p2.style.fontSize, p2).b, !C(a) || a === (this.oldRotation || 0) && b === this.oldAlign || this.setSpanRotation(a, f, v), this.getSpanCorrection(!C(a) && this.textPxLength || p2.offsetWidth, v, f, a, b));
            K(p2, { left: d + (this.xCorr || 0) + "px", top: t + (this.yCorr || 0) + "px" });
            this.cTT = J;
            this.oldRotation = a;
            this.oldAlign = b;
          }
        } else
          this.alignOnAdd = true;
      }, setSpanRotation: function(u, p2, k) {
        var h = {}, d = this.renderer.getTransformKey();
        h[d] = h.transform = "rotate(" + u + "deg)";
        h[d + (w ? "Origin" : "-origin")] = h.transformOrigin = 100 * p2 + "% " + k + "px";
        K(this.element, h);
      }, getSpanCorrection: function(u, p2, k) {
        this.xCorr = -u * k;
        this.yCorr = -p2;
      } });
      m(r2.prototype, { getTransformKey: function() {
        return L && !/Edge/.test(p.navigator.userAgent) ? "-ms-transform" : x ? "-webkit-transform" : w ? "MozTransform" : p.opera ? "-o-transform" : "";
      }, html: function(u, p2, k) {
        var h = this.createElement("span"), d = h.element, t = h.renderer, b = t.isSVG, f = function(a, b2) {
          ["opacity", "visibility"].forEach(function(f2) {
            a[f2 + "Setter"] = function(d2, v, n) {
              var h2 = a.div ? a.div.style : b2;
              e.prototype[f2 + "Setter"].call(this, d2, v, n);
              h2 && (h2[v] = d2);
            };
          });
          a.addedSetters = true;
        };
        h.textSetter = function(a) {
          a !== d.innerHTML && (delete this.bBox, delete this.oldTextWidth);
          this.textStr = a;
          d.innerHTML = H(a, "");
          h.doTransform = true;
        };
        b && f(h, h.element.style);
        h.xSetter = h.ySetter = h.alignSetter = h.rotationSetter = function(a, b2) {
          "align" === b2 && (b2 = "textAlign");
          h[b2] = a;
          h.doTransform = true;
        };
        h.afterSetters = function() {
          this.doTransform && (this.htmlUpdateTransform(), this.doTransform = false);
        };
        h.attr({ text: u, x: Math.round(p2), y: Math.round(k) }).css({ position: "absolute" });
        t.styledMode || h.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize });
        d.style.whiteSpace = "nowrap";
        h.css = h.htmlCss;
        b && (h.add = function(a) {
          var b2 = t.box.parentNode, E = [];
          if (this.parentGroup = a) {
            var k2 = a.div;
            if (!k2) {
              for (; a; )
                E.push(a), a = a.parentGroup;
              E.reverse().forEach(function(a2) {
                function n(b3, l) {
                  a2[l] = b3;
                  "translateX" === l ? v.left = b3 + "px" : v.top = b3 + "px";
                  a2.doTransform = true;
                }
                var d2 = D(a2.element, "class");
                k2 = a2.div = a2.div || F("div", d2 ? { className: d2 } : void 0, { position: "absolute", left: (a2.translateX || 0) + "px", top: (a2.translateY || 0) + "px", display: a2.display, opacity: a2.opacity, pointerEvents: a2.styles && a2.styles.pointerEvents }, k2 || b2);
                var v = k2.style;
                m(a2, { classSetter: function(a3) {
                  return function(b3) {
                    this.element.setAttribute("class", b3);
                    a3.className = b3;
                  };
                }(k2), on: function() {
                  E[0].div && h.on.apply({ element: E[0].div }, arguments);
                  return a2;
                }, translateXSetter: n, translateYSetter: n });
                a2.addedSetters || f(a2);
              });
            }
          } else
            k2 = b2;
          k2.appendChild(d);
          h.added = true;
          h.alignOnAdd && h.htmlUpdateTransform();
          return h;
        });
        return h;
      } });
    });
    N(r, "parts/Tick.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function(q, e) {
      var r2 = e.clamp, A = e.correctFloat, D = e.defined, F = e.destroyObjectProperties, K = e.extend, C = e.fireEvent, m = e.isNumber, H = e.merge, M = e.objectEach, w = e.pick, L = q.deg2rad;
      e = function() {
        function x(p, u, y, k, h) {
          this.isNewLabel = this.isNew = true;
          this.axis = p;
          this.pos = u;
          this.type = y || "";
          this.parameters = h || {};
          this.tickmarkOffset = this.parameters.tickmarkOffset;
          this.options = this.parameters.options;
          C(this, "init");
          y || k || this.addLabel();
        }
        x.prototype.addLabel = function() {
          var p = this, u = p.axis, y = u.options, k = u.chart, h = u.categories, d = u.logarithmic, t = u.names, b = p.pos, f = w(p.options && p.options.labels, y.labels), a = u.tickPositions, v = b === a[0], E = b === a[a.length - 1];
          t = this.parameters.category || (h ? w(h[b], t[b], b) : b);
          var J = p.label;
          h = (!f.step || 1 === f.step) && 1 === u.tickInterval;
          a = a.info;
          var B, n;
          if (u.dateTime && a) {
            var z = k.time.resolveDTLFormat(y.dateTimeLabelFormats[!y.grid && a.higherRanks[b] || a.unitName]);
            var I = z.main;
          }
          p.isFirst = v;
          p.isLast = E;
          p.formatCtx = { axis: u, chart: k, isFirst: v, isLast: E, dateTimeLabelFormat: I, tickPositionInfo: a, value: d ? A(d.lin2log(t)) : t, pos: b };
          y = u.labelFormatter.call(p.formatCtx, this.formatCtx);
          if (n = z && z.list)
            p.shortenLabel = function() {
              for (B = 0; B < n.length; B++)
                if (J.attr({ text: u.labelFormatter.call(K(p.formatCtx, { dateTimeLabelFormat: n[B] })) }), J.getBBox().width < u.getSlotWidth(p) - 2 * w(f.padding, 5))
                  return;
              J.attr({ text: "" });
            };
          h && u._addedPlotLB && u.isXAxis && p.moveLabel(y, f);
          D(J) || p.movedLabel ? J && J.textStr !== y && !h && (!J.textWidth || f.style && f.style.width || J.styles.width || J.css({ width: null }), J.attr({ text: y }), J.textPxLength = J.getBBox().width) : (p.label = J = p.createLabel({ x: 0, y: 0 }, y, f), p.rotation = 0);
        };
        x.prototype.createLabel = function(p, u, y) {
          var k = this.axis, h = k.chart;
          if (p = D(u) && y.enabled ? h.renderer.text(u, p.x, p.y, y.useHTML).add(k.labelGroup) : null)
            h.styledMode || p.css(H(y.style)), p.textPxLength = p.getBBox().width;
          return p;
        };
        x.prototype.destroy = function() {
          F(this, this.axis);
        };
        x.prototype.getPosition = function(p, u, y, k) {
          var h = this.axis, d = h.chart, t = k && d.oldChartHeight || d.chartHeight;
          p = { x: p ? A(h.translate(u + y, null, null, k) + h.transB) : h.left + h.offset + (h.opposite ? (k && d.oldChartWidth || d.chartWidth) - h.right - h.left : 0), y: p ? t - h.bottom + h.offset - (h.opposite ? h.height : 0) : A(t - h.translate(u + y, null, null, k) - h.transB) };
          p.y = r2(p.y, -1e5, 1e5);
          C(this, "afterGetPosition", { pos: p });
          return p;
        };
        x.prototype.getLabelPosition = function(p, u, y, k, h, d, t, b) {
          var f = this.axis, a = f.transA, v = f.isLinked && f.linkedParent ? f.linkedParent.reversed : f.reversed, E = f.staggerLines, J = f.tickRotCorr || { x: 0, y: 0 }, B = h.y, n = k || f.reserveSpaceDefault ? 0 : -f.labelOffset * ("center" === f.labelAlign ? 0.5 : 1), z = {};
          D(B) || (B = 0 === f.side ? y.rotation ? -8 : -y.getBBox().height : 2 === f.side ? J.y + 8 : Math.cos(y.rotation * L) * (J.y - y.getBBox(false, 0).height / 2));
          p = p + h.x + n + J.x - (d && k ? d * a * (v ? -1 : 1) : 0);
          u = u + B - (d && !k ? d * a * (v ? 1 : -1) : 0);
          E && (y = t / (b || 1) % E, f.opposite && (y = E - y - 1), u += f.labelOffset / E * y);
          z.x = p;
          z.y = Math.round(u);
          C(this, "afterGetLabelPosition", { pos: z, tickmarkOffset: d, index: t });
          return z;
        };
        x.prototype.getLabelSize = function() {
          return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
        };
        x.prototype.getMarkPath = function(p, u, y, k, h, d) {
          return d.crispLine([["M", p, u], ["L", p + (h ? 0 : -y), u + (h ? y : 0)]], k);
        };
        x.prototype.handleOverflow = function(p) {
          var u = this.axis, y = u.options.labels, k = p.x, h = u.chart.chartWidth, d = u.chart.spacing, t = w(u.labelLeft, Math.min(u.pos, d[3]));
          d = w(u.labelRight, Math.max(u.isRadial ? 0 : u.pos + u.len, h - d[1]));
          var b = this.label, f = this.rotation, a = { left: 0, center: 0.5, right: 1 }[u.labelAlign || b.attr("align")], v = b.getBBox().width, E = u.getSlotWidth(this), J = E, B = 1, n, z = {};
          if (f || "justify" !== w(y.overflow, "justify"))
            0 > f && k - a * v < t ? n = Math.round(k / Math.cos(f * L) - t) : 0 < f && k + a * v > d && (n = Math.round((h - k) / Math.cos(f * L)));
          else if (h = k + (1 - a) * v, k - a * v < t ? J = p.x + J * (1 - a) - t : h > d && (J = d - p.x + J * a, B = -1), J = Math.min(E, J), J < E && "center" === u.labelAlign && (p.x += B * (E - J - a * (E - Math.min(v, J)))), v > J || u.autoRotation && (b.styles || {}).width)
            n = J;
          n && (this.shortenLabel ? this.shortenLabel() : (z.width = Math.floor(n) + "px", (y.style || {}).textOverflow || (z.textOverflow = "ellipsis"), b.css(z)));
        };
        x.prototype.moveLabel = function(p, u) {
          var y = this, k = y.label, h = false, d = y.axis, t = d.reversed, b = d.chart.inverted;
          k && k.textStr === p ? (y.movedLabel = k, h = true, delete y.label) : M(d.ticks, function(a) {
            h || a.isNew || a === y || !a.label || a.label.textStr !== p || (y.movedLabel = a.label, h = true, a.labelPos = y.movedLabel.xy, delete a.label);
          });
          if (!h && (y.labelPos || k)) {
            var f = y.labelPos || k.xy;
            k = b ? f.x : t ? 0 : d.width + d.left;
            d = b ? t ? d.width + d.left : 0 : f.y;
            y.movedLabel = y.createLabel({ x: k, y: d }, p, u);
            y.movedLabel && y.movedLabel.attr({ opacity: 0 });
          }
        };
        x.prototype.render = function(p, u, y) {
          var k = this.axis, h = k.horiz, d = this.pos, t = w(this.tickmarkOffset, k.tickmarkOffset);
          d = this.getPosition(h, d, t, u);
          t = d.x;
          var b = d.y;
          k = h && t === k.pos + k.len || !h && b === k.pos ? -1 : 1;
          y = w(y, 1);
          this.isActive = true;
          this.renderGridLine(u, y, k);
          this.renderMark(d, y, k);
          this.renderLabel(d, u, y, p);
          this.isNew = false;
          C(this, "afterRender");
        };
        x.prototype.renderGridLine = function(p, u, y) {
          var k = this.axis, h = k.options, d = this.gridLine, t = {}, b = this.pos, f = this.type, a = w(this.tickmarkOffset, k.tickmarkOffset), v = k.chart.renderer, E = f ? f + "Grid" : "grid", J = h[E + "LineWidth"], B = h[E + "LineColor"];
          h = h[E + "LineDashStyle"];
          d || (k.chart.styledMode || (t.stroke = B, t["stroke-width"] = J, h && (t.dashstyle = h)), f || (t.zIndex = 1), p && (u = 0), this.gridLine = d = v.path().attr(t).addClass("highcharts-" + (f ? f + "-" : "") + "grid-line").add(k.gridGroup));
          if (d && (y = k.getPlotLinePath({ value: b + a, lineWidth: d.strokeWidth() * y, force: "pass", old: p })))
            d[p || this.isNew ? "attr" : "animate"]({ d: y, opacity: u });
        };
        x.prototype.renderMark = function(p, u, y) {
          var k = this.axis, h = k.options, d = k.chart.renderer, t = this.type, b = t ? t + "Tick" : "tick", f = k.tickSize(b), a = this.mark, v = !a, E = p.x;
          p = p.y;
          var J = w(h[b + "Width"], !t && k.isXAxis ? 1 : 0);
          h = h[b + "Color"];
          f && (k.opposite && (f[0] = -f[0]), v && (this.mark = a = d.path().addClass("highcharts-" + (t ? t + "-" : "") + "tick").add(k.axisGroup), k.chart.styledMode || a.attr({ stroke: h, "stroke-width": J })), a[v ? "attr" : "animate"]({ d: this.getMarkPath(E, p, f[0], a.strokeWidth() * y, k.horiz, d), opacity: u }));
        };
        x.prototype.renderLabel = function(p, u, y, k) {
          var h = this.axis, d = h.horiz, t = h.options, b = this.label, f = t.labels, a = f.step;
          h = w(this.tickmarkOffset, h.tickmarkOffset);
          var v = true, E = p.x;
          p = p.y;
          b && m(E) && (b.xy = p = this.getLabelPosition(E, p, b, d, f, h, k, a), this.isFirst && !this.isLast && !w(t.showFirstLabel, 1) || this.isLast && !this.isFirst && !w(t.showLastLabel, 1) ? v = false : !d || f.step || f.rotation || u || 0 === y || this.handleOverflow(p), a && k % a && (v = false), v && m(p.y) ? (p.opacity = y, b[this.isNewLabel ? "attr" : "animate"](p), this.isNewLabel = false) : (b.attr("y", -9999), this.isNewLabel = true));
        };
        x.prototype.replaceMovedLabel = function() {
          var p = this.label, u = this.axis, y = u.reversed, k = this.axis.chart.inverted;
          if (p && !this.isNew) {
            var h = k ? p.xy.x : y ? u.left : u.width + u.left;
            y = k ? y ? u.width + u.top : u.top : p.xy.y;
            p.animate({ x: h, y, opacity: 0 }, void 0, p.destroy);
            delete this.label;
          }
          u.isDirty = true;
          this.label = this.movedLabel;
          delete this.movedLabel;
        };
        return x;
      }();
      q.Tick = e;
      return q.Tick;
    });
    N(r, "parts/Time.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function(q, e) {
      var r2 = e.defined, A = e.error, D = e.extend, F = e.isObject, K = e.merge, C = e.objectEach, m = e.pad, H = e.pick, M = e.splat, w = e.timeUnits, L = q.win;
      e = function() {
        function x(p) {
          this.options = {};
          this.variableTimezone = this.useUTC = false;
          this.Date = L.Date;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.update(p);
        }
        x.prototype.get = function(p, u) {
          if (this.variableTimezone || this.timezoneOffset) {
            var y = u.getTime(), k = y - this.getTimezoneOffset(u);
            u.setTime(k);
            p = u["getUTC" + p]();
            u.setTime(y);
            return p;
          }
          return this.useUTC ? u["getUTC" + p]() : u["get" + p]();
        };
        x.prototype.set = function(p, u, y) {
          if (this.variableTimezone || this.timezoneOffset) {
            if ("Milliseconds" === p || "Seconds" === p || "Minutes" === p)
              return u["setUTC" + p](y);
            var k = this.getTimezoneOffset(u);
            k = u.getTime() - k;
            u.setTime(k);
            u["setUTC" + p](y);
            p = this.getTimezoneOffset(u);
            k = u.getTime() + p;
            return u.setTime(k);
          }
          return this.useUTC ? u["setUTC" + p](y) : u["set" + p](y);
        };
        x.prototype.update = function(p) {
          var u = H(p && p.useUTC, true);
          this.options = p = K(true, this.options || {}, p);
          this.Date = p.Date || L.Date || Date;
          this.timezoneOffset = (this.useUTC = u) && p.timezoneOffset;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.variableTimezone = !(u && !p.getTimezoneOffset && !p.timezone);
        };
        x.prototype.makeTime = function(p, u, y, k, h, d) {
          if (this.useUTC) {
            var t = this.Date.UTC.apply(0, arguments);
            var b = this.getTimezoneOffset(t);
            t += b;
            var f = this.getTimezoneOffset(t);
            b !== f ? t += f - b : b - 36e5 !== this.getTimezoneOffset(t - 36e5) || q.isSafari || (t -= 36e5);
          } else
            t = new this.Date(p, u, H(y, 1), H(k, 0), H(h, 0), H(d, 0)).getTime();
          return t;
        };
        x.prototype.timezoneOffsetFunction = function() {
          var p = this, u = this.options, y = L.moment;
          if (!this.useUTC)
            return function(k) {
              return 6e4 * new Date(k.toString()).getTimezoneOffset();
            };
          if (u.timezone) {
            if (y)
              return function(k) {
                return 6e4 * -y.tz(k, u.timezone).utcOffset();
              };
            A(25);
          }
          return this.useUTC && u.getTimezoneOffset ? function(k) {
            return 6e4 * u.getTimezoneOffset(k.valueOf());
          } : function() {
            return 6e4 * (p.timezoneOffset || 0);
          };
        };
        x.prototype.dateFormat = function(p, u, y) {
          var k;
          if (!r2(u) || isNaN(u))
            return (null === (k = q.defaultOptions.lang) || void 0 === k ? void 0 : k.invalidDate) || "";
          p = H(p, "%Y-%m-%d %H:%M:%S");
          var h = this;
          k = new this.Date(u);
          var d = this.get("Hours", k), t = this.get("Day", k), b = this.get("Date", k), f = this.get(
            "Month",
            k
          ), a = this.get("FullYear", k), v = q.defaultOptions.lang, E = null === v || void 0 === v ? void 0 : v.weekdays, J = null === v || void 0 === v ? void 0 : v.shortWeekdays;
          k = D({ a: J ? J[t] : E[t].substr(0, 3), A: E[t], d: m(b), e: m(b, 2, " "), w: t, b: v.shortMonths[f], B: v.months[f], m: m(f + 1), o: f + 1, y: a.toString().substr(2, 2), Y: a, H: m(d), k: d, I: m(d % 12 || 12), l: d % 12 || 12, M: m(this.get("Minutes", k)), p: 12 > d ? "AM" : "PM", P: 12 > d ? "am" : "pm", S: m(k.getSeconds()), L: m(Math.floor(u % 1e3), 3) }, q.dateFormats);
          C(k, function(a2, b2) {
            for (; -1 !== p.indexOf("%" + b2); )
              p = p.replace(
                "%" + b2,
                "function" === typeof a2 ? a2.call(h, u) : a2
              );
          });
          return y ? p.substr(0, 1).toUpperCase() + p.substr(1) : p;
        };
        x.prototype.resolveDTLFormat = function(p) {
          return F(p, true) ? p : (p = M(p), { main: p[0], from: p[1], to: p[2] });
        };
        x.prototype.getTimeTicks = function(p, u, y, k) {
          var h = this, d = [], t = {};
          var b = new h.Date(u);
          var f = p.unitRange, a = p.count || 1, v;
          k = H(k, 1);
          if (r2(u)) {
            h.set("Milliseconds", b, f >= w.second ? 0 : a * Math.floor(h.get("Milliseconds", b) / a));
            f >= w.second && h.set("Seconds", b, f >= w.minute ? 0 : a * Math.floor(h.get("Seconds", b) / a));
            f >= w.minute && h.set(
              "Minutes",
              b,
              f >= w.hour ? 0 : a * Math.floor(h.get("Minutes", b) / a)
            );
            f >= w.hour && h.set("Hours", b, f >= w.day ? 0 : a * Math.floor(h.get("Hours", b) / a));
            f >= w.day && h.set("Date", b, f >= w.month ? 1 : Math.max(1, a * Math.floor(h.get("Date", b) / a)));
            if (f >= w.month) {
              h.set("Month", b, f >= w.year ? 0 : a * Math.floor(h.get("Month", b) / a));
              var E = h.get("FullYear", b);
            }
            f >= w.year && h.set("FullYear", b, E - E % a);
            f === w.week && (E = h.get("Day", b), h.set("Date", b, h.get("Date", b) - E + k + (E < k ? -7 : 0)));
            E = h.get("FullYear", b);
            k = h.get("Month", b);
            var J = h.get("Date", b), B = h.get(
              "Hours",
              b
            );
            u = b.getTime();
            h.variableTimezone && (v = y - u > 4 * w.month || h.getTimezoneOffset(u) !== h.getTimezoneOffset(y));
            u = b.getTime();
            for (b = 1; u < y; )
              d.push(u), u = f === w.year ? h.makeTime(E + b * a, 0) : f === w.month ? h.makeTime(E, k + b * a) : !v || f !== w.day && f !== w.week ? v && f === w.hour && 1 < a ? h.makeTime(E, k, J, B + b * a) : u + f * a : h.makeTime(E, k, J + b * a * (f === w.day ? 1 : 7)), b++;
            d.push(u);
            f <= w.hour && 1e4 > d.length && d.forEach(function(a2) {
              0 === a2 % 18e5 && "000000000" === h.dateFormat("%H%M%S%L", a2) && (t[a2] = "day");
            });
          }
          d.info = D(p, { higherRanks: t, totalRange: f * a });
          return d;
        };
        return x;
      }();
      q.Time = e;
      return q.Time;
    });
    N(r, "parts/Options.js", [r["parts/Globals.js"], r["parts/Time.js"], r["parts/Color.js"], r["parts/Utilities.js"]], function(q, e, r2, A) {
      r2 = r2.parse;
      A = A.merge;
      q.defaultOptions = { colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "), symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: {
        loading: "Loading...",
        months: "January February March April May June July August September October November December".split(" "),
        shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
        weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        decimalPoint: ".",
        numericSymbols: "kMGTPE".split(""),
        resetZoom: "Reset zoom",
        resetZoomTitle: "Reset zoom level 1:1",
        thousandsSep: " "
      }, global: {}, time: { Date: void 0, getTimezoneOffset: void 0, timezone: void 0, timezoneOffset: 0, useUTC: true }, chart: { styledMode: false, borderRadius: 0, colorCount: 10, defaultSeriesType: "line", ignoreHiddenSeries: true, spacing: [10, 10, 15, 10], resetZoomButton: {
        theme: { zIndex: 6 },
        position: { align: "right", x: -10, y: 10 }
      }, width: null, height: null, borderColor: "#335cad", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" }, title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 }, subtitle: { text: "", align: "center", widthAdjust: -44 }, caption: { margin: 15, text: "", align: "left", verticalAlign: "bottom" }, plotOptions: {}, labels: { style: { position: "absolute", color: "#333333" } }, legend: {
        enabled: true,
        align: "center",
        alignColumns: true,
        layout: "horizontal",
        labelFormatter: function() {
          return this.name;
        },
        borderColor: "#999999",
        borderRadius: 0,
        navigation: { activeColor: "#003399", inactiveColor: "#cccccc" },
        itemStyle: { color: "#333333", cursor: "pointer", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis" },
        itemHoverStyle: { color: "#000000" },
        itemHiddenStyle: { color: "#cccccc" },
        shadow: false,
        itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" },
        squareSymbol: true,
        symbolPadding: 5,
        verticalAlign: "bottom",
        x: 0,
        y: 0,
        title: { style: { fontWeight: "bold" } }
      }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: {
        position: "absolute",
        backgroundColor: "#ffffff",
        opacity: 0.5,
        textAlign: "center"
      } }, tooltip: {
        enabled: true,
        animation: q.svg,
        borderRadius: 3,
        dateTimeLabelFormats: { millisecond: "%A, %b %e, %H:%M:%S.%L", second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M", day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y" },
        footerFormat: "",
        padding: 8,
        snap: q.isTouchDevice ? 25 : 10,
        headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
        pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
        backgroundColor: r2("#f7f7f7").setOpacity(0.85).get(),
        borderWidth: 1,
        shadow: true,
        style: { color: "#333333", cursor: "default", fontSize: "12px", whiteSpace: "nowrap" }
      }, credits: { enabled: true, href: "https://www.highcharts.com?credits", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com" } };
      q.time = new e(A(q.defaultOptions.global, q.defaultOptions.time));
      q.dateFormat = function(e2, r3, A2) {
        return q.time.dateFormat(e2, r3, A2);
      };
      return {
        dateFormat: q.dateFormat,
        defaultOptions: q.defaultOptions,
        time: q.time
      };
    });
    N(r, "parts/Axis.js", [r["parts/Color.js"], r["parts/Globals.js"], r["parts/Tick.js"], r["parts/Utilities.js"], r["parts/Options.js"]], function(q, e, r2, A, D) {
      var F = A.addEvent, K = A.animObject, C = A.arrayMax, m = A.arrayMin, H = A.clamp, M = A.correctFloat, w = A.defined, L = A.destroyObjectProperties, x = A.error, p = A.extend, u = A.fireEvent, y = A.format, k = A.getMagnitude, h = A.isArray, d = A.isFunction, t = A.isNumber, b = A.isString, f = A.merge, a = A.normalizeTickInterval, v = A.objectEach, E = A.pick, J = A.relativeLength, B = A.removeEvent, n = A.splat, z = A.syncTimeout, I = D.defaultOptions, P = e.deg2rad;
      A = function() {
        function l(g, c) {
          this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.oldMin = this.oldMax = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0;
          this.init(g, c);
        }
        l.prototype.init = function(g, c) {
          var a2 = c.isX, b2 = this;
          b2.chart = g;
          b2.horiz = g.inverted && !b2.isZAxis ? !a2 : a2;
          b2.isXAxis = a2;
          b2.coll = b2.coll || (a2 ? "xAxis" : "yAxis");
          u(this, "init", { userOptions: c });
          b2.opposite = c.opposite;
          b2.side = c.side || (b2.horiz ? b2.opposite ? 0 : 2 : b2.opposite ? 1 : 3);
          b2.setOptions(c);
          var l2 = this.options, f2 = l2.type;
          b2.labelFormatter = l2.labels.formatter || b2.defaultLabelFormatter;
          b2.userOptions = c;
          b2.minPixelPadding = 0;
          b2.reversed = l2.reversed;
          b2.visible = false !== l2.visible;
          b2.zoomEnabled = false !== l2.zoomEnabled;
          b2.hasNames = "category" === f2 || true === l2.categories;
          b2.categories = l2.categories || b2.hasNames;
          b2.names || (b2.names = [], b2.names.keys = {});
          b2.plotLinesAndBandsGroups = {};
          b2.positiveValuesOnly = !(!b2.logarithmic || l2.allowNegativeLog);
          b2.isLinked = w(l2.linkedTo);
          b2.ticks = {};
          b2.labelEdge = [];
          b2.minorTicks = {};
          b2.plotLinesAndBands = [];
          b2.alternateBands = {};
          b2.len = 0;
          b2.minRange = b2.userMinRange = l2.minRange || l2.maxZoom;
          b2.range = l2.range;
          b2.offset = l2.offset || 0;
          b2.max = null;
          b2.min = null;
          b2.crosshair = E(l2.crosshair, n(g.options.tooltip.crosshairs)[a2 ? 0 : 1], false);
          c = b2.options.events;
          -1 === g.axes.indexOf(b2) && (a2 ? g.axes.splice(g.xAxis.length, 0, b2) : g.axes.push(b2), g[b2.coll].push(b2));
          b2.series = b2.series || [];
          g.inverted && !b2.isZAxis && a2 && "undefined" === typeof b2.reversed && (b2.reversed = true);
          b2.labelRotation = b2.options.labels.rotation;
          v(c, function(c2, g2) {
            d(c2) && F(b2, g2, c2);
          });
          u(this, "afterInit");
        };
        l.prototype.setOptions = function(g) {
          this.options = f(l.defaultOptions, "yAxis" === this.coll && l.defaultYAxisOptions, [l.defaultTopAxisOptions, l.defaultRightAxisOptions, l.defaultBottomAxisOptions, l.defaultLeftAxisOptions][this.side], f(I[this.coll], g));
          u(this, "afterSetOptions", { userOptions: g });
        };
        l.prototype.defaultLabelFormatter = function() {
          var g = this.axis, c = this.value, a2 = g.chart.time, b2 = g.categories, l2 = this.dateTimeLabelFormat, f2 = I.lang, n2 = f2.numericSymbols;
          f2 = f2.numericSymbolMagnitude || 1e3;
          var d2 = n2 && n2.length, v2 = g.options.labels.format;
          g = g.logarithmic ? Math.abs(c) : g.tickInterval;
          var h2 = this.chart, t2 = h2.numberFormatter;
          if (v2)
            var k2 = y(v2, this, h2);
          else if (b2)
            k2 = c;
          else if (l2)
            k2 = a2.dateFormat(l2, c);
          else if (d2 && 1e3 <= g)
            for (; d2-- && "undefined" === typeof k2; )
              a2 = Math.pow(f2, d2 + 1), g >= a2 && 0 === 10 * c % a2 && null !== n2[d2] && 0 !== c && (k2 = t2(c / a2, -1) + n2[d2]);
          "undefined" === typeof k2 && (k2 = 1e4 <= Math.abs(c) ? t2(c, -1) : t2(
            c,
            -1,
            void 0,
            ""
          ));
          return k2;
        };
        l.prototype.getSeriesExtremes = function() {
          var g = this, c = g.chart, a2;
          u(this, "getSeriesExtremes", null, function() {
            g.hasVisibleSeries = false;
            g.dataMin = g.dataMax = g.threshold = null;
            g.softThreshold = !g.isXAxis;
            g.stacking && g.stacking.buildStacks();
            g.series.forEach(function(b2) {
              if (b2.visible || !c.options.chart.ignoreHiddenSeries) {
                var l2 = b2.options, f2 = l2.threshold;
                g.hasVisibleSeries = true;
                g.positiveValuesOnly && 0 >= f2 && (f2 = null);
                if (g.isXAxis) {
                  if (l2 = b2.xData, l2.length) {
                    a2 = b2.getXExtremes(l2);
                    var n2 = a2.min;
                    var d2 = a2.max;
                    t(n2) || n2 instanceof Date || (l2 = l2.filter(t), a2 = b2.getXExtremes(l2), n2 = a2.min, d2 = a2.max);
                    l2.length && (g.dataMin = Math.min(E(g.dataMin, n2), n2), g.dataMax = Math.max(E(g.dataMax, d2), d2));
                  }
                } else if (b2 = b2.applyExtremes(), t(b2.dataMin) && (n2 = b2.dataMin, g.dataMin = Math.min(E(g.dataMin, n2), n2)), t(b2.dataMax) && (d2 = b2.dataMax, g.dataMax = Math.max(E(g.dataMax, d2), d2)), w(f2) && (g.threshold = f2), !l2.softThreshold || g.positiveValuesOnly)
                  g.softThreshold = false;
              }
            });
          });
          u(this, "afterGetSeriesExtremes");
        };
        l.prototype.translate = function(g, c, a2, b2, l2, f2) {
          var n2 = this.linkedParent || this, d2 = 1, G = 0, v2 = b2 ? n2.oldTransA : n2.transA;
          b2 = b2 ? n2.oldMin : n2.min;
          var h2 = n2.minPixelPadding;
          l2 = (n2.isOrdinal || n2.brokenAxis && n2.brokenAxis.hasBreaks || n2.logarithmic && l2) && n2.lin2val;
          v2 || (v2 = n2.transA);
          a2 && (d2 *= -1, G = n2.len);
          n2.reversed && (d2 *= -1, G -= d2 * (n2.sector || n2.len));
          c ? (g = (g * d2 + G - h2) / v2 + b2, l2 && (g = n2.lin2val(g))) : (l2 && (g = n2.val2lin(g)), g = t(b2) ? d2 * (g - b2) * v2 + G + d2 * h2 + (t(f2) ? v2 * f2 : 0) : void 0);
          return g;
        };
        l.prototype.toPixels = function(g, c) {
          return this.translate(g, false, !this.horiz, null, true) + (c ? 0 : this.pos);
        };
        l.prototype.toValue = function(g, c) {
          return this.translate(g - (c ? 0 : this.pos), true, !this.horiz, null, true);
        };
        l.prototype.getPlotLinePath = function(g) {
          function c(c2, a3, g2) {
            if ("pass" !== k2 && c2 < a3 || c2 > g2)
              k2 ? c2 = H(c2, a3, g2) : m2 = true;
            return c2;
          }
          var a2 = this, b2 = a2.chart, l2 = a2.left, f2 = a2.top, n2 = g.old, d2 = g.value, v2 = g.translatedValue, h2 = g.lineWidth, k2 = g.force, z2, B2, I2, p2, J2 = n2 && b2.oldChartHeight || b2.chartHeight, y2 = n2 && b2.oldChartWidth || b2.chartWidth, m2, x2 = a2.transB;
          g = { value: d2, lineWidth: h2, old: n2, force: k2, acrossPanes: g.acrossPanes, translatedValue: v2 };
          u(this, "getPlotLinePath", g, function(g2) {
            v2 = E(v2, a2.translate(d2, null, null, n2));
            v2 = H(
              v2,
              -1e5,
              1e5
            );
            z2 = I2 = Math.round(v2 + x2);
            B2 = p2 = Math.round(J2 - v2 - x2);
            t(v2) ? a2.horiz ? (B2 = f2, p2 = J2 - a2.bottom, z2 = I2 = c(z2, l2, l2 + a2.width)) : (z2 = l2, I2 = y2 - a2.right, B2 = p2 = c(B2, f2, f2 + a2.height)) : (m2 = true, k2 = false);
            g2.path = m2 && !k2 ? null : b2.renderer.crispLine([["M", z2, B2], ["L", I2, p2]], h2 || 1);
          });
          return g.path;
        };
        l.prototype.getLinearTickPositions = function(a2, c, b2) {
          var g = M(Math.floor(c / a2) * a2);
          b2 = M(Math.ceil(b2 / a2) * a2);
          var l2 = [], f2;
          M(g + a2) === g && (f2 = 20);
          if (this.single)
            return [c];
          for (c = g; c <= b2; ) {
            l2.push(c);
            c = M(c + a2, f2);
            if (c === n2)
              break;
            var n2 = c;
          }
          return l2;
        };
        l.prototype.getMinorTickInterval = function() {
          var a2 = this.options;
          return true === a2.minorTicks ? E(a2.minorTickInterval, "auto") : false === a2.minorTicks ? null : a2.minorTickInterval;
        };
        l.prototype.getMinorTickPositions = function() {
          var a2 = this.options, c = this.tickPositions, b2 = this.minorTickInterval, l2 = [], f2 = this.pointRangePadding || 0, n2 = this.min - f2;
          f2 = this.max + f2;
          var d2 = f2 - n2;
          if (d2 && d2 / b2 < this.len / 3) {
            var v2 = this.logarithmic;
            if (v2)
              this.paddedTicks.forEach(function(c2, a3, g) {
                a3 && l2.push.apply(l2, v2.getLogTickPositions(b2, g[a3 - 1], g[a3], true));
              });
            else if (this.dateTime && "auto" === this.getMinorTickInterval())
              l2 = l2.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(b2), n2, f2, a2.startOfWeek));
            else
              for (a2 = n2 + (c[0] - n2) % b2; a2 <= f2 && a2 !== l2[0]; a2 += b2)
                l2.push(a2);
          }
          0 !== l2.length && this.trimTicks(l2);
          return l2;
        };
        l.prototype.adjustForMinRange = function() {
          var a2 = this.options, c = this.min, b2 = this.max, l2 = this.logarithmic, f2, n2, d2, v2;
          this.isXAxis && "undefined" === typeof this.minRange && !l2 && (w(a2.min) || w(a2.max) ? this.minRange = null : (this.series.forEach(function(c2) {
            v2 = c2.xData;
            for (n2 = c2.xIncrement ? 1 : v2.length - 1; 0 < n2; n2--)
              if (d2 = v2[n2] - v2[n2 - 1], "undefined" === typeof f2 || d2 < f2)
                f2 = d2;
          }), this.minRange = Math.min(5 * f2, this.dataMax - this.dataMin)));
          if (b2 - c < this.minRange) {
            var t2 = this.dataMax - this.dataMin >= this.minRange;
            var k2 = this.minRange;
            var z2 = (k2 - b2 + c) / 2;
            z2 = [c - z2, E(a2.min, c - z2)];
            t2 && (z2[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
            c = C(z2);
            b2 = [c + k2, E(a2.max, c + k2)];
            t2 && (b2[2] = l2 ? l2.log2lin(this.dataMax) : this.dataMax);
            b2 = m(b2);
            b2 - c < k2 && (z2[0] = b2 - k2, z2[1] = E(a2.min, b2 - k2), c = C(z2));
          }
          this.min = c;
          this.max = b2;
        };
        l.prototype.getClosest = function() {
          var a2;
          this.categories ? a2 = 1 : this.series.forEach(function(c) {
            var g = c.closestPointRange, b2 = c.visible || !c.chart.options.chart.ignoreHiddenSeries;
            !c.noSharedTooltip && w(g) && b2 && (a2 = w(a2) ? Math.min(a2, g) : g);
          });
          return a2;
        };
        l.prototype.nameToX = function(a2) {
          var c = h(this.categories), g = c ? this.categories : this.names, b2 = a2.options.x;
          a2.series.requireSorting = false;
          w(b2) || (b2 = false === this.options.uniqueNames ? a2.series.autoIncrement() : c ? g.indexOf(a2.name) : E(g.keys[a2.name], -1));
          if (-1 === b2) {
            if (!c)
              var l2 = g.length;
          } else
            l2 = b2;
          "undefined" !== typeof l2 && (this.names[l2] = a2.name, this.names.keys[a2.name] = l2);
          return l2;
        };
        l.prototype.updateNames = function() {
          var a2 = this, c = this.names;
          0 < c.length && (Object.keys(c.keys).forEach(function(a3) {
            delete c.keys[a3];
          }), c.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function(c2) {
            c2.xIncrement = null;
            if (!c2.points || c2.isDirtyData)
              a2.max = Math.max(a2.max, c2.xData.length - 1), c2.processData(), c2.generatePoints();
            c2.data.forEach(function(g, b2) {
              if (g && g.options && "undefined" !== typeof g.name) {
                var l2 = a2.nameToX(g);
                "undefined" !== typeof l2 && l2 !== g.x && (g.x = l2, c2.xData[b2] = l2);
              }
            });
          }));
        };
        l.prototype.setAxisTranslation = function(a2) {
          var c = this, g = c.max - c.min, l2 = c.axisPointRange || 0, f2 = 0, n2 = 0, d2 = c.linkedParent, v2 = !!c.categories, h2 = c.transA, t2 = c.isXAxis;
          if (t2 || v2 || l2) {
            var k2 = c.getClosest();
            d2 ? (f2 = d2.minPointOffset, n2 = d2.pointRangePadding) : c.series.forEach(function(a3) {
              var g2 = v2 ? 1 : t2 ? E(a3.options.pointRange, k2, 0) : c.axisPointRange || 0, d3 = a3.options.pointPlacement;
              l2 = Math.max(l2, g2);
              if (!c.single || v2)
                a3 = a3.is("xrange") ? !t2 : t2, f2 = Math.max(f2, a3 && b(d3) ? 0 : g2 / 2), n2 = Math.max(n2, a3 && "on" === d3 ? 0 : g2);
            });
            d2 = c.ordinal && c.ordinal.slope && k2 ? c.ordinal.slope / k2 : 1;
            c.minPointOffset = f2 *= d2;
            c.pointRangePadding = n2 *= d2;
            c.pointRange = Math.min(l2, c.single && v2 ? 1 : g);
            t2 && (c.closestPointRange = k2);
          }
          a2 && (c.oldTransA = h2);
          c.translationSlope = c.transA = h2 = c.staticScale || c.len / (g + n2 || 1);
          c.transB = c.horiz ? c.left : c.bottom;
          c.minPixelPadding = h2 * f2;
          u(this, "afterSetAxisTranslation");
        };
        l.prototype.minFromRange = function() {
          return this.max - this.range;
        };
        l.prototype.setTickInterval = function(g) {
          var c = this, b2 = c.chart, l2 = c.logarithmic, f2 = c.options, n2 = c.isXAxis, d2 = c.isLinked, v2 = f2.maxPadding, h2 = f2.minPadding, z2 = f2.tickInterval, B2 = f2.tickPixelInterval, I2 = c.categories, p2 = t(c.threshold) ? c.threshold : null, J2 = c.softThreshold;
          c.dateTime || I2 || d2 || this.getTickAmount();
          var y2 = E(c.userMin, f2.min);
          var m2 = E(c.userMax, f2.max);
          if (d2) {
            c.linkedParent = b2[c.coll][f2.linkedTo];
            var e2 = c.linkedParent.getExtremes();
            c.min = E(e2.min, e2.dataMin);
            c.max = E(e2.max, e2.dataMax);
            f2.type !== c.linkedParent.options.type && x(11, 1, b2);
          } else {
            if (!J2 && w(p2)) {
              if (c.dataMin >= p2)
                e2 = p2, h2 = 0;
              else if (c.dataMax <= p2) {
                var P2 = p2;
                v2 = 0;
              }
            }
            c.min = E(y2, e2, c.dataMin);
            c.max = E(m2, P2, c.dataMax);
          }
          l2 && (c.positiveValuesOnly && !g && 0 >= Math.min(c.min, E(c.dataMin, c.min)) && x(10, 1, b2), c.min = M(l2.log2lin(c.min), 16), c.max = M(l2.log2lin(c.max), 16));
          c.range && w(c.max) && (c.userMin = c.min = y2 = Math.max(c.dataMin, c.minFromRange()), c.userMax = m2 = c.max, c.range = null);
          u(c, "foundExtremes");
          c.beforePadding && c.beforePadding();
          c.adjustForMinRange();
          !(I2 || c.axisPointRange || c.stacking && c.stacking.usePercentage || d2) && w(c.min) && w(c.max) && (b2 = c.max - c.min) && (!w(y2) && h2 && (c.min -= b2 * h2), !w(m2) && v2 && (c.max += b2 * v2));
          t(c.userMin) || (t(f2.softMin) && f2.softMin < c.min && (c.min = y2 = f2.softMin), t(f2.floor) && (c.min = Math.max(
            c.min,
            f2.floor
          )));
          t(c.userMax) || (t(f2.softMax) && f2.softMax > c.max && (c.max = m2 = f2.softMax), t(f2.ceiling) && (c.max = Math.min(c.max, f2.ceiling)));
          J2 && w(c.dataMin) && (p2 = p2 || 0, !w(y2) && c.min < p2 && c.dataMin >= p2 ? c.min = c.options.minRange ? Math.min(p2, c.max - c.minRange) : p2 : !w(m2) && c.max > p2 && c.dataMax <= p2 && (c.max = c.options.minRange ? Math.max(p2, c.min + c.minRange) : p2));
          c.tickInterval = c.min === c.max || "undefined" === typeof c.min || "undefined" === typeof c.max ? 1 : d2 && !z2 && B2 === c.linkedParent.options.tickPixelInterval ? z2 = c.linkedParent.tickInterval : E(z2, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, I2 ? 1 : (c.max - c.min) * B2 / Math.max(c.len, B2));
          n2 && !g && c.series.forEach(function(a2) {
            a2.processData(c.min !== c.oldMin || c.max !== c.oldMax);
          });
          c.setAxisTranslation(true);
          u(this, "initialAxisTranslation");
          c.pointRange && !z2 && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
          g = E(f2.minTickInterval, c.dateTime && !c.series.some(function(c2) {
            return c2.noSharedTooltip;
          }) ? c.closestPointRange : 0);
          !z2 && c.tickInterval < g && (c.tickInterval = g);
          c.dateTime || c.logarithmic || z2 || (c.tickInterval = a(c.tickInterval, void 0, k(c.tickInterval), E(f2.allowDecimals, 0.5 > c.tickInterval || void 0 !== this.tickAmount), !!this.tickAmount));
          this.tickAmount || (c.tickInterval = c.unsquish());
          this.setTickPositions();
        };
        l.prototype.setTickPositions = function() {
          var a2 = this.options, c = a2.tickPositions;
          var b2 = this.getMinorTickInterval();
          var l2 = a2.tickPositioner, f2 = this.hasVerticalPanning(), n2 = "colorAxis" === this.coll, d2 = (n2 || !f2) && a2.startOnTick;
          f2 = (n2 || !f2) && a2.endOnTick;
          this.tickmarkOffset = this.categories && "between" === a2.tickmarkPlacement && 1 === this.tickInterval ? 0.5 : 0;
          this.minorTickInterval = "auto" === b2 && this.tickInterval ? this.tickInterval / 5 : b2;
          this.single = this.min === this.max && w(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || false !== a2.allowDecimals);
          this.tickPositions = b2 = c && c.slice();
          !b2 && (this.ordinal && this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) ? b2 = this.dateTime ? this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, a2.units), this.min, this.max, a2.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, true) : this.logarithmic ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max) : (b2 = [this.min, this.max], x(19, false, this.chart)), b2.length > this.len && (b2 = [b2[0], b2.pop()], b2[0] === b2[1] && (b2.length = 1)), this.tickPositions = b2, l2 && (l2 = l2.apply(this, [this.min, this.max]))) && (this.tickPositions = b2 = l2);
          this.paddedTicks = b2.slice(0);
          this.trimTicks(b2, d2, f2);
          this.isLinked || (this.single && 2 > b2.length && !this.categories && !this.series.some(function(c2) {
            return c2.is("heatmap") && "between" === c2.options.pointPlacement;
          }) && (this.min -= 0.5, this.max += 0.5), c || l2 || this.adjustTickAmount());
          u(this, "afterSetTickPositions");
        };
        l.prototype.trimTicks = function(a2, c, b2) {
          var g = a2[0], l2 = a2[a2.length - 1], f2 = !this.isOrdinal && this.minPointOffset || 0;
          u(this, "trimTicks");
          if (!this.isLinked) {
            if (c && -Infinity !== g)
              this.min = g;
            else
              for (; this.min - f2 > a2[0]; )
                a2.shift();
            if (b2)
              this.max = l2;
            else
              for (; this.max + f2 < a2[a2.length - 1]; )
                a2.pop();
            0 === a2.length && w(g) && !this.options.tickPositions && a2.push((l2 + g) / 2);
          }
        };
        l.prototype.alignToOthers = function() {
          var a2 = {}, c, b2 = this.options;
          false === this.chart.options.chart.alignTicks || false === b2.alignTicks || false === b2.startOnTick || false === b2.endOnTick || this.logarithmic || this.chart[this.coll].forEach(function(g) {
            var b3 = g.options;
            b3 = [g.horiz ? b3.left : b3.top, b3.width, b3.height, b3.pane].join();
            g.series.length && (a2[b3] ? c = true : a2[b3] = 1);
          });
          return c;
        };
        l.prototype.getTickAmount = function() {
          var a2 = this.options, c = a2.tickAmount, b2 = a2.tickPixelInterval;
          !w(a2.tickInterval) && !c && this.len < b2 && !this.isRadial && !this.logarithmic && a2.startOnTick && a2.endOnTick && (c = 2);
          !c && this.alignToOthers() && (c = Math.ceil(this.len / b2) + 1);
          4 > c && (this.finalTickAmt = c, c = 5);
          this.tickAmount = c;
        };
        l.prototype.adjustTickAmount = function() {
          var a2 = this.options, c = this.tickInterval, b2 = this.tickPositions, l2 = this.tickAmount, f2 = this.finalTickAmt, n2 = b2 && b2.length, d2 = E(this.threshold, this.softThreshold ? 0 : null), v2;
          if (this.hasData()) {
            if (n2 < l2) {
              for (v2 = this.min; b2.length < l2; )
                b2.length % 2 || v2 === d2 ? b2.push(M(b2[b2.length - 1] + c)) : b2.unshift(M(b2[0] - c));
              this.transA *= (n2 - 1) / (l2 - 1);
              this.min = a2.startOnTick ? b2[0] : Math.min(this.min, b2[0]);
              this.max = a2.endOnTick ? b2[b2.length - 1] : Math.max(this.max, b2[b2.length - 1]);
            } else
              n2 > l2 && (this.tickInterval *= 2, this.setTickPositions());
            if (w(f2)) {
              for (c = a2 = b2.length; c--; )
                (3 === f2 && 1 === c % 2 || 2 >= f2 && 0 < c && c < a2 - 1) && b2.splice(c, 1);
              this.finalTickAmt = void 0;
            }
          }
        };
        l.prototype.setScale = function() {
          var a2, c = false, b2 = false;
          this.series.forEach(function(a3) {
            var g;
            c = c || a3.isDirtyData || a3.isDirty;
            b2 = b2 || (null === (g = a3.xAxis) || void 0 === g ? void 0 : g.isDirty) || false;
          });
          this.oldMin = this.min;
          this.oldMax = this.max;
          this.oldAxisLength = this.len;
          this.setAxisSize();
          (a2 = this.len !== this.oldAxisLength) || c || b2 || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.stacking && this.stacking.resetStacks(), this.forceRedraw = false, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = a2 || this.min !== this.oldMin || this.max !== this.oldMax)) : this.stacking && this.stacking.cleanStacks();
          c && this.panningState && (this.panningState.isDirty = true);
          u(this, "afterSetScale");
        };
        l.prototype.setExtremes = function(a2, c, b2, l2, f2) {
          var g = this, n2 = g.chart;
          b2 = E(b2, true);
          g.series.forEach(function(a3) {
            delete a3.kdTree;
          });
          f2 = p(f2, { min: a2, max: c });
          u(g, "setExtremes", f2, function() {
            g.userMin = a2;
            g.userMax = c;
            g.eventArgs = f2;
            b2 && n2.redraw(l2);
          });
        };
        l.prototype.zoom = function(a2, c) {
          var g = this, b2 = this.dataMin, l2 = this.dataMax, f2 = this.options, n2 = Math.min(b2, E(f2.min, b2)), d2 = Math.max(l2, E(f2.max, l2));
          a2 = { newMin: a2, newMax: c };
          u(this, "zoom", a2, function(a3) {
            var c2 = a3.newMin, f3 = a3.newMax;
            if (c2 !== g.min || f3 !== g.max)
              g.allowZoomOutside || (w(b2) && (c2 < n2 && (c2 = n2), c2 > d2 && (c2 = d2)), w(l2) && (f3 < n2 && (f3 = n2), f3 > d2 && (f3 = d2))), g.displayBtn = "undefined" !== typeof c2 || "undefined" !== typeof f3, g.setExtremes(c2, f3, false, void 0, { trigger: "zoom" });
            a3.zoomed = true;
          });
          return a2.zoomed;
        };
        l.prototype.setAxisSize = function() {
          var a2 = this.chart, c = this.options, b2 = c.offsets || [0, 0, 0, 0], l2 = this.horiz, f2 = this.width = Math.round(J(E(c.width, a2.plotWidth - b2[3] + b2[1]), a2.plotWidth)), n2 = this.height = Math.round(J(E(c.height, a2.plotHeight - b2[0] + b2[2]), a2.plotHeight)), d2 = this.top = Math.round(J(E(c.top, a2.plotTop + b2[0]), a2.plotHeight, a2.plotTop));
          c = this.left = Math.round(J(E(c.left, a2.plotLeft + b2[3]), a2.plotWidth, a2.plotLeft));
          this.bottom = a2.chartHeight - n2 - d2;
          this.right = a2.chartWidth - f2 - c;
          this.len = Math.max(l2 ? f2 : n2, 0);
          this.pos = l2 ? c : d2;
        };
        l.prototype.getExtremes = function() {
          var a2 = this.logarithmic;
          return { min: a2 ? M(a2.lin2log(this.min)) : this.min, max: a2 ? M(a2.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax };
        };
        l.prototype.getThreshold = function(a2) {
          var c = this.logarithmic, g = c ? c.lin2log(this.min) : this.min;
          c = c ? c.lin2log(this.max) : this.max;
          null === a2 || -Infinity === a2 ? a2 = g : Infinity === a2 ? a2 = c : g > a2 ? a2 = g : c < a2 && (a2 = c);
          return this.translate(a2, 0, 1, 0, 1);
        };
        l.prototype.autoLabelAlign = function(a2) {
          var c = (E(a2, 0) - 90 * this.side + 720) % 360;
          a2 = { align: "center" };
          u(this, "autoLabelAlign", a2, function(a3) {
            15 < c && 165 > c ? a3.align = "right" : 195 < c && 345 > c && (a3.align = "left");
          });
          return a2.align;
        };
        l.prototype.tickSize = function(a2) {
          var c = this.options, g = c["tick" === a2 ? "tickLength" : "minorTickLength"], b2 = E(c["tick" === a2 ? "tickWidth" : "minorTickWidth"], "tick" === a2 && this.isXAxis && !this.categories ? 1 : 0);
          if (b2 && g) {
            "inside" === c[a2 + "Position"] && (g = -g);
            var l2 = [g, b2];
          }
          a2 = { tickSize: l2 };
          u(this, "afterTickSize", a2);
          return a2.tickSize;
        };
        l.prototype.labelMetrics = function() {
          var a2 = this.tickPositions && this.tickPositions[0] || 0;
          return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a2] && this.ticks[a2].label);
        };
        l.prototype.unsquish = function() {
          var a2 = this.options.labels, c = this.horiz, b2 = this.tickInterval, l2 = b2, f2 = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / b2), n2, d2 = a2.rotation, v2 = this.labelMetrics(), h2, t2 = Number.MAX_VALUE, k2, z2 = this.max - this.min, B2 = function(a3) {
            var c2 = a3 / (f2 || 1);
            c2 = 1 < c2 ? Math.ceil(c2) : 1;
            c2 * b2 > z2 && Infinity !== a3 && Infinity !== f2 && z2 && (c2 = Math.ceil(z2 / b2));
            return M(c2 * b2);
          };
          c ? (k2 = !a2.staggerLines && !a2.step && (w(d2) ? [d2] : f2 < E(a2.autoRotationLimit, 80) && a2.autoRotation)) && k2.forEach(function(a3) {
            if (a3 === d2 || a3 && -90 <= a3 && 90 >= a3) {
              h2 = B2(Math.abs(v2.h / Math.sin(P * a3)));
              var c2 = h2 + Math.abs(a3 / 360);
              c2 < t2 && (t2 = c2, n2 = a3, l2 = h2);
            }
          }) : a2.step || (l2 = B2(v2.h));
          this.autoRotation = k2;
          this.labelRotation = E(n2, d2);
          return l2;
        };
        l.prototype.getSlotWidth = function(a2) {
          var c, g = this.chart, b2 = this.horiz, l2 = this.options.labels, f2 = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), n2 = g.margin[3];
          if (a2 && t(a2.slotWidth))
            return a2.slotWidth;
          if (b2 && l2 && 2 > (l2.step || 0))
            return l2.rotation ? 0 : (this.staggerLines || 1) * this.len / f2;
          if (!b2) {
            a2 = null === (c = null === l2 || void 0 === l2 ? void 0 : l2.style) || void 0 === c ? void 0 : c.width;
            if (void 0 !== a2)
              return parseInt(a2, 10);
            if (n2)
              return n2 - g.spacing[3];
          }
          return 0.33 * g.chartWidth;
        };
        l.prototype.renderUnsquish = function() {
          var a2 = this.chart, c = a2.renderer, l2 = this.tickPositions, f2 = this.ticks, n2 = this.options.labels, d2 = n2 && n2.style || {}, v2 = this.horiz, h2 = this.getSlotWidth(), t2 = Math.max(1, Math.round(h2 - 2 * (n2.padding || 5))), k2 = {}, z2 = this.labelMetrics(), E2 = n2.style && n2.style.textOverflow, B2 = 0;
          b(n2.rotation) || (k2.rotation = n2.rotation || 0);
          l2.forEach(function(a3) {
            a3 = f2[a3];
            a3.movedLabel && a3.replaceMovedLabel();
            a3 && a3.label && a3.label.textPxLength > B2 && (B2 = a3.label.textPxLength);
          });
          this.maxLabelLength = B2;
          if (this.autoRotation)
            B2 > t2 && B2 > z2.h ? k2.rotation = this.labelRotation : this.labelRotation = 0;
          else if (h2) {
            var I2 = t2;
            if (!E2) {
              var p2 = "clip";
              for (t2 = l2.length; !v2 && t2--; ) {
                var u2 = l2[t2];
                if (u2 = f2[u2].label)
                  u2.styles && "ellipsis" === u2.styles.textOverflow ? u2.css({ textOverflow: "clip" }) : u2.textPxLength > h2 && u2.css({ width: h2 + "px" }), u2.getBBox().height > this.len / l2.length - (z2.h - z2.f) && (u2.specificTextOverflow = "ellipsis");
              }
            }
          }
          k2.rotation && (I2 = B2 > 0.5 * a2.chartHeight ? 0.33 * a2.chartHeight : B2, E2 || (p2 = "ellipsis"));
          if (this.labelAlign = n2.align || this.autoLabelAlign(this.labelRotation))
            k2.align = this.labelAlign;
          l2.forEach(function(a3) {
            var c2 = (a3 = f2[a3]) && a3.label, g = d2.width, b2 = {};
            c2 && (c2.attr(k2), a3.shortenLabel ? a3.shortenLabel() : I2 && !g && "nowrap" !== d2.whiteSpace && (I2 < c2.textPxLength || "SPAN" === c2.element.tagName) ? (b2.width = I2 + "px", E2 || (b2.textOverflow = c2.specificTextOverflow || p2), c2.css(b2)) : c2.styles && c2.styles.width && !b2.width && !g && c2.css({ width: null }), delete c2.specificTextOverflow, a3.rotation = k2.rotation);
          }, this);
          this.tickRotCorr = c.rotCorr(z2.b, this.labelRotation || 0, 0 !== this.side);
        };
        l.prototype.hasData = function() {
          return this.series.some(function(a2) {
            return a2.hasData();
          }) || this.options.showEmpty && w(this.min) && w(this.max);
        };
        l.prototype.addTitle = function(a2) {
          var c = this.chart.renderer, g = this.horiz, b2 = this.opposite, l2 = this.options.title, n2, d2 = this.chart.styledMode;
          this.axisTitle || ((n2 = l2.textAlign) || (n2 = (g ? { low: "left", middle: "center", high: "right" } : { low: b2 ? "right" : "left", middle: "center", high: b2 ? "left" : "right" })[l2.align]), this.axisTitle = c.text(l2.text, 0, 0, l2.useHTML).attr({ zIndex: 7, rotation: l2.rotation || 0, align: n2 }).addClass("highcharts-axis-title"), d2 || this.axisTitle.css(f(l2.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = true);
          d2 || l2.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" });
          this.axisTitle[a2 ? "show" : "hide"](a2);
        };
        l.prototype.generateTick = function(a2) {
          var c = this.ticks;
          c[a2] ? c[a2].addLabel() : c[a2] = new r2(this, a2);
        };
        l.prototype.getOffset = function() {
          var a2 = this, c = a2.chart, b2 = c.renderer, l2 = a2.options, f2 = a2.tickPositions, n2 = a2.ticks, d2 = a2.horiz, h2 = a2.side, t2 = c.inverted && !a2.isZAxis ? [1, 0, 3, 2][h2] : h2, k2, z2 = 0, B2 = 0, I2 = l2.title, p2 = l2.labels, J2 = 0, y2 = c.axisOffset;
          c = c.clipOffset;
          var m2 = [-1, 1, 1, -1][h2], x2 = l2.className, e2 = a2.axisParent;
          var P2 = a2.hasData();
          a2.showAxis = k2 = P2 || E(l2.showEmpty, true);
          a2.staggerLines = a2.horiz && p2.staggerLines;
          a2.axisGroup || (a2.gridGroup = b2.g("grid").attr({ zIndex: l2.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (x2 || "")).add(e2), a2.axisGroup = b2.g("axis").attr({ zIndex: l2.zIndex || 2 }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (x2 || "")).add(e2), a2.labelGroup = b2.g("axis-labels").attr({ zIndex: p2.zIndex || 7 }).addClass("highcharts-" + a2.coll.toLowerCase() + "-labels " + (x2 || "")).add(e2));
          P2 || a2.isLinked ? (f2.forEach(function(c2, g) {
            a2.generateTick(c2, g);
          }), a2.renderUnsquish(), a2.reserveSpaceDefault = 0 === h2 || 2 === h2 || { 1: "left", 3: "right" }[h2] === a2.labelAlign, E(p2.reserveSpace, "center" === a2.labelAlign ? true : null, a2.reserveSpaceDefault) && f2.forEach(function(a3) {
            J2 = Math.max(n2[a3].getLabelSize(), J2);
          }), a2.staggerLines && (J2 *= a2.staggerLines), a2.labelOffset = J2 * (a2.opposite ? -1 : 1)) : v(n2, function(a3, c2) {
            a3.destroy();
            delete n2[c2];
          });
          if (I2 && I2.text && false !== I2.enabled && (a2.addTitle(k2), k2 && false !== I2.reserveSpace)) {
            a2.titleOffset = z2 = a2.axisTitle.getBBox()[d2 ? "height" : "width"];
            var q2 = I2.offset;
            B2 = w(q2) ? 0 : E(I2.margin, d2 ? 5 : 10);
          }
          a2.renderLine();
          a2.offset = m2 * E(l2.offset, y2[h2] ? y2[h2] + (l2.margin || 0) : 0);
          a2.tickRotCorr = a2.tickRotCorr || { x: 0, y: 0 };
          b2 = 0 === h2 ? -a2.labelMetrics().h : 2 === h2 ? a2.tickRotCorr.y : 0;
          B2 = Math.abs(J2) + B2;
          J2 && (B2 = B2 - b2 + m2 * (d2 ? E(p2.y, a2.tickRotCorr.y + 8 * m2) : p2.x));
          a2.axisTitleMargin = E(q2, B2);
          a2.getMaxLabelDimensions && (a2.maxLabelDimensions = a2.getMaxLabelDimensions(n2, f2));
          d2 = this.tickSize("tick");
          y2[h2] = Math.max(y2[h2], a2.axisTitleMargin + z2 + m2 * a2.offset, B2, f2 && f2.length && d2 ? d2[0] + m2 * a2.offset : 0);
          l2 = l2.offset ? 0 : 2 * Math.floor(a2.axisLine.strokeWidth() / 2);
          c[t2] = Math.max(c[t2], l2);
          u(this, "afterGetOffset");
        };
        l.prototype.getLinePath = function(a2) {
          var c = this.chart, g = this.opposite, b2 = this.offset, l2 = this.horiz, f2 = this.left + (g ? this.width : 0) + b2;
          b2 = c.chartHeight - this.bottom - (g ? this.height : 0) + b2;
          g && (a2 *= -1);
          return c.renderer.crispLine([["M", l2 ? this.left : f2, l2 ? b2 : this.top], ["L", l2 ? c.chartWidth - this.right : f2, l2 ? b2 : c.chartHeight - this.bottom]], a2);
        };
        l.prototype.renderLine = function() {
          this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }));
        };
        l.prototype.getTitlePosition = function() {
          var a2 = this.horiz, c = this.left, b2 = this.top, l2 = this.len, f2 = this.options.title, n2 = a2 ? c : b2, d2 = this.opposite, v2 = this.offset, h2 = f2.x || 0, t2 = f2.y || 0, k2 = this.axisTitle, z2 = this.chart.renderer.fontMetrics(f2.style && f2.style.fontSize, k2);
          k2 = Math.max(k2.getBBox(null, 0).height - z2.h - 1, 0);
          l2 = { low: n2 + (a2 ? 0 : l2), middle: n2 + l2 / 2, high: n2 + (a2 ? l2 : 0) }[f2.align];
          c = (a2 ? b2 + this.height : c) + (a2 ? 1 : -1) * (d2 ? -1 : 1) * this.axisTitleMargin + [-k2, k2, z2.f, -k2][this.side];
          a2 = { x: a2 ? l2 + h2 : c + (d2 ? this.width : 0) + v2 + h2, y: a2 ? c + t2 - (d2 ? this.height : 0) + v2 : l2 + t2 };
          u(this, "afterGetTitlePosition", { titlePosition: a2 });
          return a2;
        };
        l.prototype.renderMinorTick = function(a2) {
          var c = this.chart.hasRendered && t(this.oldMin), g = this.minorTicks;
          g[a2] || (g[a2] = new r2(this, a2, "minor"));
          c && g[a2].isNew && g[a2].render(null, true);
          g[a2].render(null, false, 1);
        };
        l.prototype.renderTick = function(a2, c) {
          var g = this.isLinked, b2 = this.ticks, l2 = this.chart.hasRendered && t(this.oldMin);
          if (!g || a2 >= this.min && a2 <= this.max)
            b2[a2] || (b2[a2] = new r2(this, a2)), l2 && b2[a2].isNew && b2[a2].render(c, true, -1), b2[a2].render(c);
        };
        l.prototype.render = function() {
          var a2 = this, c = a2.chart, b2 = a2.logarithmic, l2 = a2.options, f2 = a2.isLinked, n2 = a2.tickPositions, d2 = a2.axisTitle, h2 = a2.ticks, k2 = a2.minorTicks, E2 = a2.alternateBands, B2 = l2.stackLabels, I2 = l2.alternateGridColor, p2 = a2.tickmarkOffset, J2 = a2.axisLine, y2 = a2.showAxis, m2 = K(c.renderer.globalAnimation), x2, P2;
          a2.labelEdge.length = 0;
          a2.overlap = false;
          [h2, k2, E2].forEach(function(a3) {
            v(a3, function(a4) {
              a4.isActive = false;
            });
          });
          if (a2.hasData() || f2)
            a2.minorTickInterval && !a2.categories && a2.getMinorTickPositions().forEach(function(c2) {
              a2.renderMinorTick(c2);
            }), n2.length && (n2.forEach(function(c2, g) {
              a2.renderTick(c2, g);
            }), p2 && (0 === a2.min || a2.single) && (h2[-1] || (h2[-1] = new r2(a2, -1, null, true)), h2[-1].render(-1))), I2 && n2.forEach(function(g, l3) {
              P2 = "undefined" !== typeof n2[l3 + 1] ? n2[l3 + 1] + p2 : a2.max - p2;
              0 === l3 % 2 && g < a2.max && P2 <= a2.max + (c.polar ? -p2 : p2) && (E2[g] || (E2[g] = new e.PlotLineOrBand(a2)), x2 = g + p2, E2[g].options = { from: b2 ? b2.lin2log(x2) : x2, to: b2 ? b2.lin2log(P2) : P2, color: I2, className: "highcharts-alternate-grid" }, E2[g].render(), E2[g].isActive = true);
            }), a2._addedPlotLB || ((l2.plotLines || []).concat(l2.plotBands || []).forEach(function(c2) {
              a2.addPlotBandOrLine(c2);
            }), a2._addedPlotLB = true);
          [h2, k2, E2].forEach(function(a3) {
            var g, b3 = [], l3 = m2.duration;
            v(a3, function(a4, c2) {
              a4.isActive || (a4.render(c2, false, 0), a4.isActive = false, b3.push(c2));
            });
            z(function() {
              for (g = b3.length; g--; )
                a3[b3[g]] && !a3[b3[g]].isActive && (a3[b3[g]].destroy(), delete a3[b3[g]]);
            }, a3 !== E2 && c.hasRendered && l3 ? l3 : 0);
          });
          J2 && (J2[J2.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(J2.strokeWidth()) }), J2.isPlaced = true, J2[y2 ? "show" : "hide"](y2));
          d2 && y2 && (l2 = a2.getTitlePosition(), t(l2.y) ? (d2[d2.isNew ? "attr" : "animate"](l2), d2.isNew = false) : (d2.attr("y", -9999), d2.isNew = true));
          B2 && B2.enabled && a2.stacking && a2.stacking.renderStackTotals();
          a2.isDirty = false;
          u(this, "afterRender");
        };
        l.prototype.redraw = function() {
          this.visible && (this.render(), this.plotLinesAndBands.forEach(function(a2) {
            a2.render();
          }));
          this.series.forEach(function(a2) {
            a2.isDirty = true;
          });
        };
        l.prototype.getKeepProps = function() {
          return this.keepProps || l.keepProps;
        };
        l.prototype.destroy = function(a2) {
          var c = this, g = c.plotLinesAndBands, b2;
          u(this, "destroy", { keepEvents: a2 });
          a2 || B(c);
          [c.ticks, c.minorTicks, c.alternateBands].forEach(function(a3) {
            L(a3);
          });
          if (g)
            for (a2 = g.length; a2--; )
              g[a2].destroy();
          "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a3) {
            c[a3] && (c[a3] = c[a3].destroy());
          });
          for (b2 in c.plotLinesAndBandsGroups)
            c.plotLinesAndBandsGroups[b2] = c.plotLinesAndBandsGroups[b2].destroy();
          v(c, function(a3, g2) {
            -1 === c.getKeepProps().indexOf(g2) && delete c[g2];
          });
        };
        l.prototype.drawCrosshair = function(a2, c) {
          var b2 = this.crosshair, g = E(b2.snap, true), l2, f2 = this.cross, n2 = this.chart;
          u(this, "drawCrosshair", { e: a2, point: c });
          a2 || (a2 = this.cross && this.cross.e);
          if (this.crosshair && false !== (w(c) || !g)) {
            g ? w(c) && (l2 = E("colorAxis" !== this.coll ? c.crosshairPos : null, this.isXAxis ? c.plotX : this.len - c.plotY)) : l2 = a2 && (this.horiz ? a2.chartX - this.pos : this.len - a2.chartY + this.pos);
            if (w(l2)) {
              var d2 = { value: c && (this.isXAxis ? c.x : E(c.stackY, c.y)), translatedValue: l2 };
              n2.polar && p(d2, { isCrosshair: true, chartX: a2 && a2.chartX, chartY: a2 && a2.chartY, point: c });
              d2 = this.getPlotLinePath(d2) || null;
            }
            if (!w(d2)) {
              this.hideCrosshair();
              return;
            }
            g = this.categories && !this.isRadial;
            f2 || (this.cross = f2 = n2.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (g ? "category " : "thin ") + b2.className).attr({ zIndex: E(b2.zIndex, 2) }).add(), n2.styledMode || (f2.attr({ stroke: b2.color || (g ? q.parse("#ccd6eb").setOpacity(0.25).get() : "#cccccc"), "stroke-width": E(b2.width, 1) }).css({ "pointer-events": "none" }), b2.dashStyle && f2.attr({ dashstyle: b2.dashStyle })));
            f2.show().attr({ d: d2 });
            g && !b2.width && f2.attr({ "stroke-width": this.transA });
            this.cross.e = a2;
          } else
            this.hideCrosshair();
          u(this, "afterDrawCrosshair", { e: a2, point: c });
        };
        l.prototype.hideCrosshair = function() {
          this.cross && this.cross.hide();
          u(this, "afterHideCrosshair");
        };
        l.prototype.hasVerticalPanning = function() {
          var a2, c;
          return /y/.test((null === (c = null === (a2 = this.chart.options.chart) || void 0 === a2 ? void 0 : a2.panning) || void 0 === c ? void 0 : c.type) || "");
        };
        l.defaultOptions = {
          dateTimeLabelFormats: {
            millisecond: { main: "%H:%M:%S.%L", range: false },
            second: { main: "%H:%M:%S", range: false },
            minute: { main: "%H:%M", range: false },
            hour: { main: "%H:%M", range: false },
            day: { main: "%e. %b" },
            week: { main: "%e. %b" },
            month: { main: "%b '%y" },
            year: { main: "%Y" }
          },
          endOnTick: false,
          labels: { enabled: true, indentation: 10, x: 0, style: { color: "#666666", cursor: "default", fontSize: "11px" } },
          maxPadding: 0.01,
          minorTickLength: 2,
          minorTickPosition: "outside",
          minPadding: 0.01,
          showEmpty: true,
          startOfWeek: 1,
          startOnTick: false,
          tickLength: 10,
          tickPixelInterval: 100,
          tickmarkPlacement: "between",
          tickPosition: "outside",
          title: { align: "middle", style: { color: "#666666" } },
          type: "linear",
          minorGridLineColor: "#f2f2f2",
          minorGridLineWidth: 1,
          minorTickColor: "#999999",
          lineColor: "#ccd6eb",
          lineWidth: 1,
          gridLineColor: "#e6e6e6",
          tickColor: "#ccd6eb"
        };
        l.defaultYAxisOptions = {
          endOnTick: true,
          maxPadding: 0.05,
          minPadding: 0.05,
          tickPixelInterval: 72,
          showLastLabel: true,
          labels: { x: -8 },
          startOnTick: true,
          title: { rotation: 270, text: "Values" },
          stackLabels: { allowOverlap: false, enabled: false, crop: true, overflow: "justify", formatter: function() {
            var a2 = this.axis.chart.numberFormatter;
            return a2(this.total, -1);
          }, style: { color: "#000000", fontSize: "11px", fontWeight: "bold", textOutline: "1px contrast" } },
          gridLineWidth: 1,
          lineWidth: 0
        };
        l.defaultLeftAxisOptions = { labels: { x: -15 }, title: { rotation: 270 } };
        l.defaultRightAxisOptions = { labels: { x: 15 }, title: { rotation: 90 } };
        l.defaultBottomAxisOptions = { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } };
        l.defaultTopAxisOptions = { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } };
        l.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
        return l;
      }();
      e.Axis = A;
      return e.Axis;
    });
    N(
      r,
      "parts/DateTimeAxis.js",
      [r["parts/Axis.js"], r["parts/Utilities.js"]],
      function(q, e) {
        var r2 = e.addEvent, A = e.getMagnitude, D = e.normalizeTickInterval, F = e.timeUnits, K = function() {
          function e2(m) {
            this.axis = m;
          }
          e2.prototype.normalizeTimeTickInterval = function(m, e3) {
            var q2 = e3 || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
            e3 = q2[q2.length - 1];
            var w = F[e3[0]], r3 = e3[1], x;
            for (x = 0; x < q2.length && !(e3 = q2[x], w = F[e3[0]], r3 = e3[1], q2[x + 1] && m <= (w * r3[r3.length - 1] + F[q2[x + 1][0]]) / 2); x++)
              ;
            w === F.year && m < 5 * w && (r3 = [1, 2, 5]);
            m = D(m / w, r3, "year" === e3[0] ? Math.max(A(m / w), 1) : 1);
            return { unitRange: w, count: m, unitName: e3[0] };
          };
          return e2;
        }();
        e = function() {
          function e2() {
          }
          e2.compose = function(m) {
            m.keepProps.push("dateTime");
            m.prototype.getTimeTicks = function() {
              return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
            };
            r2(m, "init", function(m2) {
              "datetime" !== m2.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this.dateTime = new K(this));
            });
          };
          e2.AdditionsClass = K;
          return e2;
        }();
        e.compose(q);
        return e;
      }
    );
    N(r, "parts/LogarithmicAxis.js", [r["parts/Axis.js"], r["parts/Utilities.js"]], function(q, e) {
      var r2 = e.addEvent, A = e.getMagnitude, D = e.normalizeTickInterval, F = e.pick, K = function() {
        function e2(m) {
          this.axis = m;
        }
        e2.prototype.getLogTickPositions = function(m, e3, q2, w) {
          var r3 = this.axis, x = r3.len, p = r3.options, u = [];
          w || (this.minorAutoInterval = void 0);
          if (0.5 <= m)
            m = Math.round(m), u = r3.getLinearTickPositions(m, e3, q2);
          else if (0.08 <= m) {
            p = Math.floor(e3);
            var y, k;
            for (x = 0.3 < m ? [1, 2, 4] : 0.15 < m ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; p < q2 + 1 && !k; p++) {
              var h = x.length;
              for (y = 0; y < h && !k; y++) {
                var d = this.log2lin(this.lin2log(p) * x[y]);
                d > e3 && (!w || t <= q2) && "undefined" !== typeof t && u.push(t);
                t > q2 && (k = true);
                var t = d;
              }
            }
          } else
            e3 = this.lin2log(e3), q2 = this.lin2log(q2), m = w ? r3.getMinorTickInterval() : p.tickInterval, m = F("auto" === m ? null : m, this.minorAutoInterval, p.tickPixelInterval / (w ? 5 : 1) * (q2 - e3) / ((w ? x / r3.tickPositions.length : x) || 1)), m = D(m, void 0, A(m)), u = r3.getLinearTickPositions(m, e3, q2).map(this.log2lin), w || (this.minorAutoInterval = m / 5);
          w || (r3.tickInterval = m);
          return u;
        };
        e2.prototype.lin2log = function(m) {
          return Math.pow(
            10,
            m
          );
        };
        e2.prototype.log2lin = function(m) {
          return Math.log(m) / Math.LN10;
        };
        return e2;
      }();
      e = function() {
        function e2() {
        }
        e2.compose = function(m) {
          m.keepProps.push("logarithmic");
          var e3 = m.prototype, q2 = K.prototype;
          e3.log2lin = q2.log2lin;
          e3.lin2log = q2.lin2log;
          r2(m, "init", function(m2) {
            var e4 = this.logarithmic;
            "logarithmic" !== m2.userOptions.type ? this.logarithmic = void 0 : (e4 || (e4 = this.logarithmic = new K(this)), this.log2lin !== e4.log2lin && (e4.log2lin = this.log2lin.bind(this)), this.lin2log !== e4.lin2log && (e4.lin2log = this.lin2log.bind(this)));
          });
          r2(
            m,
            "afterInit",
            function() {
              var m2 = this.logarithmic;
              m2 && (this.lin2val = function(e4) {
                return m2.lin2log(e4);
              }, this.val2lin = function(e4) {
                return m2.log2lin(e4);
              });
            }
          );
        };
        return e2;
      }();
      e.compose(q);
      return e;
    });
    N(r, "parts/PlotLineOrBand.js", [r["parts/Axis.js"], r["parts/Globals.js"], r["parts/Utilities.js"]], function(q, e, r2) {
      var A = r2.arrayMax, D = r2.arrayMin, F = r2.defined, K = r2.destroyObjectProperties, C = r2.erase, m = r2.extend, H = r2.merge, M = r2.objectEach, w = r2.pick, L = function() {
        function m2(p, u) {
          this.axis = p;
          u && (this.options = u, this.id = u.id);
        }
        m2.prototype.render = function() {
          e.fireEvent(this, "render");
          var p = this, u = p.axis, m3 = u.horiz, k = u.logarithmic, h = p.options, d = h.label, t = p.label, b = h.to, f = h.from, a = h.value, v = F(f) && F(b), E = F(a), J = p.svgElem, B = !J, n = [], z = h.color, I = w(h.zIndex, 0), x = h.events;
          n = { "class": "highcharts-plot-" + (v ? "band " : "line ") + (h.className || "") };
          var l = {}, g = u.chart.renderer, c = v ? "bands" : "lines";
          k && (f = k.log2lin(f), b = k.log2lin(b), a = k.log2lin(a));
          u.chart.styledMode || (E ? (n.stroke = z || "#999999", n["stroke-width"] = w(h.width, 1), h.dashStyle && (n.dashstyle = h.dashStyle)) : v && (n.fill = z || "#e6ebf5", h.borderWidth && (n.stroke = h.borderColor, n["stroke-width"] = h.borderWidth)));
          l.zIndex = I;
          c += "-" + I;
          (k = u.plotLinesAndBandsGroups[c]) || (u.plotLinesAndBandsGroups[c] = k = g.g("plot-" + c).attr(l).add());
          B && (p.svgElem = J = g.path().attr(n).add(k));
          if (E)
            n = u.getPlotLinePath({ value: a, lineWidth: J.strokeWidth(), acrossPanes: h.acrossPanes });
          else if (v)
            n = u.getPlotBandPath(f, b, h);
          else
            return;
          !p.eventsAdded && x && (M(x, function(a2, c2) {
            J.on(c2, function(a3) {
              x[c2].apply(p, [a3]);
            });
          }), p.eventsAdded = true);
          (B || !J.d) && n && n.length ? J.attr({ d: n }) : J && (n ? (J.show(true), J.animate({ d: n })) : J.d && (J.hide(), t && (p.label = t = t.destroy())));
          d && (F(d.text) || F(d.formatter)) && n && n.length && 0 < u.width && 0 < u.height && !n.isFlat ? (d = H({ align: m3 && v && "center", x: m3 ? !v && 4 : 10, verticalAlign: !m3 && v && "middle", y: m3 ? v ? 16 : 10 : v ? 6 : -4, rotation: m3 && !v && 90 }, d), this.renderLabel(d, n, v, I)) : t && t.hide();
          return p;
        };
        m2.prototype.renderLabel = function(p, u, m3, k) {
          var h = this.label, d = this.axis.chart.renderer;
          h || (h = { align: p.textAlign || p.align, rotation: p.rotation, "class": "highcharts-plot-" + (m3 ? "band" : "line") + "-label " + (p.className || "") }, h.zIndex = k, k = this.getLabelText(p), this.label = h = d.text(k, 0, 0, p.useHTML).attr(h).add(), this.axis.chart.styledMode || h.css(p.style));
          d = u.xBounds || [u[0][1], u[1][1], m3 ? u[2][1] : u[0][1]];
          u = u.yBounds || [u[0][2], u[1][2], m3 ? u[2][2] : u[0][2]];
          m3 = D(d);
          k = D(u);
          h.align(p, false, { x: m3, y: k, width: A(d) - m3, height: A(u) - k });
          h.show(true);
        };
        m2.prototype.getLabelText = function(p) {
          return F(p.formatter) ? p.formatter.call(this) : p.text;
        };
        m2.prototype.destroy = function() {
          C(
            this.axis.plotLinesAndBands,
            this
          );
          delete this.axis;
          K(this);
        };
        return m2;
      }();
      m(q.prototype, { getPlotBandPath: function(m2, p) {
        var u = this.getPlotLinePath({ value: p, force: true, acrossPanes: this.options.acrossPanes }), e2 = this.getPlotLinePath({ value: m2, force: true, acrossPanes: this.options.acrossPanes }), k = [], h = this.horiz, d = 1;
        m2 = m2 < this.min && p < this.min || m2 > this.max && p > this.max;
        if (e2 && u) {
          if (m2) {
            var t = e2.toString() === u.toString();
            d = 0;
          }
          for (m2 = 0; m2 < e2.length; m2 += 2) {
            p = e2[m2];
            var b = e2[m2 + 1], f = u[m2], a = u[m2 + 1];
            "M" !== p[0] && "L" !== p[0] || "M" !== b[0] && "L" !== b[0] || "M" !== f[0] && "L" !== f[0] || "M" !== a[0] && "L" !== a[0] || (h && f[1] === p[1] ? (f[1] += d, a[1] += d) : h || f[2] !== p[2] || (f[2] += d, a[2] += d), k.push(["M", p[1], p[2]], ["L", b[1], b[2]], ["L", a[1], a[2]], ["L", f[1], f[2]], ["Z"]));
            k.isFlat = t;
          }
        }
        return k;
      }, addPlotBand: function(m2) {
        return this.addPlotBandOrLine(m2, "plotBands");
      }, addPlotLine: function(m2) {
        return this.addPlotBandOrLine(m2, "plotLines");
      }, addPlotBandOrLine: function(m2, p) {
        var u = new L(this, m2).render(), e2 = this.userOptions;
        if (u) {
          if (p) {
            var k = e2[p] || [];
            k.push(m2);
            e2[p] = k;
          }
          this.plotLinesAndBands.push(u);
          this._addedPlotLB = true;
        }
        return u;
      }, removePlotBandOrLine: function(m2) {
        for (var p = this.plotLinesAndBands, u = this.options, e2 = this.userOptions, k = p.length; k--; )
          p[k].id === m2 && p[k].destroy();
        [u.plotLines || [], e2.plotLines || [], u.plotBands || [], e2.plotBands || []].forEach(function(h) {
          for (k = h.length; k--; )
            (h[k] || {}).id === m2 && C(h, h[k]);
        });
      }, removePlotBand: function(m2) {
        this.removePlotBandOrLine(m2);
      }, removePlotLine: function(m2) {
        this.removePlotBandOrLine(m2);
      } });
      e.PlotLineOrBand = L;
      return e.PlotLineOrBand;
    });
    N(r, "parts/Tooltip.js", [
      r["parts/Globals.js"],
      r["parts/Utilities.js"]
    ], function(q, e) {
      var r2 = q.doc, A = e.clamp, D = e.css, F = e.defined, K = e.discardElement, C = e.extend, m = e.fireEvent, H = e.format, M = e.isNumber, w = e.isString, L = e.merge, x = e.pick, p = e.splat, u = e.syncTimeout, y = e.timeUnits;
      var k = function() {
        function h(d, h2) {
          this.container = void 0;
          this.crosshairs = [];
          this.distance = 0;
          this.isHidden = true;
          this.isSticky = false;
          this.now = {};
          this.options = {};
          this.outside = false;
          this.chart = d;
          this.init(d, h2);
        }
        h.prototype.applyFilter = function() {
          var d = this.chart;
          d.renderer.definition({
            tagName: "filter",
            id: "drop-shadow-" + d.index,
            opacity: 0.5,
            children: [{ tagName: "feGaussianBlur", "in": "SourceAlpha", stdDeviation: 1 }, { tagName: "feOffset", dx: 1, dy: 1 }, { tagName: "feComponentTransfer", children: [{ tagName: "feFuncA", type: "linear", slope: 0.3 }] }, { tagName: "feMerge", children: [{ tagName: "feMergeNode" }, { tagName: "feMergeNode", "in": "SourceGraphic" }] }]
          });
          d.renderer.definition({ tagName: "style", textContent: ".highcharts-tooltip-" + d.index + "{filter:url(#drop-shadow-" + d.index + ")}" });
        };
        h.prototype.bodyFormatter = function(d) {
          return d.map(function(d2) {
            var b = d2.series.tooltipOptions;
            return (b[(d2.point.formatPrefix || "point") + "Formatter"] || d2.point.tooltipFormatter).call(d2.point, b[(d2.point.formatPrefix || "point") + "Format"] || "");
          });
        };
        h.prototype.cleanSplit = function(d) {
          this.chart.series.forEach(function(h2) {
            var b = h2 && h2.tt;
            b && (!b.isActive || d ? h2.tt = b.destroy() : b.isActive = false);
          });
        };
        h.prototype.defaultFormatter = function(d) {
          var h2 = this.points || p(this);
          var b = [d.tooltipFooterHeaderFormatter(h2[0])];
          b = b.concat(d.bodyFormatter(h2));
          b.push(d.tooltipFooterHeaderFormatter(h2[0], true));
          return b;
        };
        h.prototype.destroy = function() {
          this.label && (this.label = this.label.destroy());
          this.split && this.tt && (this.cleanSplit(this.chart, true), this.tt = this.tt.destroy());
          this.renderer && (this.renderer = this.renderer.destroy(), K(this.container));
          e.clearTimeout(this.hideTimer);
          e.clearTimeout(this.tooltipTimeout);
        };
        h.prototype.getAnchor = function(d, h2) {
          var b = this.chart, f = b.pointer, a = b.inverted, v = b.plotTop, k2 = b.plotLeft, t = 0, B = 0, n, z;
          d = p(d);
          this.followPointer && h2 ? ("undefined" === typeof h2.chartX && (h2 = f.normalize(h2)), d = [h2.chartX - k2, h2.chartY - v]) : d[0].tooltipPos ? d = d[0].tooltipPos : (d.forEach(function(b2) {
            n = b2.series.yAxis;
            z = b2.series.xAxis;
            t += b2.plotX + (!a && z ? z.left - k2 : 0);
            B += (b2.plotLow ? (b2.plotLow + b2.plotHigh) / 2 : b2.plotY) + (!a && n ? n.top - v : 0);
          }), t /= d.length, B /= d.length, d = [a ? b.plotWidth - B : t, this.shared && !a && 1 < d.length && h2 ? h2.chartY - v : a ? b.plotHeight - t : B]);
          return d.map(Math.round);
        };
        h.prototype.getDateFormat = function(d, h2, b, f) {
          var a = this.chart.time, v = a.dateFormat("%m-%d %H:%M:%S.%L", h2), k2 = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, t = "millisecond";
          for (B in y) {
            if (d === y.week && +a.dateFormat("%w", h2) === b && "00:00:00.000" === v.substr(6)) {
              var B = "week";
              break;
            }
            if (y[B] > d) {
              B = t;
              break;
            }
            if (k2[B] && v.substr(k2[B]) !== "01-01 00:00:00.000".substr(k2[B]))
              break;
            "week" !== B && (t = B);
          }
          if (B)
            var n = a.resolveDTLFormat(f[B]).main;
          return n;
        };
        h.prototype.getLabel = function() {
          var d, h2, b = this, f = this.chart.renderer, a = this.chart.styledMode, v = this.options, k2 = "tooltip" + (F(v.className) ? " " + v.className : ""), p2 = (null === (d = v.style) || void 0 === d ? void 0 : d.pointerEvents) || (!this.followPointer && v.stickOnContact ? "auto" : "none"), B;
          d = function() {
            b.inContact = true;
          };
          var n = function() {
            var a2 = b.chart.hoverSeries;
            b.inContact = false;
            if (a2 && a2.onMouseOut)
              a2.onMouseOut();
          };
          if (!this.label) {
            this.outside && (this.container = B = q.doc.createElement("div"), B.className = "highcharts-tooltip-container", D(B, { position: "absolute", top: "1px", pointerEvents: p2, zIndex: 3 }), q.doc.body.appendChild(B), this.renderer = f = new q.Renderer(B, 0, 0, null === (h2 = this.chart.options.chart) || void 0 === h2 ? void 0 : h2.style, void 0, void 0, f.styledMode));
            this.split ? this.label = f.g(k2) : (this.label = f.label("", 0, 0, v.shape || "callout", null, null, v.useHTML, null, k2).attr({ padding: v.padding, r: v.borderRadius }), a || this.label.attr({ fill: v.backgroundColor, "stroke-width": v.borderWidth }).css(v.style).css({ pointerEvents: p2 }).shadow(v.shadow));
            a && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index));
            if (b.outside && !b.split) {
              var z = this.label, I = z.xSetter, u2 = z.ySetter;
              z.xSetter = function(a2) {
                I.call(z, b.distance);
                B.style.left = a2 + "px";
              };
              z.ySetter = function(a2) {
                u2.call(
                  z,
                  b.distance
                );
                B.style.top = a2 + "px";
              };
            }
            this.label.on("mouseenter", d).on("mouseleave", n).attr({ zIndex: 8 }).add();
          }
          return this.label;
        };
        h.prototype.getPosition = function(d, h2, b) {
          var f = this.chart, a = this.distance, v = {}, k2 = f.inverted && b.h || 0, t, B = this.outside, n = B ? r2.documentElement.clientWidth - 2 * a : f.chartWidth, z = B ? Math.max(r2.body.scrollHeight, r2.documentElement.scrollHeight, r2.body.offsetHeight, r2.documentElement.offsetHeight, r2.documentElement.clientHeight) : f.chartHeight, I = f.pointer.getChartPosition(), p2 = f.containerScaling, l = function(a2) {
            return p2 ? a2 * p2.scaleX : a2;
          }, g = function(a2) {
            return p2 ? a2 * p2.scaleY : a2;
          }, c = function(c2) {
            var v2 = "x" === c2;
            return [c2, v2 ? n : z, v2 ? d : h2].concat(B ? [v2 ? l(d) : g(h2), v2 ? I.left - a + l(b.plotX + f.plotLeft) : I.top - a + g(b.plotY + f.plotTop), 0, v2 ? n : z] : [v2 ? d : h2, v2 ? b.plotX + f.plotLeft : b.plotY + f.plotTop, v2 ? f.plotLeft : f.plotTop, v2 ? f.plotLeft + f.plotWidth : f.plotTop + f.plotHeight]);
          }, G = c("y"), u2 = c("x"), m2 = !this.followPointer && x(b.ttBelow, !f.inverted === !!b.negative), e2 = function(c2, b2, f2, n2, d2, h3, t2) {
            var z2 = "y" === c2 ? g(a) : l(a), E = (f2 - n2) / 2, B2 = n2 < d2 - a, G2 = d2 + a + n2 < b2, I2 = d2 - z2 - f2 + E;
            d2 = d2 + z2 - E;
            if (m2 && G2)
              v[c2] = d2;
            else if (!m2 && B2)
              v[c2] = I2;
            else if (B2)
              v[c2] = Math.min(t2 - n2, 0 > I2 - k2 ? I2 : I2 - k2);
            else if (G2)
              v[c2] = Math.max(h3, d2 + k2 + f2 > b2 ? d2 : d2 + k2);
            else
              return false;
          }, y2 = function(c2, b2, g2, l2, f2) {
            var n2;
            f2 < a || f2 > b2 - a ? n2 = false : v[c2] = f2 < g2 / 2 ? 1 : f2 > b2 - l2 / 2 ? b2 - l2 - 2 : f2 - g2 / 2;
            return n2;
          }, q2 = function(a2) {
            var c2 = G;
            G = u2;
            u2 = c2;
            t = a2;
          }, w2 = function() {
            false !== e2.apply(0, G) ? false !== y2.apply(0, u2) || t || (q2(true), w2()) : t ? v.x = v.y = 0 : (q2(true), w2());
          };
          (f.inverted || 1 < this.len) && q2();
          w2();
          return v;
        };
        h.prototype.getXDateFormat = function(d, h2, b) {
          h2 = h2.dateTimeLabelFormats;
          var f = b && b.closestPointRange;
          return (f ? this.getDateFormat(f, d.x, b.options.startOfWeek, h2) : h2.day) || h2.year;
        };
        h.prototype.hide = function(d) {
          var h2 = this;
          e.clearTimeout(this.hideTimer);
          d = x(d, this.options.hideDelay, 500);
          this.isHidden || (this.hideTimer = u(function() {
            h2.getLabel().fadeOut(d ? void 0 : d);
            h2.isHidden = true;
          }, d));
        };
        h.prototype.init = function(d, h2) {
          this.chart = d;
          this.options = h2;
          this.crosshairs = [];
          this.now = { x: 0, y: 0 };
          this.isHidden = true;
          this.split = h2.split && !d.inverted && !d.polar;
          this.shared = h2.shared || this.split;
          this.outside = x(h2.outside, !(!d.scrollablePixelsX && !d.scrollablePixelsY));
        };
        h.prototype.isStickyOnContact = function() {
          return !(this.followPointer || !this.options.stickOnContact || !this.inContact);
        };
        h.prototype.move = function(d, h2, b, f) {
          var a = this, v = a.now, k2 = false !== a.options.animation && !a.isHidden && (1 < Math.abs(d - v.x) || 1 < Math.abs(h2 - v.y)), t = a.followPointer || 1 < a.len;
          C(v, { x: k2 ? (2 * v.x + d) / 3 : d, y: k2 ? (v.y + h2) / 2 : h2, anchorX: t ? void 0 : k2 ? (2 * v.anchorX + b) / 3 : b, anchorY: t ? void 0 : k2 ? (v.anchorY + f) / 2 : f });
          a.getLabel().attr(v);
          a.drawTracker();
          k2 && (e.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
            a && a.move(d, h2, b, f);
          }, 32));
        };
        h.prototype.refresh = function(d, h2) {
          var b = this.chart, f = this.options, a = d, v = {}, k2 = [], t = f.formatter || this.defaultFormatter;
          v = this.shared;
          var B = b.styledMode;
          if (f.enabled) {
            e.clearTimeout(this.hideTimer);
            this.followPointer = p(a)[0].series.tooltipOptions.followPointer;
            var n = this.getAnchor(a, h2);
            h2 = n[0];
            var z = n[1];
            !v || a.series && a.series.noSharedTooltip ? v = a.getLabelConfig() : (b.pointer.applyInactiveState(a), a.forEach(function(a2) {
              a2.setState("hover");
              k2.push(a2.getLabelConfig());
            }), v = { x: a[0].category, y: a[0].y }, v.points = k2, a = a[0]);
            this.len = k2.length;
            b = t.call(v, this);
            t = a.series;
            this.distance = x(t.tooltipOptions.distance, 16);
            false === b ? this.hide() : (this.split ? this.renderSplit(b, p(d)) : (d = this.getLabel(), f.style.width && !B || d.css({ width: this.chart.spacingBox.width + "px" }), d.attr({ text: b && b.join ? b.join("") : b }), d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + x(a.colorIndex, t.colorIndex)), B || d.attr({ stroke: f.borderColor || a.color || t.color || "#666666" }), this.updatePosition({
              plotX: h2,
              plotY: z,
              negative: a.negative,
              ttBelow: a.ttBelow,
              h: n[2] || 0
            })), this.isHidden && this.label && this.label.attr({ opacity: 1 }).show(), this.isHidden = false);
            m(this, "refresh");
          }
        };
        h.prototype.renderSplit = function(d, h2) {
          function b(a2, c2, b2, g2, l2) {
            void 0 === l2 && (l2 = true);
            b2 ? (c2 = r3 ? 0 : F2, a2 = A(a2 - g2 / 2, e2.left, e2.right - g2)) : (c2 -= H2, a2 = l2 ? a2 - g2 - G : a2 + G, a2 = A(a2, l2 ? a2 : e2.left, e2.right));
            return { x: a2, y: c2 };
          }
          var f = this, a = f.chart, v = f.chart, k2 = v.plotHeight, t = v.plotLeft, B = v.plotTop, n = v.pointer, z = v.renderer, I = v.scrollablePixelsY, p2 = void 0 === I ? 0 : I;
          I = v.scrollingContainer;
          I = void 0 === I ? { scrollLeft: 0, scrollTop: 0 } : I;
          var l = I.scrollLeft, g = I.scrollTop, c = v.styledMode, G = f.distance, u2 = f.options, m2 = f.options.positioner, e2 = { left: l, right: l + v.chartWidth, top: g, bottom: g + v.chartHeight }, y2 = f.getLabel(), r3 = !(!a.xAxis[0] || !a.xAxis[0].opposite), H2 = B + g, L2 = 0, F2 = k2 - p2;
          w(d) && (d = [false, d]);
          d = d.slice(0, h2.length + 1).reduce(function(a2, l2, n2) {
            if (false !== l2 && "" !== l2) {
              n2 = h2[n2 - 1] || { isHeader: true, plotX: h2[0].plotX, plotY: k2, series: {} };
              var d2 = n2.isHeader, v2 = d2 ? f : n2.series, E = v2.tt, I2 = n2.isHeader;
              var J = n2.series;
              var O = "highcharts-color-" + x(n2.colorIndex, J.colorIndex, "none");
              E || (E = { padding: u2.padding, r: u2.borderRadius }, c || (E.fill = u2.backgroundColor, E["stroke-width"] = u2.borderWidth), E = z.label("", 0, 0, u2[I2 ? "headerShape" : "shape"] || "callout", void 0, void 0, u2.useHTML).addClass((I2 ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + O).attr(E).add(y2));
              E.isActive = true;
              E.attr({ text: l2 });
              c || E.css(u2.style).shadow(u2.shadow).attr({ stroke: u2.borderColor || n2.color || J.color || "#333333" });
              l2 = v2.tt = E;
              I2 = l2.getBBox();
              v2 = I2.width + l2.strokeWidth();
              d2 && (L2 = I2.height, F2 += L2, r3 && (H2 -= L2));
              J = n2.plotX;
              J = void 0 === J ? 0 : J;
              O = n2.plotY;
              O = void 0 === O ? 0 : O;
              var P = n2.series;
              if (n2.isHeader) {
                J = t + J;
                var q2 = B + k2 / 2;
              } else
                E = P.xAxis, P = P.yAxis, J = E.pos + A(J, -G, E.len + G), P.pos + O >= g + B && P.pos + O <= g + B + k2 - p2 && (q2 = P.pos + O);
              J = A(J, e2.left - G, e2.right + G);
              "number" === typeof q2 ? (I2 = I2.height + 1, O = m2 ? m2.call(f, v2, I2, n2) : b(J, q2, d2, v2), a2.push({ align: m2 ? 0 : void 0, anchorX: J, anchorY: q2, boxWidth: v2, point: n2, rank: x(O.rank, d2 ? 1 : 0), size: I2, target: O.y, tt: l2, x: O.x })) : l2.isActive = false;
            }
            return a2;
          }, []);
          !m2 && d.some(function(a2) {
            return a2.x < e2.left;
          }) && (d = d.map(function(a2) {
            var c2 = b(a2.anchorX, a2.anchorY, a2.point.isHeader, a2.boxWidth, false);
            return C(a2, { target: c2.y, x: c2.x });
          }));
          f.cleanSplit();
          q.distribute(d, F2);
          d.forEach(function(a2) {
            var c2 = a2.pos;
            a2.tt.attr({ visibility: "undefined" === typeof c2 ? "hidden" : "inherit", x: a2.x, y: c2 + H2, anchorX: a2.anchorX, anchorY: a2.anchorY });
          });
          d = f.container;
          a = f.renderer;
          f.outside && d && a && (v = y2.getBBox(), a.setSize(v.width + v.x, v.height + v.y, false), n = n.getChartPosition(), d.style.left = n.left + "px", d.style.top = n.top + "px");
        };
        h.prototype.drawTracker = function() {
          if (this.followPointer || !this.options.stickOnContact)
            this.tracker && this.tracker.destroy();
          else {
            var d = this.chart, h2 = this.label, b = d.hoverPoint;
            if (h2 && b) {
              var f = { x: 0, y: 0, width: 0, height: 0 };
              b = this.getAnchor(b);
              var a = h2.getBBox();
              b[0] += d.plotLeft - h2.translateX;
              b[1] += d.plotTop - h2.translateY;
              f.x = Math.min(0, b[0]);
              f.y = Math.min(0, b[1]);
              f.width = 0 > b[0] ? Math.max(Math.abs(b[0]), a.width - b[0]) : Math.max(Math.abs(b[0]), a.width);
              f.height = 0 > b[1] ? Math.max(Math.abs(b[1]), a.height - Math.abs(b[1])) : Math.max(Math.abs(b[1]), a.height);
              this.tracker ? this.tracker.attr(f) : (this.tracker = h2.renderer.rect(f).addClass("highcharts-tracker").add(h2), d.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
            }
          }
        };
        h.prototype.styledModeFormat = function(d) {
          return d.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"');
        };
        h.prototype.tooltipFooterHeaderFormatter = function(d, h2) {
          var b = h2 ? "footer" : "header", f = d.series, a = f.tooltipOptions, v = a.xDateFormat, k2 = f.xAxis, t = k2 && "datetime" === k2.options.type && M(d.key), B = a[b + "Format"];
          h2 = { isFooter: h2, labelConfig: d };
          m(
            this,
            "headerFormatter",
            h2,
            function(b2) {
              t && !v && (v = this.getXDateFormat(d, a, k2));
              t && v && (d.point && d.point.tooltipDateKeys || ["key"]).forEach(function(a2) {
                B = B.replace("{point." + a2 + "}", "{point." + a2 + ":" + v + "}");
              });
              f.chart.styledMode && (B = this.styledModeFormat(B));
              b2.text = H(B, { point: d, series: f }, this.chart);
            }
          );
          return h2.text;
        };
        h.prototype.update = function(d) {
          this.destroy();
          L(true, this.chart.options.tooltip.userOptions, d);
          this.init(this.chart, L(true, this.options, d));
        };
        h.prototype.updatePosition = function(d) {
          var h2 = this.chart, b = h2.pointer, f = this.getLabel(), a = d.plotX + h2.plotLeft, v = d.plotY + h2.plotTop;
          b = b.getChartPosition();
          d = (this.options.positioner || this.getPosition).call(this, f.width, f.height, d);
          if (this.outside) {
            var k2 = (this.options.borderWidth || 0) + 2 * this.distance;
            this.renderer.setSize(f.width + k2, f.height + k2, false);
            if (h2 = h2.containerScaling)
              D(this.container, { transform: "scale(" + h2.scaleX + ", " + h2.scaleY + ")" }), a *= h2.scaleX, v *= h2.scaleY;
            a += b.left - d.x;
            v += b.top - d.y;
          }
          this.move(Math.round(d.x), Math.round(d.y || 0), a, v);
        };
        return h;
      }();
      q.Tooltip = k;
      return q.Tooltip;
    });
    N(
      r,
      "parts/Pointer.js",
      [r["parts/Color.js"], r["parts/Globals.js"], r["parts/Tooltip.js"], r["parts/Utilities.js"]],
      function(q, e, r2, A) {
        var D = q.parse, F = e.charts, K = e.noop, C = A.addEvent, m = A.attr, H = A.css, M = A.defined, w = A.extend, L = A.find, x = A.fireEvent, p = A.isNumber, u = A.isObject, y = A.objectEach, k = A.offset, h = A.pick, d = A.splat;
        q = function() {
          function t(b, f) {
            this.lastValidTouch = {};
            this.pinchDown = [];
            this.runChartClick = false;
            this.chart = b;
            this.hasDragged = false;
            this.options = f;
            this.unbindContainerMouseLeave = function() {
            };
            this.init(b, f);
          }
          t.prototype.applyInactiveState = function(b) {
            var f = [], a;
            (b || []).forEach(function(b2) {
              a = b2.series;
              f.push(a);
              a.linkedParent && f.push(a.linkedParent);
              a.linkedSeries && (f = f.concat(a.linkedSeries));
              a.navigatorSeries && f.push(a.navigatorSeries);
            });
            this.chart.series.forEach(function(a2) {
              -1 === f.indexOf(a2) ? a2.setState("inactive", true) : a2.options.inactiveOtherPoints && a2.setAllPointsToState("inactive");
            });
          };
          t.prototype.destroy = function() {
            var b = this;
            "undefined" !== typeof b.unDocMouseMove && b.unDocMouseMove();
            this.unbindContainerMouseLeave();
            e.chartCount || (e.unbindDocumentMouseUp && (e.unbindDocumentMouseUp = e.unbindDocumentMouseUp()), e.unbindDocumentTouchEnd && (e.unbindDocumentTouchEnd = e.unbindDocumentTouchEnd()));
            clearInterval(b.tooltipTimeout);
            y(b, function(f, a) {
              b[a] = void 0;
            });
          };
          t.prototype.drag = function(b) {
            var f = this.chart, a = f.options.chart, d2 = b.chartX, h2 = b.chartY, k2 = this.zoomHor, t2 = this.zoomVert, n = f.plotLeft, z = f.plotTop, I = f.plotWidth, p2 = f.plotHeight, l = this.selectionMarker, g = this.mouseDownX || 0, c = this.mouseDownY || 0, G = u(a.panning) ? a.panning && a.panning.enabled : a.panning, m2 = a.panKey && b[a.panKey + "Key"];
            if (!l || !l.touch) {
              if (d2 < n ? d2 = n : d2 > n + I && (d2 = n + I), h2 < z ? h2 = z : h2 > z + p2 && (h2 = z + p2), this.hasDragged = Math.sqrt(Math.pow(g - d2, 2) + Math.pow(c - h2, 2)), 10 < this.hasDragged) {
                var e2 = f.isInsidePlot(g - n, c - z);
                f.hasCartesianSeries && (this.zoomX || this.zoomY) && e2 && !m2 && !l && (this.selectionMarker = l = f.renderer.rect(n, z, k2 ? 1 : I, t2 ? 1 : p2, 0).attr({ "class": "highcharts-selection-marker", zIndex: 7 }).add(), f.styledMode || l.attr({ fill: a.selectionMarkerFill || D("#335cad").setOpacity(0.25).get() }));
                l && k2 && (d2 -= g, l.attr({ width: Math.abs(d2), x: (0 < d2 ? 0 : d2) + g }));
                l && t2 && (d2 = h2 - c, l.attr({ height: Math.abs(d2), y: (0 < d2 ? 0 : d2) + c }));
                e2 && !l && G && f.pan(b, a.panning);
              }
            }
          };
          t.prototype.dragStart = function(b) {
            var f = this.chart;
            f.mouseIsDown = b.type;
            f.cancelClick = false;
            f.mouseDownX = this.mouseDownX = b.chartX;
            f.mouseDownY = this.mouseDownY = b.chartY;
          };
          t.prototype.drop = function(b) {
            var f = this, a = this.chart, d2 = this.hasPinched;
            if (this.selectionMarker) {
              var h2 = { originalEvent: b, xAxis: [], yAxis: [] }, k2 = this.selectionMarker, t2 = k2.attr ? k2.attr("x") : k2.x, n = k2.attr ? k2.attr("y") : k2.y, z = k2.attr ? k2.attr("width") : k2.width, I = k2.attr ? k2.attr("height") : k2.height, u2;
              if (this.hasDragged || d2)
                a.axes.forEach(function(a2) {
                  if (a2.zoomEnabled && M(a2.min) && (d2 || f[{ xAxis: "zoomX", yAxis: "zoomY" }[a2.coll]]) && p(t2) && p(n)) {
                    var g = a2.horiz, c = "touchend" === b.type ? a2.minPixelPadding : 0, l = a2.toValue((g ? t2 : n) + c);
                    g = a2.toValue((g ? t2 + z : n + I) - c);
                    h2[a2.coll].push({ axis: a2, min: Math.min(l, g), max: Math.max(l, g) });
                    u2 = true;
                  }
                }), u2 && x(a, "selection", h2, function(b2) {
                  a.zoom(w(b2, d2 ? { animation: false } : null));
                });
              p(a.index) && (this.selectionMarker = this.selectionMarker.destroy());
              d2 && this.scaleGroups();
            }
            a && p(a.index) && (H(a.container, { cursor: a._cursor }), a.cancelClick = 10 < this.hasDragged, a.mouseIsDown = this.hasDragged = this.hasPinched = false, this.pinchDown = []);
          };
          t.prototype.findNearestKDPoint = function(b, f, a) {
            var d2 = this.chart, h2 = d2.hoverPoint;
            d2 = d2.tooltip;
            if (h2 && d2 && d2.isStickyOnContact())
              return h2;
            var k2;
            b.forEach(function(b2) {
              var n = !(b2.noSharedTooltip && f) && 0 > b2.options.findNearestPointBy.indexOf("y");
              b2 = b2.searchPoint(a, n);
              if ((n = u(b2, true)) && !(n = !u(k2, true))) {
                n = k2.distX - b2.distX;
                var d3 = k2.dist - b2.dist, h3 = (b2.series.group && b2.series.group.zIndex) - (k2.series.group && k2.series.group.zIndex);
                n = 0 < (0 !== n && f ? n : 0 !== d3 ? d3 : 0 !== h3 ? h3 : k2.series.index > b2.series.index ? -1 : 1);
              }
              n && (k2 = b2);
            });
            return k2;
          };
          t.prototype.getChartCoordinatesFromPoint = function(b, f) {
            var a = b.series, d2 = a.xAxis;
            a = a.yAxis;
            var k2 = h(b.clientX, b.plotX), t2 = b.shapeArgs;
            if (d2 && a)
              return f ? { chartX: d2.len + d2.pos - k2, chartY: a.len + a.pos - b.plotY } : { chartX: k2 + d2.pos, chartY: b.plotY + a.pos };
            if (t2 && t2.x && t2.y)
              return { chartX: t2.x, chartY: t2.y };
          };
          t.prototype.getChartPosition = function() {
            return this.chartPosition || (this.chartPosition = k(this.chart.container));
          };
          t.prototype.getCoordinates = function(b) {
            var f = { xAxis: [], yAxis: [] };
            this.chart.axes.forEach(function(a) {
              f[a.isXAxis ? "xAxis" : "yAxis"].push({ axis: a, value: a.toValue(b[a.horiz ? "chartX" : "chartY"]) });
            });
            return f;
          };
          t.prototype.getHoverData = function(b, f, a, d2, k2, t2) {
            var v, n = [];
            d2 = !(!d2 || !b);
            var z = f && !f.stickyTracking, E = { chartX: t2 ? t2.chartX : void 0, chartY: t2 ? t2.chartY : void 0, shared: k2 };
            x(this, "beforeGetHoverData", E);
            z = z ? [f] : a.filter(function(a2) {
              return E.filter ? E.filter(a2) : a2.visible && !(!k2 && a2.directTouch) && h(
                a2.options.enableMouseTracking,
                true
              ) && a2.stickyTracking;
            });
            f = (v = d2 || !t2 ? b : this.findNearestKDPoint(z, k2, t2)) && v.series;
            v && (k2 && !f.noSharedTooltip ? (z = a.filter(function(a2) {
              return E.filter ? E.filter(a2) : a2.visible && !(!k2 && a2.directTouch) && h(a2.options.enableMouseTracking, true) && !a2.noSharedTooltip;
            }), z.forEach(function(a2) {
              var b2 = L(a2.points, function(a3) {
                return a3.x === v.x && !a3.isNull;
              });
              u(b2) && (a2.chart.isBoosting && (b2 = a2.getPoint(b2)), n.push(b2));
            })) : n.push(v));
            E = { hoverPoint: v };
            x(this, "afterGetHoverData", E);
            return { hoverPoint: E.hoverPoint, hoverSeries: f, hoverPoints: n };
          };
          t.prototype.getPointFromEvent = function(b) {
            b = b.target;
            for (var f; b && !f; )
              f = b.point, b = b.parentNode;
            return f;
          };
          t.prototype.onTrackerMouseOut = function(b) {
            b = b.relatedTarget || b.toElement;
            var f = this.chart.hoverSeries;
            this.isDirectTouch = false;
            if (!(!f || !b || f.stickyTracking || this.inClass(b, "highcharts-tooltip") || this.inClass(b, "highcharts-series-" + f.index) && this.inClass(b, "highcharts-tracker")))
              f.onMouseOut();
          };
          t.prototype.inClass = function(b, f) {
            for (var a; b; ) {
              if (a = m(b, "class")) {
                if (-1 !== a.indexOf(f))
                  return true;
                if (-1 !== a.indexOf("highcharts-container"))
                  return false;
              }
              b = b.parentNode;
            }
          };
          t.prototype.init = function(b, f) {
            this.options = f;
            this.chart = b;
            this.runChartClick = f.chart.events && !!f.chart.events.click;
            this.pinchDown = [];
            this.lastValidTouch = {};
            r2 && (b.tooltip = new r2(b, f.tooltip), this.followTouchMove = h(f.tooltip.followTouchMove, true));
            this.setDOMEvents();
          };
          t.prototype.normalize = function(b, f) {
            var a = b.touches, d2 = a ? a.length ? a.item(0) : h(a.changedTouches, b.changedTouches)[0] : b;
            f || (f = this.getChartPosition());
            a = d2.pageX - f.left;
            f = d2.pageY - f.top;
            if (d2 = this.chart.containerScaling)
              a /= d2.scaleX, f /= d2.scaleY;
            return w(b, { chartX: Math.round(a), chartY: Math.round(f) });
          };
          t.prototype.onContainerClick = function(b) {
            var f = this.chart, a = f.hoverPoint;
            b = this.normalize(b);
            var d2 = f.plotLeft, h2 = f.plotTop;
            f.cancelClick || (a && this.inClass(b.target, "highcharts-tracker") ? (x(a.series, "click", w(b, { point: a })), f.hoverPoint && a.firePointEvent("click", b)) : (w(b, this.getCoordinates(b)), f.isInsidePlot(b.chartX - d2, b.chartY - h2) && x(f, "click", b)));
          };
          t.prototype.onContainerMouseDown = function(b) {
            b = this.normalize(b);
            if (e.isFirefox && 0 !== b.button)
              this.onContainerMouseMove(b);
            if ("undefined" === typeof b.button || 1 === ((b.buttons || b.button) & 1))
              this.zoomOption(b), this.dragStart(b);
          };
          t.prototype.onContainerMouseLeave = function(b) {
            var f = F[h(e.hoverChartIndex, -1)], a = this.chart.tooltip;
            b = this.normalize(b);
            f && (b.relatedTarget || b.toElement) && (f.pointer.reset(), f.pointer.chartPosition = void 0);
            a && !a.isHidden && this.reset();
          };
          t.prototype.onContainerMouseMove = function(b) {
            var f = this.chart;
            b = this.normalize(b);
            this.setHoverChartIndex();
            b.preventDefault || (b.returnValue = false);
            "mousedown" === f.mouseIsDown && this.drag(b);
            f.openMenu || !this.inClass(b.target, "highcharts-tracker") && !f.isInsidePlot(b.chartX - f.plotLeft, b.chartY - f.plotTop) || this.runPointActions(b);
          };
          t.prototype.onDocumentTouchEnd = function(b) {
            F[e.hoverChartIndex] && F[e.hoverChartIndex].pointer.drop(b);
          };
          t.prototype.onContainerTouchMove = function(b) {
            this.touch(b);
          };
          t.prototype.onContainerTouchStart = function(b) {
            this.zoomOption(b);
            this.touch(b, true);
          };
          t.prototype.onDocumentMouseMove = function(b) {
            var f = this.chart, a = this.chartPosition;
            b = this.normalize(b, a);
            var d2 = f.tooltip;
            !a || d2 && d2.isStickyOnContact() || f.isInsidePlot(b.chartX - f.plotLeft, b.chartY - f.plotTop) || this.inClass(b.target, "highcharts-tracker") || this.reset();
          };
          t.prototype.onDocumentMouseUp = function(b) {
            var f = F[h(e.hoverChartIndex, -1)];
            f && f.pointer.drop(b);
          };
          t.prototype.pinch = function(b) {
            var f = this, a = f.chart, d2 = f.pinchDown, k2 = b.touches || [], t2 = k2.length, B = f.lastValidTouch, n = f.hasZoom, z = f.selectionMarker, I = {}, p2 = 1 === t2 && (f.inClass(
              b.target,
              "highcharts-tracker"
            ) && a.runTrackerClick || f.runChartClick), l = {};
            1 < t2 && (f.initiated = true);
            n && f.initiated && !p2 && b.preventDefault();
            [].map.call(k2, function(a2) {
              return f.normalize(a2);
            });
            "touchstart" === b.type ? ([].forEach.call(k2, function(a2, c) {
              d2[c] = { chartX: a2.chartX, chartY: a2.chartY };
            }), B.x = [d2[0].chartX, d2[1] && d2[1].chartX], B.y = [d2[0].chartY, d2[1] && d2[1].chartY], a.axes.forEach(function(b2) {
              if (b2.zoomEnabled) {
                var c = a.bounds[b2.horiz ? "h" : "v"], g = b2.minPixelPadding, l2 = b2.toPixels(Math.min(h(b2.options.min, b2.dataMin), b2.dataMin)), f2 = b2.toPixels(Math.max(h(b2.options.max, b2.dataMax), b2.dataMax)), n2 = Math.max(l2, f2);
                c.min = Math.min(b2.pos, Math.min(l2, f2) - g);
                c.max = Math.max(b2.pos + b2.len, n2 + g);
              }
            }), f.res = true) : f.followTouchMove && 1 === t2 ? this.runPointActions(f.normalize(b)) : d2.length && (z || (f.selectionMarker = z = w({ destroy: K, touch: true }, a.plotBox)), f.pinchTranslate(d2, k2, I, z, l, B), f.hasPinched = n, f.scaleGroups(I, l), f.res && (f.res = false, this.reset(false, 0)));
          };
          t.prototype.pinchTranslate = function(b, f, a, d2, h2, k2) {
            this.zoomHor && this.pinchTranslateDirection(true, b, f, a, d2, h2, k2);
            this.zoomVert && this.pinchTranslateDirection(false, b, f, a, d2, h2, k2);
          };
          t.prototype.pinchTranslateDirection = function(b, f, a, d2, h2, k2, t2, n) {
            var v = this.chart, E = b ? "x" : "y", B = b ? "X" : "Y", l = "chart" + B, g = b ? "width" : "height", c = v["plot" + (b ? "Left" : "Top")], G, p2, u2 = n || 1, m2 = v.inverted, e2 = v.bounds[b ? "h" : "v"], y2 = 1 === f.length, J = f[0][l], x2 = a[0][l], q2 = !y2 && f[1][l], w2 = !y2 && a[1][l];
            a = function() {
              "number" === typeof w2 && 20 < Math.abs(J - q2) && (u2 = n || Math.abs(x2 - w2) / Math.abs(J - q2));
              p2 = (c - x2) / u2 + J;
              G = v["plot" + (b ? "Width" : "Height")] / u2;
            };
            a();
            f = p2;
            if (f < e2.min) {
              f = e2.min;
              var r3 = true;
            } else
              f + G > e2.max && (f = e2.max - G, r3 = true);
            r3 ? (x2 -= 0.8 * (x2 - t2[E][0]), "number" === typeof w2 && (w2 -= 0.8 * (w2 - t2[E][1])), a()) : t2[E] = [x2, w2];
            m2 || (k2[E] = p2 - c, k2[g] = G);
            k2 = m2 ? 1 / u2 : u2;
            h2[g] = G;
            h2[E] = f;
            d2[m2 ? b ? "scaleY" : "scaleX" : "scale" + B] = u2;
            d2["translate" + B] = k2 * c + (x2 - k2 * J);
          };
          t.prototype.reset = function(b, f) {
            var a = this.chart, h2 = a.hoverSeries, k2 = a.hoverPoint, t2 = a.hoverPoints, B = a.tooltip, n = B && B.shared ? t2 : k2;
            b && n && d(n).forEach(function(a2) {
              a2.series.isCartesian && "undefined" === typeof a2.plotX && (b = false);
            });
            if (b)
              B && n && d(n).length && (B.refresh(n), B.shared && t2 ? t2.forEach(function(a2) {
                a2.setState(
                  a2.state,
                  true
                );
                a2.series.isCartesian && (a2.series.xAxis.crosshair && a2.series.xAxis.drawCrosshair(null, a2), a2.series.yAxis.crosshair && a2.series.yAxis.drawCrosshair(null, a2));
              }) : k2 && (k2.setState(k2.state, true), a.axes.forEach(function(a2) {
                a2.crosshair && k2.series[a2.coll] === a2 && a2.drawCrosshair(null, k2);
              })));
            else {
              if (k2)
                k2.onMouseOut();
              t2 && t2.forEach(function(a2) {
                a2.setState();
              });
              if (h2)
                h2.onMouseOut();
              B && B.hide(f);
              this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
              a.axes.forEach(function(a2) {
                a2.hideCrosshair();
              });
              this.hoverX = a.hoverPoints = a.hoverPoint = null;
            }
          };
          t.prototype.runPointActions = function(b, f) {
            var a = this.chart, d2 = a.tooltip && a.tooltip.options.enabled ? a.tooltip : void 0, k2 = d2 ? d2.shared : false, t2 = f || a.hoverPoint, B = t2 && t2.series || a.hoverSeries;
            B = this.getHoverData(t2, B, a.series, (!b || "touchmove" !== b.type) && (!!f || B && B.directTouch && this.isDirectTouch), k2, b);
            t2 = B.hoverPoint;
            var n = B.hoverPoints;
            f = (B = B.hoverSeries) && B.tooltipOptions.followPointer;
            k2 = k2 && B && !B.noSharedTooltip;
            if (t2 && (t2 !== a.hoverPoint || d2 && d2.isHidden)) {
              (a.hoverPoints || []).forEach(function(a2) {
                -1 === n.indexOf(a2) && a2.setState();
              });
              if (a.hoverSeries !== B)
                B.onMouseOver();
              this.applyInactiveState(n);
              (n || []).forEach(function(a2) {
                a2.setState("hover");
              });
              a.hoverPoint && a.hoverPoint.firePointEvent("mouseOut");
              if (!t2.series)
                return;
              a.hoverPoints = n;
              a.hoverPoint = t2;
              t2.firePointEvent("mouseOver");
              d2 && d2.refresh(k2 ? n : t2, b);
            } else
              f && d2 && !d2.isHidden && (t2 = d2.getAnchor([{}], b), d2.updatePosition({ plotX: t2[0], plotY: t2[1] }));
            this.unDocMouseMove || (this.unDocMouseMove = C(a.container.ownerDocument, "mousemove", function(a2) {
              var b2 = F[e.hoverChartIndex];
              if (b2)
                b2.pointer.onDocumentMouseMove(a2);
            }));
            a.axes.forEach(function(f2) {
              var d3 = h((f2.crosshair || {}).snap, true), k3;
              d3 && ((k3 = a.hoverPoint) && k3.series[f2.coll] === f2 || (k3 = L(n, function(a2) {
                return a2.series[f2.coll] === f2;
              })));
              k3 || !d3 ? f2.drawCrosshair(b, k3) : f2.hideCrosshair();
            });
          };
          t.prototype.scaleGroups = function(b, f) {
            var a = this.chart, d2;
            a.series.forEach(function(h2) {
              d2 = b || h2.getPlotBox();
              h2.xAxis && h2.xAxis.zoomEnabled && h2.group && (h2.group.attr(d2), h2.markerGroup && (h2.markerGroup.attr(d2), h2.markerGroup.clip(f ? a.clipRect : null)), h2.dataLabelsGroup && h2.dataLabelsGroup.attr(d2));
            });
            a.clipRect.attr(f || a.clipBox);
          };
          t.prototype.setDOMEvents = function() {
            var b = this.chart.container, f = b.ownerDocument;
            b.onmousedown = this.onContainerMouseDown.bind(this);
            b.onmousemove = this.onContainerMouseMove.bind(this);
            b.onclick = this.onContainerClick.bind(this);
            this.unbindContainerMouseLeave = C(b, "mouseleave", this.onContainerMouseLeave.bind(this));
            e.unbindDocumentMouseUp || (e.unbindDocumentMouseUp = C(f, "mouseup", this.onDocumentMouseUp.bind(this)));
            e.hasTouch && (C(
              b,
              "touchstart",
              this.onContainerTouchStart.bind(this)
            ), C(b, "touchmove", this.onContainerTouchMove.bind(this)), e.unbindDocumentTouchEnd || (e.unbindDocumentTouchEnd = C(f, "touchend", this.onDocumentTouchEnd.bind(this))));
          };
          t.prototype.setHoverChartIndex = function() {
            var b = this.chart, f = e.charts[h(e.hoverChartIndex, -1)];
            if (f && f !== b)
              f.pointer.onContainerMouseLeave({ relatedTarget: true });
            f && f.mouseIsDown || (e.hoverChartIndex = b.index);
          };
          t.prototype.touch = function(b, f) {
            var a = this.chart;
            this.setHoverChartIndex();
            if (1 === b.touches.length)
              if (b = this.normalize(b), a.isInsidePlot(b.chartX - a.plotLeft, b.chartY - a.plotTop) && !a.openMenu) {
                f && this.runPointActions(b);
                if ("touchmove" === b.type) {
                  f = this.pinchDown;
                  var k2 = f[0] ? 4 <= Math.sqrt(Math.pow(f[0].chartX - b.chartX, 2) + Math.pow(f[0].chartY - b.chartY, 2)) : false;
                }
                h(k2, true) && this.pinch(b);
              } else
                f && this.reset();
            else
              2 === b.touches.length && this.pinch(b);
          };
          t.prototype.zoomOption = function(b) {
            var f = this.chart, a = f.options.chart, d2 = a.zoomType || "";
            f = f.inverted;
            /touch/.test(b.type) && (d2 = h(a.pinchType, d2));
            this.zoomX = b = /x/.test(d2);
            this.zoomY = d2 = /y/.test(d2);
            this.zoomHor = b && !f || d2 && f;
            this.zoomVert = d2 && !f || b && f;
            this.hasZoom = b || d2;
          };
          return t;
        }();
        return e.Pointer = q;
      }
    );
    N(r, "parts/MSPointer.js", [r["parts/Globals.js"], r["parts/Pointer.js"], r["parts/Utilities.js"]], function(q, e, r2) {
      function A() {
        var p2 = [];
        p2.item = function(p3) {
          return this[p3];
        };
        w(x, function(u) {
          p2.push({ pageX: u.pageX, pageY: u.pageY, target: u.target });
        });
        return p2;
      }
      function D(p2, e2, k, h) {
        "touch" !== p2.pointerType && p2.pointerType !== p2.MSPOINTER_TYPE_TOUCH || !K[q.hoverChartIndex] || (h(p2), h = K[q.hoverChartIndex].pointer, h[e2]({ type: k, target: p2.currentTarget, preventDefault: m, touches: A() }));
      }
      var F = this && this.__extends || function() {
        var p2 = function(u, k) {
          p2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, d) {
            h.__proto__ = d;
          } || function(h, d) {
            for (var k2 in d)
              d.hasOwnProperty(k2) && (h[k2] = d[k2]);
          };
          return p2(u, k);
        };
        return function(u, k) {
          function h() {
            this.constructor = u;
          }
          p2(u, k);
          u.prototype = null === k ? Object.create(k) : (h.prototype = k.prototype, new h());
        };
      }(), K = q.charts, C = q.doc, m = q.noop, H = r2.addEvent, M = r2.css, w = r2.objectEach, L = r2.removeEvent, x = {}, p = !!q.win.PointerEvent;
      return function(u) {
        function m2() {
          return null !== u && u.apply(this, arguments) || this;
        }
        F(m2, u);
        m2.prototype.batchMSEvents = function(k) {
          k(this.chart.container, p ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
          k(this.chart.container, p ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
          k(C, p ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
        };
        m2.prototype.destroy = function() {
          this.batchMSEvents(L);
          u.prototype.destroy.call(this);
        };
        m2.prototype.init = function(k, h) {
          u.prototype.init.call(
            this,
            k,
            h
          );
          this.hasZoom && M(k.container, { "-ms-touch-action": "none", "touch-action": "none" });
        };
        m2.prototype.onContainerPointerDown = function(k) {
          D(k, "onContainerTouchStart", "touchstart", function(h) {
            x[h.pointerId] = { pageX: h.pageX, pageY: h.pageY, target: h.currentTarget };
          });
        };
        m2.prototype.onContainerPointerMove = function(k) {
          D(k, "onContainerTouchMove", "touchmove", function(h) {
            x[h.pointerId] = { pageX: h.pageX, pageY: h.pageY };
            x[h.pointerId].target || (x[h.pointerId].target = h.currentTarget);
          });
        };
        m2.prototype.onDocumentPointerUp = function(k) {
          D(
            k,
            "onDocumentTouchEnd",
            "touchend",
            function(h) {
              delete x[h.pointerId];
            }
          );
        };
        m2.prototype.setDOMEvents = function() {
          u.prototype.setDOMEvents.call(this);
          (this.hasZoom || this.followTouchMove) && this.batchMSEvents(H);
        };
        return m2;
      }(e);
    });
    N(r, "parts/Legend.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function(q, e) {
      var r2 = e.addEvent, A = e.animObject, D = e.css, F = e.defined, K = e.discardElement, C = e.find, m = e.fireEvent, H = e.format, M = e.isNumber, w = e.merge, L = e.pick, x = e.relativeLength, p = e.setAnimation, u = e.stableSort, y = e.syncTimeout;
      e = e.wrap;
      var k = q.isFirefox, h = q.marginNames, d = q.win, t = function() {
        function b(b2, a) {
          this.allItems = [];
          this.contentGroup = this.box = void 0;
          this.display = false;
          this.group = void 0;
          this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
          this.options = {};
          this.padding = 0;
          this.pages = [];
          this.proximate = false;
          this.scrollGroup = void 0;
          this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
          this.chart = b2;
          this.init(b2, a);
        }
        b.prototype.init = function(b2, a) {
          this.chart = b2;
          this.setOptions(a);
          a.enabled && (this.render(), r2(this.chart, "endResize", function() {
            this.legend.positionCheckboxes();
          }), this.proximate ? this.unchartrender = r2(this.chart, "render", function() {
            this.legend.proximatePositions();
            this.legend.positionItems();
          }) : this.unchartrender && this.unchartrender());
        };
        b.prototype.setOptions = function(b2) {
          var a = L(b2.padding, 8);
          this.options = b2;
          this.chart.styledMode || (this.itemStyle = b2.itemStyle, this.itemHiddenStyle = w(this.itemStyle, b2.itemHiddenStyle));
          this.itemMarginTop = b2.itemMarginTop || 0;
          this.itemMarginBottom = b2.itemMarginBottom || 0;
          this.padding = a;
          this.initialItemY = a - 5;
          this.symbolWidth = L(b2.symbolWidth, 16);
          this.pages = [];
          this.proximate = "proximate" === b2.layout && !this.chart.inverted;
          this.baseline = void 0;
        };
        b.prototype.update = function(b2, a) {
          var f = this.chart;
          this.setOptions(w(true, this.options, b2));
          this.destroy();
          f.isDirtyLegend = f.isDirtyBox = true;
          L(a, true) && f.redraw();
          m(this, "afterUpdate");
        };
        b.prototype.colorizeItem = function(b2, a) {
          b2.legendGroup[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
          if (!this.chart.styledMode) {
            var f = this.options, d2 = b2.legendItem, h2 = b2.legendLine, k2 = b2.legendSymbol, n = this.itemHiddenStyle.color;
            f = a ? f.itemStyle.color : n;
            var t2 = a ? b2.color || n : n, p2 = b2.options && b2.options.marker, u2 = { fill: t2 };
            d2 && d2.css({ fill: f, color: f });
            h2 && h2.attr({ stroke: t2 });
            k2 && (p2 && k2.isMarker && (u2 = b2.pointAttribs(), a || (u2.stroke = u2.fill = n)), k2.attr(u2));
          }
          m(this, "afterColorizeItem", { item: b2, visible: a });
        };
        b.prototype.positionItems = function() {
          this.allItems.forEach(this.positionItem, this);
          this.chart.isResizing || this.positionCheckboxes();
        };
        b.prototype.positionItem = function(b2) {
          var a = this, f = this.options, d2 = f.symbolPadding, h2 = !f.rtl, k2 = b2._legendItemPos;
          f = k2[0];
          k2 = k2[1];
          var n = b2.checkbox, t2 = b2.legendGroup;
          t2 && t2.element && (d2 = { translateX: h2 ? f : this.legendWidth - f - 2 * d2 - 4, translateY: k2 }, h2 = function() {
            m(a, "afterPositionItem", { item: b2 });
          }, F(t2.translateY) ? t2.animate(d2, { complete: h2 }) : (t2.attr(d2), h2()));
          n && (n.x = f, n.y = k2);
        };
        b.prototype.destroyItem = function(b2) {
          var a = b2.checkbox;
          ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function(a2) {
            b2[a2] && (b2[a2] = b2[a2].destroy());
          });
          a && K(b2.checkbox);
        };
        b.prototype.destroy = function() {
          function b2(a) {
            this[a] && (this[a] = this[a].destroy());
          }
          this.getAllItems().forEach(function(a) {
            ["legendItem", "legendGroup"].forEach(b2, a);
          });
          "clipRect up down pager nav box title group".split(" ").forEach(b2, this);
          this.display = null;
        };
        b.prototype.positionCheckboxes = function() {
          var b2 = this.group && this.group.alignAttr, a = this.clipHeight || this.legendHeight, d2 = this.titleHeight;
          if (b2) {
            var h2 = b2.translateY;
            this.allItems.forEach(function(f) {
              var k2 = f.checkbox;
              if (k2) {
                var n = h2 + d2 + k2.y + (this.scrollOffset || 0) + 3;
                D(k2, { left: b2.translateX + f.checkboxOffset + k2.x - 20 + "px", top: n + "px", display: this.proximate || n > h2 - 6 && n < h2 + a - 6 ? "" : "none" });
              }
            }, this);
          }
        };
        b.prototype.renderTitle = function() {
          var b2 = this.options, a = this.padding, d2 = b2.title, h2 = 0;
          d2.text && (this.title || (this.title = this.chart.renderer.label(d2.text, a - 3, a - 4, null, null, null, b2.useHTML, null, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(d2.style), this.title.add(this.group)), d2.width || this.title.css({ width: this.maxLegendWidth + "px" }), b2 = this.title.getBBox(), h2 = b2.height, this.offsetWidth = b2.width, this.contentGroup.attr({ translateY: h2 }));
          this.titleHeight = h2;
        };
        b.prototype.setText = function(b2) {
          var a = this.options;
          b2.legendItem.attr({ text: a.labelFormat ? H(a.labelFormat, b2, this.chart) : a.labelFormatter.call(b2) });
        };
        b.prototype.renderItem = function(b2) {
          var a = this.chart, f = a.renderer, d2 = this.options, h2 = this.symbolWidth, k2 = d2.symbolPadding, n = this.itemStyle, t2 = this.itemHiddenStyle, p2 = "horizontal" === d2.layout ? L(d2.itemDistance, 20) : 0, u2 = !d2.rtl, l = b2.legendItem, g = !b2.series, c = !g && b2.series.drawLegendSymbol ? b2.series : b2, G = c.options;
          G = this.createCheckboxForItem && G && G.showCheckbox;
          p2 = h2 + k2 + p2 + (G ? 20 : 0);
          var m2 = d2.useHTML, e2 = b2.options.className;
          l || (b2.legendGroup = f.g("legend-item").addClass("highcharts-" + c.type + "-series highcharts-color-" + b2.colorIndex + (e2 ? " " + e2 : "") + (g ? " highcharts-series-" + b2.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), b2.legendItem = l = f.text("", u2 ? h2 + k2 : -k2, this.baseline || 0, m2), a.styledMode || l.css(w(b2.visible ? n : t2)), l.attr({ align: u2 ? "left" : "right", zIndex: 2 }).add(b2.legendGroup), this.baseline || (this.fontMetrics = f.fontMetrics(a.styledMode ? 12 : n.fontSize, l), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, l.attr("y", this.baseline)), this.symbolHeight = d2.symbolHeight || this.fontMetrics.f, c.drawLegendSymbol(this, b2), this.setItemEvents && this.setItemEvents(b2, l, m2));
          G && !b2.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(b2);
          this.colorizeItem(b2, b2.visible);
          !a.styledMode && n.width || l.css({ width: (d2.itemWidth || this.widthOption || a.spacingBox.width) - p2 + "px" });
          this.setText(b2);
          a = l.getBBox();
          b2.itemWidth = b2.checkboxOffset = d2.itemWidth || b2.legendItemWidth || a.width + p2;
          this.maxItemWidth = Math.max(this.maxItemWidth, b2.itemWidth);
          this.totalItemWidth += b2.itemWidth;
          this.itemHeight = b2.itemHeight = Math.round(b2.legendItemHeight || a.height || this.symbolHeight);
        };
        b.prototype.layoutItem = function(b2) {
          var a = this.options, d2 = this.padding, f = "horizontal" === a.layout, h2 = b2.itemHeight, k2 = this.itemMarginBottom, n = this.itemMarginTop, t2 = f ? L(a.itemDistance, 20) : 0, p2 = this.maxLegendWidth;
          a = a.alignColumns && this.totalItemWidth > p2 ? this.maxItemWidth : b2.itemWidth;
          f && this.itemX - d2 + a > p2 && (this.itemX = d2, this.lastLineHeight && (this.itemY += n + this.lastLineHeight + k2), this.lastLineHeight = 0);
          this.lastItemY = n + this.itemY + k2;
          this.lastLineHeight = Math.max(h2, this.lastLineHeight);
          b2._legendItemPos = [this.itemX, this.itemY];
          f ? this.itemX += a : (this.itemY += n + h2 + k2, this.lastLineHeight = h2);
          this.offsetWidth = this.widthOption || Math.max((f ? this.itemX - d2 - (b2.checkbox ? 0 : t2) : a) + d2, this.offsetWidth);
        };
        b.prototype.getAllItems = function() {
          var b2 = [];
          this.chart.series.forEach(function(a) {
            var d2 = a && a.options;
            a && L(d2.showInLegend, F(d2.linkedTo) ? false : void 0, true) && (b2 = b2.concat(a.legendItems || ("point" === d2.legendType ? a.data : a)));
          });
          m(this, "afterGetAllItems", { allItems: b2 });
          return b2;
        };
        b.prototype.getAlignment = function() {
          var b2 = this.options;
          return this.proximate ? b2.align.charAt(0) + "tv" : b2.floating ? "" : b2.align.charAt(0) + b2.verticalAlign.charAt(0) + b2.layout.charAt(0);
        };
        b.prototype.adjustMargins = function(b2, a) {
          var d2 = this.chart, f = this.options, k2 = this.getAlignment();
          k2 && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(t2, n) {
            t2.test(k2) && !F(b2[n]) && (d2[h[n]] = Math.max(d2[h[n]], d2.legend[(n + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][n] * f[n % 2 ? "x" : "y"] + L(f.margin, 12) + a[n] + (d2.titleOffset[n] || 0)));
          });
        };
        b.prototype.proximatePositions = function() {
          var b2 = this.chart, a = [], d2 = "left" === this.options.align;
          this.allItems.forEach(function(f) {
            var h2 = d2;
            if (f.yAxis && f.points) {
              f.xAxis.options.reversed && (h2 = !h2);
              var k2 = C(h2 ? f.points : f.points.slice(0).reverse(), function(a2) {
                return M(a2.plotY);
              });
              h2 = this.itemMarginTop + f.legendItem.getBBox().height + this.itemMarginBottom;
              var n = f.yAxis.top - b2.plotTop;
              f.visible ? (k2 = k2 ? k2.plotY : f.yAxis.height, k2 += n - 0.3 * h2) : k2 = n + f.yAxis.height;
              a.push({ target: k2, size: h2, item: f });
            }
          }, this);
          q.distribute(a, b2.plotHeight);
          a.forEach(function(a2) {
            a2.item._legendItemPos[1] = b2.plotTop - b2.spacing[0] + a2.pos;
          });
        };
        b.prototype.render = function() {
          var b2 = this.chart, a = b2.renderer, d2 = this.group, h2 = this.box, k2 = this.options, t2 = this.padding;
          this.itemX = t2;
          this.itemY = this.initialItemY;
          this.lastItemY = this.offsetWidth = 0;
          this.widthOption = x(k2.width, b2.spacingBox.width - t2);
          var n = b2.spacingBox.width - 2 * t2 - k2.x;
          -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (n /= 2);
          this.maxLegendWidth = this.widthOption || n;
          d2 || (this.group = d2 = a.g("legend").attr({ zIndex: 7 }).add(), this.contentGroup = a.g().attr({ zIndex: 1 }).add(d2), this.scrollGroup = a.g().add(this.contentGroup));
          this.renderTitle();
          var z = this.getAllItems();
          u(z, function(a2, b3) {
            return (a2.options && a2.options.legendIndex || 0) - (b3.options && b3.options.legendIndex || 0);
          });
          k2.reversed && z.reverse();
          this.allItems = z;
          this.display = n = !!z.length;
          this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
          z.forEach(this.renderItem, this);
          z.forEach(this.layoutItem, this);
          z = (this.widthOption || this.offsetWidth) + t2;
          var p2 = this.lastItemY + this.lastLineHeight + this.titleHeight;
          p2 = this.handleOverflow(p2);
          p2 += t2;
          h2 || (this.box = h2 = a.rect().addClass("highcharts-legend-box").attr({ r: k2.borderRadius }).add(d2), h2.isNew = true);
          b2.styledMode || h2.attr({ stroke: k2.borderColor, "stroke-width": k2.borderWidth || 0, fill: k2.backgroundColor || "none" }).shadow(k2.shadow);
          0 < z && 0 < p2 && (h2[h2.isNew ? "attr" : "animate"](h2.crisp.call({}, { x: 0, y: 0, width: z, height: p2 }, h2.strokeWidth())), h2.isNew = false);
          h2[n ? "show" : "hide"]();
          b2.styledMode && "none" === d2.getStyle("display") && (z = p2 = 0);
          this.legendWidth = z;
          this.legendHeight = p2;
          n && this.align();
          this.proximate || this.positionItems();
          m(this, "afterRender");
        };
        b.prototype.align = function(b2) {
          void 0 === b2 && (b2 = this.chart.spacingBox);
          var a = this.chart, d2 = this.options, f = b2.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0] ? f += a.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < a.titleOffset[2] && (f -= a.titleOffset[2]);
          f !== b2.y && (b2 = w(b2, { y: f }));
          this.group.align(w(d2, { width: this.legendWidth, height: this.legendHeight, verticalAlign: this.proximate ? "top" : d2.verticalAlign }), true, b2);
        };
        b.prototype.handleOverflow = function(b2) {
          var a = this, d2 = this.chart, f = d2.renderer, h2 = this.options, k2 = h2.y, n = this.padding;
          k2 = d2.spacingBox.height + ("top" === h2.verticalAlign ? -k2 : k2) - n;
          var t2 = h2.maxHeight, p2, u2 = this.clipRect, l = h2.navigation, g = L(l.animation, true), c = l.arrowSize || 12, G = this.nav, m2 = this.pages, e2, x2 = this.allItems, y2 = function(c2) {
            "number" === typeof c2 ? u2.attr({ height: c2 }) : u2 && (a.clipRect = u2.destroy(), a.contentGroup.clip());
            a.contentGroup.div && (a.contentGroup.div.style.clip = c2 ? "rect(" + n + "px,9999px," + (n + c2) + "px,0)" : "auto");
          }, q2 = function(b3) {
            a[b3] = f.circle(0, 0, 1.3 * c).translate(c / 2, c / 2).add(G);
            d2.styledMode || a[b3].attr("fill", "rgba(0,0,0,0.0001)");
            return a[b3];
          };
          "horizontal" !== h2.layout || "middle" === h2.verticalAlign || h2.floating || (k2 /= 2);
          t2 && (k2 = Math.min(k2, t2));
          m2.length = 0;
          b2 > k2 && false !== l.enabled ? (this.clipHeight = p2 = Math.max(k2 - 20 - this.titleHeight - n, 0), this.currentPage = L(this.currentPage, 1), this.fullHeight = b2, x2.forEach(function(a2, c2) {
            var b3 = a2._legendItemPos[1], g2 = Math.round(a2.legendItem.getBBox().height), l2 = m2.length;
            if (!l2 || b3 - m2[l2 - 1] > p2 && (e2 || b3) !== m2[l2 - 1])
              m2.push(e2 || b3), l2++;
            a2.pageIx = l2 - 1;
            e2 && (x2[c2 - 1].pageIx = l2 - 1);
            c2 === x2.length - 1 && b3 + g2 - m2[l2 - 1] > p2 && b3 !== e2 && (m2.push(b3), a2.pageIx = l2);
            b3 !== e2 && (e2 = b3);
          }), u2 || (u2 = a.clipRect = f.clipRect(
            0,
            n,
            9999,
            0
          ), a.contentGroup.clip(u2)), y2(p2), G || (this.nav = G = f.g().attr({ zIndex: 1 }).add(this.group), this.up = f.symbol("triangle", 0, 0, c, c).add(G), q2("upTracker").on("click", function() {
            a.scroll(-1, g);
          }), this.pager = f.text("", 15, 10).addClass("highcharts-legend-navigation"), d2.styledMode || this.pager.css(l.style), this.pager.add(G), this.down = f.symbol("triangle-down", 0, 0, c, c).add(G), q2("downTracker").on("click", function() {
            a.scroll(1, g);
          })), a.scroll(0), b2 = k2) : G && (y2(), this.nav = G.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0);
          return b2;
        };
        b.prototype.scroll = function(b2, a) {
          var d2 = this, f = this.chart, h2 = this.pages, k2 = h2.length, n = this.currentPage + b2;
          b2 = this.clipHeight;
          var t2 = this.options.navigation, u2 = this.pager, e2 = this.padding;
          n > k2 && (n = k2);
          0 < n && ("undefined" !== typeof a && p(a, f), this.nav.attr({ translateX: e2, translateY: b2 + this.padding + 7 + this.titleHeight, visibility: "visible" }), [this.up, this.upTracker].forEach(function(a2) {
            a2.attr({ "class": 1 === n ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
          }), u2.attr({ text: n + "/" + k2 }), [
            this.down,
            this.downTracker
          ].forEach(function(a2) {
            a2.attr({ x: 18 + this.pager.getBBox().width, "class": n === k2 ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
          }, this), f.styledMode || (this.up.attr({ fill: 1 === n ? t2.inactiveColor : t2.activeColor }), this.upTracker.css({ cursor: 1 === n ? "default" : "pointer" }), this.down.attr({ fill: n === k2 ? t2.inactiveColor : t2.activeColor }), this.downTracker.css({ cursor: n === k2 ? "default" : "pointer" })), this.scrollOffset = -h2[n - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = n, this.positionCheckboxes(), a = A(L(a, f.renderer.globalAnimation, true)), y(function() {
            m(d2, "afterScroll", { currentPage: n });
          }, a.duration || 0));
        };
        return b;
      }();
      (/Trident\/7\.0/.test(d.navigator && d.navigator.userAgent) || k) && e(t.prototype, "positionItem", function(b, d2) {
        var a = this, f = function() {
          d2._legendItemPos && b.call(a, d2);
        };
        f();
        a.bubbleLegend || setTimeout(f);
      });
      q.Legend = t;
      return q.Legend;
    });
    N(r, "parts/Chart.js", [
      r["parts/Axis.js"],
      r["parts/Globals.js"],
      r["parts/Legend.js"],
      r["parts/MSPointer.js"],
      r["parts/Options.js"],
      r["parts/Pointer.js"],
      r["parts/Time.js"],
      r["parts/Utilities.js"]
    ], function(q, e, r2, A, D, F, K, C) {
      var m = e.charts, H = e.doc, M = e.seriesTypes, w = e.win, L = D.defaultOptions, x = C.addEvent, p = C.animate, u = C.animObject, y = C.attr, k = C.createElement, h = C.css, d = C.defined, t = C.discardElement, b = C.erase, f = C.error, a = C.extend, v = C.find, E = C.fireEvent, J = C.getStyle, B = C.isArray, n = C.isFunction, z = C.isNumber, I = C.isObject, P = C.isString, l = C.merge, g = C.numberFormat, c = C.objectEach, G = C.pick, O = C.pInt, Q = C.relativeLength, aa = C.removeEvent, Z = C.setAnimation, ba = C.splat, Y = C.syncTimeout, ca = C.uniqueKey, da = e.marginNames, T = function() {
        function D2(a2, c2, b2) {
          this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
          this.getArgs(a2, c2, b2);
        }
        D2.prototype.getArgs = function(a2, c2, b2) {
          P(a2) || a2.nodeName ? (this.renderTo = a2, this.init(c2, b2)) : this.init(a2, c2);
        };
        D2.prototype.init = function(a2, b2) {
          var d2, f2 = a2.series, h2 = a2.plotOptions || {};
          E(this, "init", { args: arguments }, function() {
            a2.series = null;
            d2 = l(L, a2);
            var k2 = d2.chart || {};
            c(d2.plotOptions, function(a3, c2) {
              I(a3) && (a3.tooltip = h2[c2] && l(h2[c2].tooltip) || void 0);
            });
            d2.tooltip.userOptions = a2.chart && a2.chart.forExport && a2.tooltip.userOptions || a2.tooltip;
            d2.series = a2.series = f2;
            this.userOptions = a2;
            var t2 = k2.events;
            this.margin = [];
            this.spacing = [];
            this.bounds = { h: {}, v: {} };
            this.labelCollectors = [];
            this.callback = b2;
            this.isResizing = 0;
            this.options = d2;
            this.axes = [];
            this.series = [];
            this.time = a2.time && Object.keys(a2.time).length ? new K(a2.time) : e.time;
            this.numberFormatter = k2.numberFormatter || g;
            this.styledMode = k2.styledMode;
            this.hasCartesianSeries = k2.showAxes;
            var v2 = this;
            v2.index = m.length;
            m.push(v2);
            e.chartCount++;
            t2 && c(t2, function(a3, c2) {
              n(a3) && x(v2, c2, a3);
            });
            v2.xAxis = [];
            v2.yAxis = [];
            v2.pointCount = v2.colorCounter = v2.symbolCounter = 0;
            E(v2, "afterInit");
            v2.firstRender();
          });
        };
        D2.prototype.initSeries = function(a2) {
          var c2 = this.options.chart;
          c2 = a2.type || c2.type || c2.defaultSeriesType;
          var b2 = M[c2];
          b2 || f(17, true, this, { missingModuleFor: c2 });
          c2 = new b2();
          c2.init(this, a2);
          return c2;
        };
        D2.prototype.setSeriesData = function() {
          this.getSeriesOrderByLinks().forEach(function(a2) {
            a2.points || a2.data || !a2.enabledDataSorting || a2.setData(a2.options.data, false);
          });
        };
        D2.prototype.getSeriesOrderByLinks = function() {
          return this.series.concat().sort(function(a2, c2) {
            return a2.linkedSeries.length || c2.linkedSeries.length ? c2.linkedSeries.length - a2.linkedSeries.length : 0;
          });
        };
        D2.prototype.orderSeries = function(a2) {
          var c2 = this.series;
          for (a2 = a2 || 0; a2 < c2.length; a2++)
            c2[a2] && (c2[a2].index = a2, c2[a2].name = c2[a2].getName());
        };
        D2.prototype.isInsidePlot = function(a2, c2, b2) {
          var g2 = b2 ? c2 : a2;
          a2 = b2 ? a2 : c2;
          g2 = { x: g2, y: a2, isInsidePlot: 0 <= g2 && g2 <= this.plotWidth && 0 <= a2 && a2 <= this.plotHeight };
          E(this, "afterIsInsidePlot", g2);
          return g2.isInsidePlot;
        };
        D2.prototype.redraw = function(c2) {
          E(this, "beforeRedraw");
          var b2 = this, g2 = b2.axes, l2 = b2.series, d2 = b2.pointer, f2 = b2.legend, n2 = b2.userOptions.legend, h2 = b2.isDirtyLegend, k2 = b2.hasCartesianSeries, t2 = b2.isDirtyBox, v2 = b2.renderer, z2 = v2.isHidden(), p2 = [];
          b2.setResponsive && b2.setResponsive(false);
          Z(b2.hasRendered ? c2 : false, b2);
          z2 && b2.temporaryDisplay();
          b2.layOutTitles();
          for (c2 = l2.length; c2--; ) {
            var u2 = l2[c2];
            if (u2.options.stacking) {
              var G2 = true;
              if (u2.isDirty) {
                var m2 = true;
                break;
              }
            }
          }
          if (m2)
            for (c2 = l2.length; c2--; )
              u2 = l2[c2], u2.options.stacking && (u2.isDirty = true);
          l2.forEach(function(a2) {
            a2.isDirty && ("point" === a2.options.legendType ? (a2.updateTotals && a2.updateTotals(), h2 = true) : n2 && (n2.labelFormatter || n2.labelFormat) && (h2 = true));
            a2.isDirtyData && E(a2, "updatedData");
          });
          h2 && f2 && f2.options.enabled && (f2.render(), b2.isDirtyLegend = false);
          G2 && b2.getStacks();
          k2 && g2.forEach(function(a2) {
            b2.isResizing && a2.tickPositions || (a2.updateNames(), a2.setScale());
          });
          b2.getMargins();
          k2 && (g2.forEach(function(a2) {
            a2.isDirty && (t2 = true);
          }), g2.forEach(function(c3) {
            var b3 = c3.min + "," + c3.max;
            c3.extKey !== b3 && (c3.extKey = b3, p2.push(function() {
              E(c3, "afterSetExtremes", a(c3.eventArgs, c3.getExtremes()));
              delete c3.eventArgs;
            }));
            (t2 || G2) && c3.redraw();
          }));
          t2 && b2.drawChartBox();
          E(b2, "predraw");
          l2.forEach(function(a2) {
            (t2 || a2.isDirty) && a2.visible && a2.redraw();
            a2.isDirtyData = false;
          });
          d2 && d2.reset(true);
          v2.draw();
          E(b2, "redraw");
          E(b2, "render");
          z2 && b2.temporaryDisplay(true);
          p2.forEach(function(a2) {
            a2.call();
          });
        };
        D2.prototype.get = function(a2) {
          function c2(c3) {
            return c3.id === a2 || c3.options && c3.options.id === a2;
          }
          var b2 = this.series, g2;
          var l2 = v(this.axes, c2) || v(this.series, c2);
          for (g2 = 0; !l2 && g2 < b2.length; g2++)
            l2 = v(b2[g2].points || [], c2);
          return l2;
        };
        D2.prototype.getAxes = function() {
          var a2 = this, c2 = this.options, b2 = c2.xAxis = ba(c2.xAxis || {});
          c2 = c2.yAxis = ba(c2.yAxis || {});
          E(this, "getAxes");
          b2.forEach(function(a3, c3) {
            a3.index = c3;
            a3.isX = true;
          });
          c2.forEach(function(a3, c3) {
            a3.index = c3;
          });
          b2.concat(c2).forEach(function(c3) {
            new q(a2, c3);
          });
          E(this, "afterGetAxes");
        };
        D2.prototype.getSelectedPoints = function() {
          var a2 = [];
          this.series.forEach(function(c2) {
            a2 = a2.concat(c2.getPointsCollection().filter(function(a3) {
              return G(a3.selectedStaging, a3.selected);
            }));
          });
          return a2;
        };
        D2.prototype.getSelectedSeries = function() {
          return this.series.filter(function(a2) {
            return a2.selected;
          });
        };
        D2.prototype.setTitle = function(a2, c2, b2) {
          this.applyDescription("title", a2);
          this.applyDescription(
            "subtitle",
            c2
          );
          this.applyDescription("caption", void 0);
          this.layOutTitles(b2);
        };
        D2.prototype.applyDescription = function(a2, c2) {
          var b2 = this, g2 = "title" === a2 ? { color: "#333333", fontSize: this.options.isStock ? "16px" : "18px" } : { color: "#666666" };
          g2 = this.options[a2] = l(!this.styledMode && { style: g2 }, this.options[a2], c2);
          var d2 = this[a2];
          d2 && c2 && (this[a2] = d2 = d2.destroy());
          g2 && !d2 && (d2 = this.renderer.text(g2.text, 0, 0, g2.useHTML).attr({ align: g2.align, "class": "highcharts-" + a2, zIndex: g2.zIndex || 4 }).add(), d2.update = function(c3) {
            b2[{
              title: "setTitle",
              subtitle: "setSubtitle",
              caption: "setCaption"
            }[a2]](c3);
          }, this.styledMode || d2.css(g2.style), this[a2] = d2);
        };
        D2.prototype.layOutTitles = function(c2) {
          var b2 = [0, 0, 0], g2 = this.renderer, l2 = this.spacingBox;
          ["title", "subtitle", "caption"].forEach(function(c3) {
            var d3 = this[c3], f2 = this.options[c3], n2 = f2.verticalAlign || "top";
            c3 = "title" === c3 ? -3 : "top" === n2 ? b2[0] + 2 : 0;
            if (d3) {
              if (!this.styledMode)
                var h2 = f2.style.fontSize;
              h2 = g2.fontMetrics(h2, d3).b;
              d3.css({ width: (f2.width || l2.width + (f2.widthAdjust || 0)) + "px" });
              var k2 = Math.round(d3.getBBox(f2.useHTML).height);
              d3.align(a({ y: "bottom" === n2 ? h2 : c3 + h2, height: k2 }, f2), false, "spacingBox");
              f2.floating || ("top" === n2 ? b2[0] = Math.ceil(b2[0] + k2) : "bottom" === n2 && (b2[2] = Math.ceil(b2[2] + k2)));
            }
          }, this);
          b2[0] && "top" === (this.options.title.verticalAlign || "top") && (b2[0] += this.options.title.margin);
          b2[2] && "bottom" === this.options.caption.verticalAlign && (b2[2] += this.options.caption.margin);
          var d2 = !this.titleOffset || this.titleOffset.join(",") !== b2.join(",");
          this.titleOffset = b2;
          E(this, "afterLayOutTitles");
          !this.isDirtyBox && d2 && (this.isDirtyBox = this.isDirtyLegend = d2, this.hasRendered && G(c2, true) && this.isDirtyBox && this.redraw());
        };
        D2.prototype.getChartSize = function() {
          var a2 = this.options.chart, c2 = a2.width;
          a2 = a2.height;
          var b2 = this.renderTo;
          d(c2) || (this.containerWidth = J(b2, "width"));
          d(a2) || (this.containerHeight = J(b2, "height"));
          this.chartWidth = Math.max(0, c2 || this.containerWidth || 600);
          this.chartHeight = Math.max(0, Q(a2, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400));
        };
        D2.prototype.temporaryDisplay = function(a2) {
          var c2 = this.renderTo;
          if (a2)
            for (; c2 && c2.style; )
              c2.hcOrigStyle && (h(c2, c2.hcOrigStyle), delete c2.hcOrigStyle), c2.hcOrigDetached && (H.body.removeChild(c2), c2.hcOrigDetached = false), c2 = c2.parentNode;
          else
            for (; c2 && c2.style; ) {
              H.body.contains(c2) || c2.parentNode || (c2.hcOrigDetached = true, H.body.appendChild(c2));
              if ("none" === J(c2, "display", false) || c2.hcOricDetached)
                c2.hcOrigStyle = { display: c2.style.display, height: c2.style.height, overflow: c2.style.overflow }, a2 = { display: "block", overflow: "hidden" }, c2 !== this.renderTo && (a2.height = 0), h(c2, a2), c2.offsetWidth || c2.style.setProperty("display", "block", "important");
              c2 = c2.parentNode;
              if (c2 === H.body)
                break;
            }
        };
        D2.prototype.setClassName = function(a2) {
          this.container.className = "highcharts-container " + (a2 || "");
        };
        D2.prototype.getContainer = function() {
          var c2 = this.options, b2 = c2.chart;
          var g2 = this.renderTo;
          var l2 = ca(), d2, n2;
          g2 || (this.renderTo = g2 = b2.renderTo);
          P(g2) && (this.renderTo = g2 = H.getElementById(g2));
          g2 || f(13, true, this);
          var t2 = O(y(g2, "data-highcharts-chart"));
          z(t2) && m[t2] && m[t2].hasRendered && m[t2].destroy();
          y(g2, "data-highcharts-chart", this.index);
          g2.innerHTML = "";
          b2.skipClone || g2.offsetWidth || this.temporaryDisplay();
          this.getChartSize();
          t2 = this.chartWidth;
          var v2 = this.chartHeight;
          h(g2, { overflow: "hidden" });
          this.styledMode || (d2 = a({ position: "relative", overflow: "hidden", width: t2 + "px", height: v2 + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)", userSelect: "none" }, b2.style));
          this.container = g2 = k("div", { id: l2 }, d2, g2);
          this._cursor = g2.style.cursor;
          this.renderer = new (e[b2.renderer] || e.Renderer)(g2, t2, v2, null, b2.forExport, c2.exporting && c2.exporting.allowHTML, this.styledMode);
          Z(void 0, this);
          this.setClassName(b2.className);
          if (this.styledMode)
            for (n2 in c2.defs)
              this.renderer.definition(c2.defs[n2]);
          else
            this.renderer.setStyle(b2.style);
          this.renderer.chartIndex = this.index;
          E(this, "afterGetContainer");
        };
        D2.prototype.getMargins = function(a2) {
          var c2 = this.spacing, b2 = this.margin, g2 = this.titleOffset;
          this.resetMargins();
          g2[0] && !d(b2[0]) && (this.plotTop = Math.max(this.plotTop, g2[0] + c2[0]));
          g2[2] && !d(b2[2]) && (this.marginBottom = Math.max(this.marginBottom, g2[2] + c2[2]));
          this.legend && this.legend.display && this.legend.adjustMargins(b2, c2);
          E(this, "getMargins");
          a2 || this.getAxisMargins();
        };
        D2.prototype.getAxisMargins = function() {
          var a2 = this, c2 = a2.axisOffset = [0, 0, 0, 0], b2 = a2.colorAxis, g2 = a2.margin, l2 = function(a3) {
            a3.forEach(function(a4) {
              a4.visible && a4.getOffset();
            });
          };
          a2.hasCartesianSeries ? l2(a2.axes) : b2 && b2.length && l2(b2);
          da.forEach(function(b3, l3) {
            d(g2[l3]) || (a2[b3] += c2[l3]);
          });
          a2.setChartSize();
        };
        D2.prototype.reflow = function(a2) {
          var c2 = this, b2 = c2.options.chart, g2 = c2.renderTo, l2 = d(b2.width) && d(b2.height), f2 = b2.width || J(g2, "width");
          b2 = b2.height || J(g2, "height");
          g2 = a2 ? a2.target : w;
          if (!l2 && !c2.isPrinting && f2 && b2 && (g2 === w || g2 === H)) {
            if (f2 !== c2.containerWidth || b2 !== c2.containerHeight)
              C.clearTimeout(c2.reflowTimeout), c2.reflowTimeout = Y(function() {
                c2.container && c2.setSize(void 0, void 0, false);
              }, a2 ? 100 : 0);
            c2.containerWidth = f2;
            c2.containerHeight = b2;
          }
        };
        D2.prototype.setReflow = function(a2) {
          var c2 = this;
          false === a2 || this.unbindReflow ? false === a2 && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = x(w, "resize", function(a3) {
            c2.options && c2.reflow(a3);
          }), x(this, "destroy", this.unbindReflow));
        };
        D2.prototype.setSize = function(a2, c2, b2) {
          var g2 = this, l2 = g2.renderer;
          g2.isResizing += 1;
          Z(b2, g2);
          b2 = l2.globalAnimation;
          g2.oldChartHeight = g2.chartHeight;
          g2.oldChartWidth = g2.chartWidth;
          "undefined" !== typeof a2 && (g2.options.chart.width = a2);
          "undefined" !== typeof c2 && (g2.options.chart.height = c2);
          g2.getChartSize();
          g2.styledMode || (b2 ? p : h)(g2.container, { width: g2.chartWidth + "px", height: g2.chartHeight + "px" }, b2);
          g2.setChartSize(true);
          l2.setSize(g2.chartWidth, g2.chartHeight, b2);
          g2.axes.forEach(function(a3) {
            a3.isDirty = true;
            a3.setScale();
          });
          g2.isDirtyLegend = true;
          g2.isDirtyBox = true;
          g2.layOutTitles();
          g2.getMargins();
          g2.redraw(b2);
          g2.oldChartHeight = null;
          E(g2, "resize");
          Y(function() {
            g2 && E(g2, "endResize", null, function() {
              --g2.isResizing;
            });
          }, u(b2).duration || 0);
        };
        D2.prototype.setChartSize = function(a2) {
          var c2 = this.inverted, b2 = this.renderer, g2 = this.chartWidth, l2 = this.chartHeight, d2 = this.options.chart, f2 = this.spacing, n2 = this.clipOffset, h2, k2, t2, v2;
          this.plotLeft = h2 = Math.round(this.plotLeft);
          this.plotTop = k2 = Math.round(this.plotTop);
          this.plotWidth = t2 = Math.max(0, Math.round(g2 - h2 - this.marginRight));
          this.plotHeight = v2 = Math.max(0, Math.round(l2 - k2 - this.marginBottom));
          this.plotSizeX = c2 ? v2 : t2;
          this.plotSizeY = c2 ? t2 : v2;
          this.plotBorderWidth = d2.plotBorderWidth || 0;
          this.spacingBox = b2.spacingBox = { x: f2[3], y: f2[0], width: g2 - f2[3] - f2[1], height: l2 - f2[0] - f2[2] };
          this.plotBox = b2.plotBox = { x: h2, y: k2, width: t2, height: v2 };
          g2 = 2 * Math.floor(this.plotBorderWidth / 2);
          c2 = Math.ceil(Math.max(g2, n2[3]) / 2);
          b2 = Math.ceil(Math.max(g2, n2[0]) / 2);
          this.clipBox = { x: c2, y: b2, width: Math.floor(this.plotSizeX - Math.max(g2, n2[1]) / 2 - c2), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(g2, n2[2]) / 2 - b2)) };
          a2 || this.axes.forEach(function(a3) {
            a3.setAxisSize();
            a3.setAxisTranslation();
          });
          E(this, "afterSetChartSize", { skipAxes: a2 });
        };
        D2.prototype.resetMargins = function() {
          E(this, "resetMargins");
          var a2 = this, c2 = a2.options.chart;
          ["margin", "spacing"].forEach(function(b2) {
            var g2 = c2[b2], l2 = I(g2) ? g2 : [g2, g2, g2, g2];
            ["Top", "Right", "Bottom", "Left"].forEach(function(g3, d2) {
              a2[b2][d2] = G(c2[b2 + g3], l2[d2]);
            });
          });
          da.forEach(function(c3, b2) {
            a2[c3] = G(a2.margin[b2], a2.spacing[b2]);
          });
          a2.axisOffset = [0, 0, 0, 0];
          a2.clipOffset = [0, 0, 0, 0];
        };
        D2.prototype.drawChartBox = function() {
          var a2 = this.options.chart, c2 = this.renderer, b2 = this.chartWidth, g2 = this.chartHeight, l2 = this.chartBackground, d2 = this.plotBackground, f2 = this.plotBorder, n2 = this.styledMode, h2 = this.plotBGImage, k2 = a2.backgroundColor, t2 = a2.plotBackgroundColor, v2 = a2.plotBackgroundImage, z2, p2 = this.plotLeft, u2 = this.plotTop, G2 = this.plotWidth, m2 = this.plotHeight, I2 = this.plotBox, B2 = this.clipRect, e2 = this.clipBox, x2 = "animate";
          l2 || (this.chartBackground = l2 = c2.rect().addClass("highcharts-background").add(), x2 = "attr");
          if (n2)
            var y2 = z2 = l2.strokeWidth();
          else {
            y2 = a2.borderWidth || 0;
            z2 = y2 + (a2.shadow ? 8 : 0);
            k2 = { fill: k2 || "none" };
            if (y2 || l2["stroke-width"])
              k2.stroke = a2.borderColor, k2["stroke-width"] = y2;
            l2.attr(k2).shadow(a2.shadow);
          }
          l2[x2]({ x: z2 / 2, y: z2 / 2, width: b2 - z2 - y2 % 2, height: g2 - z2 - y2 % 2, r: a2.borderRadius });
          x2 = "animate";
          d2 || (x2 = "attr", this.plotBackground = d2 = c2.rect().addClass("highcharts-plot-background").add());
          d2[x2](I2);
          n2 || (d2.attr({ fill: t2 || "none" }).shadow(a2.plotShadow), v2 && (h2 ? (v2 !== h2.attr("href") && h2.attr("href", v2), h2.animate(I2)) : this.plotBGImage = c2.image(v2, p2, u2, G2, m2).add()));
          B2 ? B2.animate({ width: e2.width, height: e2.height }) : this.clipRect = c2.clipRect(e2);
          x2 = "animate";
          f2 || (x2 = "attr", this.plotBorder = f2 = c2.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add());
          n2 || f2.attr({ stroke: a2.plotBorderColor, "stroke-width": a2.plotBorderWidth || 0, fill: "none" });
          f2[x2](f2.crisp({ x: p2, y: u2, width: G2, height: m2 }, -f2.strokeWidth()));
          this.isDirtyBox = false;
          E(this, "afterDrawChartBox");
        };
        D2.prototype.propFromSeries = function() {
          var a2 = this, c2 = a2.options.chart, b2, g2 = a2.options.series, l2, d2;
          ["inverted", "angular", "polar"].forEach(function(f2) {
            b2 = M[c2.type || c2.defaultSeriesType];
            d2 = c2[f2] || b2 && b2.prototype[f2];
            for (l2 = g2 && g2.length; !d2 && l2--; )
              (b2 = M[g2[l2].type]) && b2.prototype[f2] && (d2 = true);
            a2[f2] = d2;
          });
        };
        D2.prototype.linkSeries = function() {
          var a2 = this, c2 = a2.series;
          c2.forEach(function(a3) {
            a3.linkedSeries.length = 0;
          });
          c2.forEach(function(c3) {
            var b2 = c3.options.linkedTo;
            P(b2) && (b2 = ":previous" === b2 ? a2.series[c3.index - 1] : a2.get(b2)) && b2.linkedParent !== c3 && (b2.linkedSeries.push(c3), c3.linkedParent = b2, b2.enabledDataSorting && c3.setDataSortingOptions(), c3.visible = G(c3.options.visible, b2.options.visible, c3.visible));
          });
          E(this, "afterLinkSeries");
        };
        D2.prototype.renderSeries = function() {
          this.series.forEach(function(a2) {
            a2.translate();
            a2.render();
          });
        };
        D2.prototype.renderLabels = function() {
          var c2 = this, b2 = c2.options.labels;
          b2.items && b2.items.forEach(function(g2) {
            var l2 = a(b2.style, g2.style), d2 = O(l2.left) + c2.plotLeft, f2 = O(l2.top) + c2.plotTop + 12;
            delete l2.left;
            delete l2.top;
            c2.renderer.text(g2.html, d2, f2).attr({ zIndex: 2 }).css(l2).add();
          });
        };
        D2.prototype.render = function() {
          var a2 = this.axes, c2 = this.colorAxis, b2 = this.renderer, g2 = this.options, l2 = 0, d2 = function(a3) {
            a3.forEach(function(a4) {
              a4.visible && a4.render();
            });
          };
          this.setTitle();
          this.legend = new r2(this, g2.legend);
          this.getStacks && this.getStacks();
          this.getMargins(true);
          this.setChartSize();
          g2 = this.plotWidth;
          a2.some(function(a3) {
            if (a3.horiz && a3.visible && a3.options.labels.enabled && a3.series.length)
              return l2 = 21, true;
          });
          var f2 = this.plotHeight = Math.max(this.plotHeight - l2, 0);
          a2.forEach(function(a3) {
            a3.setScale();
          });
          this.getAxisMargins();
          var n2 = 1.1 < g2 / this.plotWidth;
          var h2 = 1.05 < f2 / this.plotHeight;
          if (n2 || h2)
            a2.forEach(function(a3) {
              (a3.horiz && n2 || !a3.horiz && h2) && a3.setTickInterval(true);
            }), this.getMargins();
          this.drawChartBox();
          this.hasCartesianSeries ? d2(a2) : c2 && c2.length && d2(c2);
          this.seriesGroup || (this.seriesGroup = b2.g("series-group").attr({ zIndex: 3 }).add());
          this.renderSeries();
          this.renderLabels();
          this.addCredits();
          this.setResponsive && this.setResponsive();
          this.updateContainerScaling();
          this.hasRendered = true;
        };
        D2.prototype.addCredits = function(a2) {
          var c2 = this, b2 = l(true, this.options.credits, a2);
          b2.enabled && !this.credits && (this.credits = this.renderer.text(b2.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
            b2.href && (w.location.href = b2.href);
          }).attr({
            align: b2.position.align,
            zIndex: 8
          }), c2.styledMode || this.credits.css(b2.style), this.credits.add().align(b2.position), this.credits.update = function(a3) {
            c2.credits = c2.credits.destroy();
            c2.addCredits(a3);
          });
        };
        D2.prototype.updateContainerScaling = function() {
          var a2 = this.container;
          if (2 < a2.offsetWidth && 2 < a2.offsetHeight && a2.getBoundingClientRect) {
            var c2 = a2.getBoundingClientRect(), b2 = c2.width / a2.offsetWidth;
            a2 = c2.height / a2.offsetHeight;
            1 !== b2 || 1 !== a2 ? this.containerScaling = { scaleX: b2, scaleY: a2 } : delete this.containerScaling;
          }
        };
        D2.prototype.destroy = function() {
          var a2 = this, g2 = a2.axes, l2 = a2.series, d2 = a2.container, f2, n2 = d2 && d2.parentNode;
          E(a2, "destroy");
          a2.renderer.forExport ? b(m, a2) : m[a2.index] = void 0;
          e.chartCount--;
          a2.renderTo.removeAttribute("data-highcharts-chart");
          aa(a2);
          for (f2 = g2.length; f2--; )
            g2[f2] = g2[f2].destroy();
          this.scroller && this.scroller.destroy && this.scroller.destroy();
          for (f2 = l2.length; f2--; )
            l2[f2] = l2[f2].destroy();
          "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(c2) {
            var b2 = a2[c2];
            b2 && b2.destroy && (a2[c2] = b2.destroy());
          });
          d2 && (d2.innerHTML = "", aa(d2), n2 && t(d2));
          c(a2, function(c2, b2) {
            delete a2[b2];
          });
        };
        D2.prototype.firstRender = function() {
          var a2 = this, c2 = a2.options;
          if (!a2.isReadyToRender || a2.isReadyToRender()) {
            a2.getContainer();
            a2.resetMargins();
            a2.setChartSize();
            a2.propFromSeries();
            a2.getAxes();
            (B(c2.series) ? c2.series : []).forEach(function(c3) {
              a2.initSeries(c3);
            });
            a2.linkSeries();
            a2.setSeriesData();
            E(a2, "beforeRender");
            F && (a2.pointer = e.hasTouch || !w.PointerEvent && !w.MSPointerEvent ? new F(a2, c2) : new A(a2, c2));
            a2.render();
            if (!a2.renderer.imgCount && !a2.hasLoaded)
              a2.onload();
            a2.temporaryDisplay(true);
          }
        };
        D2.prototype.onload = function() {
          this.callbacks.concat([this.callback]).forEach(function(a2) {
            a2 && "undefined" !== typeof this.index && a2.apply(this, [this]);
          }, this);
          E(this, "load");
          E(this, "render");
          d(this.index) && this.setReflow(this.options.chart.reflow);
          this.hasLoaded = true;
        };
        return D2;
      }();
      T.prototype.callbacks = [];
      e.chart = function(a2, c2, b2) {
        return new T(a2, c2, b2);
      };
      return e.Chart = T;
    });
    N(r, "parts/ScrollablePlotArea.js", [
      r["parts/Chart.js"],
      r["parts/Globals.js"],
      r["parts/Utilities.js"]
    ], function(q, e, r2) {
      var A = r2.addEvent, D = r2.createElement, F = r2.pick, K = r2.stop;
      A(q, "afterSetChartSize", function(q2) {
        var m = this.options.chart.scrollablePlotArea, r3 = m && m.minWidth;
        m = m && m.minHeight;
        if (!this.renderer.forExport) {
          if (r3) {
            if (this.scrollablePixelsX = r3 = Math.max(0, r3 - this.chartWidth)) {
              this.plotWidth += r3;
              this.inverted ? (this.clipBox.height += r3, this.plotBox.height += r3) : (this.clipBox.width += r3, this.plotBox.width += r3);
              var C = { 1: { name: "right", value: r3 } };
            }
          } else
            m && (this.scrollablePixelsY = r3 = Math.max(
              0,
              m - this.chartHeight
            )) && (this.plotHeight += r3, this.inverted ? (this.clipBox.width += r3, this.plotBox.width += r3) : (this.clipBox.height += r3, this.plotBox.height += r3), C = { 2: { name: "bottom", value: r3 } });
          C && !q2.skipAxes && this.axes.forEach(function(m2) {
            C[m2.side] ? m2.getPlotLinePath = function() {
              var q3 = C[m2.side].name, x = this[q3];
              this[q3] = x - C[m2.side].value;
              var p = e.Axis.prototype.getPlotLinePath.apply(this, arguments);
              this[q3] = x;
              return p;
            } : (m2.setAxisSize(), m2.setAxisTranslation());
          });
        }
      });
      A(q, "render", function() {
        this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed();
      });
      q.prototype.setUpScrolling = function() {
        var e2 = this, m = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" };
        this.scrollablePixelsX && (m.overflowX = "auto");
        this.scrollablePixelsY && (m.overflowY = "auto");
        this.scrollingContainer = D("div", { className: "highcharts-scrolling" }, m, this.renderTo);
        A(this.scrollingContainer, "scroll", function() {
          e2.pointer && delete e2.pointer.chartPosition;
        });
        this.innerContainer = D("div", { className: "highcharts-inner-container" }, null, this.scrollingContainer);
        this.innerContainer.appendChild(this.container);
        this.setUpScrolling = null;
      };
      q.prototype.moveFixedElements = function() {
        var e2 = this.container, m = this.fixedRenderer, q2 = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "), r3;
        this.scrollablePixelsX && !this.inverted ? r3 = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? r3 = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? r3 = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (r3 = ".highcharts-yaxis");
        q2.push(r3, r3 + "-labels");
        q2.forEach(function(q3) {
          [].forEach.call(e2.querySelectorAll(q3), function(e3) {
            (e3.namespaceURI === m.SVG_NS ? m.box : m.box.parentNode).appendChild(e3);
            e3.style.pointerEvents = "auto";
          });
        });
      };
      q.prototype.applyFixed = function() {
        var q2, m, r3 = !this.fixedDiv, M = this.options.chart.scrollablePlotArea;
        r3 ? (this.fixedDiv = D("div", { className: "highcharts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: 2 }, null, true), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow = "visible", this.fixedRenderer = m = new e.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight, null === (q2 = this.options.chart) || void 0 === q2 ? void 0 : q2.style), this.scrollableMask = m.path().attr({
          fill: this.options.chart.backgroundColor || "#fff",
          "fill-opacity": F(M.opacity, 0.85),
          zIndex: -1
        }).addClass("highcharts-scrollable-mask").add(), this.moveFixedElements(), A(this, "afterShowResetZoom", this.moveFixedElements), A(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
        q2 = this.chartWidth + (this.scrollablePixelsX || 0);
        m = this.chartHeight + (this.scrollablePixelsY || 0);
        K(this.container);
        this.container.style.width = q2 + "px";
        this.container.style.height = m + "px";
        this.renderer.boxWrapper.attr({
          width: q2,
          height: m,
          viewBox: [0, 0, q2, m].join(" ")
        });
        this.chartBackground.attr({ width: q2, height: m });
        this.scrollingContainer.style.height = this.chartHeight + "px";
        r3 && (M.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * M.scrollPositionX), M.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * M.scrollPositionY));
        m = this.axisOffset;
        r3 = this.plotTop - m[0] - 1;
        M = this.plotLeft - m[3] - 1;
        q2 = this.plotTop + this.plotHeight + m[2] + 1;
        m = this.plotLeft + this.plotWidth + m[1] + 1;
        var w = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0), L = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
        r3 = this.scrollablePixelsX ? [["M", 0, r3], ["L", this.plotLeft - 1, r3], ["L", this.plotLeft - 1, q2], ["L", 0, q2], ["Z"], ["M", w, r3], ["L", this.chartWidth, r3], ["L", this.chartWidth, q2], ["L", w, q2], ["Z"]] : this.scrollablePixelsY ? [["M", M, 0], ["L", M, this.plotTop - 1], ["L", m, this.plotTop - 1], ["L", m, 0], ["Z"], ["M", M, L], ["L", M, this.chartHeight], ["L", m, this.chartHeight], ["L", m, L], ["Z"]] : [["M", 0, 0]];
        "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({ d: r3 });
      };
    });
    N(r, "parts/StackingAxis.js", [r["parts/Utilities.js"]], function(q) {
      var e = q.addEvent, r2 = q.destroyObjectProperties, A = q.fireEvent, D = q.objectEach, F = q.pick, K = function() {
        function e2(m) {
          this.oldStacks = {};
          this.stacks = {};
          this.stacksTouched = 0;
          this.axis = m;
        }
        e2.prototype.buildStacks = function() {
          var m = this.axis, e3 = m.series, q2 = F(m.options.reversedStacks, true), r3 = e3.length, L;
          if (!m.isXAxis) {
            this.usePercentage = false;
            for (L = r3; L--; ) {
              var x = e3[q2 ? L : r3 - L - 1];
              x.setStackedPoints();
              x.setGroupedPoints();
            }
            for (L = 0; L < r3; L++)
              e3[L].modifyStacks();
            A(
              m,
              "afterBuildStacks"
            );
          }
        };
        e2.prototype.cleanStacks = function() {
          if (!this.axis.isXAxis) {
            if (this.oldStacks)
              var m = this.stacks = this.oldStacks;
            D(m, function(m2) {
              D(m2, function(m3) {
                m3.cumulative = m3.total;
              });
            });
          }
        };
        e2.prototype.resetStacks = function() {
          var m = this, e3 = m.stacks;
          m.axis.isXAxis || D(e3, function(e4) {
            D(e4, function(q2, r3) {
              q2.touched < m.stacksTouched ? (q2.destroy(), delete e4[r3]) : (q2.total = null, q2.cumulative = null);
            });
          });
        };
        e2.prototype.renderStackTotals = function() {
          var m = this.axis.chart, e3 = m.renderer, q2 = this.stacks, r3 = this.stackTotalGroup = this.stackTotalGroup || e3.g("stack-labels").attr({ visibility: "visible", zIndex: 6 }).add();
          r3.translate(m.plotLeft, m.plotTop);
          D(q2, function(m2) {
            D(m2, function(m3) {
              m3.render(r3);
            });
          });
        };
        return e2;
      }();
      return function() {
        function q2() {
        }
        q2.compose = function(m) {
          e(m, "init", q2.onInit);
          e(m, "destroy", q2.onDestroy);
        };
        q2.onDestroy = function() {
          var m = this.stacking;
          if (m) {
            var e2 = m.stacks;
            D(e2, function(m2, q3) {
              r2(m2);
              e2[q3] = null;
            });
            m && m.stackTotalGroup && m.stackTotalGroup.destroy();
          }
        };
        q2.onInit = function() {
          this.stacking || (this.stacking = new K(this));
        };
        return q2;
      }();
    });
    N(
      r,
      "mixins/legend-symbol.js",
      [r["parts/Globals.js"], r["parts/Utilities.js"]],
      function(q, e) {
        var r2 = e.merge, A = e.pick;
        q.LegendSymbolMixin = { drawRectangle: function(e2, q2) {
          var r3 = e2.symbolHeight, C = e2.options.squareSymbol;
          q2.legendSymbol = this.chart.renderer.rect(C ? (e2.symbolWidth - r3) / 2 : 0, e2.baseline - r3 + 1, C ? r3 : e2.symbolWidth, r3, A(e2.options.symbolRadius, r3 / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(q2.legendGroup);
        }, drawLineMarker: function(e2) {
          var q2 = this.options, D = q2.marker, C = e2.symbolWidth, m = e2.symbolHeight, H = m / 2, M = this.chart.renderer, w = this.legendGroup;
          e2 = e2.baseline - Math.round(0.3 * e2.fontMetrics.b);
          var L = {};
          this.chart.styledMode || (L = { "stroke-width": q2.lineWidth || 0 }, q2.dashStyle && (L.dashstyle = q2.dashStyle));
          this.legendLine = M.path(["M", 0, e2, "L", C, e2]).addClass("highcharts-graph").attr(L).add(w);
          D && false !== D.enabled && C && (q2 = Math.min(A(D.radius, H), H), 0 === this.symbol.indexOf("url") && (D = r2(D, { width: m, height: m }), q2 = 0), this.legendSymbol = D = M.symbol(this.symbol, C / 2 - q2, e2 - q2, 2 * q2, 2 * q2, D).addClass("highcharts-point").add(w), D.isMarker = true);
        } };
        return q.LegendSymbolMixin;
      }
    );
    N(
      r,
      "parts/Point.js",
      [r["parts/Globals.js"], r["parts/Utilities.js"]],
      function(q, e) {
        var r2 = e.animObject, A = e.defined, D = e.erase, F = e.extend, K = e.fireEvent, C = e.format, m = e.getNestedProperty, H = e.isArray, M = e.isNumber, w = e.isObject, L = e.syncTimeout, x = e.pick, p = e.removeEvent, u = e.uniqueKey;
        e = function() {
          function e2() {
            this.colorIndex = this.category = void 0;
            this.formatPrefix = "point";
            this.id = void 0;
            this.isNull = false;
            this.percentage = this.options = this.name = void 0;
            this.selected = false;
            this.total = this.series = void 0;
            this.visible = true;
            this.x = void 0;
          }
          e2.prototype.animateBeforeDestroy = function() {
            var k = this, h = { x: k.startXPos, opacity: 0 }, d, t = k.getGraphicalProps();
            t.singular.forEach(function(b) {
              d = "dataLabel" === b;
              k[b] = k[b].animate(d ? { x: k[b].startXPos, y: k[b].startYPos, opacity: 0 } : h);
            });
            t.plural.forEach(function(b) {
              k[b].forEach(function(b2) {
                b2.element && b2.animate(F({ x: k.startXPos }, b2.startYPos ? { x: b2.startXPos, y: b2.startYPos } : {}));
              });
            });
          };
          e2.prototype.applyOptions = function(k, h) {
            var d = this.series, t = d.options.pointValKey || d.pointValKey;
            k = e2.prototype.optionsToObject.call(this, k);
            F(this, k);
            this.options = this.options ? F(this.options, k) : k;
            k.group && delete this.group;
            k.dataLabels && delete this.dataLabels;
            t && (this.y = e2.prototype.getNestedProperty.call(this, t));
            this.formatPrefix = (this.isNull = x(this.isValid && !this.isValid(), null === this.x || !M(this.y))) ? "null" : "point";
            this.selected && (this.state = "select");
            "name" in this && "undefined" === typeof h && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
            "undefined" === typeof this.x && d && (this.x = "undefined" === typeof h ? d.autoIncrement(this) : h);
            return this;
          };
          e2.prototype.destroy = function() {
            function k() {
              if (h.graphic || h.dataLabel || h.dataLabels)
                p(h), h.destroyElements();
              for (a in h)
                h[a] = null;
            }
            var h = this, d = h.series, t = d.chart;
            d = d.options.dataSorting;
            var b = t.hoverPoints, f = r2(h.series.chart.renderer.globalAnimation), a;
            h.legendItem && t.legend.destroyItem(h);
            b && (h.setState(), D(b, h), b.length || (t.hoverPoints = null));
            if (h === t.hoverPoint)
              h.onMouseOut();
            d && d.enabled ? (this.animateBeforeDestroy(), L(k, f.duration)) : k();
            t.pointCount--;
          };
          e2.prototype.destroyElements = function(k) {
            var h = this;
            k = h.getGraphicalProps(k);
            k.singular.forEach(function(d) {
              h[d] = h[d].destroy();
            });
            k.plural.forEach(function(d) {
              h[d].forEach(function(d2) {
                d2.element && d2.destroy();
              });
              delete h[d];
            });
          };
          e2.prototype.firePointEvent = function(k, h, d) {
            var t = this, b = this.series.options;
            (b.point.events[k] || t.options && t.options.events && t.options.events[k]) && t.importEvents();
            "click" === k && b.allowPointSelect && (d = function(b2) {
              t.select && t.select(null, b2.ctrlKey || b2.metaKey || b2.shiftKey);
            });
            K(t, k, h, d);
          };
          e2.prototype.getClassName = function() {
            return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "");
          };
          e2.prototype.getGraphicalProps = function(k) {
            var h = this, d = [], t, b = { singular: [], plural: [] };
            k = k || { graphic: 1, dataLabel: 1 };
            k.graphic && d.push("graphic", "shadowGroup");
            k.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector");
            for (t = d.length; t--; ) {
              var f = d[t];
              h[f] && b.singular.push(f);
            }
            ["dataLabel", "connector"].forEach(function(a) {
              var d2 = a + "s";
              k[a] && h[d2] && b.plural.push(d2);
            });
            return b;
          };
          e2.prototype.getLabelConfig = function() {
            return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal };
          };
          e2.prototype.getNestedProperty = function(k) {
            if (k)
              return 0 === k.indexOf("custom.") ? m(k, this.options) : this[k];
          };
          e2.prototype.getZone = function() {
            var k = this.series, h = k.zones;
            k = k.zoneAxis || "y";
            var d = 0, t;
            for (t = h[d]; this[k] >= t.value; )
              t = h[++d];
            this.nonZonedColor || (this.nonZonedColor = this.color);
            this.color = t && t.color && !this.options.color ? t.color : this.nonZonedColor;
            return t;
          };
          e2.prototype.hasNewShapeType = function() {
            return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType;
          };
          e2.prototype.init = function(k, h, d) {
            this.series = k;
            this.applyOptions(
              h,
              d
            );
            this.id = A(this.id) ? this.id : u();
            this.resolveColor();
            k.chart.pointCount++;
            K(this, "afterInit");
            return this;
          };
          e2.prototype.optionsToObject = function(k) {
            var h = {}, d = this.series, t = d.options.keys, b = t || d.pointArrayMap || ["y"], f = b.length, a = 0, v = 0;
            if (M(k) || null === k)
              h[b[0]] = k;
            else if (H(k))
              for (!t && k.length > f && (d = typeof k[0], "string" === d ? h.name = k[0] : "number" === d && (h.x = k[0]), a++); v < f; )
                t && "undefined" === typeof k[a] || (0 < b[v].indexOf(".") ? e2.prototype.setNestedProperty(h, k[a], b[v]) : h[b[v]] = k[a]), a++, v++;
            else
              "object" === typeof k && (h = k, k.dataLabels && (d._hasPointLabels = true), k.marker && (d._hasPointMarkers = true));
            return h;
          };
          e2.prototype.resolveColor = function() {
            var k = this.series;
            var h = k.chart.options.chart.colorCount;
            var d = k.chart.styledMode;
            delete this.nonZonedColor;
            d || this.options.color || (this.color = k.color);
            k.options.colorByPoint ? (d || (h = k.options.colors || k.chart.options.colors, this.color = this.color || h[k.colorCounter], h = h.length), d = k.colorCounter, k.colorCounter++, k.colorCounter === h && (k.colorCounter = 0)) : d = k.colorIndex;
            this.colorIndex = x(this.colorIndex, d);
          };
          e2.prototype.setNestedProperty = function(k, h, d) {
            d.split(".").reduce(function(d2, b, f, a) {
              d2[b] = a.length - 1 === f ? h : w(d2[b], true) ? d2[b] : {};
              return d2[b];
            }, k);
            return k;
          };
          e2.prototype.tooltipFormatter = function(k) {
            var h = this.series, d = h.tooltipOptions, t = x(d.valueDecimals, ""), b = d.valuePrefix || "", f = d.valueSuffix || "";
            h.chart.styledMode && (k = h.chart.tooltip.styledModeFormat(k));
            (h.pointArrayMap || ["y"]).forEach(function(a) {
              a = "{point." + a;
              if (b || f)
                k = k.replace(RegExp(a + "}", "g"), b + a + "}" + f);
              k = k.replace(RegExp(a + "}", "g"), a + ":,." + t + "f}");
            });
            return C(k, { point: this, series: this.series }, h.chart);
          };
          return e2;
        }();
        return q.Point = e;
      }
    );
    N(r, "parts/Series.js", [r["parts/Globals.js"], r["mixins/legend-symbol.js"], r["parts/Options.js"], r["parts/Point.js"], r["parts/SVGElement.js"], r["parts/Utilities.js"]], function(q, e, r2, A, D, F) {
      var K = r2.defaultOptions, C = F.addEvent, m = F.animObject, H = F.arrayMax, M = F.arrayMin, w = F.clamp, L = F.correctFloat, x = F.defined, p = F.erase, u = F.error, y = F.extend, k = F.find, h = F.fireEvent, d = F.getNestedProperty, t = F.isArray, b = F.isFunction, f = F.isNumber, a = F.isString, v = F.merge, E = F.objectEach, J = F.pick, B = F.removeEvent;
      r2 = F.seriesType;
      var n = F.splat, z = F.syncTimeout;
      var I = q.seriesTypes, P = q.win;
      q.Series = r2("line", null, { lineWidth: 2, allowPointSelect: false, crisp: true, showCheckbox: false, animation: { duration: 1e3 }, events: {}, marker: { enabledThreshold: 2, lineColor: "#ffffff", lineWidth: 0, radius: 4, states: { normal: { animation: true }, hover: { animation: { duration: 50 }, enabled: true, radiusPlus: 2, lineWidthPlus: 1 }, select: {
        fillColor: "#cccccc",
        lineColor: "#000000",
        lineWidth: 2
      } } }, point: { events: {} }, dataLabels: { align: "center", formatter: function() {
        var a2 = this.series.chart.numberFormatter;
        return "number" !== typeof this.y ? "" : a2(this.y, -1);
      }, padding: 5, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 }, cropThreshold: 300, opacity: 1, pointRange: 0, softThreshold: true, states: {
        normal: { animation: true },
        hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: 0.25 } },
        select: { animation: { duration: 0 } },
        inactive: { animation: { duration: 50 }, opacity: 0.2 }
      }, stickyTracking: true, turboThreshold: 1e3, findNearestPointBy: "x" }, { axisTypes: ["xAxis", "yAxis"], coll: "series", colorCounter: 0, cropShoulder: 1, directTouch: false, eventsToUnbind: [], isCartesian: true, parallelArrays: ["x", "y"], pointClass: A, requireSorting: true, sorted: true, init: function(a2, g) {
        h(this, "init", { options: g });
        var c = this, l = a2.series, d2;
        this.eventOptions = this.eventOptions || {};
        c.chart = a2;
        c.options = g = c.setOptions(g);
        c.linkedSeries = [];
        c.bindAxes();
        y(c, { name: g.name, state: "", visible: false !== g.visible, selected: true === g.selected });
        var f2 = g.events;
        E(f2, function(a3, g2) {
          b(a3) && c.eventOptions[g2] !== a3 && (b(c.eventOptions[g2]) && B(c, g2, c.eventOptions[g2]), c.eventOptions[g2] = a3, C(c, g2, a3));
        });
        if (f2 && f2.click || g.point && g.point.events && g.point.events.click || g.allowPointSelect)
          a2.runTrackerClick = true;
        c.getColor();
        c.getSymbol();
        c.parallelArrays.forEach(function(a3) {
          c[a3 + "Data"] || (c[a3 + "Data"] = []);
        });
        c.isCartesian && (a2.hasCartesianSeries = true);
        l.length && (d2 = l[l.length - 1]);
        c._i = J(d2 && d2._i, -1) + 1;
        c.opacity = c.options.opacity;
        a2.orderSeries(this.insert(l));
        g.dataSorting && g.dataSorting.enabled ? c.setDataSortingOptions() : c.points || c.data || c.setData(g.data, false);
        h(this, "afterInit");
      }, is: function(a2) {
        return I[a2] && this instanceof I[a2];
      }, insert: function(a2) {
        var b2 = this.options.index, c;
        if (f(b2)) {
          for (c = a2.length; c--; )
            if (b2 >= J(a2[c].options.index, a2[c]._i)) {
              a2.splice(c + 1, 0, this);
              break;
            }
          -1 === c && a2.unshift(this);
          c += 1;
        } else
          a2.push(this);
        return J(c, a2.length - 1);
      }, bindAxes: function() {
        var a2 = this, b2 = a2.options, c = a2.chart, d2;
        h(this, "bindAxes", null, function() {
          (a2.axisTypes || []).forEach(function(g) {
            c[g].forEach(function(c2) {
              d2 = c2.options;
              if (b2[g] === d2.index || "undefined" !== typeof b2[g] && b2[g] === d2.id || "undefined" === typeof b2[g] && 0 === d2.index)
                a2.insert(c2.series), a2[g] = c2, c2.isDirty = true;
            });
            a2[g] || a2.optionalAxis === g || u(18, true, c);
          });
        });
        h(this, "afterBindAxes");
      }, updateParallelArrays: function(a2, b2) {
        var c = a2.series, g = arguments, l = f(b2) ? function(g2) {
          var l2 = "y" === g2 && c.toYData ? c.toYData(a2) : a2[g2];
          c[g2 + "Data"][b2] = l2;
        } : function(a3) {
          Array.prototype[b2].apply(c[a3 + "Data"], Array.prototype.slice.call(g, 2));
        };
        c.parallelArrays.forEach(l);
      }, hasData: function() {
        return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length;
      }, autoIncrement: function() {
        var a2 = this.options, b2 = this.xIncrement, c, d2 = a2.pointIntervalUnit, f2 = this.chart.time;
        b2 = J(b2, a2.pointStart, 0);
        this.pointInterval = c = J(this.pointInterval, a2.pointInterval, 1);
        d2 && (a2 = new f2.Date(b2), "day" === d2 ? f2.set("Date", a2, f2.get("Date", a2) + c) : "month" === d2 ? f2.set("Month", a2, f2.get("Month", a2) + c) : "year" === d2 && f2.set("FullYear", a2, f2.get("FullYear", a2) + c), c = a2.getTime() - b2);
        this.xIncrement = b2 + c;
        return b2;
      }, setDataSortingOptions: function() {
        var a2 = this.options;
        y(this, { requireSorting: false, sorted: false, enabledDataSorting: true, allowDG: false });
        x(a2.pointRange) || (a2.pointRange = 1);
      }, setOptions: function(a2) {
        var b2 = this.chart, c = b2.options, l = c.plotOptions, d2 = b2.userOptions || {};
        a2 = v(a2);
        b2 = b2.styledMode;
        var f2 = { plotOptions: l, userOptions: a2 };
        h(this, "setOptions", f2);
        var n2 = f2.plotOptions[this.type], k2 = d2.plotOptions || {};
        this.userOptions = f2.userOptions;
        d2 = v(n2, l.series, d2.plotOptions && d2.plotOptions[this.type], a2);
        this.tooltipOptions = v(K.tooltip, K.plotOptions.series && K.plotOptions.series.tooltip, K.plotOptions[this.type].tooltip, c.tooltip.userOptions, l.series && l.series.tooltip, l[this.type].tooltip, a2.tooltip);
        this.stickyTracking = J(a2.stickyTracking, k2[this.type] && k2[this.type].stickyTracking, k2.series && k2.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? true : d2.stickyTracking);
        null === n2.marker && delete d2.marker;
        this.zoneAxis = d2.zoneAxis;
        c = this.zones = (d2.zones || []).slice();
        !d2.negativeColor && !d2.negativeFillColor || d2.zones || (l = { value: d2[this.zoneAxis + "Threshold"] || d2.threshold || 0, className: "highcharts-negative" }, b2 || (l.color = d2.negativeColor, l.fillColor = d2.negativeFillColor), c.push(l));
        c.length && x(c[c.length - 1].value) && c.push(b2 ? {} : { color: this.color, fillColor: this.fillColor });
        h(this, "afterSetOptions", { options: d2 });
        return d2;
      }, getName: function() {
        return J(this.options.name, "Series " + (this.index + 1));
      }, getCyclic: function(a2, b2, c) {
        var g = this.chart, l = this.userOptions, d2 = a2 + "Index", f2 = a2 + "Counter", n2 = c ? c.length : J(
          g.options.chart[a2 + "Count"],
          g[a2 + "Count"]
        );
        if (!b2) {
          var h2 = J(l[d2], l["_" + d2]);
          x(h2) || (g.series.length || (g[f2] = 0), l["_" + d2] = h2 = g[f2] % n2, g[f2] += 1);
          c && (b2 = c[h2]);
        }
        "undefined" !== typeof h2 && (this[d2] = h2);
        this[a2] = b2;
      }, getColor: function() {
        this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || K.plotOptions[this.type].color, this.chart.options.colors);
      }, getPointsCollection: function() {
        return (this.hasGroupedData ? this.points : this.data) || [];
      }, getSymbol: function() {
        this.getCyclic(
          "symbol",
          this.options.marker.symbol,
          this.chart.options.symbols
        );
      }, findPointIndex: function(a2, b2) {
        var c = a2.id, g = a2.x, l = this.points, d2, n2 = this.options.dataSorting;
        if (c)
          var h2 = this.chart.get(c);
        else if (this.linkedParent || this.enabledDataSorting) {
          var t2 = n2 && n2.matchByName ? "name" : "index";
          h2 = k(l, function(c2) {
            return !c2.touched && c2[t2] === a2[t2];
          });
          if (!h2)
            return;
        }
        if (h2) {
          var v2 = h2 && h2.index;
          "undefined" !== typeof v2 && (d2 = true);
        }
        "undefined" === typeof v2 && f(g) && (v2 = this.xData.indexOf(g, b2));
        -1 !== v2 && "undefined" !== typeof v2 && this.cropped && (v2 = v2 >= this.cropStart ? v2 - this.cropStart : v2);
        !d2 && l[v2] && l[v2].touched && (v2 = void 0);
        return v2;
      }, drawLegendSymbol: e.drawLineMarker, updateData: function(a2, b2) {
        var c = this.options, g = c.dataSorting, l = this.points, d2 = [], n2, h2, k2, t2 = this.requireSorting, v2 = a2.length === l.length, z2 = true;
        this.xIncrement = null;
        a2.forEach(function(a3, b3) {
          var h3 = x(a3) && this.pointClass.prototype.optionsToObject.call({ series: this }, a3) || {};
          var z3 = h3.x;
          if (h3.id || f(z3)) {
            if (z3 = this.findPointIndex(h3, k2), -1 === z3 || "undefined" === typeof z3 ? d2.push(a3) : l[z3] && a3 !== c.data[z3] ? (l[z3].update(a3, false, null, false), l[z3].touched = true, t2 && (k2 = z3 + 1)) : l[z3] && (l[z3].touched = true), !v2 || b3 !== z3 || g && g.enabled || this.hasDerivedData)
              n2 = true;
          } else
            d2.push(a3);
        }, this);
        if (n2)
          for (a2 = l.length; a2--; )
            (h2 = l[a2]) && !h2.touched && h2.remove && h2.remove(false, b2);
        else
          !v2 || g && g.enabled ? z2 = false : (a2.forEach(function(a3, c2) {
            l[c2].update && a3 !== l[c2].y && l[c2].update(a3, false, null, false);
          }), d2.length = 0);
        l.forEach(function(a3) {
          a3 && (a3.touched = false);
        });
        if (!z2)
          return false;
        d2.forEach(function(a3) {
          this.addPoint(a3, false, null, null, false);
        }, this);
        null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = H(this.xData), this.autoIncrement());
        return true;
      }, setData: function(b2, g, c, d2) {
        var l = this, n2 = l.points, h2 = n2 && n2.length || 0, k2, v2 = l.options, z2 = l.chart, p2 = v2.dataSorting, m2 = null, e2 = l.xAxis;
        m2 = v2.turboThreshold;
        var I2 = this.xData, B2 = this.yData, E2 = (k2 = l.pointArrayMap) && k2.length, G = v2.keys, x2 = 0, y2 = 1, q2;
        b2 = b2 || [];
        k2 = b2.length;
        g = J(g, true);
        p2 && p2.enabled && (b2 = this.sortData(b2));
        false !== d2 && k2 && h2 && !l.cropped && !l.hasGroupedData && l.visible && !l.isSeriesBoosting && (q2 = this.updateData(b2, c));
        if (!q2) {
          l.xIncrement = null;
          l.colorCounter = 0;
          this.parallelArrays.forEach(function(a2) {
            l[a2 + "Data"].length = 0;
          });
          if (m2 && k2 > m2)
            if (m2 = l.getFirstValidPoint(b2), f(m2))
              for (c = 0; c < k2; c++)
                I2[c] = this.autoIncrement(), B2[c] = b2[c];
            else if (t(m2))
              if (E2)
                for (c = 0; c < k2; c++)
                  d2 = b2[c], I2[c] = d2[0], B2[c] = d2.slice(1, E2 + 1);
              else
                for (G && (x2 = G.indexOf("x"), y2 = G.indexOf("y"), x2 = 0 <= x2 ? x2 : 0, y2 = 0 <= y2 ? y2 : 1), c = 0; c < k2; c++)
                  d2 = b2[c], I2[c] = d2[x2], B2[c] = d2[y2];
            else
              u(12, false, z2);
          else
            for (c = 0; c < k2; c++)
              "undefined" !== typeof b2[c] && (d2 = { series: l }, l.pointClass.prototype.applyOptions.apply(d2, [b2[c]]), l.updateParallelArrays(d2, c));
          B2 && a(B2[0]) && u(14, true, z2);
          l.data = [];
          l.options.data = l.userOptions.data = b2;
          for (c = h2; c--; )
            n2[c] && n2[c].destroy && n2[c].destroy();
          e2 && (e2.minRange = e2.userMinRange);
          l.isDirty = z2.isDirtyBox = true;
          l.isDirtyData = !!n2;
          c = false;
        }
        "point" === v2.legendType && (this.processData(), this.generatePoints());
        g && z2.redraw(c);
      }, sortData: function(a2) {
        var b2 = this, c = b2.options.dataSorting.sortKey || "y", l = function(a3, c2) {
          return x(c2) && a3.pointClass.prototype.optionsToObject.call({ series: a3 }, c2) || {};
        };
        a2.forEach(function(c2, g) {
          a2[g] = l(b2, c2);
          a2[g].index = g;
        }, this);
        a2.concat().sort(function(a3, b3) {
          a3 = d(c, a3);
          b3 = d(c, b3);
          return b3 < a3 ? -1 : b3 > a3 ? 1 : 0;
        }).forEach(function(a3, c2) {
          a3.x = c2;
        }, this);
        b2.linkedSeries && b2.linkedSeries.forEach(function(c2) {
          var b3 = c2.options, g = b3.data;
          b3.dataSorting && b3.dataSorting.enabled || !g || (g.forEach(function(b4, d2) {
            g[d2] = l(c2, b4);
            a2[d2] && (g[d2].x = a2[d2].x, g[d2].index = d2);
          }), c2.setData(g, false));
        });
        return a2;
      }, getProcessedData: function(a2) {
        var b2 = this.xData, c = this.yData, l = b2.length;
        var d2 = 0;
        var f2 = this.xAxis, n2 = this.options;
        var h2 = n2.cropThreshold;
        var k2 = a2 || this.getExtremesFromAll || n2.getExtremesFromAll, t2 = this.isCartesian;
        a2 = f2 && f2.val2lin;
        n2 = !(!f2 || !f2.logarithmic);
        var v2 = this.requireSorting;
        if (f2) {
          f2 = f2.getExtremes();
          var z2 = f2.min;
          var p2 = f2.max;
        }
        if (t2 && this.sorted && !k2 && (!h2 || l > h2 || this.forceCrop)) {
          if (b2[l - 1] < z2 || b2[0] > p2)
            b2 = [], c = [];
          else if (this.yData && (b2[0] < z2 || b2[l - 1] > p2)) {
            d2 = this.cropData(this.xData, this.yData, z2, p2);
            b2 = d2.xData;
            c = d2.yData;
            d2 = d2.start;
            var m2 = true;
          }
        }
        for (h2 = b2.length || 1; --h2; )
          if (l = n2 ? a2(b2[h2]) - a2(b2[h2 - 1]) : b2[h2] - b2[h2 - 1], 0 < l && ("undefined" === typeof e2 || l < e2))
            var e2 = l;
          else
            0 > l && v2 && (u(15, false, this.chart), v2 = false);
        return { xData: b2, yData: c, cropped: m2, cropStart: d2, closestPointRange: e2 };
      }, processData: function(a2) {
        var b2 = this.xAxis;
        if (this.isCartesian && !this.isDirty && !b2.isDirty && !this.yAxis.isDirty && !a2)
          return false;
        a2 = this.getProcessedData();
        this.cropped = a2.cropped;
        this.cropStart = a2.cropStart;
        this.processedXData = a2.xData;
        this.processedYData = a2.yData;
        this.closestPointRange = this.basePointRange = a2.closestPointRange;
      }, cropData: function(a2, b2, c, d2, f2) {
        var g = a2.length, l = 0, n2 = g, h2;
        f2 = J(f2, this.cropShoulder);
        for (h2 = 0; h2 < g; h2++)
          if (a2[h2] >= c) {
            l = Math.max(0, h2 - f2);
            break;
          }
        for (c = h2; c < g; c++)
          if (a2[c] > d2) {
            n2 = c + f2;
            break;
          }
        return {
          xData: a2.slice(l, n2),
          yData: b2.slice(l, n2),
          start: l,
          end: n2
        };
      }, generatePoints: function() {
        var a2 = this.options, b2 = a2.data, c = this.data, d2, f2 = this.processedXData, k2 = this.processedYData, t2 = this.pointClass, v2 = f2.length, z2 = this.cropStart || 0, p2 = this.hasGroupedData;
        a2 = a2.keys;
        var m2 = [], u2;
        c || p2 || (c = [], c.length = b2.length, c = this.data = c);
        a2 && p2 && (this.options.keys = false);
        for (u2 = 0; u2 < v2; u2++) {
          var e2 = z2 + u2;
          if (p2) {
            var B2 = new t2().init(this, [f2[u2]].concat(n(k2[u2])));
            B2.dataGroup = this.groupMap[u2];
            B2.dataGroup.options && (B2.options = B2.dataGroup.options, y(B2, B2.dataGroup.options), delete B2.dataLabels);
          } else
            (B2 = c[e2]) || "undefined" === typeof b2[e2] || (c[e2] = B2 = new t2().init(this, b2[e2], f2[u2]));
          B2 && (B2.index = e2, m2[u2] = B2);
        }
        this.options.keys = a2;
        if (c && (v2 !== (d2 = c.length) || p2))
          for (u2 = 0; u2 < d2; u2++)
            u2 !== z2 || p2 || (u2 += v2), c[u2] && (c[u2].destroyElements(), c[u2].plotX = void 0);
        this.data = c;
        this.points = m2;
        h(this, "afterGeneratePoints");
      }, getXExtremes: function(a2) {
        return { min: M(a2), max: H(a2) };
      }, getExtremes: function(a2, b2) {
        var c = this.xAxis, g = this.yAxis, l = this.processedXData || this.xData, d2 = [], n2 = 0, k2 = 0;
        var v2 = 0;
        var z2 = this.requireSorting ? this.cropShoulder : 0, p2 = g ? g.positiveValuesOnly : false, u2;
        a2 = a2 || this.stackedYData || this.processedYData || [];
        g = a2.length;
        c && (v2 = c.getExtremes(), k2 = v2.min, v2 = v2.max);
        for (u2 = 0; u2 < g; u2++) {
          var m2 = l[u2];
          var e2 = a2[u2];
          var B2 = (f(e2) || t(e2)) && (e2.length || 0 < e2 || !p2);
          m2 = b2 || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !c || (l[u2 + z2] || m2) >= k2 && (l[u2 - z2] || m2) <= v2;
          if (B2 && m2)
            if (B2 = e2.length)
              for (; B2--; )
                f(e2[B2]) && (d2[n2++] = e2[B2]);
            else
              d2[n2++] = e2;
        }
        a2 = { dataMin: M(d2), dataMax: H(d2) };
        h(this, "afterGetExtremes", { dataExtremes: a2 });
        return a2;
      }, applyExtremes: function() {
        var a2 = this.getExtremes();
        this.dataMin = a2.dataMin;
        this.dataMax = a2.dataMax;
        return a2;
      }, getFirstValidPoint: function(a2) {
        for (var b2 = null, c = a2.length, l = 0; null === b2 && l < c; )
          b2 = a2[l], l++;
        return b2;
      }, translate: function() {
        this.processedXData || this.processData();
        this.generatePoints();
        var a2 = this.options, b2 = a2.stacking, c = this.xAxis, d2 = c.categories, n2 = this.enabledDataSorting, k2 = this.yAxis, v2 = this.points, z2 = v2.length, p2 = !!this.modifyValue, u2, e2 = this.pointPlacementToXValue(), m2 = !!e2, B2 = a2.threshold, I2 = a2.startFromThreshold ? B2 : 0, E2, y2 = this.zoneAxis || "y", q2 = Number.MAX_VALUE;
        for (u2 = 0; u2 < z2; u2++) {
          var r3 = v2[u2], P2 = r3.x, C2 = r3.y, A2 = r3.low, D2 = b2 && k2.stacking && k2.stacking.stacks[(this.negStacks && C2 < (I2 ? 0 : B2) ? "-" : "") + this.stackKey];
          k2.positiveValuesOnly && null !== C2 && 0 >= C2 && (r3.isNull = true);
          r3.plotX = E2 = L(w(c.translate(P2, 0, 0, 0, 1, e2, "flags" === this.type), -1e5, 1e5));
          if (b2 && this.visible && D2 && D2[P2]) {
            var H2 = this.getStackIndicator(H2, P2, this.index);
            if (!r3.isNull) {
              var F2 = D2[P2];
              var K2 = F2.points[H2.key];
            }
          }
          t(K2) && (A2 = K2[0], C2 = K2[1], A2 === I2 && H2.key === D2[P2].base && (A2 = J(f(B2) && B2, k2.min)), k2.positiveValuesOnly && 0 >= A2 && (A2 = null), r3.total = r3.stackTotal = F2.total, r3.percentage = F2.total && r3.y / F2.total * 100, r3.stackY = C2, this.irregularWidths || F2.setOffset(this.pointXOffset || 0, this.barW || 0));
          r3.yBottom = x(A2) ? w(k2.translate(A2, 0, 1, 0, 1), -1e5, 1e5) : null;
          p2 && (C2 = this.modifyValue(C2, r3));
          r3.plotY = "number" === typeof C2 && Infinity !== C2 ? w(k2.translate(C2, 0, 1, 0, 1), -1e5, 1e5) : void 0;
          r3.isInside = this.isPointInside(r3);
          r3.clientX = m2 ? L(c.translate(P2, 0, 0, 0, 1, e2)) : E2;
          r3.negative = r3[y2] < (a2[y2 + "Threshold"] || B2 || 0);
          r3.category = d2 && "undefined" !== typeof d2[r3.x] ? d2[r3.x] : r3.x;
          if (!r3.isNull && false !== r3.visible) {
            "undefined" !== typeof M2 && (q2 = Math.min(q2, Math.abs(E2 - M2)));
            var M2 = E2;
          }
          r3.zone = this.zones.length && r3.getZone();
          !r3.graphic && this.group && n2 && (r3.isNew = true);
        }
        this.closestPointRangePx = q2;
        h(this, "afterTranslate");
      }, getValidPoints: function(a2, b2, c) {
        var g = this.chart;
        return (a2 || this.points || []).filter(function(a3) {
          return b2 && !g.isInsidePlot(a3.plotX, a3.plotY, g.inverted) ? false : false !== a3.visible && (c || !a3.isNull);
        });
      }, getClipBox: function(a2, b2) {
        var c = this.options, g = this.chart, d2 = g.inverted, l = this.xAxis, f2 = l && this.yAxis, n2 = g.options.chart.scrollablePlotArea || {};
        a2 && false === c.clip && f2 ? a2 = d2 ? { y: -g.chartWidth + f2.len + f2.pos, height: g.chartWidth, width: g.chartHeight, x: -g.chartHeight + l.len + l.pos } : { y: -f2.pos, height: g.chartHeight, width: g.chartWidth, x: -l.pos } : (a2 = this.clipBox || g.clipBox, b2 && (a2.width = g.plotSizeX, a2.x = (g.scrollablePixelsX || 0) * (n2.scrollPositionX || 0)));
        return b2 ? { width: a2.width, x: a2.x } : a2;
      }, setClip: function(a2) {
        var b2 = this.chart, c = this.options, d2 = b2.renderer, l = b2.inverted, f2 = this.clipBox, n2 = this.getClipBox(a2), h2 = this.sharedClipKey || [
          "_sharedClip",
          a2 && a2.duration,
          a2 && a2.easing,
          n2.height,
          c.xAxis,
          c.yAxis
        ].join(), k2 = b2[h2], t2 = b2[h2 + "m"];
        a2 && (n2.width = 0, l && (n2.x = b2.plotHeight + (false !== c.clip ? 0 : b2.plotTop)));
        k2 ? b2.hasLoaded || k2.attr(n2) : (a2 && (b2[h2 + "m"] = t2 = d2.clipRect(l ? b2.plotSizeX + 99 : -99, l ? -b2.plotLeft : -b2.plotTop, 99, l ? b2.chartWidth : b2.chartHeight)), b2[h2] = k2 = d2.clipRect(n2), k2.count = { length: 0 });
        a2 && !k2.count[this.index] && (k2.count[this.index] = true, k2.count.length += 1);
        if (false !== c.clip || a2)
          this.group.clip(a2 || f2 ? k2 : b2.clipRect), this.markerGroup.clip(t2), this.sharedClipKey = h2;
        a2 || (k2.count[this.index] && (delete k2.count[this.index], --k2.count.length), 0 === k2.count.length && h2 && b2[h2] && (f2 || (b2[h2] = b2[h2].destroy()), b2[h2 + "m"] && (b2[h2 + "m"] = b2[h2 + "m"].destroy())));
      }, animate: function(a2) {
        var b2 = this.chart, c = m(this.options.animation);
        if (!b2.hasRendered)
          if (a2)
            this.setClip(c);
          else {
            var d2 = this.sharedClipKey;
            a2 = b2[d2];
            var l = this.getClipBox(c, true);
            a2 && a2.animate(l, c);
            b2[d2 + "m"] && b2[d2 + "m"].animate({ width: l.width + 99, x: l.x - (b2.inverted ? 0 : 99) }, c);
          }
      }, afterAnimate: function() {
        this.setClip();
        h(this, "afterAnimate");
        this.finishedAnimating = true;
      }, drawPoints: function() {
        var a2 = this.points, b2 = this.chart, c, d2, f2 = this.options.marker, n2 = this[this.specialGroup] || this.markerGroup, h2 = this.xAxis, k2 = J(f2.enabled, !h2 || h2.isRadial ? true : null, this.closestPointRangePx >= f2.enabledThreshold * f2.radius);
        if (false !== f2.enabled || this._hasPointMarkers)
          for (c = 0; c < a2.length; c++) {
            var t2 = a2[c];
            var v2 = (d2 = t2.graphic) ? "animate" : "attr";
            var z2 = t2.marker || {};
            var p2 = !!t2.marker;
            if ((k2 && "undefined" === typeof z2.enabled || z2.enabled) && !t2.isNull && false !== t2.visible) {
              var u2 = J(z2.symbol, this.symbol);
              var e2 = this.markerAttribs(t2, t2.selected && "select");
              this.enabledDataSorting && (t2.startXPos = h2.reversed ? -e2.width : h2.width);
              var m2 = false !== t2.isInside;
              d2 ? d2[m2 ? "show" : "hide"](m2).animate(e2) : m2 && (0 < e2.width || t2.hasImage) && (t2.graphic = d2 = b2.renderer.symbol(u2, e2.x, e2.y, e2.width, e2.height, p2 ? z2 : f2).add(n2), this.enabledDataSorting && b2.hasRendered && (d2.attr({ x: t2.startXPos }), v2 = "animate"));
              d2 && "animate" === v2 && d2[m2 ? "show" : "hide"](m2).animate(e2);
              if (d2 && !b2.styledMode)
                d2[v2](this.pointAttribs(t2, t2.selected && "select"));
              d2 && d2.addClass(t2.getClassName(), true);
            } else
              d2 && (t2.graphic = d2.destroy());
          }
      }, markerAttribs: function(a2, b2) {
        var c = this.options, g = c.marker, d2 = a2.marker || {}, l = d2.symbol || g.symbol, f2 = J(d2.radius, g.radius);
        b2 && (g = g.states[b2], b2 = d2.states && d2.states[b2], f2 = J(b2 && b2.radius, g && g.radius, f2 + (g && g.radiusPlus || 0)));
        a2.hasImage = l && 0 === l.indexOf("url");
        a2.hasImage && (f2 = 0);
        a2 = { x: c.crisp ? Math.floor(a2.plotX) - f2 : a2.plotX - f2, y: a2.plotY - f2 };
        f2 && (a2.width = a2.height = 2 * f2);
        return a2;
      }, pointAttribs: function(a2, b2) {
        var c = this.options.marker, g = a2 && a2.options, d2 = g && g.marker || {}, l = this.color, f2 = g && g.color, n2 = a2 && a2.color;
        g = J(d2.lineWidth, c.lineWidth);
        var h2 = a2 && a2.zone && a2.zone.color;
        a2 = 1;
        l = f2 || h2 || n2 || l;
        f2 = d2.fillColor || c.fillColor || l;
        l = d2.lineColor || c.lineColor || l;
        b2 = b2 || "normal";
        c = c.states[b2];
        b2 = d2.states && d2.states[b2] || {};
        g = J(b2.lineWidth, c.lineWidth, g + J(b2.lineWidthPlus, c.lineWidthPlus, 0));
        f2 = b2.fillColor || c.fillColor || f2;
        l = b2.lineColor || c.lineColor || l;
        a2 = J(b2.opacity, c.opacity, a2);
        return { stroke: l, "stroke-width": g, fill: f2, opacity: a2 };
      }, destroy: function(a2) {
        var b2 = this, c = b2.chart, d2 = /AppleWebKit\/533/.test(P.navigator.userAgent), l, f2, n2 = b2.data || [], k2, t2;
        h(b2, "destroy");
        this.removeEvents(a2);
        (b2.axisTypes || []).forEach(function(a3) {
          (t2 = b2[a3]) && t2.series && (p(t2.series, b2), t2.isDirty = t2.forceRedraw = true);
        });
        b2.legendItem && b2.chart.legend.destroyItem(b2);
        for (f2 = n2.length; f2--; )
          (k2 = n2[f2]) && k2.destroy && k2.destroy();
        b2.points = null;
        F.clearTimeout(b2.animationTimeout);
        E(b2, function(a3, c2) {
          a3 instanceof D && !a3.survive && (l = d2 && "group" === c2 ? "hide" : "destroy", a3[l]());
        });
        c.hoverSeries === b2 && (c.hoverSeries = null);
        p(c.series, b2);
        c.orderSeries();
        E(b2, function(c2, g) {
          a2 && "hcEvents" === g || delete b2[g];
        });
      }, getGraphPath: function(a2, b2, c) {
        var g = this, d2 = g.options, l = d2.step, f2, n2 = [], h2 = [], k2;
        a2 = a2 || g.points;
        (f2 = a2.reversed) && a2.reverse();
        (l = { right: 1, center: 2 }[l] || l && 3) && f2 && (l = 4 - l);
        a2 = this.getValidPoints(a2, false, !(d2.connectNulls && !b2 && !c));
        a2.forEach(function(f3, t2) {
          var v2 = f3.plotX, z2 = f3.plotY, p2 = a2[t2 - 1];
          (f3.leftCliff || p2 && p2.rightCliff) && !c && (k2 = true);
          f3.isNull && !x(b2) && 0 < t2 ? k2 = !d2.connectNulls : f3.isNull && !b2 ? k2 = true : (0 === t2 || k2 ? t2 = [["M", f3.plotX, f3.plotY]] : g.getPointSpline ? t2 = [g.getPointSpline(a2, f3, t2)] : l ? (t2 = 1 === l ? [["L", p2.plotX, z2]] : 2 === l ? [["L", (p2.plotX + v2) / 2, p2.plotY], ["L", (p2.plotX + v2) / 2, z2]] : [["L", v2, p2.plotY]], t2.push(["L", v2, z2])) : t2 = [[
            "L",
            v2,
            z2
          ]], h2.push(f3.x), l && (h2.push(f3.x), 2 === l && h2.push(f3.x)), n2.push.apply(n2, t2), k2 = false);
        });
        n2.xMap = h2;
        return g.graphPath = n2;
      }, drawGraph: function() {
        var a2 = this, b2 = this.options, c = (this.gappedPath || this.getGraphPath).call(this), d2 = this.chart.styledMode, f2 = [["graph", "highcharts-graph"]];
        d2 || f2[0].push(b2.lineColor || this.color || "#cccccc", b2.dashStyle);
        f2 = a2.getZonesGraphs(f2);
        f2.forEach(function(g, l) {
          var f3 = g[0], n2 = a2[f3], h2 = n2 ? "animate" : "attr";
          n2 ? (n2.endX = a2.preventGraphAnimation ? null : c.xMap, n2.animate({ d: c })) : c.length && (a2[f3] = n2 = a2.chart.renderer.path(c).addClass(g[1]).attr({ zIndex: 1 }).add(a2.group));
          n2 && !d2 && (f3 = { stroke: g[2], "stroke-width": b2.lineWidth, fill: a2.fillGraph && a2.color || "none" }, g[3] ? f3.dashstyle = g[3] : "square" !== b2.linecap && (f3["stroke-linecap"] = f3["stroke-linejoin"] = "round"), n2[h2](f3).shadow(2 > l && b2.shadow));
          n2 && (n2.startX = c.xMap, n2.isArea = c.isArea);
        });
      }, getZonesGraphs: function(a2) {
        this.zones.forEach(function(b2, c) {
          c = ["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b2.className || "")];
          this.chart.styledMode || c.push(b2.color || this.color, b2.dashStyle || this.options.dashStyle);
          a2.push(c);
        }, this);
        return a2;
      }, applyZones: function() {
        var a2 = this, b2 = this.chart, c = b2.renderer, d2 = this.zones, f2, n2, h2 = this.clips || [], k2, t2 = this.graph, v2 = this.area, z2 = Math.max(b2.chartWidth, b2.chartHeight), p2 = this[(this.zoneAxis || "y") + "Axis"], u2 = b2.inverted, e2, m2, B2, I2 = false, E2, x2;
        if (d2.length && (t2 || v2) && p2 && "undefined" !== typeof p2.min) {
          var y2 = p2.reversed;
          var q2 = p2.horiz;
          t2 && !this.showLine && t2.hide();
          v2 && v2.hide();
          var r3 = p2.getExtremes();
          d2.forEach(function(g, d3) {
            f2 = y2 ? q2 ? b2.plotWidth : 0 : q2 ? 0 : p2.toPixels(r3.min) || 0;
            f2 = w(J(n2, f2), 0, z2);
            n2 = w(Math.round(p2.toPixels(
              J(g.value, r3.max),
              true
            ) || 0), 0, z2);
            I2 && (f2 = n2 = p2.toPixels(r3.max));
            e2 = Math.abs(f2 - n2);
            m2 = Math.min(f2, n2);
            B2 = Math.max(f2, n2);
            p2.isXAxis ? (k2 = { x: u2 ? B2 : m2, y: 0, width: e2, height: z2 }, q2 || (k2.x = b2.plotHeight - k2.x)) : (k2 = { x: 0, y: u2 ? B2 : m2, width: z2, height: e2 }, q2 && (k2.y = b2.plotWidth - k2.y));
            u2 && c.isVML && (k2 = p2.isXAxis ? { x: 0, y: y2 ? m2 : B2, height: k2.width, width: b2.chartWidth } : { x: k2.y - b2.plotLeft - b2.spacingBox.x, y: 0, width: k2.height, height: b2.chartHeight });
            h2[d3] ? h2[d3].animate(k2) : h2[d3] = c.clipRect(k2);
            E2 = a2["zone-area-" + d3];
            x2 = a2["zone-graph-" + d3];
            t2 && x2 && x2.clip(h2[d3]);
            v2 && E2 && E2.clip(h2[d3]);
            I2 = g.value > r3.max;
            a2.resetZones && 0 === n2 && (n2 = void 0);
          });
          this.clips = h2;
        } else
          a2.visible && (t2 && t2.show(true), v2 && v2.show(true));
      }, invertGroups: function(a2) {
        function b2() {
          ["group", "markerGroup"].forEach(function(b3) {
            c[b3] && (d2.renderer.isVML && c[b3].attr({ width: c.yAxis.len, height: c.xAxis.len }), c[b3].width = c.yAxis.len, c[b3].height = c.xAxis.len, c[b3].invert(c.isRadialSeries ? false : a2));
          });
        }
        var c = this, d2 = c.chart;
        c.xAxis && (c.eventsToUnbind.push(C(d2, "resize", b2)), b2(), c.invertGroups = b2);
      }, plotGroup: function(a2, b2, c, d2, f2) {
        var g = this[a2], l = !g;
        c = { visibility: c, zIndex: d2 || 0.1 };
        "undefined" === typeof this.opacity || this.chart.styledMode || (c.opacity = this.opacity);
        l && (this[a2] = g = this.chart.renderer.g().add(f2));
        g.addClass("highcharts-" + b2 + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (x(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (g.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), true);
        g.attr(c)[l ? "attr" : "animate"](this.getPlotBox());
        return g;
      }, getPlotBox: function() {
        var a2 = this.chart, b2 = this.xAxis, c = this.yAxis;
        a2.inverted && (b2 = c, c = this.xAxis);
        return { translateX: b2 ? b2.left : a2.plotLeft, translateY: c ? c.top : a2.plotTop, scaleX: 1, scaleY: 1 };
      }, removeEvents: function(a2) {
        a2 ? this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function(a3) {
          a3();
        }), this.eventsToUnbind.length = 0) : B(this);
      }, render: function() {
        var a2 = this, b2 = a2.chart, c = a2.options, d2 = !a2.finishedAnimating && b2.renderer.isSVG && m(c.animation).duration, f2 = a2.visible ? "inherit" : "hidden", n2 = c.zIndex, k2 = a2.hasRendered, t2 = b2.seriesGroup, v2 = b2.inverted;
        h(this, "render");
        var p2 = a2.plotGroup(
          "group",
          "series",
          f2,
          n2,
          t2
        );
        a2.markerGroup = a2.plotGroup("markerGroup", "markers", f2, n2, t2);
        d2 && a2.animate && a2.animate(true);
        p2.inverted = a2.isCartesian || a2.invertable ? v2 : false;
        a2.drawGraph && (a2.drawGraph(), a2.applyZones());
        a2.visible && a2.drawPoints();
        a2.drawDataLabels && a2.drawDataLabels();
        a2.redrawPoints && a2.redrawPoints();
        a2.drawTracker && false !== a2.options.enableMouseTracking && a2.drawTracker();
        a2.invertGroups(v2);
        false === c.clip || a2.sharedClipKey || k2 || p2.clip(b2.clipRect);
        d2 && a2.animate && a2.animate();
        k2 || (a2.animationTimeout = z(
          function() {
            a2.afterAnimate();
          },
          d2 || 0
        ));
        a2.isDirty = false;
        a2.hasRendered = true;
        h(a2, "afterRender");
      }, redraw: function() {
        var a2 = this.chart, b2 = this.isDirty || this.isDirtyData, c = this.group, d2 = this.xAxis, f2 = this.yAxis;
        c && (a2.inverted && c.attr({ width: a2.plotWidth, height: a2.plotHeight }), c.animate({ translateX: J(d2 && d2.left, a2.plotLeft), translateY: J(f2 && f2.top, a2.plotTop) }));
        this.translate();
        this.render();
        b2 && delete this.kdTree;
      }, kdAxisArray: ["clientX", "plotY"], searchPoint: function(a2, b2) {
        var c = this.xAxis, g = this.yAxis, d2 = this.chart.inverted;
        return this.searchKDTree({ clientX: d2 ? c.len - a2.chartY + c.pos : a2.chartX - c.pos, plotY: d2 ? g.len - a2.chartX + g.pos : a2.chartY - g.pos }, b2, a2);
      }, buildKDTree: function(a2) {
        function b2(a3, g, d3) {
          var f2;
          if (f2 = a3 && a3.length) {
            var n2 = c.kdAxisArray[g % d3];
            a3.sort(function(a4, b3) {
              return a4[n2] - b3[n2];
            });
            f2 = Math.floor(f2 / 2);
            return { point: a3[f2], left: b2(a3.slice(0, f2), g + 1, d3), right: b2(a3.slice(f2 + 1), g + 1, d3) };
          }
        }
        this.buildingKdTree = true;
        var c = this, d2 = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
        delete c.kdTree;
        z(function() {
          c.kdTree = b2(c.getValidPoints(null, !c.directTouch), d2, d2);
          c.buildingKdTree = false;
        }, c.options.kdNow || a2 && "touchstart" === a2.type ? 0 : 1);
      }, searchKDTree: function(a2, b2, c) {
        function g(a3, b3, c2, h2) {
          var k2 = b3.point, t2 = d2.kdAxisArray[c2 % h2], v2 = k2;
          var z2 = x(a3[f2]) && x(k2[f2]) ? Math.pow(a3[f2] - k2[f2], 2) : null;
          var p2 = x(a3[n2]) && x(k2[n2]) ? Math.pow(a3[n2] - k2[n2], 2) : null;
          p2 = (z2 || 0) + (p2 || 0);
          k2.dist = x(p2) ? Math.sqrt(p2) : Number.MAX_VALUE;
          k2.distX = x(z2) ? Math.sqrt(z2) : Number.MAX_VALUE;
          t2 = a3[t2] - k2[t2];
          p2 = 0 > t2 ? "left" : "right";
          z2 = 0 > t2 ? "right" : "left";
          b3[p2] && (p2 = g(a3, b3[p2], c2 + 1, h2), v2 = p2[l] < v2[l] ? p2 : k2);
          b3[z2] && Math.sqrt(t2 * t2) < v2[l] && (a3 = g(a3, b3[z2], c2 + 1, h2), v2 = a3[l] < v2[l] ? a3 : v2);
          return v2;
        }
        var d2 = this, f2 = this.kdAxisArray[0], n2 = this.kdAxisArray[1], l = b2 ? "distX" : "dist";
        b2 = -1 < d2.options.findNearestPointBy.indexOf("y") ? 2 : 1;
        this.kdTree || this.buildingKdTree || this.buildKDTree(c);
        if (this.kdTree)
          return g(a2, this.kdTree, b2, b2);
      }, pointPlacementToXValue: function() {
        var a2 = this.options, b2 = a2.pointRange, c = this.xAxis;
        a2 = a2.pointPlacement;
        "between" === a2 && (a2 = c.reversed ? -0.5 : 0.5);
        return f(a2) ? a2 * J(b2, c.pointRange) : 0;
      }, isPointInside: function(a2) {
        return "undefined" !== typeof a2.plotY && "undefined" !== typeof a2.plotX && 0 <= a2.plotY && a2.plotY <= this.yAxis.len && 0 <= a2.plotX && a2.plotX <= this.xAxis.len;
      } });
    });
    N(r, "parts/Stacking.js", [r["parts/Axis.js"], r["parts/Chart.js"], r["parts/Globals.js"], r["parts/StackingAxis.js"], r["parts/Utilities.js"]], function(q, e, r2, A, D) {
      var F = D.correctFloat, K = D.defined, C = D.destroyObjectProperties, m = D.format, H = D.isNumber, M = D.pick;
      var w = r2.Series, L = function() {
        function e2(p, e3, m2, k, h) {
          var d = p.chart.inverted;
          this.axis = p;
          this.isNegative = m2;
          this.options = e3 = e3 || {};
          this.x = k;
          this.total = null;
          this.points = {};
          this.hasValidPoints = false;
          this.stack = h;
          this.rightCliff = this.leftCliff = 0;
          this.alignOptions = { align: e3.align || (d ? m2 ? "left" : "right" : "center"), verticalAlign: e3.verticalAlign || (d ? "middle" : m2 ? "bottom" : "top"), y: e3.y, x: e3.x };
          this.textAlign = e3.textAlign || (d ? m2 ? "right" : "left" : "center");
        }
        e2.prototype.destroy = function() {
          C(this, this.axis);
        };
        e2.prototype.render = function(p) {
          var e3 = this.axis.chart, x = this.options, k = x.format;
          k = k ? m(k, this, e3) : x.formatter.call(this);
          this.label ? this.label.attr({ text: k, visibility: "hidden" }) : (this.label = e3.renderer.label(
            k,
            null,
            null,
            x.shape,
            null,
            null,
            x.useHTML,
            false,
            "stack-labels"
          ), k = { r: x.borderRadius || 0, text: k, rotation: x.rotation, padding: M(x.padding, 5), visibility: "hidden" }, e3.styledMode || (k.fill = x.backgroundColor, k.stroke = x.borderColor, k["stroke-width"] = x.borderWidth, this.label.css(x.style)), this.label.attr(k), this.label.added || this.label.add(p));
          this.label.labelrank = e3.plotHeight;
        };
        e2.prototype.setOffset = function(p, e3, m2, k, h) {
          var d = this.axis, t = d.chart;
          k = d.translate(d.stacking.usePercentage ? 100 : k ? k : this.total, 0, 0, 0, 1);
          m2 = d.translate(m2 ? m2 : 0);
          m2 = K(k) && Math.abs(k - m2);
          p = M(h, t.xAxis[0].translate(this.x)) + p;
          d = K(k) && this.getStackBox(t, this, p, k, e3, m2, d);
          e3 = this.label;
          m2 = this.isNegative;
          p = "justify" === M(this.options.overflow, "justify");
          var b = this.textAlign;
          e3 && d && (h = e3.getBBox(), k = e3.padding, b = "left" === b ? t.inverted ? -k : k : "right" === b ? h.width : t.inverted && "center" === b ? h.width / 2 : t.inverted ? m2 ? h.width + k : -k : h.width / 2, m2 = t.inverted ? h.height / 2 : m2 ? -k : h.height, this.alignOptions.x = M(this.options.x, 0), this.alignOptions.y = M(this.options.y, 0), d.x -= b, d.y -= m2, e3.align(this.alignOptions, null, d), t.isInsidePlot(e3.alignAttr.x + b - this.alignOptions.x, e3.alignAttr.y + m2 - this.alignOptions.y) ? e3.show() : (e3.alignAttr.y = -9999, p = false), p && w.prototype.justifyDataLabel.call(this.axis, e3, this.alignOptions, e3.alignAttr, h, d), e3.attr({ x: e3.alignAttr.x, y: e3.alignAttr.y }), M(!p && this.options.crop, true) && ((t = H(e3.x) && H(e3.y) && t.isInsidePlot(e3.x - k + e3.width, e3.y) && t.isInsidePlot(e3.x + k, e3.y)) || e3.hide()));
        };
        e2.prototype.getStackBox = function(p, e3, m2, k, h, d, t) {
          var b = e3.axis.reversed, f = p.inverted, a = t.height + t.pos - (f ? p.plotLeft : p.plotTop);
          e3 = e3.isNegative && !b || !e3.isNegative && b;
          return { x: f ? e3 ? k - t.right : k - d + t.pos - p.plotLeft : m2 + p.xAxis[0].transB - p.plotLeft, y: f ? t.height - m2 - h : e3 ? a - k - d : a - k, width: f ? d : h, height: f ? h : d };
        };
        return e2;
      }();
      e.prototype.getStacks = function() {
        var e2 = this, p = e2.inverted;
        e2.yAxis.forEach(function(e3) {
          e3.stacking && e3.stacking.stacks && e3.hasVisibleSeries && (e3.stacking.oldStacks = e3.stacking.stacks);
        });
        e2.series.forEach(function(m2) {
          var u = m2.xAxis && m2.xAxis.options || {};
          !m2.options.stacking || true !== m2.visible && false !== e2.options.chart.ignoreHiddenSeries || (m2.stackKey = [m2.type, M(m2.options.stack, ""), p ? u.top : u.left, p ? u.height : u.width].join());
        });
      };
      A.compose(q);
      w.prototype.setGroupedPoints = function() {
        this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length && w.prototype.setStackedPoints.call(this, "group");
      };
      w.prototype.setStackedPoints = function(e2) {
        var p = e2 || this.options.stacking;
        if (p && (true === this.visible || false === this.chart.options.chart.ignoreHiddenSeries)) {
          var m2 = this.processedXData, x = this.processedYData, k = [], h = x.length, d = this.options, t = d.threshold, b = M(d.startFromThreshold && t, 0);
          d = d.stack;
          e2 = e2 ? this.type + "," + p : this.stackKey;
          var f = "-" + e2, a = this.negStacks, v = this.yAxis, E = v.stacking.stacks, q2 = v.stacking.oldStacks, B, n;
          v.stacking.stacksTouched += 1;
          for (n = 0; n < h; n++) {
            var z = m2[n];
            var I = x[n];
            var r3 = this.getStackIndicator(r3, z, this.index);
            var l = r3.key;
            var g = (B = a && I < (b ? 0 : t)) ? f : e2;
            E[g] || (E[g] = {});
            E[g][z] || (q2[g] && q2[g][z] ? (E[g][z] = q2[g][z], E[g][z].total = null) : E[g][z] = new L(v, v.options.stackLabels, B, z, d));
            g = E[g][z];
            null !== I ? (g.points[l] = g.points[this.index] = [M(g.cumulative, b)], K(g.cumulative) || (g.base = l), g.touched = v.stacking.stacksTouched, 0 < r3.index && false === this.singleStacks && (g.points[l][0] = g.points[this.index + "," + z + ",0"][0])) : g.points[l] = g.points[this.index] = null;
            "percent" === p ? (B = B ? e2 : f, a && E[B] && E[B][z] ? (B = E[B][z], g.total = B.total = Math.max(B.total, g.total) + Math.abs(I) || 0) : g.total = F(g.total + (Math.abs(I) || 0))) : "group" === p ? null !== I && (g.total = (g.total || 0) + 1) : g.total = F(g.total + (I || 0));
            g.cumulative = "group" === p ? (g.total || 1) - 1 : M(g.cumulative, b) + (I || 0);
            null !== I && (g.points[l].push(g.cumulative), k[n] = g.cumulative, g.hasValidPoints = true);
          }
          "percent" === p && (v.stacking.usePercentage = true);
          "group" !== p && (this.stackedYData = k);
          v.stacking.oldStacks = {};
        }
      };
      w.prototype.modifyStacks = function() {
        var e2 = this, p = e2.stackKey, m2 = e2.yAxis.stacking.stacks, q2 = e2.processedXData, k, h = e2.options.stacking;
        e2[h + "Stacker"] && [p, "-" + p].forEach(function(d) {
          for (var t = q2.length, b, f; t--; )
            if (b = q2[t], k = e2.getStackIndicator(k, b, e2.index, d), f = (b = m2[d] && m2[d][b]) && b.points[k.key])
              e2[h + "Stacker"](f, b, t);
        });
      };
      w.prototype.percentStacker = function(e2, p, m2) {
        p = p.total ? 100 / p.total : 0;
        e2[0] = F(e2[0] * p);
        e2[1] = F(e2[1] * p);
        this.stackedYData[m2] = e2[1];
      };
      w.prototype.getStackIndicator = function(e2, p, m2, q2) {
        !K(e2) || e2.x !== p || q2 && e2.key !== q2 ? e2 = { x: p, index: 0, key: q2 } : e2.index++;
        e2.key = [m2, p, e2.index].join();
        return e2;
      };
      r2.StackItem = L;
      return r2.StackItem;
    });
    N(r, "parts/Dynamics.js", [r["parts/Axis.js"], r["parts/Chart.js"], r["parts/Globals.js"], r["parts/Options.js"], r["parts/Point.js"], r["parts/Time.js"], r["parts/Utilities.js"]], function(q, e, r2, A, D, F, K) {
      var C = A.time, m = K.addEvent, H = K.animate, M = K.createElement, w = K.css, L = K.defined, x = K.erase, p = K.error, u = K.extend, y = K.fireEvent, k = K.isArray, h = K.isNumber, d = K.isObject, t = K.isString, b = K.merge, f = K.objectEach, a = K.pick, v = K.relativeLength, E = K.setAnimation, J = K.splat;
      A = r2.Series;
      var B = r2.seriesTypes;
      r2.cleanRecursively = function(a2, b2) {
        var n = {};
        f(a2, function(f2, l) {
          if (d(a2[l], true) && !a2.nodeType && b2[l])
            f2 = r2.cleanRecursively(a2[l], b2[l]), Object.keys(f2).length && (n[l] = f2);
          else if (d(a2[l]) || a2[l] !== b2[l])
            n[l] = a2[l];
        });
        return n;
      };
      u(e.prototype, {
        addSeries: function(b2, d2, f2) {
          var n, l = this;
          b2 && (d2 = a(d2, true), y(l, "addSeries", { options: b2 }, function() {
            n = l.initSeries(b2);
            l.isDirtyLegend = true;
            l.linkSeries();
            n.enabledDataSorting && n.setData(b2.data, false);
            y(l, "afterAddSeries", { series: n });
            d2 && l.redraw(f2);
          }));
          return n;
        },
        addAxis: function(a2, b2, d2, f2) {
          return this.createAxis(b2 ? "xAxis" : "yAxis", { axis: a2, redraw: d2, animation: f2 });
        },
        addColorAxis: function(a2, b2, d2) {
          return this.createAxis("colorAxis", { axis: a2, redraw: b2, animation: d2 });
        },
        createAxis: function(d2, f2) {
          var n = this.options, h2 = "colorAxis" === d2, l = f2.redraw, g = f2.animation;
          f2 = b(f2.axis, { index: this[d2].length, isX: "xAxis" === d2 });
          var c = h2 ? new r2.ColorAxis(this, f2) : new q(this, f2);
          n[d2] = J(n[d2] || {});
          n[d2].push(f2);
          h2 && (this.isDirtyLegend = true, this.axes.forEach(function(a2) {
            a2.series = [];
          }), this.series.forEach(function(a2) {
            a2.bindAxes();
            a2.isDirtyData = true;
          }));
          a(l, true) && this.redraw(g);
          return c;
        },
        showLoading: function(b2) {
          var d2 = this, f2 = d2.options, n = d2.loadingDiv, l = f2.loading, g = function() {
            n && w(n, { left: d2.plotLeft + "px", top: d2.plotTop + "px", width: d2.plotWidth + "px", height: d2.plotHeight + "px" });
          };
          n || (d2.loadingDiv = n = M("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, d2.container), d2.loadingSpan = M("span", { className: "highcharts-loading-inner" }, null, n), m(d2, "redraw", g));
          n.className = "highcharts-loading";
          d2.loadingSpan.innerHTML = a(b2, f2.lang.loading, "");
          d2.styledMode || (w(n, u(l.style, { zIndex: 10 })), w(d2.loadingSpan, l.labelStyle), d2.loadingShown || (w(n, { opacity: 0, display: "" }), H(n, { opacity: l.style.opacity || 0.5 }, { duration: l.showDuration || 0 })));
          d2.loadingShown = true;
          g();
        },
        hideLoading: function() {
          var a2 = this.options, b2 = this.loadingDiv;
          b2 && (b2.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || H(b2, { opacity: 0 }, { duration: a2.loading.hideDuration || 100, complete: function() {
            w(b2, { display: "none" });
          } }));
          this.loadingShown = false;
        },
        propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
        propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
        propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
        collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
        update: function(d2, k2, e2, p2) {
          var l = this, g = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }, c, n, m2, z = d2.isResponsiveOptions, B2 = [];
          y(l, "update", { options: d2 });
          z || l.setResponsive(false, true);
          d2 = r2.cleanRecursively(d2, l.options);
          b(true, l.userOptions, d2);
          if (c = d2.chart) {
            b(true, l.options.chart, c);
            "className" in c && l.setClassName(c.className);
            "reflow" in c && l.setReflow(c.reflow);
            if ("inverted" in c || "polar" in c || "type" in c) {
              l.propFromSeries();
              var u2 = true;
            }
            "alignTicks" in c && (u2 = true);
            f(c, function(a2, b2) {
              -1 !== l.propsRequireUpdateSeries.indexOf("chart." + b2) && (n = true);
              -1 !== l.propsRequireDirtyBox.indexOf(b2) && (l.isDirtyBox = true);
              -1 !== l.propsRequireReflow.indexOf(b2) && (z ? l.isDirtyBox = true : m2 = true);
            });
            !l.styledMode && "style" in c && l.renderer.setStyle(c.style);
          }
          !l.styledMode && d2.colors && (this.options.colors = d2.colors);
          d2.plotOptions && b(
            true,
            this.options.plotOptions,
            d2.plotOptions
          );
          d2.time && this.time === C && (this.time = new F(d2.time));
          f(d2, function(a2, b2) {
            if (l[b2] && "function" === typeof l[b2].update)
              l[b2].update(a2, false);
            else if ("function" === typeof l[g[b2]])
              l[g[b2]](a2);
            "chart" !== b2 && -1 !== l.propsRequireUpdateSeries.indexOf(b2) && (n = true);
          });
          this.collectionsWithUpdate.forEach(function(b2) {
            if (d2[b2]) {
              if ("series" === b2) {
                var c2 = [];
                l[b2].forEach(function(b3, g2) {
                  b3.options.isInternal || c2.push(a(b3.options.index, g2));
                });
              }
              J(d2[b2]).forEach(function(a2, g2) {
                var d3 = L(a2.id), f2;
                d3 && (f2 = l.get(a2.id));
                f2 || (f2 = l[b2][c2 ? c2[g2] : g2]) && d3 && L(f2.options.id) && (f2 = void 0);
                f2 && f2.coll === b2 && (f2.update(a2, false), e2 && (f2.touched = true));
                !f2 && e2 && l.collectionsWithInit[b2] && (l.collectionsWithInit[b2][0].apply(l, [a2].concat(l.collectionsWithInit[b2][1] || []).concat([false])).touched = true);
              });
              e2 && l[b2].forEach(function(a2) {
                a2.touched || a2.options.isInternal ? delete a2.touched : B2.push(a2);
              });
            }
          });
          B2.forEach(function(a2) {
            a2.remove && a2.remove(false);
          });
          u2 && l.axes.forEach(function(a2) {
            a2.update({}, false);
          });
          n && l.getSeriesOrderByLinks().forEach(function(a2) {
            a2.chart && a2.update({}, false);
          }, this);
          d2.loading && b(true, l.options.loading, d2.loading);
          u2 = c && c.width;
          c = c && c.height;
          t(c) && (c = v(c, u2 || l.chartWidth));
          m2 || h(u2) && u2 !== l.chartWidth || h(c) && c !== l.chartHeight ? l.setSize(u2, c, p2) : a(k2, true) && l.redraw(p2);
          y(l, "afterUpdate", { options: d2, redraw: k2, animation: p2 });
        },
        setSubtitle: function(a2, b2) {
          this.applyDescription("subtitle", a2);
          this.layOutTitles(b2);
        },
        setCaption: function(a2, b2) {
          this.applyDescription("caption", a2);
          this.layOutTitles(b2);
        }
      });
      e.prototype.collectionsWithInit = {
        xAxis: [e.prototype.addAxis, [true]],
        yAxis: [e.prototype.addAxis, [false]],
        series: [e.prototype.addSeries]
      };
      u(D.prototype, { update: function(b2, f2, h2, k2) {
        function l() {
          g.applyOptions(b2);
          var l2 = n && g.hasDummyGraphic;
          l2 = null === g.y ? !l2 : l2;
          n && l2 && (g.graphic = n.destroy(), delete g.hasDummyGraphic);
          d(b2, true) && (n && n.element && b2 && b2.marker && "undefined" !== typeof b2.marker.symbol && (g.graphic = n.destroy()), b2 && b2.dataLabels && g.dataLabel && (g.dataLabel = g.dataLabel.destroy()), g.connector && (g.connector = g.connector.destroy()));
          t2 = g.index;
          c.updateParallelArrays(g, t2);
          e2.data[t2] = d(e2.data[t2], true) || d(b2, true) ? g.options : a(b2, e2.data[t2]);
          c.isDirty = c.isDirtyData = true;
          !c.fixedBox && c.hasCartesianSeries && (v2.isDirtyBox = true);
          "point" === e2.legendType && (v2.isDirtyLegend = true);
          f2 && v2.redraw(h2);
        }
        var g = this, c = g.series, n = g.graphic, t2, v2 = c.chart, e2 = c.options;
        f2 = a(f2, true);
        false === k2 ? l() : g.firePointEvent("update", { options: b2 }, l);
      }, remove: function(a2, b2) {
        this.series.removePoint(this.series.data.indexOf(this), a2, b2);
      } });
      u(A.prototype, { addPoint: function(b2, d2, f2, h2, l) {
        var g = this.options, c = this.data, n = this.chart, k2 = this.xAxis;
        k2 = k2 && k2.hasNames && k2.names;
        var t2 = g.data, v2 = this.xData, e2;
        d2 = a(d2, true);
        var p2 = { series: this };
        this.pointClass.prototype.applyOptions.apply(p2, [b2]);
        var m2 = p2.x;
        var z = v2.length;
        if (this.requireSorting && m2 < v2[z - 1])
          for (e2 = true; z && v2[z - 1] > m2; )
            z--;
        this.updateParallelArrays(p2, "splice", z, 0, 0);
        this.updateParallelArrays(p2, z);
        k2 && p2.name && (k2[m2] = p2.name);
        t2.splice(z, 0, b2);
        e2 && (this.data.splice(z, 0, null), this.processData());
        "point" === g.legendType && this.generatePoints();
        f2 && (c[0] && c[0].remove ? c[0].remove(false) : (c.shift(), this.updateParallelArrays(p2, "shift"), t2.shift()));
        false !== l && y(
          this,
          "addPoint",
          { point: p2 }
        );
        this.isDirtyData = this.isDirty = true;
        d2 && n.redraw(h2);
      }, removePoint: function(b2, d2, f2) {
        var n = this, l = n.data, g = l[b2], c = n.points, h2 = n.chart, k2 = function() {
          c && c.length === l.length && c.splice(b2, 1);
          l.splice(b2, 1);
          n.options.data.splice(b2, 1);
          n.updateParallelArrays(g || { series: n }, "splice", b2, 1);
          g && g.destroy();
          n.isDirty = true;
          n.isDirtyData = true;
          d2 && h2.redraw();
        };
        E(f2, h2);
        d2 = a(d2, true);
        g ? g.firePointEvent("remove", null, k2) : k2();
      }, remove: function(b2, d2, f2, h2) {
        function l() {
          g.destroy(h2);
          g.remove = null;
          c.isDirtyLegend = c.isDirtyBox = true;
          c.linkSeries();
          a(b2, true) && c.redraw(d2);
        }
        var g = this, c = g.chart;
        false !== f2 ? y(g, "remove", null, l) : l();
      }, update: function(d2, f2) {
        d2 = r2.cleanRecursively(d2, this.userOptions);
        y(this, "update", { options: d2 });
        var n = this, h2 = n.chart, l = n.userOptions, g = n.initialType || n.type, c = d2.type || l.type || h2.options.chart.type, k2 = !(this.hasDerivedData || d2.dataGrouping || c && c !== this.type || "undefined" !== typeof d2.pointStart || d2.pointInterval || d2.pointIntervalUnit || d2.keys), t2 = B[g].prototype, v2, e2 = ["eventOptions", "navigatorSeries", "baseSeries"], m2 = n.finishedAnimating && { animation: false }, z = {};
        k2 && (e2.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), false !== d2.visible && e2.push("area", "graph"), n.parallelArrays.forEach(function(a2) {
          e2.push(a2 + "Data");
        }), d2.data && (d2.dataSorting && u(n.options.dataSorting, d2.dataSorting), this.setData(d2.data, false)));
        d2 = b(
          l,
          m2,
          { index: "undefined" === typeof l.index ? n.index : l.index, pointStart: a(l.pointStart, n.xData[0]) },
          !k2 && { data: n.options.data },
          d2
        );
        k2 && d2.data && (d2.data = n.options.data);
        e2 = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(e2);
        e2.forEach(function(a2) {
          e2[a2] = n[a2];
          delete n[a2];
        });
        n.remove(false, null, false, true);
        for (v2 in t2)
          n[v2] = void 0;
        B[c || g] ? u(n, B[c || g].prototype) : p(17, true, h2, { missingModuleFor: c || g });
        e2.forEach(function(a2) {
          n[a2] = e2[a2];
        });
        n.init(h2, d2);
        if (k2 && this.points) {
          var E2 = n.options;
          false === E2.visible ? (z.graphic = 1, z.dataLabel = 1) : n._hasPointLabels || (d2 = E2.marker, l = E2.dataLabels, d2 && (false === d2.enabled || "symbol" in d2) && (z.graphic = 1), l && false === l.enabled && (z.dataLabel = 1));
          this.points.forEach(function(a2) {
            a2 && a2.series && (a2.resolveColor(), Object.keys(z).length && a2.destroyElements(z), false === E2.showInLegend && a2.legendItem && h2.legend.destroyItem(a2));
          }, this);
        }
        n.initialType = g;
        h2.linkSeries();
        y(this, "afterUpdate");
        a(f2, true) && h2.redraw(k2 ? void 0 : false);
      }, setName: function(a2) {
        this.name = this.options.name = this.userOptions.name = a2;
        this.chart.isDirtyLegend = true;
      } });
      u(q.prototype, { update: function(d2, h2) {
        var n = this.chart, k2 = d2 && d2.events || {};
        d2 = b(this.userOptions, d2);
        n.options[this.coll].indexOf && (n.options[this.coll][n.options[this.coll].indexOf(this.userOptions)] = d2);
        f(n.options[this.coll].events, function(a2, b2) {
          "undefined" === typeof k2[b2] && (k2[b2] = void 0);
        });
        this.destroy(true);
        this.init(n, u(d2, { events: k2 }));
        n.isDirtyBox = true;
        a(h2, true) && n.redraw();
      }, remove: function(b2) {
        for (var d2 = this.chart, f2 = this.coll, n = this.series, l = n.length; l--; )
          n[l] && n[l].remove(false);
        x(d2.axes, this);
        x(d2[f2], this);
        k(d2.options[f2]) ? d2.options[f2].splice(this.options.index, 1) : delete d2.options[f2];
        d2[f2].forEach(function(a2, b3) {
          a2.options.index = a2.userOptions.index = b3;
        });
        this.destroy();
        d2.isDirtyBox = true;
        a(b2, true) && d2.redraw();
      }, setTitle: function(a2, b2) {
        this.update({ title: a2 }, b2);
      }, setCategories: function(a2, b2) {
        this.update({ categories: a2 }, b2);
      } });
    });
    N(r, "parts/AreaSeries.js", [r["parts/Globals.js"], r["parts/Color.js"], r["mixins/legend-symbol.js"], r["parts/Utilities.js"]], function(q, e, r2, A) {
      var D = e.parse, F = A.objectEach, K = A.pick;
      e = A.seriesType;
      var C = q.Series;
      e("area", "line", { softThreshold: false, threshold: 0 }, { singleStacks: false, getStackPoints: function(e2) {
        var m = [], q2 = [], r3 = this.xAxis, C2 = this.yAxis, x = C2.stacking.stacks[this.stackKey], p = {}, u = this.index, y = C2.series, k = y.length, h = K(C2.options.reversedStacks, true) ? 1 : -1, d;
        e2 = e2 || this.points;
        if (this.options.stacking) {
          for (d = 0; d < e2.length; d++)
            e2[d].leftNull = e2[d].rightNull = void 0, p[e2[d].x] = e2[d];
          F(x, function(b, d2) {
            null !== b.total && q2.push(d2);
          });
          q2.sort(function(b, d2) {
            return b - d2;
          });
          var t = y.map(function(b) {
            return b.visible;
          });
          q2.forEach(function(b, f) {
            var a = 0, v, e3;
            if (p[b] && !p[b].isNull)
              m.push(p[b]), [-1, 1].forEach(function(a2) {
                var m2 = 1 === a2 ? "rightNull" : "leftNull", n = 0, z = x[q2[f + a2]];
                if (z)
                  for (d = u; 0 <= d && d < k; )
                    v = z.points[d], v || (d === u ? p[b][m2] = true : t[d] && (e3 = x[b].points[d]) && (n -= e3[1] - e3[0])), d += h;
                p[b][1 === a2 ? "rightCliff" : "leftCliff"] = n;
              });
            else {
              for (d = u; 0 <= d && d < k; ) {
                if (v = x[b].points[d]) {
                  a = v[1];
                  break;
                }
                d += h;
              }
              a = C2.translate(a, 0, 1, 0, 1);
              m.push({ isNull: true, plotX: r3.translate(b, 0, 0, 0, 1), x: b, plotY: a, yBottom: a });
            }
          });
        }
        return m;
      }, getGraphPath: function(e2) {
        var m = C.prototype.getGraphPath, q2 = this.options, r3 = q2.stacking, L = this.yAxis, x, p = [], u = [], y = this.index, k = L.stacking.stacks[this.stackKey], h = q2.threshold, d = Math.round(L.getThreshold(q2.threshold));
        q2 = K(q2.connectNulls, "percent" === r3);
        var t = function(a2, b2, t2) {
          var v = e2[a2];
          a2 = r3 && k[v.x].points[y];
          var n = v[t2 + "Null"] || 0;
          t2 = v[t2 + "Cliff"] || 0;
          v = true;
          if (t2 || n) {
            var m2 = (n ? a2[0] : a2[1]) + t2;
            var E = a2[0] + t2;
            v = !!n;
          } else
            !r3 && e2[b2] && e2[b2].isNull && (m2 = E = h);
          "undefined" !== typeof m2 && (u.push({ plotX: f, plotY: null === m2 ? d : L.getThreshold(m2), isNull: v, isCliff: true }), p.push({ plotX: f, plotY: null === E ? d : L.getThreshold(E), doCurve: false }));
        };
        e2 = e2 || this.points;
        r3 && (e2 = this.getStackPoints(e2));
        for (x = 0; x < e2.length; x++) {
          r3 || (e2[x].leftCliff = e2[x].rightCliff = e2[x].leftNull = e2[x].rightNull = void 0);
          var b = e2[x].isNull;
          var f = K(e2[x].rectPlotX, e2[x].plotX);
          var a = K(e2[x].yBottom, d);
          if (!b || q2)
            q2 || t(x, x - 1, "left"), b && !r3 && q2 || (u.push(e2[x]), p.push({ x, plotX: f, plotY: a })), q2 || t(x, x + 1, "right");
        }
        x = m.call(this, u, true, true);
        p.reversed = true;
        b = m.call(this, p, true, true);
        (a = b[0]) && "M" === a[0] && (b[0] = ["L", a[1], a[2]]);
        b = x.concat(b);
        m = m.call(this, u, false, q2);
        b.xMap = x.xMap;
        this.areaPath = b;
        return m;
      }, drawGraph: function() {
        this.areaPath = [];
        C.prototype.drawGraph.apply(this);
        var e2 = this, q2 = this.areaPath, r3 = this.options, w = [[
          "area",
          "highcharts-area",
          this.color,
          r3.fillColor
        ]];
        this.zones.forEach(function(m, q3) {
          w.push(["zone-area-" + q3, "highcharts-area highcharts-zone-area-" + q3 + " " + m.className, m.color || e2.color, m.fillColor || r3.fillColor]);
        });
        w.forEach(function(m) {
          var x = m[0], p = e2[x], u = p ? "animate" : "attr", y = {};
          p ? (p.endX = e2.preventGraphAnimation ? null : q2.xMap, p.animate({ d: q2 })) : (y.zIndex = 0, p = e2[x] = e2.chart.renderer.path(q2).addClass(m[1]).add(e2.group), p.isArea = true);
          e2.chart.styledMode || (y.fill = K(m[3], D(m[2]).setOpacity(K(r3.fillOpacity, 0.75)).get()));
          p[u](y);
          p.startX = q2.xMap;
          p.shiftUnit = r3.step ? 2 : 1;
        });
      }, drawLegendSymbol: r2.drawRectangle });
    });
    N(r, "parts/SplineSeries.js", [r["parts/Utilities.js"]], function(q) {
      var e = q.pick;
      q = q.seriesType;
      q("spline", "line", {}, { getPointSpline: function(q2, r2, D) {
        var F = r2.plotX || 0, A = r2.plotY || 0, C = q2[D - 1];
        D = q2[D + 1];
        if (C && !C.isNull && false !== C.doCurve && !r2.isCliff && D && !D.isNull && false !== D.doCurve && !r2.isCliff) {
          q2 = C.plotY || 0;
          var m = D.plotX || 0;
          D = D.plotY || 0;
          var H = 0;
          var M = (1.5 * F + (C.plotX || 0)) / 2.5;
          var w = (1.5 * A + q2) / 2.5;
          m = (1.5 * F + m) / 2.5;
          var L = (1.5 * A + D) / 2.5;
          m !== M && (H = (L - w) * (m - F) / (m - M) + A - L);
          w += H;
          L += H;
          w > q2 && w > A ? (w = Math.max(q2, A), L = 2 * A - w) : w < q2 && w < A && (w = Math.min(q2, A), L = 2 * A - w);
          L > D && L > A ? (L = Math.max(D, A), w = 2 * A - L) : L < D && L < A && (L = Math.min(D, A), w = 2 * A - L);
          r2.rightContX = m;
          r2.rightContY = L;
        }
        r2 = ["C", e(C.rightContX, C.plotX, 0), e(C.rightContY, C.plotY, 0), e(M, F, 0), e(w, A, 0), F, A];
        C.rightContX = C.rightContY = void 0;
        return r2;
      } });
    });
    N(r, "parts/AreaSplineSeries.js", [r["parts/Globals.js"], r["mixins/legend-symbol.js"], r["parts/Options.js"], r["parts/Utilities.js"]], function(q, e, r2, A) {
      A = A.seriesType;
      q = q.seriesTypes.area.prototype;
      A("areaspline", "spline", r2.defaultOptions.plotOptions.area, { getStackPoints: q.getStackPoints, getGraphPath: q.getGraphPath, drawGraph: q.drawGraph, drawLegendSymbol: e.drawRectangle });
    });
    N(r, "parts/ColumnSeries.js", [r["parts/Globals.js"], r["parts/Color.js"], r["mixins/legend-symbol.js"], r["parts/Utilities.js"]], function(q, e, r2, A) {
      var D = e.parse, F = A.animObject, K = A.clamp, C = A.defined, m = A.extend, H = A.isNumber, M = A.merge, w = A.pick;
      e = A.seriesType;
      var L = q.Series;
      e(
        "column",
        "line",
        { borderRadius: 0, centerInCategory: false, groupPadding: 0.2, marker: null, pointPadding: 0.1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: false, brightness: 0.1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 }, softThreshold: false, startFromThreshold: true, stickyTracking: false, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" },
        { cropShoulder: 0, directTouch: true, trackerGroups: ["group", "dataLabelsGroup"], negStacks: true, init: function() {
          L.prototype.init.apply(
            this,
            arguments
          );
          var e2 = this, p = e2.chart;
          p.hasRendered && p.series.forEach(function(p2) {
            p2.type === e2.type && (p2.isDirty = true);
          });
        }, getColumnMetrics: function() {
          var e2 = this, p = e2.options, m2 = e2.xAxis, q2 = e2.yAxis, k = m2.options.reversedStacks;
          k = m2.reversed && !k || !m2.reversed && k;
          var h, d = {}, t = 0;
          false === p.grouping ? t = 1 : e2.chart.series.forEach(function(a2) {
            var b2 = a2.yAxis, f2 = a2.options;
            if (a2.type === e2.type && (a2.visible || !e2.chart.options.chart.ignoreHiddenSeries) && q2.len === b2.len && q2.pos === b2.pos) {
              if (f2.stacking && "group" !== f2.stacking) {
                h = a2.stackKey;
                "undefined" === typeof d[h] && (d[h] = t++);
                var k2 = d[h];
              } else
                false !== f2.grouping && (k2 = t++);
              a2.columnIndex = k2;
            }
          });
          var b = Math.min(Math.abs(m2.transA) * (m2.ordinal && m2.ordinal.slope || p.pointRange || m2.closestPointRange || m2.tickInterval || 1), m2.len), f = b * p.groupPadding, a = (b - 2 * f) / (t || 1);
          p = Math.min(p.maxPointWidth || m2.len, w(p.pointWidth, a * (1 - 2 * p.pointPadding)));
          e2.columnMetrics = { width: p, offset: (a - p) / 2 + (f + ((e2.columnIndex || 0) + (k ? 1 : 0)) * a - b / 2) * (k ? -1 : 1), paddedWidth: a, columnCount: t };
          return e2.columnMetrics;
        }, crispCol: function(e2, p, m2, q2) {
          var k = this.chart, h = this.borderWidth, d = -(h % 2 ? 0.5 : 0);
          h = h % 2 ? 0.5 : 1;
          k.inverted && k.renderer.isVML && (h += 1);
          this.options.crisp && (m2 = Math.round(e2 + m2) + d, e2 = Math.round(e2) + d, m2 -= e2);
          q2 = Math.round(p + q2) + h;
          d = 0.5 >= Math.abs(p) && 0.5 < q2;
          p = Math.round(p) + h;
          q2 -= p;
          d && q2 && (--p, q2 += 1);
          return { x: e2, y: p, width: m2, height: q2 };
        }, adjustForMissingColumns: function(e2, p, m2, r3) {
          var k = this, h = this.options.stacking;
          if (!m2.isNull && 1 < r3.columnCount) {
            var d = 0, t = 0;
            Highcharts.objectEach(this.yAxis.stacking && this.yAxis.stacking.stacks, function(b) {
              if ("number" === typeof m2.x && (b = b[m2.x.toString()])) {
                var f = b.points[k.index], a = b.total;
                h ? (f && (d = t), b.hasValidPoints && t++) : q.isArray(f) && (d = f[1], t = a || 0);
              }
            });
            e2 = (m2.plotX || 0) + ((t - 1) * r3.paddedWidth + p) / 2 - p - d * r3.paddedWidth;
          }
          return e2;
        }, translate: function() {
          var e2 = this, p = e2.chart, m2 = e2.options, q2 = e2.dense = 2 > e2.closestPointRange * e2.xAxis.transA;
          q2 = e2.borderWidth = w(m2.borderWidth, q2 ? 0 : 1);
          var k = e2.xAxis, h = e2.yAxis, d = m2.threshold, t = e2.translatedThreshold = h.getThreshold(d), b = w(m2.minPointLength, 5), f = e2.getColumnMetrics(), a = f.width, v = e2.barW = Math.max(a, 1 + 2 * q2), E = e2.pointXOffset = f.offset, r3 = e2.dataMin, B = e2.dataMax;
          p.inverted && (t -= 0.5);
          m2.pointPadding && (v = Math.ceil(v));
          L.prototype.translate.apply(e2);
          e2.points.forEach(function(n) {
            var z = w(n.yBottom, t), u = 999 + Math.abs(z), q3 = a, l = n.plotX || 0;
            u = K(n.plotY, -u, h.len + u);
            var g = l + E, c = v, x = Math.min(u, z), y = Math.max(u, z) - x;
            if (b && Math.abs(y) < b) {
              y = b;
              var J = !h.reversed && !n.negative || h.reversed && n.negative;
              H(d) && H(B) && n.y === d && B <= d && (h.min || 0) < d && r3 !== B && (J = !J);
              x = Math.abs(x - t) > b ? z - b : t - (J ? b : 0);
            }
            C(n.options.pointWidth) && (q3 = c = Math.ceil(n.options.pointWidth), g -= Math.round((q3 - a) / 2));
            m2.centerInCategory && (g = e2.adjustForMissingColumns(g, q3, n, f));
            n.barX = g;
            n.pointWidth = q3;
            n.tooltipPos = p.inverted ? [h.len + h.pos - p.plotLeft - u, k.len + k.pos - p.plotTop - (l || 0) - E - c / 2, y] : [g + c / 2, u + h.pos - p.plotTop, y];
            n.shapeType = e2.pointClass.prototype.shapeType || "rect";
            n.shapeArgs = e2.crispCol.apply(e2, n.isNull ? [g, t, c, 0] : [g, x, c, y]);
          });
        }, getSymbol: q.noop, drawLegendSymbol: r2.drawRectangle, drawGraph: function() {
          this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
        }, pointAttribs: function(e2, p) {
          var m2 = this.options, q2 = this.pointAttrToOptions || {};
          var k = q2.stroke || "borderColor";
          var h = q2["stroke-width"] || "borderWidth", d = e2 && e2.color || this.color, t = e2 && e2[k] || m2[k] || this.color || d, b = e2 && e2[h] || m2[h] || this[h] || 0;
          q2 = e2 && e2.options.dashStyle || m2.dashStyle;
          var f = w(e2 && e2.opacity, m2.opacity, 1);
          if (e2 && this.zones.length) {
            var a = e2.getZone();
            d = e2.options.color || a && (a.color || e2.nonZonedColor) || this.color;
            a && (t = a.borderColor || t, q2 = a.dashStyle || q2, b = a.borderWidth || b);
          }
          p && e2 && (e2 = M(m2.states[p], e2.options.states && e2.options.states[p] || {}), p = e2.brightness, d = e2.color || "undefined" !== typeof p && D(d).brighten(e2.brightness).get() || d, t = e2[k] || t, b = e2[h] || b, q2 = e2.dashStyle || q2, f = w(e2.opacity, f));
          k = { fill: d, stroke: t, "stroke-width": b, opacity: f };
          q2 && (k.dashstyle = q2);
          return k;
        }, drawPoints: function() {
          var e2 = this, m2 = this.chart, u = e2.options, q2 = m2.renderer, k = u.animationLimit || 250, h;
          e2.points.forEach(function(d) {
            var t = d.graphic, b = !!t, f = t && m2.pointCount < k ? "animate" : "attr";
            if (H(d.plotY) && null !== d.y) {
              h = d.shapeArgs;
              t && d.hasNewShapeType() && (t = t.destroy());
              e2.enabledDataSorting && (d.startXPos = e2.xAxis.reversed ? -(h ? h.width : 0) : e2.xAxis.width);
              t || (d.graphic = t = q2[d.shapeType](h).add(d.group || e2.group)) && e2.enabledDataSorting && m2.hasRendered && m2.pointCount < k && (t.attr({ x: d.startXPos }), b = true, f = "animate");
              if (t && b)
                t[f](M(h));
              if (u.borderRadius)
                t[f]({ r: u.borderRadius });
              m2.styledMode || t[f](e2.pointAttribs(d, d.selected && "select")).shadow(false !== d.allowShadow && u.shadow, null, u.stacking && !u.borderRadius);
              t.addClass(d.getClassName(), true);
            } else
              t && (d.graphic = t.destroy());
          });
        }, animate: function(e2) {
          var p = this, u = this.yAxis, q2 = p.options, k = this.chart.inverted, h = {}, d = k ? "translateX" : "translateY";
          if (e2)
            h.scaleY = 1e-3, e2 = K(u.toPixels(q2.threshold), u.pos, u.pos + u.len), k ? h.translateX = e2 - u.len : h.translateY = e2, p.clipBox && p.setClip(), p.group.attr(h);
          else {
            var t = p.group.attr(d);
            p.group.animate({ scaleY: 1 }, m(F(p.options.animation), { step: function(b, f) {
              p.group && (h[d] = t + f.pos * (u.pos - t), p.group.attr(h));
            } }));
          }
        }, remove: function() {
          var e2 = this, m2 = e2.chart;
          m2.hasRendered && m2.series.forEach(function(m3) {
            m3.type === e2.type && (m3.isDirty = true);
          });
          L.prototype.remove.apply(
            e2,
            arguments
          );
        } }
      );
    });
    N(r, "parts/BarSeries.js", [r["parts/Utilities.js"]], function(q) {
      q = q.seriesType;
      q("bar", "column", null, { inverted: true });
    });
    N(r, "parts/ScatterSeries.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function(q, e) {
      var r2 = e.addEvent;
      e = e.seriesType;
      var A = q.Series;
      e(
        "scatter",
        "line",
        { lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: true }, tooltip: { headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 10px"> {series.name}</span><br/>', pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" } },
        { sorted: false, requireSorting: false, noSharedTooltip: true, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: false, drawGraph: function() {
          this.options.lineWidth && A.prototype.drawGraph.call(this);
        }, applyJitter: function() {
          var e2 = this, q2 = this.options.jitter, r3 = this.points.length;
          q2 && this.points.forEach(function(C, m) {
            ["x", "y"].forEach(function(A2, D) {
              var w = "plot" + A2.toUpperCase();
              if (q2[A2] && !C.isNull) {
                var L = e2[A2 + "Axis"];
                var x = q2[A2] * L.transA;
                if (L && !L.isLog) {
                  var p = Math.max(0, C[w] - x);
                  L = Math.min(L.len, C[w] + x);
                  D = 1e4 * Math.sin(m + D * r3);
                  C[w] = p + (L - p) * (D - Math.floor(D));
                  "x" === A2 && (C.clientX = C.plotX);
                }
              }
            });
          });
        } }
      );
      r2(A, "afterTranslate", function() {
        this.applyJitter && this.applyJitter();
      });
    });
    N(r, "mixins/centered-series.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function(q, e) {
      var r2 = e.isNumber, A = e.pick, D = e.relativeLength, F = q.deg2rad;
      q.CenteredSeriesMixin = { getCenter: function() {
        var e2 = this.options, q2 = this.chart, m = 2 * (e2.slicedOffset || 0), r3 = q2.plotWidth - 2 * m, F2 = q2.plotHeight - 2 * m, w = e2.center, L = Math.min(r3, F2), x = e2.size, p = e2.innerSize || 0;
        "string" === typeof x && (x = parseFloat(x));
        "string" === typeof p && (p = parseFloat(p));
        e2 = [A(w[0], "50%"), A(w[1], "50%"), A(x && 0 > x ? void 0 : e2.size, "100%"), A(p && 0 > p ? void 0 : e2.innerSize || 0, "0%")];
        q2.angular && (e2[3] = 0);
        for (w = 0; 4 > w; ++w)
          x = e2[w], q2 = 2 > w || 2 === w && /%$/.test(x), e2[w] = D(x, [r3, F2, L, e2[2]][w]) + (q2 ? m : 0);
        e2[3] > e2[2] && (e2[3] = e2[2]);
        return e2;
      }, getStartAndEndRadians: function(e2, q2) {
        e2 = r2(e2) ? e2 : 0;
        q2 = r2(q2) && q2 > e2 && 360 > q2 - e2 ? q2 : e2 + 360;
        return { start: F * (e2 + -90), end: F * (q2 + -90) };
      } };
    });
    N(r, "parts/PieSeries.js", [
      r["parts/Globals.js"],
      r["mixins/legend-symbol.js"],
      r["parts/Point.js"],
      r["parts/Utilities.js"]
    ], function(q, e, r2, A) {
      var D = A.addEvent, F = A.clamp, K = A.defined, C = A.fireEvent, m = A.isNumber, H = A.merge, M = A.pick, w = A.relativeLength, L = A.seriesType, x = A.setAnimation;
      A = q.CenteredSeriesMixin;
      var p = A.getStartAndEndRadians, u = q.noop, y = q.Series;
      L("pie", "line", { center: [null, null], clip: false, colorByPoint: true, dataLabels: { allowOverlap: true, connectorPadding: 5, connectorShape: "fixedOffset", crookDistance: "70%", distance: 30, enabled: true, formatter: function() {
        return this.point.isNull ? void 0 : this.point.name;
      }, softConnector: true, x: 0 }, fillColor: void 0, ignoreHiddenPoint: true, inactiveOtherPoints: true, legendType: "point", marker: null, size: null, showInLegend: false, slicedOffset: 10, stickyTracking: false, tooltip: { followPointer: true }, borderColor: "#ffffff", borderWidth: 1, lineWidth: void 0, states: { hover: { brightness: 0.1 } } }, { isCartesian: false, requireSorting: false, directTouch: true, noSharedTooltip: true, trackerGroups: ["group", "dataLabelsGroup"], axisTypes: [], pointAttribs: q.seriesTypes.column.prototype.pointAttribs, animate: function(k) {
        var h = this, d = h.points, e2 = h.startAngleRad;
        k || d.forEach(function(b) {
          var d2 = b.graphic, a = b.shapeArgs;
          d2 && a && (d2.attr({ r: M(b.startR, h.center && h.center[3] / 2), start: e2, end: e2 }), d2.animate({ r: a.r, start: a.start, end: a.end }, h.options.animation));
        });
      }, hasData: function() {
        return !!this.processedXData.length;
      }, updateTotals: function() {
        var k, h = 0, d = this.points, e2 = d.length, b = this.options.ignoreHiddenPoint;
        for (k = 0; k < e2; k++) {
          var f = d[k];
          h += b && !f.visible ? 0 : f.isNull ? 0 : f.y;
        }
        this.total = h;
        for (k = 0; k < e2; k++)
          f = d[k], f.percentage = 0 < h && (f.visible || !b) ? f.y / h * 100 : 0, f.total = h;
      }, generatePoints: function() {
        y.prototype.generatePoints.call(this);
        this.updateTotals();
      }, getX: function(k, h, d) {
        var e2 = this.center, b = this.radii ? this.radii[d.index] : e2[2] / 2;
        k = Math.asin(F((k - e2[1]) / (b + d.labelDistance), -1, 1));
        return e2[0] + (h ? -1 : 1) * Math.cos(k) * (b + d.labelDistance) + (0 < d.labelDistance ? (h ? -1 : 1) * this.options.dataLabels.padding : 0);
      }, translate: function(k) {
        this.generatePoints();
        var h = 0, d = this.options, e2 = d.slicedOffset, b = e2 + (d.borderWidth || 0), f = p(d.startAngle, d.endAngle), a = this.startAngleRad = f.start;
        f = (this.endAngleRad = f.end) - a;
        var v = this.points, m2 = d.dataLabels.distance;
        d = d.ignoreHiddenPoint;
        var u2, B = v.length;
        k || (this.center = k = this.getCenter());
        for (u2 = 0; u2 < B; u2++) {
          var n = v[u2];
          var z = a + h * f;
          if (!d || n.visible)
            h += n.percentage / 100;
          var q2 = a + h * f;
          n.shapeType = "arc";
          n.shapeArgs = { x: k[0], y: k[1], r: k[2] / 2, innerR: k[3] / 2, start: Math.round(1e3 * z) / 1e3, end: Math.round(1e3 * q2) / 1e3 };
          n.labelDistance = M(n.options.dataLabels && n.options.dataLabels.distance, m2);
          n.labelDistance = w(n.labelDistance, n.shapeArgs.r);
          this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, n.labelDistance);
          q2 = (q2 + z) / 2;
          q2 > 1.5 * Math.PI ? q2 -= 2 * Math.PI : q2 < -Math.PI / 2 && (q2 += 2 * Math.PI);
          n.slicedTranslation = { translateX: Math.round(Math.cos(q2) * e2), translateY: Math.round(Math.sin(q2) * e2) };
          var r3 = Math.cos(q2) * k[2] / 2;
          var l = Math.sin(q2) * k[2] / 2;
          n.tooltipPos = [k[0] + 0.7 * r3, k[1] + 0.7 * l];
          n.half = q2 < -Math.PI / 2 || q2 > Math.PI / 2 ? 1 : 0;
          n.angle = q2;
          z = Math.min(b, n.labelDistance / 5);
          n.labelPosition = { natural: { x: k[0] + r3 + Math.cos(q2) * n.labelDistance, y: k[1] + l + Math.sin(q2) * n.labelDistance }, "final": {}, alignment: 0 > n.labelDistance ? "center" : n.half ? "right" : "left", connectorPosition: { breakAt: { x: k[0] + r3 + Math.cos(q2) * z, y: k[1] + l + Math.sin(q2) * z }, touchingSliceAt: { x: k[0] + r3, y: k[1] + l } } };
        }
        C(this, "afterTranslate");
      }, drawEmpty: function() {
        var k = this.startAngleRad, h = this.endAngleRad, d = this.options;
        if (0 === this.total) {
          var e2 = this.center[0];
          var b = this.center[1];
          this.graph || (this.graph = this.chart.renderer.arc(e2, b, this.center[1] / 2, 0, k, h).addClass("highcharts-empty-series").add(this.group));
          this.graph.attr({ d: Highcharts.SVGRenderer.prototype.symbols.arc(
            e2,
            b,
            this.center[2] / 2,
            0,
            { start: k, end: h, innerR: this.center[3] / 2 }
          ) });
          this.chart.styledMode || this.graph.attr({ "stroke-width": d.borderWidth, fill: d.fillColor || "none", stroke: d.color || "#cccccc" });
        } else
          this.graph && (this.graph = this.graph.destroy());
      }, redrawPoints: function() {
        var k = this, h = k.chart, d = h.renderer, e2, b, f, a, v = k.options.shadow;
        this.drawEmpty();
        !v || k.shadowGroup || h.styledMode || (k.shadowGroup = d.g("shadow").attr({ zIndex: -1 }).add(k.group));
        k.points.forEach(function(t) {
          var m2 = {};
          b = t.graphic;
          if (!t.isNull && b) {
            a = t.shapeArgs;
            e2 = t.getTranslate();
            if (!h.styledMode) {
              var p2 = t.shadowGroup;
              v && !p2 && (p2 = t.shadowGroup = d.g("shadow").add(k.shadowGroup));
              p2 && p2.attr(e2);
              f = k.pointAttribs(t, t.selected && "select");
            }
            t.delayedRendering ? (b.setRadialReference(k.center).attr(a).attr(e2), h.styledMode || b.attr(f).attr({ "stroke-linejoin": "round" }).shadow(v, p2), t.delayedRendering = false) : (b.setRadialReference(k.center), h.styledMode || H(true, m2, f), H(true, m2, a, e2), b.animate(m2));
            b.attr({ visibility: t.visible ? "inherit" : "hidden" });
            b.addClass(t.getClassName());
          } else
            b && (t.graphic = b.destroy());
        });
      }, drawPoints: function() {
        var k = this.chart.renderer;
        this.points.forEach(function(h) {
          h.graphic && h.hasNewShapeType() && (h.graphic = h.graphic.destroy());
          h.graphic || (h.graphic = k[h.shapeType](h.shapeArgs).add(h.series.group), h.delayedRendering = true);
        });
      }, searchPoint: u, sortByAngle: function(k, h) {
        k.sort(function(d, k2) {
          return "undefined" !== typeof d.angle && (k2.angle - d.angle) * h;
        });
      }, drawLegendSymbol: e.drawRectangle, getCenter: A.getCenter, getSymbol: u, drawGraph: null }, { init: function() {
        r2.prototype.init.apply(
          this,
          arguments
        );
        var k = this;
        k.name = M(k.name, "Slice");
        var h = function(d) {
          k.slice("select" === d.type);
        };
        D(k, "select", h);
        D(k, "unselect", h);
        return k;
      }, isValid: function() {
        return m(this.y) && 0 <= this.y;
      }, setVisible: function(k, h) {
        var d = this, e2 = d.series, b = e2.chart, f = e2.options.ignoreHiddenPoint;
        h = M(h, f);
        k !== d.visible && (d.visible = d.options.visible = k = "undefined" === typeof k ? !d.visible : k, e2.options.data[e2.data.indexOf(d)] = d.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function(a) {
          if (d[a])
            d[a][k ? "show" : "hide"](true);
        }), d.legendItem && b.legend.colorizeItem(d, k), k || "hover" !== d.state || d.setState(""), f && (e2.isDirty = true), h && b.redraw());
      }, slice: function(k, h, d) {
        var e2 = this.series;
        x(d, e2.chart);
        M(h, true);
        this.sliced = this.options.sliced = K(k) ? k : !this.sliced;
        e2.options.data[e2.data.indexOf(this)] = this.options;
        this.graphic && this.graphic.animate(this.getTranslate());
        this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
      }, getTranslate: function() {
        return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 };
      }, haloPath: function(k) {
        var h = this.shapeArgs;
        return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(h.x, h.y, h.r + k, h.r + k, { innerR: h.r - 1, start: h.start, end: h.end });
      }, connectorShapes: { fixedOffset: function(k, h, d) {
        var e2 = h.breakAt;
        h = h.touchingSliceAt;
        return [["M", k.x, k.y], d.softConnector ? ["C", k.x + ("left" === k.alignment ? -5 : 5), k.y, 2 * e2.x - h.x, 2 * e2.y - h.y, e2.x, e2.y] : ["L", e2.x, e2.y], ["L", h.x, h.y]];
      }, straight: function(k, h) {
        h = h.touchingSliceAt;
        return [["M", k.x, k.y], ["L", h.x, h.y]];
      }, crookedLine: function(k, h, d) {
        h = h.touchingSliceAt;
        var e2 = this.series, b = e2.center[0], f = e2.chart.plotWidth, a = e2.chart.plotLeft;
        e2 = k.alignment;
        var v = this.shapeArgs.r;
        d = w(d.crookDistance, 1);
        f = "left" === e2 ? b + v + (f + a - b - v) * (1 - d) : a + (b - v) * d;
        d = ["L", f, k.y];
        b = true;
        if ("left" === e2 ? f > k.x || f < h.x : f < k.x || f > h.x)
          b = false;
        k = [["M", k.x, k.y]];
        b && k.push(d);
        k.push(["L", h.x, h.y]);
        return k;
      } }, getConnectorPath: function() {
        var k = this.labelPosition, h = this.series.options.dataLabels, d = h.connectorShape, e2 = this.connectorShapes;
        e2[d] && (d = e2[d]);
        return d.call(
          this,
          { x: k.final.x, y: k.final.y, alignment: k.alignment },
          k.connectorPosition,
          h
        );
      } });
    });
    N(r, "parts/DataLabels.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function(q, e) {
      var r2 = q.noop, A = q.seriesTypes, D = e.animObject, F = e.arrayMax, K = e.clamp, C = e.defined, m = e.extend, H = e.fireEvent, M = e.format, w = e.isArray, L = e.merge, x = e.objectEach, p = e.pick, u = e.relativeLength, y = e.splat, k = e.stableSort, h = q.Series;
      q.distribute = function(d, h2, b) {
        function f(a2, b2) {
          return a2.target - b2.target;
        }
        var a, e2 = true, t = d, m2 = [];
        var B = 0;
        var n = t.reducedLen || h2;
        for (a = d.length; a--; )
          B += d[a].size;
        if (B > n) {
          k(d, function(a2, b2) {
            return (b2.rank || 0) - (a2.rank || 0);
          });
          for (B = a = 0; B <= n; )
            B += d[a].size, a++;
          m2 = d.splice(a - 1, d.length);
        }
        k(d, f);
        for (d = d.map(function(a2) {
          return { size: a2.size, targets: [a2.target], align: p(a2.align, 0.5) };
        }); e2; ) {
          for (a = d.length; a--; )
            e2 = d[a], B = (Math.min.apply(0, e2.targets) + Math.max.apply(0, e2.targets)) / 2, e2.pos = K(B - e2.size * e2.align, 0, h2 - e2.size);
          a = d.length;
          for (e2 = false; a--; )
            0 < a && d[a - 1].pos + d[a - 1].size > d[a].pos && (d[a - 1].size += d[a].size, d[a - 1].targets = d[a - 1].targets.concat(d[a].targets), d[a - 1].align = 0.5, d[a - 1].pos + d[a - 1].size > h2 && (d[a - 1].pos = h2 - d[a - 1].size), d.splice(a, 1), e2 = true);
        }
        t.push.apply(t, m2);
        a = 0;
        d.some(function(d2) {
          var f2 = 0;
          if (d2.targets.some(function() {
            t[a].pos = d2.pos + f2;
            if ("undefined" !== typeof b && Math.abs(t[a].pos - t[a].target) > b)
              return t.slice(0, a + 1).forEach(function(a2) {
                delete a2.pos;
              }), t.reducedLen = (t.reducedLen || h2) - 0.1 * h2, t.reducedLen > 0.1 * h2 && q.distribute(t, h2, b), true;
            f2 += t[a].size;
            a++;
          }))
            return true;
        });
        k(t, f);
      };
      h.prototype.drawDataLabels = function() {
        function d(a2, b2) {
          var c = b2.filter;
          return c ? (b2 = c.operator, a2 = a2[c.property], c = c.value, ">" === b2 && a2 > c || "<" === b2 && a2 < c || ">=" === b2 && a2 >= c || "<=" === b2 && a2 <= c || "==" === b2 && a2 == c || "===" === b2 && a2 === c ? true : false) : true;
        }
        function h2(a2, b2) {
          var c = [], d2;
          if (w(a2) && !w(b2))
            c = a2.map(function(a3) {
              return L(a3, b2);
            });
          else if (w(b2) && !w(a2))
            c = b2.map(function(b3) {
              return L(a2, b3);
            });
          else if (w(a2) || w(b2))
            for (d2 = Math.max(a2.length, b2.length); d2--; )
              c[d2] = L(a2[d2], b2[d2]);
          else
            c = L(a2, b2);
          return c;
        }
        var b = this, f = b.chart, a = b.options, k2 = a.dataLabels, e2 = b.points, m2, B = b.hasRendered || 0, n = D(a.animation).duration, z = Math.min(n, 200), u2 = !f.renderer.forExport && p(k2.defer, 0 < z), q2 = f.renderer;
        k2 = h2(h2(f.options.plotOptions && f.options.plotOptions.series && f.options.plotOptions.series.dataLabels, f.options.plotOptions && f.options.plotOptions[b.type] && f.options.plotOptions[b.type].dataLabels), k2);
        H(this, "drawDataLabels");
        if (w(k2) || k2.enabled || b._hasPointLabels) {
          var l = b.plotGroup("dataLabelsGroup", "data-labels", u2 && !B ? "hidden" : "inherit", k2.zIndex || 6);
          u2 && (l.attr({ opacity: +B }), B || setTimeout(function() {
            var d2 = b.dataLabelsGroup;
            d2 && (b.visible && l.show(true), d2[a.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: z }));
          }, n - z));
          e2.forEach(function(g) {
            m2 = y(h2(k2, g.dlOptions || g.options && g.options.dataLabels));
            m2.forEach(function(c, n2) {
              var h3 = c.enabled && (!g.isNull || g.dataLabelOnNull) && d(g, c), k3 = g.dataLabels ? g.dataLabels[n2] : g.dataLabel, e3 = g.connectors ? g.connectors[n2] : g.connector, t = p(c.distance, g.labelDistance), v = !k3;
              if (h3) {
                var m3 = g.getLabelConfig();
                var z2 = p(c[g.formatPrefix + "Format"], c.format);
                m3 = C(z2) ? M(z2, m3, f) : (c[g.formatPrefix + "Formatter"] || c.formatter).call(m3, c);
                z2 = c.style;
                var B2 = c.rotation;
                f.styledMode || (z2.color = p(c.color, z2.color, b.color, "#000000"), "contrast" === z2.color ? (g.contrastColor = q2.getContrast(g.color || b.color), z2.color = !C(t) && c.inside || 0 > t || a.stacking ? g.contrastColor : "#000000") : delete g.contrastColor, a.cursor && (z2.cursor = a.cursor));
                var u3 = { r: c.borderRadius || 0, rotation: B2, padding: c.padding, zIndex: 1 };
                f.styledMode || (u3.fill = c.backgroundColor, u3.stroke = c.borderColor, u3["stroke-width"] = c.borderWidth);
                x(u3, function(a2, b2) {
                  "undefined" === typeof a2 && delete u3[b2];
                });
              }
              !k3 || h3 && C(m3) ? h3 && C(m3) && (k3 ? u3.text = m3 : (g.dataLabels = g.dataLabels || [], k3 = g.dataLabels[n2] = B2 ? q2.text(m3, 0, -9999, c.useHTML).addClass("highcharts-data-label") : q2.label(m3, 0, -9999, c.shape, null, null, c.useHTML, null, "data-label"), n2 || (g.dataLabel = k3), k3.addClass(" highcharts-data-label-color-" + g.colorIndex + " " + (c.className || "") + (c.useHTML ? " highcharts-tracker" : ""))), k3.options = c, k3.attr(u3), f.styledMode || k3.css(z2).shadow(c.shadow), k3.added || k3.add(l), c.textPath && !c.useHTML && (k3.setTextPath(g.getDataLabelPath && g.getDataLabelPath(k3) || g.graphic, c.textPath), g.dataLabelPath && !c.textPath.enabled && (g.dataLabelPath = g.dataLabelPath.destroy())), b.alignDataLabel(g, k3, c, null, v)) : (g.dataLabel = g.dataLabel && g.dataLabel.destroy(), g.dataLabels && (1 === g.dataLabels.length ? delete g.dataLabels : delete g.dataLabels[n2]), n2 || delete g.dataLabel, e3 && (g.connector = g.connector.destroy(), g.connectors && (1 === g.connectors.length ? delete g.connectors : delete g.connectors[n2])));
            });
          });
        }
        H(this, "afterDrawDataLabels");
      };
      h.prototype.alignDataLabel = function(d, h2, b, f, a) {
        var k2 = this, e2 = this.chart, t = this.isCartesian && e2.inverted, B = this.enabledDataSorting, n = p(d.dlBox && d.dlBox.centerX, d.plotX, -9999), z = p(d.plotY, -9999), u2 = h2.getBBox(), q2 = b.rotation, l = b.align, g = e2.isInsidePlot(n, Math.round(z), t), c = "justify" === p(b.overflow, B ? "none" : "justify"), r3 = this.visible && false !== d.visible && (d.series.forceDL || B && !c || g || b.inside && f && e2.isInsidePlot(n, t ? f.x + 1 : f.y + f.height - 1, t));
        var y2 = function(b2) {
          B && k2.xAxis && !c && k2.setDataLabelStartPos(d, h2, a, g, b2);
        };
        if (r3) {
          var x2 = e2.renderer.fontMetrics(e2.styledMode ? void 0 : b.style.fontSize, h2).b;
          f = m({ x: t ? this.yAxis.len - z : n, y: Math.round(t ? this.xAxis.len - n : z), width: 0, height: 0 }, f);
          m(b, { width: u2.width, height: u2.height });
          q2 ? (c = false, n = e2.renderer.rotCorr(x2, q2), n = { x: f.x + (b.x || 0) + f.width / 2 + n.x, y: f.y + (b.y || 0) + { top: 0, middle: 0.5, bottom: 1 }[b.verticalAlign] * f.height }, y2(n), h2[a ? "attr" : "animate"](n).attr({ align: l }), y2 = (q2 + 720) % 360, y2 = 180 < y2 && 360 > y2, "left" === l ? n.y -= y2 ? u2.height : 0 : "center" === l ? (n.x -= u2.width / 2, n.y -= u2.height / 2) : "right" === l && (n.x -= u2.width, n.y -= y2 ? 0 : u2.height), h2.placed = true, h2.alignAttr = n) : (y2(f), h2.align(b, null, f), n = h2.alignAttr);
          c && 0 <= f.height ? this.justifyDataLabel(h2, b, n, u2, f, a) : p(b.crop, true) && (r3 = e2.isInsidePlot(n.x, n.y) && e2.isInsidePlot(
            n.x + u2.width,
            n.y + u2.height
          ));
          if (b.shape && !q2)
            h2[a ? "attr" : "animate"]({ anchorX: t ? e2.plotWidth - d.plotY : d.plotX, anchorY: t ? e2.plotHeight - d.plotX : d.plotY });
        }
        a && B && (h2.placed = false);
        r3 || B && !c || (h2.hide(true), h2.placed = false);
      };
      h.prototype.setDataLabelStartPos = function(d, h2, b, f, a) {
        var k2 = this.chart, e2 = k2.inverted, t = this.xAxis, m2 = t.reversed, n = e2 ? h2.height / 2 : h2.width / 2;
        d = (d = d.pointWidth) ? d / 2 : 0;
        t = e2 ? a.x : m2 ? -n - d : t.width - n + d;
        a = e2 ? m2 ? this.yAxis.height - n + d : -n - d : a.y;
        h2.startXPos = t;
        h2.startYPos = a;
        f ? "hidden" === h2.visibility && (h2.show(), h2.attr({ opacity: 0 }).animate({ opacity: 1 })) : h2.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, h2.hide);
        k2.hasRendered && (b && h2.attr({ x: h2.startXPos, y: h2.startYPos }), h2.placed = true);
      };
      h.prototype.justifyDataLabel = function(d, h2, b, f, a, k2) {
        var e2 = this.chart, t = h2.align, v = h2.verticalAlign, n = d.box ? 0 : d.padding || 0, m2 = h2.x;
        m2 = void 0 === m2 ? 0 : m2;
        var p2 = h2.y;
        var u2 = void 0 === p2 ? 0 : p2;
        p2 = b.x + n;
        if (0 > p2) {
          "right" === t && 0 <= m2 ? (h2.align = "left", h2.inside = true) : m2 -= p2;
          var l = true;
        }
        p2 = b.x + f.width - n;
        p2 > e2.plotWidth && ("left" === t && 0 >= m2 ? (h2.align = "right", h2.inside = true) : m2 += e2.plotWidth - p2, l = true);
        p2 = b.y + n;
        0 > p2 && ("bottom" === v && 0 <= u2 ? (h2.verticalAlign = "top", h2.inside = true) : u2 -= p2, l = true);
        p2 = b.y + f.height - n;
        p2 > e2.plotHeight && ("top" === v && 0 >= u2 ? (h2.verticalAlign = "bottom", h2.inside = true) : u2 += e2.plotHeight - p2, l = true);
        l && (h2.x = m2, h2.y = u2, d.placed = !k2, d.align(h2, void 0, a));
        return l;
      };
      A.pie && (A.pie.prototype.dataLabelPositioners = {
        radialDistributionY: function(d) {
          return d.top + d.distributeBox.pos;
        },
        radialDistributionX: function(d, h2, b, f) {
          return d.getX(b < h2.top + 2 || b > h2.bottom - 2 ? f : b, h2.half, h2);
        },
        justify: function(d, h2, b) {
          return b[0] + (d.half ? -1 : 1) * (h2 + d.labelDistance);
        },
        alignToPlotEdges: function(d, h2, b, f) {
          d = d.getBBox().width;
          return h2 ? d + f : b - d - f;
        },
        alignToConnectors: function(d, h2, b, f) {
          var a = 0, k2;
          d.forEach(function(b2) {
            k2 = b2.dataLabel.getBBox().width;
            k2 > a && (a = k2);
          });
          return h2 ? a + f : b - a - f;
        }
      }, A.pie.prototype.drawDataLabels = function() {
        var d = this, k2 = d.data, b, f = d.chart, a = d.options.dataLabels || {}, e2 = a.connectorPadding, m2, u2 = f.plotWidth, B = f.plotHeight, n = f.plotLeft, z = Math.round(f.chartWidth / 3), r3, y2 = d.center, l = y2[2] / 2, g = y2[1], c, x2, w2, A2, D2 = [[], []], H2, M2, K2, N2, R = [0, 0, 0, 0], T = d.dataLabelPositioners, X;
        d.visible && (a.enabled || d._hasPointLabels) && (k2.forEach(function(a2) {
          a2.dataLabel && a2.visible && a2.dataLabel.shortened && (a2.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), a2.dataLabel.shortened = false);
        }), h.prototype.drawDataLabels.apply(d), k2.forEach(function(b2) {
          b2.dataLabel && (b2.visible ? (D2[b2.half].push(b2), b2.dataLabel._pos = null, !C(a.style.width) && !C(b2.options.dataLabels && b2.options.dataLabels.style && b2.options.dataLabels.style.width) && b2.dataLabel.getBBox().width > z && (b2.dataLabel.css({ width: Math.round(0.7 * z) + "px" }), b2.dataLabel.shortened = true)) : (b2.dataLabel = b2.dataLabel.destroy(), b2.dataLabels && 1 === b2.dataLabels.length && delete b2.dataLabels));
        }), D2.forEach(function(h2, k3) {
          var t = h2.length, m3 = [], v;
          if (t) {
            d.sortByAngle(h2, k3 - 0.5);
            if (0 < d.maxLabelDistance) {
              var z2 = Math.max(0, g - l - d.maxLabelDistance);
              var r4 = Math.min(g + l + d.maxLabelDistance, f.plotHeight);
              h2.forEach(function(a2) {
                0 < a2.labelDistance && a2.dataLabel && (a2.top = Math.max(0, g - l - a2.labelDistance), a2.bottom = Math.min(g + l + a2.labelDistance, f.plotHeight), v = a2.dataLabel.getBBox().height || 21, a2.distributeBox = { target: a2.labelPosition.natural.y - a2.top + v / 2, size: v, rank: a2.y }, m3.push(a2.distributeBox));
              });
              z2 = r4 + v - z2;
              q.distribute(m3, z2, z2 / 5);
            }
            for (N2 = 0; N2 < t; N2++) {
              b = h2[N2];
              w2 = b.labelPosition;
              c = b.dataLabel;
              K2 = false === b.visible ? "hidden" : "inherit";
              M2 = z2 = w2.natural.y;
              m3 && C(b.distributeBox) && ("undefined" === typeof b.distributeBox.pos ? K2 = "hidden" : (A2 = b.distributeBox.size, M2 = T.radialDistributionY(b)));
              delete b.positionIndex;
              if (a.justify)
                H2 = T.justify(b, l, y2);
              else
                switch (a.alignTo) {
                  case "connectors":
                    H2 = T.alignToConnectors(h2, k3, u2, n);
                    break;
                  case "plotEdges":
                    H2 = T.alignToPlotEdges(c, k3, u2, n);
                    break;
                  default:
                    H2 = T.radialDistributionX(d, b, M2, z2);
                }
              c._attr = { visibility: K2, align: w2.alignment };
              X = b.options.dataLabels || {};
              c._pos = { x: H2 + p(X.x, a.x) + ({ left: e2, right: -e2 }[w2.alignment] || 0), y: M2 + p(X.y, a.y) - 10 };
              w2.final.x = H2;
              w2.final.y = M2;
              p(a.crop, true) && (x2 = c.getBBox().width, z2 = null, H2 - x2 < e2 && 1 === k3 ? (z2 = Math.round(x2 - H2 + e2), R[3] = Math.max(z2, R[3])) : H2 + x2 > u2 - e2 && 0 === k3 && (z2 = Math.round(H2 + x2 - u2 + e2), R[1] = Math.max(z2, R[1])), 0 > M2 - A2 / 2 ? R[0] = Math.max(Math.round(-M2 + A2 / 2), R[0]) : M2 + A2 / 2 > B && (R[2] = Math.max(Math.round(M2 + A2 / 2 - B), R[2])), c.sideOverflow = z2);
            }
          }
        }), 0 === F(R) || this.verifyDataLabelOverflow(R)) && (this.placeDataLabels(), this.points.forEach(function(b2) {
          X = L(a, b2.options.dataLabels);
          if (m2 = p(X.connectorWidth, 1)) {
            var g2;
            r3 = b2.connector;
            if ((c = b2.dataLabel) && c._pos && b2.visible && 0 < b2.labelDistance) {
              K2 = c._attr.visibility;
              if (g2 = !r3)
                b2.connector = r3 = f.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + b2.colorIndex + (b2.className ? " " + b2.className : "")).add(d.dataLabelsGroup), f.styledMode || r3.attr({
                  "stroke-width": m2,
                  stroke: X.connectorColor || b2.color || "#666666"
                });
              r3[g2 ? "attr" : "animate"]({ d: b2.getConnectorPath() });
              r3.attr("visibility", K2);
            } else
              r3 && (b2.connector = r3.destroy());
          }
        }));
      }, A.pie.prototype.placeDataLabels = function() {
        this.points.forEach(function(d) {
          var h2 = d.dataLabel, b;
          h2 && d.visible && ((b = h2._pos) ? (h2.sideOverflow && (h2._attr.width = Math.max(h2.getBBox().width - h2.sideOverflow, 0), h2.css({ width: h2._attr.width + "px", textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis" }), h2.shortened = true), h2.attr(h2._attr), h2[h2.moved ? "animate" : "attr"](b), h2.moved = true) : h2 && h2.attr({ y: -9999 }));
          delete d.distributeBox;
        }, this);
      }, A.pie.prototype.alignDataLabel = r2, A.pie.prototype.verifyDataLabelOverflow = function(d) {
        var h2 = this.center, b = this.options, f = b.center, a = b.minSize || 80, k2 = null !== b.size;
        if (!k2) {
          if (null !== f[0])
            var e2 = Math.max(h2[2] - Math.max(d[1], d[3]), a);
          else
            e2 = Math.max(h2[2] - d[1] - d[3], a), h2[0] += (d[3] - d[1]) / 2;
          null !== f[1] ? e2 = K(e2, a, h2[2] - Math.max(d[0], d[2])) : (e2 = K(e2, a, h2[2] - d[0] - d[2]), h2[1] += (d[0] - d[2]) / 2);
          e2 < h2[2] ? (h2[2] = e2, h2[3] = Math.min(u(b.innerSize || 0, e2), e2), this.translate(h2), this.drawDataLabels && this.drawDataLabels()) : k2 = true;
        }
        return k2;
      });
      A.column && (A.column.prototype.alignDataLabel = function(d, k2, b, f, a) {
        var e2 = this.chart.inverted, t = d.series, m2 = d.dlBox || d.shapeArgs, u2 = p(d.below, d.plotY > p(this.translatedThreshold, t.yAxis.len)), n = p(b.inside, !!this.options.stacking);
        m2 && (f = L(m2), 0 > f.y && (f.height += f.y, f.y = 0), m2 = f.y + f.height - t.yAxis.len, 0 < m2 && m2 < f.height && (f.height -= m2), e2 && (f = { x: t.yAxis.len - f.y - f.height, y: t.xAxis.len - f.x - f.width, width: f.height, height: f.width }), n || (e2 ? (f.x += u2 ? 0 : f.width, f.width = 0) : (f.y += u2 ? f.height : 0, f.height = 0)));
        b.align = p(b.align, !e2 || n ? "center" : u2 ? "right" : "left");
        b.verticalAlign = p(b.verticalAlign, e2 || n ? "middle" : u2 ? "top" : "bottom");
        h.prototype.alignDataLabel.call(this, d, k2, b, f, a);
        b.inside && d.contrastColor && k2.css({ color: d.contrastColor });
      });
    });
    N(r, "modules/overlapping-datalabels.src.js", [r["parts/Chart.js"], r["parts/Utilities.js"]], function(q, e) {
      var r2 = e.addEvent, A = e.fireEvent, D = e.isArray, F = e.isNumber, K = e.objectEach, C = e.pick;
      r2(q, "render", function() {
        var e2 = [];
        (this.labelCollectors || []).forEach(function(m) {
          e2 = e2.concat(m());
        });
        (this.yAxis || []).forEach(function(m) {
          m.stacking && m.options.stackLabels && !m.options.stackLabels.allowOverlap && K(m.stacking.stacks, function(m2) {
            K(m2, function(m3) {
              e2.push(m3.label);
            });
          });
        });
        (this.series || []).forEach(function(m) {
          var q2 = m.options.dataLabels;
          m.visible && (false !== q2.enabled || m._hasPointLabels) && (m.nodes || m.points).forEach(function(m2) {
            m2.visible && (D(m2.dataLabels) ? m2.dataLabels : m2.dataLabel ? [m2.dataLabel] : []).forEach(function(q3) {
              var r3 = q3.options;
              q3.labelrank = C(r3.labelrank, m2.labelrank, m2.shapeArgs && m2.shapeArgs.height);
              r3.allowOverlap || e2.push(q3);
            });
          });
        });
        this.hideOverlappingLabels(e2);
      });
      q.prototype.hideOverlappingLabels = function(e2) {
        var m = this, q2 = e2.length, r3 = m.renderer, D2, x, p, u = false;
        var y = function(d) {
          var h2, b = d.box ? 0 : d.padding || 0, f = h2 = 0, a;
          if (d && (!d.alignAttr || d.placed)) {
            var k2 = d.alignAttr || { x: d.attr("x"), y: d.attr("y") };
            var e3 = d.parentGroup;
            d.width || (h2 = d.getBBox(), d.width = h2.width, d.height = h2.height, h2 = r3.fontMetrics(null, d.element).h);
            var m2 = d.width - 2 * b;
            (a = {
              left: "0",
              center: "0.5",
              right: "1"
            }[d.alignValue]) ? f = +a * m2 : F(d.x) && Math.round(d.x) !== d.translateX && (f = d.x - d.translateX);
            return { x: k2.x + (e3.translateX || 0) + b - f, y: k2.y + (e3.translateY || 0) + b - h2, width: d.width - 2 * b, height: d.height - 2 * b };
          }
        };
        for (x = 0; x < q2; x++)
          if (D2 = e2[x])
            D2.oldOpacity = D2.opacity, D2.newOpacity = 1, D2.absoluteBox = y(D2);
        e2.sort(function(d, h2) {
          return (h2.labelrank || 0) - (d.labelrank || 0);
        });
        for (x = 0; x < q2; x++) {
          var k = (y = e2[x]) && y.absoluteBox;
          for (D2 = x + 1; D2 < q2; ++D2) {
            var h = (p = e2[D2]) && p.absoluteBox;
            !k || !h || y === p || 0 === y.newOpacity || 0 === p.newOpacity || h.x > k.x + k.width || h.x + h.width < k.x || h.y > k.y + k.height || h.y + h.height < k.y || ((y.labelrank < p.labelrank ? y : p).newOpacity = 0);
          }
        }
        e2.forEach(function(d) {
          if (d) {
            var h2 = d.newOpacity;
            d.oldOpacity !== h2 && (d.alignAttr && d.placed ? (d[h2 ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), u = true, d.alignAttr.opacity = h2, d[d.isOld ? "animate" : "attr"](d.alignAttr, null, function() {
              m.styledMode || d.css({ pointerEvents: h2 ? "auto" : "none" });
              d.visibility = h2 ? "inherit" : "hidden";
              d.placed = !!h2;
            }), A(m, "afterHideOverlappingLabel")) : d.attr({ opacity: h2 }));
            d.isOld = true;
          }
        });
        u && A(m, "afterHideAllOverlappingLabels");
      };
    });
    N(r, "parts/Interaction.js", [r["parts/Chart.js"], r["parts/Globals.js"], r["parts/Legend.js"], r["parts/Options.js"], r["parts/Point.js"], r["parts/Utilities.js"]], function(q, e, r2, A, D, F) {
      var K = A.defaultOptions, C = F.addEvent, m = F.createElement, H = F.css, M = F.defined, w = F.extend, L = F.fireEvent, x = F.isArray, p = F.isFunction, u = F.isNumber, y = F.isObject, k = F.merge, h = F.objectEach, d = F.pick, t = e.hasTouch;
      A = e.Series;
      F = e.seriesTypes;
      var b = e.svg;
      var f = e.TrackerMixin = { drawTrackerPoint: function() {
        var a = this, b2 = a.chart, d2 = b2.pointer, f2 = function(a2) {
          var b3 = d2.getPointFromEvent(a2);
          "undefined" !== typeof b3 && (d2.isDirectTouch = true, b3.onMouseOver(a2));
        }, h2;
        a.points.forEach(function(a2) {
          h2 = x(a2.dataLabels) ? a2.dataLabels : a2.dataLabel ? [a2.dataLabel] : [];
          a2.graphic && (a2.graphic.element.point = a2);
          h2.forEach(function(b3) {
            b3.div ? b3.div.point = a2 : b3.element.point = a2;
          });
        });
        a._hasTracking || (a.trackerGroups.forEach(function(h3) {
          if (a[h3]) {
            a[h3].addClass("highcharts-tracker").on("mouseover", f2).on("mouseout", function(a2) {
              d2.onTrackerMouseOut(a2);
            });
            if (t)
              a[h3].on(
                "touchstart",
                f2
              );
            !b2.styledMode && a.options.cursor && a[h3].css(H).css({ cursor: a.options.cursor });
          }
        }), a._hasTracking = true);
        L(this, "afterDrawTracker");
      }, drawTrackerGraph: function() {
        var a = this, d2 = a.options, f2 = d2.trackByArea, h2 = [].concat(f2 ? a.areaPath : a.graphPath), k2 = a.chart, n = k2.pointer, e2 = k2.renderer, m2 = k2.options.tooltip.snap, p2 = a.tracker, l = function(b2) {
          if (k2.hoverSeries !== a)
            a.onMouseOver();
        }, g = "rgba(192,192,192," + (b ? 1e-4 : 2e-3) + ")";
        p2 ? p2.attr({ d: h2 }) : a.graph && (a.tracker = e2.path(h2).attr({ visibility: a.visible ? "visible" : "hidden", zIndex: 2 }).addClass(f2 ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), k2.styledMode || a.tracker.attr({ "stroke-linecap": "round", "stroke-linejoin": "round", stroke: g, fill: f2 ? g : "none", "stroke-width": a.graph.strokeWidth() + (f2 ? 0 : 2 * m2) }), [a.tracker, a.markerGroup].forEach(function(a2) {
          a2.addClass("highcharts-tracker").on("mouseover", l).on("mouseout", function(a3) {
            n.onTrackerMouseOut(a3);
          });
          d2.cursor && !k2.styledMode && a2.css({ cursor: d2.cursor });
          if (t)
            a2.on("touchstart", l);
        }));
        L(this, "afterDrawTracker");
      } };
      F.column && (F.column.prototype.drawTracker = f.drawTrackerPoint);
      F.pie && (F.pie.prototype.drawTracker = f.drawTrackerPoint);
      F.scatter && (F.scatter.prototype.drawTracker = f.drawTrackerPoint);
      w(r2.prototype, { setItemEvents: function(a, b2, d2) {
        var f2 = this, h2 = f2.chart.renderer.boxWrapper, n = a instanceof D, e2 = "highcharts-legend-" + (n ? "point" : "series") + "-active", m2 = f2.chart.styledMode;
        (d2 ? [b2, a.legendSymbol] : [a.legendGroup]).forEach(function(d3) {
          if (d3)
            d3.on("mouseover", function() {
              a.visible && f2.allItems.forEach(function(b3) {
                a !== b3 && b3.setState("inactive", !n);
              });
              a.setState("hover");
              a.visible && h2.addClass(e2);
              m2 || b2.css(f2.options.itemHoverStyle);
            }).on("mouseout", function() {
              f2.chart.styledMode || b2.css(k(a.visible ? f2.itemStyle : f2.itemHiddenStyle));
              f2.allItems.forEach(function(b3) {
                a !== b3 && b3.setState("", !n);
              });
              h2.removeClass(e2);
              a.setState();
            }).on("click", function(b3) {
              var d4 = function() {
                a.setVisible && a.setVisible();
                f2.allItems.forEach(function(b4) {
                  a !== b4 && b4.setState(a.visible ? "inactive" : "", !n);
                });
              };
              h2.removeClass(e2);
              b3 = { browserEvent: b3 };
              a.firePointEvent ? a.firePointEvent("legendItemClick", b3, d4) : L(
                a,
                "legendItemClick",
                b3,
                d4
              );
            });
        });
      }, createCheckboxForItem: function(a) {
        a.checkbox = m("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container);
        C(a.checkbox, "click", function(b2) {
          L(a.series || a, "checkboxClick", { checked: b2.target.checked, item: a }, function() {
            a.select();
          });
        });
      } });
      w(q.prototype, { showResetZoom: function() {
        function a() {
          b2.zoomOut();
        }
        var b2 = this, d2 = K.lang, f2 = b2.options.chart.resetZoomButton, h2 = f2.theme, n = h2.states, k2 = "chart" === f2.relativeTo || "spaceBox" === f2.relativeTo ? null : "plotBox";
        L(this, "beforeShowResetZoom", null, function() {
          b2.resetZoomButton = b2.renderer.button(d2.resetZoom, null, null, a, h2, n && n.hover).attr({ align: f2.position.align, title: d2.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(f2.position, false, k2);
        });
        L(this, "afterShowResetZoom");
      }, zoomOut: function() {
        L(this, "selection", { resetSelection: true }, this.zoom);
      }, zoom: function(a) {
        var b2 = this, f2, h2 = b2.pointer, k2 = false, n = b2.inverted ? h2.mouseDownX : h2.mouseDownY;
        !a || a.resetSelection ? (b2.axes.forEach(function(a2) {
          f2 = a2.zoom();
        }), h2.initiated = false) : a.xAxis.concat(a.yAxis).forEach(function(a2) {
          var d2 = a2.axis, l = b2.inverted ? d2.left : d2.top, g = b2.inverted ? l + d2.width : l + d2.height, c = d2.isXAxis, e3 = false;
          if (!c && n >= l && n <= g || c || !M(n))
            e3 = true;
          h2[c ? "zoomX" : "zoomY"] && e3 && (f2 = d2.zoom(a2.min, a2.max), d2.displayBtn && (k2 = true));
        });
        var e2 = b2.resetZoomButton;
        k2 && !e2 ? b2.showResetZoom() : !k2 && y(e2) && (b2.resetZoomButton = e2.destroy());
        f2 && b2.redraw(d(b2.options.chart.animation, a && a.animation, 100 > b2.pointCount));
      }, pan: function(a, b2) {
        var d2 = this, f2 = d2.hoverPoints, h2 = d2.options.chart, n = d2.options.mapNavigation && d2.options.mapNavigation.enabled, k2;
        b2 = "object" === typeof b2 ? b2 : { enabled: b2, type: "x" };
        h2 && h2.panning && (h2.panning = b2);
        var m2 = b2.type;
        L(this, "pan", { originalEvent: a }, function() {
          f2 && f2.forEach(function(a2) {
            a2.setState();
          });
          var b3 = [1];
          "xy" === m2 ? b3 = [1, 0] : "y" === m2 && (b3 = [0]);
          b3.forEach(function(b4) {
            var g = d2[b4 ? "xAxis" : "yAxis"][0], c = g.horiz, f3 = a[c ? "chartX" : "chartY"];
            c = c ? "mouseDownX" : "mouseDownY";
            var h3 = d2[c], l = (g.pointRange || 0) / 2, t2 = g.reversed && !d2.inverted || !g.reversed && d2.inverted ? -1 : 1, p2 = g.getExtremes(), v = g.toValue(h3 - f3, true) + l * t2;
            t2 = g.toValue(h3 + g.len - f3, true) - l * t2;
            var z = t2 < v;
            h3 = z ? t2 : v;
            v = z ? v : t2;
            var q2 = g.hasVerticalPanning(), B = g.panningState;
            g.series.forEach(function(a2) {
              if (q2 && !b4 && (!B || B.isDirty)) {
                var c2 = a2.getProcessedData(true);
                a2 = a2.getExtremes(c2.yData, true);
                B || (B = { startMin: Number.MAX_VALUE, startMax: -Number.MAX_VALUE });
                u(a2.dataMin) && u(a2.dataMax) && (B.startMin = Math.min(a2.dataMin, B.startMin), B.startMax = Math.max(a2.dataMax, B.startMax));
              }
            });
            t2 = Math.min(e.pick(null === B || void 0 === B ? void 0 : B.startMin, p2.dataMin), l ? p2.min : g.toValue(g.toPixels(p2.min) - g.minPixelPadding));
            l = Math.max(e.pick(null === B || void 0 === B ? void 0 : B.startMax, p2.dataMax), l ? p2.max : g.toValue(g.toPixels(p2.max) + g.minPixelPadding));
            g.panningState = B;
            if (!g.isOrdinal) {
              z = t2 - h3;
              0 < z && (v += z, h3 = t2);
              z = v - l;
              0 < z && (v = l, h3 -= z);
              if (g.series.length && h3 !== p2.min && v !== p2.max && b4 || B && h3 >= t2 && v <= l)
                g.setExtremes(h3, v, false, false, { trigger: "pan" }), d2.resetZoomButton || n || !m2.match("y") || (d2.showResetZoom(), g.displayBtn = false), k2 = true;
              d2[c] = f3;
            }
          });
          k2 && d2.redraw(false);
          H(d2.container, { cursor: "move" });
        });
      } });
      w(D.prototype, {
        select: function(a, b2) {
          var f2 = this, h2 = f2.series, k2 = h2.chart;
          this.selectedStaging = a = d(a, !f2.selected);
          f2.firePointEvent(a ? "select" : "unselect", { accumulate: b2 }, function() {
            f2.selected = f2.options.selected = a;
            h2.options.data[h2.data.indexOf(f2)] = f2.options;
            f2.setState(a && "select");
            b2 || k2.getSelectedPoints().forEach(function(a2) {
              var b3 = a2.series;
              a2.selected && a2 !== f2 && (a2.selected = a2.options.selected = false, b3.options.data[b3.data.indexOf(a2)] = a2.options, a2.setState(k2.hoverPoints && b3.options.inactiveOtherPoints ? "inactive" : ""), a2.firePointEvent("unselect"));
            });
          });
          delete this.selectedStaging;
        },
        onMouseOver: function(a) {
          var b2 = this.series.chart, d2 = b2.pointer;
          a = a ? d2.normalize(a) : d2.getChartCoordinatesFromPoint(this, b2.inverted);
          d2.runPointActions(a, this);
        },
        onMouseOut: function() {
          var a = this.series.chart;
          this.firePointEvent("mouseOut");
          this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function(a2) {
            a2.setState();
          });
          a.hoverPoints = a.hoverPoint = null;
        },
        importEvents: function() {
          if (!this.hasImportedEvents) {
            var a = this, b2 = k(a.series.options.point, a.options).events;
            a.events = b2;
            h(b2, function(b3, d2) {
              p(b3) && C(a, d2, b3);
            });
            this.hasImportedEvents = true;
          }
        },
        setState: function(a, b2) {
          var f2 = this.series, h2 = this.state, k2 = f2.options.states[a || "normal"] || {}, n = K.plotOptions[f2.type].marker && f2.options.marker, e2 = n && false === n.enabled, m2 = n && n.states && n.states[a || "normal"] || {}, t2 = false === m2.enabled, l = f2.stateMarkerGraphic, g = this.marker || {}, c = f2.chart, p2 = f2.halo, v, u2 = n && f2.markerAttribs;
          a = a || "";
          if (!(a === this.state && !b2 || this.selected && "select" !== a || false === k2.enabled || a && (t2 || e2 && false === m2.enabled) || a && g.states && g.states[a] && false === g.states[a].enabled)) {
            this.state = a;
            u2 && (v = f2.markerAttribs(this, a));
            if (this.graphic) {
              h2 && this.graphic.removeClass("highcharts-point-" + h2);
              a && this.graphic.addClass("highcharts-point-" + a);
              if (!c.styledMode) {
                var q2 = f2.pointAttribs(this, a);
                var r3 = d(c.options.chart.animation, k2.animation);
                f2.options.inactiveOtherPoints && q2.opacity && ((this.dataLabels || []).forEach(function(a2) {
                  a2 && a2.animate({ opacity: q2.opacity }, r3);
                }), this.connector && this.connector.animate({ opacity: q2.opacity }, r3));
                this.graphic.animate(q2, r3);
              }
              v && this.graphic.animate(v, d(
                c.options.chart.animation,
                m2.animation,
                n.animation
              ));
              l && l.hide();
            } else {
              if (a && m2) {
                h2 = g.symbol || f2.symbol;
                l && l.currentSymbol !== h2 && (l = l.destroy());
                if (v)
                  if (l)
                    l[b2 ? "animate" : "attr"]({ x: v.x, y: v.y });
                  else
                    h2 && (f2.stateMarkerGraphic = l = c.renderer.symbol(h2, v.x, v.y, v.width, v.height).add(f2.markerGroup), l.currentSymbol = h2);
                !c.styledMode && l && l.attr(f2.pointAttribs(this, a));
              }
              l && (l[a && this.isInside ? "show" : "hide"](), l.element.point = this);
            }
            a = k2.halo;
            k2 = (l = this.graphic || l) && l.visibility || "inherit";
            a && a.size && l && "hidden" !== k2 && !this.isCluster ? (p2 || (f2.halo = p2 = c.renderer.path().add(l.parentGroup)), p2.show()[b2 ? "animate" : "attr"]({ d: this.haloPath(a.size) }), p2.attr({ "class": "highcharts-halo highcharts-color-" + d(this.colorIndex, f2.colorIndex) + (this.className ? " " + this.className : ""), visibility: k2, zIndex: -1 }), p2.point = this, c.styledMode || p2.attr(w({ fill: this.color || f2.color, "fill-opacity": a.opacity }, a.attributes))) : p2 && p2.point && p2.point.haloPath && p2.animate({ d: p2.point.haloPath(0) }, null, p2.hide);
            L(this, "afterSetState");
          }
        },
        haloPath: function(a) {
          return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a);
        }
      });
      w(A.prototype, {
        onMouseOver: function() {
          var a = this.chart, b2 = a.hoverSeries;
          a.pointer.setHoverChartIndex();
          if (b2 && b2 !== this)
            b2.onMouseOut();
          this.options.events.mouseOver && L(this, "mouseOver");
          this.setState("hover");
          a.hoverSeries = this;
        },
        onMouseOut: function() {
          var a = this.options, b2 = this.chart, d2 = b2.tooltip, f2 = b2.hoverPoint;
          b2.hoverSeries = null;
          if (f2)
            f2.onMouseOut();
          this && a.events.mouseOut && L(this, "mouseOut");
          !d2 || this.stickyTracking || d2.shared && !this.noSharedTooltip || d2.hide();
          b2.series.forEach(function(a2) {
            a2.setState(
              "",
              true
            );
          });
        },
        setState: function(a, b2) {
          var f2 = this, h2 = f2.options, k2 = f2.graph, n = h2.inactiveOtherPoints, e2 = h2.states, m2 = h2.lineWidth, t2 = h2.opacity, l = d(e2[a || "normal"] && e2[a || "normal"].animation, f2.chart.options.chart.animation);
          h2 = 0;
          a = a || "";
          if (f2.state !== a && ([f2.group, f2.markerGroup, f2.dataLabelsGroup].forEach(function(b3) {
            b3 && (f2.state && b3.removeClass("highcharts-series-" + f2.state), a && b3.addClass("highcharts-series-" + a));
          }), f2.state = a, !f2.chart.styledMode)) {
            if (e2[a] && false === e2[a].enabled)
              return;
            a && (m2 = e2[a].lineWidth || m2 + (e2[a].lineWidthPlus || 0), t2 = d(e2[a].opacity, t2));
            if (k2 && !k2.dashstyle)
              for (e2 = { "stroke-width": m2 }, k2.animate(e2, l); f2["zone-graph-" + h2]; )
                f2["zone-graph-" + h2].attr(e2), h2 += 1;
            n || [f2.group, f2.markerGroup, f2.dataLabelsGroup, f2.labelBySeries].forEach(function(a2) {
              a2 && a2.animate({ opacity: t2 }, l);
            });
          }
          b2 && n && f2.points && f2.setAllPointsToState(a);
        },
        setAllPointsToState: function(a) {
          this.points.forEach(function(b2) {
            b2.setState && b2.setState(a);
          });
        },
        setVisible: function(a, b2) {
          var d2 = this, f2 = d2.chart, h2 = d2.legendItem, n = f2.options.chart.ignoreHiddenSeries, k2 = d2.visible;
          var e2 = (d2.visible = a = d2.options.visible = d2.userOptions.visible = "undefined" === typeof a ? !k2 : a) ? "show" : "hide";
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(a2) {
            if (d2[a2])
              d2[a2][e2]();
          });
          if (f2.hoverSeries === d2 || (f2.hoverPoint && f2.hoverPoint.series) === d2)
            d2.onMouseOut();
          h2 && f2.legend.colorizeItem(d2, a);
          d2.isDirty = true;
          d2.options.stacking && f2.series.forEach(function(a2) {
            a2.options.stacking && a2.visible && (a2.isDirty = true);
          });
          d2.linkedSeries.forEach(function(b3) {
            b3.setVisible(a, false);
          });
          n && (f2.isDirtyBox = true);
          L(d2, e2);
          false !== b2 && f2.redraw();
        },
        show: function() {
          this.setVisible(true);
        },
        hide: function() {
          this.setVisible(false);
        },
        select: function(a) {
          this.selected = a = this.options.selected = "undefined" === typeof a ? !this.selected : a;
          this.checkbox && (this.checkbox.checked = a);
          L(this, a ? "select" : "unselect");
        },
        drawTracker: f.drawTrackerGraph
      });
    });
    N(r, "parts/Responsive.js", [r["parts/Chart.js"], r["parts/Utilities.js"]], function(q, e) {
      var r2 = e.find, A = e.isArray, D = e.isObject, F = e.merge, K = e.objectEach, C = e.pick, m = e.splat, H = e.uniqueKey;
      q.prototype.setResponsive = function(e2, m2) {
        var q2 = this.options.responsive, x = [], p = this.currentResponsive;
        !m2 && q2 && q2.rules && q2.rules.forEach(function(e3) {
          "undefined" === typeof e3._id && (e3._id = H());
          this.matchResponsiveRule(e3, x);
        }, this);
        m2 = F.apply(0, x.map(function(e3) {
          return r2(q2.rules, function(m3) {
            return m3._id === e3;
          }).chartOptions;
        }));
        m2.isResponsiveOptions = true;
        x = x.toString() || void 0;
        x !== (p && p.ruleIds) && (p && this.update(p.undoOptions, e2, true), x ? (p = this.currentOptions(m2), p.isResponsiveOptions = true, this.currentResponsive = { ruleIds: x, mergedOptions: m2, undoOptions: p }, this.update(
          m2,
          e2,
          true
        )) : this.currentResponsive = void 0);
      };
      q.prototype.matchResponsiveRule = function(e2, m2) {
        var q2 = e2.condition;
        (q2.callback || function() {
          return this.chartWidth <= C(q2.maxWidth, Number.MAX_VALUE) && this.chartHeight <= C(q2.maxHeight, Number.MAX_VALUE) && this.chartWidth >= C(q2.minWidth, 0) && this.chartHeight >= C(q2.minHeight, 0);
        }).call(this) && m2.push(e2._id);
      };
      q.prototype.currentOptions = function(e2) {
        function q2(e3, u, y, k) {
          var h;
          K(e3, function(d, e4) {
            if (!k && -1 < r3.collectionsWithUpdate.indexOf(e4))
              for (d = m(d), y[e4] = [], h = 0; h < Math.max(
                d.length,
                u[e4].length
              ); h++)
                u[e4][h] && (void 0 === d[h] ? y[e4][h] = u[e4][h] : (y[e4][h] = {}, q2(d[h], u[e4][h], y[e4][h], k + 1)));
            else
              D(d) ? (y[e4] = A(d) ? [] : {}, q2(d, u[e4] || {}, y[e4], k + 1)) : y[e4] = "undefined" === typeof u[e4] ? null : u[e4];
          });
        }
        var r3 = this, x = {};
        q2(e2, this.options, x, 0);
        return x;
      };
    });
    N(r, "masters/highcharts.src.js", [r["parts/Globals.js"]], function(q) {
      return q;
    });
    N(r, "parts/NavigatorAxis.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function(q, e) {
      var r2 = q.isTouchDevice, A = e.addEvent, D = e.correctFloat, F = e.defined, K = e.isNumber, C = e.pick, m = function() {
        function e2(e3) {
          this.axis = e3;
        }
        e2.prototype.destroy = function() {
          this.axis = void 0;
        };
        e2.prototype.toFixedRange = function(e3, m2, q2, r3) {
          var p = this.axis, u = p.chart;
          u = u && u.fixedRange;
          var y = (p.pointRange || 0) / 2;
          e3 = C(q2, p.translate(e3, true, !p.horiz));
          m2 = C(r3, p.translate(m2, true, !p.horiz));
          p = u && (m2 - e3) / u;
          F(q2) || (e3 = D(e3 + y));
          F(r3) || (m2 = D(m2 - y));
          0.7 < p && 1.3 > p && (r3 ? e3 = m2 - u : m2 = e3 + u);
          K(e3) && K(m2) || (e3 = m2 = void 0);
          return { min: e3, max: m2 };
        };
        return e2;
      }();
      return function() {
        function e2() {
        }
        e2.compose = function(e3) {
          e3.keepProps.push("navigatorAxis");
          A(e3, "init", function() {
            this.navigatorAxis || (this.navigatorAxis = new m(this));
          });
          A(e3, "zoom", function(e4) {
            var m2 = this.chart.options, q2 = m2.navigator, p = this.navigatorAxis, u = m2.chart.pinchType, y = m2.rangeSelector;
            m2 = m2.chart.zoomType;
            this.isXAxis && (q2 && q2.enabled || y && y.enabled) && ("y" === m2 ? e4.zoomed = false : (!r2 && "xy" === m2 || r2 && "xy" === u) && this.options.range && (q2 = p.previousZoom, F(e4.newMin) ? p.previousZoom = [this.min, this.max] : q2 && (e4.newMin = q2[0], e4.newMax = q2[1], p.previousZoom = void 0)));
            "undefined" !== typeof e4.zoomed && e4.preventDefault();
          });
        };
        e2.AdditionsClass = m;
        return e2;
      }();
    });
    N(
      r,
      "parts/ScrollbarAxis.js",
      [r["parts/Globals.js"], r["parts/Utilities.js"]],
      function(q, e) {
        var r2 = e.addEvent, A = e.defined, D = e.pick;
        return function() {
          function e2() {
          }
          e2.compose = function(e3, C) {
            r2(e3, "afterInit", function() {
              var e4 = this;
              e4.options && e4.options.scrollbar && e4.options.scrollbar.enabled && (e4.options.scrollbar.vertical = !e4.horiz, e4.options.startOnTick = e4.options.endOnTick = false, e4.scrollbar = new C(e4.chart.renderer, e4.options.scrollbar, e4.chart), r2(e4.scrollbar, "changed", function(m) {
                var r3 = D(e4.options && e4.options.min, e4.min), w = D(e4.options && e4.options.max, e4.max), C2 = A(e4.dataMin) ? Math.min(r3, e4.min, e4.dataMin) : r3, x = (A(e4.dataMax) ? Math.max(w, e4.max, e4.dataMax) : w) - C2;
                A(r3) && A(w) && (e4.horiz && !e4.reversed || !e4.horiz && e4.reversed ? (r3 = C2 + x * this.to, C2 += x * this.from) : (r3 = C2 + x * (1 - this.from), C2 += x * (1 - this.to)), D(this.options.liveRedraw, q.svg && !q.isTouchDevice && !this.chart.isBoosting) || "mouseup" === m.DOMType || !A(m.DOMType) ? e4.setExtremes(C2, r3, true, "mousemove" !== m.DOMType, m) : this.setRange(this.from, this.to));
              }));
            });
            r2(e3, "afterRender", function() {
              var e4 = Math.min(D(
                this.options.min,
                this.min
              ), this.min, D(this.dataMin, this.min)), q2 = Math.max(D(this.options.max, this.max), this.max, D(this.dataMax, this.max)), r3 = this.scrollbar, w = this.axisTitleMargin + (this.titleOffset || 0), C2 = this.chart.scrollbarsOffsets, x = this.options.margin || 0;
              r3 && (this.horiz ? (this.opposite || (C2[1] += w), r3.position(this.left, this.top + this.height + 2 + C2[1] - (this.opposite ? x : 0), this.width, this.height), this.opposite || (C2[1] += x), w = 1) : (this.opposite && (C2[0] += w), r3.position(
                this.left + this.width + 2 + C2[0] - (this.opposite ? 0 : x),
                this.top,
                this.width,
                this.height
              ), this.opposite && (C2[0] += x), w = 0), C2[w] += r3.size + r3.options.margin, isNaN(e4) || isNaN(q2) || !A(this.min) || !A(this.max) || this.min === this.max ? r3.setRange(0, 1) : (C2 = (this.min - e4) / (q2 - e4), e4 = (this.max - e4) / (q2 - e4), this.horiz && !this.reversed || !this.horiz && this.reversed ? r3.setRange(C2, e4) : r3.setRange(1 - e4, 1 - C2)));
            });
            r2(e3, "afterGetOffset", function() {
              var e4 = this.horiz ? 2 : 1, q2 = this.scrollbar;
              q2 && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[e4] += q2.size + q2.options.margin);
            });
          };
          return e2;
        }();
      }
    );
    N(r, "parts/Scrollbar.js", [
      r["parts/Axis.js"],
      r["parts/Globals.js"],
      r["parts/ScrollbarAxis.js"],
      r["parts/Utilities.js"],
      r["parts/Options.js"]
    ], function(q, e, r2, A, D) {
      var F = A.addEvent, K = A.correctFloat, C = A.defined, m = A.destroyObjectProperties, H = A.fireEvent, M = A.merge, w = A.pick, L = A.removeEvent;
      A = D.defaultOptions;
      var x = e.hasTouch, p = e.isTouchDevice, u = e.swapXY = function(e2, k) {
        k && e2.forEach(function(h) {
          for (var d = h.length, e3, b = 0; b < d; b += 2)
            e3 = h[b + 1], "number" === typeof e3 && (h[b + 1] = h[b + 2], h[b + 2] = e3);
        });
        return e2;
      };
      D = function() {
        function e2(e3, h, d) {
          this._events = [];
          this.from = this.chartY = this.chartX = 0;
          this.scrollbar = this.group = void 0;
          this.scrollbarButtons = [];
          this.scrollbarGroup = void 0;
          this.scrollbarLeft = 0;
          this.scrollbarRifles = void 0;
          this.scrollbarStrokeWidth = 1;
          this.to = this.size = this.scrollbarTop = 0;
          this.track = void 0;
          this.trackBorderWidth = 1;
          this.userOptions = {};
          this.y = this.x = 0;
          this.chart = d;
          this.options = h;
          this.renderer = d.renderer;
          this.init(e3, h, d);
        }
        e2.prototype.addEvents = function() {
          var e3 = this.options.inverted ? [1, 0] : [0, 1], h = this.scrollbarButtons, d = this.scrollbarGroup.element, m2 = this.track.element, b = this.mouseDownHandler.bind(this), f = this.mouseMoveHandler.bind(this), a = this.mouseUpHandler.bind(this);
          e3 = [[h[e3[0]].element, "click", this.buttonToMinClick.bind(this)], [h[e3[1]].element, "click", this.buttonToMaxClick.bind(this)], [m2, "click", this.trackClick.bind(this)], [d, "mousedown", b], [d.ownerDocument, "mousemove", f], [d.ownerDocument, "mouseup", a]];
          x && e3.push([d, "touchstart", b], [d.ownerDocument, "touchmove", f], [d.ownerDocument, "touchend", a]);
          e3.forEach(function(a2) {
            F.apply(null, a2);
          });
          this._events = e3;
        };
        e2.prototype.buttonToMaxClick = function(e3) {
          var h = (this.to - this.from) * w(this.options.step, 0.2);
          this.updatePosition(this.from + h, this.to + h);
          H(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: e3 });
        };
        e2.prototype.buttonToMinClick = function(e3) {
          var h = K(this.to - this.from) * w(this.options.step, 0.2);
          this.updatePosition(K(this.from - h), K(this.to - h));
          H(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: e3 });
        };
        e2.prototype.cursorToScrollbarPosition = function(e3) {
          var h = this.options;
          h = h.minWidth > this.calculatedWidth ? h.minWidth : 0;
          return { chartX: (e3.chartX - this.x - this.xOffset) / (this.barWidth - h), chartY: (e3.chartY - this.y - this.yOffset) / (this.barWidth - h) };
        };
        e2.prototype.destroy = function() {
          var e3 = this.chart.scroller;
          this.removeEvents();
          ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function(h) {
            this[h] && this[h].destroy && (this[h] = this[h].destroy());
          }, this);
          e3 && this === e3.scrollbar && (e3.scrollbar = null, m(e3.scrollbarButtons));
        };
        e2.prototype.drawScrollbarButton = function(e3) {
          var h = this.renderer, d = this.scrollbarButtons, k = this.options, b = this.size;
          var f = h.g().add(this.group);
          d.push(f);
          f = h.rect().addClass("highcharts-scrollbar-button").add(f);
          this.chart.styledMode || f.attr({ stroke: k.buttonBorderColor, "stroke-width": k.buttonBorderWidth, fill: k.buttonBackgroundColor });
          f.attr(f.crisp({ x: -0.5, y: -0.5, width: b + 1, height: b + 1, r: k.buttonBorderRadius }, f.strokeWidth()));
          f = h.path(u([["M", b / 2 + (e3 ? -1 : 1), b / 2 - 3], ["L", b / 2 + (e3 ? -1 : 1), b / 2 + 3], ["L", b / 2 + (e3 ? 2 : -2), b / 2]], k.vertical)).addClass("highcharts-scrollbar-arrow").add(d[e3]);
          this.chart.styledMode || f.attr({ fill: k.buttonArrowColor });
        };
        e2.prototype.init = function(k, h, d) {
          this.scrollbarButtons = [];
          this.renderer = k;
          this.userOptions = h;
          this.options = M(e2.defaultOptions, h);
          this.chart = d;
          this.size = w(this.options.size, this.options.height);
          h.enabled && (this.render(), this.addEvents());
        };
        e2.prototype.mouseDownHandler = function(e3) {
          e3 = this.chart.pointer.normalize(e3);
          e3 = this.cursorToScrollbarPosition(e3);
          this.chartX = e3.chartX;
          this.chartY = e3.chartY;
          this.initPositions = [this.from, this.to];
          this.grabbedCenter = true;
        };
        e2.prototype.mouseMoveHandler = function(e3) {
          var h = this.chart.pointer.normalize(e3), d = this.options.vertical ? "chartY" : "chartX", k = this.initPositions || [];
          !this.grabbedCenter || e3.touches && 0 === e3.touches[0][d] || (h = this.cursorToScrollbarPosition(h)[d], d = this[d], d = h - d, this.hasDragged = true, this.updatePosition(k[0] + d, k[1] + d), this.hasDragged && H(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMType: e3.type, DOMEvent: e3 }));
        };
        e2.prototype.mouseUpHandler = function(e3) {
          this.hasDragged && H(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMType: e3.type,
            DOMEvent: e3
          });
          this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null;
        };
        e2.prototype.position = function(e3, h, d, m2) {
          var b = this.options.vertical, f = 0, a = this.rendered ? "animate" : "attr";
          this.x = e3;
          this.y = h + this.trackBorderWidth;
          this.width = d;
          this.xOffset = this.height = m2;
          this.yOffset = f;
          b ? (this.width = this.yOffset = d = f = this.size, this.xOffset = h = 0, this.barWidth = m2 - 2 * d, this.x = e3 += this.options.margin) : (this.height = this.xOffset = m2 = h = this.size, this.barWidth = d - 2 * m2, this.y += this.options.margin);
          this.group[a]({ translateX: e3, translateY: this.y });
          this.track[a]({ width: d, height: m2 });
          this.scrollbarButtons[1][a]({ translateX: b ? 0 : d - h, translateY: b ? m2 - f : 0 });
        };
        e2.prototype.removeEvents = function() {
          this._events.forEach(function(e3) {
            L.apply(null, e3);
          });
          this._events.length = 0;
        };
        e2.prototype.render = function() {
          var e3 = this.renderer, h = this.options, d = this.size, m2 = this.chart.styledMode, b;
          this.group = b = e3.g("scrollbar").attr({ zIndex: h.zIndex, translateY: -99999 }).add();
          this.track = e3.rect().addClass("highcharts-scrollbar-track").attr({
            x: 0,
            r: h.trackBorderRadius || 0,
            height: d,
            width: d
          }).add(b);
          m2 || this.track.attr({ fill: h.trackBackgroundColor, stroke: h.trackBorderColor, "stroke-width": h.trackBorderWidth });
          this.trackBorderWidth = this.track.strokeWidth();
          this.track.attr({ y: -this.trackBorderWidth % 2 / 2 });
          this.scrollbarGroup = e3.g().add(b);
          this.scrollbar = e3.rect().addClass("highcharts-scrollbar-thumb").attr({ height: d, width: d, r: h.barBorderRadius || 0 }).add(this.scrollbarGroup);
          this.scrollbarRifles = e3.path(u([["M", -3, d / 4], ["L", -3, 2 * d / 3], ["M", 0, d / 4], [
            "L",
            0,
            2 * d / 3
          ], ["M", 3, d / 4], ["L", 3, 2 * d / 3]], h.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
          m2 || (this.scrollbar.attr({ fill: h.barBackgroundColor, stroke: h.barBorderColor, "stroke-width": h.barBorderWidth }), this.scrollbarRifles.attr({ stroke: h.rifleColor, "stroke-width": 1 }));
          this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
          this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
          this.drawScrollbarButton(0);
          this.drawScrollbarButton(1);
        };
        e2.prototype.setRange = function(e3, h) {
          var d = this.options, k = d.vertical, b = d.minWidth, f = this.barWidth, a, m2 = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ? "attr" : "animate";
          if (C(f)) {
            e3 = Math.max(e3, 0);
            var p2 = Math.ceil(f * e3);
            this.calculatedWidth = a = K(f * Math.min(h, 1) - p2);
            a < b && (p2 = (f - b + a) * e3, a = b);
            b = Math.floor(p2 + this.xOffset + this.yOffset);
            f = a / 2 - 0.5;
            this.from = e3;
            this.to = h;
            k ? (this.scrollbarGroup[m2]({ translateY: b }), this.scrollbar[m2]({ height: a }), this.scrollbarRifles[m2]({ translateY: f }), this.scrollbarTop = b, this.scrollbarLeft = 0) : (this.scrollbarGroup[m2]({ translateX: b }), this.scrollbar[m2]({ width: a }), this.scrollbarRifles[m2]({ translateX: f }), this.scrollbarLeft = b, this.scrollbarTop = 0);
            12 >= a ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(true);
            false === d.showFull && (0 >= e3 && 1 <= h ? this.group.hide() : this.group.show());
            this.rendered = true;
          }
        };
        e2.prototype.trackClick = function(e3) {
          var h = this.chart.pointer.normalize(e3), d = this.to - this.from, k = this.y + this.scrollbarTop, b = this.x + this.scrollbarLeft;
          this.options.vertical && h.chartY > k || !this.options.vertical && h.chartX > b ? this.updatePosition(this.from + d, this.to + d) : this.updatePosition(this.from - d, this.to - d);
          H(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: e3 });
        };
        e2.prototype.update = function(e3) {
          this.destroy();
          this.init(this.chart.renderer, M(true, this.options, e3), this.chart);
        };
        e2.prototype.updatePosition = function(e3, h) {
          1 < h && (e3 = K(1 - K(h - e3)), h = 1);
          0 > e3 && (h = K(h - e3), e3 = 0);
          this.from = e3;
          this.to = h;
        };
        e2.defaultOptions = {
          height: p ? 20 : 14,
          barBorderRadius: 0,
          buttonBorderRadius: 0,
          liveRedraw: void 0,
          margin: 10,
          minWidth: 6,
          step: 0.2,
          zIndex: 3,
          barBackgroundColor: "#cccccc",
          barBorderWidth: 1,
          barBorderColor: "#cccccc",
          buttonArrowColor: "#333333",
          buttonBackgroundColor: "#e6e6e6",
          buttonBorderColor: "#cccccc",
          buttonBorderWidth: 1,
          rifleColor: "#333333",
          trackBackgroundColor: "#f2f2f2",
          trackBorderColor: "#f2f2f2",
          trackBorderWidth: 1
        };
        return e2;
      }();
      e.Scrollbar || (A.scrollbar = M(true, D.defaultOptions, A.scrollbar), e.Scrollbar = D, r2.compose(q, D));
      return e.Scrollbar;
    });
    N(r, "parts/Navigator.js", [
      r["parts/Axis.js"],
      r["parts/Chart.js"],
      r["parts/Color.js"],
      r["parts/Globals.js"],
      r["parts/NavigatorAxis.js"],
      r["parts/Options.js"],
      r["parts/Scrollbar.js"],
      r["parts/Utilities.js"]
    ], function(q, e, r2, A, D, F, K, C) {
      r2 = r2.parse;
      var m = F.defaultOptions, H = C.addEvent, M = C.clamp, w = C.correctFloat, L = C.defined, x = C.destroyObjectProperties, p = C.erase, u = C.extend, y = C.find, k = C.isArray, h = C.isNumber, d = C.merge, t = C.pick, b = C.removeEvent, f = C.splat, a = A.hasTouch, v = A.isTouchDevice;
      F = A.Series;
      var E = function(a2) {
        for (var b2 = [], d2 = 1; d2 < arguments.length; d2++)
          b2[d2 - 1] = arguments[d2];
        b2 = [].filter.call(b2, h);
        if (b2.length)
          return Math[a2].apply(0, b2);
      };
      C = "undefined" === typeof A.seriesTypes.areaspline ? "line" : "areaspline";
      u(m, { navigator: { height: 40, margin: 25, maskInside: true, handles: { width: 7, height: 15, symbols: ["navigator-handle", "navigator-handle"], enabled: true, lineWidth: 1, backgroundColor: "#f2f2f2", borderColor: "#999999" }, maskFill: r2("#6685c2").setOpacity(0.3).get(), outlineColor: "#cccccc", outlineWidth: 1, series: { type: C, fillOpacity: 0.05, lineWidth: 1, compare: null, dataGrouping: {
        approximation: "average",
        enabled: true,
        groupPixelWidth: 2,
        smoothed: true,
        units: [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2, 3, 4]], ["week", [1, 2, 3]], ["month", [1, 3, 6]], ["year", null]]
      }, dataLabels: { enabled: false, zIndex: 2 }, id: "highcharts-navigator-series", className: "highcharts-navigator-series", lineColor: null, marker: { enabled: false }, threshold: null }, xAxis: {
        overscroll: 0,
        className: "highcharts-navigator-xaxis",
        tickLength: 0,
        lineWidth: 0,
        gridLineColor: "#e6e6e6",
        gridLineWidth: 1,
        tickPixelInterval: 200,
        labels: { align: "left", style: { color: "#999999" }, x: 3, y: -4 },
        crosshair: false
      }, yAxis: { className: "highcharts-navigator-yaxis", gridLineWidth: 0, startOnTick: false, endOnTick: false, minPadding: 0.1, maxPadding: 0.1, labels: { enabled: false }, crosshair: false, title: { text: null }, tickLength: 0, tickWidth: 0 } } });
      A.Renderer.prototype.symbols["navigator-handle"] = function(a2, b2, d2, f2, h2) {
        a2 = (h2 && h2.width || 0) / 2;
        b2 = Math.round(a2 / 3) + 0.5;
        h2 = h2 && h2.height || 0;
        return [["M", -a2 - 1, 0.5], ["L", a2, 0.5], ["L", a2, h2 + 0.5], ["L", -a2 - 1, h2 + 0.5], ["L", -a2 - 1, 0.5], ["M", -b2, 4], ["L", -b2, h2 - 3], ["M", b2 - 1, 4], ["L", b2 - 1, h2 - 3]];
      };
      var J = function() {
        function e2(a2) {
          this.zoomedMin = this.zoomedMax = this.yAxis = this.xAxis = this.top = this.size = this.shades = this.rendered = this.range = this.outlineHeight = this.outline = this.opposite = this.navigatorSize = this.navigatorSeries = this.navigatorOptions = this.navigatorGroup = this.navigatorEnabled = this.left = this.height = this.handles = this.chart = this.baseSeries = void 0;
          this.init(a2);
        }
        e2.prototype.drawHandle = function(a2, b2, d2, f2) {
          var h2 = this.navigatorOptions.handles.height;
          this.handles[b2][f2](d2 ? { translateX: Math.round(this.left + this.height / 2), translateY: Math.round(this.top + parseInt(a2, 10) + 0.5 - h2) } : { translateX: Math.round(this.left + parseInt(a2, 10)), translateY: Math.round(this.top + this.height / 2 - h2 / 2 - 1) });
        };
        e2.prototype.drawOutline = function(a2, b2, d2, f2) {
          var h2 = this.navigatorOptions.maskInside, g = this.outline.strokeWidth(), c = g / 2, e3 = g % 2 / 2;
          g = this.outlineHeight;
          var n = this.scrollbarHeight || 0, k2 = this.size, m2 = this.left - n, p2 = this.top;
          d2 ? (m2 -= c, d2 = p2 + b2 + e3, b2 = p2 + a2 + e3, e3 = [
            ["M", m2 + g, p2 - n - e3],
            ["L", m2 + g, d2],
            ["L", m2, d2],
            ["L", m2, b2],
            ["L", m2 + g, b2],
            ["L", m2 + g, p2 + k2 + n]
          ], h2 && e3.push(["M", m2 + g, d2 - c], ["L", m2 + g, b2 + c])) : (a2 += m2 + n - e3, b2 += m2 + n - e3, p2 += c, e3 = [["M", m2, p2], ["L", a2, p2], ["L", a2, p2 + g], ["L", b2, p2 + g], ["L", b2, p2], ["L", m2 + k2 + 2 * n, p2]], h2 && e3.push(["M", a2 - c, p2], ["L", b2 + c, p2]));
          this.outline[f2]({ d: e3 });
        };
        e2.prototype.drawMasks = function(a2, b2, d2, f2) {
          var h2 = this.left, g = this.top, c = this.height;
          if (d2) {
            var e3 = [h2, h2, h2];
            var n = [g, g + a2, g + b2];
            var k2 = [c, c, c];
            var m2 = [a2, b2 - a2, this.size - b2];
          } else
            e3 = [h2, h2 + a2, h2 + b2], n = [g, g, g], k2 = [a2, b2 - a2, this.size - b2], m2 = [c, c, c];
          this.shades.forEach(function(a3, b3) {
            a3[f2]({
              x: e3[b3],
              y: n[b3],
              width: k2[b3],
              height: m2[b3]
            });
          });
        };
        e2.prototype.renderElements = function() {
          var a2 = this, b2 = a2.navigatorOptions, d2 = b2.maskInside, f2 = a2.chart, h2 = f2.renderer, g, c = { cursor: f2.inverted ? "ns-resize" : "ew-resize" };
          a2.navigatorGroup = g = h2.g("navigator").attr({ zIndex: 8, visibility: "hidden" }).add();
          [!d2, d2, !d2].forEach(function(d3, e3) {
            a2.shades[e3] = h2.rect().addClass("highcharts-navigator-mask" + (1 === e3 ? "-inside" : "-outside")).add(g);
            f2.styledMode || a2.shades[e3].attr({ fill: d3 ? b2.maskFill : "rgba(0,0,0,0)" }).css(1 === e3 && c);
          });
          a2.outline = h2.path().addClass("highcharts-navigator-outline").add(g);
          f2.styledMode || a2.outline.attr({ "stroke-width": b2.outlineWidth, stroke: b2.outlineColor });
          b2.handles.enabled && [0, 1].forEach(function(d3) {
            b2.handles.inverted = f2.inverted;
            a2.handles[d3] = h2.symbol(b2.handles.symbols[d3], -b2.handles.width / 2 - 1, 0, b2.handles.width, b2.handles.height, b2.handles);
            a2.handles[d3].attr({ zIndex: 7 - d3 }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][d3]).add(g);
            if (!f2.styledMode) {
              var e3 = b2.handles;
              a2.handles[d3].attr({ fill: e3.backgroundColor, stroke: e3.borderColor, "stroke-width": e3.lineWidth }).css(c);
            }
          });
        };
        e2.prototype.update = function(a2) {
          (this.series || []).forEach(function(a3) {
            a3.baseSeries && delete a3.baseSeries.navigatorSeries;
          });
          this.destroy();
          d(true, this.chart.options.navigator, this.options, a2);
          this.init(this.chart);
        };
        e2.prototype.render = function(a2, b2, d2, f2) {
          var e3 = this.chart, g = this.scrollbarHeight, c, n = this.xAxis, k2 = n.pointRange || 0;
          var m2 = n.navigatorAxis.fake ? e3.xAxis[0] : n;
          var p2 = this.navigatorEnabled, v2, q2 = this.rendered;
          var u2 = e3.inverted;
          var r3 = e3.xAxis[0].minRange, z = e3.xAxis[0].options.maxRange;
          if (!this.hasDragged || L(d2)) {
            a2 = w(a2 - k2 / 2);
            b2 = w(b2 + k2 / 2);
            if (!h(a2) || !h(b2))
              if (q2)
                d2 = 0, f2 = t(n.width, m2.width);
              else
                return;
            this.left = t(n.left, e3.plotLeft + g + (u2 ? e3.plotWidth : 0));
            this.size = v2 = c = t(n.len, (u2 ? e3.plotHeight : e3.plotWidth) - 2 * g);
            e3 = u2 ? g : c + 2 * g;
            d2 = t(d2, n.toPixels(a2, true));
            f2 = t(f2, n.toPixels(b2, true));
            h(d2) && Infinity !== Math.abs(d2) || (d2 = 0, f2 = e3);
            a2 = n.toValue(d2, true);
            b2 = n.toValue(f2, true);
            var B = Math.abs(w(b2 - a2));
            B < r3 ? this.grabbedLeft ? d2 = n.toPixels(b2 - r3 - k2, true) : this.grabbedRight && (f2 = n.toPixels(a2 + r3 + k2, true)) : L(z) && w(B - k2) > z && (this.grabbedLeft ? d2 = n.toPixels(b2 - z - k2, true) : this.grabbedRight && (f2 = n.toPixels(a2 + z + k2, true)));
            this.zoomedMax = M(Math.max(d2, f2), 0, v2);
            this.zoomedMin = M(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(d2, f2), 0, v2);
            this.range = this.zoomedMax - this.zoomedMin;
            v2 = Math.round(this.zoomedMax);
            d2 = Math.round(this.zoomedMin);
            p2 && (this.navigatorGroup.attr({ visibility: "visible" }), q2 = q2 && !this.hasDragged ? "animate" : "attr", this.drawMasks(d2, v2, u2, q2), this.drawOutline(d2, v2, u2, q2), this.navigatorOptions.handles.enabled && (this.drawHandle(d2, 0, u2, q2), this.drawHandle(v2, 1, u2, q2)));
            this.scrollbar && (u2 ? (u2 = this.top - g, m2 = this.left - g + (p2 || !m2.opposite ? 0 : (m2.titleOffset || 0) + m2.axisTitleMargin), g = c + 2 * g) : (u2 = this.top + (p2 ? this.height : -g), m2 = this.left - g), this.scrollbar.position(m2, u2, e3, g), this.scrollbar.setRange(this.zoomedMin / (c || 1), this.zoomedMax / (c || 1)));
            this.rendered = true;
          }
        };
        e2.prototype.addMouseEvents = function() {
          var b2 = this, d2 = b2.chart, f2 = d2.container, e3 = [], h2, g;
          b2.mouseMoveHandler = h2 = function(a2) {
            b2.onMouseMove(a2);
          };
          b2.mouseUpHandler = g = function(a2) {
            b2.onMouseUp(a2);
          };
          e3 = b2.getPartsEvents("mousedown");
          e3.push(H(d2.renderTo, "mousemove", h2), H(
            f2.ownerDocument,
            "mouseup",
            g
          ));
          a && (e3.push(H(d2.renderTo, "touchmove", h2), H(f2.ownerDocument, "touchend", g)), e3.concat(b2.getPartsEvents("touchstart")));
          b2.eventsToUnbind = e3;
          b2.series && b2.series[0] && e3.push(H(b2.series[0].xAxis, "foundExtremes", function() {
            d2.navigator.modifyNavigatorAxisExtremes();
          }));
        };
        e2.prototype.getPartsEvents = function(a2) {
          var b2 = this, d2 = [];
          ["shades", "handles"].forEach(function(f2) {
            b2[f2].forEach(function(e3, g) {
              d2.push(H(e3.element, a2, function(a3) {
                b2[f2 + "Mousedown"](a3, g);
              }));
            });
          });
          return d2;
        };
        e2.prototype.shadesMousedown = function(a2, b2) {
          a2 = this.chart.pointer.normalize(a2);
          var d2 = this.chart, f2 = this.xAxis, e3 = this.zoomedMin, g = this.left, c = this.size, h2 = this.range, n = a2.chartX;
          d2.inverted && (n = a2.chartY, g = this.top);
          if (1 === b2)
            this.grabbedCenter = n, this.fixedWidth = h2, this.dragOffset = n - e3;
          else {
            a2 = n - g - h2 / 2;
            if (0 === b2)
              a2 = Math.max(0, a2);
            else if (2 === b2 && a2 + h2 >= c)
              if (a2 = c - h2, this.reversedExtremes) {
                a2 -= h2;
                var k2 = this.getUnionExtremes().dataMin;
              } else
                var m2 = this.getUnionExtremes().dataMax;
            a2 !== e3 && (this.fixedWidth = h2, b2 = f2.navigatorAxis.toFixedRange(a2, a2 + h2, k2, m2), L(b2.min) && d2.xAxis[0].setExtremes(Math.min(
              b2.min,
              b2.max
            ), Math.max(b2.min, b2.max), true, null, { trigger: "navigator" }));
          }
        };
        e2.prototype.handlesMousedown = function(a2, b2) {
          this.chart.pointer.normalize(a2);
          a2 = this.chart;
          var d2 = a2.xAxis[0], f2 = this.reversedExtremes;
          0 === b2 ? (this.grabbedLeft = true, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = f2 ? d2.min : d2.max) : (this.grabbedRight = true, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = f2 ? d2.max : d2.min);
          a2.fixedRange = null;
        };
        e2.prototype.onMouseMove = function(a2) {
          var b2 = this, d2 = b2.chart, f2 = b2.left, e3 = b2.navigatorSize, g = b2.range, c = b2.dragOffset, h2 = d2.inverted;
          a2.touches && 0 === a2.touches[0].pageX || (a2 = d2.pointer.normalize(a2), d2 = a2.chartX, h2 && (f2 = b2.top, d2 = a2.chartY), b2.grabbedLeft ? (b2.hasDragged = true, b2.render(0, 0, d2 - f2, b2.otherHandlePos)) : b2.grabbedRight ? (b2.hasDragged = true, b2.render(0, 0, b2.otherHandlePos, d2 - f2)) : b2.grabbedCenter && (b2.hasDragged = true, d2 < c ? d2 = c : d2 > e3 + c - g && (d2 = e3 + c - g), b2.render(0, 0, d2 - c, d2 - c + g)), b2.hasDragged && b2.scrollbar && t(b2.scrollbar.options.liveRedraw, A.svg && !v && !this.chart.isBoosting) && (a2.DOMType = a2.type, setTimeout(function() {
            b2.onMouseUp(a2);
          }, 0)));
        };
        e2.prototype.onMouseUp = function(a2) {
          var b2 = this.chart, d2 = this.xAxis, f2 = this.scrollbar, e3 = a2.DOMEvent || a2, g = b2.inverted, c = this.rendered && !this.hasDragged ? "animate" : "attr", h2 = Math.round(this.zoomedMax), n = Math.round(this.zoomedMin);
          if (this.hasDragged && (!f2 || !f2.hasDragged) || "scrollbar" === a2.trigger) {
            f2 = this.getUnionExtremes();
            if (this.zoomedMin === this.otherHandlePos)
              var k2 = this.fixedExtreme;
            else if (this.zoomedMax === this.otherHandlePos)
              var m2 = this.fixedExtreme;
            this.zoomedMax === this.size && (m2 = this.reversedExtremes ? f2.dataMin : f2.dataMax);
            0 === this.zoomedMin && (k2 = this.reversedExtremes ? f2.dataMax : f2.dataMin);
            d2 = d2.navigatorAxis.toFixedRange(this.zoomedMin, this.zoomedMax, k2, m2);
            L(d2.min) && b2.xAxis[0].setExtremes(Math.min(d2.min, d2.max), Math.max(d2.min, d2.max), true, this.hasDragged ? false : null, { trigger: "navigator", triggerOp: "navigator-drag", DOMEvent: e3 });
          }
          "mousemove" !== a2.DOMType && "touchmove" !== a2.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null);
          this.navigatorEnabled && (this.shades && this.drawMasks(n, h2, g, c), this.outline && this.drawOutline(n, h2, g, c), this.navigatorOptions.handles.enabled && Object.keys(this.handles).length === this.handles.length && (this.drawHandle(n, 0, g, c), this.drawHandle(h2, 1, g, c)));
        };
        e2.prototype.removeEvents = function() {
          this.eventsToUnbind && (this.eventsToUnbind.forEach(function(a2) {
            a2();
          }), this.eventsToUnbind = void 0);
          this.removeBaseSeriesEvents();
        };
        e2.prototype.removeBaseSeriesEvents = function() {
          var a2 = this.baseSeries || [];
          this.navigatorEnabled && a2[0] && (false !== this.navigatorOptions.adaptToUpdatedData && a2.forEach(function(a3) {
            b(a3, "updatedData", this.updatedDataHandler);
          }, this), a2[0].xAxis && b(a2[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
        };
        e2.prototype.init = function(a2) {
          var b2 = a2.options, f2 = b2.navigator, e3 = f2.enabled, h2 = b2.scrollbar, g = h2.enabled;
          b2 = e3 ? f2.height : 0;
          var c = g ? h2.height : 0;
          this.handles = [];
          this.shades = [];
          this.chart = a2;
          this.setBaseSeries();
          this.height = b2;
          this.scrollbarHeight = c;
          this.scrollbarEnabled = g;
          this.navigatorEnabled = e3;
          this.navigatorOptions = f2;
          this.scrollbarOptions = h2;
          this.outlineHeight = b2 + c;
          this.opposite = t(f2.opposite, !(e3 || !a2.inverted));
          var k2 = this;
          e3 = k2.baseSeries;
          h2 = a2.xAxis.length;
          g = a2.yAxis.length;
          var n = e3 && e3[0] && e3[0].xAxis || a2.xAxis[0] || { options: {} };
          a2.isDirtyBox = true;
          k2.navigatorEnabled ? (k2.xAxis = new q(a2, d({ breaks: n.options.breaks, ordinal: n.options.ordinal }, f2.xAxis, { id: "navigator-x-axis", yAxis: "navigator-y-axis", isX: true, type: "datetime", index: h2, isInternal: true, offset: 0, keepOrdinalPadding: true, startOnTick: false, endOnTick: false, minPadding: 0, maxPadding: 0, zoomEnabled: false }, a2.inverted ? { offsets: [c, 0, -c, 0], width: b2 } : { offsets: [
            0,
            -c,
            0,
            c
          ], height: b2 })), k2.yAxis = new q(a2, d(f2.yAxis, { id: "navigator-y-axis", alignTicks: false, offset: 0, index: g, isInternal: true, zoomEnabled: false }, a2.inverted ? { width: b2 } : { height: b2 })), e3 || f2.series.data ? k2.updateNavigatorSeries(false) : 0 === a2.series.length && (k2.unbindRedraw = H(a2, "beforeRedraw", function() {
            0 < a2.series.length && !k2.series && (k2.setBaseSeries(), k2.unbindRedraw());
          })), k2.reversedExtremes = a2.inverted && !k2.xAxis.reversed || !a2.inverted && k2.xAxis.reversed, k2.renderElements(), k2.addMouseEvents()) : (k2.xAxis = {
            chart: a2,
            navigatorAxis: { fake: true },
            translate: function(b3, d2) {
              var f3 = a2.xAxis[0], g2 = f3.getExtremes(), e4 = f3.len - 2 * c, h3 = E("min", f3.options.min, g2.dataMin);
              f3 = E("max", f3.options.max, g2.dataMax) - h3;
              return d2 ? b3 * f3 / e4 + h3 : e4 * (b3 - h3) / f3;
            },
            toPixels: function(a3) {
              return this.translate(a3);
            },
            toValue: function(a3) {
              return this.translate(a3, true);
            }
          }, k2.xAxis.navigatorAxis.axis = k2.xAxis, k2.xAxis.navigatorAxis.toFixedRange = D.AdditionsClass.prototype.toFixedRange.bind(k2.xAxis.navigatorAxis));
          a2.options.scrollbar.enabled && (a2.scrollbar = k2.scrollbar = new K(a2.renderer, d(a2.options.scrollbar, { margin: k2.navigatorEnabled ? 0 : 10, vertical: a2.inverted }), a2), H(k2.scrollbar, "changed", function(b3) {
            var c2 = k2.size, d2 = c2 * this.to;
            c2 *= this.from;
            k2.hasDragged = k2.scrollbar.hasDragged;
            k2.render(0, 0, c2, d2);
            (a2.options.scrollbar.liveRedraw || "mousemove" !== b3.DOMType && "touchmove" !== b3.DOMType) && setTimeout(function() {
              k2.onMouseUp(b3);
            });
          }));
          k2.addBaseSeriesEvents();
          k2.addChartEvents();
        };
        e2.prototype.getUnionExtremes = function(a2) {
          var b2 = this.chart.xAxis[0], d2 = this.xAxis, f2 = d2.options, e3 = b2.options, g;
          a2 && null === b2.dataMin || (g = { dataMin: t(f2 && f2.min, E(
            "min",
            e3.min,
            b2.dataMin,
            d2.dataMin,
            d2.min
          )), dataMax: t(f2 && f2.max, E("max", e3.max, b2.dataMax, d2.dataMax, d2.max)) });
          return g;
        };
        e2.prototype.setBaseSeries = function(a2, b2) {
          var d2 = this.chart, f2 = this.baseSeries = [];
          a2 = a2 || d2.options && d2.options.navigator.baseSeries || (d2.series.length ? y(d2.series, function(a3) {
            return !a3.options.isInternal;
          }).index : 0);
          (d2.series || []).forEach(function(b3, d3) {
            b3.options.isInternal || !b3.options.showInNavigator && (d3 !== a2 && b3.options.id !== a2 || false === b3.options.showInNavigator) || f2.push(b3);
          });
          this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(
            true,
            b2
          );
        };
        e2.prototype.updateNavigatorSeries = function(a2, e3) {
          var h2 = this, n = h2.chart, l = h2.baseSeries, g, c, p2 = h2.navigatorOptions.series, v2, q2 = { enableMouseTracking: false, index: null, linkedTo: null, group: "nav", padXAxis: false, xAxis: "navigator-x-axis", yAxis: "navigator-y-axis", showInLegend: false, stacking: void 0, isInternal: true, states: { inactive: { opacity: 1 } } }, r3 = h2.series = (h2.series || []).filter(function(a3) {
            var c2 = a3.baseSeries;
            return 0 > l.indexOf(c2) ? (c2 && (b(c2, "updatedData", h2.updatedDataHandler), delete c2.navigatorSeries), a3.chart && a3.destroy(), false) : true;
          });
          l && l.length && l.forEach(function(a3) {
            var b2 = a3.navigatorSeries, f2 = u({ color: a3.color, visible: a3.visible }, k(p2) ? m.navigator.series : p2);
            b2 && false === h2.navigatorOptions.adaptToUpdatedData || (q2.name = "Navigator " + l.length, g = a3.options || {}, v2 = g.navigatorOptions || {}, c = d(g, q2, f2, v2), c.pointRange = t(f2.pointRange, v2.pointRange, m.plotOptions[c.type || "line"].pointRange), f2 = v2.data || f2.data, h2.hasNavigatorData = h2.hasNavigatorData || !!f2, c.data = f2 || g.data && g.data.slice(0), b2 && b2.options ? b2.update(c, e3) : (a3.navigatorSeries = n.initSeries(c), a3.navigatorSeries.baseSeries = a3, r3.push(a3.navigatorSeries)));
          });
          if (p2.data && (!l || !l.length) || k(p2))
            h2.hasNavigatorData = false, p2 = f(p2), p2.forEach(function(a3, b2) {
              q2.name = "Navigator " + (r3.length + 1);
              c = d(m.navigator.series, { color: n.series[b2] && !n.series[b2].options.isInternal && n.series[b2].color || n.options.colors[b2] || n.options.colors[0] }, q2, a3);
              c.data = a3.data;
              c.data && (h2.hasNavigatorData = true, r3.push(n.initSeries(c)));
            });
          a2 && this.addBaseSeriesEvents();
        };
        e2.prototype.addBaseSeriesEvents = function() {
          var a2 = this, b2 = a2.baseSeries || [];
          b2[0] && b2[0].xAxis && H(b2[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
          b2.forEach(function(b3) {
            H(b3, "show", function() {
              this.navigatorSeries && this.navigatorSeries.setVisible(true, false);
            });
            H(b3, "hide", function() {
              this.navigatorSeries && this.navigatorSeries.setVisible(false, false);
            });
            false !== this.navigatorOptions.adaptToUpdatedData && b3.xAxis && H(b3, "updatedData", this.updatedDataHandler);
            H(b3, "remove", function() {
              this.navigatorSeries && (p(a2.series, this.navigatorSeries), L(this.navigatorSeries.options) && this.navigatorSeries.remove(false), delete this.navigatorSeries);
            });
          }, this);
        };
        e2.prototype.getBaseSeriesMin = function(a2) {
          return this.baseSeries.reduce(function(a3, b2) {
            return Math.min(a3, b2.xData ? b2.xData[0] : a3);
          }, a2);
        };
        e2.prototype.modifyNavigatorAxisExtremes = function() {
          var a2 = this.xAxis, b2;
          "undefined" !== typeof a2.getExtremes && (!(b2 = this.getUnionExtremes(true)) || b2.dataMin === a2.min && b2.dataMax === a2.max || (a2.min = b2.dataMin, a2.max = b2.dataMax));
        };
        e2.prototype.modifyBaseAxisExtremes = function() {
          var a2 = this.chart.navigator, b2 = this.getExtremes(), d2 = b2.dataMin, f2 = b2.dataMax;
          b2 = b2.max - b2.min;
          var e3 = a2.stickToMin, g = a2.stickToMax, c = t(this.options.overscroll, 0), k2 = a2.series && a2.series[0], m2 = !!this.setExtremes;
          if (!this.eventArgs || "rangeSelectorButton" !== this.eventArgs.trigger) {
            if (e3) {
              var p2 = d2;
              var v2 = p2 + b2;
            }
            g && (v2 = f2 + c, e3 || (p2 = Math.max(d2, v2 - b2, a2.getBaseSeriesMin(k2 && k2.xData ? k2.xData[0] : -Number.MAX_VALUE))));
            m2 && (e3 || g) && h(p2) && (this.min = this.userMin = p2, this.max = this.userMax = v2);
          }
          a2.stickToMin = a2.stickToMax = null;
        };
        e2.prototype.updatedDataHandler = function() {
          var a2 = this.chart.navigator, b2 = this.navigatorSeries, d2 = a2.getBaseSeriesMin(this.xData[0]);
          a2.stickToMax = a2.reversedExtremes ? 0 === Math.round(a2.zoomedMin) : Math.round(a2.zoomedMax) >= Math.round(a2.size);
          a2.stickToMin = h(this.xAxis.min) && this.xAxis.min <= d2 && (!this.chart.fixedRange || !a2.stickToMax);
          b2 && !a2.hasNavigatorData && (b2.options.pointStart = this.xData[0], b2.setData(this.options.data, false, null, false));
        };
        e2.prototype.addChartEvents = function() {
          this.eventsToUnbind || (this.eventsToUnbind = []);
          this.eventsToUnbind.push(H(this.chart, "redraw", function() {
            var a2 = this.navigator, b2 = a2 && (a2.baseSeries && a2.baseSeries[0] && a2.baseSeries[0].xAxis || this.xAxis[0]);
            b2 && a2.render(b2.min, b2.max);
          }), H(this.chart, "getMargins", function() {
            var a2 = this.navigator, b2 = a2.opposite ? "plotTop" : "marginBottom";
            this.inverted && (b2 = a2.opposite ? "marginRight" : "plotLeft");
            this[b2] = (this[b2] || 0) + (a2.navigatorEnabled || !this.inverted ? a2.outlineHeight : 0) + a2.navigatorOptions.margin;
          }));
        };
        e2.prototype.destroy = function() {
          this.removeEvents();
          this.xAxis && (p(this.chart.xAxis, this.xAxis), p(this.chart.axes, this.xAxis));
          this.yAxis && (p(this.chart.yAxis, this.yAxis), p(this.chart.axes, this.yAxis));
          (this.series || []).forEach(function(a2) {
            a2.destroy && a2.destroy();
          });
          "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" ").forEach(function(a2) {
            this[a2] && this[a2].destroy && this[a2].destroy();
            this[a2] = null;
          }, this);
          [this.handles].forEach(function(a2) {
            x(a2);
          }, this);
        };
        return e2;
      }();
      A.Navigator || (A.Navigator = J, D.compose(q), H(e, "beforeShowResetZoom", function() {
        var a2 = this.options, b2 = a2.navigator, d2 = a2.rangeSelector;
        if ((b2 && b2.enabled || d2 && d2.enabled) && (!v && "x" === a2.chart.zoomType || v && "x" === a2.chart.pinchType))
          return false;
      }), H(e, "beforeRender", function() {
        var a2 = this.options;
        if (a2.navigator.enabled || a2.scrollbar.enabled)
          this.scroller = this.navigator = new J(this);
      }), H(e, "afterSetChartSize", function() {
        var a2 = this.legend, b2 = this.navigator;
        if (b2) {
          var d2 = a2 && a2.options;
          var f2 = b2.xAxis;
          var e2 = b2.yAxis;
          var h2 = b2.scrollbarHeight;
          this.inverted ? (b2.left = b2.opposite ? this.chartWidth - h2 - b2.height : this.spacing[3] + h2, b2.top = this.plotTop + h2) : (b2.left = this.plotLeft + h2, b2.top = b2.navigatorOptions.top || this.chartHeight - b2.height - h2 - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (d2 && "bottom" === d2.verticalAlign && "proximate" !== d2.layout && d2.enabled && !d2.floating ? a2.legendHeight + t(d2.margin, 10) : 0) - (this.titleOffset ? this.titleOffset[2] : 0));
          f2 && e2 && (this.inverted ? f2.options.left = e2.options.left = b2.left : f2.options.top = e2.options.top = b2.top, f2.setAxisSize(), e2.setAxisSize());
        }
      }), H(e, "update", function(a2) {
        var b2 = a2.options.navigator || {}, f2 = a2.options.scrollbar || {};
        this.navigator || this.scroller || !b2.enabled && !f2.enabled || (d(true, this.options.navigator, b2), d(true, this.options.scrollbar, f2), delete a2.options.navigator, delete a2.options.scrollbar);
      }), H(e, "afterUpdate", function(a2) {
        this.navigator || this.scroller || !this.options.navigator.enabled && !this.options.scrollbar.enabled || (this.scroller = this.navigator = new J(this), t(a2.redraw, true) && this.redraw(a2.animation));
      }), H(e, "afterAddSeries", function() {
        this.navigator && this.navigator.setBaseSeries(null, false);
      }), H(F, "afterUpdate", function() {
        this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, false);
      }), e.prototype.callbacks.push(function(a2) {
        var b2 = a2.navigator;
        b2 && a2.xAxis[0] && (a2 = a2.xAxis[0].getExtremes(), b2.render(a2.min, a2.max));
      }));
      A.Navigator = J;
      return A.Navigator;
    });
    N(r, "parts/OrdinalAxis.js", [r["parts/Axis.js"], r["parts/Globals.js"], r["parts/Utilities.js"]], function(q, e, r2) {
      var A = r2.addEvent, D = r2.css, F = r2.defined, K = r2.pick, C = r2.timeUnits;
      r2 = e.Chart;
      var m = e.Series, H;
      (function(m2) {
        var q2 = function() {
          function m3(e2) {
            this.index = {};
            this.axis = e2;
          }
          m3.prototype.beforeSetTickPositions = function() {
            var e2 = this.axis, m4 = e2.ordinal, q3 = [], r3, k = false, h = e2.getExtremes(), d = h.min, t = h.max, b, f = e2.isXAxis && !!e2.options.breaks;
            h = e2.options.ordinal;
            var a = Number.MAX_VALUE, v = e2.chart.options.chart.ignoreHiddenSeries, E;
            if (h || f) {
              e2.series.forEach(function(b2, d2) {
                r3 = [];
                if (!(v && false === b2.visible || false === b2.takeOrdinalPosition && !f) && (q3 = q3.concat(b2.processedXData), J = q3.length, q3.sort(function(a2, b3) {
                  return a2 - b3;
                }), a = Math.min(a, K(b2.closestPointRange, a)), J)) {
                  for (d2 = 0; d2 < J - 1; )
                    q3[d2] !== q3[d2 + 1] && r3.push(q3[d2 + 1]), d2++;
                  r3[0] !== q3[0] && r3.unshift(q3[0]);
                  q3 = r3;
                }
                b2.isSeriesBoosting && (E = true);
              });
              E && (q3.length = 0);
              var J = q3.length;
              if (2 < J) {
                var B = q3[1] - q3[0];
                for (b = J - 1; b-- && !k; )
                  q3[b + 1] - q3[b] !== B && (k = true);
                !e2.options.keepOrdinalPadding && (q3[0] - d > B || t - q3[q3.length - 1] > B) && (k = true);
              } else
                e2.options.overscroll && (2 === J ? a = q3[1] - q3[0] : 1 === J ? (a = e2.options.overscroll, q3 = [q3[0], q3[0] + a]) : a = m4.overscrollPointsRange);
              k ? (e2.options.overscroll && (m4.overscrollPointsRange = a, q3 = q3.concat(m4.getOverscrollPositions())), m4.positions = q3, B = e2.ordinal2lin(Math.max(d, q3[0]), true), b = Math.max(e2.ordinal2lin(Math.min(t, q3[q3.length - 1]), true), 1), m4.slope = t = (t - d) / (b - B), m4.offset = d - B * t) : (m4.overscrollPointsRange = K(e2.closestPointRange, m4.overscrollPointsRange), m4.positions = e2.ordinal.slope = m4.offset = void 0);
            }
            e2.isOrdinal = h && k;
            m4.groupIntervalFactor = null;
          };
          m3.prototype.getExtendedPositions = function() {
            var m4 = this, p = m4.axis, q3 = p.constructor.prototype, r3 = p.chart, k = p.series[0].currentDataGrouping, h = m4.index, d = k ? k.count + k.unitName : "raw", t = p.options.overscroll, b = p.getExtremes(), f;
            h || (h = m4.index = {});
            if (!h[d]) {
              var a = { series: [], chart: r3, getExtremes: function() {
                return {
                  min: b.dataMin,
                  max: b.dataMax + t
                };
              }, options: { ordinal: true }, ordinal: {}, ordinal2lin: q3.ordinal2lin, val2lin: q3.val2lin };
              a.ordinal.axis = a;
              p.series.forEach(function(b2) {
                f = { xAxis: a, xData: b2.xData.slice(), chart: r3, destroyGroupedData: e.noop, getProcessedData: e.Series.prototype.getProcessedData };
                f.xData = f.xData.concat(m4.getOverscrollPositions());
                f.options = { dataGrouping: k ? { enabled: true, forced: true, approximation: "open", units: [[k.unitName, [k.count]]] } : { enabled: false } };
                b2.processData.apply(f);
                a.series.push(f);
              });
              p.ordinal.beforeSetTickPositions.apply({ axis: a });
              h[d] = a.ordinal.positions;
            }
            return h[d];
          };
          m3.prototype.getGroupIntervalFactor = function(e2, m4, q3) {
            q3 = q3.processedXData;
            var p = q3.length, k = [];
            var h = this.groupIntervalFactor;
            if (!h) {
              for (h = 0; h < p - 1; h++)
                k[h] = q3[h + 1] - q3[h];
              k.sort(function(d, e3) {
                return d - e3;
              });
              k = k[Math.floor(p / 2)];
              e2 = Math.max(e2, q3[0]);
              m4 = Math.min(m4, q3[p - 1]);
              this.groupIntervalFactor = h = p * k / (m4 - e2);
            }
            return h;
          };
          m3.prototype.getOverscrollPositions = function() {
            var e2 = this.axis, m4 = e2.options.overscroll, q3 = this.overscrollPointsRange, r3 = [], k = e2.dataMax;
            if (F(q3))
              for (r3.push(k); k <= e2.dataMax + m4; )
                k += q3, r3.push(k);
            return r3;
          };
          m3.prototype.postProcessTickInterval = function(e2) {
            var m4 = this.axis, q3 = this.slope;
            return q3 ? m4.options.breaks ? m4.closestPointRange || e2 : e2 / (q3 / m4.closestPointRange) : e2;
          };
          return m3;
        }();
        m2.Composition = q2;
        m2.compose = function(e2, q3, p) {
          e2.keepProps.push("ordinal");
          var r3 = e2.prototype;
          e2.prototype.getTimeTicks = function(e3, k, h, d, m3, b, f) {
            void 0 === m3 && (m3 = []);
            void 0 === b && (b = 0);
            var a = 0, p2, t, q4 = {}, r4 = [], n = -Number.MAX_VALUE, u = this.options.tickPixelInterval, y = this.chart.time, x = [];
            if (!this.options.ordinal && !this.options.breaks || !m3 || 3 > m3.length || "undefined" === typeof k)
              return y.getTimeTicks.apply(y, arguments);
            var l = m3.length;
            for (p2 = 0; p2 < l; p2++) {
              var g = p2 && m3[p2 - 1] > h;
              m3[p2] < k && (a = p2);
              if (p2 === l - 1 || m3[p2 + 1] - m3[p2] > 5 * b || g) {
                if (m3[p2] > n) {
                  for (t = y.getTimeTicks(e3, m3[a], m3[p2], d); t.length && t[0] <= n; )
                    t.shift();
                  t.length && (n = t[t.length - 1]);
                  x.push(r4.length);
                  r4 = r4.concat(t);
                }
                a = p2 + 1;
              }
              if (g)
                break;
            }
            t = t.info;
            if (f && t.unitRange <= C.hour) {
              p2 = r4.length - 1;
              for (a = 1; a < p2; a++)
                if (y.dateFormat("%d", r4[a]) !== y.dateFormat("%d", r4[a - 1])) {
                  q4[r4[a]] = "day";
                  var c = true;
                }
              c && (q4[r4[0]] = "day");
              t.higherRanks = q4;
            }
            t.segmentStarts = x;
            r4.info = t;
            if (f && F(u)) {
              a = x = r4.length;
              c = [];
              var w;
              for (y = []; a--; )
                p2 = this.translate(r4[a]), w && (y[a] = w - p2), c[a] = w = p2;
              y.sort();
              y = y[Math.floor(y.length / 2)];
              y < 0.6 * u && (y = null);
              a = r4[x - 1] > h ? x - 1 : x;
              for (w = void 0; a--; )
                p2 = c[a], x = Math.abs(w - p2), w && x < 0.8 * u && (null === y || x < 0.8 * y) ? (q4[r4[a]] && !q4[r4[a + 1]] ? (x = a + 1, w = p2) : x = a, r4.splice(x, 1)) : w = p2;
            }
            return r4;
          };
          r3.lin2val = function(e3, k) {
            var h = this.ordinal, d = h.positions;
            if (d) {
              var m3 = h.slope, b = h.offset;
              h = d.length - 1;
              if (k)
                if (0 > e3)
                  e3 = d[0];
                else if (e3 > h)
                  e3 = d[h];
                else {
                  h = Math.floor(e3);
                  var f = e3 - h;
                }
              else
                for (; h--; )
                  if (k = m3 * h + b, e3 >= k) {
                    m3 = m3 * (h + 1) + b;
                    f = (e3 - k) / (m3 - k);
                    break;
                  }
              return "undefined" !== typeof f && "undefined" !== typeof d[h] ? d[h] + (f ? f * (d[h + 1] - d[h]) : 0) : e3;
            }
            return e3;
          };
          r3.val2lin = function(e3, k) {
            var h = this.ordinal, d = h.positions;
            if (d) {
              var m3 = d.length, b;
              for (b = m3; b--; )
                if (d[b] === e3) {
                  var f = b;
                  break;
                }
              for (b = m3 - 1; b--; )
                if (e3 > d[b] || 0 === b) {
                  e3 = (e3 - d[b]) / (d[b + 1] - d[b]);
                  f = b + e3;
                  break;
                }
              k = k ? f : h.slope * (f || 0) + h.offset;
            } else
              k = e3;
            return k;
          };
          r3.ordinal2lin = r3.val2lin;
          A(e2, "afterInit", function() {
            this.ordinal || (this.ordinal = new m2.Composition(this));
          });
          A(e2, "foundExtremes", function() {
            this.isXAxis && F(this.options.overscroll) && this.max === this.dataMax && (!this.chart.mouseIsDown || this.isInternal) && (!this.eventArgs || this.eventArgs && "navigator" !== this.eventArgs.trigger) && (this.max += this.options.overscroll, !this.isInternal && F(this.userMin) && (this.min += this.options.overscroll));
          });
          A(e2, "afterSetScale", function() {
            this.horiz && !this.isDirty && (this.isDirty = this.isOrdinal && this.chart.navigator && !this.chart.navigator.adaptToUpdatedData);
          });
          A(
            e2,
            "initialAxisTranslation",
            function() {
              this.ordinal && (this.ordinal.beforeSetTickPositions(), this.tickInterval = this.ordinal.postProcessTickInterval(this.tickInterval));
            }
          );
          A(q3, "pan", function(e3) {
            var k = this.xAxis[0], h = k.options.overscroll, d = e3.originalEvent.chartX, m3 = this.options.chart && this.options.chart.panning, b = false;
            if (m3 && "y" !== m3.type && k.options.ordinal && k.series.length) {
              var f = this.mouseDownX, a = k.getExtremes(), p2 = a.dataMax, q4 = a.min, r4 = a.max, u = this.hoverPoints, n = k.closestPointRange || k.ordinal && k.ordinal.overscrollPointsRange;
              f = (f - d) / (k.translationSlope * (k.ordinal.slope || n));
              var z = { ordinal: { positions: k.ordinal.getExtendedPositions() } };
              n = k.lin2val;
              var y = k.val2lin;
              if (!z.ordinal.positions)
                b = true;
              else if (1 < Math.abs(f)) {
                u && u.forEach(function(a2) {
                  a2.setState();
                });
                if (0 > f) {
                  u = z;
                  var x = k.ordinal.positions ? k : z;
                } else
                  u = k.ordinal.positions ? k : z, x = z;
                z = x.ordinal.positions;
                p2 > z[z.length - 1] && z.push(p2);
                this.fixedRange = r4 - q4;
                f = k.navigatorAxis.toFixedRange(null, null, n.apply(u, [y.apply(u, [q4, true]) + f, true]), n.apply(x, [y.apply(x, [r4, true]) + f, true]));
                f.min >= Math.min(
                  a.dataMin,
                  q4
                ) && f.max <= Math.max(p2, r4) + h && k.setExtremes(f.min, f.max, true, false, { trigger: "pan" });
                this.mouseDownX = d;
                D(this.container, { cursor: "move" });
              }
            } else
              b = true;
            b || m3 && /y/.test(m3.type) ? h && (k.max = k.dataMax + h) : e3.preventDefault();
          });
          A(p, "updatedData", function() {
            var e3 = this.xAxis;
            e3 && e3.options.ordinal && delete e3.ordinal.index;
          });
        };
      })(H || (H = {}));
      H.compose(q, r2, m);
      return H;
    });
    N(r, "modules/broken-axis.src.js", [r["parts/Axis.js"], r["parts/Globals.js"], r["parts/Utilities.js"], r["parts/Stacking.js"]], function(q, e, r2, A) {
      var D = r2.addEvent, F = r2.find, K = r2.fireEvent, C = r2.isArray, m = r2.isNumber, H = r2.pick, M = e.Series, w = function() {
        function e2(e3) {
          this.hasBreaks = false;
          this.axis = e3;
        }
        e2.isInBreak = function(e3, m2) {
          var p = e3.repeat || Infinity, q2 = e3.from, k = e3.to - e3.from;
          m2 = m2 >= q2 ? (m2 - q2) % p : p - (q2 - m2) % p;
          return e3.inclusive ? m2 <= k : m2 < k && 0 !== m2;
        };
        e2.lin2Val = function(m2) {
          var p = this.brokenAxis;
          p = p && p.breakArray;
          if (!p)
            return m2;
          var q2;
          for (q2 = 0; q2 < p.length; q2++) {
            var r3 = p[q2];
            if (r3.from >= m2)
              break;
            else
              r3.to < m2 ? m2 += r3.len : e2.isInBreak(r3, m2) && (m2 += r3.len);
          }
          return m2;
        };
        e2.val2Lin = function(m2) {
          var p = this.brokenAxis;
          p = p && p.breakArray;
          if (!p)
            return m2;
          var q2 = m2, r3;
          for (r3 = 0; r3 < p.length; r3++) {
            var k = p[r3];
            if (k.to <= m2)
              q2 -= k.len;
            else if (k.from >= m2)
              break;
            else if (e2.isInBreak(k, m2)) {
              q2 -= m2 - k.from;
              break;
            }
          }
          return q2;
        };
        e2.prototype.findBreakAt = function(e3, m2) {
          return F(m2, function(m3) {
            return m3.from < e3 && e3 < m3.to;
          });
        };
        e2.prototype.isInAnyBreak = function(m2, p) {
          var q2 = this.axis, r3 = q2.options.breaks, k = r3 && r3.length, h;
          if (k) {
            for (; k--; )
              if (e2.isInBreak(r3[k], m2)) {
                var d = true;
                h || (h = H(r3[k].showPoints, !q2.isXAxis));
              }
            var t = d && p ? d && !h : d;
          }
          return t;
        };
        e2.prototype.setBreaks = function(m2, p) {
          var r3 = this, y = r3.axis, k = C(m2) && !!m2.length;
          y.isDirty = r3.hasBreaks !== k;
          r3.hasBreaks = k;
          y.options.breaks = y.userOptions.breaks = m2;
          y.forceRedraw = true;
          y.series.forEach(function(e3) {
            e3.isDirty = true;
          });
          k || y.val2lin !== e2.val2Lin || (delete y.val2lin, delete y.lin2val);
          k && (y.userOptions.ordinal = false, y.lin2val = e2.lin2Val, y.val2lin = e2.val2Lin, y.setExtremes = function(e3, d, k2, b, f) {
            if (r3.hasBreaks) {
              for (var a, h = this.options.breaks; a = r3.findBreakAt(e3, h); )
                e3 = a.to;
              for (; a = r3.findBreakAt(d, h); )
                d = a.from;
              d < e3 && (d = e3);
            }
            q.prototype.setExtremes.call(
              this,
              e3,
              d,
              k2,
              b,
              f
            );
          }, y.setAxisTranslation = function(h) {
            q.prototype.setAxisTranslation.call(this, h);
            r3.unitLength = null;
            if (r3.hasBreaks) {
              h = y.options.breaks || [];
              var d = [], k2 = [], b = 0, f, a = y.userMin || y.min, m3 = y.userMax || y.max, p2 = H(y.pointRangePadding, 0), u;
              h.forEach(function(b2) {
                f = b2.repeat || Infinity;
                e2.isInBreak(b2, a) && (a += b2.to % f - a % f);
                e2.isInBreak(b2, m3) && (m3 -= m3 % f - b2.from % f);
              });
              h.forEach(function(b2) {
                n = b2.from;
                for (f = b2.repeat || Infinity; n - f > a; )
                  n -= f;
                for (; n < a; )
                  n += f;
                for (u = n; u < m3; u += f)
                  d.push({ value: u, move: "in" }), d.push({
                    value: u + (b2.to - b2.from),
                    move: "out",
                    size: b2.breakSize
                  });
              });
              d.sort(function(a2, b2) {
                return a2.value === b2.value ? ("in" === a2.move ? 0 : 1) - ("in" === b2.move ? 0 : 1) : a2.value - b2.value;
              });
              var B = 0;
              var n = a;
              d.forEach(function(a2) {
                B += "in" === a2.move ? 1 : -1;
                1 === B && "in" === a2.move && (n = a2.value);
                0 === B && (k2.push({ from: n, to: a2.value, len: a2.value - n - (a2.size || 0) }), b += a2.value - n - (a2.size || 0));
              });
              y.breakArray = r3.breakArray = k2;
              r3.unitLength = m3 - a - b + p2;
              K(y, "afterBreaks");
              y.staticScale ? y.transA = y.staticScale : r3.unitLength && (y.transA *= (m3 - y.min + p2) / r3.unitLength);
              p2 && (y.minPixelPadding = y.transA * y.minPointOffset);
              y.min = a;
              y.max = m3;
            }
          });
          H(p, true) && y.chart.redraw();
        };
        return e2;
      }();
      e = function() {
        function e2() {
        }
        e2.compose = function(e3, p) {
          e3.keepProps.push("brokenAxis");
          var q2 = M.prototype;
          q2.drawBreaks = function(e4, k) {
            var h = this, d = h.points, p2, b, f, a;
            if (e4 && e4.brokenAxis && e4.brokenAxis.hasBreaks) {
              var q3 = e4.brokenAxis;
              k.forEach(function(k2) {
                p2 = q3 && q3.breakArray || [];
                b = e4.isXAxis ? e4.min : H(h.options.threshold, e4.min);
                d.forEach(function(d2) {
                  a = H(d2["stack" + k2.toUpperCase()], d2[k2]);
                  p2.forEach(function(h2) {
                    if (m(b) && m(a)) {
                      f = false;
                      if (b < h2.from && a > h2.to || b > h2.from && a < h2.from)
                        f = "pointBreak";
                      else if (b < h2.from && a > h2.from && a < h2.to || b > h2.from && a > h2.to && a < h2.from)
                        f = "pointInBreak";
                      f && K(e4, f, { point: d2, brk: h2 });
                    }
                  });
                });
              });
            }
          };
          q2.gappedPath = function() {
            var e4 = this.currentDataGrouping, k = e4 && e4.gapSize;
            e4 = this.options.gapSize;
            var h = this.points.slice(), d = h.length - 1, m2 = this.yAxis, b;
            if (e4 && 0 < d)
              for ("value" !== this.options.gapUnit && (e4 *= this.basePointRange), k && k > e4 && k >= this.basePointRange && (e4 = k), b = void 0; d--; )
                b && false !== b.visible || (b = h[d + 1]), k = h[d], false !== b.visible && false !== k.visible && (b.x - k.x > e4 && (b = (k.x + b.x) / 2, h.splice(d + 1, 0, { isNull: true, x: b }), m2.stacking && this.options.stacking && (b = m2.stacking.stacks[this.stackKey][b] = new A(m2, m2.options.stackLabels, false, b, this.stack), b.total = 0)), b = k);
            return this.getGraphPath(h);
          };
          D(e3, "init", function() {
            this.brokenAxis || (this.brokenAxis = new w(this));
          });
          D(e3, "afterInit", function() {
            "undefined" !== typeof this.brokenAxis && this.brokenAxis.setBreaks(this.options.breaks, false);
          });
          D(e3, "afterSetTickPositions", function() {
            var e4 = this.brokenAxis;
            if (e4 && e4.hasBreaks) {
              var k = this.tickPositions, h = this.tickPositions.info, d = [], m2;
              for (m2 = 0; m2 < k.length; m2++)
                e4.isInAnyBreak(k[m2]) || d.push(k[m2]);
              this.tickPositions = d;
              this.tickPositions.info = h;
            }
          });
          D(e3, "afterSetOptions", function() {
            this.brokenAxis && this.brokenAxis.hasBreaks && (this.options.ordinal = false);
          });
          D(p, "afterGeneratePoints", function() {
            var e4 = this.options.connectNulls, k = this.points, h = this.xAxis, d = this.yAxis;
            if (this.isDirty)
              for (var m2 = k.length; m2--; ) {
                var b = k[m2], f = !(null === b.y && false === e4) && (h && h.brokenAxis && h.brokenAxis.isInAnyBreak(b.x, true) || d && d.brokenAxis && d.brokenAxis.isInAnyBreak(b.y, true));
                b.visible = f ? false : false !== b.options.visible;
              }
          });
          D(p, "afterRender", function() {
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, H(this.pointArrayMap, ["y"]));
          });
        };
        return e2;
      }();
      e.compose(q, M);
      return e;
    });
    N(r, "masters/modules/broken-axis.src.js", [], function() {
    });
    N(r, "parts/DataGrouping.js", [r["parts/DateTimeAxis.js"], r["parts/Globals.js"], r["parts/Options.js"], r["parts/Point.js"], r["parts/Tooltip.js"], r["parts/Utilities.js"]], function(q, e, r2, A, D, F) {
      var K = F.addEvent, C = F.arrayMax, m = F.arrayMin, H = F.correctFloat, M = F.defined, w = F.error, L = F.extend, x = F.format, p = F.isNumber, u = F.merge, y = F.pick, k = e.Axis;
      F = e.Series;
      var h = e.approximations = { sum: function(a2) {
        var b2 = a2.length;
        if (!b2 && a2.hasNulls)
          var d2 = null;
        else if (b2)
          for (d2 = 0; b2--; )
            d2 += a2[b2];
        return d2;
      }, average: function(a2) {
        var b2 = a2.length;
        a2 = h.sum(a2);
        p(a2) && b2 && (a2 = H(a2 / b2));
        return a2;
      }, averages: function() {
        var a2 = [];
        [].forEach.call(arguments, function(b2) {
          a2.push(h.average(b2));
        });
        return "undefined" === typeof a2[0] ? void 0 : a2;
      }, open: function(a2) {
        return a2.length ? a2[0] : a2.hasNulls ? null : void 0;
      }, high: function(a2) {
        return a2.length ? C(a2) : a2.hasNulls ? null : void 0;
      }, low: function(a2) {
        return a2.length ? m(a2) : a2.hasNulls ? null : void 0;
      }, close: function(a2) {
        return a2.length ? a2[a2.length - 1] : a2.hasNulls ? null : void 0;
      }, ohlc: function(a2, b2, d2, f2) {
        a2 = h.open(a2);
        b2 = h.high(b2);
        d2 = h.low(d2);
        f2 = h.close(f2);
        if (p(a2) || p(b2) || p(d2) || p(f2))
          return [a2, b2, d2, f2];
      }, range: function(a2, b2) {
        a2 = h.low(a2);
        b2 = h.high(b2);
        if (p(a2) || p(b2))
          return [a2, b2];
        if (null === a2 && null === b2)
          return null;
      } }, d = function(a2, b2, d2, f2) {
        var e2 = this, l = e2.data, g = e2.options && e2.options.data, c = [], k2 = [], n = [], m2 = a2.length, q2 = !!b2, t2 = [], v2 = e2.pointArrayMap, r3 = v2 && v2.length, z = ["x"].concat(v2 || ["y"]), B = 0, E2 = 0, x2;
        f2 = "function" === typeof f2 ? f2 : h[f2] ? h[f2] : h[e2.getDGApproximation && e2.getDGApproximation() || "average"];
        r3 ? v2.forEach(function() {
          t2.push([]);
        }) : t2.push([]);
        var y2 = r3 || 1;
        for (x2 = 0; x2 <= m2 && !(a2[x2] >= d2[0]); x2++)
          ;
        for (x2; x2 <= m2; x2++) {
          for (; "undefined" !== typeof d2[B + 1] && a2[x2] >= d2[B + 1] || x2 === m2; ) {
            var w2 = d2[B];
            e2.dataGroupInfo = { start: e2.cropStart + E2, length: t2[0].length };
            var J2 = f2.apply(e2, t2);
            e2.pointClass && !M(e2.dataGroupInfo.options) && (e2.dataGroupInfo.options = u(e2.pointClass.prototype.optionsToObject.call({ series: e2 }, e2.options.data[e2.cropStart + E2])), z.forEach(function(a3) {
              delete e2.dataGroupInfo.options[a3];
            }));
            "undefined" !== typeof J2 && (c.push(w2), k2.push(J2), n.push(e2.dataGroupInfo));
            E2 = x2;
            for (w2 = 0; w2 < y2; w2++)
              t2[w2].length = 0, t2[w2].hasNulls = false;
            B += 1;
            if (x2 === m2)
              break;
          }
          if (x2 === m2)
            break;
          if (v2)
            for (w2 = e2.cropStart + x2, J2 = l && l[w2] || e2.pointClass.prototype.applyOptions.apply({ series: e2 }, [g[w2]]), w2 = 0; w2 < r3; w2++) {
              var C2 = J2[v2[w2]];
              p(C2) ? t2[w2].push(C2) : null === C2 && (t2[w2].hasNulls = true);
            }
          else
            w2 = q2 ? b2[x2] : null, p(w2) ? t2[0].push(w2) : null === w2 && (t2[0].hasNulls = true);
        }
        return { groupedXData: c, groupedYData: k2, groupMap: n };
      }, t = { approximations: h, groupData: d }, b = F.prototype, f = b.processData, a = b.generatePoints, v = { groupPixelWidth: 2, dateTimeLabelFormats: {
        millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
        second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
        minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
        hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
        day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
        week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
        month: ["%B %Y", "%B", "-%B %Y"],
        year: ["%Y", "%Y", "-%Y"]
      } }, E = { line: {}, spline: {}, area: {}, areaspline: {}, arearange: {}, column: { groupPixelWidth: 10 }, columnrange: { groupPixelWidth: 10 }, candlestick: { groupPixelWidth: 10 }, ohlc: { groupPixelWidth: 5 } }, J = e.defaultDataGroupingUnits = [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1]], ["week", [1]], ["month", [1, 3, 6]], [
        "year",
        null
      ]];
      b.getDGApproximation = function() {
        return this.is("arearange") ? "range" : this.is("ohlc") ? "ohlc" : this.is("column") ? "sum" : "average";
      };
      b.groupData = d;
      b.processData = function() {
        var a2 = this.chart, d2 = this.options.dataGrouping, e2 = false !== this.allowDG && d2 && y(d2.enabled, a2.options.isStock), h2 = this.visible || !a2.options.chart.ignoreHiddenSeries, k2, l = this.currentDataGrouping, g = false;
        this.forceCrop = e2;
        this.groupPixelWidth = null;
        this.hasProcessed = true;
        e2 && !this.requireSorting && (this.requireSorting = g = true);
        e2 = false === f.apply(this, arguments) || !e2;
        g && (this.requireSorting = false);
        if (!e2) {
          this.destroyGroupedData();
          e2 = d2.groupAll ? this.xData : this.processedXData;
          var c = d2.groupAll ? this.yData : this.processedYData, m2 = a2.plotSizeX;
          a2 = this.xAxis;
          var p2 = a2.options.ordinal, t2 = this.groupPixelWidth = a2.getGroupPixelWidth && a2.getGroupPixelWidth();
          if (t2) {
            this.isDirty = k2 = true;
            this.points = null;
            g = a2.getExtremes();
            var v2 = g.min;
            g = g.max;
            p2 = p2 && a2.ordinal && a2.ordinal.getGroupIntervalFactor(v2, g, this) || 1;
            t2 = t2 * (g - v2) / m2 * p2;
            m2 = a2.getTimeTicks(q.AdditionsClass.prototype.normalizeTimeTickInterval(
              t2,
              d2.units || J
            ), Math.min(v2, e2[0]), Math.max(g, e2[e2.length - 1]), a2.options.startOfWeek, e2, this.closestPointRange);
            c = b.groupData.apply(this, [e2, c, m2, d2.approximation]);
            e2 = c.groupedXData;
            p2 = c.groupedYData;
            var r3 = 0;
            if (d2.smoothed && e2.length) {
              var u2 = e2.length - 1;
              for (e2[u2] = Math.min(e2[u2], g); u2-- && 0 < u2; )
                e2[u2] += t2 / 2;
              e2[0] = Math.max(e2[0], v2);
            }
            for (u2 = 1; u2 < m2.length; u2++)
              m2.info.segmentStarts && -1 !== m2.info.segmentStarts.indexOf(u2) || (r3 = Math.max(m2[u2] - m2[u2 - 1], r3));
            v2 = m2.info;
            v2.gapSize = r3;
            this.closestPointRange = m2.info.totalRange;
            this.groupMap = c.groupMap;
            if (M(e2[0]) && e2[0] < a2.min && h2) {
              if (!M(a2.options.min) && a2.min <= a2.dataMin || a2.min === a2.dataMin)
                a2.min = Math.min(e2[0], a2.min);
              a2.dataMin = Math.min(e2[0], a2.dataMin);
            }
            d2.groupAll && (d2 = this.cropData(e2, p2, a2.min, a2.max, 1), e2 = d2.xData, p2 = d2.yData);
            this.processedXData = e2;
            this.processedYData = p2;
          } else
            this.groupMap = null;
          this.hasGroupedData = k2;
          this.currentDataGrouping = v2;
          this.preventGraphAnimation = (l && l.totalRange) !== (v2 && v2.totalRange);
        }
      };
      b.destroyGroupedData = function() {
        this.groupedData && (this.groupedData.forEach(function(a2, b2) {
          a2 && (this.groupedData[b2] = a2.destroy ? a2.destroy() : null);
        }, this), this.groupedData.length = 0);
      };
      b.generatePoints = function() {
        a.apply(this);
        this.destroyGroupedData();
        this.groupedData = this.hasGroupedData ? this.points : null;
      };
      K(A, "update", function() {
        if (this.dataGroup)
          return w(24, false, this.series.chart), false;
      });
      K(D, "headerFormatter", function(a2) {
        var b2 = this.chart, d2 = b2.time, e2 = a2.labelConfig, f2 = e2.series, h2 = f2.tooltipOptions, g = f2.options.dataGrouping, c = h2.xDateFormat, k2 = f2.xAxis, m2 = h2[(a2.isFooter ? "footer" : "header") + "Format"];
        if (k2 && "datetime" === k2.options.type && g && p(e2.key)) {
          var q2 = f2.currentDataGrouping;
          g = g.dateTimeLabelFormats || v.dateTimeLabelFormats;
          if (q2)
            if (h2 = g[q2.unitName], 1 === q2.count)
              c = h2[0];
            else {
              c = h2[1];
              var t2 = h2[2];
            }
          else
            !c && g && (c = this.getXDateFormat(e2, h2, k2));
          c = d2.dateFormat(c, e2.key);
          t2 && (c += d2.dateFormat(t2, e2.key + q2.totalRange - 1));
          f2.chart.styledMode && (m2 = this.styledModeFormat(m2));
          a2.text = x(m2, { point: L(e2.point, { key: c }), series: f2 }, b2);
          a2.preventDefault();
        }
      });
      K(F, "destroy", b.destroyGroupedData);
      K(F, "afterSetOptions", function(a2) {
        a2 = a2.options;
        var b2 = this.type, d2 = this.chart.options.plotOptions, e2 = r2.defaultOptions.plotOptions[b2].dataGrouping, f2 = this.useCommonDataGrouping && v;
        if (E[b2] || f2)
          e2 || (e2 = u(v, E[b2])), a2.dataGrouping = u(f2, e2, d2.series && d2.series.dataGrouping, d2[b2].dataGrouping, this.userOptions.dataGrouping);
      });
      K(k, "afterSetScale", function() {
        this.series.forEach(function(a2) {
          a2.hasProcessed = false;
        });
      });
      k.prototype.getGroupPixelWidth = function() {
        var a2 = this.series, b2 = a2.length, d2, e2 = 0, f2 = false, h2;
        for (d2 = b2; d2--; )
          (h2 = a2[d2].options.dataGrouping) && (e2 = Math.max(e2, y(h2.groupPixelWidth, v.groupPixelWidth)));
        for (d2 = b2; d2--; )
          (h2 = a2[d2].options.dataGrouping) && a2[d2].hasProcessed && (b2 = (a2[d2].processedXData || a2[d2].data).length, a2[d2].groupPixelWidth || b2 > this.chart.plotSizeX / e2 || b2 && h2.forced) && (f2 = true);
        return f2 ? e2 : 0;
      };
      k.prototype.setDataGrouping = function(a2, b2) {
        var d2;
        b2 = y(b2, true);
        a2 || (a2 = { forced: false, units: null });
        if (this instanceof k)
          for (d2 = this.series.length; d2--; )
            this.series[d2].update({ dataGrouping: a2 }, false);
        else
          this.chart.options.series.forEach(function(b3) {
            b3.dataGrouping = a2;
          }, false);
        this.ordinal && (this.ordinal.slope = void 0);
        b2 && this.chart.redraw();
      };
      e.dataGrouping = t;
      return t;
    });
    N(
      r,
      "parts/OHLCSeries.js",
      [r["parts/Globals.js"], r["parts/Point.js"], r["parts/Utilities.js"]],
      function(q, e, r2) {
        r2 = r2.seriesType;
        var A = q.seriesTypes;
        r2("ohlc", "column", { lineWidth: 1, tooltip: { pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>' }, threshold: null, states: { hover: { lineWidth: 3 } }, stickyTracking: true }, { directTouch: false, pointArrayMap: ["open", "high", "low", "close"], toYData: function(e2) {
          return [
            e2.open,
            e2.high,
            e2.low,
            e2.close
          ];
        }, pointValKey: "close", pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" }, init: function() {
          A.column.prototype.init.apply(this, arguments);
          this.options.stacking = void 0;
        }, pointAttribs: function(e2, q2) {
          q2 = A.column.prototype.pointAttribs.call(this, e2, q2);
          var r3 = this.options;
          delete q2.fill;
          !e2.options.color && r3.upColor && e2.open < e2.close && (q2.stroke = r3.upColor);
          return q2;
        }, translate: function() {
          var e2 = this, q2 = e2.yAxis, r3 = !!e2.modifyValue, C = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
          A.column.prototype.translate.apply(e2);
          e2.points.forEach(function(m) {
            [m.open, m.high, m.low, m.close, m.low].forEach(function(A2, D) {
              null !== A2 && (r3 && (A2 = e2.modifyValue(A2)), m[C[D]] = q2.toPixels(A2, true));
            });
            m.tooltipPos[1] = m.plotHigh + q2.pos - e2.chart.plotTop;
          });
        }, drawPoints: function() {
          var e2 = this, q2 = e2.chart, r3 = function(e3, m, q3) {
            var r4 = e3[0];
            e3 = e3[1];
            "number" === typeof r4[2] && (r4[2] = Math.max(q3 + m, r4[2]));
            "number" === typeof e3[2] && (e3[2] = Math.min(q3 - m, e3[2]));
          };
          e2.points.forEach(function(A2) {
            var m = A2.graphic, C = !m;
            if ("undefined" !== typeof A2.plotY) {
              m || (A2.graphic = m = q2.renderer.path().add(e2.group));
              q2.styledMode || m.attr(e2.pointAttribs(A2, A2.selected && "select"));
              var D = m.strokeWidth();
              var w = D % 2 / 2;
              var F = Math.round(A2.plotX) - w;
              var x = Math.round(A2.shapeArgs.width / 2);
              var p = [["M", F, Math.round(A2.yBottom)], ["L", F, Math.round(A2.plotHigh)]];
              if (null !== A2.open) {
                var u = Math.round(A2.plotOpen) + w;
                p.push(["M", F, u], ["L", F - x, u]);
                r3(p, D / 2, u);
              }
              null !== A2.close && (u = Math.round(A2.plotClose) + w, p.push(["M", F, u], ["L", F + x, u]), r3(p, D / 2, u));
              m[C ? "attr" : "animate"]({ d: p }).addClass(
                A2.getClassName(),
                true
              );
            }
          });
        }, animate: null }, { getClassName: function() {
          return e.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down");
        } });
      }
    );
    N(r, "parts/CandlestickSeries.js", [r["parts/Globals.js"], r["parts/Options.js"], r["parts/Utilities.js"]], function(q, e, r2) {
      e = e.defaultOptions;
      var A = r2.merge;
      r2 = r2.seriesType;
      var D = q.seriesTypes;
      r2("candlestick", "ohlc", A(e.plotOptions.column, {
        states: { hover: { lineWidth: 2 } },
        tooltip: e.plotOptions.ohlc.tooltip,
        threshold: null,
        lineColor: "#000000",
        lineWidth: 1,
        upColor: "#ffffff",
        stickyTracking: true
      }), { pointAttribs: function(e2, q2) {
        var r3 = D.column.prototype.pointAttribs.call(this, e2, q2), m = this.options, A2 = e2.open < e2.close, F = m.lineColor || this.color;
        r3["stroke-width"] = m.lineWidth;
        r3.fill = e2.options.color || (A2 ? m.upColor || this.color : this.color);
        r3.stroke = e2.options.lineColor || (A2 ? m.upLineColor || F : F);
        q2 && (e2 = m.states[q2], r3.fill = e2.color || r3.fill, r3.stroke = e2.lineColor || r3.stroke, r3["stroke-width"] = e2.lineWidth || r3["stroke-width"]);
        return r3;
      }, drawPoints: function() {
        var e2 = this, q2 = e2.chart, r3 = e2.yAxis.reversed;
        e2.points.forEach(function(m) {
          var A2 = m.graphic, D2 = !A2;
          if ("undefined" !== typeof m.plotY) {
            A2 || (m.graphic = A2 = q2.renderer.path().add(e2.group));
            e2.chart.styledMode || A2.attr(e2.pointAttribs(m, m.selected && "select")).shadow(e2.options.shadow);
            var w = A2.strokeWidth() % 2 / 2;
            var C = Math.round(m.plotX) - w;
            var x = m.plotOpen;
            var p = m.plotClose;
            var u = Math.min(x, p);
            x = Math.max(x, p);
            var y = Math.round(m.shapeArgs.width / 2);
            p = r3 ? x !== m.yBottom : Math.round(u) !== Math.round(m.plotHigh);
            var k = r3 ? Math.round(u) !== Math.round(m.plotHigh) : x !== m.yBottom;
            u = Math.round(u) + w;
            x = Math.round(x) + w;
            w = [];
            w.push(["M", C - y, x], ["L", C - y, u], ["L", C + y, u], ["L", C + y, x], ["Z"], ["M", C, u], ["L", C, p ? Math.round(r3 ? m.yBottom : m.plotHigh) : u], ["M", C, x], ["L", C, k ? Math.round(r3 ? m.plotHigh : m.yBottom) : x]);
            A2[D2 ? "attr" : "animate"]({ d: w }).addClass(m.getClassName(), true);
          }
        });
      } });
    });
    N(r, "mixins/on-series.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function(q, e) {
      var r2 = e.defined, A = e.stableSort, D = q.seriesTypes;
      return { getPlotBox: function() {
        return q.Series.prototype.getPlotBox.call(this.options.onSeries && this.chart.get(this.options.onSeries) || this);
      }, translate: function() {
        D.column.prototype.translate.apply(this);
        var e2 = this, q2 = e2.options, C = e2.chart, m = e2.points, H = m.length - 1, M, w = q2.onSeries;
        w = w && C.get(w);
        q2 = q2.onKey || "y";
        var L = w && w.options.step, x = w && w.points, p = x && x.length, u = C.inverted, y = e2.xAxis, k = e2.yAxis, h = 0, d;
        if (w && w.visible && p) {
          h = (w.pointXOffset || 0) + (w.barW || 0) / 2;
          C = w.currentDataGrouping;
          var t = x[p - 1].x + (C ? C.totalRange : 0);
          A(m, function(a, b2) {
            return a.x - b2.x;
          });
          for (q2 = "plot" + q2[0].toUpperCase() + q2.substr(1); p-- && m[H]; ) {
            var b = x[p];
            C = m[H];
            C.y = b.y;
            if (b.x <= C.x && "undefined" !== typeof b[q2]) {
              if (C.x <= t && (C.plotY = b[q2], b.x < C.x && !L && (d = x[p + 1]) && "undefined" !== typeof d[q2])) {
                var f = (C.x - b.x) / (d.x - b.x);
                C.plotY += f * (d[q2] - b[q2]);
                C.y += f * (d.y - b.y);
              }
              H--;
              p++;
              if (0 > H)
                break;
            }
          }
        }
        m.forEach(function(a, b2) {
          a.plotX += h;
          if ("undefined" === typeof a.plotY || u)
            0 <= a.plotX && a.plotX <= y.len ? u ? (a.plotY = y.translate(a.x, 0, 1, 0, 1), a.plotX = r2(a.y) ? k.translate(a.y, 0, 0, 0, 1) : 0) : a.plotY = (y.opposite ? 0 : e2.yAxis.len) + y.offset : a.shapeArgs = {};
          if ((M = m[b2 - 1]) && M.plotX === a.plotX) {
            "undefined" === typeof M.stackIndex && (M.stackIndex = 0);
            var d2 = M.stackIndex + 1;
          }
          a.stackIndex = d2;
        });
        this.onSeries = w;
      } };
    });
    N(r, "parts/FlagsSeries.js", [r["parts/Globals.js"], r["parts/SVGElement.js"], r["parts/SVGRenderer.js"], r["parts/Utilities.js"], r["mixins/on-series.js"]], function(q, e, r2, A, D) {
      function F(e2) {
        k[e2 + "pin"] = function(d, h, b, f, a) {
          var m2 = a && a.anchorX;
          a = a && a.anchorY;
          "circle" === e2 && f > b && (d -= Math.round((f - b) / 2), b = f);
          var p2 = k[e2](d, h, b, f);
          if (m2 && a) {
            var q2 = m2;
            "circle" === e2 ? q2 = d + b / 2 : (d = p2[0], b = p2[1], "M" === d[0] && "L" === b[0] && (q2 = (d[1] + b[1]) / 2));
            p2.push(["M", q2, h > a ? h : h + f], ["L", m2, a]);
            p2 = p2.concat(k.circle(m2 - 1, a - 1, 2, 2));
          }
          return p2;
        };
      }
      var K = A.addEvent, C = A.defined, m = A.isNumber, H = A.merge, M = A.objectEach, w = A.seriesType, L = A.wrap;
      A = q.noop;
      var x = q.Renderer, p = q.Series, u = q.TrackerMixin, y = q.VMLRenderer, k = r2.prototype.symbols;
      w("flags", "column", {
        pointRange: 0,
        allowOverlapX: false,
        shape: "flag",
        stackDistance: 12,
        textAlign: "center",
        tooltip: { pointFormat: "{point.text}<br/>" },
        threshold: null,
        y: -30,
        fillColor: "#ffffff",
        lineWidth: 1,
        states: { hover: { lineColor: "#000000", fillColor: "#ccd6eb" } },
        style: { fontSize: "11px", fontWeight: "bold" }
      }, { sorted: false, noSharedTooltip: true, allowDG: false, takeOrdinalPosition: false, trackerGroups: ["markerGroup"], forceCrop: true, init: p.prototype.init, pointAttribs: function(e2, d) {
        var h = this.options, b = e2 && e2.color || this.color, f = h.lineColor, a = e2 && e2.lineWidth;
        e2 = e2 && e2.fillColor || h.fillColor;
        d && (e2 = h.states[d].fillColor, f = h.states[d].lineColor, a = h.states[d].lineWidth);
        return { fill: e2 || b, stroke: f || b, "stroke-width": a || h.lineWidth || 0 };
      }, translate: D.translate, getPlotBox: D.getPlotBox, drawPoints: function() {
        var h = this.points, d = this.chart, k2 = d.renderer, b = d.inverted, f = this.options, a = f.y, m2, p2 = this.yAxis, r3 = {}, u2 = [];
        for (m2 = h.length; m2--; ) {
          var n = h[m2];
          var z = (b ? n.plotY : n.plotX) > this.xAxis.len;
          var x2 = n.plotX;
          var w2 = n.stackIndex;
          var l = n.options.shape || f.shape;
          var g = n.plotY;
          "undefined" !== typeof g && (g = n.plotY + a - ("undefined" !== typeof w2 && w2 * f.stackDistance));
          n.anchorX = w2 ? void 0 : n.plotX;
          var c = w2 ? void 0 : n.plotY;
          var y2 = "flag" !== l;
          w2 = n.graphic;
          "undefined" !== typeof g && 0 <= x2 && !z ? (w2 || (w2 = n.graphic = k2.label("", null, null, l, null, null, f.useHTML), d.styledMode || w2.attr(this.pointAttribs(n)).css(H(f.style, n.style)), w2.attr({ align: y2 ? "center" : "left", width: f.width, height: f.height, "text-align": f.textAlign }).addClass("highcharts-point").add(this.markerGroup), n.graphic.div && (n.graphic.div.point = n), d.styledMode || w2.shadow(f.shadow), w2.isNew = true), 0 < x2 && (x2 -= w2.strokeWidth() % 2), l = { y: g, anchorY: c }, f.allowOverlapX && (l.x = x2, l.anchorX = n.anchorX), w2.attr({ text: n.options.title || f.title || "A" })[w2.isNew ? "attr" : "animate"](l), f.allowOverlapX || (r3[n.plotX] ? r3[n.plotX].size = Math.max(r3[n.plotX].size, w2.width) : r3[n.plotX] = { align: y2 ? 0.5 : 0, size: w2.width, target: x2, anchorX: x2 }), n.tooltipPos = [x2, g + p2.pos - d.plotTop]) : w2 && (n.graphic = w2.destroy());
        }
        f.allowOverlapX || (M(r3, function(a2) {
          a2.plotX = a2.anchorX;
          u2.push(a2);
        }), q.distribute(u2, b ? p2.len : this.xAxis.len, 100), h.forEach(function(a2) {
          var b2 = a2.graphic && r3[a2.plotX];
          b2 && (a2.graphic[a2.graphic.isNew ? "attr" : "animate"]({ x: b2.pos + b2.align * b2.size, anchorX: a2.anchorX }), C(b2.pos) ? a2.graphic.isNew = false : (a2.graphic.attr({ x: -9999, anchorX: -9999 }), a2.graphic.isNew = true));
        }));
        f.useHTML && L(this.markerGroup, "on", function(a2) {
          return e.prototype.on.apply(a2.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1));
        });
      }, drawTracker: function() {
        var e2 = this.points;
        u.drawTrackerPoint.apply(this);
        e2.forEach(function(d) {
          var h = d.graphic;
          h && K(h.element, "mouseover", function() {
            0 < d.stackIndex && !d.raised && (d._y = h.y, h.attr({ y: d._y - 8 }), d.raised = true);
            e2.forEach(function(b) {
              b !== d && b.raised && b.graphic && (b.graphic.attr({ y: b._y }), b.raised = false);
            });
          });
        });
      }, animate: function(e2) {
        e2 && this.setClip();
      }, setClip: function() {
        p.prototype.setClip.apply(
          this,
          arguments
        );
        false !== this.options.clip && this.sharedClipKey && this.markerGroup.clip(this.chart[this.sharedClipKey]);
      }, buildKDTree: A, invertGroups: A }, { isValid: function() {
        return m(this.y) || "undefined" === typeof this.y;
      } });
      k.flag = function(e2, d, m2, b, f) {
        var a = f && f.anchorX || e2;
        f = f && f.anchorY || d;
        var h = k.circle(a - 1, f - 1, 2, 2);
        h.push(["M", a, f], ["L", e2, d + b], ["L", e2, d], ["L", e2 + m2, d], ["L", e2 + m2, d + b], ["L", e2, d + b], ["Z"]);
        return h;
      };
      F("circle");
      F("square");
      x === y && ["circlepin", "flag", "squarepin"].forEach(function(e2) {
        y.prototype.symbols[e2] = k[e2];
      });
    });
    N(r, "parts/RangeSelector.js", [r["parts/Axis.js"], r["parts/Chart.js"], r["parts/Globals.js"], r["parts/Options.js"], r["parts/Utilities.js"]], function(q, e, r2, A, D) {
      function F(b) {
        this.init(b);
      }
      var K = A.defaultOptions, C = D.addEvent, m = D.createElement, H = D.css, M = D.defined, w = D.destroyObjectProperties, L = D.discardElement, x = D.extend, p = D.fireEvent, u = D.isNumber, y = D.merge, k = D.objectEach, h = D.pick, d = D.pInt, t = D.splat;
      x(K, { rangeSelector: {
        verticalAlign: "top",
        buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 },
        floating: false,
        x: 0,
        y: 0,
        height: void 0,
        inputPosition: { align: "right", x: 0, y: 0 },
        buttonPosition: { align: "left", x: 0, y: 0 },
        labelStyle: { color: "#666666" }
      } });
      K.lang = y(K.lang, { rangeSelectorZoom: "Zoom", rangeSelectorFrom: "From", rangeSelectorTo: "To" });
      F.prototype = {
        clickButton: function(b, d2) {
          var a = this.chart, e2 = this.buttonOptions[b], f = a.xAxis[0], k2 = a.scroller && a.scroller.getUnionExtremes() || f || {}, m2 = k2.dataMin, n = k2.dataMax, p2 = f && Math.round(Math.min(f.max, h(n, f.max))), r3 = e2.type;
          k2 = e2._range;
          var x2, l = e2.dataGrouping;
          if (null !== m2 && null !== n) {
            a.fixedRange = k2;
            l && (this.forcedDataGrouping = true, q.prototype.setDataGrouping.call(f || { chart: this.chart }, l, false), this.frozenStates = e2.preserveDataGrouping);
            if ("month" === r3 || "year" === r3)
              if (f) {
                r3 = { range: e2, max: p2, chart: a, dataMin: m2, dataMax: n };
                var g = f.minFromRange.call(r3);
                u(r3.newMax) && (p2 = r3.newMax);
              } else
                k2 = e2;
            else if (k2)
              g = Math.max(p2 - k2, m2), p2 = Math.min(g + k2, n);
            else if ("ytd" === r3)
              if (f)
                "undefined" === typeof n && (m2 = Number.MAX_VALUE, n = Number.MIN_VALUE, a.series.forEach(function(a2) {
                  a2 = a2.xData;
                  m2 = Math.min(a2[0], m2);
                  n = Math.max(a2[a2.length - 1], n);
                }), d2 = false), p2 = this.getYTDExtremes(n, m2, a.time.useUTC), g = x2 = p2.min, p2 = p2.max;
              else {
                this.deferredYTDClick = b;
                return;
              }
            else
              "all" === r3 && f && (g = m2, p2 = n);
            g += e2._offsetMin;
            p2 += e2._offsetMax;
            this.setSelected(b);
            if (f)
              f.setExtremes(g, p2, h(d2, 1), null, { trigger: "rangeSelectorButton", rangeSelectorButton: e2 });
            else {
              var c = t(a.options.xAxis)[0];
              var w2 = c.range;
              c.range = k2;
              var y2 = c.min;
              c.min = x2;
              C(a, "load", function() {
                c.range = w2;
                c.min = y2;
              });
            }
          }
        },
        setSelected: function(b) {
          this.selected = this.options.selected = b;
        },
        defaultButtons: [{
          type: "month",
          count: 1,
          text: "1m"
        }, { type: "month", count: 3, text: "3m" }, { type: "month", count: 6, text: "6m" }, { type: "ytd", text: "YTD" }, { type: "year", count: 1, text: "1y" }, { type: "all", text: "All" }],
        init: function(b) {
          var d2 = this, a = b.options.rangeSelector, e2 = a.buttons || [].concat(d2.defaultButtons), h2 = a.selected, k2 = function() {
            var a2 = d2.minInput, b2 = d2.maxInput;
            a2 && a2.blur && p(a2, "blur");
            b2 && b2.blur && p(b2, "blur");
          };
          d2.chart = b;
          d2.options = a;
          d2.buttons = [];
          d2.buttonOptions = e2;
          this.unMouseDown = C(b.container, "mousedown", k2);
          this.unResize = C(b, "resize", k2);
          e2.forEach(d2.computeButtonRange);
          "undefined" !== typeof h2 && e2[h2] && this.clickButton(h2, false);
          C(b, "load", function() {
            b.xAxis && b.xAxis[0] && C(b.xAxis[0], "setExtremes", function(a2) {
              this.max - this.min !== b.fixedRange && "rangeSelectorButton" !== a2.trigger && "updatedData" !== a2.trigger && d2.forcedDataGrouping && !d2.frozenStates && this.setDataGrouping(false, false);
            });
          });
        },
        updateButtonStates: function() {
          var b = this, d2 = this.chart, a = d2.xAxis[0], e2 = Math.round(a.max - a.min), h2 = !a.hasVisibleSeries, k2 = d2.scroller && d2.scroller.getUnionExtremes() || a, m2 = k2.dataMin, n = k2.dataMax;
          d2 = b.getYTDExtremes(
            n,
            m2,
            d2.time.useUTC
          );
          var p2 = d2.min, q2 = d2.max, r3 = b.selected, l = u(r3), g = b.options.allButtonsEnabled, c = b.buttons;
          b.buttonOptions.forEach(function(d3, f) {
            var k3 = d3._range, t2 = d3.type, v = d3.count || 1, u2 = c[f], z = 0, x2 = d3._offsetMax - d3._offsetMin;
            d3 = f === r3;
            var w2 = k3 > n - m2, B = k3 < a.minRange, E = false, y2 = false;
            k3 = k3 === e2;
            ("month" === t2 || "year" === t2) && e2 + 36e5 >= 864e5 * { month: 28, year: 365 }[t2] * v - x2 && e2 - 36e5 <= 864e5 * { month: 31, year: 366 }[t2] * v + x2 ? k3 = true : "ytd" === t2 ? (k3 = q2 - p2 + x2 === e2, E = !d3) : "all" === t2 && (k3 = a.max - a.min >= n - m2, y2 = !d3 && l && k3);
            t2 = !g && (w2 || B || y2 || h2);
            v = d3 && k3 || k3 && !l && !E || d3 && b.frozenStates;
            t2 ? z = 3 : v && (l = true, z = 2);
            u2.state !== z && (u2.setState(z), 0 === z && r3 === f && b.setSelected(null));
          });
        },
        computeButtonRange: function(b) {
          var d2 = b.type, a = b.count || 1, e2 = { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5 };
          if (e2[d2])
            b._range = e2[d2] * a;
          else if ("month" === d2 || "year" === d2)
            b._range = 864e5 * { month: 30, year: 365 }[d2] * a;
          b._offsetMin = h(b.offsetMin, 0);
          b._offsetMax = h(b.offsetMax, 0);
          b._range += b._offsetMax - b._offsetMin;
        },
        setInputValue: function(b, d2) {
          var a = this.chart.options.rangeSelector, e2 = this.chart.time, f = this[b + "Input"];
          M(d2) && (f.previousValue = f.HCTime, f.HCTime = d2);
          f.value = e2.dateFormat(a.inputEditDateFormat || "%Y-%m-%d", f.HCTime);
          this[b + "DateBox"].attr({ text: e2.dateFormat(a.inputDateFormat || "%b %e, %Y", f.HCTime) });
        },
        showInput: function(b) {
          var d2 = this.inputGroup, a = this[b + "DateBox"];
          H(this[b + "Input"], { left: d2.translateX + a.x + "px", top: d2.translateY + "px", width: a.width - 2 + "px", height: a.height - 2 + "px", border: "2px solid silver" });
        },
        hideInput: function(b) {
          H(this[b + "Input"], { border: 0, width: "1px", height: "1px" });
          this.setInputValue(b);
        },
        drawInput: function(b) {
          function e2() {
            var b2 = w2.value, c = (q2.inputDateParser || Date.parse)(b2), e3 = h2.xAxis[0], f = h2.scroller && h2.scroller.xAxis ? h2.scroller.xAxis : e3, k3 = f.dataMin;
            f = f.dataMax;
            c !== w2.previousValue && (w2.previousValue = c, u(c) || (c = b2.split("-"), c = Date.UTC(d(c[0]), d(c[1]) - 1, d(c[2]))), u(c) && (h2.time.useUTC || (c += 6e4 * (/* @__PURE__ */ new Date()).getTimezoneOffset()), t2 ? c > a.maxInput.HCTime ? c = void 0 : c < k3 && (c = k3) : c < a.minInput.HCTime ? c = void 0 : c > f && (c = f), "undefined" !== typeof c && e3.setExtremes(t2 ? c : e3.min, t2 ? e3.max : c, void 0, void 0, { trigger: "rangeSelectorInput" })));
          }
          var a = this, h2 = a.chart, k2 = h2.renderer.style || {}, p2 = h2.renderer, q2 = h2.options.rangeSelector, n = a.div, t2 = "min" === b, w2, A2, l = this.inputGroup;
          this[b + "Label"] = A2 = p2.label(K.lang[t2 ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({ padding: 2 }).add(l);
          l.offset += A2.width + 5;
          this[b + "DateBox"] = p2 = p2.label("", l.offset).addClass("highcharts-range-input").attr({ padding: 2, width: q2.inputBoxWidth || 90, height: q2.inputBoxHeight || 17, "text-align": "center" }).on("click", function() {
            a.showInput(b);
            a[b + "Input"].focus();
          });
          h2.styledMode || p2.attr({ stroke: q2.inputBoxBorderColor || "#cccccc", "stroke-width": 1 });
          p2.add(l);
          l.offset += p2.width + (t2 ? 10 : 0);
          this[b + "Input"] = w2 = m("input", { name: b, className: "highcharts-range-selector", type: "text" }, { top: h2.plotTop + "px" }, n);
          h2.styledMode || (A2.css(y(k2, q2.labelStyle)), p2.css(y({ color: "#333333" }, k2, q2.inputStyle)), H(w2, x({ position: "absolute", border: 0, width: "1px", height: "1px", padding: 0, textAlign: "center", fontSize: k2.fontSize, fontFamily: k2.fontFamily, top: "-9999em" }, q2.inputStyle)));
          w2.onfocus = function() {
            a.showInput(b);
          };
          w2.onblur = function() {
            w2 === r2.doc.activeElement && e2();
            a.hideInput(b);
            w2.blur();
          };
          w2.onchange = e2;
          w2.onkeypress = function(a2) {
            13 === a2.keyCode && e2();
          };
        },
        getPosition: function() {
          var b = this.chart, d2 = b.options.rangeSelector;
          b = "top" === d2.verticalAlign ? b.plotTop - b.axisOffset[0] : 0;
          return { buttonTop: b + d2.buttonPosition.y, inputTop: b + d2.inputPosition.y - 10 };
        },
        getYTDExtremes: function(b, d2, a) {
          var e2 = this.chart.time, f = new e2.Date(b), h2 = e2.get("FullYear", f);
          a = a ? e2.Date.UTC(h2, 0, 1) : +new e2.Date(h2, 0, 1);
          d2 = Math.max(
            d2 || 0,
            a
          );
          f = f.getTime();
          return { max: Math.min(b || f, f), min: d2 };
        },
        render: function(b, d2) {
          var a = this, e2 = a.chart, f = e2.renderer, k2 = e2.container, p2 = e2.options, n = p2.exporting && false !== p2.exporting.enabled && p2.navigation && p2.navigation.buttonOptions, q2 = K.lang, r3 = a.div, t2 = p2.rangeSelector, l = h(p2.chart.style && p2.chart.style.zIndex, 0) + 1;
          p2 = t2.floating;
          var g = a.buttons;
          r3 = a.inputGroup;
          var c = t2.buttonTheme, u2 = t2.buttonPosition, w2 = t2.inputPosition, x2 = t2.inputEnabled, y2 = c && c.states, A2 = e2.plotLeft, C2 = a.buttonGroup, D2, F2 = a.options.verticalAlign, H2 = e2.legend, L2 = H2 && H2.options, M2 = u2.y, N2 = w2.y, R = e2.hasLoaded, S2 = R ? "animate" : "attr", V = 0, U = 0;
          if (false !== t2.enabled) {
            a.rendered || (a.group = D2 = f.g("range-selector-group").attr({ zIndex: 7 }).add(), a.buttonGroup = C2 = f.g("range-selector-buttons").add(D2), a.zoomText = f.text(q2.rangeSelectorZoom, 0, 15).add(C2), e2.styledMode || (a.zoomText.css(t2.labelStyle), c["stroke-width"] = h(c["stroke-width"], 0)), a.buttonOptions.forEach(function(b2, d3) {
              g[d3] = f.button(b2.text, 0, 0, function(c2) {
                var e3 = b2.events && b2.events.click, f2;
                e3 && (f2 = e3.call(b2, c2));
                false !== f2 && a.clickButton(d3);
                a.isActive = true;
              }, c, y2 && y2.hover, y2 && y2.select, y2 && y2.disabled).attr({ "text-align": "center" }).add(C2);
            }), false !== x2 && (a.div = r3 = m("div", null, { position: "relative", height: 0, zIndex: l }), k2.parentNode.insertBefore(r3, k2), a.inputGroup = r3 = f.g("input-group").add(D2), r3.offset = 0, a.drawInput("min"), a.drawInput("max")));
            a.zoomText[S2]({ x: h(A2 + u2.x, A2) });
            var ea = h(A2 + u2.x, A2) + a.zoomText.getBBox().width + 5;
            a.buttonOptions.forEach(function(a2, b2) {
              g[b2][S2]({ x: ea });
              ea += g[b2].width + h(t2.buttonSpacing, 5);
            });
            A2 = e2.plotLeft - e2.spacing[3];
            a.updateButtonStates();
            n && this.titleCollision(e2) && "top" === F2 && "right" === u2.align && u2.y + C2.getBBox().height - 12 < (n.y || 0) + n.height && (V = -40);
            k2 = u2.x - e2.spacing[3];
            "right" === u2.align ? k2 += V - A2 : "center" === u2.align && (k2 -= A2 / 2);
            C2.align({ y: u2.y, width: C2.getBBox().width, align: u2.align, x: k2 }, true, e2.spacingBox);
            a.group.placed = R;
            a.buttonGroup.placed = R;
            false !== x2 && (V = n && this.titleCollision(e2) && "top" === F2 && "right" === w2.align && w2.y - r3.getBBox().height - 12 < (n.y || 0) + n.height + e2.spacing[0] ? -40 : 0, "left" === w2.align ? k2 = A2 : "right" === w2.align && (k2 = -Math.max(e2.axisOffset[1], -V)), r3.align({
              y: w2.y,
              width: r3.getBBox().width,
              align: w2.align,
              x: w2.x + k2 - 2
            }, true, e2.spacingBox), n = r3.alignAttr.translateX + r3.alignOptions.x - V + r3.getBBox().x + 2, k2 = r3.alignOptions.width, q2 = C2.alignAttr.translateX + C2.getBBox().x, A2 = C2.getBBox().width + 20, (w2.align === u2.align || q2 + A2 > n && n + k2 > q2 && M2 < N2 + r3.getBBox().height) && r3.attr({ translateX: r3.alignAttr.translateX + (e2.axisOffset[1] >= -V ? 0 : -V), translateY: r3.alignAttr.translateY + C2.getBBox().height + 10 }), a.setInputValue("min", b), a.setInputValue("max", d2), a.inputGroup.placed = R);
            a.group.align({ verticalAlign: F2 }, true, e2.spacingBox);
            b = a.group.getBBox().height + 20;
            d2 = a.group.alignAttr.translateY;
            "bottom" === F2 && (H2 = L2 && "bottom" === L2.verticalAlign && L2.enabled && !L2.floating ? H2.legendHeight + h(L2.margin, 10) : 0, b = b + H2 - 20, U = d2 - b - (p2 ? 0 : t2.y) - (e2.titleOffset ? e2.titleOffset[2] : 0) - 10);
            if ("top" === F2)
              p2 && (U = 0), e2.titleOffset && e2.titleOffset[0] && (U = e2.titleOffset[0]), U += e2.margin[0] - e2.spacing[0] || 0;
            else if ("middle" === F2) {
              if (N2 === M2)
                U = 0 > N2 ? d2 + void 0 : d2;
              else if (N2 || M2)
                U = 0 > N2 || 0 > M2 ? U - Math.min(N2, M2) : d2 - b + NaN;
            }
            a.group.translate(t2.x, t2.y + Math.floor(U));
            false !== x2 && (a.minInput.style.marginTop = a.group.translateY + "px", a.maxInput.style.marginTop = a.group.translateY + "px");
            a.rendered = true;
          }
        },
        getHeight: function() {
          var b = this.options, d2 = this.group, a = b.y, e2 = b.buttonPosition.y, h2 = b.inputPosition.y;
          if (b.height)
            return b.height;
          b = d2 ? d2.getBBox(true).height + 13 + a : 0;
          d2 = Math.min(h2, e2);
          if (0 > h2 && 0 > e2 || 0 < h2 && 0 < e2)
            b += Math.abs(d2);
          return b;
        },
        titleCollision: function(b) {
          return !(b.options.title.text || b.options.subtitle.text);
        },
        update: function(b) {
          var d2 = this.chart;
          y(true, d2.options.rangeSelector, b);
          this.destroy();
          this.init(d2);
          d2.rangeSelector.render();
        },
        destroy: function() {
          var b = this, d2 = b.minInput, a = b.maxInput;
          b.unMouseDown();
          b.unResize();
          w(b.buttons);
          d2 && (d2.onfocus = d2.onblur = d2.onchange = null);
          a && (a.onfocus = a.onblur = a.onchange = null);
          k(b, function(a2, d3) {
            a2 && "chart" !== d3 && (a2.destroy ? a2.destroy() : a2.nodeType && L(this[d3]));
            a2 !== F.prototype[d3] && (b[d3] = null);
          }, this);
        }
      };
      q.prototype.minFromRange = function() {
        var b = this.range, d2 = b.type, a = this.max, e2 = this.chart.time, k2 = function(a2, b2) {
          var f = "year" === d2 ? "FullYear" : "Month", h2 = new e2.Date(a2), g = e2.get(f, h2);
          e2.set(f, h2, g + b2);
          g === e2.get(f, h2) && e2.set("Date", h2, 0);
          return h2.getTime() - a2;
        };
        if (u(b)) {
          var m2 = a - b;
          var p2 = b;
        } else
          m2 = a + k2(a, -b.count), this.chart && (this.chart.fixedRange = a - m2);
        var n = h(this.dataMin, Number.MIN_VALUE);
        u(m2) || (m2 = n);
        m2 <= n && (m2 = n, "undefined" === typeof p2 && (p2 = k2(m2, b.count)), this.newMax = Math.min(m2 + p2, this.dataMax));
        u(a) || (m2 = void 0);
        return m2;
      };
      r2.RangeSelector || (C(e, "afterGetContainer", function() {
        this.options.rangeSelector.enabled && (this.rangeSelector = new F(this));
      }), C(e, "beforeRender", function() {
        var b = this.axes, d2 = this.rangeSelector;
        d2 && (u(d2.deferredYTDClick) && (d2.clickButton(d2.deferredYTDClick), delete d2.deferredYTDClick), b.forEach(function(a) {
          a.updateNames();
          a.setScale();
        }), this.getAxisMargins(), d2.render(), b = d2.options.verticalAlign, d2.options.floating || ("bottom" === b ? this.extraBottomMargin = true : "middle" !== b && (this.extraTopMargin = true)));
      }), C(e, "update", function(b) {
        var d2 = b.options.rangeSelector;
        b = this.rangeSelector;
        var a = this.extraBottomMargin, e2 = this.extraTopMargin;
        d2 && d2.enabled && !M(b) && (this.options.rangeSelector.enabled = true, this.rangeSelector = new F(this));
        this.extraTopMargin = this.extraBottomMargin = false;
        b && (b.render(), d2 = d2 && d2.verticalAlign || b.options && b.options.verticalAlign, b.options.floating || ("bottom" === d2 ? this.extraBottomMargin = true : "middle" !== d2 && (this.extraTopMargin = true)), this.extraBottomMargin !== a || this.extraTopMargin !== e2) && (this.isDirtyBox = true);
      }), C(e, "render", function() {
        var b = this.rangeSelector;
        b && !b.options.floating && (b.render(), b = b.options.verticalAlign, "bottom" === b ? this.extraBottomMargin = true : "middle" !== b && (this.extraTopMargin = true));
      }), C(e, "getMargins", function() {
        var b = this.rangeSelector;
        b && (b = b.getHeight(), this.extraTopMargin && (this.plotTop += b), this.extraBottomMargin && (this.marginBottom += b));
      }), e.prototype.callbacks.push(function(b) {
        function d2() {
          a = b.xAxis[0].getExtremes();
          h2 = b.legend;
          m2 = null === e2 || void 0 === e2 ? void 0 : e2.options.verticalAlign;
          u(a.min) && e2.render(a.min, a.max);
          e2 && h2.display && "top" === m2 && m2 === h2.options.verticalAlign && (k2 = y(b.spacingBox), k2.y = "vertical" === h2.options.layout ? b.plotTop : k2.y + e2.getHeight(), h2.group.placed = false, h2.align(k2));
        }
        var a, e2 = b.rangeSelector, h2, k2, m2;
        if (e2) {
          var n = C(
            b.xAxis[0],
            "afterSetExtremes",
            function(a2) {
              e2.render(a2.min, a2.max);
            }
          );
          var p2 = C(b, "redraw", d2);
          d2();
        }
        C(b, "destroy", function() {
          e2 && (p2(), n());
        });
      }), r2.RangeSelector = F);
    });
    N(r, "parts/StockChart.js", [r["parts/Axis.js"], r["parts/Chart.js"], r["parts/Globals.js"], r["parts/Point.js"], r["parts/SVGRenderer.js"], r["parts/Utilities.js"]], function(q, e, r2, A, D, F) {
      var K = F.addEvent, C = F.arrayMax, m = F.arrayMin, H = F.clamp, M = F.defined, w = F.extend, L = F.find, x = F.format, p = F.getOptions, u = F.isNumber, y = F.isString, k = F.merge, h = F.pick, d = F.splat;
      F = r2.Series;
      var t = F.prototype, b = t.init, f = t.processData, a = A.prototype.tooltipFormatter;
      r2.StockChart = r2.stockChart = function(a2, b2, f2) {
        var m2 = y(a2) || a2.nodeName, n = arguments[m2 ? 1 : 0], q2 = n, r3 = n.series, t2 = p(), l, g = h(n.navigator && n.navigator.enabled, t2.navigator.enabled, true);
        n.xAxis = d(n.xAxis || {}).map(function(a3, b3) {
          return k({ minPadding: 0, maxPadding: 0, overscroll: 0, ordinal: true, title: { text: null }, labels: { overflow: "justify" }, showLastLabel: true }, t2.xAxis, t2.xAxis && t2.xAxis[b3], a3, { type: "datetime", categories: null }, g ? { startOnTick: false, endOnTick: false } : null);
        });
        n.yAxis = d(n.yAxis || {}).map(function(a3, b3) {
          l = h(a3.opposite, true);
          return k({ labels: { y: -2 }, opposite: l, showLastLabel: !(!a3.categories && "category" !== a3.type), title: { text: null } }, t2.yAxis, t2.yAxis && t2.yAxis[b3], a3);
        });
        n.series = null;
        n = k({ chart: { panning: { enabled: true, type: "x" }, pinchType: "x" }, navigator: { enabled: g }, scrollbar: { enabled: h(t2.scrollbar.enabled, true) }, rangeSelector: { enabled: h(t2.rangeSelector.enabled, true) }, title: { text: null }, tooltip: { split: h(t2.tooltip.split, true), crosshairs: true }, legend: { enabled: false } }, n, { isStock: true });
        n.series = q2.series = r3;
        return m2 ? new e(a2, n, f2) : new e(n, b2);
      };
      K(F, "setOptions", function(a2) {
        var b2;
        this.chart.options.isStock && (this.is("column") || this.is("columnrange") ? b2 = { borderWidth: 0, shadow: false } : this.is("scatter") || this.is("sma") || (b2 = { marker: { enabled: false, radius: 2 } }), b2 && (a2.plotOptions[this.type] = k(a2.plotOptions[this.type], b2)));
      });
      K(q, "autoLabelAlign", function(a2) {
        var b2 = this.chart, d2 = this.options;
        b2 = b2._labelPanes = b2._labelPanes || {};
        var e2 = this.options.labels;
        this.chart.options.isStock && "yAxis" === this.coll && (d2 = d2.top + "," + d2.height, !b2[d2] && e2.enabled && (15 === e2.x && (e2.x = 0), "undefined" === typeof e2.align && (e2.align = "right"), b2[d2] = this, a2.align = "right", a2.preventDefault()));
      });
      K(q, "destroy", function() {
        var a2 = this.chart, b2 = this.options && this.options.top + "," + this.options.height;
        b2 && a2._labelPanes && a2._labelPanes[b2] === this && delete a2._labelPanes[b2];
      });
      K(q, "getPlotLinePath", function(a2) {
        function b2(a3) {
          var b3 = "xAxis" === a3 ? "yAxis" : "xAxis";
          a3 = d2.options[b3];
          return u(a3) ? [f2[b3][a3]] : y(a3) ? [f2.get(a3)] : e2.map(function(a4) {
            return a4[b3];
          });
        }
        var d2 = this, e2 = this.isLinked && !this.series ? this.linkedParent.series : this.series, f2 = d2.chart, k2 = f2.renderer, m2 = d2.left, p2 = d2.top, l, g, c, q2, r3 = [], t2 = [], v = a2.translatedValue, w2 = a2.value, x2 = a2.force;
        if (f2.options.isStock && false !== a2.acrossPanes && "xAxis" === d2.coll || "yAxis" === d2.coll) {
          a2.preventDefault();
          t2 = b2(d2.coll);
          var A2 = d2.isXAxis ? f2.yAxis : f2.xAxis;
          A2.forEach(function(a3) {
            if (M(a3.options.id) ? -1 === a3.options.id.indexOf("navigator") : 1) {
              var b3 = a3.isXAxis ? "yAxis" : "xAxis";
              b3 = M(a3.options[b3]) ? f2[b3][a3.options[b3]] : f2[b3][0];
              d2 === b3 && t2.push(a3);
            }
          });
          var C2 = t2.length ? [] : [d2.isXAxis ? f2.yAxis[0] : f2.xAxis[0]];
          t2.forEach(function(a3) {
            -1 !== C2.indexOf(a3) || L(C2, function(b3) {
              return b3.pos === a3.pos && b3.len === a3.len;
            }) || C2.push(a3);
          });
          var D2 = h(v, d2.translate(w2, null, null, a2.old));
          u(D2) && (d2.horiz ? C2.forEach(function(a3) {
            var b3;
            g = a3.pos;
            q2 = g + a3.len;
            l = c = Math.round(D2 + d2.transB);
            "pass" !== x2 && (l < m2 || l > m2 + d2.width) && (x2 ? l = c = H(l, m2, m2 + d2.width) : b3 = true);
            b3 || r3.push(["M", l, g], ["L", c, q2]);
          }) : C2.forEach(function(a3) {
            var b3;
            l = a3.pos;
            c = l + a3.len;
            g = q2 = Math.round(p2 + d2.height - D2);
            "pass" !== x2 && (g < p2 || g > p2 + d2.height) && (x2 ? g = q2 = H(g, p2, p2 + d2.height) : b3 = true);
            b3 || r3.push(["M", l, g], ["L", c, q2]);
          }));
          a2.path = 0 < r3.length ? k2.crispPolyLine(r3, a2.lineWidth || 1) : null;
        }
      });
      D.prototype.crispPolyLine = function(a2, b2) {
        for (var d2 = 0; d2 < a2.length; d2 += 2) {
          var e2 = a2[d2], f2 = a2[d2 + 1];
          e2[1] === f2[1] && (e2[1] = f2[1] = Math.round(e2[1]) - b2 % 2 / 2);
          e2[2] === f2[2] && (e2[2] = f2[2] = Math.round(e2[2]) + b2 % 2 / 2);
        }
        return a2;
      };
      K(q, "afterHideCrosshair", function() {
        this.crossLabel && (this.crossLabel = this.crossLabel.hide());
      });
      K(q, "afterDrawCrosshair", function(a2) {
        var b2, d2;
        if (M(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
          var e2 = this.chart, f2 = this.logarithmic, k2 = this.options.crosshair.label, m2 = this.horiz, p2 = this.opposite, l = this.left, g = this.top, c = this.crossLabel, q2 = k2.format, r3 = "", t2 = "inside" === this.options.tickPosition, v = false !== this.crosshair.snap, y2 = 0, A2 = a2.e || this.cross && this.cross.e, C2 = a2.point;
          a2 = this.min;
          var D2 = this.max;
          f2 && (a2 = f2.lin2log(a2), D2 = f2.lin2log(D2));
          f2 = m2 ? "center" : p2 ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
          c || (c = this.crossLabel = e2.renderer.label(null, null, null, k2.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({ align: k2.align || f2, padding: h(k2.padding, 8), r: h(k2.borderRadius, 3), zIndex: 2 }).add(this.labelGroup), e2.styledMode || c.attr({ fill: k2.backgroundColor || this.series[0] && this.series[0].color || "#666666", stroke: k2.borderColor || "", "stroke-width": k2.borderWidth || 0 }).css(w({ color: "#ffffff", fontWeight: "normal", fontSize: "11px", textAlign: "center" }, k2.style)));
          m2 ? (f2 = v ? C2.plotX + l : A2.chartX, g += p2 ? 0 : this.height) : (f2 = p2 ? this.width + l : 0, g = v ? C2.plotY + g : A2.chartY);
          q2 || k2.formatter || (this.dateTime && (r3 = "%b %d, %Y"), q2 = "{value" + (r3 ? ":" + r3 : "") + "}");
          r3 = v ? C2[this.isXAxis ? "x" : "y"] : this.toValue(m2 ? A2.chartX : A2.chartY);
          c.attr({ text: q2 ? x(q2, { value: r3 }, e2) : k2.formatter.call(this, r3), x: f2, y: g, visibility: r3 < a2 || r3 > D2 ? "hidden" : "visible" });
          k2 = c.getBBox();
          if (u(c.y))
            if (m2) {
              if (t2 && !p2 || !t2 && p2)
                g = c.y - k2.height;
            } else
              g = c.y - k2.height / 2;
          m2 ? (b2 = l - k2.x, d2 = l + this.width - k2.x) : (b2 = "left" === this.labelAlign ? l : 0, d2 = "right" === this.labelAlign ? l + this.width : e2.chartWidth);
          c.translateX < b2 && (y2 = b2 - c.translateX);
          c.translateX + k2.width >= d2 && (y2 = -(c.translateX + k2.width - d2));
          c.attr({ x: f2 + y2, y: g, anchorX: m2 ? f2 : this.opposite ? 0 : e2.chartWidth, anchorY: m2 ? this.opposite ? e2.chartHeight : 0 : g + k2.height / 2 });
        }
      });
      t.init = function() {
        b.apply(this, arguments);
        this.setCompare(this.options.compare);
      };
      t.setCompare = function(a2) {
        this.modifyValue = "value" === a2 || "percent" === a2 ? function(b2, d2) {
          var e2 = this.compareValue;
          return "undefined" !== typeof b2 && "undefined" !== typeof e2 ? (b2 = "value" === a2 ? b2 - e2 : b2 / e2 * 100 - (100 === this.options.compareBase ? 0 : 100), d2 && (d2.change = b2), b2) : 0;
        } : null;
        this.userOptions.compare = a2;
        this.chart.hasRendered && (this.isDirty = true);
      };
      t.processData = function(a2) {
        var b2, d2 = -1, e2 = true === this.options.compareStart ? 0 : 1;
        f.apply(this, arguments);
        if (this.xAxis && this.processedYData) {
          var h2 = this.processedXData;
          var k2 = this.processedYData;
          var m2 = k2.length;
          this.pointArrayMap && (d2 = this.pointArrayMap.indexOf(this.options.pointValKey || this.pointValKey || "y"));
          for (b2 = 0; b2 < m2 - e2; b2++) {
            var p2 = k2[b2] && -1 < d2 ? k2[b2][d2] : k2[b2];
            if (u(p2) && h2[b2 + e2] >= this.xAxis.min && 0 !== p2) {
              this.compareValue = p2;
              break;
            }
          }
        }
      };
      K(F, "afterGetExtremes", function(a2) {
        a2 = a2.dataExtremes;
        if (this.modifyValue && a2) {
          var b2 = [this.modifyValue(a2.dataMin), this.modifyValue(a2.dataMax)];
          a2.dataMin = m(b2);
          a2.dataMax = C(b2);
        }
      });
      q.prototype.setCompare = function(a2, b2) {
        this.isXAxis || (this.series.forEach(function(b3) {
          b3.setCompare(a2);
        }), h(b2, true) && this.chart.redraw());
      };
      A.prototype.tooltipFormatter = function(b2) {
        var d2 = this.series.chart.numberFormatter;
        b2 = b2.replace("{point.change}", (0 < this.change ? "+" : "") + d2(this.change, h(this.series.tooltipOptions.changeDecimals, 2)));
        return a.apply(this, [b2]);
      };
      K(F, "render", function() {
        var a2 = this.chart;
        if (!(a2.is3d && a2.is3d() || a2.polar) && this.xAxis && !this.xAxis.isRadial) {
          var b2 = this.yAxis.len;
          if (this.xAxis.axisLine) {
            var d2 = a2.plotTop + a2.plotHeight - this.yAxis.pos - this.yAxis.len, e2 = Math.floor(this.xAxis.axisLine.strokeWidth() / 2);
            0 <= d2 && (b2 -= Math.max(e2 - d2, 0));
          }
          !this.clipBox && this.animate ? (this.clipBox = k(a2.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = b2) : a2[this.sharedClipKey] && (a2[this.sharedClipKey].animate({ width: this.xAxis.len, height: b2 }), a2[this.sharedClipKey + "m"] && a2[this.sharedClipKey + "m"].animate({ width: this.xAxis.len }));
        }
      });
      K(e, "update", function(a2) {
        a2 = a2.options;
        "scrollbar" in a2 && this.navigator && (k(true, this.options.scrollbar, a2.scrollbar), this.navigator.update({}, false), delete a2.scrollbar);
      });
    });
    N(r, "masters/modules/stock.src.js", [], function() {
    });
    N(r, "masters/highstock.src.js", [r["masters/highcharts.src.js"]], function(q) {
      q.product = "Highstock";
      return q;
    });
    r["masters/highstock.src.js"]._modules = r;
    return r["masters/highstock.src.js"];
  });
})(highstock);
var highstockExports = highstock.exports;
const Highcharts$1 = /* @__PURE__ */ getDefaultExportFromCjs(highstockExports);
var exporting = { exports: {} };
(function(module) {
  (function(c) {
    module.exports ? (c["default"] = c, module.exports = c) : c("undefined" !== typeof Highcharts ? Highcharts : void 0);
  })(function(c) {
    function p(c2, l, h, k) {
      c2.hasOwnProperty(l) || (c2[l] = k.apply(null, h));
    }
    c = c ? c._modules : {};
    p(c, "modules/full-screen.src.js", [c["parts/Chart.js"], c["parts/Globals.js"], c["parts/Utilities.js"]], function(c2, l, h) {
      var k = h.addEvent;
      h = function() {
        function c3(e) {
          this.chart = e;
          this.isOpen = false;
          e = e.renderTo;
          this.browserProps || ("function" === typeof e.requestFullscreen ? this.browserProps = { fullscreenChange: "fullscreenchange", requestFullscreen: "requestFullscreen", exitFullscreen: "exitFullscreen" } : e.mozRequestFullScreen ? this.browserProps = { fullscreenChange: "mozfullscreenchange", requestFullscreen: "mozRequestFullScreen", exitFullscreen: "mozCancelFullScreen" } : e.webkitRequestFullScreen ? this.browserProps = {
            fullscreenChange: "webkitfullscreenchange",
            requestFullscreen: "webkitRequestFullScreen",
            exitFullscreen: "webkitExitFullscreen"
          } : e.msRequestFullscreen && (this.browserProps = { fullscreenChange: "MSFullscreenChange", requestFullscreen: "msRequestFullscreen", exitFullscreen: "msExitFullscreen" }));
        }
        c3.prototype.close = function() {
          var e = this.chart;
          if (this.isOpen && this.browserProps && e.container.ownerDocument instanceof Document)
            e.container.ownerDocument[this.browserProps.exitFullscreen]();
          this.unbindFullscreenEvent && this.unbindFullscreenEvent();
          this.isOpen = false;
          this.setButtonText();
        };
        c3.prototype.open = function() {
          var e = this, c4 = e.chart;
          if (e.browserProps) {
            e.unbindFullscreenEvent = k(c4.container.ownerDocument, e.browserProps.fullscreenChange, function() {
              e.isOpen ? (e.isOpen = false, e.close()) : (e.isOpen = true, e.setButtonText());
            });
            var h2 = c4.renderTo[e.browserProps.requestFullscreen]();
            if (h2)
              h2["catch"](function() {
                alert("Full screen is not supported inside a frame.");
              });
            k(c4, "destroy", e.unbindFullscreenEvent);
          }
        };
        c3.prototype.setButtonText = function() {
          var e, c4 = this.chart, h2 = c4.exportDivElements, k2 = c4.options.exporting, l2 = null === (e = null === k2 || void 0 === k2 ? void 0 : k2.buttons) || void 0 === e ? void 0 : e.contextButton.menuItems;
          e = c4.options.lang;
          (null === k2 || void 0 === k2 ? 0 : k2.menuItemDefinitions) && (null === e || void 0 === e ? 0 : e.exitFullscreen) && e.viewFullscreen && l2 && h2 && h2.length && (h2[l2.indexOf("viewFullscreen")].innerHTML = this.isOpen ? e.exitFullscreen : k2.menuItemDefinitions.viewFullscreen.text || e.viewFullscreen);
        };
        c3.prototype.toggle = function() {
          this.isOpen ? this.close() : this.open();
        };
        return c3;
      }();
      l.Fullscreen = h;
      k(
        c2,
        "beforeRender",
        function() {
          this.fullscreen = new l.Fullscreen(this);
        }
      );
      return l.Fullscreen;
    });
    p(c, "mixins/navigation.js", [], function() {
      return { initUpdate: function(c2) {
        c2.navigation || (c2.navigation = { updates: [], update: function(c3, h) {
          this.updates.forEach(function(k) {
            k.update.call(k.context, c3, h);
          });
        } });
      }, addUpdate: function(c2, l) {
        l.navigation || this.initUpdate(l);
        l.navigation.updates.push({ update: c2, context: l });
      } };
    });
    p(c, "modules/exporting.src.js", [
      c["parts/Chart.js"],
      c["mixins/navigation.js"],
      c["parts/Globals.js"],
      c["parts/Options.js"],
      c["parts/SVGRenderer.js"],
      c["parts/Utilities.js"]
    ], function(c2, l, h, k, p2, e) {
      var x = h.doc, H = h.isTouchDevice, z = h.win;
      k = k.defaultOptions;
      var t = e.addEvent, u = e.css, y = e.createElement, D = e.discardElement, w = e.extend, I = e.find, B = e.fireEvent, J = e.isObject, n = e.merge, E = e.objectEach, q = e.pick, K = e.removeEvent, L = e.uniqueKey, F = z.navigator.userAgent, G = h.Renderer.prototype.symbols, M = /Edge\/|Trident\/|MSIE /.test(F), N = /firefox/i.test(F);
      w(k.lang, {
        viewFullscreen: "View in full screen",
        exitFullscreen: "Exit from full screen",
        printChart: "Print chart",
        downloadPNG: "Download PNG image",
        downloadJPEG: "Download JPEG image",
        downloadPDF: "Download PDF document",
        downloadSVG: "Download SVG vector image",
        contextButtonTitle: "Chart context menu"
      });
      k.navigation || (k.navigation = {});
      n(true, k.navigation, { buttonOptions: { theme: {}, symbolSize: 14, symbolX: 12.5, symbolY: 10.5, align: "right", buttonSpacing: 3, height: 22, verticalAlign: "top", width: 24 } });
      n(true, k.navigation, { menuStyle: { border: "1px solid #999999", background: "#ffffff", padding: "5px 0" }, menuItemStyle: {
        padding: "0.5em 1em",
        color: "#333333",
        background: "none",
        fontSize: H ? "14px" : "11px",
        transition: "background 250ms, color 250ms"
      }, menuItemHoverStyle: { background: "#335cad", color: "#ffffff" }, buttonOptions: { symbolFill: "#666666", symbolStroke: "#666666", symbolStrokeWidth: 3, theme: { padding: 5 } } });
      k.exporting = {
        type: "image/png",
        url: "https://export.highcharts.com/",
        printMaxWidth: 780,
        scale: 2,
        buttons: { contextButton: { className: "highcharts-contextbutton", menuClassName: "highcharts-contextmenu", symbol: "menu", titleKey: "contextButtonTitle", menuItems: "viewFullscreen printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" ") } },
        menuItemDefinitions: { viewFullscreen: { textKey: "viewFullscreen", onclick: function() {
          this.fullscreen.toggle();
        } }, printChart: { textKey: "printChart", onclick: function() {
          this.print();
        } }, separator: { separator: true }, downloadPNG: { textKey: "downloadPNG", onclick: function() {
          this.exportChart();
        } }, downloadJPEG: { textKey: "downloadJPEG", onclick: function() {
          this.exportChart({ type: "image/jpeg" });
        } }, downloadPDF: { textKey: "downloadPDF", onclick: function() {
          this.exportChart({ type: "application/pdf" });
        } }, downloadSVG: {
          textKey: "downloadSVG",
          onclick: function() {
            this.exportChart({ type: "image/svg+xml" });
          }
        } }
      };
      h.post = function(a, b, f) {
        var d = y("form", n({ method: "post", action: a, enctype: "multipart/form-data" }, f), { display: "none" }, x.body);
        E(b, function(a2, b2) {
          y("input", { type: "hidden", name: b2, value: a2 }, null, d);
        });
        d.submit();
        D(d);
      };
      h.isSafari && h.win.matchMedia("print").addListener(function(a) {
        h.printingChart && (a.matches ? h.printingChart.beforePrint() : h.printingChart.afterPrint());
      });
      w(c2.prototype, { sanitizeSVG: function(a, b) {
        var f = a.indexOf("</svg>") + 6, d = a.substr(f);
        a = a.substr(0, f);
        b && b.exporting && b.exporting.allowHTML && d && (d = '<foreignObject x="0" y="0" width="' + b.chart.width + '" height="' + b.chart.height + '"><body xmlns="http://www.w3.org/1999/xhtml">' + d + "</body></foreignObject>", a = a.replace("</svg>", d + "</svg>"));
        a = a.replace(/zIndex="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/url\(("|&quot;)(.*?)("|&quot;);?\)/g, "url($2)").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(
          / (|NS[0-9]+:)href=/g,
          " xlink:href="
        ).replace(/\n/, " ").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g, " ").replace(/&shy;/g, "­");
        this.ieSanitizeSVG && (a = this.ieSanitizeSVG(a));
        return a;
      }, getChartHTML: function() {
        this.styledMode && this.inlineStyles();
        return this.container.innerHTML;
      }, getSVG: function(a) {
        var b, f = n(this.options, a);
        f.plotOptions = n(this.userOptions.plotOptions, a && a.plotOptions);
        f.time = n(this.userOptions.time, a && a.time);
        var d = y(
          "div",
          null,
          { position: "absolute", top: "-9999em", width: this.chartWidth + "px", height: this.chartHeight + "px" },
          x.body
        );
        var c3 = this.renderTo.style.width;
        var e2 = this.renderTo.style.height;
        c3 = f.exporting.sourceWidth || f.chart.width || /px$/.test(c3) && parseInt(c3, 10) || (f.isGantt ? 800 : 600);
        e2 = f.exporting.sourceHeight || f.chart.height || /px$/.test(e2) && parseInt(e2, 10) || 400;
        w(f.chart, { animation: false, renderTo: d, forExport: true, renderer: "SVGRenderer", width: c3, height: e2 });
        f.exporting.enabled = false;
        delete f.data;
        f.series = [];
        this.series.forEach(function(a2) {
          b = n(a2.userOptions, { animation: false, enableMouseTracking: false, showCheckbox: false, visible: a2.visible });
          b.isInternal || f.series.push(b);
        });
        this.axes.forEach(function(a2) {
          a2.userOptions.internalKey || (a2.userOptions.internalKey = L());
        });
        var k2 = new h.Chart(f, this.callback);
        a && ["xAxis", "yAxis", "series"].forEach(function(b2) {
          var d2 = {};
          a[b2] && (d2[b2] = a[b2], k2.update(d2));
        });
        this.axes.forEach(function(a2) {
          var b2 = I(k2.axes, function(b3) {
            return b3.options.internalKey === a2.userOptions.internalKey;
          }), d2 = a2.getExtremes(), f2 = d2.userMin;
          d2 = d2.userMax;
          b2 && ("undefined" !== typeof f2 && f2 !== b2.min || "undefined" !== typeof d2 && d2 !== b2.max) && b2.setExtremes(f2, d2, true, false);
        });
        c3 = k2.getChartHTML();
        B(this, "getSVG", { chartCopy: k2 });
        c3 = this.sanitizeSVG(c3, f);
        f = null;
        k2.destroy();
        D(d);
        return c3;
      }, getSVGForExport: function(a, b) {
        var f = this.options.exporting;
        return this.getSVG(n({ chart: { borderRadius: 0 } }, f.chartOptions, b, { exporting: { sourceWidth: a && a.sourceWidth || f.sourceWidth, sourceHeight: a && a.sourceHeight || f.sourceHeight } }));
      }, getFilename: function() {
        var a = this.userOptions.title && this.userOptions.title.text, b = this.options.exporting.filename;
        if (b)
          return b.replace(/\//g, "-");
        "string" === typeof a && (b = a.toLowerCase().replace(/<\/?[^>]+(>|$)/g, "").replace(/[\s_]+/g, "-").replace(/[^a-z0-9\-]/g, "").replace(/^[\-]+/g, "").replace(/[\-]+/g, "-").substr(0, 24).replace(/[\-]+$/g, ""));
        if (!b || 5 > b.length)
          b = "chart";
        return b;
      }, exportChart: function(a, b) {
        b = this.getSVGForExport(a, b);
        a = n(this.options.exporting, a);
        h.post(a.url, {
          filename: a.filename ? a.filename.replace(/\//g, "-") : this.getFilename(),
          type: a.type,
          width: a.width || 0,
          scale: a.scale,
          svg: b
        }, a.formAttributes);
      }, moveContainers: function(a) {
        (this.fixedDiv ? [this.fixedDiv, this.scrollingContainer] : [this.container]).forEach(function(b) {
          a.appendChild(b);
        });
      }, beforePrint: function() {
        var a = x.body, b = this.options.exporting.printMaxWidth, f = { childNodes: a.childNodes, origDisplay: [], resetParams: void 0 };
        this.isPrinting = true;
        this.pointer.reset(null, 0);
        B(this, "beforePrint");
        b && this.chartWidth > b && (f.resetParams = [this.options.chart.width, void 0, false], this.setSize(b, void 0, false));
        [].forEach.call(
          f.childNodes,
          function(a2, b2) {
            1 === a2.nodeType && (f.origDisplay[b2] = a2.style.display, a2.style.display = "none");
          }
        );
        this.moveContainers(a);
        this.printReverseInfo = f;
      }, afterPrint: function() {
        if (this.printReverseInfo) {
          var a = this.printReverseInfo.childNodes, b = this.printReverseInfo.origDisplay, f = this.printReverseInfo.resetParams;
          this.moveContainers(this.renderTo);
          [].forEach.call(a, function(a2, f2) {
            1 === a2.nodeType && (a2.style.display = b[f2] || "");
          });
          this.isPrinting = false;
          f && this.setSize.apply(this, f);
          delete this.printReverseInfo;
          delete h.printingChart;
          B(this, "afterPrint");
        }
      }, print: function() {
        var a = this;
        a.isPrinting || (h.printingChart = a, h.isSafari || a.beforePrint(), setTimeout(function() {
          z.focus();
          z.print();
          h.isSafari || setTimeout(function() {
            a.afterPrint();
          }, 1e3);
        }, 1));
      }, contextMenu: function(a, b, f, d, c3, h2, k2) {
        var g = this, C = g.options.navigation, l2 = g.chartWidth, A = g.chartHeight, r = "cache-" + a, m = g[r], v = Math.max(c3, h2);
        if (!m) {
          g.exportContextMenu = g[r] = m = y("div", { className: a }, { position: "absolute", zIndex: 1e3, padding: v + "px", pointerEvents: "auto" }, g.fixedDiv || g.container);
          var n2 = y("ul", { className: "highcharts-menu" }, { listStyle: "none", margin: 0, padding: 0 }, m);
          g.styledMode || u(n2, w({ MozBoxShadow: "3px 3px 10px #888", WebkitBoxShadow: "3px 3px 10px #888", boxShadow: "3px 3px 10px #888" }, C.menuStyle));
          m.hideMenu = function() {
            u(m, { display: "none" });
            k2 && k2.setState(0);
            g.openMenu = false;
            u(g.renderTo, { overflow: "hidden" });
            e.clearTimeout(m.hideTimer);
            B(g, "exportMenuHidden");
          };
          g.exportEvents.push(
            t(m, "mouseleave", function() {
              m.hideTimer = z.setTimeout(m.hideMenu, 500);
            }),
            t(m, "mouseenter", function() {
              e.clearTimeout(m.hideTimer);
            }),
            t(x, "mouseup", function(b2) {
              g.pointer.inClass(b2.target, a) || m.hideMenu();
            }),
            t(m, "click", function() {
              g.openMenu && m.hideMenu();
            })
          );
          b.forEach(function(a2) {
            "string" === typeof a2 && (a2 = g.options.exporting.menuItemDefinitions[a2]);
            if (J(a2, true)) {
              if (a2.separator)
                var b2 = y("hr", null, null, n2);
              else
                b2 = y("li", { className: "highcharts-menu-item", onclick: function(b3) {
                  b3 && b3.stopPropagation();
                  m.hideMenu();
                  a2.onclick && a2.onclick.apply(g, arguments);
                }, innerHTML: a2.text || g.options.lang[a2.textKey] }, null, n2), g.styledMode || (b2.onmouseover = function() {
                  u(
                    this,
                    C.menuItemHoverStyle
                  );
                }, b2.onmouseout = function() {
                  u(this, C.menuItemStyle);
                }, u(b2, w({ cursor: "pointer" }, C.menuItemStyle)));
              g.exportDivElements.push(b2);
            }
          });
          g.exportDivElements.push(n2, m);
          g.exportMenuWidth = m.offsetWidth;
          g.exportMenuHeight = m.offsetHeight;
        }
        b = { display: "block" };
        f + g.exportMenuWidth > l2 ? b.right = l2 - f - c3 - v + "px" : b.left = f - v + "px";
        d + h2 + g.exportMenuHeight > A && "top" !== k2.alignOptions.verticalAlign ? b.bottom = A - d - v + "px" : b.top = d + h2 - v + "px";
        u(m, b);
        u(g.renderTo, { overflow: "" });
        g.openMenu = true;
        B(g, "exportMenuShown");
      }, addButton: function(a) {
        var b = this, f = b.renderer, d = n(b.options.navigation.buttonOptions, a), c3 = d.onclick, e2 = d.menuItems, h2 = d.symbolSize || 12;
        b.btnCount || (b.btnCount = 0);
        b.exportDivElements || (b.exportDivElements = [], b.exportSVGElements = []);
        if (false !== d.enabled) {
          var g = d.theme, k2 = g.states, l2 = k2 && k2.hover;
          k2 = k2 && k2.select;
          var A;
          b.styledMode || (g.fill = q(g.fill, "#ffffff"), g.stroke = q(g.stroke, "none"));
          delete g.states;
          c3 ? A = function(a2) {
            a2 && a2.stopPropagation();
            c3.call(b, a2);
          } : e2 && (A = function(a2) {
            a2 && a2.stopPropagation();
            b.contextMenu(
              r.menuClassName,
              e2,
              r.translateX,
              r.translateY,
              r.width,
              r.height,
              r
            );
            r.setState(2);
          });
          d.text && d.symbol ? g.paddingLeft = q(g.paddingLeft, 25) : d.text || w(g, { width: d.width, height: d.height, padding: 0 });
          b.styledMode || (g["stroke-linecap"] = "round", g.fill = q(g.fill, "#ffffff"), g.stroke = q(g.stroke, "none"));
          var r = f.button(d.text, 0, 0, A, g, l2, k2).addClass(a.className).attr({ title: q(b.options.lang[d._titleKey || d.titleKey], "") });
          r.menuClassName = a.menuClassName || "highcharts-menu-" + b.btnCount++;
          if (d.symbol) {
            var m = f.symbol(
              d.symbol,
              d.symbolX - h2 / 2,
              d.symbolY - h2 / 2,
              h2,
              h2,
              { width: h2, height: h2 }
            ).addClass("highcharts-button-symbol").attr({ zIndex: 1 }).add(r);
            b.styledMode || m.attr({ stroke: d.symbolStroke, fill: d.symbolFill, "stroke-width": d.symbolStrokeWidth || 1 });
          }
          r.add(b.exportingGroup).align(w(d, { width: r.width, x: q(d.x, b.buttonOffset) }), true, "spacingBox");
          b.buttonOffset += (r.width + d.buttonSpacing) * ("right" === d.align ? -1 : 1);
          b.exportSVGElements.push(r, m);
        }
      }, destroyExport: function(a) {
        var b = a ? a.target : this;
        a = b.exportSVGElements;
        var f = b.exportDivElements, d = b.exportEvents, c3;
        a && (a.forEach(function(a2, d2) {
          a2 && (a2.onclick = a2.ontouchstart = null, c3 = "cache-" + a2.menuClassName, b[c3] && delete b[c3], b.exportSVGElements[d2] = a2.destroy());
        }), a.length = 0);
        b.exportingGroup && (b.exportingGroup.destroy(), delete b.exportingGroup);
        f && (f.forEach(function(a2, d2) {
          e.clearTimeout(a2.hideTimer);
          K(a2, "mouseleave");
          b.exportDivElements[d2] = a2.onmouseout = a2.onmouseover = a2.ontouchstart = a2.onclick = null;
          D(a2);
        }), f.length = 0);
        d && (d.forEach(function(a2) {
          a2();
        }), d.length = 0);
      } });
      p2.prototype.inlineToAttributes = "fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");
      p2.prototype.inlineBlacklist = [/-/, /^(clipPath|cssText|d|height|width)$/, /^font$/, /[lL]ogical(Width|Height)$/, /perspective/, /TapHighlightColor/, /^transition/, /^length$/];
      p2.prototype.unstyledElements = ["clipPath", "defs", "desc"];
      c2.prototype.inlineStyles = function() {
        function a(a2) {
          return a2.replace(/([A-Z])/g, function(a3, b2) {
            return "-" + b2.toLowerCase();
          });
        }
        function b(c4) {
          function f(b2, f2) {
            v = u2 = false;
            if (h2) {
              for (q2 = h2.length; q2-- && !u2; )
                u2 = h2[q2].test(f2);
              v = !u2;
            }
            "transform" === f2 && "none" === b2 && (v = true);
            for (q2 = e2.length; q2-- && !v; )
              v = e2[q2].test(f2) || "function" === typeof b2;
            v || y2[f2] === b2 && "svg" !== c4.nodeName || g[c4.nodeName][f2] === b2 || (d && -1 === d.indexOf(f2) ? m += a(f2) + ":" + b2 + ";" : b2 && c4.setAttribute(a(f2), b2));
          }
          var m = "", v, u2, q2;
          if (1 === c4.nodeType && -1 === k2.indexOf(c4.nodeName)) {
            var t2 = z.getComputedStyle(c4, null);
            var y2 = "svg" === c4.nodeName ? {} : z.getComputedStyle(c4.parentNode, null);
            if (!g[c4.nodeName]) {
              l2 = p3.getElementsByTagName("svg")[0];
              var w2 = p3.createElementNS(c4.namespaceURI, c4.nodeName);
              l2.appendChild(w2);
              g[c4.nodeName] = n(z.getComputedStyle(w2, null));
              "text" === c4.nodeName && delete g.text.fill;
              l2.removeChild(w2);
            }
            if (N || M)
              for (var x2 in t2)
                f(t2[x2], x2);
            else
              E(t2, f);
            m && (t2 = c4.getAttribute("style"), c4.setAttribute("style", (t2 ? t2 + ";" : "") + m));
            "svg" === c4.nodeName && c4.setAttribute("stroke-width", "1px");
            "text" !== c4.nodeName && [].forEach.call(c4.children || c4.childNodes, b);
          }
        }
        var c3 = this.renderer, d = c3.inlineToAttributes, e2 = c3.inlineBlacklist, h2 = c3.inlineWhitelist, k2 = c3.unstyledElements, g = {}, l2;
        c3 = x.createElement("iframe");
        u(c3, { width: "1px", height: "1px", visibility: "hidden" });
        x.body.appendChild(c3);
        var p3 = c3.contentWindow.document;
        p3.open();
        p3.write('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
        p3.close();
        b(this.container.querySelector("svg"));
        l2.parentNode.removeChild(l2);
      };
      G.menu = function(a, b, c3, d) {
        return [["M", a, b + 2.5], ["L", a + c3, b + 2.5], ["M", a, b + d / 2 + 0.5], ["L", a + c3, b + d / 2 + 0.5], ["M", a, b + d - 1.5], ["L", a + c3, b + d - 1.5]];
      };
      G.menuball = function(a, b, c3, d) {
        a = [];
        d = d / 3 - 2;
        return a = a.concat(this.circle(c3 - d, b, d, d), this.circle(c3 - d, b + d + 4, d, d), this.circle(c3 - d, b + 2 * (d + 4), d, d));
      };
      c2.prototype.renderExporting = function() {
        var a = this, b = a.options.exporting, c3 = b.buttons, d = a.isDirtyExporting || !a.exportSVGElements;
        a.buttonOffset = 0;
        a.isDirtyExporting && a.destroyExport();
        d && false !== b.enabled && (a.exportEvents = [], a.exportingGroup = a.exportingGroup || a.renderer.g("exporting-group").attr({ zIndex: 3 }).add(), E(c3, function(b2) {
          a.addButton(b2);
        }), a.isDirtyExporting = false);
        t(a, "destroy", a.destroyExport);
      };
      t(c2, "init", function() {
        var a = this;
        a.exporting = { update: function(b, c3) {
          a.isDirtyExporting = true;
          n(true, a.options.exporting, b);
          q(c3, true) && a.redraw();
        } };
        l.addUpdate(function(b, c3) {
          a.isDirtyExporting = true;
          n(
            true,
            a.options.navigation,
            b
          );
          q(c3, true) && a.redraw();
        }, a);
      });
      c2.prototype.callbacks.push(function(a) {
        a.renderExporting();
        t(a, "redraw", a.renderExporting);
      });
    });
    p(c, "masters/modules/exporting.src.js", [], function() {
    });
  });
})(exporting);
var exportingExports = exporting.exports;
const ExportingModule = /* @__PURE__ */ getDefaultExportFromCjs(exportingExports);
var noDataToDisplay = { exports: {} };
(function(module) {
  (function(a) {
    module.exports ? (a["default"] = a, module.exports = a) : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
  })(function(a) {
    function d(a2, c, d2, e) {
      a2.hasOwnProperty(c) || (a2[c] = e.apply(null, d2));
    }
    a = a ? a._modules : {};
    d(a, "modules/no-data-to-display.src.js", [a["parts/Globals.js"], a["parts/Utilities.js"]], function(a2, c) {
      var d2 = c.addEvent, e = c.extend, f = c.getOptions;
      c = a2.Chart.prototype;
      f = f();
      e(f.lang, { noData: "No data to display" });
      f.noData = { attr: { zIndex: 1 }, position: { x: 0, y: 0, align: "center", verticalAlign: "middle" }, style: { fontWeight: "bold", fontSize: "12px", color: "#666666" } };
      c.showNoData = function(a3) {
        var b = this.options;
        a3 = a3 || b && b.lang.noData;
        b = b && b.noData;
        !this.noDataLabel && this.renderer && (this.noDataLabel = this.renderer.label(a3, 0, 0, null, null, null, b.useHTML, null, "no-data"), this.styledMode || this.noDataLabel.attr(b.attr).css(b.style), this.noDataLabel.add(), this.noDataLabel.align(e(this.noDataLabel.getBBox(), b.position), false, "plotBox"));
      };
      c.hideNoData = function() {
        this.noDataLabel && (this.noDataLabel = this.noDataLabel.destroy());
      };
      c.hasData = function() {
        for (var a3 = this.series || [], b = a3.length; b--; )
          if (a3[b].hasData() && !a3[b].options.isInternal)
            return true;
        return this.loadingShown;
      };
      d2(a2.Chart, "render", function() {
        this.hasData() ? this.hideNoData() : this.showNoData();
      });
    });
    d(a, "masters/modules/no-data-to-display.src.js", [], function() {
    });
  });
})(noDataToDisplay);
var noDataToDisplayExports = noDataToDisplay.exports;
const NoDataModule = /* @__PURE__ */ getDefaultExportFromCjs(noDataToDisplayExports);
var patternFill = { exports: {} };
(function(module) {
  (function(c) {
    module.exports ? (c["default"] = c, module.exports = c) : c("undefined" !== typeof Highcharts ? Highcharts : void 0);
  })(function(c) {
    function g(c2, p, g2, e) {
      c2.hasOwnProperty(p) || (c2[p] = e.apply(null, g2));
    }
    c = c ? c._modules : {};
    g(
      c,
      "modules/pattern-fill.src.js",
      [c["parts/Globals.js"], c["parts/Point.js"], c["parts/SVGRenderer.js"], c["parts/Utilities.js"]],
      function(c2, g2, r, e) {
        function p(a, b) {
          a = JSON.stringify(a);
          var c3 = a.length || 0, f = 0, d = 0;
          if (b) {
            b = Math.max(Math.floor(c3 / 500), 1);
            for (var e2 = 0; e2 < c3; e2 += b)
              f += a.charCodeAt(e2);
            f &= f;
          }
          for (; d < c3; ++d)
            b = a.charCodeAt(d), f = (f << 5) - f + b, f &= f;
          return f.toString(16).replace("-", "1");
        }
        var k = e.addEvent, u = e.animObject, v = e.erase, w = e.getOptions, t = e.merge, q = e.pick, x = e.removeEvent;
        e = e.wrap;
        c2.patterns = function() {
          var a = [], b = w().colors;
          "M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11;M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9;M 3 0 L 3 10 M 8 0 L 8 10;M 0 3 L 10 3 M 0 8 L 10 8;M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7;M 3 3 L 8 3 L 8 8 L 3 8 Z;M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0;M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7;M 2 5 L 5 2 L 8 5 L 5 8 Z;M 0 0 L 5 10 L 10 0".split(";").forEach(function(c3, f) {
            a.push({ path: c3, color: b[f], width: 10, height: 10 });
          });
          return a;
        }();
        g2.prototype.calculatePatternDimensions = function(a) {
          if (!a.width || !a.height) {
            var b = this.graphic && (this.graphic.getBBox && this.graphic.getBBox(true) || this.graphic.element && this.graphic.element.getBBox()) || {}, c3 = this.shapeArgs;
            c3 && (b.width = c3.width || b.width, b.height = c3.height || b.height, b.x = c3.x || b.x, b.y = c3.y || b.y);
            if (a.image) {
              if (!b.width || !b.height) {
                a._width = "defer";
                a._height = "defer";
                return;
              }
              a.aspectRatio && (b.aspectRatio = b.width / b.height, a.aspectRatio > b.aspectRatio ? b.aspectWidth = b.height * a.aspectRatio : b.aspectHeight = b.width / a.aspectRatio);
              a._width = a.width || Math.ceil(b.aspectWidth || b.width);
              a._height = a.height || Math.ceil(b.aspectHeight || b.height);
            }
            a.width || (a._x = a.x || 0, a._x += b.x - Math.round(b.aspectWidth ? Math.abs(b.aspectWidth - b.width) / 2 : 0));
            a.height || (a._y = a.y || 0, a._y += b.y - Math.round(b.aspectHeight ? Math.abs(b.aspectHeight - b.height) / 2 : 0));
          }
        };
        r.prototype.addPattern = function(a, b) {
          b = q(b, true);
          var c3 = u(b), f = a.width || a._width || 32, d = a.height || a._height || 32, e2 = a.color || "#343434", h = a.id, g3 = this, n = function(a2) {
            g3.rect(0, 0, f, d).attr({ fill: a2 }).add(m);
          };
          h || (this.idCounter = this.idCounter || 0, h = "highcharts-pattern-" + this.idCounter + "-" + (this.chartIndex || 0), ++this.idCounter);
          this.defIds = this.defIds || [];
          if (!(-1 < this.defIds.indexOf(h))) {
            this.defIds.push(h);
            var l = { id: h, patternUnits: "userSpaceOnUse", patternContentUnits: a.patternContentUnits || "userSpaceOnUse", width: f, height: d, x: a._x || a.x || 0, y: a._y || a.y || 0 };
            a.patternTransform && (l.patternTransform = a.patternTransform);
            var m = this.createElement("pattern").attr(l).add(this.defs);
            m.id = h;
            a.path ? (l = a.path, a.backgroundColor && n(a.backgroundColor), n = { d: l.d || l }, this.styledMode || (n.stroke = l.stroke || e2, n["stroke-width"] = q(l.strokeWidth, 2), n.fill = l.fill || "none"), l.transform && (n.transform = l.transform), this.createElement("path").attr(n).add(m), m.color = e2) : a.image && (b ? this.image(a.image, 0, 0, f, d, function() {
              this.animate({ opacity: q(a.opacity, 1) }, c3);
              x(this.element, "load");
            }).attr({ opacity: 0 }).add(m) : this.image(a.image, 0, 0, f, d).add(m));
            a.image && b || "undefined" === typeof a.opacity || [].forEach.call(m.element.childNodes, function(b2) {
              b2.setAttribute("opacity", a.opacity);
            });
            this.patternElements = this.patternElements || {};
            return this.patternElements[h] = m;
          }
        };
        e(c2.Series.prototype, "getColor", function(a) {
          var b = this.options.color;
          b && b.pattern && !b.pattern.color ? (delete this.options.color, a.apply(this, Array.prototype.slice.call(arguments, 1)), b.pattern.color = this.color, this.color = this.options.color = b) : a.apply(this, Array.prototype.slice.call(arguments, 1));
        });
        k(
          c2.Series,
          "render",
          function() {
            var a = this.chart.isResizing;
            (this.isDirtyData || a || !this.chart.hasRendered) && (this.points || []).forEach(function(b) {
              var c3 = b.options && b.options.color;
              c3 && c3.pattern && (!a || b.shapeArgs && b.shapeArgs.width && b.shapeArgs.height ? b.calculatePatternDimensions(c3.pattern) : (c3.pattern._width = "defer", c3.pattern._height = "defer"));
            });
          }
        );
        k(g2, "afterInit", function() {
          var a = this.options.color;
          a && a.pattern && ("string" === typeof a.pattern.path && (a.pattern.path = { d: a.pattern.path }), this.color = this.options.color = t(this.series.options.color, a));
        });
        k(r, "complexColor", function(a) {
          var b = a.args[0], e2 = a.args[1];
          a = a.args[2];
          var f = this.chartIndex || 0, d = b.pattern, k2 = "#343434";
          "undefined" !== typeof b.patternIndex && c2.patterns && (d = c2.patterns[b.patternIndex]);
          if (!d)
            return true;
          if (d.image || "string" === typeof d.path || d.path && d.path.d) {
            var h = a.parentNode && a.parentNode.getAttribute("class");
            h = h && -1 < h.indexOf("highcharts-legend");
            "defer" !== d._width && "defer" !== d._height || g2.prototype.calculatePatternDimensions.call(
              { graphic: { element: a } },
              d
            );
            if (h || !d.id)
              d = t({}, d), d.id = "highcharts-pattern-" + f + "-" + p(d) + p(d, true);
            this.addPattern(d, !this.forExport && q(d.animation, this.globalAnimation, { duration: 100 }));
            k2 = "url(" + this.url + "#" + d.id + ")";
          } else
            k2 = d.color || k2;
          a.setAttribute(e2, k2);
          b.toString = function() {
            return k2;
          };
          return false;
        });
        k(c2.Chart, "endResize", function() {
          (this.renderer && this.renderer.defIds || []).filter(function(a) {
            return a && a.indexOf && 0 === a.indexOf("highcharts-pattern-");
          }).length && (this.series.forEach(function(a) {
            a.points.forEach(function(a2) {
              (a2 = a2.options && a2.options.color) && a2.pattern && (a2.pattern._width = "defer", a2.pattern._height = "defer");
            });
          }), this.redraw(false));
        });
        k(c2.Chart, "redraw", function() {
          var a = {}, b = this.renderer, c3 = (b.defIds || []).filter(function(a2) {
            return a2.indexOf && 0 === a2.indexOf("highcharts-pattern-");
          });
          c3.length && ([].forEach.call(this.renderTo.querySelectorAll('[color^="url("], [fill^="url("], [stroke^="url("]'), function(c4) {
            if (c4 = c4.getAttribute("fill") || c4.getAttribute("color") || c4.getAttribute("stroke"))
              c4 = c4.replace(b.url, "").replace("url(#", "").replace(
                ")",
                ""
              ), a[c4] = true;
          }), c3.forEach(function(c4) {
            a[c4] || (v(b.defIds, c4), b.patternElements[c4] && (b.patternElements[c4].destroy(), delete b.patternElements[c4]));
          }));
        });
      }
    );
    g(c, "masters/modules/pattern-fill.src.js", [], function() {
    });
  });
})(patternFill);
var patternFillExports = patternFill.exports;
const PatternFillModule = /* @__PURE__ */ getDefaultExportFromCjs(patternFillExports);
ExportingModule(Highcharts$1);
NoDataModule(Highcharts$1);
PatternFillModule(Highcharts$1);
if (typeof window !== "undefined" && !window.Highcharts) {
  window.Highcharts = Highcharts$1;
}
class widgetsController {
  constructor() {
    this.widgets = new widgetsClass();
    this.bind();
  }
  bind() {
    window[this.widgets.defaults.objectName] = {};
    document.addEventListener(
      "DOMContentLoaded",
      () => this.initWidgets(),
      false
    );
    window[this.widgets.defaults.objectName].bindWidget = () => {
      window[this.widgets.defaults.objectName].init = false;
      this.initWidgets();
    };
  }
  initWidgets() {
    if (!window[this.widgets.defaults.objectName].init) {
      window[this.widgets.defaults.objectName].init = true;
      let mainElements = Array.prototype.slice.call(
        document.getElementsByClassName(this.widgets.defaults.className)
      );
      this.widgets.setWidgetClass(mainElements);
      window.addEventListener(
        "resize",
        () => {
          this.widgets.setWidgetClass(mainElements);
          for (let i = 0; i < mainElements.length; i++) {
            this.widgets.setBeforeElementInFooter(i);
          }
        },
        false
      );
      let scriptElement = this.widgets.getScriptElement();
      if (scriptElement && scriptElement.dataset && scriptElement.dataset.cpCurrencyWidget) {
        let dataset = JSON.parse(scriptElement.dataset.cpCurrencyWidget);
        if (Object.keys(dataset)) {
          let keys = Object.keys(dataset);
          for (let j = 0; j < keys.length; j++) {
            let key = keys[j].replace("-", "_");
            this.widgets.defaults[key] = dataset[keys[j]];
          }
        }
      }
      setTimeout(() => {
        this.widgets.states = [];
        return cpBootstrap.loop(mainElements, (element, index) => {
          let newSettings = JSON.parse(JSON.stringify(this.widgets.defaults));
          newSettings.isWordpress = element.classList.contains("wordpress");
          newSettings.isNightMode = element.classList.contains(
            "cp-widget__night-mode"
          );
          newSettings.mainElement = element;
          this.widgets.states.push(newSettings);
          let promise = Promise.resolve();
          promise = promise.then(() => null);
          promise = promise.then(() => {
            return this.widgets.init(index);
          });
          return promise;
        });
      }, 50);
    }
  }
}
class widgetsClass {
  constructor() {
    this.states = [];
    this.defaults = {
      objectName: "cpCurrencyWidgets",
      className: "coinpaprika-currency-widget",
      cssFileName: "widget.min.css",
      currency: "btc-bitcoin",
      primary_currency: "USD",
      range_list: ["24h", "7d", "30d", "1q", "1y", "ytd", "all"],
      range: "24h",
      modules: ["market_details", "chart"],
      update_active: false,
      update_timeout: "30s",
      language: "en",
      customDate: false,
      startDate: null,
      endDate: null,
      style_src: null,
      img_src: null,
      icon_src: null,
      lang_src: null,
      data_src: null,
      origin_src: "https://unpkg.com/@coinpaprika/widget-currency@latest",
      show_details_currency: false,
      volume_visible: true,
      ticker: {
        name: void 0,
        symbol: void 0,
        price: void 0,
        price_change_24h: void 0,
        rank: void 0,
        price_ath: void 0,
        volume_24h: void 0,
        market_cap: void 0,
        percent_from_price_ath: void 0,
        volume_24h_change_24h: void 0,
        market_cap_change_24h: void 0
      },
      interval: null,
      isWordpress: false,
      isNightMode: false,
      isData: false,
      availableModules: ["price", "chart", "market_details"],
      message: "data_loading",
      translations: {},
      mainElement: null,
      noTranslationLabels: [],
      scriptsDownloaded: {},
      chart: null,
      rwd: {
        xs: 280,
        s: 320,
        m: 370,
        l: 462
      }
    };
  }
  init(index) {
    if (!this.getMainElement(index)) {
      return console.error(
        'Bind failed, no element with class = "' + this.defaults.className + '"'
      );
    }
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return this.getDefaults(index);
    });
    promise = promise.then(() => {
      return this.setOriginLink(index);
    });
    return promise;
  }
  setWidgetClass(elements) {
    for (let i = 0; i < elements.length; i++) {
      let width = elements[i].getBoundingClientRect().width;
      let rwdKeys = Object.keys(this.defaults.rwd);
      for (let j = 0; j < rwdKeys.length; j++) {
        let rwdKey = rwdKeys[j];
        let rwdParam = this.defaults.rwd[rwdKey];
        let className = this.defaults.className + "__" + rwdKey;
        if (width <= rwdParam)
          elements[i].classList.add(className);
        if (width > rwdParam)
          elements[i].classList.remove(className);
      }
    }
  }
  getMainElement(index) {
    return this.states[index] ? this.states[index].mainElement : null;
  }
  getDefaults(index) {
    return new Promise((resolve) => {
      let mainElement = this.getMainElement(index);
      if (mainElement && mainElement.dataset) {
        if (!mainElement.dataset.modules && mainElement.dataset.version === "extended")
          this.updateData(index, "modules", ["market_details"]);
        if (!mainElement.dataset.modules && mainElement.dataset.version === "standard")
          this.updateData(index, "modules", []);
        if (mainElement.dataset.modules)
          this.updateData(
            index,
            "modules",
            JSON.parse(mainElement.dataset.modules)
          );
        if (mainElement.dataset.primaryCurrency)
          this.updateData(
            index,
            "primary_currency",
            mainElement.dataset.primaryCurrency
          );
        if (mainElement.dataset.currency)
          this.updateData(index, "currency", mainElement.dataset.currency);
        if (mainElement.dataset.customDate)
          this.updateData(index, "customDate", mainElement.dataset.customDate);
        if (mainElement.dataset.startDate)
          this.updateData(index, "startDate", mainElement.dataset.startDate);
        if (mainElement.dataset.endDate)
          this.updateData(index, "endDate", mainElement.dataset.endDate);
        if (mainElement.dataset.range)
          this.updateData(index, "range", mainElement.dataset.range);
        if (mainElement.dataset.showDetailsCurrency)
          this.updateData(
            index,
            "show_details_currency",
            mainElement.dataset.showDetailsCurrency === "true"
          );
        if (mainElement.dataset.volumeVisible)
          this.updateData(
            index,
            "volume_visible",
            mainElement.dataset.volumeVisible === "true"
          );
        if (mainElement.dataset.updateActive)
          this.updateData(
            index,
            "update_active",
            mainElement.dataset.updateActive === "true"
          );
        if (mainElement.dataset.updateTimeout)
          this.updateData(
            index,
            "update_timeout",
            cpBootstrap.parseIntervalValue(mainElement.dataset.updateTimeout)
          );
        if (mainElement.dataset.language)
          this.updateData(index, "language", mainElement.dataset.language);
        if (mainElement.dataset.originSrc)
          this.updateData(index, "origin_src", mainElement.dataset.originSrc);
        if (mainElement.dataset.nodeModulesSrc)
          this.updateData(
            index,
            "node_modules_src",
            mainElement.dataset.nodeModulesSrc
          );
        if (mainElement.dataset.bowerSrc)
          this.updateData(index, "bower_src", mainElement.dataset.bowerSrc);
        if (mainElement.dataset.styleSrc)
          this.updateData(index, "style_src", mainElement.dataset.styleSrc);
        if (mainElement.dataset.langSrc)
          this.updateData(index, "lang_src", mainElement.dataset.langSrc);
        if (mainElement.dataset.imgSrc)
          this.updateData(index, "img_src", mainElement.dataset.imgSrc);
        if (mainElement.dataset.iconSrc)
          this.updateData(index, "icon_src", mainElement.dataset.iconSrc);
        return resolve();
      }
      return resolve();
    });
  }
  setOriginLink(index) {
    if (!this.defaults.translations) {
      this.defaults.translations = {};
    }
    this.defaults.translations["en"] = {
      "rank": "Rank",
      "ath": "ATH",
      "volume_24h": "Volume 24h",
      "market_cap": "Market cap",
      "powered_by": "powered by",
      "zoom_in": "Zoom in: ",
      "24h": "24h",
      "7d": "7d",
      "30d": "30d",
      "1q": "1q",
      "1y": "1y",
      "ytd": "YTD",
      "all": "ALL",
      "data_unavailable": "Data is currently unavailable",
      "data_loading": "Data is loading..."
    };
    if (Object.keys(this.defaults.translations).length === 0)
      this.getTranslations(this.defaults.language);
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return this.stylesheet();
    });
    promise = promise.then(() => {
      return this.addWidgetElement(index);
    });
    promise = promise.then(() => {
      return this.initInterval(index);
    });
    return promise;
  }
  addWidgetElement(index) {
    let mainElement = this.getMainElement(index);
    let modules = "";
    let modulesArray = [];
    let chartContainer = null;
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return cpBootstrap.loop(this.defaults.availableModules, (module) => {
        return this.states[index].modules.indexOf(module) > -1 ? modulesArray.push(module) : null;
      });
    });
    promise = promise.then(() => {
      return cpBootstrap.loop(modulesArray, (module) => {
        let label = null;
        if (module === "chart")
          label = "Chart";
        if (module === "market_details")
          label = "MarketDetails";
        return label ? this[`widget${label}Element`](index).then(
          (result) => modules += result
        ) : null;
      });
    });
    promise = promise.then(() => {
      return mainElement.innerHTML = this.widgetMainElement(index) + modules + this.widgetFooter(index);
    });
    promise = promise.then(() => {
      chartContainer = document.getElementById(
        `${this.defaults.className}-price-chart-${index}`
      );
      return chartContainer ? chartContainer.parentElement.insertAdjacentHTML(
        "beforeend",
        this.widgetSelectElement(index, "range")
      ) : null;
    });
    promise = promise.then(() => {
      if (chartContainer) {
        this.states[index].chart = new chartClass(
          chartContainer,
          this.states[index]
        );
        this.setSelectListeners(index);
      }
      return null;
    });
    promise = promise.then(() => {
      return this.setBeforeElementInFooter(index);
    });
    promise = promise.then(() => {
      return this.getData(index);
    });
    return promise;
  }
  setSelectListeners(index) {
    let mainElement = this.getMainElement(index);
    let selectElements = mainElement.querySelectorAll(".cp-widget-select");
    for (let i = 0; i < selectElements.length; i++) {
      let buttons = selectElements[i].querySelectorAll(
        ".cp-widget-select__options button"
      );
      for (let j = 0; j < buttons.length; j++) {
        buttons[j].addEventListener(
          "click",
          (event2) => {
            this.setSelectOption(event2, index);
          },
          false
        );
      }
    }
  }
  setSelectOption(event2, index) {
    let className = "cp-widget-active";
    for (let i = 0; i < event2.target.parentNode.childNodes.length; i++) {
      let sibling = event2.target.parentNode.childNodes[i];
      if (sibling.classList.contains(className))
        sibling.classList.remove(className);
    }
    let parent = event2.target.closest(".cp-widget-select");
    let type = parent.dataset.type;
    let pickedValueElement = parent.querySelector(
      ".cp-widget-select__options > span"
    );
    let value = event2.target.dataset.option;
    pickedValueElement.innerText = this.getTranslation(
      index,
      value.toLowerCase()
    );
    this.updateData(index, type, value);
    event2.target.classList.add(className);
    this.dispatchEvent(index, "-switch-range", value);
  }
  dispatchEvent(index, name, data) {
    let id = `${this.defaults.className}-price-chart-${index}`;
    return document.dispatchEvent(
      new CustomEvent(`${id}${name}`, { detail: { data } })
    );
  }
  getData(index) {
    const url = "https://api.coinpaprika.com/v1/widget/" + this.states[index].currency + "?quote=" + this.states[index].primary_currency;
    return fetchService.fetchData(url).then((response) => {
      return response.json().then((result) => {
        if (!this.states[index].isData)
          this.updateData(index, "isData", true);
        this.updateTicker(index, result);
      });
    }).catch((error) => {
      return this.onErrorRequest(index, error);
    });
  }
  onErrorRequest(index, xhr) {
    if (this.states[index].isData)
      this.updateData(index, "isData", false);
    this.updateData(index, "message", "data_unavailable");
    console.error(
      "Request failed.  Returned status of " + xhr,
      this.states[index]
    );
  }
  initInterval(index) {
    clearInterval(this.states[index].interval);
    if (this.states[index].update_active && this.states[index].update_timeout > 1e3) {
      this.states[index].interval = setInterval(() => {
        this.getData(index);
      }, this.states[index].update_timeout);
    }
  }
  setBeforeElementInFooter(index) {
    const state = this.states && this.states[index];
    if (!state || state.isWordpress)
        return;
    const mainElement = this.getMainElement(index);
    if (!mainElement)
        return;
    if (mainElement.children[0].localName === "style") {
      mainElement.removeChild(mainElement.childNodes[0]);
    }
    let footerElement = mainElement.querySelector(".cp-widget__footer");
    let value = footerElement.getBoundingClientRect().width - 43;
    for (let i = 0; i < footerElement.childNodes.length; i++) {
        value -= footerElement.childNodes[i].getBoundingClientRect().width;
    }
    let style = document.createElement("style");
    style.innerHTML = ".cp-widget__footer--" + index + "::before{width:" + value.toFixed(0) + "px;}";
    mainElement.insertBefore(style, mainElement.children[0]);
  }
  updateWidgetElement(index, key, value, ticker) {
    let state = this.states[index];
    let mainElement = this.getMainElement(index);
    if (mainElement) {
      let tickerClass = ticker ? "Ticker" : "";
      if (key === "name" || key === "currency") {
        if (key === "currency") {
          let aElements = mainElement.querySelectorAll(
            ".cp-widget__footer > a"
          );
          for (let k = 0; k < aElements.length; k++) {
            aElements[k].href = this.coin_link(value);
          }
        }
        this.getImage(index);
      }
      if (key === "isData" || key === "message") {
        let headerElements = mainElement.querySelectorAll(".cp-widget__main");
        for (let k = 0; k < headerElements.length; k++) {
          headerElements[k].innerHTML = !state.isData ? this.widgetMainElementMessage(index) : this.widgetMainElementData(index);
        }
      } else {
        let updateElements = mainElement.querySelectorAll(
          "." + key + tickerClass
        );
        for (let j = 0; j < updateElements.length; j++) {
          let updateElement = updateElements[j];
          if (updateElement.classList.contains("cp-widget__rank")) {
            let className = parseFloat(value) > 0 ? "cp-widget__rank-up" : parseFloat(value) < 0 ? "cp-widget__rank-down" : "cp-widget__rank-neutral";
            updateElement.classList.remove("cp-widget__rank-down");
            updateElement.classList.remove("cp-widget__rank-up");
            updateElement.classList.remove("cp-widget__rank-neutral");
            if (value === void 0) {
              value = cpBootstrap.emptyData;
            } else {
              updateElement.classList.add(className);
              value = key === "price_change_24h" ? "(" + cpBootstrap.round(value, 2) + "%)" : cpBootstrap.round(value, 2) + "%";
            }
          }
          if (updateElement.classList.contains("showDetailsCurrency") && !state.show_details_currency) {
            value = " ";
          }
          if (updateElement.classList.contains("parseNumber")) {
            const origin = this.defaults.data_src || this.defaults.origin_src;
            let promise = Promise.resolve();
            promise = promise.then(() => {
              return cpBootstrap.parseCurrencyNumber(
                value,
                state.primary_currency,
                origin
              );
            });
            promise = promise.then((result) => {
              return updateElement.innerHTML = result || cpBootstrap.emptyData;
            });
            return promise;
          } else {
            updateElement.innerText = value || cpBootstrap.emptyData;
          }
        }
      }
    }
  }
  updateData(index, key, value, ticker) {
    if (ticker) {
      this.states[index].ticker[key] = value;
    } else {
      this.states[index][key] = value;
    }
    if (key === "language") {
      this.getTranslations(value);
    }
    if (key === "customDate") {
      this.defaults.customDate = !!value;
    }
    if (key === "startDate") {
      this.defaults.startDate = value ?? false;
    }
    if (key === "endDate") {
      this.defaults.endDate = value ?? false;
    }
    this.updateWidgetElement(index, key, value, ticker);
  }
  updateWidgetTranslations(lang, data) {
    this.defaults.translations[lang] = data;
    for (let x = 0; x < this.states.length; x++) {
      let isNoTranslationLabelsUpdate = this.states[x].noTranslationLabels.length > 0 && lang === "en";
      if (this.states[x].language === lang || isNoTranslationLabelsUpdate) {
        let mainElement = this.states[x].mainElement;
        let transalteElements = Array.prototype.slice.call(
          mainElement.querySelectorAll(".cp-translation")
        );
        for (let y = 0; y < transalteElements.length; y++) {
          transalteElements[y].classList.forEach((className) => {
            if (className.search("translation_") > -1) {
              let translateKey = className.replace("translation_", "");
              if (translateKey === "message")
                translateKey = this.states[x].message;
              let labelIndex = this.states[x].noTranslationLabels.indexOf(translateKey);
              let text = this.getTranslation(x, translateKey);
              if (labelIndex > -1 && text) {
                this.states[x].noTranslationLabels.splice(labelIndex, 1);
              }
              transalteElements[y].innerText = text;
              if (transalteElements[y].closest(".cp-widget__footer")) {
                setTimeout(() => this.setBeforeElementInFooter(x), 50);
              }
            }
          });
        }
      }
    }
  }
  updateTicker(index, data) {
    let dataKeys = Object.keys(data);
    for (let i = 0; i < dataKeys.length; i++) {
      this.updateData(index, dataKeys[i], data[dataKeys[i]], true);
    }
  }
  stylesheet() {
    if (this.defaults.style_src !== false) {
      let url = this.defaults.style_src || this.defaults.origin_src + "/dist/" + this.defaults.cssFileName;
      if (!document.body.querySelector('link[href="' + url + '"]')) {
        return fetchService.fetchStyle(url);
      }
      return Promise.resolve();
    }
    return Promise.resolve();
  }
  widgetMainElement(index) {
    let data = this.states[index];
    return '<div class="cp-widget__header"><div class="cp-widget__img cp-widget__img-' + data.currency + '"><img/></div><div class="cp-widget__main">' + (data.isData ? this.widgetMainElementData(index) : this.widgetMainElementMessage(index)) + "</div></div>";
  }
  widgetMainElementData(index) {
    let data = this.states[index];
    const priceChangeClass = data.ticker.price_change_24h > 0 ? "up" : data.ticker.price_change_24h < 0 ? "down" : "neutral";
    const isIframe = window.self !== window.top;
    const coinNameElements = `
      <span class="nameTicker">${data.ticker.name || cpBootstrap.emptyData}</span>
      <span class="symbolTicker">${data.ticker.symbol || cpBootstrap.emptyData}</span>
    `;
    const coinTitle = isIframe ? coinNameElements : `<a href="${this.coin_link(data.currency)}">${coinNameElements}</a>`;
    return `
      <h3>${coinTitle}</h3>
      <strong>
        <span class="priceTicker parseNumber">${cpBootstrap.parseNumber(data.ticker.price) || cpBootstrap.emptyData}</span> 
        <span class="primaryCurrency">${data.primary_currency} </span>
        <span class="price_change_24hTicker cp-widget__rank cp-widget__rank-${priceChangeClass}">
          (${cpBootstrap.round(data.ticker.price_change_24h, 2) || cpBootstrap.emptyValue}%)
        </span>
      </strong>
      <span class="cp-widget__rank-label">
        <span class="cp-translation translation_rank">${this.getTranslation(index, "rank")}</span> 
        <span class="rankTicker">${data.ticker.rank || cpBootstrap.emptyData}</span>
      </span>
    `;
  }
  widgetMainElementMessage(index) {
    let message = this.states[index].message;
    return '<div class="cp-widget__main-no-data cp-translation translation_message">' + this.getTranslation(index, message) + "</div>";
  }
  widgetMarketDetailsElement(index) {
    return Promise.resolve(
      this.states[index].modules.indexOf("market_details") > -1 ? '<div class="cp-widget__details">' + this.widgetAthElement(index) + this.widgetVolume24hElement(index) + this.widgetMarketCapElement(index) + "</div>" : ""
    );
  }
  widgetAthElement(index) {
    return '<div><small class="cp-translation translation_ath">' + this.getTranslation(index, "ath") + '</small><div><span class="price_athTicker parseNumber">' + cpBootstrap.emptyData + ' </span><span class="symbolTicker showDetailsCurrency"></span></div><span class="percent_from_price_athTicker cp-widget__rank">' + cpBootstrap.emptyData + "</span></div>";
  }
  widgetVolume24hElement(index) {
    return '<div><small class="cp-translation translation_volume_24h">' + this.getTranslation(index, "volume_24h") + '</small><div><span class="volume_24hTicker parseNumber">' + cpBootstrap.emptyData + ' </span><span class="symbolTicker showDetailsCurrency"></span></div><span class="volume_24h_change_24hTicker cp-widget__rank">' + cpBootstrap.emptyData + "</span></div>";
  }
  widgetMarketCapElement(index) {
    return '<div><small class="cp-translation translation_market_cap">' + this.getTranslation(index, "market_cap") + '</small><div><span class="market_capTicker parseNumber">' + cpBootstrap.emptyData + ' </span><span class="symbolTicker showDetailsCurrency"></span></div><span class="market_cap_change_24hTicker cp-widget__rank">' + cpBootstrap.emptyData + "</span></div>";
  }
  widgetChartElement(index) {
    return Promise.resolve(
      `<div class="cp-widget__chart"><div id="${this.defaults.className}-price-chart-${index}"></div></div>`
    );
  }
  widgetSelectElement(index, label) {
    let buttons = "";
    for (let i = 0; i < this.states[index][label + "_list"].length; i++) {
      let data = this.states[index][label + "_list"][i];
      buttons += '<button class="' + (data.toLowerCase() === this.states[index][label].toLowerCase() ? "cp-widget-active " : "") + (label === "primary_currency" ? "" : "cp-translation translation_" + data.toLowerCase()) + '" data-option="' + data + '">' + this.getTranslation(index, data.toLowerCase()) + "</button>";
    }
    let title = this.getTranslation(index, "zoom_in");
    return '<div data-type="' + label + '" class="cp-widget-select"><label class="cp-translation translation_zoom_in">' + title + '</label><div class="cp-widget-select__options"><span class="arrow-down cp-widget__capitalize cp-translation translation_' + this.states[index][label].toLowerCase() + '">' + this.getTranslation(index, this.states[index][label].toLowerCase()) + '</span><div class="cp-widget-select__dropdown">' + buttons + "</div></div></div>";
  }
  widgetFooter(index) {
    const state = this.states && this.states[index];
    if (!state || state.isWordpress)
        return "";
    const currency = state.currency;
    return '<p class="cp-widget__footer cp-widget__footer--' + index + '"><span class="cp-translation translation_powered_by">' + this.getTranslation(index, "powered_by") + ' </span><img style="width: 16px" src="' + this.main_logo_link() + '" alt=""/><a target="_blank" href="' + this.coin_link(currency) + '">coinpaprika.com</a></p>';
  }
  getImage(index) {
    let data = this.states[index];
    let imgContainers = data.mainElement.getElementsByClassName("cp-widget__img");
    for (let i = 0; i < imgContainers.length; i++) {
      let imgContainer = imgContainers[i];
      imgContainer.classList.add("cp-widget__img--hidden");
      let img = imgContainer.querySelector("img");
      let newImg = new Image();
      newImg.onload = () => {
        img.src = newImg.src;
        imgContainer.classList.remove("cp-widget__img--hidden");
      };
      newImg.onerror = () => {
        newImg.onerror = null;
        newImg.src = this.img_src(data.currency);
      };
      newImg.src = data.icon_src || this.img_src(data.currency);
    }
  }
  img_src(id) {
    return "https://coinpaprika.com/coin/" + id + "/logo.png";
  }
  coin_link(id) {
    return "https://coinpaprika.com/coin/" + id;
  }
  main_logo_link() {
    return this.defaults.img_src || this.defaults.origin_src + "/dist/img/logo_widget.svg";
  }
  getScriptElement() {
    return document.querySelector("script[data-cp-currency-widget]");
  }
  getTranslation(index, label) {
    let text = this.defaults.translations[this.states[index].language] ? this.defaults.translations[this.states[index].language][label] : null;
    if (!text && this.defaults.translations["en"]) {
      text = this.defaults.translations["en"][label];
    }
    if (!text) {
      return this.addLabelWithoutTranslation(index, label);
    } else {
      return text;
    }
  }
  addLabelWithoutTranslation(index, label) {
    if (!this.defaults.translations["en"])
      this.getTranslations("en");
    return this.states[index].noTranslationLabels.push(label);
  }
  getTranslations(lang) {
    if (!this.defaults.translations[lang]) {
      const url = this.defaults.lang_src || this.defaults.origin_src + "/dist/lang/" + lang + ".json";
      this.defaults.translations[lang] = {};
      return fetchService.fetchJsonFile(url, true).then((response) => {
        if (response) {
          this.updateWidgetTranslations(lang, response);
        } else {
          this.onErrorRequest(0, url + response);
          this.getTranslations("en");
          delete this.defaults.translations[lang];
        }
      });
    }
  }
}
class chartClass {
  constructor(container, state) {
    if (!container)
      return;
    this.id = container.id;
    this.isNightMode = state.isNightMode;
    this.chartsWithActiveSeriesCookies = [];
    this.chart = null;
    this.currency = state.currency;
    this.container = container;
    this.volume_visible = state.volume_visible !== void 0 ? state.volume_visible : true;
    this.options = this.setOptions();
    this.defaultRange = state.range || "7d";
    this.customDate = state.customDate || false;
    this.startDate = state.startDate || false;
    this.endDate = state.endDate || false;
    this.callback = null;
    this.replaceCallback = null;
    this.extremesDataUrl = this.getExtremesDataUrl(container.id);
    this.firstPrice = null;
    this.lastPrice = null;
    this.defaultOptions = {
      chart: {
        alignTicks: false,
        marginTop: 50,
        style: {
          fontFamily: "sans-serif"
        },
        events: {
          render: (e) => {
            var _a, _b, _c;
            if (((_a = this == null ? void 0 : this.chart_data) == null ? void 0 : _a.price) && ((_c = (_b = this == null ? void 0 : this.chart_data) == null ? void 0 : _b.price) == null ? void 0 : _c.length) > 0) {
              const firstItem = this.chart_data.price[0];
              const lastItem = this.chart_data.price[this.chart_data.price.length - 1];
              const firstPrice = firstItem[1];
              const lastPrice = lastItem[1];
              const priceSeries = this.getPriceSeries();
              if (firstPrice && lastPrice && this.firstPrice !== firstPrice && this.lastPrice !== lastPrice) {
                this.firstPrice = firstPrice;
                this.lastPrice = lastPrice;
                priceSeries.update(lastPrice >= firstPrice ? this.getChartPositiveGradient() : this.getChartNegativeGradient(), true);
              }
            }
            if (e.target.annotations) {
              let chart = e.target.annotations.chart;
              cpBootstrap.loop(chart.annotations.allItems, (annotation) => {
                let y = chart.plotHeight + chart.plotTop - chart.spacing[0] - 2 - (this.isResponsiveModeActive(chart) ? 10 : 0);
                annotation.update({ y }, true);
              });
            }
          }
        }
      },
      scrollbar: {
        enabled: false
      },
      annotationsOptions: {
        enabledButtons: false
      },
      rangeSelector: {
        enabled: false
      },
      plotOptions: {
        line: {
          series: {
            states: {
              hover: {
                enabled: false
              }
            }
          }
        },
        series: {
          events: {
            legendItemClick: (event2) => {
              if (event2.browserEvent.isTrusted) {
                if (this.chartsWithActiveSeriesCookies.indexOf(
                  event2.target.chart.renderTo.id
                ) > -1)
                  this.setVisibleChartCookies(event2);
              }
              return event2.browserEvent.isTrusted;
            }
          }
        }
      },
      xAxis: {
        ordinal: false
      }
    };
    this.chartDataParser = (data) => {
      return new Promise((resolve) => {
        data = data[0];
        const priceCurrency = state.primary_currency.toLowerCase();
        return resolve({
          data: {
            price: data.price ? data.price : data[priceCurrency] ? data[priceCurrency] : [],
            volume: data.volume || []
          }
        });
      });
    };
    this.isEventsHidden = false;
    this.excludeSeriesIds = [];
    this.asyncUrl = `/currency/data/${state.currency}/_range_/`;
    this.asyncParams = `?quote=${state.primary_currency.toUpperCase()}&fields=price,volume`;
    this.init();
  }
  setOptions() {
    const chartService = new chartClass();
    return {
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 1500
            },
            chartOptions: {
              legend: {
                align: "right",
                verticalAlign: "middle",
                y: 92,
                symbolRadius: 0,
                itemDistance: 20,
                itemStyle: {
                  fontSize: 10
                }
              },
              chart: {
                height: null,
                marginTop: 35,
                marginBottom: 0,
                spacingTop: 0,
                spacingBottom: 0
              },
              navigator: {
                height: 50,
                margin: 70,
                handles: {
                  height: 25,
                  width: 17
                }
              }
            }
          },
          {
            condition: {
              maxWidth: 600
            },
            chartOptions: {
              chart: {
                marginTop: 5,
                zoomType: "none",
                marginBottom: 90,
                marginLeft: 10,
                marginRight: 10,
                height: null
              },
              rangeSelector: {
                enabled: true,
                verticalAlign: 'bottom',
                y: 40
              },
              navigator: {
                enabled: true,
                height: 35,
                margin: 10
              },
              yAxis: [
                {
                  floor: 0,
                  tickAmount: 7,
                  tickWidth: 0,
                  tickLength: 0,
                  lineWidth: 0,
                  title: {
                    enabled: false
                  },
                  labels: {
                    align: "left",
                    x: 1,
                    y: -2,
                    style: {
                      color: "#9e9e9e",
                      fontSize: "10px"
                    }
                  }
                },
                {
                  floor: 0,
                  tickAmount: 7,
                  tickWidth: 0,
                  tickLength: 0,
                  lineWidth: 0,
                  title: {
                    enabled: false
                  },
                  labels: {
                    align: "right",
                    overflow: "justify",
                    x: 1,
                    y: -2,
                    style: {
                      color: "#5085ec",
                      fontSize: "10px"
                    }
                  }
                }
              ]
            }
          },
          {
            condition: {
              maxWidth: 450
            },
            chartOptions: {
              legend: {
                align: "right",
                verticalAlign: "middle",
                y: 82,
                symbolRadius: 0,
                itemDistance: 20,
                itemStyle: {
                  fontSize: 10
                }
              },
              navigator: {
                margin: 60,
                height: 40,
                handles: {
                  height: 20
                }
              },
              chart: {
                height: 300
              },
              yAxis: [
                {
                  floor: 0,
                  tickAmount: 7,
                  tickWidth: 0,
                  tickLength: 0,
                  lineWidth: 0,
                  title: {
                    enabled: false
                  },
                  labels: {
                    align: "left",
                    x: 1,
                    y: -2,
                    style: {
                      color: "#9e9e9e",
                      fontSize: "10px"
                    }
                  }
                },
                {
                  floor: 0,
                  tickAmount: 7,
                  tickWidth: 0,
                  tickLength: 0,
                  lineWidth: 0,
                  title: {
                    enabled: false
                  },
                  labels: {
                    align: "right",
                    overflow: "justify",
                    x: 1,
                    y: -2,
                    style: {
                      color: "#5085ec",
                      fontSize: "10px"
                    }
                  }
                }
              ]
            }
          }
        ]
      },
      title: {
        text: void 0
      },
      chart: {
        backgroundColor: "none",
        marginTop: 50,
        plotBorderWidth: 0
      },
      cpEvents: false,
      colors: ["#5085ec", "#1f9809", "#985d65", "#ee983b", "#4c4c4c"],
      legend: {
        margin: 0,
        enabled: true,
        align: "right",
        symbolRadius: 0,
        itemDistance: 40,
        itemStyle: {
          fontWeight: "normal",
          color: this.isNightMode ? "#80a6e5" : "#0645ad"
        },
        itemMarginTop: 8
      },
      navigator: true,
      tooltip: {
        shared: true,
        split: false,
        animation: false,
        borderWidth: 1,
        borderColor: this.isNightMode ? "#4c4c4c" : "#e3e3e3",
        hideDelay: 100,
        shadow: false,
        backgroundColor: "#ffffff",
        style: {
          color: "#4c4c4c",
          fontSize: "10px"
        },
        useHTML: true,
        formatter: function() {
          return chartService.tooltipFormatter(this);
        }
      },
      exporting: {
        buttons: {
          contextButton: {
            enabled: false
          }
        }
      },
      xAxis: {
        lineColor: this.isNightMode ? "#505050" : "#e3e3e3",
        tickColor: this.isNightMode ? "#505050" : "#e3e3e3",
        tickLength: 7
      },
      yAxis: [
        {
          // Volume yAxis
          lineWidth: 1,
          lineColor: "#dedede",
          tickWidth: 1,
          tickLength: 4,
          gridLineDashStyle: "dash",
          gridLineWidth: 0,
          floor: 0,
          minPadding: 0,
          opposite: false,
          showEmpty: false,
          showLastLabel: false,
          showFirstLabel: false
        },
        {
          gridLineColor: this.isNightMode ? "#505050" : "#e3e3e3",
          gridLineDashStyle: "dash",
          lineWidth: 1,
          tickWidth: 1,
          tickLength: 4,
          floor: 0,
          minPadding: 0,
          showEmpty: false,
          opposite: true,
          gridZIndex: 4,
          showLastLabel: false,
          showFirstLabel: false
        }
      ],
      series: [
        {
          //order of the series matters
          color: "transparent",
          name: "Price",
          id: "price",
          data: [],
          type: "area",
          fillOpacity: 0.15,
          lineWidth: 2,
          yAxis: 1,
          zIndex: 2,
          visible: true,
          clickable: true,
          threshold: null,
          tooltip: {
            valueDecimals: 0
          },
          showInNavigator: true,
          showInLegend: false
        },
        {
          // color: `url(#fill-pattern${this.isNightMode ? "-night" : ""})`,
          color: this.isNightMode ? "#9b9b9b" : "#e3e3e3",
          name: "Volume",
          id: "volume",
          data: [],
          type: "area",
          fillOpacity: 0.5,
          lineWidth: 0,
          yAxis: 0,
          zIndex: 0,
          visible: this.volume_visible,
          clickable: true,
          threshold: null,
          tooltip: {
            valueDecimals: 0
          },
          showInNavigator: false
        }
      ]
    };
  }
  init() {
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return this.parseOptions(this.options);
    });
    promise = promise.then((options) => {
      window.Highcharts.setOptions({
        lang: {
          numericSymbols: ["k", "M"]
        }
      });
      return window.Highcharts ? Highcharts$1.stockChart(
        this.container.id,
        options,
        (chart) => this.bind(chart)
      ) : null;
    });
    return promise;
  }
  getPriceSeries() {
    return this.findPriceSeries(this.chart);
  }
  findPriceSeries(chart) {
    if (!chart)
      throw new Error("Chart is not provided");
    if (!chart.series || !Array.isArray(chart.series))
      return null;
    return chart.series.find((serie) => {
      var _a;
      return ((_a = serie.userOptions) == null ? void 0 : _a.id) === "price";
    });
  }
  updatePriceGradientOnZoom(zoomEvent) {
    var _a, _b, _c, _d;
    if (!zoomEvent.min || !zoomEvent.max || !zoomEvent.target || !zoomEvent.target.closestPointRange)
      return;
    const priceSeries = this.getPriceSeries();
    const minDate = zoomEvent.min - zoomEvent.min % zoomEvent.target.closestPointRange;
    const maxDate = zoomEvent.max - zoomEvent.max % zoomEvent.target.closestPointRange;
    const firstPriceItem = (_b = (_a = this.chart_data) == null ? void 0 : _a.price) == null ? void 0 : _b.find(([x]) => x === minDate);
    const lastPriceItem = (_d = (_c = this.chart_data) == null ? void 0 : _c.price) == null ? void 0 : _d.find(([x]) => x === maxDate);
    const firstPrice = firstPriceItem == null ? void 0 : firstPriceItem[1];
    const lastPrice = lastPriceItem == null ? void 0 : lastPriceItem[1];
    if (firstPrice && lastPrice) {
      priceSeries.update(lastPrice >= firstPrice ? this.getChartPositiveGradient() : this.getChartNegativeGradient(), true);
    }
  }
  getChartPositiveGradient() {
    return {
      color: "#43AA05",
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, "rgba(67, 170, 5, 0.4)"],
          [1, "rgba(67, 170, 5, 0)"]
        ]
      }
    };
  }
  getChartNegativeGradient() {
    return {
      color: "#E15241",
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, "rgba(225, 82, 65, 0.4)"],
          [1, "rgba(225, 82, 65, 0)"]
        ]
      }
    };
  }
  parseOptions(options) {
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return cpBootstrap.updateObject(this.defaultOptions, options);
    });
    promise = promise.then((newOptions) => {
      return cpBootstrap.updateObject(this.getVolumePattern(), newOptions);
    });
    promise = promise.then((newOptions) => {
      return this.setNavigator(newOptions);
    });
    promise = promise.then((newOptions) => {
      return newOptions.noData ? this.setNoDataLabel(newOptions) : newOptions;
    });
    promise = promise.then((newOptions) => {
      return newOptions;
    });
    return promise;
  }
  bind(chart) {
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return this.chart = chart;
    });
    promise = promise.then(() => {
      return this.customDate ? this.fetchDataPackage(this.startDate, this.endDate, true) : this.fetchDataPackage();
    });
    promise = promise.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          if (this.chart) {
            const axis = this.chart.xAxis[0];
            const priceSeries = this.getPriceSeries();
            if (priceSeries && priceSeries.xData && priceSeries.xData.length > 0) {
              const dataMin = priceSeries.xData[0];
              const dataMax = priceSeries.xData[priceSeries.xData.length - 1];
              axis.setExtremes(dataMin, dataMax, false, false);
              this.chart.redraw(false);
            }
          }
          resolve();
        }, 500);
      });
    });
    promise = promise.then(() => {
      return this.setRangeSwitcher();
    });
    promise = promise.then(() => {
      return this.callback ? this.callback(this.chart, this.defaultRange) : null;
    });
    return promise;
  }
  fetchDataPackage(minDate, maxDate, initial = false) {
    let isPreciseRange = !!minDate && !!maxDate;
    let showInitial = initial ? true : !isPreciseRange;
    let promise = Promise.resolve();
    promise = promise.then(() => {
      if (this.options.cpEvents) {
        let url = isPreciseRange ? this.getNavigatorExtremesUrl(minDate, maxDate, "events") : this.getExtremesDataUrl(this.id, "events") + "/" + this.getRange() + "/";
        return url ? this.fetchData(url, "events", showInitial) : null;
      }
      return null;
    });
    promise = promise.then(() => {
      let url = (isPreciseRange ? this.getNavigatorExtremesUrl(minDate, maxDate) : this.asyncUrl.replace("_range_", this.getRange())) + this.asyncParams;
      return url ? this.fetchData(url, "data", showInitial) : null;
    });
    promise = promise.then(() => {
      return this.chart.redraw(false);
    });
    promise = promise.then(() => {
      return !isPreciseRange ? this.chart.zoomOut() : null;
    });
    promise = promise.then(() => {
      return this.isLoaded = true;
    });
    promise = promise.then(() => {
      return this.toggleEvents();
    });
    return promise;
  }
  fetchData(url, dataType = "data", replace = true) {
    let promise = Promise.resolve();
    promise = promise.then(() => {
      this.chart.showLoading();
      return fetchService.fetchChartData(url, !this.isLoaded);
    });
    promise = promise.then((response) => {
      this.chart.hideLoading();
      if (response.status !== 200) {
        return console.log(
          `Looks like there was a problem. Status Code: ${response.status}`
        );
      }
      return response.json().then((data) => {
        let promise2 = Promise.resolve();
        promise2 = promise2.then(() => {
          return this.dataParser(data, dataType);
        });
        promise2 = promise2.then((content) => {
          return replace ? this.replaceData(content.data, dataType) : this.updateData(content.data, dataType);
        });
        return promise2;
      });
    }).catch((error) => {
      this.chart.hideLoading();
      this.hideChart();
      return console.log("Fetch Error", error);
    });
    return promise;
  }
  hideChart(bool = true) {
    const classFunc = bool ? "add" : "remove";
    const siblings = cpBootstrap.nodeListToArray(
      this.container.parentElement.childNodes
    );
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return siblings.filter((element) => element.id.search("chart") === -1);
    });
    promise = promise.then((result) => {
      return cpBootstrap.loop(
        result,
        (element) => element.classList[classFunc]("cp-hidden")
      );
    });
    promise = promise.then(() => {
      return this.container.parentElement.classList[classFunc](
        "cp-chart-no-data"
      );
    });
    return promise;
  }
  setRangeSwitcher() {
    document.addEventListener(`${this.id}-switch-range`, (event2) => {
      this.defaultRange = event2.detail.data;
      return this.fetchDataPackage();
    });
  }
  getRange() {
    return this.defaultRange || "1q";
  }
  toggleEvents() {
    let promise = Promise.resolve();
    if (this.options.cpEvents) {
      promise = promise.then(() => {
        return document.getElementsByClassName("highcharts-annotation");
      });
      promise = promise.then((elements) => {
        return cpBootstrap.loop(elements, (element) => {
          if (this.isEventsHidden) {
            return !element.classList.contains("highcharts-annotation__hidden") ? element.classList.add("highcharts-annotation__hidden") : null;
          }
          return element.classList.contains("highcharts-annotation__hidden") ? element.classList.remove("highcharts-annotation__hidden") : null;
        });
      });
      promise = promise.then(() => {
        return document.getElementsByClassName("highcharts-plot-line");
      });
      promise = promise.then((elements) => {
        return cpBootstrap.loop(elements, (element) => {
          if (this.isEventsHidden) {
            return !element.classList.contains("highcharts-plot-line__hidden") ? element.classList.add("highcharts-plot-line__hidden") : null;
          }
          return element.classList.contains("highcharts-plot-line__hidden") ? element.classList.remove("highcharts-plot-line__hidden") : null;
        });
      });
    }
    return promise;
  }
  dataParser(data, dataType = "data") {
    switch (dataType) {
      case "data":
        let promiseData = Promise.resolve();
        promiseData = promiseData.then(() => {
          return this.chartDataParser ? this.chartDataParser(data) : {
            data: data[0]
          };
        });
        return promiseData;
      case "events":
        return Promise.resolve(data);
      default:
        return null;
    }
  }
  updateData(data, dataType) {
    let newData;
    let promise = Promise.resolve();
    promise = promise.then(() => {
      switch (dataType) {
        case "data":
          newData = {};
          return cpBootstrap.loop(Object.entries(data), (value) => {
            if (this.isExcluded(value[0]))
              return;
            let oldData2 = this.getOldData(dataType)[value[0]];
            newData[value[0]] = oldData2.filter((element) => {
              return value[1].findIndex(
                (findElement) => this.isTheSameElement(element, findElement, dataType)
              ) === -1;
            }).concat(value[1]).sort(
              (data1, data2) => this.sortCondition(data1, data2, dataType)
            );
          });
        case "events":
          newData = [];
          let oldData = this.getOldData(dataType);
          return newData = oldData.filter((element) => {
            data.findIndex(
              (findElement) => this.isTheSameElement(element, findElement, dataType)
            ) === -1;
          }).concat(data).sort(
            (data1, data2) => this.sortCondition(data1, data2, dataType)
          );
        default:
          return false;
      }
    });
    promise = promise.then(() => {
      return this.replaceData(newData, dataType);
    });
    return promise;
  }
  isTheSameElement(elementA, elementB, dataType) {
    switch (dataType) {
      case "data":
        return elementA[0] === elementB[0];
      case "events":
        return elementA.ts === elementB.ts;
      default:
        return false;
    }
  }
  sortCondition(elementA, elementB, dataType) {
    switch (dataType) {
      case "data":
        return elementA[0] - elementB[0];
      case "events":
        return elementA.ts - elementB.ts;
      default:
        return false;
    }
  }
  getOldData(dataType) {
    return this["chart_" + dataType.toLowerCase()];
  }
  replaceData(data, dataType) {
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return this["chart_" + dataType.toLowerCase()] = data;
    });
    promise = promise.then(() => {
      return this.replaceDataType(data, dataType);
    });
    promise = promise.then(() => {
      return this.replaceCallback ? this.replaceCallback(this.chart, data, this.isLoaded, dataType) : null;
    });
    return promise;
  }
  replaceDataType(data, dataType) {
    switch (dataType) {
      case "data":
        if (this.asyncUrl) {
          cpBootstrap.loop(["btc-bitcoin", "eth-ethereum"], (coinName) => {
            let coinShort = coinName.split("-")[0];
            if (this.asyncUrl.search(coinName) > -1 && data[coinShort]) {
              data[coinShort] = [];
              cpBootstrap.loop(this.chart.series, (series) => {
                if (series.userOptions.id === coinShort)
                  series.update({ visible: false });
              });
            }
          });
        }
        return cpBootstrap.loop(Object.entries(data), (value) => {
          if (this.isExcluded(value[0]))
            return;
          return this.chart.get(value[0]) ? this.chart.get(value[0]).setData(value[1], false, false, false) : this.chart.addSeries({
            id: value[0],
            data: value[1],
            showInNavigator: true
          });
        });
      case "events":
        let promise = Promise.resolve();
        promise = promise.then(() => {
          return cpBootstrap.loop(
            this.chart.annotations.allItems,
            (annotation) => {
              return annotation.destroy();
            }
          );
        });
        promise = promise.then(() => {
          return this.setAnnotationsObjects(data);
        });
        return promise;
      default:
        return null;
    }
  }
  isExcluded(label) {
    return this.excludeSeriesIds.indexOf(label) > -1;
  }
  tooltipFormatter(pointer, label = "", search) {
    if (!search)
      search = label;
    const header = '<div class="cp-chart-tooltip-currency"><small>' + new Date(pointer.x).toUTCString() + "</small><table>";
    const footer = "</table></div>";
    let content = "";
    pointer.points.forEach((point) => {
      var _a, _b, _c;
      const value = ((_b = (_a = point.y) == null ? void 0 : _a.toString()) == null ? void 0 : _b.includes("e")) ? (_c = point.y) == null ? void 0 : _c.toPrecision(3) : point.y.toLocaleString("en-US", { maximumFractionDigits: 8 });
      content += '<tr><td class="cp-chart-tooltip-currency__row"><svg class="cp-chart-tooltip-currency__icon" width="5" height="5"><rect x="0" y="0" width="5" height="5" fill="' + point.series.color + '" fill-opacity="1"></rect></svg>' + point.series.name + ": " + value;
      " " + (point.series.name.toLowerCase().search(search.toLowerCase()) > -1 ? "" : label) + "</td></tr>";
    });
    return header + content + footer;
  }
  setAnnotationsObjects(data) {
    this.chart.series[0].xAxis.removePlotLine();
    let plotLines = [];
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return data.sort((data1, data2) => {
        return data2.ts - data1.ts;
      });
    });
    promise = promise.then(() => {
      return cpBootstrap.loop(data, (element) => {
        let promise2 = Promise.resolve();
        promise2 = promise2.then(() => {
          return plotLines.push({
            width: 1,
            value: element.ts,
            dashStyle: "solid",
            zIndex: 4,
            color: this.getEventTagParams().color
          });
        });
        promise2 = promise2.then(() => {
          return this.chart.addAnnotation({
            xValue: element.ts,
            y: 0,
            title: `<span title="Click to open" class="cp-chart-annotation__text">${this.getEventTagParams(element.tag).label}</span><span class="cp-chart-annotation__dataElement" style="display: none;">${JSON.stringify(element)}</span>`,
            shape: {
              type: "circle",
              params: {
                r: 11,
                cx: 9,
                cy: 10.5,
                "stroke-width": 1.5,
                fill: this.getEventTagParams().color
              }
            },
            events: {
              mouseover: (event2) => {
                if (MobileDetect.isMobile())
                  return;
                let data2 = this.getEventDataFromAnnotationEvent(event2);
                this.openEventContainer(data2, event2);
              },
              mouseout: () => {
                if (MobileDetect.isMobile())
                  return;
                this.closeEventContainer(event);
              },
              click: (event2) => {
                let data2 = this.getEventDataFromAnnotationEvent(event2);
                if (MobileDetect.isMobile()) {
                  this.openEventContainer(data2, event2);
                } else {
                  this.openEventPage(data2);
                }
              }
            }
          });
        });
        return promise2;
      });
    });
    promise = promise.then(() => {
      return this.chart.series[0].xAxis.update(
        {
          plotLines
        },
        false
      );
    });
    return promise;
  }
  setNavigator(options) {
    let navigatorOptions = {};
    let promise = Promise.resolve();
    promise = promise.then(() => {
      if (options.navigator === true) {
        navigatorOptions = {
          navigator: {
            enabled: true,
            margin: 20,
            series: {
              lineWidth: 1
            },
            maskFill: "rgba(102,133,194,0.15)"
          },
          chart: {
            zoomType: "x"
          },
          xAxis: {
            events: {
              setExtremes: (e) => {
                if ((e.trigger === "navigator" || e.trigger === "zoom") && e.min && e.max) {
                  this.updatePriceGradientOnZoom(e);
                  document.dispatchEvent(
                    new CustomEvent(this.id + "SetExtremes", {
                      detail: {
                        minDate: e.min,
                        maxDate: e.max,
                        e
                      }
                    })
                  );
                }
              }
            }
          }
        };
        this.navigatorExtremesListener();
        this.setResetZoomButton();
      } else if (!options.navigator) {
        navigatorOptions = {
          navigator: {
            enabled: false
          }
        };
      }
      return cpBootstrap.updateObject(options, navigatorOptions);
    });
    return promise;
  }
  setResetZoomButton() {
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return this.addContainer(
        this.id,
        "ResetZoom",
        "cp-chart-reset-zoom",
        "button"
      );
    });
    promise = promise.then(() => {
      return this.getContainer("ResetZoom");
    });
    promise = promise.then((element) => {
      element.classList.add("uk-button");
      element.innerText = "Reset zoom";
      return element.addEventListener("click", () => {
        this.chart.zoomOut();
      });
    });
    return promise;
  }
  navigatorExtremesListener() {
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return document.addEventListener(this.id + "SetExtremes", (e) => {
        let minDate = Math.floor(e.detail.minDate / 1e3).toString();
        let maxDate = (Math.floor(e.detail.maxDate / 1e3) + 1).toString();  // +1 sec buffer
        let promise2 = Promise.resolve();
        promise2 = promise2.then(() => {
          return this.fetchDataPackage(minDate, maxDate);
        });
        return promise2;
      });
    });
    return promise;
  }
  getNavigatorExtremesUrl(minDate, maxDate, dataType) {
    let extremesDataUrl = dataType ? this.getExtremesDataUrl(this.id, dataType) : this.extremesDataUrl;
    return minDate && maxDate && extremesDataUrl ? extremesDataUrl + "/dates/" + minDate + "/" + maxDate + "/" : null;
  }
  setNoDataLabel(options) {
    let noDataOptions = {};
    let promise = Promise.resolve();
    promise = promise.then(() => {
      noDataOptions = {
        lang: {
          noData: "We don't have data for this time period"
        },
        noData: {
          style: {
            fontFamily: "Arial",
            fontSize: "14px",
            color: "#000000"
          }
        }
      };
      return cpBootstrap.updateObject(options, noDataOptions);
    });
    return promise;
  }
  addContainer(id, label, className, tagName = "div") {
    let container = document.createElement(tagName);
    let chartContainer = document.getElementById(id);
    container.id = id + label;
    container.classList.add(className);
    chartContainer.appendChild(container);
  }
  getContainer(label) {
    return document.getElementById(this.id + label);
  }
  getExtremesDataUrl(id, dataType = "data") {
    return "/currency/" + dataType + "/" + this.currency;
  }
  getVolumePattern() {
    return {
      defs: {
        patterns: [
          {
            id: "fill-pattern",
            path: {
              d: "M 3 0 L 3 10 M 8 0 L 8 10",
              stroke: "#e3e3e3",
              fill: "#f1f1f1",
              strokeWidth: 2
            }
          },
          {
            id: "fill-pattern-night",
            path: {
              d: "M 3 0 L 3 10 M 8 0 L 8 10",
              stroke: "#9b9b9b",
              fill: "#383838",
              strokeWidth: 2
            }
          }
        ]
      }
    };
  }
}
class bootstrapClass {
  constructor() {
    this.emptyValue = 0;
    this.emptyData = "-";
  }
  nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }
  parseIntervalValue(value) {
    let timeSymbol = "", multiplier = 1;
    if (value.search("s") > -1) {
      timeSymbol = "s";
      multiplier = 1e3;
    }
    if (value.search("m") > -1) {
      timeSymbol = "m";
      multiplier = 60 * 1e3;
    }
    if (value.search("h") > -1) {
      timeSymbol = "h";
      multiplier = 60 * 60 * 1e3;
    }
    if (value.search("d") > -1) {
      timeSymbol = "d";
      multiplier = 24 * 60 * 60 * 1e3;
    }
    return parseFloat(value.replace(timeSymbol, "")) * multiplier;
  }
  isFiat(currency, origin) {
    if (!origin)
      Promise.resolve(false);
    let promise = Promise.resolve();
    promise = promise.then(() => {
      let url = origin + "/dist/data/currencies.json";
      return fetchService.fetchJsonFile(url, true);
    });
    promise = promise.then((result) => {
      return result[currency.toUpperCase()];
    });
    return promise;
  }
  updateObject(obj, newObj) {
    let result = obj;
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return cpBootstrap.loop(Object.keys(newObj), (key) => {
        if (result.hasOwnProperty(key) && typeof result[key] === "object") {
          return this.updateObject(result[key], newObj[key]).then(
            (updateResult) => {
              result[key] = updateResult;
            }
          );
        }
        return result[key] = newObj[key];
      });
    });
    promise = promise.then(() => {
      return result;
    });
    return promise;
  }
  parseCurrencyNumber(value, currency, origin) {
    let promise = Promise.resolve();
    promise = promise.then(() => {
      return this.isFiat(currency, origin);
    });
    promise = promise.then((result) => {
      return result ? this.parseNumber(value, 2) : this.parseNumber(value);
    });
    return promise;
  }
  convertScientificToDecimalNotation(num) {
    if (!num && num !== 0)
      return "";
    const sign = Math.sign(num);
    if (/\d+\.?\d*e[+-]*\d+/i.test(num)) {
      const zero = "0";
      const parts = String(num).toLowerCase().split("e");
      const e = parts.pop();
      let l = Math.abs(e);
      const direction = e / l;
      const coeffArray = parts[0].split(".");
      if (direction === -1) {
        coeffArray[0] = Math.abs(coeffArray[0]);
        num = `${zero}.${new Array(l).join(zero)}${coeffArray.join("")}`;
      } else {
        const dec = coeffArray[1];
        if (dec)
          l -= dec.length;
        num = coeffArray.join("") + new Array(l + 1).join(zero);
      }
    }
    if (sign < 0) {
      num = -num;
    }
    return num;
  }
  parseNumber(number, precision) {
    var _a, _b, _c, _d;
    const sientificBreakpoint = 1e-7;
    if (!number && number !== 0)
      return number;
    if (number === this.emptyValue || number === this.emptyData)
      return number;
    number = parseFloat(number);
    if (number > 1e5) {
      let numberStr = number.toFixed(0);
      let parameter = "K", spliced = numberStr.slice(0, numberStr.length - 1);
      if (number > 1e9) {
        spliced = numberStr.slice(0, numberStr.length - 7);
        parameter = "B";
      } else if (number > 1e6) {
        spliced = numberStr.slice(0, numberStr.length - 4);
        parameter = "M";
      }
      let natural = spliced.slice(0, spliced.length - 2);
      let decimal = spliced.slice(spliced.length - 2);
      return natural + "." + decimal + " " + parameter;
    } else if (number < sientificBreakpoint) {
      const decimalStr = number.toString().includes("e") ? this.convertScientificToDecimalNotation(number).toString() : number.toString();
      const leadingZeros = ((_d = (_c = (_b = (_a = decimalStr.split(".")) == null ? void 0 : _a[1]) == null ? void 0 : _b.match(/^0+/)) == null ? void 0 : _c[0]) == null ? void 0 : _d.length) || 0;
      const significantDigits = decimalStr.replace(/^0\.0+/, "").slice(0, 3);
      return leadingZeros ? `0.0<sub>${leadingZeros}</sub>${significantDigits}` : `0.00`;
    } else {
      let isDecimal = number % 1 > 0;
      if (isDecimal) {
        if (!precision || number < 0.01) {
          precision = 2;
          if (number < 1) {
            precision = 8;
          } else if (number < 10) {
            precision = 6;
          } else if (number < 1e3) {
            precision = 4;
          }
        }
        return this.round(number, precision).toLocaleString("en-US", {
          maximumFractionDigits: precision
        });
      } else {
        return number.toLocaleString("en-US", { minimumFractionDigits: 2 });
      }
    }
  }
  round(amount, decimal = 8, direction = "round") {
    amount = parseFloat(amount);
    decimal = Math.pow(10, decimal);
    let rounded = Math[direction](amount * decimal) / decimal;
    const maxFractionDigits = rounded < 1 ? 6 : 2;
    return rounded.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: maxFractionDigits });
  }
  loop(arr, fn, busy, err, i = 0) {
    const body = (ok, er) => {
      try {
        const r = fn(arr[i], i, arr);
        r && r.then ? r.then(ok).catch(er) : ok(r);
      } catch (e) {
        er(e);
      }
    };
    const next = (ok, er) => () => this.loop(arr, fn, ok, er, ++i);
    const run = (ok, er) => i < arr.length ? new Promise(body).then(next(ok, er)).catch(er) : ok();
    return busy ? run(busy, err) : new Promise(run);
  }
}
class fetchClass {
  constructor() {
    this.state = {};
  }
  fetchScript(url) {
    if (this.state[url])
      return Promise.resolve(null);
    this.state[url] = "pending";
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      document.body.appendChild(script);
      script.addEventListener("load", () => {
        if (this.state)
          this.state[url] = "downloaded";
        resolve();
      });
      script.addEventListener("error", () => {
        if (this.state)
          delete this.state[url];
        reject(new Error(`Failed to load image's URL: ${url}`));
      });
      script.async = true;
      script.src = url;
    });
  }
  fetchStyle(url) {
    if (this.state[url])
      return Promise.resolve(null);
    this.state[url] = "pending";
    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      document.body.appendChild(link);
      link.setAttribute("href", url);
      link.addEventListener("load", () => {
        if (this.state)
          this.state[url] = "downloaded";
        resolve();
      });
      link.addEventListener("error", () => {
        if (this.state)
          delete this.state[url];
        reject(new Error(`Failed to load style URL: ${url}`));
      });
      link.href = url;
    });
  }
  fetchChartData(uri, fromState = false) {
    const url = `https://graphsv2.coinpaprika.com${uri}`;
    return this.fetchData(url, fromState);
  }
  fetchData(url, fromState = false) {
    let promise = Promise.resolve();
    promise = promise.then(() => {
      if (fromState) {
        if (this.state[url] === "pending") {
          let promiseTimeout = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(this.fetchData(url, fromState));
            }, 100);
          });
          return promiseTimeout;
        }
        if (!!this.state[url]) {
          return Promise.resolve(this.state[url].clone());
        }
      }
      this.state[url] = "pending";
      let promiseFetch = Promise.resolve();
      promiseFetch = promiseFetch.then(() => {
        return fetch(url);
      });
      promiseFetch = promiseFetch.then((response) => {
        this.state[url] = response;
        return response.clone();
      });
      return promiseFetch;
    });
    return promise;
  }
  fetchJsonFile(url, fromState = false) {
    return this.fetchData(url, fromState).then((result) => {
      if (result.status === 200) {
        return result.json();
      }
      return false;
    }).catch(() => {
      return false;
    });
  }
}
new widgetsController();
const cpBootstrap = new bootstrapClass();
const fetchService = new fetchClass();
