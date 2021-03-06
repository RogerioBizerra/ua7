        ! function(t) {
            function e(i) {
                if (n[i]) return n[i].exports;
                var r = n[i] = {
                    exports: {},
                    id: i,
                    loaded: !1
                };
                return t[i].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
            }
            var n = {};
            return e.m = t, e.c = n, e.p = "https://open.scdn.co/static/", e(0)
        }([function(t, e, n) {
            n(10), window.Spotify = window.Spotify || {}, Spotify.GAEvents = n(12)("SPB"), Spotify.GAEvents.loadPage();
            var i = n(15),
                r = n(6),
                o = n(13);
            Spotify.Env = new o(window.SpotifyEnvironment);
            var s = n(26),
                a = n(2),
                u = n(1),
                c = n(4),
                l = n(14),
                p = n(16),
                f = document.getElementById("config") || {
                    getAttribute: function() {
                        return ""
                    }
                },
                h = i(location.search),
                _ = {
                    uri: f.getAttribute("data-uri"),
                    context: f.getAttribute("data-context"),
                    previewUrl: f.getAttribute("data-preview"),
                    launchURI: f.getAttribute("data-context")
                },
                d = "is_spotified";
            s.init("click", h.view), s.adjustToViewport(), window.addEventListener("resize", function() {
                s.adjustToViewport()
            }), l.init();
            var v = null,
                y = !1;
            p(Spotify.Env).then(function(t) {
                v = t;
                var e = null;
                l.setPlayerType(t.getType()), a.subscribe(u.USER.PLAY_REQUEST, function(e) {
                    if ("preview" !== t.getType() || _.previewUrl) {
                        if (e) {
                            var n = _.context.indexOf("artist") > 0 ? e.uri : _.context;
                            t.load(e.uri, n, e.preview, e.webPlayerUrl)
                        }
                        t.playPause()
                    } else a.publish(u.MAIN.UNAVAILABLE_TRACK)
                }), a.subscribe(u.USER.CHANGE_POSITION_REQUEST, function(t) {
                    v.seek(t)
                }), a.subscribe(u.USER.SKIP_PREV_REQUEST, function() {
                    var n, i = t.getPosition();
                    if (n = i <= 2500 && e.position > 1 ? c.getTrackInformationFromPosition(+e.position - 1) : e, "preview" !== t.getType() || n.preview) {
                        var r = t.isPlaying(),
                            o = _.context.indexOf("artist") > 0 ? n.uri : _.context;
                        t.load(n.uri, o, n.preview, n.webPlayerUrl), a.publish(u.MAIN.LOAD, n), e = n, r && t.playPause()
                    } else a.publish(u.MAIN.UNAVAILABLE_TRACK)
                }), a.subscribe(u.USER.SKIP_NEXT_REQUEST, function() {
                    if (e || (e = c.getTrackInformationFromPosition(1)), e && e.position < c.getLength()) {
                        var n = c.getTrackInformationFromPosition(+e.position + 1);
                        if ("preview" !== t.getType() || n.preview) {
                            var i = t.isPlaying(),
                                r = _.context.indexOf("artist") > 0 ? n.uri : _.context;
                            t.load(n.uri, r, n.preview, n.webPlayerUrl), e = n, i && t.playPause()
                        } else a.publish(u.MAIN.UNAVAILABLE_TRACK)
                    }
                }), a.subscribe(u.USER.DOWNLOAD_REQUEST, function() {
                    r.deleteCookie(d, "/", Spotify.Env.topDomain)
                }), a.subscribe(u.PLAYER.PAUSE, function(t) {
                    var e = c.getTrackInformation(t);
                    a.publish(u.MAIN.PAUSE, e)
                }), a.subscribe(u.PLAYER.PROGRESS, function(t, e, n) {
                    a.publish(u.MAIN.PROGRESS, t, e, n), "preview" === v.getType() && e > 10 && !y ? (a.publish(u.MAIN.UPSELL, t), y = !0) : e > 99 && (y = !1)
                }), a.subscribe(u.USER.OPEN_CLIENT_REQUEST, function() {
                    v.pause(), r.setCookie(d, "yes", "/", Spotify.Env.topDomain), window.top.location = _.launchURI
                }), a.subscribe(u.USER.OPEN_WP_REQUEST, function() {
                    v.pause(), r.deleteCookie(d, "/", Spotify.Env.topDomain)
                }), a.subscribe(u.PLAYER.PLAY, function(t) {
                    e = c.getTrackInformation(t), e && a.publish(u.MAIN.PLAY, e)
                }), a.subscribe(u.PLAYER.LOAD, function(t) {
                    e = c.getTrackInformation(t), e && a.publish(u.MAIN.LOAD, e)
                });
                var n = _.context.indexOf("artist") > 0 ? _.uri : _.context;
                t.load(_.uri, n, _.previewUrl, Spotify.Env.webPlayerUrl), "ontouchstart" in document.documentElement || document.documentElement.classList.add("no-touch")
            })
        }, function(t, e) {
            t.exports = {
                USER: {
                    CHANGE_POSITION_REQUEST: "user:change-position-request",
                    DOWNLOAD_REQUEST: "user:download-request",
                    GET_LINK_REQUEST: "user:get-link-request",
                    OPEN_CLIENT_REQUEST: "user:open-client-request",
                    OPEN_WP_REQUEST: "user:open-wp-request",
                    PLAY_REQUEST: "user:play-request",
                    SKIP_PREV_REQUEST: "user:skip-prev-request",
                    SKIP_NEXT_REQUEST: "user:skip-next-request"
                },
                MAIN: {
                    LOAD: "main:load",
                    PAUSE: "main:pause",
                    PLAY: "main:play",
                    END: "main:end",
                    PROGRESS: "main:progress",
                    REMOTE_CONTROL_CONNECTED: "main:remote-control-connnected",
                    UNAVAILABLE_TRACK: "main:unavailable-track",
                    UPSELL: "main:upsell",
                    DISMISS_UPSELL: "main:dismiss-upsell"
                },
                PLAYER: {
                    LOAD: "player:load",
                    PAUSE: "player:pause",
                    PLAY: "player:play",
                    END: "player:end",
                    PROGRESS: "player:progress"
                }
            }
        }, function(t, e) {
            var n = {};
            t.exports = {
                publish: function(t) {
                    if (!t) throw new Error("Tried to publish to an invalid topic");
                    var e = Array.prototype.slice.call(arguments, 1);
                    n[t] && n[t].forEach(function(t) {
                        t.apply(this, e)
                    })
                },
                subscribe: function(t, e) {
                    if (!t) throw new Error("Tried to subscribe to an invalid topic");
                    return n[t] || (n[t] = []), n[t].push(e), [t, e]
                },
                unsubscribe: function(t) {
                    var e = t[0];
                    n[e] && n[e].forEach(function(i) {
                        i === t[1] && n[e].splice(i, 1)
                    })
                },
                dispose: function() {
                    n = {}
                }
            }
        }, function(t, e) {
            t.exports = function(t, e) {
                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                return t
            }
        }, function(t, e) {
            var n = function(t) {
                    var e = {};
                    e.position = +t.getAttribute("data-position"), e.name = t.getAttribute("data-name"), e.artists = t.getAttribute("data-artists"), e.durationMs = +t.getAttribute("data-duration-ms"), e.uri = t.getAttribute("data-uri"), e.preview = t.getAttribute("data-preview"), e.webPlayerUrl = t.getAttribute("data-web-player-url");
                    for (var n = [], i = t.attributes, r = 0; r < i.length; r++)
                        if (0 === i[r].name.indexOf("data-size-")) {
                            var o = +i[r].name.replace("data-size-", "");
                            n.push({
                                width: o,
                                url: i[r].value
                            })
                        }
                    return e.images = n, e
                },
                i = null;
            t.exports = {
                containsTrack: function(t) {
                    return !!document.querySelector('li[data-uri="' + t + '"]')
                },
                getTrackInformation: function(t) {
                    var e = document.querySelector('li[data-uri="' + t + '"]');
                    return e ? n(e) : null
                },
                getTrackInformationFromPosition: function(t) {
                    var e = document.querySelector('li[data-position="' + t + '"]');
                    return n(e)
                },
                getLength: function() {
                    return i || (i = document.getElementsByClassName("track-row").length), i
                }
            }
        }, function(t, e) {
            t.exports = {
                getType: function() {},
                load: function() {},
                playPause: function() {},
                pause: function() {},
                seek: function() {},
                isPlaying: function() {
                    return !1
                },
                getPosition: function() {
                    return 0
                }
            }
        }, function(t, e) {
            t.exports = {
                getCookie: function(t) {
                    return t && this.hasCookie(t) ? decodeURIComponent(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + decodeURIComponent(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1")) : null
                },
                hasCookie: function(t) {
                    return new RegExp("(?:^|;\\s*)" + decodeURIComponent(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
                },
                setCookie: function(t, e, n, i, r, o) {
                    document.cookie = t + "=" + encodeURIComponent(e) + (o ? ";expires=" + o : ";expires=Fri, 01 Jan 2038 17:14:16 GMT") + (n ? ";path=" + n : "") + (i ? ";domain=" + i : "") + (r ? ";secure" : "")
                },
                deleteCookie: function(t, e, n) {
                    document.cookie = t + "=;expires=Fri, 01 Jan 1970 17:14:16 GMT" + (e ? ";path=" + e : "") + (n ? ";domain=" + n : "")
                },
                getTopDomain: function() {
                    var t = "." + document.domain.split(".").slice(-2).join(".");
                    return t = ".localhost" === t ? "localhost" : t
                },
                getExpireTime: function(t) {
                    var e = new Date,
                        n = e.getTime();
                    return n += parseInt(t), e.setTime(n), e.toUTCString()
                }
            }
        }, function(t, e) {
            function n(t) {
                return "undefined" != typeof NodeList && t instanceof NodeList ? [].slice.call(t) : [].concat(t)
            }

            function i(t, e, i) {
                e = n(e);
                for (var r = 0; r < e.length; r++) t.attachEvent && !t.addEventListener ? t.attachEvent(e[r], i) : t.addEventListener(e[r], i, !1)
            }
            e.addListener = i, e.setText = "textContent" in document.body ? function(t, e) {
                t = n(t);
                for (var i = 0; i < t.length; i++) t[i].textContent = e
            } : function(t, e) {
                t = n(t);
                for (var i = 0; i < t.length; i++) t[i].innerText = e
            };
            var r, o, s, a = function(t, e) {
                for (var n = (t || "").replace(/^\s+|\s+$/g, "").split(/\s+/), i = [], r = {}, o = 0, s = n.length; o < s; o++) {
                    var a = n[o];
                    r[a] || a === e || (i.push(a), r[a] = 1)
                }
                return i
            };
            "classList" in document.body ? (r = function(t, e) {
                t = n(t);
                for (var i = 0; i < t.length; i++) t[i].classList.add(e);
                return t
            }, o = function(t, e) {
                t = n(t);
                for (var i = 0; i < t.length; i++) t[i].classList.remove(e);
                return t
            }, s = function(t, e) {
                return t.classList.contains(e)
            }) : (r = function(t, e) {
                t = n(t);
                for (var i = 0; i < t.length; i++) t[i].className = a(t[i].className + " " + e).join(" ");
                return t
            }, o = function(t, e) {
                t = n(t);
                for (var i = 0; i < t.length; i++) t[i].className = a(t[i].className, e).join(" ")
            }, s = function(t, e) {
                for (var n = a(t.className), i = n.length; i--;)
                    if (n[i] === e) return !0;
                return !1
            }), e.addClass = r, e.removeClass = o, e.hasClass = s
        }, function(t, e, n) {
            (function(e, i) {
                ! function(e, n) {
                    t.exports = n()
                }(this, function() {
                    "use strict";

                    function t(t) {
                        return "function" == typeof t || "object" == typeof t && null !== t
                    }

                    function r(t) {
                        return "function" == typeof t
                    }

                    function o(t) {
                        X = t
                    }

                    function s(t) {
                        z = t
                    }

                    function a() {
                        return function() {
                            return e.nextTick(f)
                        }
                    }

                    function u() {
                        return function() {
                            V(f)
                        }
                    }

                    function c() {
                        var t = 0,
                            e = new Z(f),
                            n = document.createTextNode("");
                        return e.observe(n, {
                                characterData: !0
                            }),
                            function() {
                                n.data = t = ++t % 2
                            }
                    }

                    function l() {
                        var t = new MessageChannel;
                        return t.port1.onmessage = f,
                            function() {
                                return t.port2.postMessage(0)
                            }
                    }

                    function p() {
                        var t = setTimeout;
                        return function() {
                            return t(f, 1)
                        }
                    }

                    function f() {
                        for (var t = 0; t < K; t += 2) {
                            var e = nt[t],
                                n = nt[t + 1];
                            e(n), nt[t] = void 0, nt[t + 1] = void 0
                        }
                        K = 0
                    }

                    function h() {
                        try {
                            var t = n(30);
                            return V = t.runOnLoop || t.runOnContext, u()
                        } catch (t) {
                            return p()
                        }
                    }

                    function _(t, e) {
                        var n = arguments,
                            i = this,
                            r = new this.constructor(v);
                        void 0 === r[rt] && x(r);
                        var o = i._state;
                        return o ? ! function() {
                            var t = n[o - 1];
                            z(function() {
                                return N(o, r, t, i._result)
                            })
                        }() : O(i, r, t, e), r
                    }

                    function d(t) {
                        var e = this;
                        if (t && "object" == typeof t && t.constructor === e) return t;
                        var n = new e(v);
                        return w(n, t), n
                    }

                    function v() {}

                    function y() {
                        return new TypeError("You cannot resolve a promise with itself")
                    }

                    function E() {
                        return new TypeError("A promises callback cannot return that same promise.")
                    }

                    function m(t) {
                        try {
                            return t.then
                        } catch (t) {
                            return ut.error = t, ut
                        }
                    }

                    function b(t, e, n, i) {
                        try {
                            t.call(e, n, i)
                        } catch (t) {
                            return t
                        }
                    }

                    function g(t, e, n) {
                        z(function(t) {
                            var i = !1,
                                r = b(n, e, function(n) {
                                    i || (i = !0, e !== n ? w(t, n) : A(t, n))
                                }, function(e) {
                                    i || (i = !0, S(t, e))
                                }, "Settle: " + (t._label || " unknown promise"));
                            !i && r && (i = !0, S(t, r))
                        }, t)
                    }

                    function T(t, e) {
                        e._state === st ? A(t, e._result) : e._state === at ? S(t, e._result) : O(e, void 0, function(e) {
                            return w(t, e)
                        }, function(e) {
                            return S(t, e)
                        })
                    }

                    function P(t, e, n) {
                        e.constructor === t.constructor && n === _ && e.constructor.resolve === d ? T(t, e) : n === ut ? S(t, ut.error) : void 0 === n ? A(t, e) : r(n) ? g(t, e, n) : A(t, e)
                    }

                    function w(e, n) {
                        e === n ? S(e, y()) : t(n) ? P(e, n, m(n)) : A(e, n)
                    }

                    function k(t) {
                        t._onerror && t._onerror(t._result), C(t)
                    }

                    function A(t, e) {
                        t._state === ot && (t._result = e, t._state = st, 0 !== t._subscribers.length && z(C, t))
                    }

                    function S(t, e) {
                        t._state === ot && (t._state = at, t._result = e, z(k, t))
                    }

                    function O(t, e, n, i) {
                        var r = t._subscribers,
                            o = r.length;
                        t._onerror = null, r[o] = e, r[o + st] = n, r[o + at] = i, 0 === o && t._state && z(C, t)
                    }

                    function C(t) {
                        var e = t._subscribers,
                            n = t._state;
                        if (0 !== e.length) {
                            for (var i = void 0, r = void 0, o = t._result, s = 0; s < e.length; s += 3) i = e[s], r = e[s + n], i ? N(n, i, r, o) : r(o);
                            t._subscribers.length = 0
                        }
                    }

                    function L() {
                        this.error = null
                    }

                    function R(t, e) {
                        try {
                            return t(e)
                        } catch (t) {
                            return ct.error = t, ct
                        }
                    }

                    function N(t, e, n, i) {
                        var o = r(n),
                            s = void 0,
                            a = void 0,
                            u = void 0,
                            c = void 0;
                        if (o) {
                            if (s = R(n, i), s === ct ? (c = !0, a = s.error, s = null) : u = !0, e === s) return void S(e, E())
                        } else s = i, u = !0;
                        e._state !== ot || (o && u ? w(e, s) : c ? S(e, a) : t === st ? A(e, s) : t === at && S(e, s))
                    }

                    function I(t, e) {
                        try {
                            e(function(e) {
                                w(t, e)
                            }, function(e) {
                                S(t, e)
                            })
                        } catch (e) {
                            S(t, e)
                        }
                    }

                    function U() {
                        return lt++
                    }

                    function x(t) {
                        t[rt] = lt++, t._state = void 0, t._result = void 0, t._subscribers = []
                    }

                    function D(t, e) {
                        this._instanceConstructor = t, this.promise = new t(v), this.promise[rt] || x(this.promise), F(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? A(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && A(this.promise, this._result))) : S(this.promise, B())
                    }

                    function B() {
                        return new Error("Array Methods must be provided an Array")
                    }

                    function M(t) {
                        return new D(this, t).promise
                    }

                    function G(t) {
                        var e = this;
                        return new e(F(t) ? function(n, i) {
                            for (var r = t.length, o = 0; o < r; o++) e.resolve(t[o]).then(n, i)
                        } : function(t, e) {
                            return e(new TypeError("You must pass an array to race."))
                        })
                    }

                    function H(t) {
                        var e = this,
                            n = new e(v);
                        return S(n, t), n
                    }

                    function W() {
                        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                    }

                    function q() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                    }

                    function Q(t) {
                        this[rt] = U(), this._result = this._state = void 0, this._subscribers = [], v !== t && ("function" != typeof t && W(), this instanceof Q ? I(this, t) : q())
                    }

                    function Y() {
                        var t = void 0;
                        if ("undefined" != typeof i) t = i;
                        else if ("undefined" != typeof self) t = self;
                        else try {
                            t = Function("return this")()
                        } catch (t) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                        var e = t.Promise;
                        if (e) {
                            var n = null;
                            try {
                                n = Object.prototype.toString.call(e.resolve())
                            } catch (t) {}
                            if ("[object Promise]" === n && !e.cast) return
                        }
                        t.Promise = Q
                    }
                    var j = void 0;
                    j = Array.isArray ? Array.isArray : function(t) {
                        return "[object Array]" === Object.prototype.toString.call(t)
                    };
                    var F = j,
                        K = 0,
                        V = void 0,
                        X = void 0,
                        z = function(t, e) {
                            nt[K] = t, nt[K + 1] = e, K += 2, 2 === K && (X ? X(f) : it())
                        },
                        J = "undefined" != typeof window ? window : void 0,
                        $ = J || {},
                        Z = $.MutationObserver || $.WebKitMutationObserver,
                        tt = "undefined" == typeof self && "undefined" != typeof e && "[object process]" === {}.toString.call(e),
                        et = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                        nt = new Array(1e3),
                        it = void 0;
                    it = tt ? a() : Z ? c() : et ? l() : void 0 === J ? h() : p();
                    var rt = Math.random().toString(36).substring(16),
                        ot = void 0,
                        st = 1,
                        at = 2,
                        ut = new L,
                        ct = new L,
                        lt = 0;
                    return D.prototype._enumerate = function() {
                        for (var t = this.length, e = this._input, n = 0; this._state === ot && n < t; n++) this._eachEntry(e[n], n)
                    }, D.prototype._eachEntry = function(t, e) {
                        var n = this._instanceConstructor,
                            i = n.resolve;
                        if (i === d) {
                            var r = m(t);
                            if (r === _ && t._state !== ot) this._settledAt(t._state, e, t._result);
                            else if ("function" != typeof r) this._remaining--, this._result[e] = t;
                            else if (n === Q) {
                                var o = new n(v);
                                P(o, t, r), this._willSettleAt(o, e)
                            } else this._willSettleAt(new n(function(e) {
                                return e(t)
                            }), e)
                        } else this._willSettleAt(i(t), e)
                    }, D.prototype._settledAt = function(t, e, n) {
                        var i = this.promise;
                        i._state === ot && (this._remaining--, t === at ? S(i, n) : this._result[e] = n), 0 === this._remaining && A(i, this._result)
                    }, D.prototype._willSettleAt = function(t, e) {
                        var n = this;
                        O(t, void 0, function(t) {
                            return n._settledAt(st, e, t)
                        }, function(t) {
                            return n._settledAt(at, e, t)
                        })
                    }, Q.all = M, Q.race = G, Q.resolve = d, Q.reject = H, Q._setScheduler = o, Q._setAsap = s, Q._asap = z, Q.prototype = {
                        constructor: Q,
                        then: _,
                        catch: function(t) {
                            return this.then(null, t)
                        }
                    }, Y(), Q.polyfill = Y, Q.Promise = Q, Q
                })
            }).call(e, n(27), function() {
                return this
            }())
        }, function(t, e, n) {
            (function(e) {
                "use strict";

                function i(t, e) {
                    return !this instanceof i ? new i(t, e) : (o.call(this), t = t || {}, this._win = e || window, this._protocol = t.protocol || this._win.location.protocol, this._csrf = "", t.debug ? this._delayedConnect = new i.Promise(function(t) {
                        this._win.startRemote = t
                    }.bind(this)) : this._delayedConnect = Promise.resolve(), t.port && t.debug ? this._startPort = this._endPort = t.port : (this._startPort = "https:" === this._protocol ? 4370 : 4380, this._endPort = "https:" === this._protocol ? 4379 : 4389), this._currentPort = this._startPort, this._runningPort = 0, this._subdomain = "", this._clientOpen = !1, this._connected = !1, this._backoffIndex = 0, this.state = null, this._retryConnect = t.retryConnect || !1, this._reconnectOnLogout = t.reconnectOnLogout || !1, this._reopenOnReconnect = t.reopenOnReconnect || !1, this._localhost = t.debug || t.localhost || !1, this._pollClient = t.pollClient || !1, this._pollBackoff = t.pollBackoff || [1, 1, 1, 1, 3, 3, 5], this._longPollingTime = t.longPollingTime || 6e4, this._token = t.token || "", void(this._referrer = t.referrer || this._win.location.href))
                }

                function r(t, e) {
                    function n() {}
                    var i = e.prototype;
                    n.prototype = t._super = i, n.prototype.constructor = e, t.prototype = new n
                }
                var o = n(29);
                r(i, o), t.exports = i, i.Promise = e.Promise;
                var s = {
                    STATUS_CHANGE: "STATUS_CHANGE",
                    CONNECTION_ESTABLISHED: "CONNECTION_ESTABLISHED",
                    CONNECTION_FAILED: "CONNECTION_FAILED"
                };
                i.Event = s;
                var a = {
                    INVALID_OAUTH_TOKEN: "4102",
                    EXPIRED_OAUTH_TOKEN: "4103",
                    INVALID_CSRF_TOKEN: "4107",
                    OAUTH_TOKEN_INVALID_FOR_USER: "4108",
                    NO_USER_LOGGED_IN: "4110",
                    COULD_NOT_DETECT_PORT: "6000",
                    COULD_NOT_OPEN_CLIENT: "6010",
                    COULD_NOT_FETCH_CSRF_TOKEN: "6020",
                    COULD_NOT_FETCH_STATUS: "6030",
                    COULD_NOT_PLAY_TRACK: "6040",
                    COULD_NOT_BROWSE_TO_CONTEXT: "6041",
                    NO_TRACK_LOADED: "6050",
                    CORS_REQUESTS_DISABLED: "6060",
                    REQUEST_TIMED_OUT: "6061"
                };
                i.Error = a, i.prototype.isCurrent = function(t) {
                    return this.getCurrentTrackUri() === t
                }, i.prototype.getCurrentTrackUri = function() {
                    var t = this.state,
                        e = null;
                    return null !== t && t.track && t.track.track_resource && t.track.track_resource.uri && (e = t.track.track_resource.uri), e
                }, i.prototype.enabled = function() {
                    return this._runningPort > 0
                }, i.prototype._detectPort = function(t) {
                    if (t || (t = {
                            resolve: null,
                            reject: null
                        }, t.promise = new i.Promise(function(e, n) {
                            t.resolve = e, t.reject = n
                        })), 0 < this._runningPort) t.resolve(this._runningPort);
                    else {
                        var e = this,
                            n = this._buildUrl("service/version.json", {
                                service: "remote"
                            });
                        e._request(n, function(n, i) {
                            n ? e._currentPort < e._endPort ? (e._currentPort++, e._detectPort(t)) : e._pollClient ? (e._currentPort = e._startPort, setTimeout(function() {
                                e._detectPort(t)
                            }, 1e3 * e._nextPollInterval())) : t.reject({
                                type: a.COULD_NOT_DETECT_PORT,
                                message: "Could not detect any port"
                            }) : (e._resetBackoffCounter(), e._runningPort = e._currentPort, e._clientOpen = i.running !== !1, t.resolve(e._currentPort))
                        })
                    }
                    return t.promise
                }, i.prototype._openClient = function() {
                    var t = this;
                    return new i.Promise(function(e, n) {
                        if (t._clientOpen) e();
                        else {
                            var i = t._buildUrl("remote/open.json");
                            t._request(i, function(i, r) {
                                i ? n({
                                    type: a.COULD_NOT_OPEN_CLIENT,
                                    message: "Could not open client"
                                }) : r.running ? (t._clientOpen = !0, e()) : n({
                                    type: a.COULD_NOT_OPEN_CLIENT,
                                    message: "Could not open client"
                                })
                            }, 3e4)
                        }
                    })
                }, i.prototype._csrfToken = function() {
                    var t = this;
                    return new i.Promise(function(e, n) {
                        if ("" !== t._csrf) e(t._csrf);
                        else {
                            var i = t._buildUrl("simplecsrf/token.json");
                            t._request(i, function(i, r) {
                                i ? n({
                                    type: a.COULD_NOT_FETCH_CSRF_TOKEN,
                                    message: "Could not fetch csrf token"
                                }) : r.token ? (t._csrf = r.token, e(r.token)) : n({
                                    type: a.COULD_NOT_FETCH_CSRF_TOKEN,
                                    message: "Could not fetch csrf token"
                                })
                            })
                        }
                    })
                }, i.prototype._status = function(t, e, n) {
                    var i = this,
                        r = {
                            csrf: i._csrf,
                            oauth: i._token
                        };
                    n = n || 500, t && (r.returnon = "login,logout,play,pause,error,ap", r.returnafter = n / 1e3);
                    var o = i._buildUrl("remote/status.json", r);
                    this._request(o, function(t, n) {
                        if (t) {
                            var r = t.type || a.COULD_NOT_FETCH_STATUS;
                            e({
                                type: r,
                                message: "Could not fetch status"
                            })
                        } else n.error ? (n.running === !1 && (i._clientOpen = !1), e(n.error)) : e(null, n)
                    }, n + 1e3)
                }, i.prototype._statusChange = function() {
                    var t = this;
                    this._status(!0, function(e, n) {
                        if (e) switch (e.code = e.code || e.type, e.code) {
                            case a.NO_USER_LOGGED_IN:
                                t._connected = !1, t._connection = null, t._reconnectOnLogout && t._reconnect(), t.emit(s.CONNECTION_FAILED, e);
                                break;
                            case a.INVALID_OAUTH_TOKEN:
                            case a.EXPIRED_OAUTH_TOKEN:
                            case a.OAUTH_TOKEN_INVALID_FOR_USER:
                                t._token = "", t._connected = !1, t._connection = null, t.emit(s.CONNECTION_FAILED, e);
                                break;
                            case a.INVALID_CSRF_TOKEN:
                                t._csrf = "", t._csrfToken().then(function() {
                                    t._statusChange()
                                });
                                break;
                            default:
                                t._connected = !1, t._connection = null, t.emit(s.CONNECTION_FAILED, e)
                        } else t._statusChange(), t.state = n, t.emit(s.STATUS_CHANGE, n)
                    }, t._longPollingTime)
                }, i.prototype._connect = function(t) {
                    var e = this;
                    return new i.Promise(function(n, i) {
                        e._connected ? n(e.state) : e._status(!1, function(r, o) {
                            if (r) switch (r.type) {
                                case a.NO_USER_LOGGED_IN:
                                    !t && e._retryConnect ? setTimeout(function() {
                                        e._reconnect().then(function(t) {
                                            n(t)
                                        })
                                    }, 1e3 * e._nextPollInterval()) : i(r);
                                    break;
                                default:
                                    i(r)
                            } else e._resetBackoffCounter(), e._connected = !0, e.state = o, e._statusChange(), n(o)
                        })
                    })
                }, i.prototype.connect = function() {
                    var t = this;
                    return this._connection || (this._connection = this._delayedConnect.then(function() {
                        return t._detectPort()
                    }).then(function() {
                        return new i.Promise(function(e, n) {
                            t._clientOpen ? t._csrfToken().then(function() {
                                return t._connect(!0).catch(function(t) {
                                    switch (t.type) {
                                        case a.NO_USER_LOGGED_IN:
                                            e()
                                    }
                                })
                            }, function(t) {
                                n(t)
                            }).then(function(t) {
                                e(t)
                            }) : e(null)
                        })
                    })), this._connection.then(function(e) {
                        return t.state || e
                    })
                }, i.prototype._reconnect = function() {
                    var t = this;
                    return this._detectPort().then(function() {
                        return t._reopenOnReconnect ? t._openClient() : t
                    }).then(function() {
                        return t._csrfToken()
                    }).then(function() {
                        return t._connect()
                    })
                }, i.prototype.setToken = function(t) {
                    this._token = t
                }, i.prototype.play = function(t, e, n) {
                    var r = this,
                        o = this._playPromise && this._connection ? this._playPromise : this.connect();
                    return this._playPromise = o.then(function() {
                        return r._openClient()
                    }).then(function() {
                        return r._csrfToken()
                    }).then(function() {
                        return r._connect()
                    }).then(function() {
                        var o = {
                            csrf: r._csrf,
                            oauth: r._token,
                            context: t
                        };
                        return o.uri = e || t, n && (o.uri += "#" + r._formatPlayPosition(n)), new i.Promise(function(t, e) {
                            var n = r._buildUrl("remote/play.json", o);
                            r._request(n, function(e, n) {
                                e ? t() : n.error ? t() : (r.state = n, r.emit(s.STATUS_CHANGE, n), t(n))
                            })
                        })
                    }).catch(function(t) {
                        throw r._playPromise = null, t
                    })
                }, i.prototype._pause = function(t) {
                    var e = {
                            csrf: this._csrf,
                            oauth: this._token,
                            pause: t === !0 ? "true" : "false"
                        },
                        n = this._buildUrl("remote/pause.json", e);
                    return new i.Promise(function(t, e) {
                        this._request(n, function(n, i) {
                            if (n) {
                                var r = n.type || a.COULD_NOT_TOGGLE_PLAYBACK;
                                e({
                                    type: r,
                                    message: "Could not toggle playback"
                                })
                            } else i.error ? e(i.error) : t(i)
                        })
                    }.bind(this))
                }, i.prototype.pause = function() {
                    var t = this;
                    return this.connect().then(function(e) {
                        return new i.Promise(function(n, i) {
                            e.track && e.track.track_resource && e.track.track_resource.uri ? t._pause(!0).then(function(t) {
                                n(t)
                            }, function(t) {
                                i(t)
                            }) : i({
                                type: a.NO_TRACK_LOADED,
                                message: "Could not pause non existing track"
                            })
                        })
                    })
                }, i.prototype.resume = function() {
                    var t = this;
                    return this.connect().then(function(e) {
                        return new i.Promise(function(n, i) {
                            e.track && e.track.track_resource && e.track.track_resource.uri ? t._pause(!1).then(function(t) {
                                n(t)
                            }, function(t) {
                                i(t)
                            }) : i({
                                type: a.NO_TRACK_LOADED,
                                message: "Could not pause non existing track"
                            })
                        })
                    })
                }, i.prototype.toggle = function() {
                    var t = this;
                    return this.connect().then(function(e) {
                        return new i.Promise(function(n, i) {
                            e.track && e.track.track_resource && e.track.track_resource.uri ? t._pause(e.playing).then(function(t) {
                                n(t)
                            }) : i({
                                type: a.NO_TRACK_LOADED,
                                message: "Could not toggle playback for non existing track"
                            })
                        })
                    })
                }, i.prototype.browse = function(t, e) {
                    var n = this;
                    return this.connect().then(function() {
                        var r = {
                            csrf: n._csrf,
                            oauth: n._token,
                            context: t
                        };
                        return e && (r.uri = e), new i.Promise(function(t, e) {
                            var i = n._buildUrl("remote/browse.json", r);
                            n._request(i, function(n, i) {
                                n ? e({
                                    type: a.COULD_NOT_BROWSE_TO_CONTEXT,
                                    message: "Could not browse to context"
                                }) : i.error ? e(i.error) : t(i)
                            })
                        })
                    }).catch(function(t) {
                        throw t
                    })
                }, i.prototype._baseUrl = function() {
                    if (this._localhost) return "//localhost";
                    var t = 97,
                        e = 122;
                    if ("" === this._subdomain)
                        for (var n = 0; n < 10; ++n) this._subdomain += String.fromCharCode(Math.floor(Math.random() * (e - t + 1)) + t);
                    return "//" + this._subdomain + ".spotilocal.com"
                }, i.prototype._request = function(t, e, n) {
                    function i() {
                        if ("undefined" != typeof r._win.XDomainRequest) return new r._win.XDomainRequest;
                        if ("undefined" != typeof r._win.XMLHttpRequest) return new r._win.XMLHttpRequest;
                        try {
                            return new ActiveXObject("Microsoft.XMLHTTP")
                        } catch (t) {}
                        try {
                            return new ActiveXObject("Msxml2.XMLHTTP.6.0")
                        } catch (t) {}
                        try {
                            return new ActiveXObject("Msxml2.XMLHTTP.3.0")
                        } catch (t) {}
                        try {
                            return new ActiveXObject("Msxml2.XMLHTTP")
                        } catch (t) {}
                        return null
                    }
                    var r = this,
                        o = i();
                    o ? (o.onload = function() {
                        var t = o.responseText;
                        t = JSON.parse(t), e(null, t)
                    }, o.onerror = function() {
                        e({
                            type: o.status,
                            message: "Request error"
                        })
                    }, o.ontimeout = function() {
                        e({
                            type: a.REQUEST_TIMED_OUT,
                            message: "Request timed out"
                        })
                    }, o.onprogress = function() {}, o.open("GET", t), o.timeout = n ? n : 5e3, o.send()) : e({
                        type: a.CORS_REQUESTS_DISABLED,
                        message: "CORS Requests are not enabled"
                    })
                }, i.prototype._buildUrl = function(t, e) {
                    e = e || {}, e.cors = "", e.ref = e.ref || this._referrer;
                    var n = this._buildQuery(e);
                    return this._baseUrl() + ":" + this._currentPort + "/" + t + "?" + n
                }, i.prototype._buildQuery = function(t) {
                    var e = [];
                    for (var n in t) t.hasOwnProperty(n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
                    return e.join("&")
                }, i.prototype._nextPollInterval = function() {
                    var t = this._pollBackoff[this._backoffIndex];
                    return this._pollBackoff[this._backoffIndex + 1] && this._backoffIndex++, t
                }, i.prototype._resetBackoffCounter = function() {
                    this._backoffIndex = 0
                }, i.prototype._formatPlayPosition = function(t) {
                    var e = Math.floor(t / 60),
                        n = (t % 60).toFixed(3);
                    return n < 10 && (n = "0" + n), e + ":" + n
                }
            }).call(e, function() {
                return this
            }())
        }, function(t, e) {}, , function(t, e) {
            var n = function(t, e, n, i) {
                try {
                    ga("send", "event", t, e, n, i)
                } catch (t) {}
            };
            t.exports = function(t) {
                return {
                    loadPage: function() {
                        var e = document.body.getAttribute("data-abtest");
                        n(t, "Load page", e ? e : "", {
                            nonInteraction: !0
                        })
                    },
                    loadPlaybackStrategy: function(e) {
                        n(t, "Load playback strategy", e, {
                            nonInteraction: !0
                        })
                    },
                    showModal: function(e) {
                        n(t, "Show modal", e)
                    },
                    dismissModal: function(e) {
                        n(t, "Dismiss modal", e)
                    },
                    showUpsellModal: function(e) {
                        n(t, "Show upsell modal", e)
                    },
                    dismissUpsellModal: function(e) {
                        n(t, "Dismiss upsell modal", e)
                    },
                    goToWww: function(e) {
                        n(t, "Go to WWW", e)
                    },
                    goToSignupWww: function(e) {
                        n(t, "Go to signup in WWW", e)
                    },
                    goToSignupWebPlayer: function(e) {
                        n(t, "Go to signup in Web Player", e)
                    },
                    goToDownloadWww: function(e) {
                        n(t, "Go to download in WWW", e)
                    },
                    goToDownloadAppStore: function(e) {
                        n(t, "Go to download in App Store", e)
                    },
                    play30sPreview: function(e) {
                        n(t, "Play 30s preview", e)
                    },
                    playInDesktopApp: function(e) {
                        n(t, "Play in desktop app", e)
                    },
                    playInMobileApp: function(e) {
                        n(t, "Play in mobile app", e)
                    },
                    playInWebPlayer: function(e) {
                        n(t, "Play in Web Player", e)
                    },
                    sendSMS: function() {
                        n(t, "SMS send")
                    },
                    sendSMSError: function(e) {
                        n(t, "SMS send error", e)
                    }
                }
            }
        }, function(t, e, n) {
            function i(t) {
                this.autoplay = t.autoplay, this.context = t.context || {}, this.platform = t.platform, this.strings = t.strings || {}, this.isMobile = t.isMobile, this.isChromebook = window.hasOwnProperty("navigator") && window.navigator.userAgent.indexOf("CrOS ") !== -1, this.isTouchDevice = !!("ontouchstart" in window || window.hasOwnProperty("navigator") && window.navigator.msMaxTouchPoints), this.usesWebPlayer = t.usesWebPlayer, this.downloadLink = t.downloadLink, this.webPlayerUrl = "https://play.spotify.com/" + this.context.uri.split(":").slice(1, this.context.uri.length).join("/"), this.topDomain = "." + document.domain.split(".").slice(-2).join("."), this.urlParams = this.getQueryParams(), this.remoteDebug = void 0 !== this.urlParams.remoteDebug && 0 !== this.urlParams.remoteDebug, this.remotePort = parseInt(this.urlParams.remotePort) || 1080, this.testAutomation = "1" === this.urlParams.testAutomation, this.coverArtPlaysPreview = t.isMobile && "1" === this.urlParams.capp
            }
            var r = n(6),
                o = "is_spotified";
            i.prototype.setHasSpotify = function(t) {
                return t ? r.setCookie(o, "yes", "/", this.topDomain) : r.deleteCookie(o, "/", this.topDomain), this
            }, i.prototype.hasSpotify = function() {
                return "yes" === r.getCookie(o)
            }, i.prototype.getQueryParams = function() {
                for (var t = location.search ? location.search.substr(1).split("&") : [], e = {}, n = 0; n < t.length; n++) {
                    var i = t[n].split("=");
                    e[i[0]] = i[1] ? decodeURIComponent(i[1]) : void 0
                }
                return e
            }, i.prototype.getString = function(t) {
                return this.strings[t] || t
            }, i.prototype.getPlatformLink = function() {
                return this.downloadLink
            }, i.prototype.getContextURI = function() {
                return this.context.uri
            }, i.prototype.setContextURI = function(t) {
                this.context.uri = t
            }, i.prototype.getTrackURI = function() {
                return this.context.track
            }, i.prototype.getContextType = function() {
                return this.context.type
            }, i.prototype.getReferrer = function() {
                return document.referrer ? document.referrer.split("/")[2] : ""
            }, t.exports = i
        }, function(t, e, n) {
            var i = n(2),
                r = n(1);
            t.exports = {
                _type: null,
                init: function() {
                    i.subscribe(r.USER.OPEN_CLIENT_REQUEST, function(t) {
                        Spotify.Env.isMobile ? Spotify.GAEvents.playInMobileApp(t) : Spotify.GAEvents.playInDesktopApp(t)
                    }), i.subscribe(r.USER.OPEN_WP_REQUEST, function(t) {
                        Spotify.GAEvents.playInWebPlayer(t)
                    }), i.subscribe(r.USER.DOWNLOAD_REQUEST, function(t) {
                        Spotify.Env.isMobile ? Spotify.GAEvents.goToDownloadAppStore(t) : Spotify.GAEvents.goToDownloadWww(t)
                    }), i.subscribe(r.USER.PLAY_REQUEST, function() {
                        "preview" === this._type ? Spotify.GAEvents.play30sPreview("play-button") : "remote" === this._type ? Spotify.GAEvents.playInDesktopApp("play-button") : "web-player" === this._type ? Spotify.GAEvents.playInWebPlayer("play-button") : "mobile-app" === this._type && Spotify.GAEvents.playInMobileApp("play-button")
                    }.bind(this)), i.subscribe(r.MAIN.UPSELL, function() {
                        Spotify.GAEvents.showModal("upsell")
                    }), i.subscribe(r.MAIN.DISMISS_UPSELL, function() {
                        Spotify.GAEvents.dismissModal("upsell")
                    })
                },
                setPlayerType: function(t) {
                    this._type = t
                }
            }
        }, function(t, e) {
            t.exports = function(t) {
                for (var e = {}, n = t.substr(1).split("&"), i = 0; i < n.length; i++) {
                    var r = n[i].split("=");
                    e[decodeURIComponent(r[0])] = decodeURIComponent(r[1] || "")
                }
                return e
            }
        }, function(t, e, n) {
            var i = n(2),
                r = n(1),
                o = n(8).Promise,
                s = n(9),
                a = function(t) {
                    var e;
                    switch (t) {
                        case "mobileApp":
                            e = n(17);
                            break;
                        case "preview":
                            e = n(18);
                            break;
                        case "remote":
                            e = n(19);
                            break;
                        case "webPlayer":
                            e = n(20);
                            break;
                        default:
                            throw new Error("Playback strategy not defined: " + t)
                    }
                    return e.apply(this, Array.prototype.splice.call(arguments, 1))
                };
            t.exports = function(t) {
                return new o(function(e) {
                    if (t.urlParams.playback) switch (t.urlParams.playback) {
                            case "preview":
                                e(a("preview"));
                                break;
                            case "webplayer":
                                e(a("webPlayer"));
                                break;
                            case "mobileapp":
                                e(a("mobileApp"))
                        } else if (t.isMobile && t.hasSpotify()) e(a("mobileApp"));
                        else if (t.isMobile) e(a("preview"));
                    else if (t.isChromebook && t.usesWebPlayer) e(a("webPlayer"));
                    else if (t.isChromebook) e(a("preview"));
                    else {
                        var n = new o(function(t, e) {
                            var n = new XMLHttpRequest;
                            n.onload = function() {
                                var e = JSON.parse(n.responseText);
                                t(e.t)
                            }, n.onerror = function() {
                                e(n.responseText)
                            }, n.open("GET", "/token"), n.send()
                        });
                        n.then(function(n) {
                            var o = new s({
                                token: n,
                                pollClient: !1,
                                retryConnect: !1,
                                reconnectOnLogout: !0,
                                debug: !1,
                                port: 1080
                            });
                            o.connect().then(function(n) {
                                var s = "closed";
                                n && (s = n.playing ? "playing" : "paused"), i.publish(r.MAIN.REMOTE_CONTROL_CONNECTED, s), e(a("remote", t, o, n))
                            }).catch(function() {
                                e(t.usesWebPlayer ? a("webPlayer") : a("preview"))
                            })
                        }).catch(function() {
                            e(a("preview"))
                        })
                    }
                })
            }
        }, function(t, e, n) {
            var i = n(5),
                r = n(3),
                o = n(2),
                s = n(1);
            t.exports = function() {
                var t = null;
                return r(i, {
                    getType: function() {
                        return "mobile-app"
                    },
                    load: function(e, n) {
                        t = n, window.functionalTesting = {
                            locationHref: n
                        }, o.publish(s.PLAYER.LOAD, t)
                    },
                    playPause: function() {
                        window.functionalTesting = {
                            locationHref: t
                        }, window.top.location = t
                    }
                })
            }
        }, function(t, e, n) {
            var i = n(5),
                r = n(3),
                o = n(2),
                s = n(1),
                a = n(28).raf;
            t.exports = function() {
                var t = "preview",
                    e = null,
                    n = new Audio,
                    u = null;
                n.addEventListener("pause", function() {
                    o.publish(s.PLAYER.PAUSE, e)
                }), n.addEventListener("playing", function() {
                    o.publish(s.PLAYER.PLAY, e)
                }), n.addEventListener("ended", function() {
                    o.publish(s.PLAYER.END, e)
                });
                var c = function() {
                    if (!n.paused) {
                        var t = 100 * n.currentTime / n.duration || 0;
                        t < 100 && (o.publish(s.PLAYER.PROGRESS, e, t, Math.floor(1e3 * n.currentTime)), a(c))
                    }
                };
                return r(i, {
                    getType: function() {
                        return t
                    },
                    load: function(t, n, i) {
                        e = t, u = i, o.publish(s.PLAYER.LOAD, t)
                    },
                    playPause: function() {
                        n.src !== u && (n.src = u), n.paused ? (n.play(), a(c)) : n.pause()
                    },
                    pause: function() {
                        n.pause()
                    },
                    isPlaying: function() {
                        return !n.paused
                    },
                    getPosition: function() {
                        return Math.floor(1e3 * n.currentTime)
                    }
                })
            }
        }, function(t, e, n) {
            var i = n(5),
                r = n(3),
                o = n(9);
            o.Promise = n(8).Promise;
            var s = n(4),
                a = n(2),
                u = n(1);
            t.exports = function(t, e, n) {
                var c = !0,
                    l = e,
                    p = n,
                    f = null,
                    h = null,
                    _ = null,
                    d = null,
                    v = null,
                    y = function(e) {
                        return t.context.uri.indexOf(":track:") > 0 ? t.context.uri === e : s.containsTrack(e)
                    },
                    E = function(t) {
                        if (p = t, t && t.track) {
                            if (!y(t.track.track_resource.uri)) return void a.publish(u.PLAYER.PAUSE, t.track.track_resource.uri);
                            if (t.track.track_resource.uri !== h && (a.publish(u.PLAYER.PAUSE, h), h = t.track.track_resource.uri), d = t.track.length, v = t.playing_position, t.playing) {
                                var e = 100 * v / d,
                                    n = 1e3 * v;
                                a.publish(u.PLAYER.PLAY, t.track.track_resource.uri), a.publish(u.PLAYER.PROGRESS, h, e, n), f || (f = window.setInterval(function() {
                                    v += 1;
                                    var t = 100 * v / d,
                                        e = 1e3 * v;
                                    a.publish(u.PLAYER.PROGRESS, h, t, e)
                                }, 1e3))
                            } else f && (window.clearInterval(f), f = null), a.publish(u.PLAYER.PAUSE, t.track.track_resource.uri)
                        }
                    };
                return l.on(o.Event.STATUS_CHANGE, E), r(i, {
                    getType: function() {
                        return "remote"
                    },
                    load: function(t, e) {
                        c && p && p.playing && y(p.track.track_resource.uri) ? (h = p.track.track_resource.uri, E(p)) : h = t, c = !1, _ = e, a.publish(u.PLAYER.LOAD, t)
                    },
                    playPause: function() {
                        if (p && p.track && p.track.track_resource && p.track.track_resource.uri === h) l.toggle();
                        else {
                            f && (window.clearInterval(f), f = null, a.publish(u.PLAYER.PROGRESS, h, 0, d)), a.publish(u.PLAYER.PAUSE, h);
                            var t = _.split("?")[0];
                            l.play(t, h)
                        }
                    },
                    isPlaying: function() {
                        return p && p.playing
                    },
                    getPosition: function() {
                        return 1e3 * v
                    }
                })
            }
        }, function(t, e, n) {
            var i = n(5),
                r = n(3),
                o = n(2),
                s = n(1);
            t.exports = function() {
                var t = null;
                return r(i, {
                    getType: function() {
                        return "web-player"
                    },
                    load: function(e, n, i, r) {
                        t = r, o.publish(s.PLAYER.LOAD, e)
                    },
                    playPause: function() {
                        window.open(t, "_blank")
                    }
                })
            }
        }, function(t, e) {
            t.exports = function() {
                function t() {
                    if (r = document.getElementById("extra"), i = document.getElementById("cover")) {
                        for (var t = "data-size-", e = 0, n = i.attributes, o = n.length; e < o; e++) {
                            var s = n[e];
                            if (0 === s.nodeName.indexOf(t)) {
                                var c = +s.nodeName.replace(t, "");
                                u.push({
                                    size: c,
                                    src: s.value
                                })
                            }
                        }
                        u.sort(function(t, e) {
                            return e.size - t.size
                        }), a = !0
                    }
                }

                function e(t) {
                    i.style.backgroundImage = 'url("' + t + '")';
                }

                function n() {
                    if (a || t(), 0 !== u.length) {
                        var n = r.clientWidth;
                        if (n > s || !s) {
                            for (var i = u[0], c = 1; c < u.length && u[c].size >= n; c++) i = u[c];
                            i !== o && (e(i.src), o = i), s = n
                        }
                    }
                }
                var i, r, o, s, a = !1,
                    u = [];
                return {
                    onResize: n
                }
            }()
        }, function(t, e, n) {
            var i = n(2),
                r = n(1),
                o = n(4);
            t.exports = {
                init: function(t, e) {
                    this._clickEvent = t, this._document = e || document, this._coverView = this._document.querySelector(".cover-art-container"), this._attachEvents(), this._stack = {
                        prev: null,
                        current: null,
                        next: null
                    }
                },
                _attachEvents: function() {
                    var t = this._coverView.querySelector(".cover-prev");
                    t.addEventListener(this._clickEvent, function() {
                        i.publish(r.USER.SKIP_PREV_REQUEST)
                    });
                    var e = this._coverView.querySelector(".cover-next");
                    e.addEventListener(this._clickEvent, function() {
                        i.publish(r.USER.SKIP_NEXT_REQUEST)
                    });
                    var n = this._coverView.querySelector(".cover-current");
                    n.addEventListener(this._clickEvent, function() {
                        i.publish(r.USER.PLAY_REQUEST)
                    }), i.subscribe(r.MAIN.PLAY, this._updateCovers.bind(this)), i.subscribe(r.MAIN.LOAD, this._updateCovers.bind(this))
                },
                _updateCovers: function(t) {
                    var e = t.position;
                    this._stack.current = t, e > 1 ? this._stack.prev = o.getTrackInformationFromPosition(e - 1) : this._stack.prev = null, e < o.getLength() - 1 ? this._stack.next = o.getTrackInformationFromPosition(e + 1) : this._stack.next = null;
                    for (var n in this._stack)
                        if (this._stack.hasOwnProperty(n)) {
                            var i = this._coverView.querySelector(".cover-" + n);
                            if (null === this._stack[n]) i.style.visibility = "hidden", i.style.backgroundImage = null;
                            else {
                                i.style.visibility = "initial";
                                for (var r = i.offsetWidth, s = this._stack[n].images.length ? this._stack[n].images[0] : null, a = 1; a < this._stack[n].images.length; a++) {
                                    var u = this._stack[n].images[a];
                                    if (!(u.width >= r)) break;
                                    s = u
                                }
                                i.style.backgroundImage = s ? "url(" + s.url + ")" : "none"
                            }
                        }
                }
            }
        }, function(t, e, n) {
            var i = n(2),
                r = n(1),
                o = n(7);
            t.exports = {
                overlayElement: null,
                displayedElement: null,
                init: function(t) {
                    this._clickEvent = t, this.overlayElement = document.getElementById("overlay"), this._unavailableTrackDownloadButton = document.getElementById("js-unavailable-track-get-spotify-button"), this._upsellDownloadButton = document.getElementById("js-upsell-get-spotify-button"), this._unavailableTrackOpenWebPlayerButton = document.getElementById("js-unavailable-track-open-web-player-button"), this._upsellOpenWebPlayerButton = document.getElementById("js-upsell-open-web-player-button"), this._unavailableTrackOpenClientButton = document.getElementById("js-unavailable-track-open-client-button"), this._upsellOpenClientButton = document.getElementById("js-upsell-open-client-button");
                    var e = this.overlayElement.querySelector(".overlay-close");
                    e.addEventListener(t, function() {
                        i.publish(r.MAIN.DISMISS_UPSELL), this._hide()
                    }.bind(this)), this._attachHandlers()
                },
                _attachHandlers: function() {
                    this._unavailableTrackDownloadButton && this._unavailableTrackDownloadButton.addEventListener(this._clickEvent, function() {
                        i.publish(r.USER.DOWNLOAD_REQUEST, "unavailable-track"), this._hide()
                    }.bind(this)), this._upsellDownloadButton && this._upsellDownloadButton.addEventListener(this._clickEvent, function() {
                        i.publish(r.USER.DOWNLOAD_REQUEST, "upsell"), this._hide()
                    }.bind(this)), this._unavailableTrackOpenWebPlayerButton && this._unavailableTrackOpenWebPlayerButton.addEventListener(this._clickEvent, function() {
                        i.publish(r.USER.OPEN_WP_REQUEST, "unavailable-track"), this._hide()
                    }.bind(this)), this._upsellOpenWebPlayerButton && this._upsellOpenWebPlayerButton.addEventListener(this._clickEvent, function() {
                        i.publish(r.USER.OPEN_WP_REQUEST, "upsell"), this._hide()
                    }.bind(this)), this._unavailableTrackOpenClientButton && this._unavailableTrackOpenClientButton.addEventListener(this._clickEvent, function() {
                        i.publish(r.USER.OPEN_CLIENT_REQUEST, "unavailable-track"), this._hide()
                    }.bind(this)), this._upsellOpenClientButton && this._upsellOpenClientButton.addEventListener(this._clickEvent, function() {
                        i.publish(r.USER.OPEN_CLIENT_REQUEST, "upsell"), this._hide()
                    }.bind(this)), i.subscribe(r.USER.GET_LINK_REQUEST, function() {
                        this._show("get-link")
                    }.bind(this)), i.subscribe(r.MAIN.UNAVAILABLE_TRACK, function() {
                        this._show("unavailable-track")
                    }.bind(this)), i.subscribe(r.MAIN.UPSELL, function() {
                        this._show("upsell")
                    }.bind(this))
                },
                _show: function(t) {
                    this.displayedElement || (this.displayedElement = document.getElementById(t), o.removeClass(this.displayedElement, "hide"), o.addClass(this.overlayElement, "show"))
                },
                _hide: function() {
                    o.removeClass(this.overlayElement, "show"), o.addClass(this.displayedElement, "hide"), this.displayedElement = null
                },
                isActive: function() {
                    return null !== this.displayedElement
                }
            }
        }, function(t, e, n) {
            var i = n(2),
                r = n(1);
            t.exports = {
                init: function(t, e) {
                    this._clickEvent = t || "click", this._document = e || document, this._playButton = this._document.getElementById("play-button"), this._getLinkButton = this._document.getElementById("get-link-button"), this._trackName = this._document.getElementById("track-name"), this._trackArtists = this._document.getElementById("track-artists"), this._progressContainer = this._document.getElementById("progress-container"), this._progressBar = this._document.getElementById("progress-bar"), this._progressBarOuter = this._document.getElementById("progress-bar-outer"), this._progressTime = this._document.getElementById("progress-time"), this._controlPrevious = this._document.getElementById("skip-previous"), this._controlNext = this._document.getElementById("skip-next"), this._attachHandlers()
                },
                _attachHandlers: function() {
                    this._addSkipPreviousClickHandler(function() {
                        i.publish(r.USER.SKIP_PREV_REQUEST)
                    }), this._addSkipNextClickHandler(function() {
                        i.publish(r.USER.SKIP_NEXT_REQUEST)
                    }), this._addProgressBarClickHandler(function(t) {
                        i.publish(r.USER.CHANGE_POSITION_REQUEST, t)
                    }), this._addPlayButtonClickHandler(function() {
                        i.publish(r.USER.PLAY_REQUEST)
                    }), this._addGetLinkButtonClickHandler(function() {
                        i.publish(r.USER.GET_LINK_REQUEST)
                    }), i.subscribe(r.MAIN.PLAY, function(t) {
                        this._setTrackName(t.name), this._setTrackArtists(t.artists), this._setPlayButtonPlaying()
                    }.bind(this)), i.subscribe(r.MAIN.LOAD, function(t) {
                        this._setTrackName(t.name), this._setTrackArtists(t.artists), this._setProgressPosition(0), this._setProgressTime(0)
                    }.bind(this)), i.subscribe(r.MAIN.PAUSE, function() {
                        this._setPlayButtonPaused()
                    }.bind(this)), i.subscribe(r.MAIN.PROGRESS, function(t, e, n) {
                        this._setProgressPosition(e), this._setProgressTime(n)
                    }.bind(this))
                },
                _addPlayButtonClickHandler: function(t) {
                    this._playButton.addEventListener(this._clickEvent, t)
                },
                _addGetLinkButtonClickHandler: function(t) {
                    this._getLinkButton.addEventListener(this._clickEvent, t)
                },
                _addProgressBarClickHandler: function(t) {
                    this._progressBarOuter.addEventListener(this._clickEvent, function(e) {
                        var n = e.offsetX / this._progressBarOuter.clientWidth;
                        t(n)
                    }.bind(this))
                },
                _addSkipPreviousClickHandler: function(t) {
                    this._controlPrevious.addEventListener(this._clickEvent, t)
                },
                _addSkipNextClickHandler: function(t) {
                    this._controlNext.addEventListener(this._clickEvent, t)
                },
                _setPlayButtonPlaying: function() {
                    this._playButton.classList.add("playing"), this._progressContainer.classList.add("playing")
                },
                _setPlayButtonPaused: function() {
                    this._playButton.classList.remove("playing"), this._progressContainer.classList.remove("playing")
                },
                _setTrackName: function(t) {
                    this._trackName.textContent = t
                },
                _setTrackArtists: function(t) {
                    this._trackArtists.textContent = t
                },
                _setProgressPosition: function(t) {
                    this._progressBar.style.width = t + "%"
                },
                _setProgressTime: function(t) {
                    var e = Math.floor(t / 6e4),
                        n = Math.floor(t / 1e3) - 60 * e;
                    n < 10 && (n = "0" + n), this._progressTime.textContent = e + ":" + n
                }
            }
        }, function(t, e, n) {
            var i = n(2),
                r = n(1),
                o = n(4),
                s = n(7);
            t.exports = {
                init: function(t, e) {
                    this._clickEvent = t, this._document = e || document, this._trackRows = this._document.getElementsByClassName("track-row"), this._attachHandlers()
                },
                _attachHandlers: function() {
                    i.subscribe(r.MAIN.PAUSE, this._setTrackPaused.bind(this)), i.subscribe(r.MAIN.PLAY, this._setTrackPlaying.bind(this)), this._addTrackRowClickHandler()
                },
                _addTrackRowClickHandler: function() {
                    this._document.addEventListener(this._clickEvent, function(t) {
                        for (var e = t.target, n = {}; e.parentNode;) {
                            if (s.hasClass(e, "track-row")) {
                                n = o.getTrackInformation(e.getAttribute("data-uri")), i.publish(r.USER.PLAY_REQUEST, n);
                                break
                            }
                            e = e.parentNode
                        }
                    })
                },
                _setTrackPlaying: function(t) {
                    var e = this._document.querySelector('li[data-uri="' + t.uri + '"]');
                    if (e) {
                        var n = this._document.querySelector("li.playing");
                        n && n !== e && s.removeClass(n, "playing"), s.addClass(e, "playing")
                    }
                },
                _setTrackPaused: function() {
                    for (var t = 0; t < this._trackRows.length; t++) s.removeClass(this._trackRows[t], "playing")
                }
            }
        }, function(t, e, n) {
            var i = 80;
            t.exports = {
                CoverArt: n(21),
                Overlay: n(23),
                Playback: n(24),
                TracklistView: n(25),
                CoverView: n(22),
                init: function(t) {
                    this._container = document.getElementById("container"), this._extra = document.querySelector(".extra"), this._cover = document.querySelector("#cover"), this.Playback.init(t), this.Overlay.init(t), document.querySelector(".cover-art-container") ? this.CoverView.init(t) : this.TracklistView.init(t)
                },
                adjustToViewport: function() {
                    this._extra.style.height = "300px", this._cover && (this._cover.clientWidth === this._cover.clientHeight - 1 ? (this._cover.style.height = "100%", this._cover.style.width = "100%") : window.innerWidth > window.innerHeight - i ? (this._cover.style.height = "80%", this._cover.style.width = this._cover.clientHeight + "px") : (this._cover.style.width = "80%", this._cover.style.height = this._cover.clientWidth + "px")), this.CoverArt.onResize()
                }
            }
        }, function(t, e) {
            function n() {
                throw new Error("setTimeout has not been defined")
            }

            function i() {
                throw new Error("clearTimeout has not been defined")
            }

            function r(t) {
                if (l === setTimeout) return setTimeout(t, 0);
                if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(t, 0);
                try {
                    return l(t, 0)
                } catch (e) {
                    try {
                        return l.call(null, t, 0)
                    } catch (e) {
                        return l.call(this, t, 0)
                    }
                }
            }

            function o(t) {
                if (p === clearTimeout) return clearTimeout(t);
                if ((p === i || !p) && clearTimeout) return p = clearTimeout, clearTimeout(t);
                try {
                    return p(t)
                } catch (e) {
                    try {
                        return p.call(null, t)
                    } catch (e) {
                        return p.call(this, t)
                    }
                }
            }

            function s() {
                d && h && (d = !1, h.length ? _ = h.concat(_) : v = -1, _.length && a())
            }

            function a() {
                if (!d) {
                    var t = r(s);
                    d = !0;
                    for (var e = _.length; e;) {
                        for (h = _, _ = []; ++v < e;) h && h[v].run();
                        v = -1, e = _.length
                    }
                    h = null, d = !1, o(t)
                }
            }

            function u(t, e) {
                this.fun = t, this.array = e
            }

            function c() {}
            var l, p, f = t.exports = {};
            ! function() {
                try {
                    l = "function" == typeof setTimeout ? setTimeout : n
                } catch (t) {
                    l = n
                }
                try {
                    p = "function" == typeof clearTimeout ? clearTimeout : i
                } catch (t) {
                    p = i
                }
            }();
            var h, _ = [],
                d = !1,
                v = -1;
            f.nextTick = function(t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                _.push(new u(t, e)), 1 !== _.length || d || r(a)
            }, u.prototype.run = function() {
                this.fun.apply(null, this.array)
            }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {}, f.on = c, f.addListener = c, f.once = c, f.off = c, f.removeListener = c, f.removeAllListeners = c, f.emit = c, f.binding = function(t) {
                throw new Error("process.binding is not supported")
            }, f.cwd = function() {
                return "/"
            }, f.chdir = function(t) {
                throw new Error("process.chdir is not supported")
            }, f.umask = function() {
                return 0
            }
        }, function(t, e) {
            "use strict";
            var n = function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
                        setTimeout(t, 1e3 / 60)
                    }
                }(),
                i = function() {
                    return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
                }(),
                r = function(t) {
                    function e() {
                        r ? (t(), o = n(e)) : i(o)
                    }
                    var r = !1,
                        o = null;
                    return {
                        subscribe: function() {
                            r || (r = !0, o = n(e))
                        },
                        unsubscribe: function() {
                            r = !1, i(o)
                        }
                    }
                };
            t.exports.raf = n, t.exports.rafCancel = i, t.exports.RafHandler = r
        }, function(t, e) {
            function n() {}
            n.prototype = {
                on: function(t, e, n) {
                    var i = this.e || (this.e = {});
                    return (i[t] || (i[t] = [])).push({
                        fn: e,
                        ctx: n
                    }), this
                },
                once: function(t, e, n) {
                    function i() {
                        r.off(t, i), e.apply(n, arguments)
                    }
                    var r = this;
                    return i._ = e, this.on(t, i, n)
                },
                emit: function(t) {
                    var e = [].slice.call(arguments, 1),
                        n = ((this.e || (this.e = {}))[t] || []).slice(),
                        i = 0,
                        r = n.length;
                    for (i; i < r; i++) n[i].fn.apply(n[i].ctx, e);
                    return this
                },
                off: function(t, e) {
                    var n = this.e || (this.e = {}),
                        i = n[t],
                        r = [];
                    if (i && e)
                        for (var o = 0, s = i.length; o < s; o++) i[o].fn !== e && i[o].fn._ !== e && r.push(i[o]);
                    return r.length ? n[t] = r : delete n[t], this
                }
            }, t.exports = n
        }, function(t, e) {}]);