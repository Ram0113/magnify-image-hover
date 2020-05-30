(function () {
	/* 
 
 Copyright The Closure Library Authors. 
 SPDX-License-Identifier: Apache-2.0 
*/
	var l;

	function aa(a) {
		var b = 0;
		return function () {
			return b < a.length ? {
				done: !1,
				value: a[b++]
			} : {
				done: !0
			}
		}
	}
	var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
		if (a == Array.prototype || a == Object.prototype) return a;
		a[b] = c.value;
		return a
	};

	function ca(a) {
		a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
		for (var b = 0; b < a.length; ++b) {
			var c = a[b];
			if (c && c.Math == Math) return c
		}
		throw Error("Cannot find global object");
	}
	var da = ca(this);

	function ea(a, b) {
		if (b) {
			var c = da;
			a = a.split(".");
			for (var d = 0; d < a.length - 1; d++) {
				var e = a[d];
				e in c || (c[e] = {});
				c = c[e]
			}
			a = a[a.length - 1];
			d = c[a];
			b = b(d);
			b != d && null != b && ba(c, a, {
				configurable: !0,
				writable: !0,
				value: b
			})
		}
	}
	ea("Symbol", function (a) {
		function b(e) {
			if (this instanceof b) throw new TypeError("Symbol is not a constructor");
			return new c("jscomp_symbol_" + (e || "") + "_" + d++, e)
		}

		function c(e, f) {
			this.a = e;
			ba(this, "description", {
				configurable: !0,
				writable: !0,
				value: f
			})
		}
		if (a) return a;
		c.prototype.toString = function () {
			return this.a
		};
		var d = 0;
		return b
	});

	function fa(a) {
		var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
		return b ? b.call(a) : {
			next: aa(a)
		}
	}

	function ha(a) {
		if (!(a instanceof Array)) {
			a = fa(a);
			for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
			a = c
		}
		return a
	}
	var ia = "function" == typeof Object.create ? Object.create : function (a) {
			function b() {}
			b.prototype = a;
			return new b
		},
		ja;
	if ("function" == typeof Object.setPrototypeOf) ja = Object.setPrototypeOf;
	else {
		var ka;
		a: {
			var la = {
					Ga: !0
				},
				ma = {};
			try {
				ma.__proto__ = la;
				ka = ma.Ga;
				break a
			} catch (a) {}
			ka = !1
		}
		ja = ka ? function (a, b) {
			a.__proto__ = b;
			if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
			return a
		} : null
	}
	var na = ja;

	function oa(a, b) {
		a.prototype = ia(b.prototype);
		a.prototype.constructor = a;
		if (na) na(a, b);
		else
			for (var c in b)
				if ("prototype" != c)
					if (Object.defineProperties) {
						var d = Object.getOwnPropertyDescriptor(b, c);
						d && Object.defineProperty(a, c, d)
					} else a[c] = b[c]
	}

	function pa(a, b, c) {
		if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
		if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
		return a + ""
	}
	ea("String.prototype.endsWith", function (a) {
		return a ? a : function (b, c) {
			var d = pa(this, b, "endsWith");
			void 0 === c && (c = d.length);
			c = Math.max(0, Math.min(c | 0, d.length));
			for (var e = b.length; 0 < e && 0 < c;)
				if (d[--c] != b[--e]) return !1;
			return 0 >= e
		}
	});
	ea("Array.prototype.find", function (a) {
		return a ? a : function (b, c) {
			a: {
				var d = this;
				d instanceof String && (d = String(d));
				for (var e = d.length, f = 0; f < e; f++) {
					var g = d[f];
					if (b.call(c, g, f, d)) {
						b = g;
						break a
					}
				}
				b = void 0
			}
			return b
		}
	});
	var qa = "function" == typeof Object.assign ? Object.assign : function (a, b) {
		for (var c = 1; c < arguments.length; c++) {
			var d = arguments[c];
			if (d)
				for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e])
		}
		return a
	};
	ea("Object.assign", function (a) {
		return a || qa
	});
	ea("Promise", function (a) {
		function b(g) {
			this.b = 0;
			this.g = void 0;
			this.a = [];
			var h = this.c();
			try {
				g(h.resolve, h.reject)
			} catch (k) {
				h.reject(k)
			}
		}

		function c() {
			this.a = null
		}

		function d(g) {
			return g instanceof b ? g : new b(function (h) {
				h(g)
			})
		}
		if (a) return a;
		c.prototype.b = function (g) {
			if (null == this.a) {
				this.a = [];
				var h = this;
				this.c(function () {
					h.g()
				})
			}
			this.a.push(g)
		};
		var e = da.setTimeout;
		c.prototype.c = function (g) {
			e(g, 0)
		};
		c.prototype.g = function () {
			for (; this.a && this.a.length;) {
				var g = this.a;
				this.a = [];
				for (var h = 0; h < g.length; ++h) {
					var k = g[h];
					g[h] = null;
					try {
						k()
					} catch (m) {
						this.f(m)
					}
				}
			}
			this.a = null
		};
		c.prototype.f = function (g) {
			this.c(function () {
				throw g;
			})
		};
		b.prototype.c = function () {
			function g(m) {
				return function (n) {
					k || (k = !0, m.call(h, n))
				}
			}
			var h = this,
				k = !1;
			return {
				resolve: g(this.K),
				reject: g(this.f)
			}
		};
		b.prototype.K = function (g) {
			if (g === this) this.f(new TypeError("A Promise cannot resolve to itself"));
			else if (g instanceof b) this.L(g);
			else {
				a: switch (typeof g) {
				case "object":
					var h = null != g;
					break a;
				case "function":
					h = !0;
					break a;
				default:
					h = !1
				}
				h ? this.I(g) : this.j(g)
			}
		};
		b.prototype.I = function (g) {
			var h = void 0;
			try {
				h = g.then
			} catch (k) {
				this.f(k);
				return
			}
			"function" == typeof h ? this.P(h, g) : this.j(g)
		};
		b.prototype.f = function (g) {
			this.o(2, g)
		};
		b.prototype.j = function (g) {
			this.o(1, g)
		};
		b.prototype.o = function (g, h) {
			if (0 != this.b) throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.b);
			this.b = g;
			this.g = h;
			this.A()
		};
		b.prototype.A = function () {
			if (null != this.a) {
				for (var g = 0; g < this.a.length; ++g) f.b(this.a[g]);
				this.a = null
			}
		};
		var f = new c;
		b.prototype.L = function (g) {
			var h = this.c();
			g.ca(h.resolve, h.reject)
		};
		b.prototype.P = function (g, h) {
			var k = this.c();
			try {
				g.call(h, k.resolve, k.reject)
			} catch (m) {
				k.reject(m)
			}
		};
		b.prototype.then = function (g, h) {
			function k(w, u) {
				return "function" == typeof w ? function (D) {
					try {
						m(w(D))
					} catch (v) {
						n(v)
					}
				} : u
			}
			var m, n, q = new b(function (w, u) {
				m = w;
				n = u
			});
			this.ca(k(g, m), k(h, n));
			return q
		};
		b.prototype.catch = function (g) {
			return this.then(void 0, g)
		};
		b.prototype.ca = function (g, h) {
			function k() {
				switch (m.b) {
				case 1:
					g(m.g);
					break;
				case 2:
					h(m.g);
					break;
				default:
					throw Error("Unexpected state: " + m.b);
				}
			}
			var m = this;
			null == this.a ? f.b(k) : this.a.push(k)
		};
		b.resolve = d;
		b.reject = function (g) {
			return new b(function (h, k) {
				k(g)
			})
		};
		b.race = function (g) {
			return new b(function (h, k) {
				for (var m = fa(g), n = m.next(); !n.done; n = m.next()) d(n.value).ca(h, k)
			})
		};
		b.all = function (g) {
			var h = fa(g),
				k = h.next();
			return k.done ? d([]) : new b(function (m, n) {
				function q(D) {
					return function (v) {
						w[D] = v;
						u--;
						0 == u && m(w)
					}
				}
				var w = [],
					u = 0;
				do w.push(void 0), u++, d(k.value).ca(q(w.length - 1), n), k = h.next(); while (!k.done)
			})
		};
		return b
	});
	ea("String.prototype.includes", function (a) {
		return a ? a : function (b, c) {
			return -1 !== pa(this, b, "includes").indexOf(b, c || 0)
		}
	});
	var p = this || self;

	function ra(a) {
		if (a && a != p) return sa(a.document);
		null === ta && (ta = sa(p.document));
		return ta
	}
	var ua = /^[\w+/_-]+[=]{0,2}$/,
		ta = null;

	function sa(a) {
		return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && ua.test(a) ? a : ""
	}

	function va(a) {
		a = a.split(".");
		for (var b = p, c = 0; c < a.length; c++)
			if (b = b[a[c]], null == b) return null;
		return b
	}

	function wa() {}

	function xa(a) {
		a.la = void 0;
		a.h = function () {
			return a.la ? a.la : a.la = new a
		}
	}

	function ya(a) {
		var b = typeof a;
		if ("object" == b)
			if (a) {
				if (a instanceof Array) return "array";
				if (a instanceof Object) return b;
				var c = Object.prototype.toString.call(a);
				if ("[object Window]" == c) return "object";
				if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
				if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
			} else return "null";
		else if ("function" == b && "undefined" == typeof a.call) return "object";
		return b
	}

	function za(a) {
		var b = typeof a;
		return "object" == b && null != a || "function" == b
	}

	function Aa(a) {
		return Object.prototype.hasOwnProperty.call(a, Ba) && a[Ba] || (a[Ba] = ++Ca)
	}
	var Ba = "closure_uid_" + (1E9 * Math.random() >>> 0),
		Ca = 0;

	function Da(a, b, c) {
		return a.call.apply(a.bind, arguments)
	}

	function Ea(a, b, c) {
		if (!a) throw Error();
		if (2 < arguments.length) {
			var d = Array.prototype.slice.call(arguments, 2);
			return function () {
				var e = Array.prototype.slice.call(arguments);
				Array.prototype.unshift.apply(e, d);
				return a.apply(b, e)
			}
		}
		return function () {
			return a.apply(b, arguments)
		}
	}

	function Fa(a, b, c) {
		Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Fa = Da : Fa = Ea;
		return Fa.apply(null, arguments)
	}

	function Ga(a, b) {
		var c = Array.prototype.slice.call(arguments, 1);
		return function () {
			var d = c.slice();
			d.push.apply(d, arguments);
			return a.apply(this, d)
		}
	}

	function r(a, b) {
		function c() {}
		c.prototype = b.prototype;
		a.prototype = new c;
		a.prototype.constructor = a
	};
	var Ia = (new Date).getTime();

	function Ja(a, b) {
		for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)
	}

	function Ka(a, b) {
		for (var c = a.length, d = [], e = 0, f = "string" === typeof a ? a.split("") : a, g = 0; g < c; g++)
			if (g in f) {
				var h = f[g];
				b.call(void 0, h, g, a) && (d[e++] = h)
			}
		return d
	}

	function La(a, b) {
		for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
		return d
	}

	function Ma(a, b) {
		for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
			if (e in d && b.call(void 0, d[e], e, a)) return !0;
		return !1
	}

	function Na(a, b) {
		a: {
			for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
				if (e in d && b.call(void 0, d[e], e, a)) {
					b = e;
					break a
				}
			b = -1
		}
		return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
	}

	function Oa(a, b) {
		a: {
			for (var c = "string" === typeof a ? a.split("") : a, d = a.length - 1; 0 <= d; d--)
				if (d in c && b.call(void 0, c[d], d, a)) {
					b = d;
					break a
				}
			b = -1
		}
		return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
	}

	function Pa(a, b) {
		a: if ("string" === typeof a) a = "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
		else {
			for (var c = 0; c < a.length; c++)
				if (c in a && a[c] === b) {
					a = c;
					break a
				}
			a = -1
		}
		return 0 <= a
	};

	function Qa(a) {
		return function () {
			return !a.apply(this, arguments)
		}
	}

	function Ra(a) {
		var b = !1,
			c;
		return function () {
			b || (c = a(), b = !0);
			return c
		}
	}

	function Sa(a) {
		var b = a;
		return function () {
			if (b) {
				var c = b;
				b = null;
				c()
			}
		}
	};

	function Ta(a, b) {
		var c = {},
			d;
		for (d in a) b.call(void 0, a[d], d, a) && (c[d] = a[d]);
		return c
	}

	function Ua(a, b) {
		for (var c in a)
			if (b.call(void 0, a[c], c, a)) return !0;
		return !1
	}

	function Va(a, b) {
		return null !== a && b in a
	}

	function Wa(a, b) {
		for (var c in a)
			if (b.call(void 0, a[c], c, a)) return c
	};

	function Xa(a, b) {
		this.c = a === Ya && b || "";
		this.f = Za
	}
	Xa.prototype.b = !0;
	Xa.prototype.a = function () {
		return this.c.toString()
	};

	function $a(a) {
		if (a instanceof Xa && a.constructor === Xa && a.f === Za) return a.c;
		ya(a);
		return "type_error:TrustedResourceUrl"
	}
	var Za = {},
		Ya = {};

	function ab(a) {
		return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
	}
	var bb = /&/g,
		cb = /</g,
		db = />/g,
		eb = /"/g,
		fb = /'/g,
		gb = /\x00/g;

	function hb(a, b) {
		return -1 != a.indexOf(b)
	}

	function ib(a, b) {
		var c = 0;
		a = ab(String(a)).split(".");
		b = ab(String(b)).split(".");
		for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
			var f = a[e] || "",
				g = b[e] || "";
			do {
				f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
				g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
				if (0 == f[0].length && 0 == g[0].length) break;
				c = jb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || jb(0 == f[2].length, 0 == g[2].length) || jb(f[2], g[2]);
				f = f[3];
				g = g[3]
			} while (0 == c)
		}
		return c
	}

	function jb(a, b) {
		return a < b ? -1 : a > b ? 1 : 0
	};

	function kb(a, b) {
		this.c = a === lb && b || "";
		this.f = mb
	}
	kb.prototype.b = !0;
	kb.prototype.a = function () {
		return this.c.toString()
	};

	function nb(a) {
		if (a instanceof kb && a.constructor === kb && a.f === mb) return a.c;
		ya(a);
		return "type_error:SafeUrl"
	}
	var ob = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
		mb = {},
		lb = {};
	var pb;
	a: {
		var qb = p.navigator;
		if (qb) {
			var rb = qb.userAgent;
			if (rb) {
				pb = rb;
				break a
			}
		}
		pb = ""
	}

	function t(a) {
		return hb(pb, a)
	}

	function sb(a) {
		for (var b = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, c = [], d; d = b.exec(a);) c.push([d[1], d[2], d[3] || void 0]);
		return c
	};

	function tb() {
		return (t("Chrome") || t("CriOS")) && !t("Edge")
	}

	function ub() {
		function a(e) {
			e = Na(e, d);
			return c[e] || ""
		}
		var b = pb;
		if (t("Trident") || t("MSIE")) return vb(b);
		b = sb(b);
		var c = {};
		Ja(b, function (e) {
			c[e[0]] = e[1]
		});
		var d = Ga(Va, c);
		return t("Opera") ? a(["Version", "Opera"]) : t("Edge") ? a(["Edge"]) : t("Edg/") ? a(["Edg"]) : tb() ? a(["Chrome", "CriOS", "HeadlessChrome"]) : (b = b[2]) && b[1] || ""
	}

	function vb(a) {
		var b = /rv: *([\d\.]*)/.exec(a);
		if (b && b[1]) return b[1];
		b = "";
		var c = /MSIE +([\d\.]+)/.exec(a);
		if (c && c[1])
			if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1])
				if (a && a[1]) switch (a[1]) {
				case "4.0":
					b = "8.0";
					break;
				case "5.0":
					b = "9.0";
					break;
				case "6.0":
					b = "10.0";
					break;
				case "7.0":
					b = "11.0"
				} else b = "7.0";
				else b = c[1];
		return b
	};

	function wb(a) {
		var b = ra(a.ownerDocument && a.ownerDocument.defaultView);
		b && a.setAttribute("nonce", b)
	};
	var xb = {
			"\x00": "\\0",
			"\b": "\\b",
			"\f": "\\f",
			"\n": "\\n",
			"\r": "\\r",
			"\t": "\\t",
			"\x0B": "\\x0B",
			'"': '\\"',
			"\\": "\\\\",
			"<": "\\u003C"
		},
		yb = {
			"'": "\\'"
		};

	function zb(a) {
		return String(a).replace(/\-([a-z])/g, function (b, c) {
			return c.toUpperCase()
		})
	};

	function Ab() {
		return t("iPhone") && !t("iPod") && !t("iPad")
	};

	function Bb(a) {
		Bb[" "](a);
		return a
	}
	Bb[" "] = wa;
	var Cb = Ab() || t("iPod"),
		Db = t("Safari") && !(tb() || t("Coast") || t("Opera") || t("Edge") || t("Edg/") || t("OPR") || t("Firefox") || t("FxiOS") || t("Silk") || t("Android")) && !(Ab() || t("iPad") || t("iPod"));

	function x() {}
	var Eb = "function" == typeof Uint8Array;

	function y(a, b, c, d) {
		a.b = null;
		b || (b = []);
		a.o = void 0;
		a.f = -1;
		a.a = b;
		a: {
			if (b = a.a.length) {
				--b;
				var e = a.a[b];
				if (!(null === e || "object" != typeof e || Array.isArray(e) || Eb && e instanceof Uint8Array)) {
					a.g = b - a.f;
					a.c = e;
					break a
				}
			}
			a.g = Number.MAX_VALUE
		}
		a.j = {};
		if (c)
			for (b = 0; b < c.length; b++) e = c[b], e < a.g ? (e += a.f, a.a[e] = a.a[e] || Fb) : (Gb(a), a.c[e] = a.c[e] || Fb);
		if (d && d.length)
			for (b = 0; b < d.length; b++) Hb(a, d[b])
	}
	var Fb = [];

	function Gb(a) {
		var b = a.g + a.f;
		a.a[b] || (a.c = a.a[b] = {})
	}

	function z(a, b) {
		if (b < a.g) {
			b += a.f;
			var c = a.a[b];
			return c === Fb ? a.a[b] = [] : c
		}
		if (a.c) return c = a.c[b], c === Fb ? a.c[b] = [] : c
	}

	function Ib(a, b) {
		a = z(a, b);
		return null == a ? a : +a
	}

	function Jb(a, b) {
		a = z(a, b);
		return null == a ? a : !!a
	}

	function A(a, b, c) {
		a = z(a, b);
		return null == a ? c : a
	}

	function Kb(a, b) {
		a = Jb(a, b);
		return null == a ? !1 : a
	}

	function Lb(a, b) {
		a = Ib(a, b);
		return null == a ? 0 : a
	}

	function Mb(a, b, c) {
		b < a.g ? a.a[b + a.f] = c : (Gb(a), a.c[b] = c);
		return a
	}

	function Hb(a, b) {
		for (var c, d, e = 0; e < b.length; e++) {
			var f = b[e],
				g = z(a, f);
			null != g && (c = f, d = g, Mb(a, f, void 0))
		}
		return c ? (Mb(a, c, d), c) : 0
	}

	function B(a, b, c) {
		a.b || (a.b = {});
		if (!a.b[c]) {
			var d = z(a, c);
			d && (a.b[c] = new b(d))
		}
		return a.b[c]
	}

	function C(a, b, c) {
		a.b || (a.b = {});
		if (!a.b[c]) {
			for (var d = z(a, c), e = [], f = 0; f < d.length; f++) e[f] = new b(d[f]);
			a.b[c] = e
		}
		b = a.b[c];
		b == Fb && (b = a.b[c] = []);
		return b
	};

	function Nb(a) {
		y(this, a, Ob, null)
	}
	r(Nb, x);

	function Pb(a) {
		y(this, a, null, null)
	}
	r(Pb, x);
	var Ob = [2, 3];

	function Qb(a) {
		y(this, a, null, null)
	}
	r(Qb, x);

	function Rb(a) {
		var b = new Qb;
		return Mb(b, 1, a)
	}

	function Sb(a, b) {
		return Mb(a, 2, b)
	}

	function Tb(a, b) {
		return Mb(a, 3, b)
	}

	function Ub(a, b) {
		return Mb(a, 4, b)
	};
	var Vb = document,
		E = window;
	var Wb = {
		"120x90": !0,
		"160x90": !0,
		"180x90": !0,
		"200x90": !0,
		"468x15": !0,
		"728x15": !0
	};

	function Xb(a, b) {
		if (15 == b) {
			if (728 <= a) return 728;
			if (468 <= a) return 468
		} else if (90 == b) {
			if (200 <= a) return 200;
			if (180 <= a) return 180;
			if (160 <= a) return 160;
			if (120 <= a) return 120
		}
		return null
	};

	function Yb() {
		this.a = E.document || {
			cookie: ""
		}
	}
	Yb.prototype.set = function (a, b, c) {
		var d = !1;
		if ("object" === typeof c) {
			var e = c.cb;
			d = c.Wa || !1;
			var f = c.domain || void 0;
			var g = c.path || void 0;
			var h = c.Oa
		}
		if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
		if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
		void 0 === h && (h = -1);
		this.a.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (g ? ";path=" + g : "") + (0 > h ? "" : 0 == h ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(+new Date + 1E3 * h)).toUTCString()) + (d ? ";secure" : "") + (null != e ? ";samesite=" + e : "")
	};
	Yb.prototype.get = function (a, b) {
		for (var c = a + "=", d = (this.a.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
			f = ab(d[e]);
			if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
			if (f == a) return ""
		}
		return b
	};

	function Zb(a, b, c) {
		a.addEventListener && a.addEventListener(b, c, !1)
	};

	function $b(a, b) {
		b = String(b);
		"application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
		return a.createElement(b)
	}

	function ac(a) {
		this.a = a || p.document || document
	}
	ac.prototype.contains = function (a, b) {
		if (!a || !b) return !1;
		if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
		if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
		for (; b && a != b;) b = b.parentNode;
		return b == a
	};

	function bc(a) {
		cc();
		return new Xa(Ya, a)
	}
	var cc = wa;

	function dc() {
		return !ec() && (t("iPod") || t("iPhone") || t("Android") || t("IEMobile"))
	}

	function ec() {
		return t("iPad") || t("Android") && !t("Mobile") || t("Silk")
	};

	function fc(a) {
		try {
			var b;
			if (b = !!a && null != a.location.href) a: {
				try {
					Bb(a.foo);
					b = !0;
					break a
				} catch (c) {}
				b = !1
			}
			return b
		} catch (c) {
			return !1
		}
	}

	function gc(a) {
		for (var b = p, c = 0; b && 40 > c++ && (!fc(b) || !a(b));) a: {
			try {
				var d = b.parent;
				if (d && d != b) {
					b = d;
					break a
				}
			} catch (e) {}
			b = null
		}
	}

	function hc() {
		var a = p;
		gc(function (b) {
			a = b;
			return !1
		});
		return a
	}

	function ic(a, b) {
		var c = a.createElement("script");
		b = bc(b);
		c.src = $a(b);
		wb(c);
		return (a = a.getElementsByTagName("script")[0]) && a.parentNode ? (a.parentNode.insertBefore(c, a), c) : null
	}

	function jc(a, b) {
		return b.getComputedStyle ? b.getComputedStyle(a, null) : a.currentStyle
	}

	function kc(a, b, c) {
		var d = !1;
		void 0 === c || c || (d = lc());
		return !d && !mc() && (c = Math.random(), c < b) ? (c = nc(p), a[Math.floor(c * a.length)]) : null
	}

	function nc(a) {
		if (!a.crypto) return Math.random();
		try {
			var b = new Uint32Array(1);
			a.crypto.getRandomValues(b);
			return b[0] / 65536 / 65536
		} catch (c) {
			return Math.random()
		}
	}

	function F(a, b) {
		if (a)
			for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a)
	}

	function oc(a) {
		return Wa(a, function (b, c) {
			return Object.prototype.hasOwnProperty.call(a, c) && !0
		})
	}

	function pc(a) {
		var b = a.length;
		if (0 == b) return 0;
		for (var c = 305419896, d = 0; d < b; d++) c ^= (c << 5) + (c >> 2) + a.charCodeAt(d) & 4294967295;
		return 0 < c ? c : 4294967296 + c
	}
	var mc = Ra(function () {
		return Ma(["Google Web Preview", "Mediapartners-Google", "Google-Read-Aloud", "Google-Adwords"], qc) || 1E-4 > Math.random()
	});

	function rc(a, b) {
		var c = -1;
		try {
			a && (c = parseInt(a.getItem(b), 10))
		} catch (d) {
			return null
		}
		return 0 <= c && 1E3 > c ? c : null
	}

	function sc(a, b, c) {
		a = mc() ? null : Math.floor(1E3 * nc(a));
		var d;
		if (d = null != a && b) a: {
			var e = String(a);
			try {
				if (b) {
					b.setItem(c, e);
					d = e;
					break a
				}
			} catch (f) {}
			d = null
		}
		return d ? a : null
	}
	var lc = Ra(function () {
		return qc("MSIE")
	});

	function qc(a) {
		return hb(pb, a)
	}
	var tc = /^([0-9.]+)px$/,
		uc = /^(-?[0-9.]{1,30})$/;

	function vc(a) {
		return uc.test(a) && (a = Number(a), !isNaN(a)) ? a : null
	}

	function wc(a, b) {
		return b ? !/^false$/.test(a) : /^true$/.test(a)
	}

	function G(a) {
		return (a = tc.exec(a)) ? +a[1] : null
	}

	function xc(a) {
		a = a && a.toString && a.toString();
		return "string" === typeof a && hb(a, "[native code]")
	}
	var yc = Ra(function () {
		return dc() ? 2 : ec() ? 1 : 0
	});

	function zc(a) {
		var b = {
			display: "none"
		};
		a.style.setProperty ? F(b, function (c, d) {
			a.style.setProperty(d, c, "important")
		}) : a.style.cssText = Ac(Bc(Cc(a.style.cssText), Dc(b, function (c) {
			return c + " !important"
		})))
	}
	var Bc = Object.assign || function (a, b) {
		for (var c = 1; c < arguments.length; c++) {
			var d = arguments[c];
			if (d)
				for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e])
		}
		return a
	};

	function Dc(a, b) {
		var c = {},
			d;
		for (d in a) Object.prototype.hasOwnProperty.call(a, d) && (c[d] = b.call(void 0, a[d], d, a));
		return c
	}

	function Ac(a) {
		var b = [];
		F(a, function (c, d) {
			null != c && "" !== c && b.push(d + ":" + c)
		});
		return b.length ? b.join(";") + ";" : ""
	}

	function Cc(a) {
		var b = {};
		if (a) {
			var c = /\s*:\s*/;
			Ja((a || "").split(/\s*;\s*/), function (d) {
				if (d) {
					var e = d.split(c);
					d = e[0];
					e = e[1];
					d && e && (b[d.toLowerCase()] = e)
				}
			})
		}
		return b
	}

	function Ec(a) {
		"complete" === Vb.readyState || "interactive" === Vb.readyState ? a() : Vb.addEventListener("DOMContentLoaded", a)
	}

	function Fc(a) {
		var b = "https://pagead2.googlesyndication.com/pagead/gen_204?id=gpt_dupeid";
		F(a, function (c, d) {
			c && (b += "&" + d + "=" + encodeURIComponent(c))
		});
		window.fetch(b, {
			keepalive: !0,
			credentials: "include",
			redirect: "follow",
			method: "get",
			mode: "no-cors"
		})
	};

	function Gc(a) {
		a = parseFloat(a);
		return isNaN(a) ? 0 : a
	}

	function Hc(a, b) {
		a = parseInt(a, 10);
		return isNaN(a) ? b : a
	}
	var Ic = /^([\w-]+\.)*([\w-]{2,})(:[0-9]+)?$/;

	function Jc(a, b) {
		return a ? (a = a.match(Ic)) ? a[0] : b : b
	};

	function Kc() {
		return "r20200526"
	}
	var Lc = wc("false", !1),
		Mc = wc("false", !1),
		Nc = wc("false", !1),
		Oc = wc("true", !1) || !Mc;

	function Pc() {
		return Jc("", "pagead2.googlesyndication.com")
	};

	function Qc(a) {
		y(this, a, Rc, Sc)
	}
	r(Qc, x);
	var Rc = [2, 8],
		Sc = [
			[3, 4, 5],
			[6, 7]
		];

	function Tc(a) {
		return null != a ? !a : a
	}

	function Uc(a, b) {
		for (var c = !1, d = 0; d < a.length; d++) {
			var e = a[d].call();
			if (e == b) return e;
			null == e && (c = !0)
		}
		if (!c) return !b
	}

	function Vc(a, b) {
		var c = C(a, Qc, 2);
		if (!c.length) return Wc(a, b);
		a = A(a, 1, 0);
		if (1 == a) return Tc(Vc(c[0], b));
		c = La(c, function (d) {
			return function () {
				return Vc(d, b)
			}
		});
		switch (a) {
		case 2:
			return Uc(c, !1);
		case 3:
			return Uc(c, !0)
		}
	}

	function Wc(a, b) {
		var c = Hb(a, Sc[0]);
		a: {
			switch (c) {
			case 3:
				var d = A(a, 3, 0);
				break a;
			case 4:
				d = A(a, 4, 0);
				break a;
			case 5:
				d = A(a, 5, 0);
				break a
			}
			d = void 0
		}
		if (d && (b = (b = b[c]) && b[d])) {
			try {
				var e = b.apply(null, z(a, 8))
			} catch (f) {
				return
			}
			b = A(a, 1, 0);
			if (4 == b) return !!e;
			d = null != e;
			if (5 == b) return d;
			if (12 == b) a = A(a, 7, "");
			else a: {
				switch (c) {
				case 4:
					a = Lb(a, 6);
					break a;
				case 5:
					a = A(a, 7, "");
					break a
				}
				a = void 0
			}
			if (null != a) {
				if (6 == b) return e === a;
				if (9 == b) return 0 == ib(e, a);
				if (d) switch (b) {
				case 7:
					return e < a;
				case 8:
					return e > a;
				case 12:
					return (new RegExp(a)).test(e);
				case 10:
					return -1 == ib(e, a);
				case 11:
					return 1 == ib(e, a)
				}
			}
		}
	}

	function Xc(a, b) {
		return !a || !(!b || !Vc(a, b))
	};

	function Yc(a) {
		y(this, a, Zc, null)
	}
	r(Yc, x);
	var Zc = [4];

	function $c(a) {
		y(this, a, ad, bd)
	}
	r($c, x);

	function cd(a) {
		y(this, a, null, null)
	}
	r(cd, x);
	var ad = [5],
		bd = [
			[1, 2, 3, 6, 7]
		];

	function dd() {
		var a = {};
		this.a = (a[3] = {}, a[4] = {}, a[5] = {}, a)
	}
	xa(dd);
	var ed = wc("false", !1);

	function fd(a, b) {
		switch (b) {
		case 1:
			return A(a, 1, 0);
		case 2:
			return A(a, 2, 0);
		case 3:
			return A(a, 3, 0);
		case 6:
			return A(a, 6, 0);
		default:
			return null
		}
	}

	function gd(a, b) {
		if (!a) return null;
		switch (b) {
		case 1:
			return Kb(a, 1);
		case 7:
			return A(a, 3, "");
		case 2:
			return Lb(a, 2);
		case 3:
			return A(a, 3, "");
		case 6:
			return z(a, 4);
		default:
			return null
		}
	}
	var hd = Ra(function () {
		if (!ed) return {};
		try {
			var a = window.sessionStorage && window.sessionStorage.getItem("GGDFSSK");
			if (a) return JSON.parse(a)
		} catch (b) {}
		return {}
	});

	function id(a, b, c, d) {
		d = void 0 === d ? 0 : d;
		var e = hd();
		if (e[a] && null != e[a][b]) return e[a][b];
		b = jd(d)[a][b];
		if (!b) return c;
		b = new $c(b);
		b = kd(b);
		a = gd(b, a);
		return null != a ? a : c
	}

	function kd(a) {
		var b = dd.h().a;
		if (b) {
			var c = Oa(C(a, cd, 5), function (d) {
				return Xc(B(d, Qc, 1), b)
			});
			if (c) return B(c, Yc, 2)
		}
		return B(a, Yc, 4)
	}

	function ld() {
		this.a = {};
		this.b = []
	}
	xa(ld);

	function md(a, b, c) {
		return !!id(1, a, void 0 === b ? !1 : b, c)
	}

	function nd(a, b, c) {
		b = void 0 === b ? 0 : b;
		a = Number(id(2, a, b, c));
		return isNaN(a) ? b : a
	}

	function od(a, b, c) {
		return id(3, a, void 0 === b ? "" : b, c)
	}

	function pd(a, b, c) {
		b = void 0 === b ? [] : b;
		return id(6, a, b, c)
	}

	function jd(a) {
		var b = {};
		return ld.h().a[a] || (ld.h().a[a] = (b[1] = {}, b[2] = {}, b[3] = {}, b[6] = {}, b))
	}

	function qd(a, b) {
		var c = jd(b);
		F(a, function (d, e) {
			return F(d, function (f, g) {
				return c[e][g] = f
			})
		})
	}

	function rd(a, b) {
		var c = jd(b);
		Ja(a, function (d) {
			var e = Hb(d, bd[0]),
				f = fd(d, e);
			f && (c[e][f] = d.a)
		})
	}

	function sd(a, b) {
		var c = jd(b);
		Ja(a, function (d) {
			var e = new $c(d),
				f = Hb(e, bd[0]);
			(e = fd(e, f)) && (c[f][e] || (c[f][e] = d))
		})
	}

	function td() {
		return La(Object.keys(ld.h().a), function (a) {
			return Number(a)
		})
	}

	function ud(a) {
		Pa(ld.h().b, a) || qd(jd(4), a)
	};

	function H(a) {
		this.methodName = a
	}
	var vd = new H(1),
		wd = new H(15),
		xd = new H(2),
		yd = new H(3),
		zd = new H(4),
		Ad = new H(5),
		Bd = new H(6),
		Cd = new H(7),
		Dd = new H(8),
		Ed = new H(9),
		Fd = new H(10),
		Gd = new H(11),
		Hd = new H(12),
		Id = new H(13),
		Jd = new H(14);

	function I(a, b, c) {
		c.hasOwnProperty(a.methodName) || Object.defineProperty(c, String(a.methodName), {
			value: b
		})
	}

	function Kd(a, b, c) {
		return b[a.methodName] || c || function () {}
	}

	function Ld(a) {
		I(Ad, md, a);
		I(Bd, nd, a);
		I(Cd, od, a);
		I(Dd, pd, a);
		I(Id, sd, a);
		I(wd, ud, a)
	}

	function Md(a) {
		I(zd, function (b) {
			dd.h().a = b
		}, a);
		I(Ed, function (b, c) {
			var d = dd.h();
			d.a[3][b] || (d.a[3][b] = c)
		}, a);
		I(Fd, function (b, c) {
			var d = dd.h();
			d.a[4][b] || (d.a[4][b] = c)
		}, a);
		I(Gd, function (b, c) {
			var d = dd.h();
			d.a[5][b] || (d.a[5][b] = c)
		}, a);
		I(Jd, function (b) {
			for (var c = dd.h(), d = fa([3, 4, 5]), e = d.next(); !e.done; e = d.next()) {
				var f = e.value;
				e = void 0;
				var g = c.a[f];
				f = b[f];
				for (e in f) g[e] = f[e]
			}
		}, a)
	}

	function Nd(a) {
		a.hasOwnProperty("init-done") || Object.defineProperty(a, "init-done", {
			value: !0
		})
	};

	function Od() {
		this.b = function (a, b) {
			return void 0 === b ? !1 : b
		};
		this.a = function () {}
	}

	function Pd(a, b, c) {
		a.b = function (d, e) {
			return Kd(Ad, b)(d, e, c)
		};
		a.a = function () {
			Kd(wd, b)(c)
		}
	}
	xa(Od);

	function J(a) {
		var b = void 0 === b ? !1 : b;
		return Od.h().b(a, b)
	};

	function Qd() {};

	function Rd(a) {
		a = void 0 === a ? p : a;
		var b = a.context || a.AMP_CONTEXT_DATA;
		if (!b) try {
			b = a.parent.context || a.parent.AMP_CONTEXT_DATA
		} catch (c) {}
		try {
			if (b && b.pageViewId && b.canonicalUrl) return b
		} catch (c) {}
		return null
	}

	function Sd(a) {
		return (a = a || Rd()) ? fc(a.master) ? a.master : null : null
	};

	function Td(a, b) {
		p.google_image_requests || (p.google_image_requests = []);
		var c = p.document.createElement("img");
		if (b) {
			var d = function (e) {
				b && b(e);
				c.removeEventListener && c.removeEventListener("load", d, !1);
				c.removeEventListener && c.removeEventListener("error", d, !1)
			};
			Zb(c, "load", d);
			Zb(c, "error", d)
		}
		c.src = a;
		p.google_image_requests.push(c)
	};

	function Ud(a, b) {
		if (a)
			for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a)
	}

	function Vd(a) {
		return !(!a || !a.call) && "function" === typeof a
	}

	function Wd(a) {
		a = Sd(Rd(a)) || a;
		a.google_unique_id ? ++a.google_unique_id : a.google_unique_id = 1
	}

	function Xd(a) {
		a = a.google_unique_id;
		return "number" === typeof a ? a : 0
	}

	function Yd(a) {
		a = Sd(Rd(a)) || a;
		a = a.google_unique_id;
		return "number" === typeof a ? a : 0
	}
	var Zd = !!window.google_async_iframe_id,
		$d = Zd && window.parent || window;

	function ae() {
		if (Zd && !fc($d)) {
			var a = "." + Vb.domain;
			try {
				for (; 2 < a.split(".").length && !fc($d);) Vb.domain = a = a.substr(a.indexOf(".") + 1), $d = window.parent
			} catch (b) {}
			fc($d) || ($d = window)
		}
		return $d
	}
	var be = /(^| )adsbygoogle($| )/;

	function ce(a) {
		return Lc && a.google_top_window || a.top
	}

	function de(a) {
		a = ce(a);
		return fc(a) ? a : null
	};

	function K(a) {
		a.google_ad_modifications || (a.google_ad_modifications = {});
		return a.google_ad_modifications
	}

	function ee(a, b) {
		a: if (a = K(a).eids || [], a.indexOf) b = a.indexOf(b), b = 0 < b || 0 === b;
		else {
			for (var c = 0; c < a.length; c++)
				if (a[c] === b) {
					b = !0;
					break a
				}
			b = !1
		}
		return b
	}

	function fe(a, b) {
		a = K(a);
		a.tag_partners = a.tag_partners || [];
		a.tag_partners.push(b)
	}

	function ge(a) {
		K(E).allow_second_reactive_tag = a
	}

	function he(a, b, c) {
		for (var d = 0; d < a.length; ++d)
			if ((a[d].ad_slot || b) == b && (a[d].ad_tag_origin || c) == c) return a[d];
		return null
	};
	var ie = {},
		je = (ie.google_ad_client = !0, ie.google_ad_host = !0, ie.google_ad_host_channel = !0, ie.google_adtest = !0, ie.google_tag_for_child_directed_treatment = !0, ie.google_tag_for_under_age_of_consent = !0, ie.google_tag_partner = !0, ie.google_restrict_data_processing = !0, ie);

	function ke() {
		var a = /[a-zA-Z0-9._~-]/,
			b = /%[89a-zA-Z]./;
		return p.location.pathname.replace(/(%[a-zA-Z0-9]{2})/g, function (c) {
			if (!c.match(b)) {
				var d = decodeURIComponent(c);
				if (d.match(a)) return d
			}
			return c.toUpperCase()
		})
	}

	function le() {
		for (var a = ke(), b = "", c = /[/%?&=]/, d = 0; d < a.length; ++d) {
			var e = a[d];
			b = e.match(c) ? b + e : b + encodeURIComponent(e)
		}
		return b
	};

	function M(a) {
		y(this, a, me, null)
	}
	r(M, x);
	var me = [4];
	M.prototype.Y = function () {
		return z(this, 3)
	};

	function N(a) {
		y(this, a, null, null)
	}
	r(N, x);

	function ne(a) {
		y(this, a, null, oe)
	}
	r(ne, x);

	function pe(a) {
		y(this, a, null, null)
	}
	r(pe, x);

	function qe(a) {
		y(this, a, null, null)
	}
	r(qe, x);

	function re(a) {
		y(this, a, null, null)
	}
	r(re, x);
	var oe = [
		[1, 2, 3]
	];

	function se(a) {
		y(this, a, null, null)
	}
	r(se, x);

	function te(a) {
		y(this, a, null, null)
	}
	r(te, x);

	function ue(a) {
		y(this, a, ve, null)
	}
	r(ue, x);
	var ve = [6, 7, 9, 10, 11];

	function we(a) {
		y(this, a, xe, null)
	}
	r(we, x);

	function ye(a) {
		y(this, a, null, null)
	}
	r(ye, x);

	function ze(a) {
		y(this, a, Ae, null)
	}
	r(ze, x);

	function Be(a) {
		y(this, a, null, null)
	}
	r(Be, x);

	function Ce(a) {
		y(this, a, null, null)
	}
	r(Ce, x);

	function De(a) {
		y(this, a, null, null)
	}
	r(De, x);

	function Ee(a) {
		y(this, a, null, null)
	}
	r(Ee, x);
	var xe = [1, 2, 5, 7],
		Ae = [2, 5, 6, 11];

	function Fe(a) {
		var b = le().replace(/(^\/)|(\/$)/g, ""),
			c = pc(b),
			d = Ge(b);
		return a.find(function (e) {
			var f = null != z(e, 7) ? z(B(e, Be, 7), 1) : z(e, 1);
			e = null != z(e, 7) ? z(B(e, Be, 7), 2) : 2;
			if ("number" !== typeof f) return !1;
			switch (e) {
			case 1:
				return f == c;
			case 2:
				return d[f] || !1
			}
			return !1
		}) || null
	}

	function Ge(a) {
		for (var b = {};;) {
			b[pc(a)] = !0;
			if (!a) return b;
			a = a.substring(0, a.lastIndexOf("/"))
		}
	};

	function He(a, b) {
		var c = void 0 === c ? {} : c;
		this.error = a;
		this.context = b.context;
		this.msg = b.message || "";
		this.id = b.id || "jserror";
		this.meta = c
	}

	function Ie(a) {
		return !!(a.error && a.meta && a.id)
	};
	var Je = /^https?:\/\/(\w|-)+\.cdn\.ampproject\.(net|org)(\?|\/|$)/;

	function Ke(a, b) {
		this.a = a;
		this.b = b
	}

	function Le(a, b, c) {
		this.url = a;
		this.a = b;
		this.ua = !!c;
		this.depth = null
	};

	function Me() {
		this.c = "&";
		this.f = !1;
		this.b = {};
		this.g = 0;
		this.a = []
	}

	function Ne(a, b) {
		var c = {};
		c[a] = b;
		return [c]
	}

	function Oe(a, b, c, d, e) {
		var f = [];
		F(a, function (g, h) {
			(g = Pe(g, b, c, d, e)) && f.push(h + "=" + g)
		});
		return f.join(b)
	}

	function Pe(a, b, c, d, e) {
		if (null == a) return "";
		b = b || "&";
		c = c || ",$";
		"string" == typeof c && (c = c.split(""));
		if (a instanceof Array) {
			if (d = d || 0, d < c.length) {
				for (var f = [], g = 0; g < a.length; g++) f.push(Pe(a[g], b, c, d + 1, e));
				return f.join(c[d])
			}
		} else if ("object" == typeof a) return e = e || 0, 2 > e ? encodeURIComponent(Oe(a, b, c, d, e + 1)) : "...";
		return encodeURIComponent(String(a))
	}

	function Qe(a, b, c, d) {
		a.a.push(b);
		a.b[b] = Ne(c, d)
	}

	function Re(a, b, c) {
		b = b + "//pagead2.googlesyndication.com" + c;
		var d = Se(a) - c.length;
		if (0 > d) return "";
		a.a.sort(function (n, q) {
			return n - q
		});
		c = null;
		for (var e = "", f = 0; f < a.a.length; f++)
			for (var g = a.a[f], h = a.b[g], k = 0; k < h.length; k++) {
				if (!d) {
					c = null == c ? g : c;
					break
				}
				var m = Oe(h[k], a.c, ",$");
				if (m) {
					m = e + m;
					if (d >= m.length) {
						d -= m.length;
						b += m;
						e = a.c;
						break
					}
					a.f && (e = d, m[e - 1] == a.c && --e, b += m.substr(0, e), e = a.c, d = 0);
					c = null == c ? g : c
				}
			}
		a = "";
		null != c && (a = e + "trn=" + c);
		return b + a
	}

	function Se(a) {
		var b = 1,
			c;
		for (c in a.b) b = c.length > b ? c.length : b;
		return 3997 - b - a.c.length - 1
	};

	function Te(a, b, c, d, e, f) {
		if ((d ? a.a : Math.random()) < (e || .01)) try {
			if (c instanceof Me) var g = c;
			else g = new Me, F(c, function (k, m) {
				var n = g,
					q = n.g++;
				k = Ne(m, k);
				n.a.push(q);
				n.b[q] = k
			});
			var h = Re(g, a.b, "/pagead/gen_204?id=" + b + "&");
			h && ("undefined" !== typeof f ? Td(h, void 0 === f ? null : f) : Td(h, null))
		} catch (k) {}
	};
	var Ue = null;

	function Ve() {
		if (null === Ue) {
			Ue = "";
			try {
				var a = "";
				try {
					a = p.top.location.hash
				} catch (c) {
					a = p.location.hash
				}
				if (a) {
					var b = a.match(/\bdeid=([\d,]+)/);
					Ue = b ? b[1] : ""
				}
			} catch (c) {}
		}
		return Ue
	};

	function We() {
		var a = p.performance;
		return a && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : +new Date
	}

	function Xe() {
		var a = void 0 === a ? p : a;
		return (a = a.performance) && a.now ? a.now() : null
	};

	function Ye(a, b, c) {
		this.label = a;
		this.type = b;
		this.value = c;
		this.duration = 0;
		this.uniqueId = Math.random();
		this.slotId = void 0
	};
	var Ze = p.performance,
		$e = !!(Ze && Ze.mark && Ze.measure && Ze.clearMarks),
		af = Ra(function () {
			var a;
			if (a = $e) a = Ve(), a = !!a.indexOf && 0 <= a.indexOf("1337");
			return a
		});

	function bf() {
		var a = cf;
		this.b = [];
		this.c = a || p;
		var b = null;
		a && (a.google_js_reporting_queue = a.google_js_reporting_queue || [], this.b = a.google_js_reporting_queue, b = a.google_measure_js_timing);
		this.a = af() || (null != b ? b : 1 > Math.random())
	}

	function df(a) {
		a && Ze && af() && (Ze.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_start"), Ze.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_end"))
	}
	bf.prototype.start = function (a, b) {
		if (!this.a) return null;
		var c = Xe() || We();
		a = new Ye(a, b, c);
		b = "goog_" + a.label + "_" + a.uniqueId + "_start";
		Ze && af() && Ze.mark(b);
		return a
	};

	function ef() {
		var a = ff;
		this.j = gf;
		this.c = !0;
		this.b = null;
		this.g = this.J;
		this.a = void 0 === a ? null : a;
		this.f = !1
	}
	l = ef.prototype;
	l.Ba = function (a) {
		this.g = a
	};
	l.ma = function (a) {
		this.b = a
	};
	l.Ca = function (a) {
		this.c = a
	};
	l.Da = function (a) {
		this.f = a
	};
	l.fa = function (a, b, c) {
		try {
			if (this.a && this.a.a) {
				var d = this.a.start(a.toString(), 3);
				var e = b();
				var f = this.a;
				b = d;
				if (f.a && "number" === typeof b.value) {
					var g = Xe() || We();
					b.duration = g - b.value;
					var h = "goog_" + b.label + "_" + b.uniqueId + "_end";
					Ze && af() && Ze.mark(h);
					!f.a || 2048 < f.b.length || f.b.push(b)
				}
			} else e = b()
		} catch (k) {
			f = this.c;
			try {
				df(d), f = this.g(a, new He(k, {
					message: hf(k)
				}), void 0, c)
			} catch (m) {
				this.J(217, m)
			}
			if (!f) throw k;
		}
		return e
	};
	l.xa = function (a, b, c, d) {
		var e = this;
		return function (f) {
			for (var g = [], h = 0; h < arguments.length; ++h) g[h] = arguments[h];
			return e.fa(a, function () {
				return b.apply(c, g)
			}, d)
		}
	};
	l.J = function (a, b, c, d, e) {
		e = e || "jserror";
		try {
			var f = new Me;
			f.f = !0;
			Qe(f, 1, "context", a);
			Ie(b) || (b = new He(b, {
				message: hf(b)
			}));
			b.msg && Qe(f, 2, "msg", b.msg.substring(0, 512));
			var g = b.meta || {};
			if (this.b) try {
				this.b(g)
			} catch (L) {}
			if (d) try {
				d(g)
			} catch (L) {}
			b = [g];
			f.a.push(3);
			f.b[3] = b;
			d = p;
			b = [];
			g = null;
			do {
				var h = d;
				if (fc(h)) {
					var k = h.location.href;
					g = h.document && h.document.referrer || null
				} else k = g, g = null;
				b.push(new Le(k || "", h));
				try {
					d = h.parent
				} catch (L) {
					d = null
				}
			} while (d && h != d);
			k = 0;
			for (var m = b.length - 1; k <= m; ++k) b[k].depth = m - k;
			h = p;
			if (h.location && h.location.ancestorOrigins && h.location.ancestorOrigins.length == b.length - 1)
				for (m = 1; m < b.length; ++m) {
					var n = b[m];
					n.url || (n.url = h.location.ancestorOrigins[m - 1] || "", n.ua = !0)
				}
			var q = new Le(p.location.href, p, !1);
			h = null;
			var w = b.length - 1;
			for (n = w; 0 <= n; --n) {
				var u = b[n];
				!h && Je.test(u.url) && (h = u);
				if (u.url && !u.ua) {
					q = u;
					break
				}
			}
			u = null;
			var D = b.length && b[w].url;
			0 != q.depth && D && (u = b[w]);
			var v = new Ke(q, u);
			v.b && Qe(f, 4, "top", v.b.url || "");
			Qe(f, 5, "url", v.a.url || "");
			Te(this.j, e, f, this.f, c)
		} catch (L) {
			try {
				Te(this.j, e, {
					context: "ecmserr",
					rctx: a,
					msg: hf(L),
					url: v && v.a.url
				}, this.f, c)
			} catch (Ha) {}
		}
		return this.c
	};

	function hf(a) {
		var b = a.toString();
		a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
		a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
		if (a.stack) {
			a = a.stack;
			try {
				-1 == a.indexOf(b) && (a = b + "\n" + a);
				for (var c; a != c;) c = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
				b = a.replace(/\n */g, "\n")
			} catch (d) {}
		}
		return b
	};

	function O(a) {
		a = void 0 === a ? "" : a;
		var b = Error.call(this);
		this.message = b.message;
		"stack" in b && (this.stack = b.stack);
		this.name = "TagError";
		this.message = a ? "adsbygoogle.push() error: " + a : "";
		Error.captureStackTrace ? Error.captureStackTrace(this, O) : this.stack = Error().stack || ""
	}
	oa(O, Error);

	function jf() {
		this.b = !1;
		this.a = null;
		this.f = !1;
		this.g = Math.random();
		this.c = this.J
	}
	l = jf.prototype;
	l.ma = function (a) {
		this.a = a
	};
	l.Ca = function (a) {
		this.b = a
	};
	l.Da = function (a) {
		this.f = a
	};
	l.Ba = function (a) {
		this.c = a
	};
	l.J = function (a, b, c, d, e) {
		if ((this.f ? this.g : Math.random()) > (void 0 === c ? .01 : c)) return this.b;
		Ie(b) || (b = new He(b, {
			context: a,
			id: void 0 === e ? "jserror" : e
		}));
		if (d || this.a) b.meta = {}, this.a && this.a(b.meta), d && d(b.meta);
		p.google_js_errors = p.google_js_errors || [];
		p.google_js_errors.push(b);
		p.error_rep_loaded || (ic(p.document, p.location.protocol + "//pagead2.googlesyndication.com/pagead/js/err_rep.js"), p.error_rep_loaded = !0);
		return this.b
	};
	l.fa = function (a, b, c) {
		try {
			var d = b()
		} catch (e) {
			if (!this.c(a, e, .01, c, "jserror")) throw e;
		}
		return d
	};
	l.xa = function (a, b, c, d) {
		var e = this;
		return function (f) {
			for (var g = [], h = 0; h < arguments.length; ++h) g[h] = arguments[h];
			return e.fa(a, function () {
				return b.apply(c, g)
			}, d)
		}
	};
	var gf, kf, cf = ae(),
		ff = new bf;

	function lf(a) {
		null != a && (cf.google_measure_js_timing = a);
		cf.google_measure_js_timing || (a = ff, a.a = !1, a.b != a.c.google_js_reporting_queue && (af() && Ja(a.b, df), a.b.length = 0))
	}

	function mf(a) {
		var b = E.jerExpIds;
		if (Array.isArray(b) && 0 !== b.length) {
			var c = a.eid;
			if (c) {
				b = ha(c.split(",")).concat(ha(b));
				c = {};
				for (var d = 0, e = 0; e < b.length;) {
					var f = b[e++];
					var g = f;
					g = za(g) ? "o" + Aa(g) : (typeof g).charAt(0) + g;
					Object.prototype.hasOwnProperty.call(c, g) || (c[g] = !0, b[d++] = f)
				}
				b.length = d;
				a.eid = b.join(",")
			} else a.eid = b.join(",")
		}
	}

	function nf(a) {
		var b = E.jerUserAgent;
		b && (a.useragent = b)
	}
	gf = new function () {
		var a = void 0 === a ? E : a;
		this.b = "http:" === a.location.protocol ? "http:" : "https:";
		this.a = Math.random()
	};
	"number" !== typeof cf.google_srt && (cf.google_srt = Math.random());
	var of = gf,
		pf = cf.google_srt;
	0 <= pf && 1 >= pf && (of.a = pf);
	kf = new ef;
	kf.ma(function (a) {
		mf(a);
		nf(a)
	});
	kf.Da(!0);
	"complete" == cf.document.readyState ? lf() : ff.a && Zb(cf, "load", function () {
		lf()
	});

	function qf() {
		var a = [rf, sf];
		kf.ma(function (b) {
			Ja(a, function (c) {
				c(b)
			});
			mf(b);
			nf(b)
		})
	}

	function tf(a, b, c) {
		return kf.fa(a, b, c)
	}

	function uf(a, b) {
		return kf.xa(a, b, void 0, void 0)
	}

	function vf(a, b, c) {
		Te(gf, a, b, !0, c, void 0)
	}

	function wf(a, b, c, d) {
		var e;
		Ie(b) ? e = b.msg || hf(b.error) : e = hf(b);
		return 0 == e.indexOf("TagError") ? (c = b instanceof He ? b.error : b, c.pbr || (c.pbr = !0, kf.J(a, b, .1, d, "puberror")), !1) : kf.J(a, b, c, d)
	};

	function xf(a, b) {
		this.ra = a;
		this.ya = b
	}

	function yf(a) {
		var b = [].slice.call(arguments).filter(Qa(function (e) {
			return null === e
		}));
		if (!b.length) return null;
		var c = [],
			d = {};
		b.forEach(function (e) {
			c = c.concat(e.ra || []);
			d = Object.assign(d, e.ya)
		});
		return new xf(c, d)
	}

	function zf(a) {
		switch (a) {
		case 1:
			return new xf(null, {
				google_ad_semantic_area: "mc"
			});
		case 2:
			return new xf(null, {
				google_ad_semantic_area: "h"
			});
		case 3:
			return new xf(null, {
				google_ad_semantic_area: "f"
			});
		case 4:
			return new xf(null, {
				google_ad_semantic_area: "s"
			});
		default:
			return null
		}
	};
	var Af = new xf(["google-auto-placed"], {
		google_tag_origin: "qs"
	});
	var Bf = {},
		Cf = (Bf.google_ad_channel = !0, Bf.google_ad_host = !0, Bf);

	function Df(a, b) {
		a.location.href && a.location.href.substring && (b.url = a.location.href.substring(0, 200));
		vf("ama", b, .01)
	}

	function Ef(a) {
		var b = {};
		F(Cf, function (c, d) {
			d in a && (b[d] = a[d])
		});
		return b
	};
	var Ff = Hc("2019", 2012);

	function Gf(a, b, c) {
		if ("relative" === a) return b;
		c || (c = Oc ? "https" : "http");
		p.location && "https:" == p.location.protocol && "http" == c && (c = "https");
		return [c, "://", a, b].join("")
	}

	function Hf(a, b, c) {
		a = Gf(a, b, c);
		2012 < Ff && (b = (b = a.match(/(__[a-z0-9_]+)\.js(?:\?|$)/)) ? b[1] : "", a = a.replace(new RegExp(String(b + ".js").replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08"), "g"), ("_fy" + Ff + b + ".js").replace(/\$/g, "$$$$")));
		J(202) && (a += (0 < a.indexOf("?") ? "&" : "?") + "cache=bust");
		return a
	};
	var If = null;

	function Jf() {
		if (!Lc) return !1;
		if (null != If) return If;
		If = !1;
		try {
			var a = de(p);
			a && -1 != a.location.hash.indexOf("google_logging") && (If = !0);
			p.localStorage.getItem("google_logging") && (If = !0)
		} catch (b) {}
		return If
	}

	function Kf(a, b) {
		b = void 0 === b ? [] : b;
		var c = !1;
		p.google_logging_queue || (c = !0, p.google_logging_queue = []);
		p.google_logging_queue.push([a, b]);
		c && Jf() && (a = Hf(Pc(), "/pagead/js/logging_library.js"), ic(p.document, a))
	};

	function Lf(a, b, c) {
		this.a = a;
		this.b = b;
		this.c = c
	}

	function Mf(a, b) {
		return {
			top: a.b - b,
			right: a.a + a.c + 1,
			bottom: a.b + b,
			left: a.a - 1
		}
	};

	function Nf(a) {
		this.a = {};
		this.b = {};
		if (a)
			for (var b = 0; b < a.length; ++b) this.add(a[b])
	}
	Nf.prototype.add = function (a) {
		this.a[a] = !0;
		this.b[a] = a
	};
	Nf.prototype.contains = function (a) {
		return !!this.a[a]
	};

	function Of(a) {
		y(this, a, null, null)
	}
	r(Of, x);

	function Pf(a) {
		y(this, a, null, null)
	}
	r(Pf, x);

	function Qf(a) {
		y(this, a, null, null)
	}
	r(Qf, x);

	function Rf(a) {
		y(this, a, Sf, null)
	}
	r(Rf, x);
	var Sf = [5];

	function Tf(a) {
		try {
			var b = a.localStorage.getItem("google_ama_settings");
			return b ? new Rf(b ? JSON.parse(b) : null) : null
		} catch (c) {
			return null
		}
	};

	function Uf() {
		this.a = {};
		this.b = {}
	}
	Uf.prototype.set = function (a, b) {
		this.a[a] = b;
		this.b[a] = a
	};
	Uf.prototype.get = function (a, b) {
		return void 0 !== this.a[a] ? this.a[a] : b
	};
	var Vf = {
		rectangle: 1,
		horizontal: 2,
		vertical: 4
	};
	var Wf = {
		overlays: 1,
		interstitials: 2,
		vignettes: 2,
		inserts: 3,
		immersives: 4,
		list_view: 5
	};

	function Xf() {
		this.wasPlaTagProcessed = !1;
		this.wasReactiveAdConfigReceived = {};
		this.adCount = {};
		this.wasReactiveAdVisible = {};
		this.stateForType = {};
		this.reactiveTypeEnabledInAsfe = {};
		this.wasReactiveTagRequestSent = !1;
		this.reactiveTypeDisabledByPublisher = {};
		this.tagSpecificState = {};
		this.improveCollisionDetection = 1;
		this.messageValidationEnabled = !1;
		this.floatingAdsStacking = new Yf
	}

	function Zf(a) {
		a.google_reactive_ads_global_state ? null == a.google_reactive_ads_global_state.floatingAdsStacking && (a.google_reactive_ads_global_state.floatingAdsStacking = new Yf) : a.google_reactive_ads_global_state = new Xf;
		return a.google_reactive_ads_global_state
	}

	function Yf() {
		this.maxZIndexRestrictions = {};
		this.nextRestrictionId = 0;
		this.maxZIndexListeners = []
	};

	function $f(a) {
		a = a.document;
		var b = {};
		a && (b = "CSS1Compat" == a.compatMode ? a.documentElement : a.body);
		return b || {}
	}

	function P(a) {
		return $f(a).clientWidth
	};

	function ag(a, b) {
		for (var c = ["width", "height"], d = 0; d < c.length; d++) {
			var e = "google_ad_" + c[d];
			if (!b.hasOwnProperty(e)) {
				var f = G(a[c[d]]);
				f = null === f ? null : Math.round(f);
				null != f && (b[e] = f)
			}
		}
	}

	function bg(a, b) {
		return !((uc.test(b.google_ad_width) || tc.test(a.style.width)) && (uc.test(b.google_ad_height) || tc.test(a.style.height)))
	}

	function cg(a, b) {
		return (a = dg(a, b)) ? a.y : 0
	}

	function dg(a, b) {
		try {
			var c = b.document.documentElement.getBoundingClientRect(),
				d = a.getBoundingClientRect();
			return {
				x: d.left - c.left,
				y: d.top - c.top
			}
		} catch (e) {
			return null
		}
	}

	function eg(a, b) {
		do {
			var c = jc(a, b);
			if (c && "fixed" == c.position) return !1
		} while (a = a.parentElement);
		return !0
	}

	function fg(a) {
		var b = 0,
			c;
		for (c in Vf) - 1 != a.indexOf(c) && (b |= Vf[c]);
		return b
	}

	function gg(a, b, c, d, e) {
		if (ce(a) != a) return de(a) ? 3 : 16;
		if (!(488 > P(a))) return 4;
		if (!(a.innerHeight >= a.innerWidth)) return 5;
		var f = P(a);
		if (!f || (f - c) / f > d) a = 6;
		else {
			if (c = "true" != e.google_full_width_responsive) a: {
				c = P(a);
				for (b = b.parentElement; b; b = b.parentElement)
					if ((d = jc(b, a)) && (e = G(d.width)) && !(e >= c) && "visible" != d.overflow) {
						c = !0;
						break a
					}
				c = !1
			}
			a = c ? 7 : !0
		}
		return a
	}

	function hg(a, b, c, d) {
		var e = gg(b, c, a, .3, d);
		!0 !== e ? a = e : "true" == d.google_full_width_responsive || eg(c, b) ? ig(b) ? a = !0 : (b = P(b), a = b - a, a = b && 0 <= a ? !0 : b ? -10 > a ? 11 : 0 > a ? 14 : 12 : 10) : a = 9;
		return a
	}

	function jg(a, b, c) {
		a = a.style;
		"rtl" == b ? J(251) ? a.setProperty("margin-right", c, "important") : a.marginRight = c : J(251) ? a.setProperty("margin-left", c, "important") : a.marginLeft = c
	}

	function kg(a, b) {
		if (3 == b.nodeType) return /\S/.test(b.data);
		if (1 == b.nodeType) {
			if (/^(script|style)$/i.test(b.nodeName)) return !1;
			try {
				var c = jc(b, a)
			} catch (d) {}
			return !c || "none" != c.display && !("absolute" == c.position && ("hidden" == c.visibility || "collapse" == c.visibility))
		}
		return !1
	}

	function lg(a, b) {
		for (var c = 0; 100 > c && b.parentElement; ++c) {
			for (var d = b.parentElement.childNodes, e = 0; e < d.length; ++e) {
				var f = d[e];
				if (f != b && kg(a, f)) return
			}
			b = b.parentElement;
			b.style.width = "100%";
			b.style.height = "auto"
		}
	}

	function mg(a, b, c) {
		a = dg(b, a);
		return "rtl" == c ? -a.x : a.x
	}

	function ng(a, b) {
		var c;
		c = (c = b.parentElement) ? (c = jc(c, a)) ? c.direction : "" : "";
		if (c) {
			b.style.border = b.style.borderStyle = b.style.outline = b.style.outlineStyle = b.style.transition = "none";
			b.style.borderSpacing = b.style.padding = "0";
			jg(b, c, "0px");
			b.style.width = P(a) + "px";
			if (0 !== mg(a, b, c)) {
				jg(b, c, "0px");
				var d = mg(a, b, c);
				jg(b, c, -1 * d + "px");
				a = mg(a, b, c);
				0 !== a && a !== d && jg(b, c, d / (a - d) * d + "px")
			}
			b.style.zIndex = 30
		}
	}

	function ig(a) {
		return J(233) || a.location && "#bffwroe2etoq" == a.location.hash
	};

	function Q(a, b) {
		this.b = a;
		this.a = b
	}
	l = Q.prototype;
	l.minWidth = function () {
		return this.b
	};
	l.height = function () {
		return this.a
	};
	l.R = function (a) {
		return 300 < a && 300 < this.a ? this.b : Math.min(1200, Math.round(a))
	};
	l.ja = function (a) {
		return this.R(a) + "x" + this.height()
	};
	l.ba = function () {};

	function R(a, b, c, d) {
		d = void 0 === d ? function (f) {
			return f
		} : d;
		var e;
		return a.style && a.style[c] && d(a.style[c]) || (e = jc(a, b)) && e[c] && d(e[c]) || null
	}

	function og(a) {
		return function (b) {
			return b.minWidth() <= a
		}
	}

	function pg(a, b, c, d) {
		var e = a && qg(c, b),
			f = rg(b, d);
		return function (g) {
			return !(e && g.height() >= f)
		}
	}

	function sg(a) {
		return function (b) {
			return b.height() <= a
		}
	}

	function qg(a, b) {
		return cg(a, b) < $f(b).clientHeight - 100
	}

	function tg(a, b) {
		a = cg(a, b);
		b = $f(b).clientHeight;
		return 0 == b ? null : a / b
	}

	function ug(a, b) {
		var c = R(b, a, "height", G);
		if (c) return c;
		var d = b.style.height;
		b.style.height = "inherit";
		c = R(b, a, "height", G);
		b.style.height = d;
		if (c) return c;
		c = Infinity;
		do(d = b.style && G(b.style.height)) && (c = Math.min(c, d)), (d = R(b, a, "maxHeight", G)) && (c = Math.min(c, d)); while ((b = b.parentElement) && "HTML" != b.tagName);
		return c
	}

	function rg(a, b) {
		var c = 0 == Xd(a);
		return b && c ? Math.max(250, 2 * $f(a).clientHeight / 3) : 250
	};

	function vg(a, b) {
		for (var c = [], d = a.length, e = 0; e < d; e++) c.push(a[e]);
		c.forEach(b, void 0)
	};

	function wg(a) {
		if (1 != a.nodeType) var b = !1;
		else if (b = "INS" == a.tagName) a: {
			b = ["adsbygoogle-placeholder"];
			a = a.className ? a.className.split(/\s+/) : [];
			for (var c = {}, d = 0; d < a.length; ++d) c[a[d]] = !0;
			for (d = 0; d < b.length; ++d)
				if (!c[b[d]]) {
					b = !1;
					break a
				}
			b = !0
		}
		return b
	};

	function xg(a, b, c) {
		switch (c) {
		case 0:
			b.parentNode && b.parentNode.insertBefore(a, b);
			break;
		case 3:
			if (c = b.parentNode) {
				var d = b.nextSibling;
				if (d && d.parentNode != c)
					for (; d && 8 == d.nodeType;) d = d.nextSibling;
				c.insertBefore(a, d)
			}
			break;
		case 1:
			b.insertBefore(a, b.firstChild);
			break;
		case 2:
			b.appendChild(a)
		}
		wg(b) && (b.setAttribute("data-init-display", b.style.display), b.style.display = "block")
	};

	function yg(a, b, c) {
		function d(f) {
			f = zg(f);
			return null == f ? !1 : c > f
		}

		function e(f) {
			f = zg(f);
			return null == f ? !1 : c < f
		}
		switch (b) {
		case 0:
			return {
				G: Ag(a.previousSibling, e),
				da: function (f) {
					return Ag(f.previousSibling, e)
				},
				ea: 0
			};
		case 2:
			return {
				G: Ag(a.lastChild, e),
				da: function (f) {
					return Ag(f.previousSibling, e)
				},
				ea: 0
			};
		case 3:
			return {
				G: Ag(a.nextSibling, d),
				da: function (f) {
					return Ag(f.nextSibling, d)
				},
				ea: 3
			};
		case 1:
			return {
				G: Ag(a.firstChild, d),
				da: function (f) {
					return Ag(f.nextSibling, d)
				},
				ea: 3
			}
		}
		throw Error("Un-handled RelativePosition: " + b);
	}

	function zg(a) {
		return a.hasOwnProperty("google-ama-order-assurance") ? a["google-ama-order-assurance"] : null
	}

	function Ag(a, b) {
		return a && b(a) ? a : null
	};

	function Bg(a, b) {
		for (var c = 0; c < b.length; c++) {
			var d = b[c],
				e = zb(d.bb);
			a[e] = d.value
		}
	};
	var Cg = null;

	function Dg() {
		if (!Cg) {
			for (var a = p, b = a, c = 0; a && a != a.parent;)
				if (a = a.parent, c++, fc(a)) b = a;
				else break;
			Cg = b
		}
		return Cg
	};

	function Eg(a, b, c, d) {
		this.f = a;
		this.b = b;
		this.c = c;
		this.a = d
	}

	function Fg(a, b) {
		var c = [];
		try {
			c = b.querySelectorAll(a.f)
		} catch (g) {}
		if (!c.length) return [];
		b = c;
		c = b.length;
		if (0 < c) {
			for (var d = Array(c), e = 0; e < c; e++) d[e] = b[e];
			b = d
		} else b = [];
		b = Gg(a, b);
		"number" === typeof a.b && (c = a.b, 0 > c && (c += b.length), b = 0 <= c && c < b.length ? [b[c]] : []);
		if ("number" === typeof a.c) {
			c = [];
			for (d = 0; d < b.length; d++) {
				e = Hg(b[d]);
				var f = a.c;
				0 > f && (f += e.length);
				0 <= f && f < e.length && c.push(e[f])
			}
			b = c
		}
		return b
	}
	Eg.prototype.toString = function () {
		return JSON.stringify({
			nativeQuery: this.f,
			occurrenceIndex: this.b,
			paragraphIndex: this.c,
			ignoreMode: this.a
		})
	};

	function Gg(a, b) {
		if (null == a.a) return b;
		switch (a.a) {
		case 1:
			return b.slice(1);
		case 2:
			return b.slice(0, b.length - 1);
		case 3:
			return b.slice(1, b.length - 1);
		case 0:
			return b;
		default:
			throw Error("Unknown ignore mode: " + a.a);
		}
	}

	function Hg(a) {
		var b = [];
		vg(a.getElementsByTagName("p"), function (c) {
			100 <= Ig(c) && b.push(c)
		});
		return b
	}

	function Ig(a) {
		if (3 == a.nodeType) return a.length;
		if (1 != a.nodeType || "SCRIPT" == a.tagName) return 0;
		var b = 0;
		vg(a.childNodes, function (c) {
			b += Ig(c)
		});
		return b
	}

	function Jg(a) {
		return 0 == a.length || isNaN(a[0]) ? a : "\\" + (30 + parseInt(a[0], 10)) + " " + a.substring(1)
	};

	function Kg(a) {
		if (!a) return null;
		var b = z(a, 7);
		if (z(a, 1) || a.Y() || 0 < z(a, 4).length) {
			var c = a.Y(),
				d = z(a, 1),
				e = z(a, 4);
			b = z(a, 2);
			var f = z(a, 5);
			a = Lg(z(a, 6));
			var g = "";
			d && (g += d);
			c && (g += "#" + Jg(c));
			if (e)
				for (c = 0; c < e.length; c++) g += "." + Jg(e[c]);
			b = (e = g) ? new Eg(e, b, f, a) : null
		} else b = b ? new Eg(b, z(a, 2), z(a, 5), Lg(z(a, 6))) : null;
		return b
	}
	var Mg = {
		1: 1,
		2: 2,
		3: 3,
		0: 0
	};

	function Lg(a) {
		return null == a ? a : Mg[a]
	}
	var Ng = {
		1: 0,
		2: 1,
		3: 2,
		4: 3
	};

	function Og() {};

	function Pg(a, b, c) {
		var d = Mf(c, b + 1);
		return !Ma(a, function (e) {
			return e.left < d.right && d.left < e.right && e.top < d.bottom && d.top < e.bottom
		})
	};

	function Qg() {
		this.a = new Uf
	}
	Qg.prototype.set = function (a, b) {
		var c = this.a.get(a);
		c || (c = new Nf, this.a.set(a, c));
		c.add(b)
	};

	function Rg(a, b) {
		function c() {
			d.push({
				anchor: e.anchor,
				position: e.position
			});
			return e.anchor == b.anchor && e.position == b.position
		}
		for (var d = [], e = a; e;) {
			switch (e.position) {
			case 1:
				if (c()) return d;
				e.position = 2;
			case 2:
				if (c()) return d;
				if (e.anchor.firstChild) {
					e = {
						anchor: e.anchor.firstChild,
						position: 1
					};
					continue
				} else e.position = 3;
			case 3:
				if (c()) return d;
				e.position = 4;
			case 4:
				if (c()) return d
			}
			for (; e && !e.anchor.nextSibling && e.anchor.parentNode != e.anchor.ownerDocument.body;) {
				e = {
					anchor: e.anchor.parentNode,
					position: 3
				};
				if (c()) return d;
				e.position = 4;
				if (c()) return d
			}
			e && e.anchor.nextSibling ? e = {
				anchor: e.anchor.nextSibling,
				position: 1
			} : e = null
		}
		return d
	};

	function Sg(a, b) {
		this.b = a;
		this.a = b
	}

	function Tg(a, b) {
		var c = new Qg,
			d = new Nf;
		b.forEach(function (e) {
			if (B(e, pe, 1)) {
				e = B(e, pe, 1);
				if (B(e, N, 1) && B(B(e, N, 1), M, 1) && B(e, N, 2) && B(B(e, N, 2), M, 1)) {
					var f = Ug(a, B(B(e, N, 1), M, 1)),
						g = Ug(a, B(B(e, N, 2), M, 1));
					if (f && g)
						for (f = fa(Rg({
							anchor: f,
							position: z(B(e, N, 1), 2)
						}, {
							anchor: g,
							position: z(B(e, N, 2), 2)
						})), g = f.next(); !g.done; g = f.next()) g = g.value, c.set(Aa(g.anchor), g.position)
				}
				B(e, N, 3) && B(B(e, N, 3), M, 1) && (f = Ug(a, B(B(e, N, 3), M, 1))) && c.set(Aa(f), z(B(e, N, 3), 2))
			} else B(e, qe, 2) ? Vg(a, B(e, qe, 2), c) : B(e, re, 3) && Wg(a, B(e, re, 3), d)
		});
		return new Sg(c, d)
	}

	function Vg(a, b, c) {
		B(b, M, 1) && (a = Xg(a, B(b, M, 1))) && a.forEach(function (d) {
			d = Aa(d);
			c.set(d, 1);
			c.set(d, 4);
			c.set(d, 2);
			c.set(d, 3)
		})
	}

	function Wg(a, b, c) {
		B(b, M, 1) && (a = Xg(a, B(b, M, 1))) && a.forEach(function (d) {
			c.add(Aa(d))
		})
	}

	function Ug(a, b) {
		return (a = Xg(a, b)) && 0 < a.length ? a[0] : null
	}

	function Xg(a, b) {
		return (b = Kg(b)) ? Fg(b, a) : null
	};

	function Yg(a, b) {
		if (!a) return !1;
		a = jc(a, b);
		if (!a) return !1;
		a = a.cssFloat || a.styleFloat;
		return "left" == a || "right" == a
	}

	function Zg(a) {
		for (a = a.previousSibling; a && 1 != a.nodeType;) a = a.previousSibling;
		return a ? a : null
	}

	function $g(a) {
		return !!a.nextSibling || !!a.parentNode && $g(a.parentNode)
	};

	function ah(a, b) {
		return a && null != z(a, 4) && b[z(B(a, te, 4), 2)] ? !1 : !0
	}

	function bh(a) {
		var b = {};
		a && z(a, 6).forEach(function (c) {
			b[c] = !0
		});
		return b
	}

	function ch(a, b, c, d) {
		this.a = p;
		this.A = a;
		this.b = b;
		this.j = d || null;
		this.o = (this.g = c) ? Tg(p.document, C(c, ne, 5)) : Tg(p.document, []);
		this.c = 0;
		this.f = !1
	}

	function dh(a) {
		return new Og(eh(a).numAutoAdsPlaced || 0, C(a.b, ue, 1).length)
	}

	function fh(a, b) {
		if (a.f) return !0;
		a.f = !0;
		var c = C(a.b, ue, 1);
		a.c = 0;
		var d = bh(a.g);
		var e = (e = a.g) ? Pa(z(e, 11), 1) : !1;
		var f;
		if (f = !e && B(a.b, Ee, 15) && Kb(B(a.b, Ee, 15), 12)) a: {
			f = Tf(a.a);
			f = null !== f ? C(f, Qf, 5) : null;
			var g = Tf(a.a);
			var h = null != g ? B(g, Of, 6) || null : null;
			if (null == f) f = !1;
			else {
				var k = g = 4;
				h && (g = z(h, 1) || g, k = z(h, 3) || k);
				h = new Nf([2, 1, 0]);
				B(a.b, Ee, 15) && Kb(B(a.b, Ee, 15), 15) && h.add(4);
				for (var m = [], n = 0; n < f.length; n++) {
					var q = eh(a).numAutoAdsPlaced || 0;
					var w = Tf(a.a);
					w = null !== w && null != z(w, 8) ? z(w, 8) : 0;
					if (q + w >= g) {
						f = !0;
						break a
					}
					q = z(f[n], 1);
					if (null == q) break;
					w = c[q];
					var u = B(f[n], Pf, 2);
					null != u && null != Ib(u, 1) && null != Ib(u, 2) && null != Ib(u, 3) && (u = new Lf(Ib(u, 1), Ib(u, 2), Ib(u, 3)), Pg(m, k, u) && (q = gh(a, w, q, b, d, h), null != q && null != q.W && (q = q.W.getBoundingClientRect(), m.push(q))))
				}
				f = 0 < (eh(a).numAutoAdsPlaced || 0)
			}
		}
		if (f) return !0;
		f = Tf(a.a);
		if (null !== f && Kb(f, 2)) return eh(a).eatf = !0, Kf(7, [!0, 0, !1]), !0;
		f = new Nf([2]);
		!e && B(a.b, Ee, 15) && Kb(B(a.b, Ee, 15), 15) && f.add(4);
		for (e = 0; e < c.length; e++)
			if (gh(a, c[e], e, b, d, f)) return !0;
		Kf(7, [!1, a.c, !1]);
		return !1
	}

	function gh(a, b, c, d, e, f) {
		if (!B(b, te, 4) || !f.contains(z(B(b, te, 4), 1)) || 1 !== z(b, 8) || !ah(b, e)) return null;
		a.c++;
		if (b = hh(a, b, d, e)) d = eh(a), d.placement = c, d.numAutoAdsPlaced || (d.numAutoAdsPlaced = 0), d.numAutoAdsPlaced++, Kf(7, [!1, a.c, !0]);
		return b
	}

	function hh(a, b, c, d) {
		if (!ah(b, d) || 1 != z(b, 8)) return null;
		d = B(b, M, 1);
		if (!d) return null;
		d = Kg(d);
		if (!d) return null;
		d = Fg(d, a.a.document);
		if (0 == d.length) return null;
		d = d[0];
		var e = z(b, 2);
		e = Ng[e];
		e = void 0 === e ? null : e;
		var f;
		if (!(f = null == e)) {
			a: {
				f = a.a;
				switch (e) {
				case 0:
					f = Yg(Zg(d), f);
					break a;
				case 3:
					f = Yg(d, f);
					break a;
				case 2:
					var g = d.lastChild;
					f = Yg(g ? 1 == g.nodeType ? g : Zg(g) : null, f);
					break a
				}
				f = !1
			}
			if (c = !f && !(!c && 2 == e && !$g(d))) c = 1 == e || 2 == e ? d : d.parentNode, c = !(c && !wg(c) && 0 >= c.offsetWidth);
			f = !c
		}
		if (!(c = f)) {
			c = a.o;
			f = z(b, 2);
			g = Aa(d);
			g = c.b.a.get(g);
			if (!(g = g ? g.contains(f) : !1)) a: {
				if (c.a.contains(Aa(d))) switch (f) {
				case 2:
				case 3:
					g = !0;
					break a;
				default:
					g = !1;
					break a
				}
				for (f = d.parentElement; f;) {
					if (c.a.contains(Aa(f))) {
						g = !0;
						break a
					}
					f = f.parentElement
				}
				g = !1
			}
			c = g
		}
		if (c) return null;
		c = B(b, se, 3);
		f = {};
		c && (f.Fa = z(c, 1), f.qa = z(c, 2), f.clearBoth = !!Jb(c, 3));
		c = B(b, te, 4) && z(B(b, te, 4), 2) ? z(B(b, te, 4), 2) : null;
		c = zf(c);
		b = null == z(b, 12) ? null : z(b, 12);
		b = yf(a.j, c, null == b ? null : new xf(null, {
			google_ml_rank: b
		}));
		c = a.a;
		a = a.A;
		var h = c.document,
			k = f.clearBoth || !1;
		g = $b((new ac(h)).a, "DIV");
		var m = g.style;
		m.width = "100%";
		m.height = "auto";
		m.clear = k ? "both" : "none";
		k = g.style;
		k.textAlign = "center";
		f.Qa && Bg(k, f.Qa);
		h = $b((new ac(h)).a, "INS");
		k = h.style;
		k.display = "block";
		k.margin = "auto";
		k.backgroundColor = "transparent";
		f.Fa && (k.marginTop = f.Fa);
		f.qa && (k.marginBottom = f.qa);
		f.Ha && Bg(k, f.Ha);
		g.appendChild(h);
		f = {
			ia: g,
			W: h
		};
		f.W.setAttribute("data-ad-format", "auto");
		g = [];
		if (h = b && b.ra) f.ia.className = h.join(" ");
		h = f.W;
		h.className = "adsbygoogle";
		h.setAttribute("data-ad-client", a);
		g.length && h.setAttribute("data-ad-channel", g.join("+"));
		a: {
			try {
				var n = f.ia;
				var q = void 0 === q ? 0 : q;
				if (J(313)) {
					q = void 0 === q ? 0 : q;
					var w = yg(d, e, q);
					if (w.G) {
						var u = w.G;
						for (d = u; d = w.da(d);) u = d;
						var D = {
							anchor: u,
							position: w.ea
						}
					} else D = {
						anchor: d,
						position: e
					};
					n["google-ama-order-assurance"] = q;
					xg(n, D.anchor, D.position)
				} else xg(n, d, e);
				b: {
					var v = f.W;
					v.setAttribute("data-adsbygoogle-status", "reserved");
					v.className += " adsbygoogle-noablate";
					n = {
						element: v
					};
					var L = b && b.ya;
					if (v.hasAttribute("data-pub-vars")) {
						try {
							L = JSON.parse(v.getAttribute("data-pub-vars"))
						} catch (Ha) {
							break b
						}
						v.removeAttribute("data-pub-vars")
					}
					L && (n.params = L);
					(c.adsbygoogle = c.adsbygoogle || []).push(n)
				}
			} catch (Ha) {
				(v = f.ia) && v.parentNode && (L = v.parentNode, L.removeChild(v), wg(L) && (L.style.display = L.getAttribute("data-init-display") || "none"));
				v = !1;
				break a
			}
			v = !0
		}
		return v ? f : null
	}

	function eh(a) {
		return a.a.google_ama_state = a.a.google_ama_state || {}
	};

	function ih() {
		this.b = new jh(this);
		this.a = 0
	}
	ih.prototype.resolve = function (a) {
		kh(this);
		this.a = 1;
		this.f = a;
		lh(this.b)
	};
	ih.prototype.reject = function (a) {
		kh(this);
		this.a = 2;
		this.c = a;
		lh(this.b)
	};

	function kh(a) {
		if (0 != a.a) throw Error("Already resolved/rejected.");
	}

	function jh(a) {
		this.a = a
	}
	jh.prototype.then = function (a, b) {
		if (this.b) throw Error("Then functions already set.");
		this.b = a;
		this.c = b;
		lh(this)
	};

	function lh(a) {
		switch (a.a.a) {
		case 0:
			break;
		case 1:
			a.b && a.b(a.a.f);
			break;
		case 2:
			a.c && a.c(a.a.c);
			break;
		default:
			throw Error("Unhandled deferred state.");
		}
	};

	function mh(a, b) {
		this.exception = b
	}

	function nh(a, b) {
		this.c = p;
		this.a = a;
		this.b = b
	}
	nh.prototype.start = function () {
		this.f()
	};
	nh.prototype.f = function () {
		try {
			switch (this.c.document.readyState) {
			case "complete":
			case "interactive":
				fh(this.a, !0);
				oh(this);
				break;
			default:
				fh(this.a, !1) ? oh(this) : this.c.setTimeout(Fa(this.f, this), 100)
			}
		} catch (a) {
			oh(this, a)
		}
	};

	function oh(a, b) {
		try {
			a.b.resolve(new mh(dh(a.a), b))
		} catch (c) {
			a.b.reject(c)
		}
	};

	function ph(a) {
		Df(a, {
			atf: 1
		})
	}

	function qh(a, b) {
		(a.google_ama_state = a.google_ama_state || {}).exception = b;
		Df(a, {
			atf: 0
		})
	};

	function rh() {
		this.debugCard = null;
		this.debugCardRequested = !1
	};

	function sh(a, b) {
		if (!a) return !1;
		a = a.hash;
		if (!a || !a.indexOf) return !1;
		if (-1 != a.indexOf(b)) return !0;
		b = th(b);
		return "go" != b && -1 != a.indexOf(b) ? !0 : !1
	}

	function th(a) {
		var b = "";
		Ud(a.split("_"), function (c) {
			b += c.substr(0, 2)
		});
		return b
	};
	var uh = {
		13: "0.001",
		22: "0.01",
		24: "0.05",
		28: "0.001",
		29: "0.01",
		60: "0.03",
		66: "0.1",
		79: "1200",
		82: "3",
		98: "0.01",
		118: "false",
		126: "0.001",
		136: "0.02",
		137: "0.01",
		149: "0",
		150: "1000",
		155: "0.06",
		177: "0.02",
		179: "100",
		180: "20"
	};
	var vh = null;

	function wh() {
		this.a = uh
	};

	function xh(a, b, c) {
		var d = "script";
		d = void 0 === d ? "" : d;
		var e = a.createElement("link");
		try {
			e.rel = "preload";
			if (hb("preload", "stylesheet")) var f = $a(b).toString();
			else {
				if (b instanceof Xa) var g = $a(b).toString();
				else {
					if (b instanceof kb) var h = nb(b);
					else {
						if (b instanceof kb) var k = b;
						else b = "object" == typeof b && b.b ? b.a() : String(b), ob.test(b) || (b = "about:invalid#zClosurez"), k = new kb(lb, b);
						h = nb(k)
					}
					g = h
				}
				f = g
			}
			e.href = f
		} catch (m) {
			return
		}
		d && (e.as = d);
		c && e.setAttribute("nonce", c);
		if (a = a.getElementsByTagName("head")[0]) try {
			a.appendChild(e)
		} catch (m) {}
	};

	function yh(a) {
		var b = {},
			c = {};
		return c.enable_page_level_ads = (b.pltais = !0, b), c.google_ad_client = a, c
	};

	function zh(a) {
		if (!a) return "";
		(a = a.toLowerCase()) && "ca-" != a.substring(0, 3) && (a = "ca-" + a);
		return a
	};

	function Ah(a, b, c) {
		return Bh(a, void 0 === c ? "" : c, function (d) {
			return Ma(C(d, Pb, 2), function (e) {
				return z(e, 1) === b
			})
		})
	}

	function Ch(a, b, c) {
		c = void 0 === c ? "" : c;
		var d = de(a) || a;
		return Dh(d, b) ? !0 : Bh(a, c, function (e) {
			return Ma(z(e, 3), function (f) {
				return f === b
			})
		})
	}

	function Eh(a) {
		return Bh(p, void 0 === a ? "" : a, function () {
			return !0
		})
	}

	function Dh(a, b) {
		a = (a = (a = a.location && a.location.hash) && a.match(/forced_clientside_labs=([\d,]+)/)) && a[1];
		return !!a && Pa(a.split(","), b.toString())
	}

	function Bh(a, b, c) {
		a = de(a) || a;
		var d = Fh(a);
		b && (b = zh(String(b)));
		return Ua(d, function (e, f) {
			return Object.prototype.hasOwnProperty.call(d, f) && (!b || b === f) && c(e)
		})
	}

	function Fh(a) {
		a = Gh(a);
		var b = {};
		Ud(a, function (c, d) {
			try {
				var e = new Nb(c);
				b[d] = e
			} catch (f) {}
		});
		return b
	}

	function Gh(a) {
		try {
			var b = a.localStorage.getItem("google_adsense_settings");
			if (!b) return {};
			var c = JSON.parse(b);
			return c !== Object(c) ? {} : Ta(c, function (d, e) {
				return Object.prototype.hasOwnProperty.call(c, e) && "string" === typeof e && Array.isArray(d)
			})
		} catch (d) {
			return {}
		}
	};

	function Hh() {
		this.b = function () {};
		this.a = function () {
			return []
		}
	}

	function Ih(a, b, c) {
		a.b = function (d) {
			Kd(xd, b, function () {
				return []
			})(d, c)
		};
		a.a = function () {
			return Kd(yd, b, function () {
				return []
			})(c)
		}
	}
	xa(Hh);
	var Jh = {
			i: "368226950",
			s: "368226951"
		},
		Kh = {
			i: "368226960",
			s: "368226961"
		},
		Lh = {
			i: "368226470",
			V: "368226471"
		},
		Mh = {
			i: "368226480",
			V: "368226481"
		},
		Nh = {
			i: "368226500",
			s: "368226501"
		},
		Oh = {
			i: "36998750",
			s: "36998751"
		},
		Ph = {
			w: "20040067",
			i: "20040068",
			oa: "1337"
		},
		Qh = {
			i: "21060548",
			w: "21060549"
		},
		Rh = {
			i: "21060623",
			w: "21060624"
		},
		Sh = {
			i: "21062271",
			w: "21062272"
		};

	function Th(a) {
		return Lc && !!a.google_disable_experiments
	}
	ae();

	function Uh(a) {
		var b = Ch(p, 12, a.google_ad_client);
		a = "google_ad_host" in a;
		var c = ee(p, Jh.s),
			d = sh(p.location, "google_ads_preview");
		return b && !a && c || d
	}

	function Vh(a) {
		if (p.google_apltlad || ce(p) != p || !a.google_ad_client) return null;
		var b = Uh(a),
			c = !ee(p, Lh.V);
		if (!b && !c) return null;
		p.google_apltlad = !0;
		var d = yh(a.google_ad_client),
			e = d.enable_page_level_ads;
		F(a, function (f, g) {
			je[g] && "google_ad_client" != g && (e[g] = f)
		});
		b ? e.google_ad_channel = "AutoInsertAutoAdCode" : c && (e.google_pgb_reactive = 7, "google_ad_section" in a || "google_ad_region" in a) && (e.google_ad_section = a.google_ad_section || a.google_ad_region);
		return d
	}

	function Wh(a) {
		return za(a.enable_page_level_ads) && 7 == a.enable_page_level_ads.google_pgb_reactive
	};

	function sf(a) {
		try {
			var b = K(p).eids || [];
			null != b && 0 < b.length && (a.eid = b.join(","))
		} catch (c) {}
	}

	function rf(a) {
		a.shv = Kc()
	}
	kf.Ca(!Lc);

	function Xh(a, b) {
		return cg(b, a) + R(b, a, "height", G)
	};

	function Yh(a, b) {
		this.start = a < b ? a : b;
		this.a = a < b ? b : a
	};

	function Zh(a) {
		this.b = new Yh(0, 999);
		this.a = a
	}

	function $h(a, b, c) {
		c = void 0 === c ? 0 : c;
		c = 0 != c ? "google_experiment_mod" + c : "google_experiment_mod";
		var d = rc(b, c);
		return null === d ? sc(a, b, c) : d
	};

	function ai() {
		var a = {};
		this[3] = (a[23] = function (b) {
			return Ah(E, parseInt(b, 10))
		}, a[24] = function (b) {
			return Ch(E, parseInt(b, 10))
		}, a);
		a = {};
		this[4] = (a[7] = function (b) {
			try {
				var c = window.localStorage
			} catch (d) {
				c = null
			}
			return $h(window, c, b)
		}, a);
		this[5] = {}
	}
	xa(ai);
	var bi = new Zh(5);

	function ci(a) {
		a = void 0 === a ? p : a;
		return a.ggeac || (a.ggeac = {})
	};

	function di(a, b) {
		a = va(a);
		a = "function" === typeof a ? a() : a;
		return typeof a === b ? a : void 0
	}

	function ei() {
		var a = {};
		this[3] = (a[8] = function (b) {
			return !!va(b)
		}, a[9] = function (b) {
			b = va(b);
			return "function" == ya(b) && xc(b)
		}, a[10] = function () {
			return window == window.top
		}, a[6] = function (b) {
			return Pa(Hh.h().a(), parseInt(b, 10))
		}, a[27] = function (b) {
			b = di(b, "boolean");
			return void 0 !== b ? b : void 0
		}, a);
		a = {};
		this[4] = (a[3] = function () {
			return yc()
		}, a[6] = function (b) {
			b = di(b, "number");
			return void 0 !== b ? b : void 0
		}, a);
		a = {};
		this[5] = (a[2] = function () {
			return window.location.href
		}, a[3] = function () {
			try {
				return window.top.location.hash
			} catch (b) {
				return ""
			}
		}, a[4] = function (b) {
			b = di(b, "string");
			return void 0 !== b ? b : void 0
		}, a)
	}
	xa(ei);

	function fi(a) {
		y(this, a, gi, null)
	}
	r(fi, x);
	var gi = [2];
	fi.prototype.Y = function () {
		return A(this, 1, 0)
	};
	fi.prototype.X = function () {
		return A(this, 7, 0)
	};

	function hi(a) {
		y(this, a, ii, null)
	}
	r(hi, x);
	var ii = [2];
	hi.prototype.X = function () {
		return A(this, 5, 0)
	};

	function ji(a) {
		y(this, a, ki, null)
	}
	r(ji, x);

	function li(a) {
		y(this, a, mi, null)
	}
	r(li, x);
	var ki = [1, 4, 2, 3],
		mi = [2];
	li.prototype.X = function () {
		return A(this, 1, 0)
	};
	var ni = [12, 13];

	function oi() {}
	oi.prototype.G = function (a, b, c) {
		var d = this,
			e = void 0 === c ? {} : c;
		c = void 0 === e.ta ? !1 : e.ta;
		var f = void 0 === e.Pa ? {} : e.Pa;
		e = void 0 === e.Xa ? [] : e.Xa;
		this.a = a;
		this.g = c;
		this.f = f;
		a = {};
		this.b = (a[b] = e, a[4] = [], a);
		this.c = {};
		(b = Ve()) && Ja(b.split(",") || [], function (g) {
			(g = parseInt(g, 10)) && (d.c[g] = !0)
		});
		return this
	};

	function pi(a, b, c) {
		var d = [],
			e = qi(a.a, b);
		if (e.length) {
			9 !== b && (a.a = ri(a.a, b));
			var f = Pa(ni, b);
			Ja(e, function (g) {
				if (g = si(a, g, c)) {
					var h = g.Y();
					d.push(h);
					ti(a, h, f ? 4 : c);
					var k = C(g, $c, 2);
					k && (f ? Ja(td(), function (m) {
						return rd(k, m)
					}) : rd(k, c))
				}
			})
		}
		return d
	}

	function ti(a, b, c) {
		a.b[c] || (a.b[c] = []);
		a = a.b[c];
		Pa(a, b) ? Fc({
			eids: JSON.stringify(a),
			dup: b
		}) : a.push(b)
	}

	function ui(a, b) {
		a.a.push.apply(a.a, ha(Ka(La(b, function (c) {
			return new li(c)
		}), function (c) {
			return !Pa(ni, c.X())
		})))
	}

	function si(a, b, c) {
		var d = dd.h().a;
		if (!Xc(B(b, Qc, 3), d)) return null;
		var e = C(b, fi, 2),
			f = e.length * A(b, 1, 0),
			g = A(b, 6, 0);
		if (g) {
			f = d[4];
			switch (c) {
			case 2:
				var h = f[8];
				break;
			case 1:
				h = f[7]
			}
			f = null;
			if (h) try {
				f = h(g)
			} catch (k) {}
			null === f && (f = Math.floor(1E3 * nc(window)));
			b = vi(b, f);
			return !b || d && !Xc(B(b, Qc, 3), d) ? null : wi(a, [b], 1)
		}
		g = d ? Ka(e, function (k) {
			return Xc(B(k, Qc, 3), d)
		}) : e;
		return g.length ? (b = A(b, 4, 0)) ? xi(a, b, f, g) : wi(a, g, f / 1E3) : null
	}

	function xi(a, b, c, d) {
		var e = null != a.f[b] ? a.f[b] : 1E3;
		if (0 >= e) return null;
		d = wi(a, d, c / e);
		a.f[b] = d ? 0 : e - c;
		return d
	}

	function wi(a, b, c) {
		var d = a.c,
			e = Na(b, function (f) {
				return !!d[f.Y()]
			});
		return e ? e : a.g ? null : kc(b, c, !1)
	}

	function yi(a, b) {
		I(vd, function (c) {
			a.c[c] = !0
		}, b);
		I(xd, function (c, d) {
			return pi(a, c, d)
		}, b);
		I(yd, function (c) {
			return (a.b[c] || []).concat(a.b[4])
		}, b);
		I(Hd, function (c) {
			return ui(a, c)
		}, b)
	}
	xa(oi);

	function qi(a, b) {
		return (a = Na(a, function (c) {
			return c.X() == b
		})) && C(a, hi, 2) || []
	}

	function ri(a, b) {
		return Ka(a, function (c) {
			return c.X() != b
		})
	}

	function vi(a, b) {
		var c = C(a, fi, 2),
			d = c.length,
			e = A(a, 1, 0);
		a = A(a, 8, 0);
		var f = (b - a) % d;
		return b < a || b - a - f >= d * e - 1 ? null : c[f]
	};

	function zi() {
		this.a = function () {}
	}
	xa(zi);

	function Ai(a) {
		zi.h().a(a)
	};

	function Bi(a, b, c, d) {
		var e = 1;
		d = void 0 === d ? ci() : d;
		e = void 0 === e ? 0 : e;
		d.hasOwnProperty("init-done") ? (Kd(Hd, d)(La(C(a, li, 2), function (f) {
			return f.a
		})), Kd(Id, d)(La(C(a, $c, 1), function (f) {
			return f.a
		}), e), b && Kd(Jd, d)(b), Ci(d, e)) : (yi(oi.h().G(C(a, li, 2), e, c), d), Ld(d), Md(d), Nd(d), Ci(d, e), rd(C(a, $c, 1), e), ed = ed || !(!c || !c.Ma), Ai(ei.h()), b && Ai(b))
	}

	function Ci(a, b) {
		a = void 0 === a ? ci() : a;
		b = void 0 === b ? 0 : b;
		var c = a,
			d = b;
		d = void 0 === d ? 0 : d;
		Ih(Hh.h(), c, d);
		c = a;
		b = void 0 === b ? 0 : b;
		Pd(Od.h(), c, b);
		zi.h().a = Kd(Jd, a);
		Od.h().a()
	};

	function Di(a) {
		try {
			return a.localStorage
		} catch (b) {
			return null
		}
	}

	function S(a, b) {
		b && a.push(b)
	}

	function Ei(a, b) {
		for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
		d = de(a) || a;
		d = (d = (d = d.location && d.location.hash) && (d.match(/google_plle=([\d,]+)/) || d.match(/deid=([\d,]+)/))) && d[1];
		return !!d && Ma(c, Ga(hb, d))
	}

	function Fi(a, b, c) {
		for (var d = 0; d < c.length; d++)
			if (Ei(a, c[d])) return c[d];
		return Th(a) ? null : kc(c, b)
	}

	function Gi(a, b, c, d, e, f) {
		f = void 0 === f ? 1 : f;
		for (var g = 0; g < e.length; g++)
			if (Ei(a, e[g])) return e[g];
		Th(a) ? c = null : (f = void 0 === f ? 1 : f, 0 >= d ? c = null : (g = new Yh(c, c + d - 1), (d = d % f || d / f % e.length) || (d = b.b, d = !(d.start <= g.start && d.a >= g.a)), d ? c = null : (a = $h(a, Di(a), b.a), c = null !== a && g.start <= a && g.a >= a ? e[Math.floor((a - c) / f) % e.length] : null)));
		return c
	};

	function Hi(a, b, c) {
		if (fc(a.document.getElementById(b).contentWindow)) a = a.document.getElementById(b).contentWindow, b = a.document, b.body && b.body.firstChild || (/Firefox/.test(navigator.userAgent) ? b.open("text/html", "replace") : b.open(), a.google_async_iframe_close = !0, b.write(c));
		else {
			a = a.document.getElementById(b).contentWindow;
			c = String(c);
			b = ['"'];
			for (var d = 0; d < c.length; d++) {
				var e = c.charAt(d),
					f = e.charCodeAt(0),
					g = d + 1,
					h;
				if (!(h = xb[e])) {
					if (!(31 < f && 127 > f))
						if (f = e, f in yb) e = yb[f];
						else if (f in xb) e = yb[f] = xb[f];
					else {
						h = f.charCodeAt(0);
						if (31 < h && 127 > h) e = f;
						else {
							if (256 > h) {
								if (e = "\\x", 16 > h || 256 < h) e += "0"
							} else e = "\\u", 4096 > h && (e += "0");
							e += h.toString(16).toUpperCase()
						}
						e = yb[f] = e
					}
					h = e
				}
				b[g] = h
			}
			b.push('"');
			a.location.replace("javascript:" + b.join(""))
		}
	};
	var Ii = null;

	function T(a, b, c, d) {
		d = void 0 === d ? !1 : d;
		Q.call(this, a, b);
		this.Z = c;
		this.Na = d
	}
	oa(T, Q);
	T.prototype.ga = function () {
		return this.Z
	};
	T.prototype.ba = function (a, b, c) {
		b.google_ad_resize || (c.style.height = this.height() + "px", b.rpe = !0)
	};

	function Ji(a) {
		return function (b) {
			return !!(b.Z & a)
		}
	};
	var Ki = Bb("script");

	function Li(a, b, c, d, e, f, g, h, k, m, n, q, w, u) {
		this.I = a;
		this.a = b;
		this.Z = void 0 === c ? null : c;
		this.c = void 0 === d ? null : d;
		this.T = void 0 === e ? null : e;
		this.b = void 0 === f ? null : f;
		this.f = void 0 === g ? null : g;
		this.o = void 0 === h ? !1 : h;
		this.A = void 0 === k ? !1 : k;
		this.P = void 0 === m ? null : m;
		this.$ = void 0 === n ? null : n;
		this.g = void 0 === q ? null : q;
		this.j = void 0 === w ? null : w;
		this.aa = void 0 === u ? null : u;
		this.U = this.L = this.K = null
	}

	function Mi(a, b, c) {
		null != a.Z && (c.google_responsive_formats = a.Z);
		null != a.T && (c.google_safe_for_responsive_override = a.T);
		null != a.b && (!0 === a.b ? c.google_full_width_responsive_allowed = !0 : (c.google_full_width_responsive_allowed = !1, c.gfwrnwer = a.b));
		null != a.f && !0 !== a.f && (c.gfwrnher = a.f);
		a.o && (c.google_bfa = a.o);
		a.A && (c.ebfa = a.A);
		var d = a.j || c.google_ad_width;
		null != d && (c.google_resizing_width = d);
		d = a.g || c.google_ad_height;
		null != d && (c.google_resizing_height = d);
		d = a.a.R(b);
		var e = a.a.height();
		c.google_ad_resize || (c.google_ad_width = d, c.google_ad_height = e, c.google_ad_format = a.a.ja(b), c.google_responsive_auto_format = a.I, null != a.c && (c.armr = a.c), c.google_ad_resizable = !0, c.google_override_format = 1, c.google_loader_features_used = 128, !0 === a.b && (c.gfwrnh = a.a.height() + "px"));
		null != a.P && (c.gfwroml = a.P);
		null != a.$ && (c.gfwromr = a.$);
		null != a.g && (c.gfwroh = a.g);
		null != a.j && (c.gfwrow = a.j);
		null != a.aa && (c.gfwroz = a.aa);
		null != a.K && (c.gml = a.K);
		null != a.L && (c.gmr = a.L);
		null != a.U && (c.gzi = a.U);
		b = ae();
		b = de(b) || b;
		sh(b.location, "google_responsive_slot_debug") && (c.ds = "outline:thick dashed " + (d && e ? !0 !== a.b || !0 !== a.f ? "#ffa500" : "#0f0" : "#f00") + " !important;");
		sh(b.location, "google_responsive_dummy_ad") && (Pa([1, 2, 3, 4, 5, 6, 7, 8], a.I) || 1 === a.c) && 2 !== a.c && (a = JSON.stringify({
			googMsgType: "adpnt",
			key_value: [{
				key: "qid",
				value: "DUMMY_AD"
			}]
		}), c.dash = "<" + Ki + ">window.top.postMessage('" + a + "', '*');\n          </" + Ki + '>\n          <div id="dummyAd" style="width:' + d + "px;height:" + e + 'px;\n            background:#ddd;border:3px solid #f00;box-sizing:border-box;\n            color:#000;">\n            <p>Requested size:' + d + "x" + e + "</p>\n            <p>Rendered size:" + d + "x" + e + "</p>\n          </div>")
	};
	/* 
 
 Copyright 2019 The AMP HTML Authors. All Rights Reserved. 
 
 Licensed under the Apache License, Version 2.0 (the "License"); 
 you may not use this file except in compliance with the License. 
 You may obtain a copy of the License at 
 
      http://www.apache.org/licenses/LICENSE-2.0 
 
 Unless required by applicable law or agreed to in writing, software 
 distributed under the License is distributed on an "AS-IS" BASIS, 
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 See the License for the specific language governing permissions and 
 limitations under the License. 
*/
	var Ni = {},
		Oi = (Ni.image_stacked = 1 / 1.91, Ni.image_sidebyside = 1 / 3.82, Ni.mobile_banner_image_sidebyside = 1 / 3.82, Ni.pub_control_image_stacked = 1 / 1.91, Ni.pub_control_image_sidebyside = 1 / 3.82, Ni.pub_control_image_card_stacked = 1 / 1.91, Ni.pub_control_image_card_sidebyside = 1 / 3.74, Ni.pub_control_text = 0, Ni.pub_control_text_card = 0, Ni),
		Pi = {},
		Qi = (Pi.image_stacked = 80, Pi.image_sidebyside = 0, Pi.mobile_banner_image_sidebyside = 0, Pi.pub_control_image_stacked = 80, Pi.pub_control_image_sidebyside = 0, Pi.pub_control_image_card_stacked = 85, Pi.pub_control_image_card_sidebyside = 0, Pi.pub_control_text = 80, Pi.pub_control_text_card = 80, Pi),
		Ri = {},
		Si = (Ri.pub_control_image_stacked = 100, Ri.pub_control_image_sidebyside = 200, Ri.pub_control_image_card_stacked = 150, Ri.pub_control_image_card_sidebyside = 250, Ri.pub_control_text = 100, Ri.pub_control_text_card = 150, Ri);

	function Ti(a) {
		var b = 0;
		a.C && b++;
		a.u && b++;
		a.v && b++;
		if (3 > b) return {
			B: "Tags data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num should be set together."
		};
		b = a.C.split(",");
		var c = a.v.split(",");
		a = a.u.split(",");
		if (b.length !== c.length || b.length !== a.length) return {
			B: 'Lengths of parameters data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num must match. Example: \n data-matched-content-rows-num="4,2"\ndata-matched-content-columns-num="1,6"\ndata-matched-content-ui-type="image_stacked,image_card_sidebyside"'
		};
		if (2 < b.length) return {
			B: "The parameter length of attribute data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num is too long. At most 2 parameters for each attribute are needed: one for mobile and one for desktop, while you are providing " + (b.length + ' parameters. Example: \n data-matched-content-rows-num="4,2"\ndata-matched-content-columns-num="1,6"\ndata-matched-content-ui-type="image_stacked,image_card_sidebyside".')
		};
		for (var d = [], e = [], f = 0; f < b.length; f++) {
			var g = Number(c[f]);
			if (isNaN(g) || 0 === g) return {
				B: "Wrong value '" + c[f] + "' for data-matched-content-rows-num."
			};
			d.push(g);
			g = Number(a[f]);
			if (isNaN(g) || 0 === g) return {
				B: "Wrong value '" + a[f] + "' for data-matched-content-columns-num."
			};
			e.push(g)
		}
		return {
			v: d,
			u: e,
			wa: b
		}
	}

	function Ui(a) {
		return 1200 <= a ? {
			width: 1200,
			height: 600
		} : 850 <= a ? {
			width: a,
			height: Math.floor(.5 * a)
		} : 550 <= a ? {
			width: a,
			height: Math.floor(.6 * a)
		} : 468 <= a ? {
			width: a,
			height: Math.floor(.7 * a)
		} : {
			width: a,
			height: Math.floor(3.44 * a)
		}
	};
	var Vi = ["google_content_recommendation_ui_type", "google_content_recommendation_columns_num", "google_content_recommendation_rows_num"];

	function Wi(a, b) {
		Q.call(this, a, b)
	}
	oa(Wi, Q);
	Wi.prototype.R = function (a) {
		return Math.min(1200, Math.max(this.minWidth(), Math.round(a)))
	};

	function Xi(a, b) {
		Yi(a, b);
		if ("pedestal" == b.google_content_recommendation_ui_type) return new Li(9, new Wi(a, Math.floor(a * b.google_phwr)));
		var c = dc();
		468 > a ? c ? (c = a - 8 - 8, c = Math.floor(c / 1.91 + 70) + Math.floor(11 * (c * Oi.mobile_banner_image_sidebyside + Qi.mobile_banner_image_sidebyside) + 96), a = {
			O: a,
			M: c,
			u: 1,
			v: 12,
			C: "mobile_banner_image_sidebyside"
		}) : (a = Ui(a), a = {
			O: a.width,
			M: a.height,
			u: 1,
			v: 13,
			C: "image_sidebyside"
		}) : (a = Ui(a), a = {
			O: a.width,
			M: a.height,
			u: 4,
			v: 2,
			C: "image_stacked"
		});
		Zi(b, a);
		return new Li(9, new Wi(a.O, a.M))
	}

	function $i(a, b) {
		Yi(a, b);
		var c = Ti({
			v: b.google_content_recommendation_rows_num,
			u: b.google_content_recommendation_columns_num,
			C: b.google_content_recommendation_ui_type
		});
		if (c.B) a = {
			O: 0,
			M: 0,
			u: 0,
			v: 0,
			C: "image_stacked",
			B: c.B
		};
		else {
			var d = 2 === c.wa.length && 468 <= a ? 1 : 0;
			var e = c.wa[d];
			e = 0 === e.indexOf("pub_control_") ? e : "pub_control_" + e;
			var f = Si[e];
			for (var g = c.u[d]; a / g < f && 1 < g;) g--;
			f = g;
			c = c.v[d];
			d = Math.floor(((a - 8 * f - 8) / f * Oi[e] + Qi[e]) * c + 8 * c + 8);
			a = 1500 < a ? {
				width: 0,
				height: 0,
				na: "Calculated slot width is too large: " + a
			} : 1500 < d ? {
				width: 0,
				height: 0,
				na: "Calculated slot height is too large: " + d
			} : {
				width: a,
				height: d
			};
			a = a.na ? {
				O: 0,
				M: 0,
				u: 0,
				v: 0,
				C: e,
				B: a.na
			} : {
				O: a.width,
				M: a.height,
				u: f,
				v: c,
				C: e
			}
		} if (a.B) throw new O(a.B);
		Zi(b, a);
		return new Li(9, new Wi(a.O, a.M))
	}

	function Yi(a, b) {
		if (0 >= a) throw new O("Invalid responsive width from Matched Content slot " + b.google_ad_slot + ": " + a + ". Please ensure to put this Matched Content slot into a non-zero width div container.");
	}

	function Zi(a, b) {
		a.google_content_recommendation_ui_type = b.C;
		a.google_content_recommendation_columns_num = b.u;
		a.google_content_recommendation_rows_num = b.v
	};

	function aj(a, b) {
		Q.call(this, a, b)
	}
	oa(aj, Q);
	aj.prototype.R = function () {
		return this.minWidth()
	};
	aj.prototype.ba = function (a, b, c) {
		ng(a, c);
		b.google_ad_resize || (c.style.height = this.height() + "px", b.rpe = !0)
	};
	var bj = {
		"image-top": function (a) {
			return 600 >= a ? 284 + .414 * (a - 250) : 429
		},
		"image-middle": function (a) {
			return 500 >= a ? 196 - .13 * (a - 250) : 164 + .2 * (a - 500)
		},
		"image-side": function (a) {
			return 500 >= a ? 205 - .28 * (a - 250) : 134 + .21 * (a - 500)
		},
		"text-only": function (a) {
			return 500 >= a ? 187 - .228 * (a - 250) : 130
		},
		"in-article": function (a) {
			return 420 >= a ? a / 1.2 : 460 >= a ? a / 1.91 + 130 : 800 >= a ? a / 4 : 200
		}
	};

	function cj(a, b) {
		Q.call(this, a, b)
	}
	oa(cj, Q);
	cj.prototype.R = function () {
		return Math.min(1200, this.minWidth())
	};

	function dj(a, b, c, d, e) {
		var f = e.google_ad_layout || "image-top";
		if ("in-article" == f && "false" != e.google_full_width_responsive) {
			var g = gg(b, c, a, .2, e);
			if (!0 !== g) e.gfwrnwer = g;
			else if (g = P(b)) e.google_full_width_responsive_allowed = !0, c.parentElement && (lg(b, c), ng(b, c), a = g)
		}
		if (250 > a) throw new O("Fluid responsive ads must be at least 250px wide: availableWidth=" + a);
		a = Math.min(1200, Math.floor(a));
		if (d && "in-article" != f) {
			f = Math.ceil(d);
			if (50 > f) throw new O("Fluid responsive ads must be at least 50px tall: height=" + f);
			return new Li(11, new Q(a, f))
		}
		if ("in-article" != f && (d = e.google_ad_layout_key)) {
			f = "" + d;
			b = Math.pow(10, 3);
			if (d = (c = f.match(/([+-][0-9a-z]+)/g)) && c.length) {
				e = [];
				for (g = 0; g < d; g++) e.push(parseInt(c[g], 36) / b);
				b = e
			} else b = null; if (!b) throw new O("Invalid data-ad-layout-key value: " + f);
			f = (a + -725) / 1E3;
			c = 0;
			d = 1;
			e = b.length;
			for (g = 0; g < e; g++) c += b[g] * d, d *= f;
			f = Math.ceil(1E3 * c - -725 + 10);
			if (isNaN(f)) throw new O("Invalid height: height=" + f);
			if (50 > f) throw new O("Fluid responsive ads must be at least 50px tall: height=" + f);
			if (1200 < f) throw new O("Fluid responsive ads must be at most 1200px tall: height=" + f);
			return new Li(11, new Q(a, f))
		}
		d = bj[f];
		if (!d) throw new O("Invalid data-ad-layout value: " + f);
		c = qg(c, b);
		b = P(b);
		b = "in-article" !== f || c || a !== b ? Math.ceil(d(a)) : Math.ceil(1.25 * d(a));
		return new Li(11, "in-article" == f ? new cj(a, b) : new Q(a, b))
	};

	function ej(a) {
		return function (b) {
			for (var c = a.length - 1; 0 <= c; --c)
				if (!a[c](b)) return !1;
			return !0
		}
	}

	function fj(a, b, c) {
		for (var d = a.length, e = null, f = 0; f < d; ++f) {
			var g = a[f];
			if (b(g)) {
				if (!c || c(g)) return g;
				null === e && (e = g)
			}
		}
		return e
	};
	var U = [new T(970, 90, 2), new T(728, 90, 2), new T(468, 60, 2), new T(336, 280, 1), new T(320, 100, 2), new T(320, 50, 2), new T(300, 600, 4), new T(300, 250, 1), new T(250, 250, 1), new T(234, 60, 2), new T(200, 200, 1), new T(180, 150, 1), new T(160, 600, 4), new T(125, 125, 1), new T(120, 600, 4), new T(120, 240, 4), new T(120, 120, 1, !0)],
		gj = [U[6], U[12], U[3], U[0], U[7], U[14], U[1], U[8], U[10], U[4], U[15], U[2], U[11], U[5], U[13], U[9], U[16]];

	function hj(a, b, c, d, e) {
		"false" == e.google_full_width_responsive ? c = {
			l: a,
			m: 1
		} : "autorelaxed" == b && e.google_full_width_responsive || ij(b) || e.google_ad_resize ? (488 > P(c) && ig(c) && lg(c, d), b = hg(a, c, d, e), c = !0 !== b ? {
			l: a,
			m: b
		} : {
			l: P(c) || a,
			m: !0
		}) : c = {
			l: a,
			m: 2
		};
		b = c.m;
		return !0 !== b ? {
			l: a,
			m: b
		} : d.parentElement ? {
			l: c.l,
			m: b
		} : {
			l: a,
			m: b
		}
	}

	function jj(a, b, c, d, e) {
		var f = tf(247, function () {
				return hj(a, b, c, d, e)
			}),
			g = f.l;
		f = f.m;
		var h = !0 === f,
			k = G(d.style.width),
			m = G(d.style.height),
			n = kj(g, b, c, d, e, h);
		g = n.N;
		h = n.H;
		var q = n.D,
			w = n.F,
			u = n.ga;
		n = n.va;
		var D = lj(b, u),
			v, L = (v = R(d, c, "marginLeft", G)) ? v + "px" : "",
			Ha = (v = R(d, c, "marginRight", G)) ? v + "px" : "";
		v = R(d, c, "zIndex") || "";
		return new Li(D, g, u, null, n, f, h, q, w, L, Ha, m, k, v)
	}

	function ij(a) {
		return "auto" == a || /^((^|,) *(horizontal|vertical|rectangle) *)+$/.test(a)
	}

	function kj(a, b, c, d, e, f) {
		b = "auto" == b ? .25 >= a / Math.min(1200, P(c)) ? 4 : 3 : fg(b);
		var g = !1,
			h = !1;
		if (488 > P(c)) {
			var k = eg(d, c);
			var m = qg(d, c);
			g = !m && k;
			h = m && k
		}
		m = 488 > P(c);
		var n = [og(a), Ji(b)];
		ig(c) || n.push(pg(m, c, d, h));
		null != e.google_max_responsive_height && n.push(sg(e.google_max_responsive_height));
		var q = [
			function (u) {
				return !u.Na
			}
		];
		!g && !h || ig(c) || (g = ug(c, d), q.push(sg(g)));
		var w = m && !f && 3 === b && mj(c) ? new T(a, Math.floor(a / 1.2), 1) : fj(gj.slice(0), ej(n), ej(q));
		if (!w) throw new O("No slot size for availableWidth=" + a);
		q = tf(248, function () {
			var u;
			a: if (f) {
				if (e.gfwrnh && (u = G(e.gfwrnh))) {
					u = {
						N: new aj(a, u),
						H: !0,
						D: !1,
						F: !1
					};
					break a
				}
				u = !1;
				var D = $f(c).clientHeight,
					v = cg(d, c),
					L = c.google_lpabyc,
					Ha = tg(d, c);
				Ha && 2 < Ha && !c.google_bfabyc && (!L || v - L > D) && (D = .9 * $f(c).clientHeight, v = Math.min(D, nj(c, d, e)), D && v == D && (v = c.google_pbfabyc, u = !v, v || (c.google_pbfabyc = cg(d, c) + D)));
				D = a / 1.2;
				if (ig(c)) v = D;
				else if (v = Math.min(D, nj(c, d, e)), v < .5 * D || 100 > v) v = D;
				J(282) && !qg(d, c) && (v = Math.max(v, .5 * $f(c).clientHeight));
				u = {
					N: new aj(a, Math.floor(v)),
					H: v < D ? 102 : !0,
					D: !1,
					F: u
				}
			} else u = {
				N: w,
				H: 100,
				D: !1,
				F: !1
			};
			return u
		});
		g = q.N;
		m = q.H;
		n = q.D;
		q = q.F;
		return "in-article" === e.google_ad_layout && oj(c) ? {
			N: pj(a, c, d, g, e),
			H: !1,
			D: !1,
			F: !1,
			ga: b,
			va: k
		} : {
			N: g,
			H: m,
			D: n,
			F: q,
			ga: b,
			va: k
		}
	}

	function nj(a, b, c) {
		if (c.google_resizing_allowed || "true" == c.google_full_width_responsive) a = Infinity;
		else {
			c = Infinity;
			do {
				var d = R(b, a, "height", G);
				d && (c = Math.min(c, d));
				(d = R(b, a, "maxHeight", G)) && (c = Math.min(c, d))
			} while ((b = b.parentElement) && "HTML" != b.tagName);
			a = c
		}
		return a
	}

	function lj(a, b) {
		if ("auto" == a) return 1;
		switch (b) {
		case 2:
			return 2;
		case 1:
			return 3;
		case 4:
			return 4;
		case 3:
			return 5;
		case 6:
			return 6;
		case 5:
			return 7;
		case 7:
			return 8
		}
		throw Error("bad mask");
	}

	function pj(a, b, c, d, e) {
		var f = e.google_ad_height || R(c, b, "height", G);
		b = dj(a, b, c, f, e).a;
		return b.minWidth() * b.height() > a * d.height() ? new T(b.minWidth(), b.height(), 1) : d
	}

	function oj(a) {
		return J(227) || a.location && "#hffwroe2etoq" == a.location.hash
	}

	function mj(a) {
		return J(232) || a.location && "#affwroe2etoq" == a.location.hash
	};

	function qj(a, b) {
		Q.call(this, a, b)
	}
	oa(qj, Q);
	qj.prototype.R = function () {
		return this.minWidth()
	};
	qj.prototype.ja = function (a) {
		return Q.prototype.ja.call(this, a) + "_0ads_al"
	};
	var rj = [new qj(728, 15), new qj(468, 15), new qj(200, 90), new qj(180, 90), new qj(160, 90), new qj(120, 90)];

	function sj(a, b, c) {
		var d = 250,
			e = 90;
		d = void 0 === d ? 130 : d;
		e = void 0 === e ? 30 : e;
		var f = fj(rj, og(a));
		if (!f) throw new O("No link unit size for width=" + a + "px");
		a = Math.min(a, 1200);
		f = f.height();
		b = Math.max(f, b);
		d = (new Li(10, new qj(a, Math.min(b, 15 == f ? e : d)))).a;
		b = d.minWidth();
		d = d.height();
		15 <= c && (d = c);
		return new Li(10, new qj(b, d))
	}

	function tj(a, b, c, d) {
		if ("false" == d.google_full_width_responsive) return d.google_full_width_responsive_allowed = !1, d.gfwrnwer = 1, a;
		var e = hg(a, b, c, d);
		if (!0 !== e) return d.google_full_width_responsive_allowed = !1, d.gfwrnwer = e, a;
		e = P(b);
		if (!e) return a;
		d.google_full_width_responsive_allowed = !0;
		ng(b, c);
		return e
	};

	function uj(a, b, c, d, e) {
		var f;
		(f = P(b)) ? 488 > P(b) ? b.innerHeight >= b.innerWidth ? (e.google_full_width_responsive_allowed = !0, ng(b, c), f = {
			l: f,
			m: !0
		}) : f = {
			l: a,
			m: 5
		} : f = {
			l: a,
			m: 4
		} : f = {
			l: a,
			m: 10
		};
		var g = f;
		f = g.l;
		g = g.m;
		if (!0 !== g || a == f) return new Li(12, new Q(a, d), null, null, !0, g, 100);
		a = kj(f, "auto", b, c, e, !0);
		return new Li(1, a.N, a.ga, 2, !0, g, a.H, a.D, a.F)
	};

	function vj(a, b) {
		var c = b.google_ad_format;
		if ("autorelaxed" == c) {
			a: {
				if ("pedestal" != b.google_content_recommendation_ui_type)
					for (a = fa(Vi), c = a.next(); !c.done; c = a.next())
						if (null != b[c.value]) {
							b = !0;
							break a
						}
				b = !1
			}
			return b ? 9 : 5
		}
		if (ij(c)) return 1;
		if ("link" == c) return 4;
		if ("fluid" == c) {
			if (c = "in-article" === b.google_ad_layout) c = J(208) || J(227) || a.location && ("#hffwroe2etop" == a.location.hash || "#hffwroe2etoq" == a.location.hash);
			return c ? (wj(b), 1) : 8
		}
		if (c = 27 === b.google_reactive_ad_format) c = !(J(335) || a.location && "#cefwroe2etoq" == a.location.hash);
		if (c) return wj(b), 1
	}

	function xj(a, b, c, d, e) {
		e = b.offsetWidth || (c.google_ad_resize || (void 0 === e ? !1 : e)) && R(b, d, "width", G) || c.google_ad_width || 0;
		(J(310) || d.location && "#ooimne2e" == d.location.hash) && 4 === a && (c.google_ad_format = "auto", c.google_ad_slot = "", a = 1);
		var f = (f = yj(a, e, b, c, d)) ? f : jj(e, c.google_ad_format, d, b, c);
		f.a.ba(d, c, b);
		Mi(f, e, c);
		1 != a && (a = f.a.height(), b.style.height = a + "px")
	}

	function yj(a, b, c, d, e) {
		var f = d.google_ad_height || R(c, e, "height", G);
		switch (a) {
		case 5:
			return a = tf(247, function () {
				return hj(b, d.google_ad_format, e, c, d)
			}), f = a.l, a = a.m, !0 === a && b != f && ng(e, c), !0 === a ? d.google_full_width_responsive_allowed = !0 : (d.google_full_width_responsive_allowed = !1, d.gfwrnwer = a), Xi(f, d);
		case 9:
			return $i(b, d);
		case 4:
			return a = tj(b, e, c, d), sj(a, ug(e, c), f);
		case 8:
			return dj(b, e, c, f, d);
		case 10:
			return uj(b, e, c, f, d)
		}
	}

	function wj(a) {
		a.google_ad_format = "auto";
		a.armr = 3
	};

	function V(a) {
		this.f = [];
		this.b = a || window;
		this.a = 0;
		this.c = null;
		this.g = 0
	}
	var zj;
	l = V.prototype;
	l.Ja = function (a, b) {
		0 != this.a || 0 != this.f.length || b && b != window ? this.sa(a, b) : (this.a = 2, this.Aa(new Aj(a, window)))
	};
	l.sa = function (a, b) {
		this.f.push(new Aj(a, b || this.b));
		Bj(this)
	};
	l.Ra = function (a) {
		this.a = 1;
		if (a) {
			var b = uf(188, Fa(this.za, this, !0));
			this.c = this.b.setTimeout(b, a)
		}
	};
	l.za = function (a) {
		a && ++this.g;
		1 == this.a && (null != this.c && (this.b.clearTimeout(this.c), this.c = null), this.a = 0);
		Bj(this)
	};
	l.Ya = function () {
		return !(!window || !Array)
	};
	l.La = function () {
		return this.g
	};

	function Bj(a) {
		var b = uf(189, Fa(a.Za, a));
		a.b.setTimeout(b, 0)
	}
	l.Za = function () {
		if (0 == this.a && this.f.length) {
			var a = this.f.shift();
			this.a = 2;
			var b = uf(190, Fa(this.Aa, this, a));
			a.a.setTimeout(b, 0);
			Bj(this)
		}
	};
	l.Aa = function (a) {
		this.a = 0;
		a.b()
	};

	function Cj(a) {
		try {
			return a.sz()
		} catch (b) {
			return !1
		}
	}

	function Dj(a) {
		return !!a && ("object" === typeof a || "function" === typeof a) && Cj(a) && Vd(a.nq) && Vd(a.nqa) && Vd(a.al) && Vd(a.rl)
	}

	function Ej() {
		if (zj && Cj(zj)) return zj;
		var a = Dg(),
			b = a.google_jobrunner;
		return Dj(b) ? zj = b : a.google_jobrunner = zj = new V(a)
	}

	function Fj(a, b) {
		Ej().nq(a, b)
	}

	function Gj(a, b) {
		Ej().nqa(a, b)
	}
	V.prototype.nq = V.prototype.Ja;
	V.prototype.nqa = V.prototype.sa;
	V.prototype.al = V.prototype.Ra;
	V.prototype.rl = V.prototype.za;
	V.prototype.sz = V.prototype.Ya;
	V.prototype.tc = V.prototype.La;

	function Aj(a, b) {
		this.b = a;
		this.a = b
	};

	function Hj(a, b) {
		var c = de(b);
		if (c) {
			c = P(c);
			var d = jc(a, b) || {},
				e = d.direction;
			if ("0px" === d.width && "none" != d.cssFloat) return -1;
			if ("ltr" === e && c) return Math.floor(Math.min(1200, c - a.getBoundingClientRect().left));
			if ("rtl" === e && c) return a = b.document.body.getBoundingClientRect().right - a.getBoundingClientRect().right, Math.floor(Math.min(1200, c - a - Math.floor((c - b.document.body.clientWidth) / 2)))
		}
		return -1
	};

	function Ij(a) {
		var b = this;
		this.a = a;
		a.google_iframe_oncopy || (a.google_iframe_oncopy = {
			handlers: {},
			upd: function (c, d) {
				var e = Jj("rx", c),
					f = Number;
				a: {
					if (c && (c = c.match("dt=([^&]+)")) && 2 == c.length) {
						c = c[1];
						break a
					}
					c = ""
				}
				f = f(c);
				f = (new Date).getTime() - f;
				e = e.replace(/&dtd=(\d+|-?M)/, "&dtd=" + (1E5 <= f ? "M" : 0 <= f ? f : "-M"));
				b.set(d, e);
				return e
			}
		});
		this.b = a.google_iframe_oncopy
	}
	Ij.prototype.set = function (a, b) {
		var c = this;
		this.b.handlers[a] = b;
		this.a.addEventListener && this.a.addEventListener("load", function () {
			var d = c.a.document.getElementById(a);
			try {
				var e = d.contentWindow.document;
				if (d.onload && e && (!e.body || !e.body.firstChild)) d.onload()
			} catch (f) {}
		}, !1)
	};

	function Jj(a, b) {
		var c = new RegExp("\\b" + a + "=(\\d+)"),
			d = c.exec(b);
		d && (b = b.replace(c, a + "=" + (+d[1] + 1 || 1)));
		return b
	}
	var Kj, Lj = "var i=this.id,s=window.google_iframe_oncopy,H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){try{h=s.upd(h,i)}catch(e){}w.location.replace(h)}}";
	var W = Lj;
	/[\x00&<>"']/.test(W) && (-1 != W.indexOf("&") && (W = W.replace(bb, "&amp;")), -1 != W.indexOf("<") && (W = W.replace(cb, "&lt;")), -1 != W.indexOf(">") && (W = W.replace(db, "&gt;")), -1 != W.indexOf('"') && (W = W.replace(eb, "&quot;")), -1 != W.indexOf("'") && (W = W.replace(fb, "&#39;")), -1 != W.indexOf("\x00") && (W = W.replace(gb, "&#0;")));
	Lj = W;
	Kj = Lj;
	var Mj = {},
		Nj = (Mj.google_ad_modifications = !0, Mj.google_analytics_domain_name = !0, Mj.google_analytics_uacct = !0, Mj.google_pause_ad_requests = !0, Mj);

	function Oj(a) {
		switch (a) {
		case "":
		case "Test":
		case "Real":
			return !0;
		default:
			return !1
		}
	}

	function Pj(a) {
		this.c = E;
		this.b = void 0 === a ? !1 : a;
		this.a = new Yb
	}

	function Qj(a) {
		var b = a.a.get("__gads", "");
		return a.b && !Oj(b) ? "Real" : b
	}
	Pj.prototype.write = function (a) {
		var b = z(a, 1);
		if (this.b) {
			if (!Oj(this.a.get("__gads", ""))) return;
			Oj(b) || (b = "Real")
		}
		this.a.set("__gads", b, {
			Oa: z(a, 2) - this.c.Date.now() / 1E3,
			path: z(a, 3),
			domain: z(a, 4),
			Wa: !1
		})
	};
	var Rj = /^\.google\.(com?\.)?[a-z]{2,3}$/,
		Sj = /\.(cn|com\.bi|do|sl|ba|by|ma|am)$/;

	function Tj(a) {
		return Rj.test(a) && !Sj.test(a)
	}
	var Uj = p;

	function Vj(a) {
		a = "https://adservice" + (a + "/adsid/integrator.js");
		var b = ["domain=" + encodeURIComponent(p.location.hostname)];
		X[3] >= +new Date && b.push("adsid=" + encodeURIComponent(X[1]));
		return a + "?" + b.join("&")
	}
	var X, Y;

	function Wj() {
		Uj = p;
		X = Uj.googleToken = Uj.googleToken || {};
		var a = +new Date;
		X[1] && X[3] > a && 0 < X[2] || (X[1] = "", X[2] = -1, X[3] = -1, X[4] = "", X[6] = "");
		Y = Uj.googleIMState = Uj.googleIMState || {};
		Tj(Y[1]) || (Y[1] = ".google.com");
		Array.isArray(Y[5]) || (Y[5] = []);
		"boolean" !== typeof Y[6] && (Y[6] = !1);
		Array.isArray(Y[7]) || (Y[7] = []);
		"number" !== typeof Y[8] && (Y[8] = 0)
	}
	var Xj = {
		ka: function () {
			return 0 < Y[8]
		},
		Ta: function () {
			Y[8]++
		},
		Ua: function () {
			0 < Y[8] && Y[8]--
		},
		Va: function () {
			Y[8] = 0
		},
		eb: function () {
			return !1
		},
		Ka: function () {
			return Y[5]
		},
		Ia: function (a) {
			try {
				a()
			} catch (b) {
				p.setTimeout(function () {
					throw b;
				}, 0)
			}
		},
		Sa: function () {
			if (!Xj.ka()) {
				var a = p.document,
					b = function (e) {
						e = Vj(e);
						a: {
							try {
								var f = ra();
								break a
							} catch (g) {}
							f = void 0
						}
						xh(a, e, f);
						f = a.createElement("script");
						f.type = "text/javascript";
						f.onerror = function () {
							return p.processGoogleToken({}, 2)
						};
						e = bc(e);
						f.src = $a(e);
						wb(f);
						try {
							(a.head || a.body || a.documentElement).appendChild(f), Xj.Ta()
						} catch (g) {}
					},
					c = Y[1];
				b(c);
				".google.com" != c && b(".google.com");
				b = {};
				var d = (b.newToken = "FBT", b);
				p.setTimeout(function () {
					return p.processGoogleToken(d, 1)
				}, 1E3)
			}
		}
	};

	function Yj() {
		p.processGoogleToken = p.processGoogleToken || function (a, b) {
			var c = a;
			c = void 0 === c ? {} : c;
			b = void 0 === b ? 0 : b;
			a = c.newToken || "";
			var d = "NT" == a,
				e = parseInt(c.freshLifetimeSecs || "", 10),
				f = parseInt(c.validLifetimeSecs || "", 10),
				g = c["1p_jar"] || "";
			c = c.pucrd || "";
			Wj();
			1 == b ? Xj.Va() : Xj.Ua();
			var h = Uj.googleToken = Uj.googleToken || {},
				k = 0 == b && a && "string" === typeof a && !d && "number" === typeof e && 0 < e && "number" === typeof f && 0 < f && "string" === typeof g;
			d = d && !Xj.ka() && (!(X[3] >= +new Date) || "NT" == X[1]);
			var m = !(X[3] >= +new Date) && 0 != b;
			if (k || d || m) d = +new Date, e = d + 1E3 * e, f = d + 1E3 * f, 1E-5 > Math.random() && Td("https://pagead2.googlesyndication.com/pagead/gen_204?id=imerr&err=" + b, null), h[5] = b, h[1] = a, h[2] = e, h[3] = f, h[4] = g, h[6] = c, Wj();
			if (k || !Xj.ka()) {
				b = Xj.Ka();
				for (a = 0; a < b.length; a++) Xj.Ia(b[a]);
				b.length = 0
			}
		};
		Wj();
		X[3] >= +new Date && X[2] >= +new Date || Xj.Sa()
	};
	var Zj = Bb("script");

	function ak() {
		E.google_sa_impl && !E.document.getElementById("google_shimpl") && (E.google_sa_queue = null, E.google_sl_win = null, E.google_sa_impl = null);
		if (!E.google_sa_queue) {
			E.google_sa_queue = [];
			E.google_sl_win = E;
			E.google_process_slots = function () {
				return bk(E)
			};
			var a = ck();
			xc(E.Promise) && xc(E.Symbol) ? ic(E.document, a).id = "google_shimpl" : (a = $b(document, "IFRAME"), a.id = "google_shimpl", a.style.display = "none", E.document.documentElement.appendChild(a), Hi(E, "google_shimpl", "<!doctype html><html><body><" + (Zj + ">google_sl_win=window.parent;google_async_iframe_id='google_shimpl';</") + (Zj + ">") + dk() + "</body></html>"), a.contentWindow.document.close())
		}
	}
	var bk = uf(215, function (a) {
		var b = a.google_sa_queue,
			c = b.shift();
		a.google_sa_impl || vf("shimpl", {
			t: "no_fn"
		});
		"function" == ya(c) && tf(216, c);
		b.length && a.setTimeout(function () {
			return bk(a)
		}, 0)
	});

	function ek(a, b, c) {
		a.google_sa_queue = a.google_sa_queue || [];
		a.google_sa_impl ? c(b) : a.google_sa_queue.push(b)
	}

	function dk() {
		var a = ck();
		return "<" + Zj + ' src="' + a + '"></' + Zj + ">"
	}

	function ck() {
		var a = "/show_ads_impl.js";
		a = void 0 === a ? "/show_ads_impl.js" : a;
		a: {
			if (Lc) try {
				var b = E.google_cafe_host || E.top.google_cafe_host;
				if (b) {
					var c = b;
					break a
				}
			} catch (d) {}
			c = Pc()
		}
		return Hf(c, ["/pagead/js/", Kc(), "/r20190131", a, ""].join(""), "https")
	}

	function fk(a, b, c, d) {
		return function () {
			var e = !1;
			d && Ej().al(3E4);
			try {
				Hi(a, b, c), e = !0
			} catch (g) {
				var f = Dg().google_jobrunner;
				Dj(f) && f.rl()
			}
			e && (e = Jj("google_async_rrc", c), (new Ij(a)).set(b, fk(a, b, e, !1)))
		}
	}

	function gk(a) {
		if (!Ii) a: {
			for (var b = [p.top], c = [], d = 0, e; e = b[d++];) {
				c.push(e);
				try {
					if (e.frames)
						for (var f = e.frames.length, g = 0; g < f && 1024 > b.length; ++g) b.push(e.frames[g])
				} catch (k) {}
			}
			for (b = 0; b < c.length; b++) try {
				var h = c[b].frames.google_esf;
				if (h) {
					Ii = h;
					break a
				}
			} catch (k) {}
			Ii = null
		}
		if (!Ii) {
			if (/[^a-z0-9-]/.test(a)) return null;
			c = $b(document, "IFRAME");
			c.id = "google_esf";
			c.name = "google_esf";
			h = Gf(Jc("", "googleads.g.doubleclick.net"), ["/pagead/html/", Kc(), "/r20190131/zrt_lookup.html#",
				encodeURIComponent("")
			].join(""));
			c.src = h;
			c.style.display = "none";
			c.setAttribute("data-ad-client", zh(a));
			return c
		}
		return null
	}

	function hk(a, b, c) {
		ik(a, b, c, function (d, e, f) {
			d = d.document;
			for (var g = e.id, h = 0; !g || d.getElementById(g + "_anchor");) g = "aswift_" + h++;
			e.id = g;
			e.name = g;
			g = Number(f.google_ad_width || 0);
			h = Number(f.google_ad_height || 0);
			var k = f.ds || "";
			k && (k += k.endsWith(";") ? "" : ";");
			var m = "";
			if (!f.google_enable_single_iframe) {
				m = ["<iframe"];
				for (n in e) e.hasOwnProperty(n) && m.push(n + "=" + e[n]);
				m.push('style="left:0;position:absolute;top:0;border:0px;width:' + (g + "px;height:" + (h + 'px;"')));
				m.push("></iframe>");
				m = m.join(" ")
			}
			var n = e.id;
			var q = "";
			q = void 0 === q ? "" : q;
			g = "border:none;height:" + h + "px;margin:0;padding:0;position:relative;visibility:visible;width:" + (g + "px;background-color:transparent;");
			n = ['<ins id="' + (n + '_expand"'), ' style="display:inline-table;' + g + (void 0 === k ? "" : k) + '"', q ? ' data-ad-slot="' + q + '">' : ">", '<ins id="' + (n + '_anchor" style="display:block;') + g + '">', m, "</ins></ins>"].join("");
			16 == f.google_reactive_ad_format ? (f = d.createElement("div"), f.innerHTML = n, c.appendChild(f.firstChild)) : c.innerHTML = n;
			return e.id
		})
	}

	function ik(a, b, c, d) {
		var e = b.google_ad_width,
			f = b.google_ad_height;
		if (!Cb && !Db || J(325)) b.google_enable_single_iframe = !0;
		var g = {};
		null != e && (g.width = e && '"' + e + '"');
		null != f && (g.height = f && '"' + f + '"');
		g.frameborder = '"0"';
		g.marginwidth = '"0"';
		g.marginheight = '"0"';
		g.vspace = '"0"';
		g.hspace = '"0"';
		g.allowtransparency = '"true"';
		g.scrolling = '"no"';
		g.allowfullscreen = '"true"';
		g.onload = '"' + Kj + '"';
		d = d(a, g, b);
		jk(a, c, b);
		(c = gk(b.google_ad_client)) && a.document.documentElement.appendChild(c);
		c = Ia;
		e = (new Date).getTime();
		b.google_lrv = Kc();
		b.google_async_iframe_id = d;
		b.google_unique_id = Yd(a);
		b.google_start_time = c;
		b.google_bpp = e > c ? e - c : 1;
		b.google_async_rrc = 0;
		a.google_sv_map = a.google_sv_map || {};
		a.google_sv_map[d] = b;
		a.google_t12n_vars = uh;
		if (b.google_enable_single_iframe) {
			var h = {
				pubWin: a,
				iframeWin: null,
				vars: b
			};
			ek(a, function () {
				a.google_sa_impl(h)
			}, a.document.getElementById(d + "_anchor") ? Fj : Gj)
		} else ek(a, fk(a, d, ["<!doctype html><html><body>", "<" + Zj + ">", "google_sl_win=window.parent;google_iframe_start_time=new Date().getTime();", 'google_async_iframe_id="' + d + '";', "</" + Zj + ">", "<" + Zj + ">window.parent.google_sa_impl({iframeWin: window, pubWin: window.parent, vars: window.parent['google_sv_map']['" + (d + "']});</") + Zj + ">", "</body></html>"].join(""), !0), a.document.getElementById(d) ? Fj : Gj)
	}

	function jk(a, b, c) {
		var d = c.google_ad_output,
			e = c.google_ad_format,
			f = c.google_ad_width || 0,
			g = c.google_ad_height || 0;
		e || "html" != d && null != d || (e = f + "x" + g);
		d = !c.google_ad_slot || c.google_override_format || !Wb[c.google_ad_width + "x" + c.google_ad_height] && "aa" == c.google_loader_used;
		e && d ? e = e.toLowerCase() : e = "";
		c.google_ad_format = e;
		if ("number" !== typeof c.google_reactive_sra_index || !c.google_ad_unit_key) {
			e = [c.google_ad_slot, c.google_orig_ad_format || c.google_ad_format, c.google_ad_type, c.google_orig_ad_width || c.google_ad_width,
				c.google_orig_ad_height || c.google_ad_height
			];
			d = [];
			f = 0;
			for (g = b; g && 25 > f; g = g.parentNode, ++f) 9 === g.nodeType ? d.push("") : d.push(g.id);
			(d = d.join()) && e.push(d);
			c.google_ad_unit_key = pc(e.join(":")).toString();
			var h = void 0 === h ? !1 : h;
			e = [];
			for (d = 0; b && 25 > d; ++d) {
				f = "";
				void 0 !== h && h || (f = (f = 9 !== b.nodeType && b.id) ? "/" + f : "");
				a: {
					if (b && b.nodeName && b.parentElement) {
						g = b.nodeName.toString().toLowerCase();
						for (var k = b.parentElement.childNodes, m = 0, n = 0; n < k.length; ++n) {
							var q = k[n];
							if (q.nodeName && q.nodeName.toString().toLowerCase() === g) {
								if (b === q) {
									g = "." + m;
									break a
								}++m
							}
						}
					}
					g = ""
				}
				e.push((b.nodeName && b.nodeName.toString().toLowerCase()) + f + g);
				b = b.parentElement
			}
			h = e.join() + ":";
			b = [];
			if (a) try {
				var w = a.parent;
				for (e = 0; w && w !== a && 25 > e; ++e) {
					var u = w.frames;
					for (d = 0; d < u.length; ++d)
						if (a === u[d]) {
							b.push(d);
							break
						}
					a = w;
					w = a.parent
				}
			} catch (D) {}
			c.google_ad_dom_fingerprint = pc(h + b.join()).toString()
		}
	}
	var kk = !Nc;

	function lk(a) {
		var b = a.value,
			c = "https://partner.googleadservices.com/gampad/cookie.js?domain=" + a.domain + "&callback=_gfp_s_&client=" + a.ab;
		a.$a && (c += "&test=1");
		b && (c += "&cookie=" + encodeURIComponent(b) + "&crv=" + Number("Test" !== b));
		return c
	}

	function mk(a) {
		var b = void 0 === b ? lk : b;
		var c = E._gfp_a_;
		if ("boolean" !== typeof c) throw Error("Illegal value of _gfp_a_: " + c);
		if (c) {
			c = E._gfp_p_;
			if ("boolean" !== typeof c) throw Error("Illegal value of _gfp_p_: " + c);
			if (!c) {
				if (J(225)) {
					c = J(226);
					var d = new Pj(c);
					navigator.cookieEnabled && (E._gfp_s_ = uf(629, function (e) {
						delete E._gfp_s_;
						if (!e) throw Error("Invalid JSONP response");
						if (e = e._cookies_) {
							var f = e[0];
							if (!f) throw Error("Invalid JSONP response");
							e = f._value_;
							var g = f._expires_,
								h = f._path_;
							f = f._domain_;
							if ("string" !== typeof e || "number" !== typeof g || "string" !== typeof h || "string" !== typeof f) throw Error("Invalid JSONP response");
							d.write(Ub(Tb(Sb(Rb(e), g), h), f))
						}
					}), ic(E.document, b({
						domain: E.location.hostname,
						ab: a,
						$a: c,
						value: Qj(d)
					})))
				}
				E._gfp_p_ = !0
			}
		}
	};

	function nk(a, b) {
		a = a.attributes;
		for (var c = a.length, d = 0; d < c; d++) {
			var e = a[d];
			if (/data-/.test(e.name)) {
				var f = ab(e.name.replace("data-matched-content", "google_content_recommendation").replace("data", "google").replace(/-/g, "_"));
				if (!b.hasOwnProperty(f)) {
					e = e.value;
					var g = {};
					g = (g.google_reactive_ad_format = Hc, g.google_allow_expandable_ads = wc, g);
					e = g.hasOwnProperty(f) ? g[f](e, null) : e;
					null !== e && (b[f] = e)
				}
			}
		}
	}

	function ok(a) {
		if (a = Rd(a)) switch (a.data && a.data.autoFormat) {
		case "rspv":
			return 13;
		case "mcrspv":
			return 15;
		default:
			return 14
		} else return 12
	}

	function pk(a, b, c) {
		nk(a, b);
		if (c.document && c.document.body && !vj(c, b) && !b.google_reactive_ad_format) {
			var d = parseInt(a.style.width, 10),
				e = Hj(a, c);
			if (0 < e && d > e) {
				var f = parseInt(a.style.height, 10);
				d = !!Wb[d + "x" + f];
				var g = e;
				if (d) {
					var h = Xb(e, f);
					if (h) g = h, b.google_ad_format = h + "x" + f + "_0ads_al";
					else throw new O("No slot size for availableWidth=" + e);
				}
				b.google_ad_resize = !0;
				b.google_ad_width = g;
				d || (b.google_ad_format = null, b.google_override_format = !0);
				e = g;
				a.style.width = e + "px";
				f = jj(e, "auto", c, a, b);
				g = e;
				f.a.ba(c, b, a);
				Mi(f, g, b);
				f = f.a;
				b.google_responsive_formats = null;
				f.minWidth() > e && !d && (b.google_ad_width = f.minWidth(), a.style.width = f.minWidth() + "px")
			}
		}
		d = a.offsetWidth || R(a, c, "width", G) || b.google_ad_width || 0;
		e = Ga(jj, d, "auto", c, a, b, !1, !0);
		f = de(c) || c;
		g = b.google_ad_client;
		f = f.location && "#ftptohbh" === f.location.hash ? 2 : sh(f.location, "google_responsive_slot_debug") || sh(f.location, "google_responsive_slot_preview") || J(217) ? 1 : J(218) ? 2 : Ah(f, 1, g) ? 1 : 0;
		if (g = 0 !== f) b: if (!(488 > P(c) || J(216)) || b.google_reactive_ad_format || vj(c, b) || bg(a, b)) g = !1;
			else {
				for (g = a; g; g = g.parentElement) {
					h = jc(g, c);
					if (!h) {
						b.gfwrnwer = 18;
						g = !1;
						break b
					}
					if (!Pa(["static", "relative"], h.position)) {
						b.gfwrnwer = 17;
						g = !1;
						break b
					}
				}
				if (!J(216) && (g = gg(c, a, d, .3, b), !0 !== g)) {
					b.gfwrnwer = g;
					g = !1;
					break b
				}
				g = ce(c) == c ? !0 : !1
			}
		g ? (b.google_resizing_allowed = !0, b.ovlp = !0, 2 === f ? (f = {}, Mi(e(), d, f), b.google_resizing_width = f.google_ad_width, b.google_resizing_height = f.google_ad_height, f.ds && (b.ds = f.ds), b.iaaso = !1) : (b.google_ad_format = "auto", b.iaaso = !0, b.armr = 1), d = !0) : d = !1;
		if (e = vj(c, b)) xj(e, a, b, c, d);
		else {
			if (bg(a, b)) {
				if (d = jc(a, c)) a.style.width = d.width, a.style.height = d.height, ag(d, b);
				b.google_ad_width || (b.google_ad_width = a.offsetWidth);
				b.google_ad_height || (b.google_ad_height = a.offsetHeight);
				b.google_loader_features_used = 256;
				b.google_responsive_auto_format = ok(c)
			} else ag(a.style, b);
			c.location && "#gfwmrp" == c.location.hash || 12 == b.google_responsive_auto_format && "true" == b.google_full_width_responsive && !ee(c, Nh.s) ? xj(10, a, b, c, !1) : ee(c, Oh.s) && 12 == b.google_responsive_auto_format && (a = hg(a.offsetWidth || parseInt(a.style.width, 10) || b.google_ad_width, c, a, b), !0 !== a ? (b.efwr = !1, b.gfwrnwer = a) : b.efwr = !0)
		}
	};

	function qk(a, b, c) {
		var d = window;
		return function () {
			var e = Xe(),
				f = 3;
			try {
				var g = b.apply(this, arguments)
			} catch (h) {
				f = 13;
				if (c) return c(a, h), g;
				throw h;
			} finally {
				d.google_measure_js_timing && e && (e = {
					label: a.toString(),
					value: e,
					duration: (Xe() || 0) - e,
					type: f
				}, f = d.google_js_reporting_queue = d.google_js_reporting_queue || [], 2048 > f.length && f.push(e))
			}
			return g
		}
	}

	function rk(a, b) {
		return qk(a, b, function (c, d) {
			(new jf).J(c, d)
		})
	};

	function Z(a, b) {
		return null == b ? "&" + a + "=null" : "&" + a + "=" + Math.floor(b)
	}

	function sk() {
		var a = this;
		this.I = this.$ = this.o = this.j = this.f = 0;
		this.K = !1;
		this.A = this.g = this.c = 0;
		this.L = .1 > Math.random();
		this.P = p === p.top;
		var b = document.querySelector("[data-google-query-id]");
		if (this.a = b ? b.getAttribute("data-google-query-id") : null) b = null;
		else {
			if ("number" !== typeof p.goog_pvsid) try {
				Object.defineProperty(p, "goog_pvsid", {
					value: Math.floor(Math.random() * Math.pow(2, 52))
				})
			} catch (c) {}
			b = Number(p.goog_pvsid) || -1
		}
		this.T = b;
		this.L && (b = "https://pagead2.googlesyndication.com/pagead/gen_204?id=plmetrics" + (this.a ? "&qqid=" + encodeURIComponent(this.a) : Z("pvsid", this.T)), b += Z("test", 1), b += "&top=" + (this.P ? 1 : 0), tk(b));
		this.aa = new PerformanceObserver(rk(640, function (c) {
			c = fa(c.getEntries());
			for (var d = c.next(); !d.done; d = c.next()) {
				d = d.value;
				if ("layout-shift" === d.entryType) {
					var e = d;
					e.hadRecentInput || J(241) && !(.01 < e.value) || (a.f += Number(e.value), Number(e.value) > a.j && (a.j = Number(e.value)), a.o += 1)
				}
				"largest-contentful-paint" === d.entryType && (e = d, a.$ = Math.floor(e.renderTime || e.loadTime));
				"first-input" === d.entryType && (e = d, a.I = Number((e.processingStart - e.startTime).toFixed(3)), a.K = !0);
				"longtask" === d.entryType && (a.c += d.duration, d.duration > a.g && (a.g = d.duration), a.A += 1)
			}
		}));
		this.U = !1;
		this.b = rk(641, this.b.bind(this))
	}
	oa(sk, Qd);
	sk.prototype.b = function () {
		var a = document;
		if (2 === ({
			visible: 1,
			hidden: 2,
			prerender: 3,
			preview: 4,
			unloaded: 5
		}[a.visibilityState || a.webkitVisibilityState || a.mozVisibilityState || ""] || 0) && !this.U) {
			this.U = !0;
			this.aa.takeRecords();
			a = "https://pagead2.googlesyndication.com/pagead/gen_204?id=plmetrics";
			window.LayoutShift && (a += "&cls=" + this.f.toFixed(3), a += "&mls=" + this.j.toFixed(3), a += Z("nls", this.o));
			window.LargestContentfulPaint && (a += Z("lcp", this.$));
			window.PerformanceEventTiming && this.K && (a += Z("fid", this.I));
			window.PerformanceLongTaskTiming && (a += Z("cbt", this.c), a += Z("mbt", this.g), a += Z("nlt", this.A));
			for (var b = 0, c = fa(document.getElementsByTagName("iframe")), d = c.next(); !d.done; d = c.next())
				if (d = d.value, d.id.includes("google_ads_iframe_") || d.id.includes("aswift")) b += 1;
			a += Z("nif", b);
			a += Z("ifi", Xd(window));
			b = Hh.h().a();
			a += "&eid=" + encodeURIComponent(b.join());
			this.L && (a += Z("test", 1));
			a += "&top=" + (this.P ? 1 : 0);
			a += this.a ? "&qqid=" + encodeURIComponent(this.a) : Z("pvsid", this.T);
			tk(a)
		}
	};

	function tk(a) {
		window.fetch(a, {
			keepalive: !0,
			credentials: "include",
			redirect: "follow",
			method: "get",
			mode: "no-cors"
		})
	};
	var uk = ["https://www.google.com"],
		vk = void 0;

	function wk(a) {
		this.c = uk;
		this.a = 2;
		this.b = a
	}
	oa(wk, Qd);

	function xk(a) {
		null === a.b || 3 <= a.a || (a.a = 3, Ja(a.c, function (b) {
			a.b.fetch(b + "/.well-known/trust-token", {
				keepalive: !0,
				redirect: "follow",
				method: "get",
				fb: {
					type: "srr-token-redemption",
					issuer: b,
					refreshPolicy: "none"
				}
			}).then(function (c) {
				if (!c.ok) throw Error(c.status + ": Network response was not ok!");
				a.a = 5
			}).catch(function (c) {
				c && "NoModificationAllowedError" === c.name ? a.a = 5 : 4 > a.a && (a.a = 4)
			})
		}))
	};

	function yk(a) {
		return be.test(a.className) && "done" != a.getAttribute("data-adsbygoogle-status")
	}

	function zk(a, b) {
		a.setAttribute("data-adsbygoogle-status", "done");
		Ak(a, b)
	}

	function Ak(a, b) {
		var c = window,
			d = ae();
		d.google_spfd || (d.google_spfd = pk);
		(d = b.google_reactive_ads_config) || pk(a, b, c);
		if (!Bk(a, b, c)) {
			d || (c.google_lpabyc = Xh(c, a));
			if (d) {
				d = d.page_level_pubvars || {};
				if (K(E).page_contains_reactive_tag && !K(E).allow_second_reactive_tag) {
					if (d.pltais) {
						ge(!1);
						return
					}
					throw new O("Only one 'enable_page_level_ads' allowed per page.");
				}
				K(E).page_contains_reactive_tag = !0;
				ge(7 === d.google_pgb_reactive)
			} else Wd(c);
			Ud(Nj, function (e, f) {
				b[f] = b[f] || c[f]
			});
			b.google_loader_used = "aa";
			b.google_reactive_tag_first = 1 === (K(E).first_tag_on_page || 0);
			tf(164, function () {
				hk(c, b, a)
			})
		}
	}

	function Bk(a, b, c) {
		var d = b.google_reactive_ads_config;
		if (d) {
			var e = d.page_level_pubvars;
			var f = (za(e) ? e : {}).google_tag_origin
		}
		e = "string" === typeof a.className && /(\W|^)adsbygoogle-noablate(\W|$)/.test(a.className);
		var g = b.google_ad_slot;
		var h = f || b.google_tag_origin;
		f = K(c);
		he(f.ad_whitelist || [], g, h) ? g = null : (h = f.space_collapsing || "none", g = (g = he(f.ad_blacklist || [], g)) ? {
			pa: !0,
			Ea: g.space_collapsing || h
		} : f.remove_ads_by_default ? {
			pa: !0,
			Ea: h,
			ha: f.ablation_viewport_offset
		} : null);
		if (g && g.pa && "on" != b.google_adtest && !e && (e = tg(a, c), !g.ha || g.ha && (e || 0) >= g.ha)) return a.className += " adsbygoogle-ablated-ad-slot", c = c.google_sv_map = c.google_sv_map || {}, d = Aa(a), c[b.google_element_uid] = b, a.setAttribute("google_element_uid", d), "slot" == g.Ea && (null !== vc(a.getAttribute("width")) && a.setAttribute("width", 0), null !== vc(a.getAttribute("height")) && a.setAttribute("height", 0), a.style.width = "0px", a.style.height = "0px"), !0;
		if ((e = jc(a, c)) && "none" == e.display && !("on" == b.google_adtest || 0 < b.google_reactive_ad_format || d)) return c.document.createComment && a.appendChild(c.document.createComment("No ad requested because of display:none on the adsbygoogle tag")), !0;
		a = null == b.google_pgb_reactive || 3 === b.google_pgb_reactive;
		return 1 !== b.google_reactive_ad_format && 8 !== b.google_reactive_ad_format || !a ? !1 : (p.console && p.console.warn("Adsbygoogle tag with data-reactive-ad-format=" + b.google_reactive_ad_format + " is deprecated. Check out page-level ads at https://www.google.com/adsense"), !0)
	}

	function Ck(a) {
		var b = document.getElementsByTagName("INS");
		for (var c = 0, d = b[c]; c < b.length; d = b[++c]) {
			var e = d;
			if (yk(e) && "reserved" != e.getAttribute("data-adsbygoogle-status") && (!a || d.id == a)) return d
		}
		return null
	}

	function Dk() {
		var a = $b(document, "INS");
		a.className = "adsbygoogle";
		a.className += " adsbygoogle-noablate";
		zc(a);
		return a
	}

	function Ek(a) {
		var b = {};
		Ud(Wf, function (e, f) {
			!1 === a.enable_page_level_ads ? b[f] = !1 : a.hasOwnProperty(f) && (b[f] = a[f])
		});
		za(a.enable_page_level_ads) && (b.page_level_pubvars = a.enable_page_level_ads);
		var c = Dk();
		Vb.body.appendChild(c);
		var d = {};
		d = (d.google_reactive_ads_config = b, d.google_ad_client = a.google_ad_client, d);
		d.google_pause_ad_requests = K(E).pause_ad_requests || !1;
		zk(c, d)
	}

	function Fk(a) {
		function b() {
			return Ek(a)
		}
		var c = void 0 === c ? Vb : c;
		var d = de(window);
		if (!d) throw new O("Page-level tag does not work inside iframes.");
		Zf(d).wasPlaTagProcessed = !0;
		if (c.body || "complete" == c.readyState || "interactive" == c.readyState) b();
		else {
			var e = Sa(uf(191, b));
			Zb(c, "DOMContentLoaded", e);
			(new p.MutationObserver(function (f, g) {
				c.body && (e(), g.disconnect())
			})).observe(c, {
				childList: !0,
				subtree: !0
			})
		}
	}

	function Gk(a) {
		var b = {};
		tf(165, function () {
			Hk(a, b)
		}, function (c) {
			c.client = c.client || b.google_ad_client || a.google_ad_client;
			c.slotname = c.slotname || b.google_ad_slot;
			c.tag_origin = c.tag_origin || b.google_tag_origin
		})
	}

	function Ik(a) {
		delete a.google_checked_head;
		F(a, function (b, c) {
			je[c] || (delete a[c], b = c.replace("google", "data").replace(/_/g, "-"), p.console.warn("AdSense head tag doesn't support " + b + " attribute."))
		})
	}

	function Hk(a, b) {
		if (null == a) throw new O("push() called with no parameters.");
		Ia = (new Date).getTime();
		ak();
		a: {
			if (void 0 != a.enable_page_level_ads) {
				if ("string" === typeof a.google_ad_client) {
					var c = !0;
					break a
				}
				throw new O("'google_ad_client' is missing from the tag config.");
			}
			c = !1
		}
		if (c) Jk(a, b);
		else if ((c = a.params) && Ud(c, function (e, f) {
			b[f] = e
		}), "js" === b.google_ad_output) console.warn("Ads with google_ad_output='js' have been deprecated and no longer work. Contact your AdSense account manager or switch to standard AdSense ads.");
		else {
			a = Kk(a.element);
			nk(a, b);
			c = K(p).head_tag_slot_vars || {};
			F(c, function (e, f) {
				b.hasOwnProperty(f) || (b[f] = e)
			});
			if (a.hasAttribute("data-require-head") && !K(p).head_tag_slot_vars) throw new O("AdSense head tag is missing. AdSense body tags don't work without the head tag. You can copy the head tag from your account on https://adsense.com.");
			if (!b.google_ad_client) throw new O("Ad client is missing from the slot.");
			b.google_apsail = Eh(b.google_ad_client);
			var d = (c = 0 === (K(E).first_tag_on_page || 0) && Vh(b)) && Wh(c);
			c && !d && (Jk(c), K(E).skip_next_reactive_tag = !0);
			0 === (K(E).first_tag_on_page || 0) && (K(E).first_tag_on_page = 2);
			"_gfp_p_" in E || (E._gfp_p_ = !1);
			mk(b.google_ad_client);
			b.google_pause_ad_requests = K(E).pause_ad_requests || !1;
			zk(a, b);
			c && d && Lk(c)
		}
	}

	function Lk(a) {
		Ec(function () {
			Zf(p).wasPlaTagProcessed || p.adsbygoogle && p.adsbygoogle.push(a)
		})
	}

	function Jk(a, b) {
		if (K(E).skip_next_reactive_tag) K(E).skip_next_reactive_tag = !1;
		else {
			0 === (K(E).first_tag_on_page || 0) && (K(E).first_tag_on_page = 1);
			b && a.tag_partner && (fe(p, a.tag_partner), fe(b, a.tag_partner));
			a: if (!K(E).ama_ran_on_page) {
				if (J(316)) var c = null;
				else try {
					c = p.localStorage.getItem("google_ama_config")
				} catch (q) {
					c = null
				}
				try {
					var d = c ? new we(c ? JSON.parse(c) : null) : null
				} catch (q) {
					d = null
				}
				if (b = d)
					if (c = B(b, ye, 3), !c || z(c, 1) <= Date.now()) try {
						p.localStorage.removeItem("google_ama_config")
					} catch (q) {
						Df(p, {
							lserr: 1
						})
					} else {
						if (Wh(a) && (c = Fe(C(b, ze, 7)), !c || !Jb(c, 8))) break a;
						K(E).ama_ran_on_page = !0;
						(d = B(b, Ce, 13)) && 1 === z(d, 1) && (c = 0, (d = B(d, De, 6)) && z(d, 3) && (c = z(d, 3) || 0), d = K(p), d.remove_ads_by_default = !0, d.space_collapsing = "slot", d.ablation_viewport_offset = c);
						Kf(3, [b.a]);
						c = a.google_ad_client;
						d = yf(Af, new xf(null, Ef(za(a.enable_page_level_ads) ? a.enable_page_level_ads : {})));
						try {
							var e = Fe(C(b, ze, 7)),
								f;
							if (f = e) b: {
								var g = z(e, 2);
								if (g)
									for (var h = 0; h < g.length; h++)
										if (1 == g[h]) {
											f = !0;
											break b
										}
								f = !1
							}
							if (f) {
								if (z(e, 4)) {
									f = {};
									var k = new xf(null, (f.google_package = z(e, 4), f));
									d = yf(d, k)
								}
								var m = new ch(c, b, e, d),
									n = new ih;
								(new nh(m, n)).start();
								n.b.then(Ga(ph, p), Ga(qh, p))
							}
						} catch (q) {
							Df(p, {
								atf: -1
							})
						}
					}
			}
			Fk(a)
		}
	}

	function Kk(a) {
		if (a) {
			if (!yk(a) && (a.id ? a = Ck(a.id) : a = null, !a)) throw new O("'element' has already been filled.");
			if (!("innerHTML" in a)) throw new O("'element' is not a good DOM element.");
		} else if (a = Ck(), !a) throw new O("All ins elements in the DOM with class=adsbygoogle already have ads in them.");
		return a
	}

	function Mk() {
		qf();
		kf.Ba(wf);
		tf(166, Nk)
	}

	function Nk() {
		var a = Sd(Rd(E)) || E,
			b = K(a);
		if (b.plle) Ci(ci(a), 1);
		else {
			b.plle = !0;
			var c = Di(a);
			null == rc(c, "goog_pem_mod") && sc(a, c, "goog_pem_mod");
			c = [null, null];
			try {
				var d = JSON.parse("[[[259,null,null,[1]],[225,null,null,[1]],[289,null,null,[1]],[209,null,null,[1]],[205,null,null,[1]],[null,29,null,[null,2]],[null,30,null,[null,3]],[270,null,null,[1]],[210,null,null,[1]],[211,null,null,[1]],[284,null,null,[1]],[207,null,null,[1]],[215,null,null,[1]],[230,null,null,[1]],[191,null,null,[1]],[null,null,null,[null,null,null,[\x22facebook[.]com\x22,\x22whatsapp[.]com\x22,\x22youtube[.]com\x22,\x22google[.]com\x22,\x22\\\\/ads?\\\\/\x22]],null,9]],[[10,[[1,[[21066108],[21066109,[[316,null,null,[1]]]]],null,null,null,34,18,1],[1,[[21066110],[21066111,[[316,null,null,[1]]]]],null,null,null,34,18,1],[100,[[42530451],[42530452,[[324,null,null,[1]]]]],null,null,null,41,20,1],[100,[[42530453],[42530454,[[324,null,null,[1]]]]],null,null,null,41,20,1],[3,[[44717727],[44717728],[44717729],[44717730],[44719983],[44719984]]],[1,[[44719906,null,[1,[[12,null,null,null,2,null,\x22\\\\.wiki(dogs|how)(-fun)?\\\\.\x22]]]],[44719907,[[190,null,null,[1]]],[1,[[12,null,null,null,2,null,\x22\\\\.wiki(dogs|how)(-fun)?\\\\.\x22]]]]]],[1,[[21065070],[21065071],[21065072,[[243,null,null,[1]]]],[21065073,[[243,null,null,[1]]]]]],[50,[[21065531],[21065532]],null,null,null,13,null,300],[null,[[44720483],[44720484,[[289,null,null,[]]]]],null,null,null,13,null,200],[1000,[[21066085,[[266,null,null,[1]]],[1,[[12,null,null,null,2,null,\x22\\\\.wiki(dogs|how)(-fun)?\\\\.\x22]]]]]],[50,[[21066124,[[190,null,null,[1]]],[1,[[12,null,null,null,2,null,\x22\\\\.wiki(dogs|how)(-fun)?\\\\.\x22]]]],[21066125,[[265,null,null,[1]],[260,null,null,[1]],[190,null,null,[1]]],[1,[[12,null,null,null,2,null,\x22\\\\.wiki(dogs|how)(-fun)?\\\\.\x22]]]]],null,null,null,40,null,1],[150,[[21066141,null,[2,[[1,[[12,null,null,null,2,null,\x22\\\\.wiki(dogs|how)(-fun)?\\\\.\x22]]],[6,null,null,3,null,2]]]],[21066142,[[233,null,null,[1]],[232,null,null,[1]]],[2,[[1,[[12,null,null,null,2,null,\x22\\\\.wiki(dogs|how)(-fun)?\\\\.\x22]]],[6,null,null,3,null,2]]]]],null,null,null,42,null,1],[20,[[182982000,[[218,null,null,[1]]],[1,[[12,null,null,null,2,null,\x22\\\\.wiki(dogs|how)(-fun)?\\\\.\x22]]]],[182982100,[[217,null,null,[1]]],[1,[[12,null,null,null,2,null,\x22\\\\.wiki(dogs|how)(-fun)?\\\\.\x22]]]]],null,null,null,36,8,1],[20,[[182982200,null,[1,[[12,null,null,null,2,null,\x22\\\\.wiki(dogs|how)(-fun)?\\\\.\x22]]]],[182982300,null,[1,[[12,null,null,null,2,null,\x22\\\\.wiki(dogs|how)(-fun)?\\\\.\x22]]]]],null,null,null,36,8,1],[10,[[182984000,null,[4,null,23,null,null,null,null,[\x221\x22]]],[182984100,[[218,null,null,[1]]],[4,null,23,null,null,null,null,[\x221\x22]]]],null,null,null,37,10,1],[10,[[182984200,null,[4,null,23,null,null,null,null,[\x221\x22]]],[182984300,null,[4,null,23,null,null,null,null,[\x221\x22]]]],null,null,null,37,10,1],[10,[[21066004],[21066005,[[325,null,null,[1]]]]],null,23],[null,[[21066126,[[290,null,null,[1]],[190,null,null,[1]]]],[21066127,[[290,null,null,[1]],[190,null,null,[1]]]]],null,null,null,38,null,1],[1,[[21066167],[21066168,[[279,null,null,[1]]]]]],[1,[[21066175],[21066176],[21066177],[21066178]],null,null,null,44,22],[1,[[21066179],[21066180]],null,null,null,44,null,500]]],[13,[[500,[[21065350],[21065351]],[2,[[3,[[4,null,6,null,null,null,null,[\x2221061508\x22]],[4,null,6,null,null,null,null,[\x2221060549\x22]]]],[4,null,9,null,null,null,null,[\x22ReportingObserver\x22]]]]],[100,[[21065726,null,[4,null,6,null,null,null,null,[\x2221065725\x22]]],[21065727,[[240,null,null,[1]]],[4,null,6,null,null,null,null,[\x2221065725\x22]]],[21065728,[[241,null,null,[1]]],[4,null,6,null,null,null,null,[\x2221065725\x22]]]],[4,null,9,null,null,null,null,[\x22LayoutShift\x22]]]]],[12,[[20,[[21065724],[21065725,[[203,null,null,[1]]]]],[4,null,9,null,null,null,null,[\x22LayoutShift\x22]]],[1,[[21065755],[21065756,[[312,null,null,[1]]]]],null,21],[1,[[21065757],[21065758,[[312,null,null,[1]]]]],[4,null,9,null,null,null,null,[\x22hasTrustToken\x22]],21],[1,[[21065784]]],[1,[[21065785,null,[4,null,8,null,null,null,null,[\x22navigator.connection.saveData\x22]]]]],[1,[[21065786,null,[4,null,27,null,null,null,null,[\x22navigator.connection.saveData\x22]]]]],[1,[[21065787,null,[1,[[4,null,27,null,null,null,null,[\x22navigator.connection.saveData\x22]]]]]]]]]]]")
			} catch (m) {
				d = c
			}
			Kf(13, [d]);
			Bi(new ji(d), ai.h(), {
				ta: Th(a),
				Ma: Lc
			}, ci(a));
			Hh.h().b(12);
			Hh.h().b(10);
			b.eids = La(Hh.h().a(), String).concat(b.eids || []);
			b = b.eids;
			vh || (vh = new wh);
			var e = vh;
			Oc = !0;
			var f;
			d = Nh;
			var g = Fi(a, Gc(e.a[136]), [d.i, d.s]);
			S(b, g);
			Ch(a, 12) && (d = Kh, c = Jh, g = Gi(a, new Zh(0), Gc(e.a[149]), Gc(e.a[150]), [d.i, d.s], 4), S(b, g), g == d.i ? f = c.i : g == d.s ? f = c.s : f = "", S(b, f));
			d = Mh;
			g = Gi(a, bi, Gc(e.a[179]), Gc(e.a[180]), [d.i, d.V]);
			S(b, g);
			c = Lh;
			g == d.i ? f = c.i : g == d.V ? f = c.V : f = "";
			S(b, f);
			ab("") && S(b, "");
			d = Ph;
			g = Fi(a, Gc(e.a[13]), [d.w, d.i]);
			S(b, g);
			g = Fi(a, 0, [d.oa]);
			S(b, g);
			d = Qh;
			g = Fi(a, Gc(e.a[60]), [d.w, d.i]);
			S(b, g);
			g == Qh.w && (d = Rh, g = Fi(a, Gc(e.a[66]), [d.w, d.i]), S(b, g), d = Sh, g = Fi(a, Gc(e.a[137]), [d.w, d.i]), S(b, g));
			d = Oh;
			g = Fi(a, Gc(e.a[98]), [d.i, d.s]);
			S(b, g);
			a = de(a) || a;
			sh(a.location, "google_mc_lab") && S(b, "242104166")
		} if (!t("Trident") && !t("MSIE") || 0 <= ib(ub(), 11)) {
			a = ee(E, Rh.w) || ee(E, Ph.w) || ee(E, Ph.oa);
			lf(a);
			Wj();
			Tj(".google.co.in") && (Y[1] = ".google.co.in");
			Yj();
			J(312) && (void 0 === vk && (document.hasTrustToken ? vk = new wk(E) : vk = null), a = vk, a && xk(a));
			E.PerformanceObserver && J(203) && !window.google_plmetrics && (a = new sk, a.aa.observe({
				entryTypes: ["layout-shift", "largest-contentful-paint", "first-input", "longtask"],
				buffered: !J(240)
			}), document.addEventListener("unload", a.b), document.addEventListener("visibilitychange", a.b), window.google_plmetrics = !0);
			if (a = de(p)) a = Zf(a), a.tagSpecificState[1] || (a.tagSpecificState[1] = new rh);
			if (b = E.document.querySelector('script[src*="/pagead/js/adsbygoogle.js"][data-ad-client]:not([data-checked-head])')) {
				b.setAttribute("data-checked-head", "true");
				f = K(window);
				if (f.head_tag_slot_vars) throw new O("Only one AdSense head tag supported per page. The second tag is ignored.");
				a = {};
				nk(b, a);
				Ik(a);
				b = {};
				for (var h in a) b[h] = a[h];
				f.head_tag_slot_vars = b;
				h = {};
				h = (h.google_ad_client = a.google_ad_client, h.enable_page_level_ads = a, h);
				E.adsbygoogle || (E.adsbygoogle = []);
				a = E.adsbygoogle;
				a.loaded ? a.push(h) : a.splice(0, 0, h)
			}
			h = window.adsbygoogle;
			if (!h || !h.loaded) {
				a = {
					push: Gk,
					loaded: !0
				};
				try {
					Object.defineProperty(a, "requestNonPersonalizedAds", {
						set: Ok
					}), Object.defineProperty(a, "pauseAdRequests", {
						set: Pk
					}), Object.defineProperty(a, "cookieOptions", {
						set: Qk
					}), Object.defineProperty(a, "onload", {
						set: Rk
					})
				} catch (m) {}
				if (h)
					for (f = fa(["requestNonPersonalizedAds", "pauseAdRequests", "cookieOptions"]), b = f.next(); !b.done; b = f.next()) b = b.value, void 0 !== h[b] && (a[b] = h[b]);
				"_gfp_a_" in window || (window._gfp_a_ = kk);
				if (h && h.shift) try {
					var k;
					for (f = 20; 0 < h.length && (k = h.shift()) && 0 < f;) Gk(k), --f
				} catch (m) {
					throw window.setTimeout(Mk, 0), m;
				}
				window.adsbygoogle = a;
				h && (a.onload = h.onload)
			}
		}
	}

	function Ok(a) {
		if (+a) {
			if ((a = hc()) && a.frames && !a.frames.GoogleSetNPA) try {
				var b = a.document,
					c = new ac(b),
					d = b.body || b.head && b.head.parentElement;
				if (d) {
					var e = $b(c.a, "IFRAME");
					e.name = "GoogleSetNPA";
					e.id = "GoogleSetNPA";
					e.setAttribute("style", "display:none;position:fixed;left:-999px;top:-999px;width:0px;height:0px;");
					d.appendChild(e)
				}
			} catch (f) {}
		} else(b = hc().document.getElementById("GoogleSetNPA")) && b.parentNode && b.parentNode.removeChild(b)
	}

	function Pk(a) {
		+a ? K(E).pause_ad_requests = !0 : (K(E).pause_ad_requests = !1, a = function () {
			if (!K(E).pause_ad_requests) {
				var b = ae(),
					c = ae();
				try {
					if (Vb.createEvent) {
						var d = Vb.createEvent("CustomEvent");
						d.initCustomEvent("adsbygoogle-pub-unpause-ad-requests-event", !1, !1, "");
						b.dispatchEvent(d)
					} else if (Vd(c.CustomEvent)) {
						var e = new c.CustomEvent("adsbygoogle-pub-unpause-ad-requests-event", {
							bubbles: !1,
							cancelable: !1,
							detail: ""
						});
						b.dispatchEvent(e)
					} else if (Vd(c.Event)) {
						var f = new Event("adsbygoogle-pub-unpause-ad-requests-event", {
							bubbles: !1,
							cancelable: !1
						});
						b.dispatchEvent(f)
					}
				} catch (g) {}
			}
		}, p.setTimeout(a, 0), p.setTimeout(a, 1E3))
	}

	function Qk(a) {
		switch (a) {
		case 0:
			a = !0;
			break;
		case 1:
			a = !1;
			break;
		case 2:
			a = kk;
			break;
		default:
			throw Error("Illegal value of cookieOptions: " + a);
		}
		E._gfp_a_ = a;
		"_gfp_p_" in E && (a = E.google_sv_map, mk(a[oc(a)].google_ad_client))
	}

	function Rk(a) {
		Vd(a) && window.setTimeout(a, 0)
	};
	Mk();
}).call(this);