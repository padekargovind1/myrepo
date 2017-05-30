(function(){var l;function aa(a,b){function c(){}
c.prototype=b.prototype;a.A=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]}
var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},ca="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;
function da(a,b){if(b){for(var c=ca,d=a.split("."),e=0;e<d.length-1;e++){var f=d[e];f in c||(c[f]={});c=c[f]}d=d[d.length-1];e=c[d];f=b(e);f!=e&&null!=f&&ba(c,d,{configurable:!0,writable:!0,value:f})}}
da("String.prototype.startsWith",function(a){return a?a:function(a,c){if(null==this)throw new TypeError("The 'this' value for String.prototype.startsWith must not be null or undefined");if(a instanceof RegExp)throw new TypeError("First argument to String.prototype.startsWith must not be a regular expression");var b=this+"";a+="";for(var e=b.length,f=a.length,g=Math.max(0,Math.min(c|0,b.length)),h=0;h<f&&g<e;)if(b[g++]!=a[h++])return!1;return h>=f}});
da("Reflect.apply",function(a){if(a)return a;var b=Function.prototype.apply;return function(a,d,e){return b.call(a,d,e)}});
da("Reflect.construct",function(a){return a?a:function(a,c,d){void 0===d&&(d=a);d=Object.create(d.prototype||Object.prototype);return Reflect.apply(a,d,c)||d}});
var n=this;function p(a){return void 0!==a}
function q(a,b,c){a=a.split(".");c=c||n;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&p(b)?c[d]=b:c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}}
function r(a,b){for(var c=a.split("."),d=b||n,e;e=c.shift();)if(null!=d[e])d=d[e];else return null;return d}
function t(){}
function ea(a){a.na=void 0;a.getInstance=function(){return a.na?a.na:a.na=new a}}
function fa(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}
function ia(a){return"array"==fa(a)}
function ja(a){var b=fa(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function u(a){return"string"==typeof a}
function ka(a){return"function"==fa(a)}
function la(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
var ma="closure_uid_"+(1E9*Math.random()>>>0),na=0;function oa(a,b,c){return a.call.apply(a.bind,arguments)}
function pa(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
function v(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?v=oa:v=pa;return v.apply(null,arguments)}
function qa(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}}
var w=Date.now||function(){return+new Date};
function x(a,b){function c(){}
c.prototype=b.prototype;a.A=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.pb=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}}
;var ra=document,z=window;function A(a){if(Error.captureStackTrace)Error.captureStackTrace(this,A);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}
x(A,Error);A.prototype.name="CustomError";var sa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function ta(a,b){return a<b?-1:a>b?1:0}
function va(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var wa=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;
if(u(a))return u(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},B=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=u(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},xa=Array.prototype.map?function(a,b,c){return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=u(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));
return e};
function ya(a,b){a:{var c=a.length;for(var d=u(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:u(a)?a.charAt(c):a[c]}
function za(a,b){var c=wa(a,b);0<=c&&Array.prototype.splice.call(a,c,1)}
function Aa(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function Ba(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(ja(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
;function Ca(a,b){this.b=p(a)?a:0;this.f=p(b)?b:0}
Ca.prototype.equals=function(a){return a instanceof Ca&&(this==a?!0:this&&a?this.b==a.b&&this.f==a.f:!1)};
Ca.prototype.ceil=function(){this.b=Math.ceil(this.b);this.f=Math.ceil(this.f);return this};
Ca.prototype.floor=function(){this.b=Math.floor(this.b);this.f=Math.floor(this.f);return this};
Ca.prototype.round=function(){this.b=Math.round(this.b);this.f=Math.round(this.f);return this};function Da(a,b){this.width=a;this.height=b}
l=Da.prototype;l.aspectRatio=function(){return this.width/this.height};
l.isEmpty=function(){return!(this.width*this.height)};
l.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
l.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
l.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function Ea(a){var b=Fa,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function Ga(){var a=C,b;for(b in a)return!1;return!0}
function Ha(a,b){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function Ia(a){var b={},c;for(c in a)b[c]=a[c];return b}
var Ja="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ka(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Ja.length;f++)c=Ja[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;function La(a){La[" "](a);return a}
La[" "]=t;function Ma(a,b){var c=Na;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)}
;function Oa(){var a=Pa;try{var b;if(b=!!a&&null!=a.location.href)a:{try{La(a.foo);b=!0;break a}catch(c){}b=!1}return b}catch(c){return!1}}
;var Qa=function(){var a=!1;try{var b=Object.defineProperty({},"passive",{get:function(){a=!0}});
n.addEventListener("test",null,b)}catch(c){}return a}();var Ra=!1,Sa="";function Ta(a){a=a.match(/[\d]+/g);if(!a)return"";a.length=3;return a.join(".")}
(function(){if(navigator.plugins&&navigator.plugins.length){var a=navigator.plugins["Shockwave Flash"];if(a&&(Ra=!0,a.description)){Sa=Ta(a.description);return}if(navigator.plugins["Shockwave Flash 2.0"]){Ra=!0;Sa="2.0.0.11";return}}if(navigator.mimeTypes&&navigator.mimeTypes.length&&(a=navigator.mimeTypes["application/x-shockwave-flash"],Ra=!(!a||!a.enabledPlugin))){Sa=Ta(a.enabledPlugin.description);return}try{var b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");Ra=!0;Sa=Ta(b.GetVariable("$version"));
return}catch(c){}try{b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");Ra=!0;Sa="6.0.21";return}catch(c){}try{b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),Ra=!0,Sa=Ta(b.GetVariable("$version"))}catch(c){}})();
var Ua=Ra,Va=Sa;var E;a:{var Wa=n.navigator;if(Wa){var Xa=Wa.userAgent;if(Xa){E=Xa;break a}}E=""}function F(a){return-1!=E.indexOf(a)}
;function Ya(){return(F("Chrome")||F("CriOS"))&&!F("Edge")}
;function Za(){return F("iPhone")&&!F("iPod")&&!F("iPad")}
;var $a=F("Opera"),G=F("Trident")||F("MSIE"),ab=F("Edge"),bb=F("Gecko")&&!(-1!=E.toLowerCase().indexOf("webkit")&&!F("Edge"))&&!(F("Trident")||F("MSIE"))&&!F("Edge"),cb=-1!=E.toLowerCase().indexOf("webkit")&&!F("Edge"),db=F("Macintosh"),eb=F("Windows"),fb=F("Android"),gb=Za(),hb=F("iPad"),ib=F("iPod");function jb(){var a=n.document;return a?a.documentMode:void 0}
var kb;a:{var lb="",mb=function(){var a=E;if(bb)return/rv\:([^\);]+)(\)|;)/.exec(a);if(ab)return/Edge\/([\d\.]+)/.exec(a);if(G)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(cb)return/WebKit\/(\S+)/.exec(a);if($a)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
mb&&(lb=mb?mb[1]:"");if(G){var nb=jb();if(null!=nb&&nb>parseFloat(lb)){kb=String(nb);break a}}kb=lb}var ob=kb,Na={};
function I(a){return Ma(a,function(){for(var b=0,c=sa(String(ob)).split("."),d=sa(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==g[0].length&&0==h[0].length)break;b=ta(0==g[1].length?0:parseInt(g[1],10),0==h[1].length?0:parseInt(h[1],10))||ta(0==g[2].length,0==h[2].length)||ta(g[2],h[2]);g=g[3];h=h[3]}while(0==b)}return 0<=b})}
var pb;var qb=n.document;pb=qb&&G?jb()||("CSS1Compat"==qb.compatMode?parseInt(ob,10):5):void 0;(function(){if(eb){var a=/Windows NT ([0-9.]+)/;return(a=a.exec(E))?a[1]:"0"}return db?(a=/10[_.][0-9_.]+/,(a=a.exec(E))?a[0].replace(/_/g,"."):"10"):fb?(a=/Android\s+([^\);]+)(\)|;)/,(a=a.exec(E))?a[1]:""):gb||hb||ib?(a=/(?:iPhone|CPU)\s+OS\s+(\S+)/,(a=a.exec(E))?a[1].replace(/_/g,"."):""):""})();var rb=F("Firefox"),sb=Za()||F("iPod"),tb=F("iPad"),ub=F("Android")&&!(Ya()||F("Firefox")||F("Opera")||F("Silk")),vb=Ya(),wb=F("Safari")&&!(Ya()||F("Coast")||F("Opera")||F("Edge")||F("Silk")||F("Android"))&&!(Za()||F("iPad")||F("iPod"));function xb(a){return(a=a.exec(E))?a[1]:""}
(function(){if(rb)return xb(/Firefox\/([0-9.]+)/);if(G||ab||$a)return ob;if(vb)return Za()||F("iPad")||F("iPod")?xb(/CriOS\/([0-9.]+)/):xb(/Chrome\/([0-9.]+)/);if(wb&&!(Za()||F("iPad")||F("iPod")))return xb(/Version\/([0-9.]+)/);if(sb||tb){var a=/Version\/(\S+).*Mobile\/(\S+)/.exec(E);if(a)return a[1]+"."+a[2]}else if(ub)return(a=xb(/Android\s+([0-9.]+)/))?a:xb(/Version\/([0-9.]+)/);return""})();!bb&&!G||G&&9<=Number(pb)||bb&&I("1.9.1");G&&I("9");function yb(){this.b="";this.f=zb}
yb.prototype.ma=!0;yb.prototype.la=function(){return this.b};
var zb={};function Ab(){this.b="";this.f=Bb}
Ab.prototype.ma=!0;Ab.prototype.la=function(){return this.b};
function Cb(a){return a instanceof Ab&&a.constructor===Ab&&a.f===Bb?a.b:"type_error:SafeUrl"}
var Db=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;function Eb(a){if(a instanceof Ab)return a;a=a.ma?a.la():String(a);Db.test(a)||(a="about:invalid#zClosurez");return Fb(a)}
var Bb={};function Fb(a){var b=new Ab;b.b=a;return b}
Fb("about:blank");function Gb(){this.b=""}
Gb.prototype.ma=!0;Gb.prototype.la=function(){return this.b};
function Hb(a){var b=new Gb;b.b=a;return b}
Hb("<!DOCTYPE html>");Hb("");Hb("<br>");function Ib(a,b){var c=b instanceof Ab?b:Eb(b);a.href=Cb(c)}
;function Jb(a){var b=document;return u(a)?b.getElementById(a):a}
function Kb(a){if(!a)return null;if(a.firstChild)return a.firstChild;for(;a&&!a.nextSibling;)a=a.parentNode;return a?a.nextSibling:null}
function Lb(a){if(!a)return null;if(!a.previousSibling)return a.parentNode;for(a=a.previousSibling;a&&a.lastChild;)a=a.lastChild;return a}
function Mb(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;function Nb(a){Ob();var b=new yb;b.b=a;return b}
var Ob=t;function Pb(a){"number"==typeof a&&(a=Math.round(a)+"px");return a}
;var Qb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function J(a){return a.match(Qb)}
function Rb(a){return a?decodeURI(a):a}
function Sb(a){if(a[1]){var b=a[0],c=b.indexOf("#");0<=c&&(a.push(b.substr(c)),a[0]=b=b.substr(0,c));c=b.indexOf("?");0>c?a[1]="?":c==b.length-1&&(a[1]=void 0)}return a.join("")}
function Tb(a,b,c){if(ia(b))for(var d=0;d<b.length;d++)Tb(a,String(b[d]),c);else null!=b&&c.push("&",a,""===b?"":"=",encodeURIComponent(String(b)))}
function Ub(a,b){for(var c in b)Tb(c,b[c],a);return a}
;var Vb=!!window.google_async_iframe_id,Pa=Vb&&window.parent||window;function Wb(a,b){var c=Xb();this.label=a;this.type=b;this.value=c;this.duration=0;this.uniqueId=this.label+"_"+this.type+"_"+Math.random()}
;function Yb(a,b){this.events=[];this.f=b||n;var c=null;b&&(b.google_js_reporting_queue=b.google_js_reporting_queue||[],this.events=b.google_js_reporting_queue,c=b.google_measure_js_timing);a:{try{var d=(this.f||n).top.location.hash;if(d){var e=d.match(/\bdeid=([\d,]+)/);var f=e&&e[1]||"";break a}}catch(g){}f=""}f=f.indexOf&&0<=f.indexOf("1337");this.b=(this.b=null!=c?c:Math.random()<a)||f;c=this.f.performance;this.g=!!(c&&c.mark&&c.clearMarks&&f)}
Yb.prototype.i=function(a){if(a&&this.g){var b=this.f.performance;b.clearMarks("goog_"+a.uniqueId+"_start");b.clearMarks("goog_"+a.uniqueId+"_end")}};
Yb.prototype.start=function(a,b){if(!this.b)return null;var c=new Wb(a,b);this.g&&this.f.performance.mark("goog_"+c.uniqueId+"_start");return c};
Yb.prototype.end=function(a){this.b&&(a.duration=Xb()-a.value,this.g&&this.f.performance.mark("goog_"+a.uniqueId+"_end"),this.b&&this.events.push(a))};
function Xb(){var a=n.performance;return a&&a.now?a.now():w()}
;var Zb;if(Vb&&!Oa()){var $b="."+ra.domain;try{for(;2<$b.split(".").length&&!Oa();)ra.domain=$b=$b.substr($b.indexOf(".")+1),Pa=window.parent}catch(a){}Oa()||(Pa=window)}Zb=Pa;var ac=new Yb(1,Zb);function bc(){Zb.google_measure_js_timing||(ac.g&&B(ac.events,ac.i,ac),ac.events.length=0,ac.b=!1)}
if("complete"==Zb.document.readyState)bc();else if(ac.b){var cc=function(){bc()};
Zb.addEventListener?Zb.addEventListener("load",cc,Qa?void 0:!1):Zb.attachEvent&&Zb.attachEvent("onload",cc)};var dc=(new Date).getTime();function ec(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a&&"android-app"!==a&&"chrome-search"!==a)throw Error("Invalid URI scheme in origin");var c="",d=b.indexOf(":");if(-1!=d){var e=b.substring(d+
1),b=b.substring(0,d);if("http"===a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c}
;/*
 gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
var fc=window,gc=document,hc=fc.location;function ic(){}
var jc=/\[native code\]/;function K(a,b,c){return a[b]=a[b]||c}
function kc(a){for(var b=0;b<this.length;b++)if(this[b]===a)return b;return-1}
function lc(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a.length;d++){var e=a[d];e!=c&&b.push(e);c=e}return b}
function L(){var a;if((a=Object.create)&&jc.test(a))a=a(null);else{a={};for(var b in a)a[b]=void 0}return a}
var mc=K(fc,"gapi",{});var M;M=K(fc,"___jsl",L());K(M,"I",0);K(M,"hel",10);function nc(){var a=hc.href;if(M.dpo)var b=M.h;else{b=M.h;var c=RegExp("([#].*&|[#])jsh=([^&#]*)","g"),d=RegExp("([?#].*&|[?#])jsh=([^&#]*)","g");if(a=a&&(c.exec(a)||d.exec(a)))try{b=decodeURIComponent(a[2])}catch(e){}}return b}
function oc(a){var b=K(M,"PQ",[]);M.PQ=[];var c=b.length;if(0===c)a();else for(var d=0,e=function(){++d===c&&a()},f=0;f<c;f++)b[f](e)}
function pc(a){return K(K(M,"H",L()),a,L())}
;function qc(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;y=m=0}
function b(a){for(var b=g,c=0;64>c;c+=4)b[c/4]=a[c]<<24|a[c+1]<<16|a[c+2]<<8|a[c+3];for(c=16;80>c;c++)a=b[c-3]^b[c-8]^b[c-14]^b[c-16],b[c]=(a<<1|a>>>31)&4294967295;a=e[0];for(var d=e[1],f=e[2],h=e[3],k=e[4],m,D,c=0;80>c;c++)40>c?20>c?(m=h^d&(f^h),D=1518500249):(m=d^f^h,D=1859775393):60>c?(m=d&f|h&(d|f),D=2400959708):(m=d^f^h,D=3395469782),m=((a<<5|a>>>27)&4294967295)+m+k+D+b[c]&4294967295,k=h,h=f,f=(d<<30|d>>>2)&4294967295,d=a,a=m;e[0]=e[0]+a&4294967295;e[1]=e[1]+d&4294967295;e[2]=e[2]+f&4294967295;
e[3]=e[3]+h&4294967295;e[4]=e[4]+k&4294967295}
function c(a,c){if("string"===typeof a){a=unescape(encodeURIComponent(a));for(var d=[],e=0,g=a.length;e<g;++e)d.push(a.charCodeAt(e));a=d}c||(c=a.length);d=0;if(0==m)for(;d+64<c;)b(a.slice(d,d+64)),d+=64,y+=64;for(;d<c;)if(f[m++]=a[d++],y++,64==m)for(m=0,b(f);d+64<c;)b(a.slice(d,d+64)),d+=64,y+=64}
function d(){var a=[],d=8*y;56>m?c(h,56-m):c(h,64-(m-56));for(var g=63;56<=g;g--)f[g]=d&255,d>>>=8;b(f);for(g=d=0;5>g;g++)for(var k=24;0<=k;k-=8)a[d++]=e[g]>>k&255;return a}
for(var e=[],f=[],g=[],h=[128],k=1;64>k;++k)h[k]=0;var m,y;a();return{reset:a,update:c,digest:d,Ga:function(){for(var a=d(),b="",c=0;c<a.length;c++)b+="0123456789ABCDEF".charAt(Math.floor(a[c]/16))+"0123456789ABCDEF".charAt(a[c]%16);return b}}}
;function rc(a,b,c){var d=[],e=[];if(1==(ia(c)?2:1))return e=[b,a],B(d,function(a){e.push(a)}),sc(e.join(" "));
var f=[],g=[];B(c,function(a){g.push(a.key);f.push(a.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];B(d,function(a){e.push(a)});
a=sc(e.join(" "));a=[c,a];0==g.length||a.push(g.join(""));return a.join("_")}
function sc(a){var b=qc();b.update(a);return b.Ga().toLowerCase()}
;function tc(a){this.b=a||{cookie:""}}
l=tc.prototype;l.isEnabled=function(){return navigator.cookieEnabled};
l.set=function(a,b,c,d,e,f){if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');p(c)||(c=-1);e=e?";domain="+e:"";d=d?";path="+d:"";f=f?";secure":"";c=0>c?"":0==c?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(w()+1E3*c)).toUTCString();this.b.cookie=a+"="+b+e+d+c+f};
l.get=function(a,b){for(var c=a+"=",d=(this.b.cookie||"").split(";"),e=0,f;e<d.length;e++){f=sa(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
l.remove=function(a,b,c){var d=p(this.get(a));this.set(a,"",0,b,c);return d};
l.isEmpty=function(){return!this.b.cookie};
l.clear=function(){for(var a=(this.b.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=sa(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};
var uc=new tc("undefined"==typeof document?null:document);uc.f=3950;function vc(){var a=[],b=ec(String(n.location.href)),c=n.__OVERRIDE_SID;null==c&&(c=(new tc(document)).get("SID"));if(c&&(b=(c=0==b.indexOf("https:")||0==b.indexOf("chrome-extension:"))?n.__SAPISID:n.__APISID,null==b&&(b=(new tc(document)).get(c?"SAPISID":"APISID")),b)){var c=c?"SAPISIDHASH":"APISIDHASH",d=String(n.location.href);return d&&b&&c?[c,rc(ec(d),b,a||null)].join(" "):null}return null}
;var wc=K(M,"perf",L());K(wc,"g",L());var yc=K(wc,"i",L());K(wc,"r",[]);L();L();function zc(a,b,c){b&&0<b.length&&(b=Ac(b),c&&0<c.length&&(b+="___"+Ac(c)),28<b.length&&(b=b.substr(0,28)+(b.length-28)),c=b,b=K(yc,"_p",L()),K(b,c,L())[a]=(new Date).getTime(),b=wc.r,"function"===typeof b?b(a,"_p",c):b.push([a,"_p",c]))}
function Ac(a){return a.join("__").replace(/\./g,"_").replace(/\-/g,"_").replace(/\,/g,"_")}
;var Bc=L(),Cc=[];function O(a){throw Error("Bad hint"+(a?": "+a:""));}
Cc.push(["jsl",function(a){for(var b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b];"object"==typeof c?M[b]=K(M,b,[]).concat(c):K(M,b,c)}if(b=a.u)a=K(M,"us",[]),a.push(b),(b=/^https:(.*)$/.exec(b))&&a.push("http:"+b[1])}]);
var Dc=/^(\/[a-zA-Z0-9_\-]+)+$/,Ec=[/\/amp\//,/\/amp$/,/^\/amp$/],Fc=/^[a-zA-Z0-9\-_\.,!]+$/,Gc=/^gapi\.loaded_[0-9]+$/,Hc=/^[a-zA-Z0-9,._-]+$/;function Ic(a,b,c,d){var e=a.split(";"),f=e.shift(),g=Bc[f],h=null;g?h=g(e,b,c,d):O("no hint processor for: "+f);h||O("failed to generate load url");b=h;c=b.match(Jc);(d=b.match(Kc))&&1===d.length&&Lc.test(b)&&c&&1===c.length||O("failed sanity: "+a);return h}
function Mc(a,b,c,d){function e(a){return encodeURIComponent(a).replace(/%2C/g,",")}
a=Nc(a);Gc.test(c)||O("invalid_callback");b=Oc(b);d=d&&d.length?Oc(d):null;return[encodeURIComponent(a.ab).replace(/%2C/g,",").replace(/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+e(d):"","/rt=j/sv=1/d=1/ed=1",a.ra?"/am="+e(a.ra):"",a.za?"/rs="+e(a.za):"",a.Ca?"/t="+e(a.Ca):"","/cb=",e(c)].join("")}
function Nc(a){"/"!==a.charAt(0)&&O("relative path");for(var b=a.substring(1).split("/"),c=[];b.length;){a=b.shift();if(!a.length||0==a.indexOf("."))O("empty/relative directory");else if(0<a.indexOf("=")){b.unshift(a);break}c.push(a)}a={};for(var d=0,e=b.length;d<e;++d){var f=b[d].split("="),g=decodeURIComponent(f[0]),h=decodeURIComponent(f[1]);2==f.length&&g&&h&&(a[g]=a[g]||h)}b="/"+c.join("/");Dc.test(b)||O("invalid_prefix");c=0;for(d=Ec.length;c<d;++c)Ec[c].test(b)&&O("invalid_prefix");c=Pc(a,
"k",!0);d=Pc(a,"am");e=Pc(a,"rs");a=Pc(a,"t");return{ab:b,version:c,ra:d,za:e,Ca:a}}
function Oc(a){for(var b=[],c=0,d=a.length;c<d;++c){var e=a[c].replace(/\./g,"_").replace(/-/g,"_");Hc.test(e)&&b.push(e)}return b.join(",")}
function Pc(a,b,c){a=a[b];!a&&c&&O("missing: "+b);if(a){if(Fc.test(a))return a;O("invalid: "+b)}return null}
var Lc=/^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,Kc=/\/cb=/g,Jc=/\/\//g;function Qc(){var a=nc();if(!a)throw Error("Bad hint");return a}
Bc.m=function(a,b,c,d){(a=a[0])||O("missing_hint");return"https://apis.google.com"+Mc(a,b,c,d)};
var Rc=decodeURI("%73cript"),Sc=/^[-+_0-9\/A-Za-z]+={0,2}$/;function Tc(a,b){for(var c=[],d=0;d<a.length;++d){var e=a[d];e&&0>kc.call(b,e)&&c.push(e)}return c}
function Uc(){var a=M.nonce;if(void 0!==a)return a&&a===String(a)&&a.match(Sc)?a:M.nonce=null;var b=K(M,"us",[]);if(!b||!b.length)return M.nonce=null;for(var c=gc.getElementsByTagName(Rc),d=0,e=c.length;d<e;++d){var f=c[d];if(f.src&&(a=String(f.nonce||f.getAttribute("nonce")||"")||null)){for(var g=0,h=b.length;g<h&&b[g]!==f.src;++g);if(g!==h&&a&&a===String(a)&&a.match(Sc))return M.nonce=a}}return null}
function Vc(a){if("loading"!=gc.readyState)Wc(a);else{var b=Uc(),c="";null!==b&&(c=' nonce="'+b+'"');gc.write("<"+Rc+' src="'+encodeURI(a)+'"'+c+"></"+Rc+">")}}
function Wc(a){var b=gc.createElement(Rc);b.setAttribute("src",a);a=Uc();null!==a&&b.setAttribute("nonce",a);b.async="true";(a=gc.getElementsByTagName(Rc)[0])?a.parentNode.insertBefore(b,a):(gc.head||gc.body||gc.documentElement).appendChild(b)}
function Xc(a,b){var c=b&&b._c;if(c)for(var d=0;d<Cc.length;d++){var e=Cc[d][0],f=Cc[d][1];f&&Object.prototype.hasOwnProperty.call(c,e)&&f(c[e],a,b)}}
function Yc(a,b,c){Zc(function(){var c=b===nc()?K(mc,"_",L()):L();c=K(pc(b),"_",c);a(c)},c)}
function $c(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);Xc(a,c);var d=a?a.split(":"):[],e=c.h||Qc(),f=K(M,"ah",L());if(f["::"]&&d.length){for(var g=[],h=null;h=d.shift();){var k=h.split("."),k=f[h]||f[k[1]&&"ns:"+k[0]||""]||e,m=g.length&&g[g.length-1]||null,y=m;m&&m.hint==k||(y={hint:k,features:[]},g.push(y));y.features.push(h)}var D=g.length;if(1<D){var N=c.callback;N&&(c.callback=function(){0==--D&&N()})}for(;d=g.shift();)ad(d.features,c,d.hint)}else ad(d||[],c,e)}
function ad(a,b,c){function d(a,b){if(D)return 0;fc.clearTimeout(y);N.push.apply(N,H);var d=((mc||{}).config||{}).update;d?d(f):f&&K(M,"cu",[]).push(f);if(b){zc("me0",a,ua);try{Yc(b,c,m)}finally{zc("me1",a,ua)}}return 1}
a=lc(a)||[];var e=b.callback,f=b.config,g=b.timeout,h=b.ontimeout,k=b.onerror,m=void 0;"function"==typeof k&&(m=k);var y=null,D=!1;if(g&&!h||!g&&h)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";var k=K(pc(c),"r",[]).sort(),N=K(pc(c),"L",[]).sort(),ua=[].concat(k);0<g&&(y=fc.setTimeout(function(){D=!0;h()},g));
var H=Tc(a,N);if(H.length){var H=Tc(a,k),ga=K(M,"CP",[]),ha=ga.length;ga[ha]=function(a){function b(){var a=ga[ha+1];a&&a()}
function c(b){ga[ha]=null;d(H,a)&&oc(function(){e&&e();b()})}
if(!a)return 0;zc("ml1",H,ua);0<ha&&ga[ha-1]?ga[ha]=function(){c(b)}:c(b)};
if(H.length){var xc="loaded_"+M.I++;mc[xc]=function(a){ga[ha](a);mc[xc]=null};
a=Ic(c,H,"gapi."+xc,k);k.push.apply(k,H);zc("ml0",H,ua);b.sync||fc.___gapisync?Vc(a):Wc(a)}else ga[ha](ic)}else d(H)&&e&&e()}
function Zc(a,b){if(M.hee&&0<M.hel)try{return a()}catch(c){b&&b(c),M.hel--,$c("debug_error",function(){try{window.___jsl.hefn(c)}catch(d){throw c;}})}else try{return a()}catch(c){throw b&&b(c),c;
}}
mc.load=function(a,b){return Zc(function(){return $c(a,b)})};function bd(a,b,c){this.i=c;this.g=a;this.j=b;this.f=0;this.b=null}
bd.prototype.get=function(){if(0<this.f){this.f--;var a=this.b;this.b=a.next;a.next=null}else a=this.g();return a};
function cd(a,b){a.j(b);a.f<a.i&&(a.f++,b.next=a.b,a.b=b)}
;function dd(a){n.setTimeout(function(){throw a;},0)}
var ed;
function fd(){var a=n.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!F("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=v(function(a){if(("*"==d||a.origin==d)&&a.data==
c)this.port1.onmessage()},this);
b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});
if("undefined"!==typeof a&&!F("Trident")&&!F("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.ta;c.ta=null;a()}};
return function(a){d.next={ta:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");
b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};
document.documentElement.appendChild(b)}:function(a){n.setTimeout(a,0)}}
;function gd(){this.f=this.b=null}
var id=new bd(function(){return new hd},function(a){a.reset()},100);
gd.prototype.remove=function(){var a=null;this.b&&(a=this.b,this.b=this.b.next,this.b||(this.f=null),a.next=null);return a};
function hd(){this.next=this.scope=this.b=null}
hd.prototype.set=function(a,b){this.b=a;this.scope=b;this.next=null};
hd.prototype.reset=function(){this.next=this.scope=this.b=null};function jd(a,b){kd||ld();md||(kd(),md=!0);var c=nd,d=id.get();d.set(a,b);c.f?c.f.next=d:c.b=d;c.f=d}
var kd;function ld(){if(-1!=String(n.Promise).indexOf("[native code]")){var a=n.Promise.resolve(void 0);kd=function(){a.then(od)}}else kd=function(){var a=od;
!ka(n.setImmediate)||n.Window&&n.Window.prototype&&!F("Edge")&&n.Window.prototype.setImmediate==n.setImmediate?(ed||(ed=fd()),ed(a)):n.setImmediate(a)}}
var md=!1,nd=new gd;function od(){for(var a;a=nd.remove();){try{a.b.call(a.scope)}catch(b){dd(b)}cd(id,a)}md=!1}
;function P(){this.f=this.f;this.F=this.F}
P.prototype.f=!1;P.prototype.dispose=function(){this.f||(this.f=!0,this.o())};
function pd(a,b){a.f?p(void 0)?b.call(void 0):b():(a.F||(a.F=[]),a.F.push(p(void 0)?v(b,void 0):b))}
P.prototype.o=function(){if(this.F)for(;this.F.length;)this.F.shift()()};
function qd(a){a&&"function"==typeof a.dispose&&a.dispose()}
function rd(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];ja(d)?rd.apply(null,d):qd(d)}}
;var sd="StopIteration"in n?n.StopIteration:{message:"StopIteration",stack:""};function td(){}
td.prototype.next=function(){throw sd;};
td.prototype.da=function(){return this};
function ud(a){if(a instanceof td)return a;if("function"==typeof a.da)return a.da(!1);if(ja(a)){var b=0,c=new td;c.next=function(){for(;;){if(b>=a.length)throw sd;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function vd(a,b){if(ja(a))try{B(a,b,void 0)}catch(c){if(c!==sd)throw c;}else{a=ud(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==sd)throw c;}}}
function wd(a){if(ja(a))return Aa(a);a=ud(a);var b=[];vd(a,function(a){b.push(a)});
return b}
;G&&I("9");!cb||I("528");bb&&I("1.9b")||G&&I("8")||$a&&I("9.5")||cb&&I("528");bb&&!I("8")||G&&I("9");function xd(a){return/^\s*$/.test(a)?!1:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,""))}
function yd(a){a=String(a);if(xd(a))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}
function zd(a){var b=[];Ad(new Bd,a,b);return b.join("")}
function Bd(){}
function Ad(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(ia(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),Ad(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),Cd(d,c),c.push(":"),Ad(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":Cd(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var Dd={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ed=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;function Cd(a,b){b.push('"',a.replace(Ed,function(a){var b=Dd[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),Dd[a]=b);return b}),'"')}
;function Fd(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0}
;function Q(a,b){this.b=0;this.w=void 0;this.i=this.f=this.g=null;this.j=this.l=!1;if(a!=t)try{var c=this;a.call(b,function(a){Gd(c,2,a)},function(a){Gd(c,3,a)})}catch(d){Gd(this,3,d)}}
function Hd(){this.next=this.context=this.f=this.g=this.b=null;this.i=!1}
Hd.prototype.reset=function(){this.context=this.f=this.g=this.b=null;this.i=!1};
var Id=new bd(function(){return new Hd},function(a){a.reset()},100);
function Jd(a,b,c){var d=Id.get();d.g=a;d.f=b;d.context=c;return d}
function Kd(a){if(a instanceof Q)return a;var b=new Q(t);Gd(b,2,a);return b}
function Ld(a){return new Q(function(b,c){c(a)})}
Q.prototype.then=function(a,b,c){return Md(this,ka(a)?a:null,ka(b)?b:null,c)};
Fd(Q);Q.prototype.cancel=function(a){0==this.b&&jd(function(){var b=new Nd(a);Od(this,b)},this)};
function Od(a,b){if(0==a.b)if(a.g){var c=a.g;if(c.f){for(var d=0,e=null,f=null,g=c.f;g&&(g.i||(d++,g.b==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.b&&1==d?Od(c,b):(f?(d=f,d.next==c.i&&(c.i=d),d.next=d.next.next):Pd(c),Qd(c,e,3,b)))}a.g=null}else Gd(a,3,b)}
function Rd(a,b){a.f||2!=a.b&&3!=a.b||Sd(a);a.i?a.i.next=b:a.f=b;a.i=b}
function Md(a,b,c,d){var e=Jd(null,null,null);e.b=new Q(function(a,g){e.g=b?function(c){try{var e=b.call(d,c);a(e)}catch(m){g(m)}}:a;
e.f=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof Nd?g(b):a(e)}catch(m){g(m)}}:g});
e.b.g=a;Rd(a,e);return e.b}
Q.prototype.C=function(a){this.b=0;Gd(this,2,a)};
Q.prototype.F=function(a){this.b=0;Gd(this,3,a)};
function Gd(a,b,c){if(0==a.b){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.b=1;a:{var d=c,e=a.C,f=a.F;if(d instanceof Q){Rd(d,Jd(e||t,f||null,a));var g=!0}else{if(d)try{var h=!!d.$goog_Thenable}catch(m){h=!1}else h=!1;if(h)d.then(e,f,a),g=!0;else{if(la(d))try{var k=d.then;if(ka(k)){Td(d,k,e,f,a);g=!0;break a}}catch(m){f.call(a,m);g=!0;break a}g=!1}}}g||(a.w=c,a.b=b,a.g=null,Sd(a),3!=b||c instanceof Nd||Ud(a,c))}}
function Td(a,b,c,d,e){function f(a){h||(h=!0,d.call(e,a))}
function g(a){h||(h=!0,c.call(e,a))}
var h=!1;try{b.call(a,g,f)}catch(k){f(k)}}
function Sd(a){a.l||(a.l=!0,jd(a.B,a))}
function Pd(a){var b=null;a.f&&(b=a.f,a.f=b.next,b.next=null);a.f||(a.i=null);return b}
Q.prototype.B=function(){for(var a;a=Pd(this);)Qd(this,a,this.b,this.w);this.l=!1};
function Qd(a,b,c,d){if(3==c&&b.f&&!b.i)for(;a&&a.j;a=a.g)a.j=!1;if(b.b)b.b.g=null,Vd(b,c,d);else try{b.i?b.g.call(b.context):Vd(b,c,d)}catch(e){Wd.call(null,e)}cd(Id,b)}
function Vd(a,b,c){2==b?a.g.call(a.context,c):a.f&&a.f.call(a.context,c)}
function Ud(a,b){a.j=!0;jd(function(){a.j&&Wd.call(null,b)})}
var Wd=dd;function Nd(a){A.call(this,a)}
x(Nd,A);Nd.prototype.name="cancel";function R(a){P.call(this);this.l=1;this.i=[];this.j=0;this.b=[];this.g={};this.w=!!a}
x(R,P);l=R.prototype;l.subscribe=function(a,b,c){var d=this.g[a];d||(d=this.g[a]=[]);var e=this.l;this.b[e]=a;this.b[e+1]=b;this.b[e+2]=c;this.l=e+3;d.push(e);return e};
function Xd(a,b,c,d){if(b=a.g[b]){var e=a.b;(b=ya(b,function(a){return e[a+1]==c&&e[a+2]==d}))&&a.K(b)}}
l.K=function(a){var b=this.b[a];if(b){var c=this.g[b];0!=this.j?(this.i.push(a),this.b[a+1]=t):(c&&za(c,a),delete this.b[a],delete this.b[a+1],delete this.b[a+2])}return!!b};
l.W=function(a,b){var c=this.g[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.w)for(e=0;e<c.length;e++){var g=c[e];Yd(this.b[g+1],this.b[g+2],d)}else{this.j++;try{for(e=0,f=c.length;e<f;e++)g=c[e],this.b[g+1].apply(this.b[g+2],d)}finally{if(this.j--,0<this.i.length&&0==this.j)for(;g=this.i.pop();)this.K(g)}}return 0!=e}return!1};
function Yd(a,b,c){jd(function(){a.apply(b,c)})}
l.clear=function(a){if(a){var b=this.g[a];b&&(B(b,this.K,this),delete this.g[a])}else this.b.length=0,this.g={}};
l.o=function(){R.A.o.call(this);this.clear();this.i.length=0};function Zd(a){this.b=a}
Zd.prototype.set=function(a,b){p(b)?this.b.set(a,zd(b)):this.b.remove(a)};
Zd.prototype.get=function(a){try{var b=this.b.get(a)}catch(c){return}if(null!==b)try{return yd(b)}catch(c){throw"Storage: Invalid value was encountered";}};
Zd.prototype.remove=function(a){this.b.remove(a)};function $d(a){this.b=a}
x($d,Zd);function ae(a){this.data=a}
function be(a){return!p(a)||a instanceof ae?a:new ae(a)}
$d.prototype.set=function(a,b){$d.A.set.call(this,a,be(b))};
$d.prototype.f=function(a){a=$d.A.get.call(this,a);if(!p(a)||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
$d.prototype.get=function(a){if(a=this.f(a)){if(a=a.data,!p(a))throw"Storage: Invalid value was encountered";}else a=void 0;return a};function ce(a){this.b=a}
x(ce,$d);ce.prototype.set=function(a,b,c){if(b=be(b)){if(c){if(c<w()){ce.prototype.remove.call(this,a);return}b.expiration=c}b.creation=w()}ce.A.set.call(this,a,b)};
ce.prototype.f=function(a,b){var c=ce.A.f.call(this,a);if(c){var d;if(d=!b){d=c.creation;var e=c.expiration;d=!!e&&e<w()||!!d&&d>w()}if(d)ce.prototype.remove.call(this,a);else return c}};function de(a){this.b=a}
x(de,ce);function ee(){}
;function fe(){}
x(fe,ee);fe.prototype.clear=function(){var a=wd(this.da(!0)),b=this;B(a,function(a){b.remove(a)})};function ge(a){this.b=a}
x(ge,fe);l=ge.prototype;l.isAvailable=function(){if(!this.b)return!1;try{return this.b.setItem("__sak","1"),this.b.removeItem("__sak"),!0}catch(a){return!1}};
l.set=function(a,b){try{this.b.setItem(a,b)}catch(c){if(0==this.b.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
l.get=function(a){a=this.b.getItem(a);if(!u(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
l.remove=function(a){this.b.removeItem(a)};
l.da=function(a){var b=0,c=this.b,d=new td;d.next=function(){if(b>=c.length)throw sd;var d=c.key(b++);if(a)return d;d=c.getItem(d);if(!u(d))throw"Storage mechanism: Invalid value was encountered";return d};
return d};
l.clear=function(){this.b.clear()};
l.key=function(a){return this.b.key(a)};function he(){var a=null;try{a=window.localStorage||null}catch(b){}this.b=a}
x(he,ge);function ie(){var a=null;try{a=window.sessionStorage||null}catch(b){}this.b=a}
x(ie,ge);var je=window.performance&&window.performance.timing&&window.performance.now?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()},ke="Microsoft Internet Explorer"==navigator.appName;
function le(a,b){if(1<b.length)a[b[0]]=b[1];else{var c=b[0],d;for(d in c)a[d]=c[d]}}
;var me=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};q("yt.config_",me,void 0);function S(a){le(me,arguments)}
function T(a,b){return a in me?me[a]:b}
;function U(a,b){var c=r("yt.logging.errors.log");c?c(a,b,void 0,void 0,void 0):(c=T("ERRORS",[]),c.push([a,b,void 0,void 0,void 0]),S("ERRORS",c))}
function ne(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){U(b)}}:a}
;function V(a){return T("EXPERIMENT_FLAGS",{})[a]}
;var oe={};function pe(a){return oe[a]||(oe[a]=String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()}))}
function qe(a,b){return a?a.dataset?a.dataset[pe(b)]:a.getAttribute("data-"+b):null}
function re(a){a&&(a.dataset?a.dataset[pe("loaded")]="true":a.setAttribute("data-loaded","true"))}
;function W(a,b){ka(a)&&(a=ne(a));return window.setTimeout(a,b)}
;var se=r("ytPubsubPubsubInstance")||new R;R.prototype.subscribe=R.prototype.subscribe;R.prototype.unsubscribeByKey=R.prototype.K;R.prototype.publish=R.prototype.W;R.prototype.clear=R.prototype.clear;q("ytPubsubPubsubInstance",se,void 0);var te=r("ytPubsubPubsubSubscribedKeys")||{};q("ytPubsubPubsubSubscribedKeys",te,void 0);var ue=r("ytPubsubPubsubTopicToKeys")||{};q("ytPubsubPubsubTopicToKeys",ue,void 0);var ve=r("ytPubsubPubsubIsSynchronous")||{};q("ytPubsubPubsubIsSynchronous",ve,void 0);
function we(a,b){var c=xe();if(c){var d=c.subscribe(a,function(){var c=arguments;var f=function(){te[d]&&b.apply(window,c)};
try{ve[a]?f():W(f,0)}catch(g){U(g)}},void 0);
te[d]=!0;ue[a]||(ue[a]=[]);ue[a].push(d);return d}return 0}
function xe(){return r("ytPubsubPubsubInstance")}
function ye(a){ue[a]&&(a=ue[a],B(a,function(a){te[a]&&delete te[a]}),a.length=0)}
function ze(a){var b=xe();if(b)if(b.clear(a),a)ye(a);else for(var c in ue)ye(c)}
function Ae(a,b){var c=xe();c&&c.publish.apply(c,arguments)}
function Be(a){var b=xe();b&&("number"==typeof a?a=[a]:u(a)&&(a=[parseInt(a,10)]),B(a,function(a){b.unsubscribeByKey(a);delete te[a]}))}
;var Ce=/\.vflset|-vfl[a-zA-Z0-9_+=-]+/,De=/-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/;function Ee(a,b){var c=Fe(a),d=document.getElementById(c),e=d&&qe(d,"loaded"),f=d&&!e;if(e)b&&b();else{if(b){var e=we(c,b),g=""+(b[ma]||(b[ma]=++na));Ge[g]=e}f||(d=He(a,c,function(){qe(d,"loaded")||(re(d),Ae(c),W(qa(ze,c),0))}))}}
function He(a,b,c){var d=document.createElement("script");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
d.onreadystatechange=function(){switch(d.readyState){case "loaded":case "complete":d.onload()}};
d.src=a;a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(d,a.firstChild);return d}
function Ie(a){a=Fe(a);var b=document.getElementById(a);b&&(ze(a),b.parentNode.removeChild(b))}
function Je(a,b){if(a&&b){var c=""+(b[ma]||(b[ma]=++na));(c=Ge[c])&&Be(c)}}
function Fe(a){var b=document.createElement("a");Ib(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+va(a)}
var Ge={};function Ke(a,b){if(window.spf){var c="";if(a){var d=a.indexOf("jsbin/"),e=a.lastIndexOf(".js"),f=d+6;-1<d&&-1<e&&e>f&&(c=a.substring(f,e),c=c.replace(Ce,""),c=c.replace(De,""),c=c.replace("debug-",""),c=c.replace("tracing-",""))}spf.script.load(a,c,b)}else Ee(a,b)}
;var Le=null;function Me(){var a=T("BG_I",null),b=T("BG_IU",null),c=T("BG_P",void 0);b?Ke(b,function(){window.botguard?Ne(c):(Ie(b),U(Error("Unable to load Botguard from "+b)))}):a&&(eval(a),Ne(c))}
function Ne(a){Le=new window.botguard.bg(a);V("botguard_periodic_refresh")?je():V("botguard_always_refresh")}
function Oe(){return null!=Le}
function Pe(){return Le?Le.invoke():null}
;w();var Qe=p(XMLHttpRequest)?function(){return new XMLHttpRequest}:p(ActiveXObject)?function(){return new ActiveXObject("Microsoft.XMLHTTP")}:null;
function Re(){if(!Qe)return null;var a=Qe();return"open"in a?a:null}
function Se(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;function Te(a){"?"==a.charAt(0)&&(a=a.substr(1));a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length){var f=decodeURIComponent((e[0]||"").replace(/\+/g," ")),e=decodeURIComponent((e[1]||"").replace(/\+/g," "));f in b?ia(b[f])?Ba(b[f],e):b[f]=[b[f],e]:b[f]=e}}return b}
function Ue(a,b){var c=a.split("#",2);a=c[0];var c=1<c.length?"#"+c[1]:"",d=a.split("?",2);a=d[0];var d=Te(d[1]||""),e;for(e in b)d[e]=b[e];return Sb(Ub([a],d))+c}
function Ve(a){a=Ub([],a);a[0]="";return a.join("")}
;var We={"X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"};
function Xe(a,b){b=void 0===b?{}:b;var c=void 0;c=window.location.href;var d=J(a)[1]||null,e=Rb(J(a)[3]||null);d&&e?(d=c,c=J(a),d=J(d),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?Rb(J(c)[3]||null)==e&&(Number(J(c)[4]||null)||null)==(Number(J(a)[4]||null)||null):!0;for(var f in We){if((e=d=T(We[f]))&&!(e=c)){var g=a,e=f,h=T("CORS_HEADER_WHITELIST")||{};e=(g=Rb(J(g)[3]||null))?(h=h[g])?0<=wa(h,e):!1:!0}e&&(b[f]=d)}return b}
function Ye(a,b){var c=T("XSRF_FIELD_NAME",void 0),d;b.headers&&(d=b.headers["Content-Type"]);return!b.rb&&(!Rb(J(a)[3]||null)||b.withCredentials||Rb(J(a)[3]||null)==document.location.hostname)&&"POST"==b.method&&(!d||"application/x-www-form-urlencoded"==d)&&!(b.D&&b.D[c])}
function Ze(a,b){var c=b.format||"JSON";b.La&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var d=T("XSRF_FIELD_NAME",void 0),e=T("XSRF_TOKEN",void 0),f=b.lb;f&&(f[d]&&delete f[d],a=Ue(a,f||{}));var g=b.postBody||"",f=b.D;Ye(a,b)&&(f||(f={}),f[d]=e);f&&u(g)&&(d=Te(g),Ka(d,f),g=b.xa&&"JSON"==b.xa?JSON.stringify(d):Ve(d));var h=!1,k,m=$e(a,function(a){if(!h){h=!0;k&&window.clearTimeout(k);var d=Se(a),e=null;if(d||400<=a.status&&
500>a.status)e=af(c,a,b.qb);if(d)a:if(204==a.status)d=!0;else{switch(c){case "XML":d=0==parseInt(e&&e.return_code,10);break a;case "RAW":d=!0;break a}d=!!e}var e=e||{},f=b.context||n;d?b.J&&b.J.call(f,a,e):b.onError&&b.onError.call(f,a,e);b.Ra&&b.Ra.call(f,a,e)}},b.method,g,b.headers,b.responseType,b.withCredentials);
b.O&&0<b.timeout&&(k=W(function(){h||(h=!0,m.abort(),window.clearTimeout(k),b.O.call(b.context||n,m))},b.timeout))}
function af(a,b,c){var d=null;switch(a){case "JSON":a=b.responseText;b=b.getResponseHeader("Content-Type")||"";a&&0<=b.indexOf("json")&&(d=JSON.parse(a));break;case "XML":if(b=(b=b.responseXML)?bf(b):null)d={},B(b.getElementsByTagName("*"),function(a){d[a.tagName]=cf(a)})}c&&df(d);
return d}
function df(a){if(la(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d=Hb(a[b]);a[c]=d}else df(a[b])}}
function bf(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function cf(a){var b="";B(a.childNodes,function(a){b+=a.nodeValue});
return b}
function ef(a,b){b.method="POST";b.D||(b.D={});Ze(a,b)}
function $e(a,b,c,d,e,f,g){function h(){4==(k&&"readyState"in k?k.readyState:0)&&b&&ne(b)(k)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var k=Re();if(!k)return null;"onloadend"in k?k.addEventListener("loadend",h,!1):k.onreadystatechange=h;k.open(c,a,!0);f&&(k.responseType=f);g&&(k.withCredentials=!0);c="POST"==c;if(e=Xe(a,e))for(var m in e)k.setRequestHeader(m,e[m]),"content-type"==m.toLowerCase()&&(c=!1);c&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);return k}
;var ff={},gf=0;function hf(a,b){a&&(T("USE_NET_AJAX_FOR_PING_TRANSPORT",!1)?$e(a,b):jf(a,b))}
function jf(a,b){var c=new Image,d=""+gf++;ff[d]=c;c.onload=c.onerror=function(){b&&ff[d]&&b();delete ff[d]};
c.src=a}
;function kf(a,b,c,d,e){c={name:c||T("INNERTUBE_CONTEXT_CLIENT_NAME",1),version:d||T("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0)};e=window&&window.yterr||e||!1;if(a&&e&&!(5<=lf)){e=a.stacktrace;d=a.columnNumber;var f=r("window.location.href");if(u(a))a={message:a,name:"Unknown error",lineNumber:"Not available",fileName:f,stack:"Not available"};else{var g=!1;try{var h=a.lineNumber||a.line||"Not available"}catch(D){h="Not available",g=!0}try{var k=a.fileName||a.filename||a.sourceURL||n.$googDebugFname||
f}catch(D){k="Not available",g=!0}a=!g&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name?a:{message:a.message||"Not available",name:a.name||"UnknownError",lineNumber:h,fileName:k,stack:a.stack||"Not available"}}e=e||a.stack;h=a.lineNumber.toString();isNaN(h)||isNaN(d)||(h=h+":"+d);if(!(mf[a.message]||0<=e.indexOf("/YouTubeCenter.js")||0<=e.indexOf("/mytube.js"))){k=a.fileName;b={lb:{a:"logerror",t:"jserror",type:a.name,msg:a.message.substr(0,1E3),line:h,level:b||"ERROR"},D:{url:T("PAGE_NAME",
window.location.href),file:k},method:"POST"};e&&(b.D.stack=e);for(var m in c)b.D["client."+m]=c[m];if(m=T("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(var y in m)b.D[y]=m[y];Ze("/error_204",b);mf[a.message]=!0;lf++}}}
var mf={},lf=0;var nf=window.yt&&window.yt.msgs_||window.ytcfg&&window.ytcfg.msgs||{};q("yt.msgs_",nf,void 0);function of(a){le(nf,arguments)}
;function pf(a,b){var c=5E3;isNaN(c)&&(c=void 0);var d=r("yt.scheduler.instance.addJob");return d?d(a,b,c):void 0===c?(a(),NaN):W(a,c||0)}
;var qf=[],rf=!1;function sf(){function a(){rf=!0;"google_ad_status"in window?S("DCLKSTAT",1):S("DCLKSTAT",2)}
Ke("//static.doubleclick.net/instream/ad_status.js",a);qf.push(pf(function(){rf||"google_ad_status"in window||(Je("//static.doubleclick.net/instream/ad_status.js",a),S("DCLKSTAT",3))},1))}
function tf(){return parseInt(T("DCLKSTAT",0),10)}
;var uf=0,vf=r("ytDomDomGetNextId")||function(){return++uf};
q("ytDomDomGetNextId",vf,void 0);var wf={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function xf(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=this.touches=null;if(a=a||window.event){this.event=a;for(var b in a)b in wf||(this[b]=a[b]);(b=a.target||a.srcElement)&&3==b.nodeType&&(b=b.parentNode);this.target=b;if(b=a.relatedTarget)try{b=b.nodeName?b:null}catch(c){b=null}else"mouseover"==this.type?b=a.fromElement:
"mouseout"==this.type&&(b=a.toElement);this.relatedTarget=b;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey}}
xf.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
xf.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
xf.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var Fa=r("ytEventsEventsListeners")||{};q("ytEventsEventsListeners",Fa,void 0);var yf=r("ytEventsEventsCounter")||{count:0};q("ytEventsEventsCounter",yf,void 0);function zf(a,b,c,d){d=void 0===d?!1:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return Ea(function(e){return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&e[4]==!!d})}
function Af(a,b,c){var d=void 0===d?!1:d;if(!a||!a.addEventListener&&!a.attachEvent)return"";var e=zf(a,b,c,d);if(e)return e;var e=++yf.count+"",f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var g=f?function(d){d=new xf(d);if(!Mb(d.relatedTarget,function(b){return b==a}))return d.currentTarget=a,d.type=b,c.call(a,d)}:function(b){b=new xf(b);
b.currentTarget=a;return c.call(a,b)};
g=ne(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),a.addEventListener(b,g,d)):a.attachEvent("on"+b,g);Fa[e]=[a,b,c,g,d];return e}
function Bf(a){a&&("string"==typeof a&&(a=[a]),B(a,function(a){if(a in Fa){var b=Fa[a],d=b[0],e=b[1],f=b[3],b=b[4];d.removeEventListener?d.removeEventListener(e,f,b):d.detachEvent&&d.detachEvent("on"+e,f);delete Fa[a]}}))}
;function Cf(){if(null==r("_lact",window)){var a=parseInt(T("LACT"),10),a=isFinite(a)?w()-Math.max(a,0):-1;q("_lact",a,window);q("_fact",a,window);-1==a&&Df();Af(document,"keydown",Df);Af(document,"keyup",Df);Af(document,"mousedown",Df);Af(document,"mouseup",Df);we("page-mouse",Df);we("page-scroll",Df);we("page-resize",Df)}}
function Df(){null==r("_lact",window)&&(Cf(),r("_lact",window));var a=w();q("_lact",a,window);-1==r("_fact",window)&&q("_fact",a,window);Ae("USER_ACTIVE")}
function Ef(){var a=r("_lact",window);return null==a?-1:Math.max(w()-a,0)}
var Ff=Df;function Gf(a,b,c,d){this.f=a;this.i=b;this.g=c;this.b=d}
var Hf=1;function If(a){var b={};void 0!==a.f?b.trackingParams=a.f:(b.veType=a.i,null!=a.g&&(b.veCounter=a.g));void 0!==a.b&&(b.dataElement=If(a.b));return b}
;var Jf={log_event:"events",log_interaction:"interactions"},Kf=Object.create(null);Kf.log_event="GENERIC_EVENT_LOGGING";Kf.log_interaction="INTERACTION_LOGGING";var Lf={},Mf={},Nf=0,C=r("ytLoggingTransportLogPayloadsQueue_")||{};q("ytLoggingTransportLogPayloadsQueue_",C,void 0);var Of=r("ytLoggingTransportTokensToCttTargetIds_")||{};q("ytLoggingTransportTokensToCttTargetIds_",Of,void 0);var Pf=r("ytLoggingTransportDispatchedStats_")||{};q("ytLoggingTransportDispatchedStats_",Pf,void 0);
var Qf=r("ytLoggingTransportCapturedTime_")||{};q("ytytLoggingTransportCapturedTime_",Qf,void 0);function Rf(a,b){Mf[a.endpoint]=b;if(a.ea){var c=a.ea;var d={};c.videoId?d.videoId=c.videoId:c.playlistId&&(d.playlistId=c.playlistId);Of[a.ea.token]=d;c=Sf(a.endpoint,a.ea.token)}else c=Sf(a.endpoint);c.push(a.wa);d=Number(V("web_logging_max_batch")||0)||20;c.length>=d?Tf():Uf()}
function Tf(){window.clearTimeout(Nf);if(!Ga()){for(var a in C){var b=Lf[a];if(!b){var c=Mf[a];if(!c)continue;b=new c;Lf[a]=b}var c=void 0,d=a,e=b,f=Jf[d],g=Pf[d]||{};Pf[d]=g;b=Math.round(je());for(c in C[d]){var h=e.f();h[f]=Sf(d,c);g.dispatchedEventCount=g.dispatchedEventCount||0;g.dispatchedEventCount+=h[f].length;h.requestTimeMs=b;var k=Of[c];if(k)a:{var m=h,y=c;if(k.videoId)var D="VIDEO";else if(k.playlistId)D="PLAYLIST";else break a;m.credentialTransferTokenTargetId=k;m.context=m.context||{};
m.context.user=m.context.user||{};m.context.user.credentialTransferTokens=[{token:y,scope:D}]}delete Of[c];e.g(d,h,{})}c=g;d=b;c.previousDispatchMs&&(b=d-c.previousDispatchMs,e=c.diffCount||0,c.averageTimeBetweenDispatchesMs=e?(c.averageTimeBetweenDispatchesMs*e+b)/(e+1):b,c.diffCount=e+1);c.previousDispatchMs=d;delete C[a]}Ga()||Uf()}}
function Uf(){window.clearTimeout(Nf);Nf=W(Tf,T("LOGGING_BATCH_TIMEOUT",1E4))}
function Sf(a,b){b||(b="");C[a]=C[a]||{};C[a][b]=C[a][b]||[];return C[a][b]}
;function Vf(a,b,c,d,e){var f={};f.eventTimeMs=Math.round(d||je());f[a]=b;f.context={lastActivityMs:String(Ef())};Rf({endpoint:"log_event",wa:f,ea:e},c)}
;function Wf(a,b,c,d){Xf(a,{attachChild:{csn:b,parentVisualElement:If(c),visualElements:[If(d)]}},void 0)}
function Yf(a,b,c){V("interaction_logging_on_gel_web")?c.forEach(function(c){Vf("visualElementShown",{csn:b,ve:If(c),eventType:1},a)}):(c=xa(c,function(a){return If(a)}),Xf(a,{visibilityUpdate:{csn:b,
visualElements:c}}))}
function Xf(a,b,c){b.eventTimeMs=Math.round(je());b.lactMs=Ef();c&&(b.clientData=Zf(c));Rf({endpoint:"log_interaction",wa:b},a)}
function Zf(a){var b={};a.analyticsChannelData&&(b.analyticsDatas=xa(a.analyticsChannelData,function(a){return{tabName:a.tabName,cardName:a.cardName,isChannelScreen:a.isChannelScreen,insightId:a.insightId,externalChannelId:a.externalChannelId,externalContentOwnerId:a.externalContentOwnerId}}));
return{playbackData:{clientPlaybackNonce:a.clientPlaybackNonce},analyticsChannelData:b,externalLinkData:a.externalLinkData}}
;function $f(){if(!ag&&!bg||!window.JSON)return null;try{var a=ag.get("yt-player-two-stage-token")}catch(b){}if(!u(a))try{a=bg.get("yt-player-two-stage-token")}catch(b){}if(!u(a))return null;try{a=JSON.parse(a,void 0)}catch(b){}return a}
var bg,cg=new he;bg=cg.isAvailable()?new de(cg):null;var ag,dg=new ie;ag=dg.isAvailable()?new de(dg):null;function eg(){var a=T("ROOT_VE_TYPE",void 0);return a?new Gf(void 0,a,void 0):null}
function fg(){var a=T("client-screen-nonce",void 0);a||(a=T("EVENT_ID",void 0));return a}
;function gg(a,b,c){b=void 0===b?{}:b;c=void 0===c?!1:c;var d=T("EVENT_ID");d&&(b.ei||(b.ei=d));if(b){var d=a,e=T("VALID_SESSION_TEMPDATA_DOMAINS",[]),f=Rb(J(window.location.href)[3]||null);f&&e.push(f);f=Rb(J(d)[3]||null);if(0<=wa(e,f)||!f&&0==d.lastIndexOf("/",0))if(V("autoescape_tempdata_url")&&(e=document.createElement("a"),Ib(e,d),d=e.href),d){var f=J(d),d=f[5],e=f[6],f=f[7],g="";d&&(g+=d);e&&(g+="?"+e);f&&(g+="#"+f);d=g;e=d.indexOf("#");if(d=0>e?d:d.substr(0,e)){if(b.itct||b.ved)b.csn=b.csn||
fg();d="ST-"+va(d).toString(36);e=b?Ve(b):"";uc.set(""+d,e,5,"/","youtube.com");b&&(b=b.itct||b.ved,d=r("yt.logging.screen.storeParentElement"),b&&d&&d(new Gf(b)))}}}if(c)return!1;if((window.ytspf||{}).enabled)spf.navigate(a);else{var h=void 0===h?{}:h;var k=void 0===k?"":k;var m=void 0===m?window:m;c=m.location;a=Sb(Ub([a],h))+k;a=a instanceof Ab?a:Eb(a);c.href=Cb(a)}return!0}
;var hg=r("yt.abuse.botguardInitialized")||Oe;q("yt.abuse.botguardInitialized",hg,void 0);var ig=r("yt.abuse.invokeBotguard")||Pe;q("yt.abuse.invokeBotguard",ig,void 0);var jg=r("yt.abuse.dclkstatus.checkDclkStatus")||tf;q("yt.abuse.dclkstatus.checkDclkStatus",jg,void 0);var kg=r("yt.player.exports.navigate")||gg;q("yt.player.exports.navigate",kg,void 0);var lg=r("yt.util.activity.init")||Cf;q("yt.util.activity.init",lg,void 0);var mg=r("yt.util.activity.getTimeSinceActive")||Ef;
q("yt.util.activity.getTimeSinceActive",mg,void 0);var ng=r("yt.util.activity.setTimestamp")||Ff;q("yt.util.activity.setTimestamp",ng,void 0);function og(a){a={client:{hl:a.Oa,gl:a.Na,clientName:a.Ma,clientVersion:a.innertubeContextClientVersion}};T("DELEGATED_SESSION_ID")&&(a.user={onBehalfOfUser:T("DELEGATED_SESSION_ID")});return a}
function pg(){return{apiaryHost:T("APIARY_HOST",void 0),Ea:T("APIARY_HOST_FIRSTPARTY",void 0),gapiHintOverride:!!T("GAPI_HINT_OVERRIDE",void 0),gapiHintParams:T("GAPI_HINT_PARAMS",void 0),innertubeApiKey:T("INNERTUBE_API_KEY",void 0),innertubeApiVersion:T("INNERTUBE_API_VERSION",void 0),Ma:T("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:T("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),Oa:T("INNERTUBE_CONTEXT_HL",void 0),Na:T("INNERTUBE_CONTEXT_GL",void 0),xhrApiaryHost:T("XHR_APIARY_HOST",
void 0)||"",Pa:T("INNERTUBE_HOST_OVERRIDE",void 0)||""}}
function qg(a,b,c){c.context&&c.context.capabilities&&(c=c.context.capabilities,c.snapshot||c.golden)&&(a="vix");return"/youtubei/"+a+"/"+b}
;function rg(a){this.b=a||pg();sg||(sg=tg(this.b))}
function tg(a){return(new Q(function(b){try{var c={gapiHintOverride:a.gapiHintOverride,_c:{jsl:{h:a.gapiHintParams}},callback:b};b=c;b=void 0===b?{}:b;ka(b)&&(b={callback:b});b._c&&b._c.jsl&&b._c.jsl.h||Ka(b,{_c:{jsl:{h:T("GAPI_HINT_PARAMS",void 0)}}});c=b;if(c.gapiHintOverride||T("GAPI_HINT_OVERRIDE")){var d=document.location.href;if(-1!=d.indexOf("?")){var d=(d||"").split("#")[0],e=d.split("?",2);var f=Te(1<e.length?e[1]:e[0])}else f={};var g=f.gapi_jsh;g&&Ka(c,{_c:{jsl:{h:g}}})}$c("client",c)}catch(h){U(h)}})).then(function(){})}
rg.prototype.i=function(){var a=r("gapi.config.update");a("googleapis.config/auth/useFirstPartyAuth",!0);a("googleapis.config/auth/useFirstPartyAuthV2",!0);var b=this.b.apiaryHost;/^[\s\xa0]*$/.test(null==b?"":String(b))||a("googleapis.config/root",(-1==b.indexOf("://")?"//":"")+b);b=this.b.Ea;/^[\s\xa0]*$/.test(null==b?"":String(b))||a("googleapis.config/root-1p",(-1==b.indexOf("://")?"//":"")+b);b=T("SESSION_INDEX");a("googleapis.config/sessionIndex",b);r("gapi.client.setApiKey")(this.b.innertubeApiKey)};
rg.prototype.f=function(){return{context:og(this.b)}};
rg.prototype.g=function(a,b,c){var d,e=!1;0<c.timeout&&(d=W(function(){e||(e=!0,c.O&&c.O())},c.timeout));
ug(this,a,b,function(a){if(!e)if(e=!0,d&&window.clearTimeout(d),a)c.J&&c.J(a);else if(c.onError)c.onError()})};
function ug(a,b,c,d){var e={path:qg(a.b.innertubeApiVersion,b,c),headers:{"X-Goog-Visitor-Id":T("VISITOR_DATA")},method:"POST",body:zd(c)},f=v(a.i,a);sg.then(function(){f();r("gapi.client.request")(e).execute(d||t)})}
var sg=null;function vg(a){this.b=a||pg()}
vg.prototype.f=function(){return{context:og(this.b)}};
vg.prototype.g=function(a,b,c){T("VISITOR_DATA")||U(Error("Missing VISITOR_DATA when sending innertube request."));var d={headers:{"Content-Type":"application/json","X-Goog-Visitor-Id":T("VISITOR_DATA","")},D:b,xa:"JSON",O:c.O,J:function(a,b){c.J&&c.J(b)},
onError:function(a,b){if(c.onError)c.onError(b)},
timeout:c.timeout,withCredentials:!0},e=vc();e&&(d.headers.Authorization=e,d.headers["X-Goog-AuthUser"]=T("SESSION_INDEX",0));var f=this.b.xhrApiaryHost;f&&!f.startsWith("http")&&(f="//"+f);V("youtubei_for_web")&&(f="");var g=this.b.Pa;g&&(f=g);e&&!f&&(d.headers["x-origin"]=window.location.origin);ef(""+f+qg(this.b.innertubeApiVersion,a,b)+"?alt=json&key="+this.b.innertubeApiKey,d)};function wg(){return V("enable_youtubei_innertube")?vg:rg}
;function xg(a){a=a||{};this.url=a.url||"";this.urlV9As2=a.url_v9as2||"";this.args=a.args||Ia(yg);this.assets=a.assets||{};this.attrs=a.attrs||Ia(zg);this.params=a.params||Ia(Ag);this.minVersion=a.min_version||"8.0.0";this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
var yg={enablejsapi:1},zg={},Ag={allowscriptaccess:"always",allowfullscreen:"true",bgcolor:"#000000"};function Bg(a){a instanceof xg||(a=new xg(a));return a}
function Cg(a){var b=new xg,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];b[c]="object"==fa(d)?Ia(d):d}return b}
;function Dg(){this.g=this.f=this.b=0;this.i="";var a=r("window.navigator.plugins"),b=r("window.navigator.mimeTypes"),a=a&&a["Shockwave Flash"],b=b&&b["application/x-shockwave-flash"],b=a&&b&&b.enabledPlugin&&a.description||"";if(a=b){var c=a.indexOf("Shockwave Flash");0<=c&&(a=a.substr(c+15));for(var c=a.split(" "),d="",a="",e=0,f=c.length;e<f;e++)if(d)if(a)break;else a=c[e];else d=c[e];d=d.split(".");c=parseInt(d[0],10)||0;d=parseInt(d[1],10)||0;e=0;if("r"==a.charAt(0)||"d"==a.charAt(0))e=parseInt(a.substr(1),
10)||0;a=[c,d,e]}else a=[0,0,0];this.i=b;b=a;this.b=b[0];this.f=b[1];this.g=b[2];if(0>=this.b){if(ke)try{var g=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(y){g=null}else{var h=document.body;var k=document.createElement("object");k.setAttribute("type","application/x-shockwave-flash");g=h.appendChild(k)}if(g&&"GetVariable"in g)try{var m=g.GetVariable("$version")}catch(y){m=""}h&&k&&h.removeChild(k);(g=m||"")?(g=g.split(" ")[1].split(","),g=[parseInt(g[0],10)||0,parseInt(g[1],10)||0,parseInt(g[2],
10)||0]):g=[0,0,0];this.b=g[0];this.f=g[1];this.g=g[2]}}
ea(Dg);function Eg(a,b,c,d){b="string"==typeof b?b.split("."):[b,c,d];b[0]=parseInt(b[0],10)||0;b[1]=parseInt(b[1],10)||0;b[2]=parseInt(b[2],10)||0;return a.b>b[0]||a.b==b[0]&&a.f>b[1]||a.b==b[0]&&a.f==b[1]&&a.g>=b[2]}
;var Fg=/cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;function Gg(a){if(window.spf){var b=a.match(Fg);spf.style.load(a,b?b[1]:"",void 0)}else Hg(a)}
function Hg(a){var b=Ig(a),c=document.getElementById(b),d=c&&qe(c,"loaded");d||c&&!d||(c=Jg(a,b,function(){qe(c,"loaded")||(re(c),Ae(b),W(qa(ze,b),0))}))}
function Jg(a,b,c){var d=document.createElement("link");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
a=Nb(a);d.rel="stylesheet";d.href=a instanceof yb&&a.constructor===yb&&a.f===zb?a.b:"type_error:TrustedResourceUrl";(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function Ig(a){var b=document.createElement("a");Ib(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+va(a)}
;var X={},Kg=(X["api.invalidparam"]=2,X.auth=150,X["drm.auth"]=150,X["heartbeat.net"]=150,X["heartbeat.servererror"]=150,X["heartbeat.stop"]=150,X["html5.unsupportedads"]=5,X["fmt.noneavailable"]=5,X["fmt.decode"]=5,X["fmt.unplayable"]=5,X["html5.missingapi"]=5,X["html5.unsupportedlive"]=5,X["drm.unavailable"]=5,X);var Lg;var Mg=E,Mg=Mg.toLowerCase();if(-1!=Mg.indexOf("android")){var Ng=Mg.match(/android\D*(\d\.\d)[^\;|\)]*[\;\)]/);if(Ng)Lg=Number(Ng[1]);else{var Og={cupcake:1.5,donut:1.6,eclair:2,froyo:2.2,gingerbread:2.3,honeycomb:3,"ice cream sandwich":4,jellybean:4.1,kitkat:4.4,lollipop:5.1,marshmallow:6,nougat:7.1},Pg=[],Qg=0,Rg;for(Rg in Og)Pg[Qg++]=Rg;var Sg=Mg.match("("+Pg.join("|")+")");Lg=Sg?Og[Sg[0]]:0}}else Lg=void 0;var Tg=['video/mp4; codecs="avc1.42001E, mp4a.40.2"','video/webm; codecs="vp8.0, vorbis"'],Ug=['audio/mp4; codecs="mp4a.40.2"'];var Vg;var Wg=E,Xg=Wg.match(/\((iPad|iPhone|iPod)( Simulator)?;/);if(!Xg||2>Xg.length)Vg=void 0;else{var Yg=Wg.match(/\((iPad|iPhone|iPod)( Simulator)?; (U; )?CPU (iPhone )?OS (\d+_\d)[_ ]/);Vg=Yg&&6==Yg.length?Number(Yg[5].replace("_",".")):0}0<=Vg&&0<=E.search("Safari")&&E.search("Version");function Zg(a){P.call(this);this.b=[];this.g=a||this}
x(Zg,P);function $g(a,b,c,d){d=ne(v(d,a.g));d={target:b,name:c,sa:d};b.addEventListener(c,d.sa,void 0);a.b.push(d)}
function ah(a){for(;a.b.length;){var b=a.b.pop();b.target.removeEventListener(b.name,b.sa)}}
Zg.prototype.o=function(){ah(this);Zg.A.o.call(this)};var bh=r("ytLoggingLatencyUsageStats_")||{};q("ytLoggingLatencyUsageStats_",bh,void 0);var ch=0;function dh(a){bh[a]=bh[a]||{count:0};var b=bh[a];b.count++;b.time=je();ch||(ch=pf(eh,0));return 10<b.count?(11==b.count&&kf(Error("CSI data exceeded logging limit with key: "+a)),!0):!1}
function eh(){var a=je(),b;for(b in bh)6E4<a-bh[b].time&&delete bh[b];ch=0}
;function fh(a,b){this.version=a;this.args=b}
;function gh(a){this.topic=a}
gh.prototype.toString=function(){return this.topic};var hh=r("ytPubsub2Pubsub2Instance")||new R;R.prototype.subscribe=R.prototype.subscribe;R.prototype.unsubscribeByKey=R.prototype.K;R.prototype.publish=R.prototype.W;R.prototype.clear=R.prototype.clear;q("ytPubsub2Pubsub2Instance",hh,void 0);var ih=r("ytPubsub2Pubsub2SubscribedKeys")||{};q("ytPubsub2Pubsub2SubscribedKeys",ih,void 0);var jh=r("ytPubsub2Pubsub2TopicToKeys")||{};q("ytPubsub2Pubsub2TopicToKeys",jh,void 0);var kh=r("ytPubsub2Pubsub2IsAsync")||{};q("ytPubsub2Pubsub2IsAsync",kh,void 0);
q("ytPubsub2Pubsub2SkipSubKey",null,void 0);function lh(a){var b=mh,c=r("ytPubsub2Pubsub2Instance");c&&c.publish.call(c,b.toString(),b,a)}
;var Y=window.performance||window.mozPerformance||window.msPerformance||window.webkitPerformance||{};function nh(a,b){fh.call(this,1,arguments)}
x(nh,fh);var mh=new gh("timing-sent");var oh=w().toString();var ph={vc:!0},qh={ad_at:"adType",cpn:"clientPlaybackNonce",csn:"clientScreenNonce",is_nav:"isNavigation",yt_lt:"loadType",yt_ad:"isMonetized",yt_ad_pr:"prerollAllowed",yt_red:"isRedSubscriber",yt_vis:"isVisible",docid:"videoId",plid:"videoId",fmt:"playerInfo.itag"},rh="ap c cver ei yt_fss yt_li".split(" "),sh=["isNavigation","isMonetized","prerollAllowed","isRedSubscriber","isVisible"];
function th(a){if("_"!=a[0]){var b=a;Y.mark&&(0==b.lastIndexOf("mark_",0)||(b="mark_"+b),Y.mark(b))}var b=uh(),c=je();b[a]&&(b["_"+a]=b["_"+a]||[b[a]],b["_"+a].push(c));b[a]=c;vh()["tick_"+a]=void 0;je();V("csi_on_gel")?(b=wh(),"_start"==a?dh("baseline_"+b)||Vf("latencyActionBaselined",{clientActionNonce:b},vg,void 0):dh("tick_"+a+"_"+b)||Vf("latencyActionTicked",{tickName:a,clientActionNonce:b},vg,void 0),a=!0):a=!1;if(a=!a)a=!r("yt.timing.pingSent_");if(a&&(b=T("TIMING_ACTION",void 0),a=uh(),r("ytglobal.timingready_")&&
b&&a._start&&xh())){b=!0;c=T("TIMING_WAIT",[]);if(c.length)for(var d=0,e=c.length;d<e;++d)if(!(c[d]in a)){b=!1;break}b&&yh()}}
function zh(){var a=Ah().info.yt_lt="hot_bg";vh().info_yt_lt=a;if(V("csi_on_gel"))if("yt_lt"in qh){var b={},c=qh.yt_lt.split(".");0<=wa(sh,c)&&(a=!!a);for(var d=b,e=0;e<c.length-1;e++)d[c[e]]=d[c[e]]||{},d=d[c[e]];b[c[c.length-1]]=a;a=wh();c=Object.keys(b).join("");dh("info_"+c+"_"+a)||(b.clientActionNonce=a,Vf("latencyActionInfo",b,vg))}else 0<=wa(rh,"yt_lt")||U(Error("Unknown label yt_lt logged with GEL CSI."))}
function xh(){var a=uh();if(a.aft)return a.aft;for(var b=T("TIMING_AFT_KEYS",["ol"]),c=b.length,d=0;d<c;d++){var e=a[b[d]];if(e)return e}return NaN}
function yh(){if(!V("csi_on_gel")){var a=uh(),b=Ah().info,c=a._start,d;for(d in a)if(0==d.lastIndexOf("_",0)&&ia(a[d])){var e=d.slice(1);if(e in ph){var f=xa(a[d],function(a){return Math.round(a-c)});
b["all_"+e]=f.join()}delete a[d]}e=!!b.ap;if(f=r("ytglobal.timingReportbuilder_")){if(f=f(a,b,void 0))Bh(f,e),Ch(),Dh(),Eh(!1,void 0),T("TIMING_ACTION")&&S("PREVIOUS_ACTION",T("TIMING_ACTION")),S("TIMING_ACTION","")}else{var g=T("CSI_SERVICE_NAME","youtube");f={v:2,s:g,action:T("TIMING_ACTION",void 0)};var h=b.srt;void 0!==a.srt&&delete b.srt;if(b.h5jse){var k=window.location.protocol+r("ytplayer.config.assets.js");(k=Y.getEntriesByName?Y.getEntriesByName(k)[0]:null)?b.h5jse=Math.round(b.h5jse-k.responseEnd):
delete b.h5jse}a.aft=xh();Fh()&&"youtube"==g&&(zh(),g=a.vc,k=a.pbs,delete a.aft,b.aft=Math.round(k-g));for(var m in b)"_"!=m.charAt(0)&&(f[m]=b[m]);a.ps=je();b={};m=[];for(d in a)"_"!=d.charAt(0)&&(g=Math.round(a[d]-c),b[d]=g,m.push(d+"."+g));f.rt=m.join(",");(a=r("ytdebug.logTiming"))&&a(f,b);Bh(f,e,void 0);lh(new nh(b.aft+(h||0),void 0))}}}
var Dh=v(Y.clearResourceTimings||Y.webkitClearResourceTimings||Y.mozClearResourceTimings||Y.msClearResourceTimings||Y.oClearResourceTimings||t,Y);
function Bh(a,b,c){if(V("debug_csi_data")){var d=r("yt.timing.csiData");d||(d=[],q("yt.timing.csiData",d,void 0));d.push({page:location.href,time:new Date,args:a})}var d="",e;for(e in a)d+="&"+e+"="+a[e];a="/csi_204?"+d.substring(1);if(window.navigator&&window.navigator.sendBeacon&&b)try{window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,"")||hf(a,void 0)}catch(f){hf(a,void 0)}else hf(a);Eh(!0,c)}
function wh(){var a=Ah().nonce;if(!a){a:{if(window.crypto&&window.crypto.getRandomValues)try{var b=Array(16),c=new Uint8Array(16);window.crypto.getRandomValues(c);for(a=0;a<b.length;a++)b[a]=c[a];var d=b;break a}catch(e){}d=Array(16);for(b=0;16>b;b++){c=w();for(a=0;a<c%23;a++)d[b]=Math.random();d[b]=Math.floor(256*Math.random())}if(oh)for(b=1,c=0;c<oh.length;c++)d[b%16]=d[b%16]^d[(b-1)%16]/4^oh.charCodeAt(c),b++}b=[];for(c=0;c<d.length;c++)b.push("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_".charAt(d[c]&
63));a=b.join("");Ah().nonce=a}return a}
function uh(){return Ah().tick}
function vh(){var a=Ah();"gel"in a||(a.gel={});return a.gel}
function Ah(){return r("ytcsi.data_")||Ch()}
function Ch(){var a={tick:{},info:{}};q("ytcsi.data_",a,void 0);return a}
function Eh(a,b){q("yt.timing."+(b||"")+"pingSent_",a,void 0)}
function Fh(){var a=uh(),b=a.pbr,c=a.vc,a=a.pbs;return b&&c&&a&&b<c&&c<a&&1==Ah().info.yt_pvis}
;function Gh(a,b){P.call(this);this.w=this.l=a;this.U=b;this.C=!1;this.g={};this.aa=this.T=null;this.V=new R;pd(this,qa(qd,this.V));this.j={};this.L=this.ba=this.i=this.ia=this.b=null;this.X=!1;this.M=this.B=this.H=this.R=null;this.ca={};this.Da=["onReady"];this.Y=new Zg(this);pd(this,qa(qd,this.Y));this.ga=null;this.pa=NaN;this.Z={};Hh(this);this.G("onDetailedError",v(this.Ua,this));this.G("onTabOrderChange",v(this.Fa,this));this.G("onTabAnnounce",v(this.qa,this));this.G("WATCH_LATER_VIDEO_ADDED",
v(this.Va,this));this.G("WATCH_LATER_VIDEO_REMOVED",v(this.Wa,this));rb||(this.G("onMouseWheelCapture",v(this.Sa,this)),this.G("onMouseWheelRelease",v(this.Ta,this)));this.G("onAdAnnounce",v(this.qa,this));this.N=new Zg(this);pd(this,qa(qd,this.N));this.ha=!1;this.fa=null}
x(Gh,P);var Ih=["drm.unavailable","fmt.noneavailable","html5.missingapi","html5.unsupportedads","html5.unsupportedlive"];l=Gh.prototype;l.oa=function(a,b){this.f||(Jh(this,a),Kh(this,b),this.C&&Lh(this))};
function Jh(a,b){a.ia=b;a.b=Cg(b);a.i=a.b.attrs.id||a.i;"video-player"==a.i&&(a.i=a.U,a.b.attrs.id=a.U);a.w.id==a.i&&(a.i+="-player",a.b.attrs.id=a.i);a.b.args.enablejsapi="1";a.b.args.playerapiid=a.U;a.ba||(a.ba=Mh(a,a.b.args.jsapicallback||"onYouTubePlayerReady"));a.b.args.jsapicallback=null;var c=a.b.attrs.width;c&&(a.w.style.width=Pb(Number(c)||c));if(c=a.b.attrs.height)a.w.style.height=Pb(Number(c)||c)}
l.Ia=function(){return this.ia};
function Lh(a){a.b.loaded||(a.b.loaded=!0,"0"!=a.b.args.autoplay?a.g.loadVideoByPlayerVars(a.b.args):a.g.cueVideoByPlayerVars(a.b.args))}
function Nh(a){if(!p(a.b.disable.flash)){var b=a.b.disable;var c=Eg(Dg.getInstance(),a.b.minVersion);b.flash=!c}return!a.b.disable.flash}
function Oh(a,b){var c;(c=!b)||(c=5!=(Kg[b.errorCode]||5)?!1:(c=a.b&&a.b.args&&a.b.args.fflags)&&0<=c.indexOf("web_player_disable_flash_fallback=true")?!1:-1!=Ih.indexOf(b.errorCode));if(c&&Nh(a)){(c=Ph(a))&&c.stopVideo&&c.stopVideo();var d=a.b;c&&c.getUpdatedConfigurationData&&(c=c.getUpdatedConfigurationData(),d=Bg(c));d.args.autoplay=1;d.args.html5_unavailable="1";Jh(a,d);Kh(a,"flash")}}
function Kh(a,b){if(!a.f){if(!b){var c;if(!(c=!a.b.html5&&Nh(a))){if(!p(a.b.disable.html5)){c=!0;void 0!=a.b.args.deviceHasDisplay&&(c=a.b.args.deviceHasDisplay);if(2.2==Lg)var d=!0;else{a:{var e=c;c=r("yt.player.utils.videoElement_");c||(c=document.createElement("VIDEO"),q("yt.player.utils.videoElement_",c,void 0));try{if(c.canPlayType)for(var e=e?Tg:Ug,f=0;f<e.length;f++)if(c.canPlayType(e[f])){d=null;break a}d="fmt.noneavailable"}catch(g){d="html5.missingapi"}}d=!d}d&&(d=Qh(a)||a.b.assets.js);
a.b.disable.html5=!d;d||(a.b.args.html5_unavailable="1")}c=!!a.b.disable.html5}b=c?Nh(a)?"flash":"unsupported":"html5"}("flash"==b?a.mb:a.nb).call(a)}}
function Qh(a){var b=!0,c=Ph(a);c&&a.b&&(a=a.b,b=qe(c,"version")==a.assets.js);return b&&!!r("yt.player.Application.create")}
l.nb=function(){if(!this.X){var a=Qh(this);if(a&&"html5"==Rh(this))this.L="html5",this.C||this.P();else if(Sh(this),this.L="html5",a&&this.H)this.l.appendChild(this.H),this.P();else{this.b.loaded=!0;var b=!1;this.R=v(function(){b=!0;var a=this.l,d=Cg(this.b);r("yt.player.Application.create")(a,d);this.P()},this);
this.X=!0;a?this.R():(Ke(this.b.assets.js,this.R),Gg(this.b.assets.css),Th(this)&&!b&&q("yt.player.Application.create",null,void 0))}}};
l.mb=function(){var a=Cg(this.b);if(!this.B){var b=Ph(this);b&&(this.B=document.createElement("SPAN"),this.B.tabIndex=0,$g(this.Y,this.B,"focus",this.ua),this.M=document.createElement("SPAN"),this.M.tabIndex=0,$g(this.Y,this.M,"focus",this.ua),b.parentNode&&b.parentNode.insertBefore(this.B,b),b.parentNode&&b.parentNode.insertBefore(this.M,b.nextSibling))}a.attrs.width=a.attrs.width||"100%";a.attrs.height=a.attrs.height||"100%";if("flash"==Rh(this))this.L="flash",this.C||this.P();else{Sh(this);this.L=
"flash";this.b.loaded=!0;var b=Dg.getInstance(),c=(-1<b.i.indexOf("Gnash")&&-1==b.i.indexOf("AVM2")||9==b.b&&1==b.f||9==b.b&&0==b.f&&1==b.g?0:9<=b.b)||-1<navigator.userAgent.indexOf("Sony/COM2")&&!Eg(b,9,1,58)?a.url:a.urlV9As2;window!=window.top&&document.referrer&&(a.args.framer=document.referrer.substring(0,128));b=this.l;if(c){var b=u(b)?Jb(b):b,d=Ia(a.attrs);d.tabindex=0;var e=Ia(a.params);e.flashvars=Ve(a.args);if(ke){d.classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";e.movie=c;var a=document.createElement("object");
for(g in d)a.setAttribute(g,d[g]);for(var f in e){var g=document.createElement("param");g.setAttribute("name",f);g.setAttribute("value",e[f]);a.appendChild(g)}}else{d.type="application/x-shockwave-flash";d.src=c;a=document.createElement("embed");a.setAttribute("name",d.id);for(var h in d)a.setAttribute(h,d[h]);for(var k in e)a.setAttribute(k,e[k])}f=document.createElement("div");f.appendChild(a);b.innerHTML=f.innerHTML}this.P()}};
l.ua=function(){Ph(this).focus()};
function Ph(a){var b=Jb(a.i);!b&&a.w&&a.w.querySelector&&(b=a.w.querySelector("#"+a.i));return b}
l.P=function(){if(!this.f){var a=Ph(this),b=!1;try{a&&a.getApiInterface&&a.getApiInterface()&&(b=!0)}catch(f){}if(b)if(this.X=!1,a.isNotServable&&a.isNotServable(this.b.args.video_id))Oh(this);else{Hh(this);this.C=!0;a=Ph(this);a.addEventListener&&(this.T=Uh(this,a,"addEventListener"));a.removeEventListener&&(this.aa=Uh(this,a,"removeEventListener"));for(var b=a.getApiInterface(),b=b.concat(a.getInternalApiInterface()),c=0;c<b.length;c++){var d=b[c];this.g[d]||(this.g[d]=Uh(this,a,d))}for(var e in this.j)this.T(e,
this.j[e]);Lh(this);this.ba&&this.ba(this.g);this.V.W("onReady",this.g)}else this.pa=W(v(this.P,this),50)}};
function Uh(a,b,c){var d=b[c];return function(){try{return a.ga=null,d.apply(b,arguments)}catch(e){"Bad NPObject as private data!"!=e.message&&"sendAbandonmentPing"!=c&&(e.message+=" ("+c+")",a.ga=e,U(e,"WARNING"))}}}
function Hh(a){a.C=!1;if(a.aa)for(var b in a.j)a.aa(b,a.j[b]);for(var c in a.Z)window.clearTimeout(parseInt(c,10));a.Z={};a.T=null;a.aa=null;for(var d in a.g)a.g[d]=null;a.g.addEventListener=v(a.G,a);a.g.removeEventListener=v(a.cb,a);a.g.destroy=v(a.dispose,a);a.g.getLastError=v(a.Ja,a);a.g.getPlayerType=v(a.Ka,a);a.g.getCurrentVideoConfig=v(a.Ia,a);a.g.loadNewVideoConfig=v(a.oa,a);a.g.isReady=v(a.ob,a)}
l.ob=function(){return this.C};
l.G=function(a,b){if(!this.f){var c=Mh(this,b);if(c){if(!(0<=wa(this.Da,a)||this.j[a])){var d=Vh(this,a);this.T&&this.T(a,d)}this.V.subscribe(a,c);"onReady"==a&&this.C&&W(qa(c,this.g),0)}}};
l.cb=function(a,b){if(!this.f){var c=Mh(this,b);c&&Xd(this.V,a,c)}};
function Mh(a,b){var c=b;if("string"==typeof b){if(a.ca[b])return a.ca[b];c=function(){var a=r(b);a&&a.apply(n,arguments)};
a.ca[b]=c}return c?c:null}
function Vh(a,b){var c="ytPlayer"+b+a.U;a.j[b]=c;n[c]=function(c){var d=W(function(){if(!a.f){a.V.W(b,c);var e=a.Z,g=String(d);g in e&&delete e[g]}},0);
Ha(a.Z,String(d))};
return c}
l.Fa=function(a){a=a?Lb:Kb;for(var b=a(document.activeElement);b&&(1!=b.nodeType||b==this.B||b==this.M||(b.focus(),b!=document.activeElement));)b=a(b)};
l.qa=function(a){Ae("a11y-announce",a)};
l.Ua=function(a){Oh(this,a)};
l.Va=function(a){Ae("WATCH_LATER_VIDEO_ADDED",a)};
l.Wa=function(a){Ae("WATCH_LATER_VIDEO_REMOVED",a)};
l.Sa=function(){if(!this.ha){if(vb){var a=document,b=a.scrollingElement?a.scrollingElement:cb||"CSS1Compat"!=a.compatMode?a.body||a.documentElement:a.documentElement,a=a.parentWindow||a.defaultView;this.fa=G&&I("10")&&a.pageYOffset!=b.scrollTop?new Ca(b.scrollLeft,b.scrollTop):new Ca(a.pageXOffset||b.scrollLeft,a.pageYOffset||b.scrollTop);$g(this.N,window,"scroll",this.Za);$g(this.N,this.l,"touchmove",this.Ya)}else $g(this.N,this.l,"mousewheel",this.va),$g(this.N,this.l,"wheel",this.va);this.ha=!0}};
l.Ta=function(){ah(this.N);this.ha=!1};
l.va=function(a){a=a||window.event;a.returnValue=!1;a.preventDefault&&a.preventDefault()};
l.Za=function(){window.scrollTo(this.fa.b,this.fa.f)};
l.Ya=function(a){a.preventDefault()};
l.Ka=function(){return this.L||Rh(this)};
l.Ja=function(){return this.ga};
function Rh(a){return(a=Ph(a))?"div"==a.tagName.toLowerCase()?"html5":"flash":null}
function Sh(a){th("dcp");a.cancel();Hh(a);a.L=null;a.b&&(a.b.loaded=!1);var b=Ph(a);"html5"==Rh(a)?Qh(a)||!Th(a)?a.H=b:(b&&b.destroy&&b.destroy(),a.H=null):b&&b.destroy&&b.destroy();for(var b=a.l,c;c=b.firstChild;)b.removeChild(c);ah(a.Y);a.B=null;a.M=null}
l.cancel=function(){this.R&&Je(this.b.assets.js,this.R);window.clearTimeout(this.pa);this.X=!1};
l.o=function(){Sh(this);if(this.H&&this.b)try{this.H.destroy()}catch(b){U(b)}this.ca=null;for(var a in this.j)n[this.j[a]]=null;this.ia=this.b=this.g=null;delete this.l;delete this.w;Gh.A.o.call(this)};
function Th(a){return a.b&&a.b.args&&a.b.args.fflags?-1!=a.b.args.fflags.indexOf("player_destroy_old_version=true"):!1}
;var Wh={},Xh="player_uid_"+(1E9*Math.random()>>>0);function Yh(a){var b="player",b=u(b)?Jb(b):b;a=Bg(a);var c=Xh+"_"+(b[ma]||(b[ma]=++na)),d=Wh[c];if(d)return d.oa(a),d.g;d=new Gh(b,c);Wh[c]=d;Ae("player-added",d.g);pd(d,qa(Zh,d));W(function(){d.oa(a)},0);
return d.g}
function Zh(a){Wh[a.U]=null}
;function $h(a){return(0==a.search("cue")||0==a.search("load"))&&"loadModule"!=a}
function ai(a,b,c){u(a)&&(a={mediaContentUrl:a,startSeconds:b,suggestedQuality:c});b=/\/([ve]|embed)\/([^#?]+)/.exec(a.mediaContentUrl);a.videoId=b&&b[2]?b[2]:null;return bi(a)}
function bi(a,b,c){if(la(a)){b="endSeconds startSeconds mediaContentUrl suggestedQuality videoId two_stage_token".split(" ");c={};for(var d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}return{videoId:a,startSeconds:b,suggestedQuality:c}}
function ci(a,b,c,d){if(la(a)&&!ia(a)){c="playlist list listType index startSeconds suggestedQuality".split(" ");b={};for(d=0;d<c.length;d++){var e=c[d];a[e]&&(b[e]=a[e])}return b}b={index:b,startSeconds:c,suggestedQuality:d};u(a)&&16==a.length?b.list="PL"+a:b.playlist=a;return b}
function di(a){var b=a.video_id||a.videoId;if(u(b)){var c=$f()||{},d=$f()||{};p(void 0)?d[b]=void 0:delete d[b];var e=w()+3E5,f=bg;if(f&&window.JSON){u(d)||(d=JSON.stringify(d,void 0));try{f.set("yt-player-two-stage-token",d,e)}catch(g){f.remove("yt-player-two-stage-token")}}(b=c[b])&&(a.two_stage_token=b)}}
;function ei(a){P.call(this);this.g=a;this.g.subscribe("command",this.ya,this);this.i={};this.j=!1}
x(ei,P);l=ei.prototype;l.start=function(){this.j||this.f||(this.j=!0,fi(this.g,"RECEIVING"))};
l.ya=function(a,b){if(this.j&&!this.f){var c=b||{};switch(a){case "addEventListener":if(u(c.event)&&(c=c.event,!(c in this.i))){var d=v(this.fb,this,c);this.i[c]=d;this.addEventListener(c,d)}break;case "removeEventListener":u(c.event)&&gi(this,c.event);break;default:this.b.isReady()&&this.b[a]&&(c=hi(a,b||{}),c=this.b[a].apply(this.b,c),(c=ii(a,c))&&this.j&&!this.f&&fi(this.g,a,c))}}};
l.fb=function(a,b){this.j&&!this.f&&fi(this.g,a,this.ja(a,b))};
l.ja=function(a,b){if(null!=b)return{value:b}};
function gi(a,b){b in a.i&&(a.removeEventListener(b,a.i[b]),delete a.i[b])}
l.o=function(){var a=this.g;a.f||Xd(a.b,"command",this.ya,this);this.g=null;for(var b in this.i)gi(this,b);ei.A.o.call(this)};function ji(a,b){ei.call(this,b);this.b=a;this.start()}
x(ji,ei);ji.prototype.addEventListener=function(a,b){this.b.addEventListener(a,b)};
ji.prototype.removeEventListener=function(a,b){this.b.removeEventListener(a,b)};
function hi(a,b){switch(a){case "loadVideoById":return b=bi(b),di(b),[b];case "cueVideoById":return b=bi(b),di(b),[b];case "loadVideoByPlayerVars":return di(b),[b];case "cueVideoByPlayerVars":return di(b),[b];case "loadPlaylist":return b=ci(b),di(b),[b];case "cuePlaylist":return b=ci(b),di(b),[b];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];
case "setLoop":return[b.loopPlaylists];case "setShuffle":return[b.shufflePlaylist];case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey]}return[]}
function ii(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
ji.prototype.ja=function(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}return ji.A.ja.call(this,a,b)};
ji.prototype.o=function(){ji.A.o.call(this);delete this.b};function ki(a,b,c,d){P.call(this);this.g=b||null;this.B="*";this.i=c||null;this.sessionId=null;this.channel=d||null;this.H=!!a;this.w=v(this.C,this);window.addEventListener("message",this.w)}
aa(ki,P);
ki.prototype.C=function(a){if(!("*"!=this.i&&a.origin!=this.i||this.g&&a.source!=this.g)&&u(a.data)){try{var b=yd(a.data)}catch(c){return}if(!(null==b||this.H&&(this.sessionId&&this.sessionId!=b.id||this.channel&&this.channel!=b.channel))&&b)switch(b.event){case "listening":"null"!=a.origin?this.i=this.B=a.origin:U(Error("MessageEvent origin is null"),"WARNING");this.g=a.source;this.sessionId=b.id;this.b&&(this.b(),this.b=null);break;case "command":this.j&&(this.l&&!(0<=wa(this.l,b.func))||this.j(b.func,
b.args))}}};
ki.prototype.sendMessage=function(a,b){var c=b||this.g;if(c){this.sessionId&&(a.id=this.sessionId);this.channel&&(a.channel=this.channel);try{var d=zd(a);c.postMessage(d,this.B)}catch(e){U(e,"WARNING")}}};
ki.prototype.o=function(){window.removeEventListener("message",this.w);P.prototype.o.call(this)};function li(a,b,c){ki.call(this,a,b,c||T("POST_MESSAGE_ORIGIN",void 0)||window.document.location.protocol+"//"+window.document.location.hostname,"widget");this.l=this.b=this.j=null}
aa(li,ki);function mi(){var a=!!T("WIDGET_ID_ENFORCE"),a=this.f=new li(a),b=v(this.bb,this);a.j=b;a.l=null;this.f.channel="widget";if(a=T("WIDGET_ID"))this.f.sessionId=a;this.i=[];this.l=!1;this.j={}}
l=mi.prototype;l.bb=function(a,b){if("addEventListener"==a&&b){var c=b[0];this.j[c]||"onReady"==c||(this.addEventListener(c,ni(this,c)),this.j[c]=!0)}else this.Ba(a,b)};
l.Ba=function(){};
function ni(a,b){return v(function(a){this.sendMessage(b,a)},a)}
l.addEventListener=function(){};
l.Ha=function(){this.l=!0;this.sendMessage("initialDelivery",this.ka());this.sendMessage("onReady");B(this.i,this.Aa,this);this.i=[]};
l.ka=function(){return null};
function oi(a,b){a.sendMessage("infoDelivery",b)}
l.Aa=function(a){this.l?this.f.sendMessage(a):this.i.push(a)};
l.sendMessage=function(a,b){this.Aa({event:a,info:void 0==b?null:b})};
l.dispose=function(){this.f=null};function pi(a){mi.call(this);this.b=a;this.g=[];this.addEventListener("onReady",v(this.Xa,this));this.addEventListener("onVideoProgress",v(this.jb,this));this.addEventListener("onVolumeChange",v(this.kb,this));this.addEventListener("onApiChange",v(this.eb,this));this.addEventListener("onPlaybackQualityChange",v(this.gb,this));this.addEventListener("onPlaybackRateChange",v(this.hb,this));this.addEventListener("onStateChange",v(this.ib,this))}
x(pi,mi);l=pi.prototype;l.Ba=function(a,b){if(this.b[a]){b=b||[];if(0<b.length&&$h(a)){var c=b;if(la(c[0])&&!ia(c[0]))c=c[0];else{var d={};switch(a){case "loadVideoById":case "cueVideoById":d=bi.apply(window,c);break;case "loadVideoByUrl":case "cueVideoByUrl":d=ai.apply(window,c);break;case "loadPlaylist":case "cuePlaylist":d=ci.apply(window,c)}c=d}di(c);b.length=1;b[0]=c}this.b[a].apply(this.b,b);$h(a)&&oi(this,this.ka())}};
l.Xa=function(){var a=v(this.Ha,this);this.f.b=a};
l.addEventListener=function(a,b){this.g.push({eventType:a,listener:b});this.b.addEventListener(a,b)};
l.ka=function(){if(!this.b)return null;var a=this.b.getApiInterface();za(a,"getVideoData");for(var b={apiInterface:a},c=0,d=a.length;c<d;c++){var e=a[c],f=e;if(0==f.search("get")||0==f.search("is")){var f=e,g=0;0==f.search("get")?g=3:0==f.search("is")&&(g=2);f=f.charAt(g).toLowerCase()+f.substr(g+1);try{var h=this.b[e]();b[f]=h}catch(k){}}}b.videoData=this.b.getVideoData();b.currentTimeLastUpdated_=w()/1E3;return b};
l.ib=function(a){a={playerState:a,currentTime:this.b.getCurrentTime(),duration:this.b.getDuration(),videoData:this.b.getVideoData(),videoStartBytes:0,videoBytesTotal:this.b.getVideoBytesTotal(),videoLoadedFraction:this.b.getVideoLoadedFraction(),playbackQuality:this.b.getPlaybackQuality(),availableQualityLevels:this.b.getAvailableQualityLevels(),videoUrl:this.b.getVideoUrl(),playlist:this.b.getPlaylist(),playlistIndex:this.b.getPlaylistIndex(),currentTimeLastUpdated_:w()/1E3,playbackRate:this.b.getPlaybackRate(),
mediaReferenceTime:this.b.getMediaReferenceTime()};this.b.getProgressState&&(a.progressState=this.b.getProgressState());this.b.getStoryboardFormat&&(a.storyboardFormat=this.b.getStoryboardFormat());oi(this,a)};
l.gb=function(a){oi(this,{playbackQuality:a})};
l.hb=function(a){oi(this,{playbackRate:a})};
l.eb=function(){for(var a=this.b.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.b.getOptions(e);b[e]={options:f};for(var g=0,h=f.length;g<h;g++){var k=f[g],m=this.b.getOption(e,k);b[e][k]=m}}this.sendMessage("apiInfoDelivery",b)};
l.kb=function(){oi(this,{muted:this.b.isMuted(),volume:this.b.getVolume()})};
l.jb=function(a){a={currentTime:a,videoBytesLoaded:this.b.getVideoBytesLoaded(),videoLoadedFraction:this.b.getVideoLoadedFraction(),currentTimeLastUpdated_:w()/1E3,playbackRate:this.b.getPlaybackRate(),mediaReferenceTime:this.b.getMediaReferenceTime()};this.b.getProgressState&&(a.progressState=this.b.getProgressState());oi(this,a)};
l.dispose=function(){pi.A.dispose.call(this);for(var a=0;a<this.g.length;a++){var b=this.g[a];this.b.removeEventListener(b.eventType,b.listener)}this.g=[]};function qi(){P.call(this);this.b=new R;pd(this,qa(qd,this.b))}
x(qi,P);qi.prototype.subscribe=function(a,b,c){return this.f?0:this.b.subscribe(a,b,c)};
qi.prototype.K=function(a){return this.f?!1:this.b.K(a)};
qi.prototype.l=function(a,b){this.f||this.b.W.apply(this.b,arguments)};function ri(a,b,c){qi.call(this);this.g=a;this.i=b;this.j=c}
x(ri,qi);function fi(a,b,c){if(!a.f){var d=a.g;d.f||a.i!=d.b||(a={id:a.j,command:b},c&&(a.data=c),d.b.postMessage(zd(a),d.i))}}
ri.prototype.o=function(){this.i=this.g=null;ri.A.o.call(this)};function si(a,b,c){P.call(this);this.b=a;this.i=c;this.j=Af(window,"message",v(this.l,this));this.g=new ri(this,a,b);pd(this,qa(qd,this.g))}
x(si,P);si.prototype.l=function(a){var b;if(b=!this.f)if(b=a.origin==this.i)a:{b=this.b;do{b:{var c=a.source;do{if(c==b){c=!0;break b}if(c==c.parent)break;c=c.parent}while(null!=c);c=!1}if(c){b=!0;break a}b=b.opener}while(null!=b);b=!1}if(b&&(a=a.data,u(a))){try{a=yd(a)}catch(d){return}a.command&&(b=this.g,b.f||b.l("command",a.command,a.data))}};
si.prototype.o=function(){Bf(this.j);this.b=null;si.A.o.call(this)};function ti(){var a=Ia(ui);return new Q(function(b,c){a.J=function(a){Se(a)?b(a):c(new vi("Request failed, status="+a.status,"net.badstatus"))};
a.onError=function(){c(new vi("Unknown request error","net.unknown"))};
a.O=function(){c(new vi("Request timed out","net.timeout"))};
Ze("//googleads.g.doubleclick.net/pagead/id",a)})}
function vi(a,b){A.call(this,a+", errorCode="+b);this.errorCode=b;this.name="PromiseAjaxError"}
aa(vi,A);function wi(a){A.call(this,a.message||a.description||a.name);this.Qa=a instanceof xi;this.b=a instanceof Nd}
x(wi,A);wi.prototype.name="BiscottiError";function xi(){A.call(this,"Biscotti ID is missing from server")}
x(xi,A);xi.prototype.name="BiscottiMissingError";function yi(a,b){this.f=a;this.b=b}
yi.prototype.then=function(a,b,c){try{if(p(this.f))return a?Kd(a.call(c,this.f)):Kd(this.f);if(p(this.b)){if(!b)return Ld(this.b);var d=b.call(c,this.b);return!p(d)&&this.b.b?Ld(this.b):Kd(d)}throw Error("Invalid Result_ state");}catch(e){return Ld(e)}};
Fd(yi);var ui={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},zi=null;function Ai(){if(!zi){var a=v(Bi,n,2),b=ti().then(Ci);zi=Md(b,null,a,void 0)}return zi}
function Ci(a){a=a.responseText;if(0!=a.lastIndexOf(")]}'",0))throw new xi;a=JSON.parse(a.substr(4)).id;Di(a);zi=new yi(a);Ei(18E5,2);return a}
function Bi(a,b){var c=new wi(b);Di("");zi=new yi(void 0,c);0<a&&Ei(12E4,a-1);throw c;}
function Ei(a,b){W(function(){var a=v(Bi,n,b),a=ti().then(Ci,a);Md(a,null,t,void 0)},a)}
function Di(a){q("yt.ads.biscotti.lastId_",a,void 0)}
;function Fi(a){a.Qa&&Gi("")}
function Hi(a){a&&!r("yt.ads.biscotti.getId_")&&q("yt.ads.biscotti.getId_",Ai,void 0);try{try{var b=r("yt.ads.biscotti.getId_");var c=b?b():Ai()}catch(d){c=Ld(d)}c.then(Gi,Fi);W(Hi,18E5)}catch(d){U(d)}}
var Ii=0;
function Gi(a){a:{try{var b=window.top.location.href}catch(H){b=2;break a}b=null!=b?b==window.document.location.href?0:1:2}b={dt:dc,flash:Va||"0",frm:b};b.u_tz=-(new Date).getTimezoneOffset();try{var c=z.history.length}catch(H){c=0}b.u_his=c;b.u_java=!!z.navigator&&"unknown"!==typeof z.navigator.javaEnabled&&!!z.navigator.javaEnabled&&z.navigator.javaEnabled();z.screen&&(b.u_h=z.screen.height,b.u_w=z.screen.width,b.u_ah=z.screen.availHeight,b.u_aw=z.screen.availWidth,b.u_cd=z.screen.colorDepth);z.navigator&&
z.navigator.plugins&&(b.u_nplug=z.navigator.plugins.length);z.navigator&&z.navigator.mimeTypes&&(b.u_nmime=z.navigator.mimeTypes.length);b.bid=a;b.ca_type=Ua?"flash":"image";if(V("enable_server_side_search_pyv")||V("enable_server_side_mweb_search_pyv")){a=window;try{var d=a.screenX;var e=a.screenY}catch(H){}try{var f=a.outerWidth;var g=a.outerHeight}catch(H){}try{var h=a.innerWidth;var k=a.innerHeight}catch(H){}k=[a.screenLeft,a.screenTop,d,e,a.screen?a.screen.availWidth:void 0,a.screen?a.screen.availTop:
void 0,f,g,h,k];h=window.top||z;try{if(h.document&&!h.document.body)var m=new Da(-1,-1);else{var y=(h||window).document,D="CSS1Compat"==y.compatMode?y.documentElement:y.body;m=(new Da(D.clientWidth,D.clientHeight)).round()}var N=m}catch(H){N=new Da(-12245933,-12245933)}m=0;window.SVGElement&&document.createElementNS&&(m|=1);N={bc:m,bih:N.height,biw:N.width,brdim:k.join(),vis:{visible:1,hidden:2,prerender:3,preview:4}[ra.webkitVisibilityState||ra.mozVisibilityState||ra.visibilityState||""]||0,wgl:!!z.WebGLRenderingContext};
for(var ua in N)b[ua]=N[ua]}b.bsq=Ii++;ef("//www.youtube.com/ad_data_204",{La:!1,D:b})}
;function Ji(){this.b=T("ALT_PREF_COOKIE_NAME","PREF");var a=uc.get(""+this.b,void 0);if(a)for(var a=unescape(a).split("&"),b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(Z[d]=c.toString())}}
ea(Ji);var Z=r("yt.prefs.UserPrefs.prefs_")||{};q("yt.prefs.UserPrefs.prefs_",Z,void 0);function Ki(a){if(/^f([1-9][0-9]*)$/.test(a))throw Error("ExpectedRegexMatch: "+a);}
function Li(a){if(!/^\w+$/.test(a))throw Error("ExpectedRegexMismatch: "+a);}
function Mi(a){a=void 0!==Z[a]?Z[a].toString():null;return null!=a&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
Ji.prototype.get=function(a,b){Li(a);Ki(a);var c=void 0!==Z[a]?Z[a].toString():null;return null!=c?c:b?b:""};
Ji.prototype.set=function(a,b){Li(a);Ki(a);if(null==b)throw Error("ExpectedNotNull");Z[a]=b.toString()};
Ji.prototype.remove=function(a){Li(a);Ki(a);delete Z[a]};
Ji.prototype.clear=function(){Z={}};var Ni=null,Oi=null,Pi=null,Qi={};function Ri(a){Vf(a.payload_name,a.payload,V("enable_youtubei_innertube")?vg:rg,void 0,void 0)}
function Si(a){var b=a.id;a=a.ve_type;var c=Hf++;a=new Gf(void 0,a,c,void 0);Qi[b]=a;b=fg();c=eg();b&&c&&Wf(wg(),b,c,a)}
function Ti(a){var b=a.csn;a=a.root_ve_type;if(b&&a&&(S("client-screen-nonce",b),S("ROOT_VE_TYPE",a),a=eg()))for(var c in Qi){var d=Qi[c];if(d){var e=b,f=a;Wf(wg(),e,f,d)}}}
function Ui(a){Qi[a.id]=new Gf(a.tracking_params)}
function Vi(a){var b=fg();a=Qi[a.id];if(b&&a){var c=wg();Xf(c,{click:{csn:b,visualElement:If(a)}},void 0)}}
function Wi(a){a=a.ids;var b=fg();if(b){for(var c=[],d=0;d<a.length;d++){var e=Qi[a[d]];e&&c.push(e)}c.length&&Yf(wg(),b,c)}}
function Xi(){var a=Ni;a&&a.startInteractionLogging&&a.startInteractionLogging()}
;q("yt.setConfig",S,void 0);q("yt.config.set",S,void 0);q("yt.setMsg",of,void 0);q("yt.msgs.set",of,void 0);q("yt.logging.errors.log",kf,void 0);
q("writeEmbed",function(){var a=T("PLAYER_CONFIG",void 0);"1"!=a.privembed&&Hi(!0);"gvn"==a.args.ps&&(document.body.style.backgroundColor="transparent");var b=document.referrer,c=T("POST_MESSAGE_ORIGIN");window!=window.top&&b&&b!=document.URL&&(a.args.loaderUrl=b);T("LIGHTWEIGHT_AUTOPLAY")&&(a.args.autoplay="1");a.args.autoplay&&di(a.args);Ni=a=Yh(a);a.addEventListener("onScreenChanged",Ti);a.addEventListener("onLogClientVeCreated",Si);a.addEventListener("onLogServerVeCreated",Ui);a.addEventListener("onLogToGel",
Ri);a.addEventListener("onLogVeClicked",Vi);a.addEventListener("onLogVesShown",Wi);a.addEventListener("onReady",Xi);b=T("POST_MESSAGE_ID","player");T("ENABLE_JS_API")?Pi=new pi(a):T("ENABLE_POST_API")&&u(b)&&u(c)&&(Oi=new si(window.parent,b,c),Pi=new ji(a,Oi.g));T("BG_P")&&(T("BG_I")||T("BG_IU"))&&Me();sf()},void 0);
q("yt.www.watch.ads.restrictioncookie.spr",function(a){hf(a+"mac_204?action_fcts=1");return!0},void 0);
var Yi=ne(function(){th("ol");var a=Ji.getInstance(),b=1<window.devicePixelRatio;if(!!((Mi("f"+(Math.floor(119/31)+1))||0)&67108864)!=b){var c="f"+(Math.floor(119/31)+1),d=Mi(c)||0,d=b?d|67108864:d&-67108865;0==d?delete Z[c]:Z[c]=d.toString(16).toString();var a=a.b,b=[],e;for(e in Z)b.push(e+"="+escape(Z[e]));uc.set(""+a,b.join("&"),63072E3,"/","youtube.com")}}),Zi=ne(function(){var a=Ni;
a&&a.sendAbandonmentPing&&a.sendAbandonmentPing();T("PL_ATT")&&(Le=null);for(var a=0,b=qf.length;a<b;a++){var c=qf[a];if(!isNaN(c)){var d=r("yt.scheduler.instance.cancelJob");d?d(c):window.clearTimeout(c)}}qf.length=0;Ie("//static.doubleclick.net/instream/ad_status.js");rf=!1;S("DCLKSTAT",0);rd(Pi,Oi);if(a=Ni)a.removeEventListener("onScreenChanged",Ti),a.removeEventListener("onLogClientVeCreated",Si),a.removeEventListener("onLogServerVeCreated",Ui),a.removeEventListener("onLogToGel",Ri),a.removeEventListener("onLogVeClicked",
Vi),a.removeEventListener("onLogVesShown",Wi),a.removeEventListener("onReady",Xi),a.destroy();Qi={}});
window.addEventListener?(window.addEventListener("load",Yi),window.addEventListener("unload",Zi)):window.attachEvent&&(window.attachEvent("onload",Yi),window.attachEvent("onunload",Zi));}).call(this);
