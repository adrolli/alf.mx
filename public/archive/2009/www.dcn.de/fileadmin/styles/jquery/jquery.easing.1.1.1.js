var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/*
 * jQuery Easing v1.1.1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 *
 * Uses the built in easing capabilities added in jQuery 1.1
 * to offer multiple easing options
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

jQuery.extend({
	easing: {
		easein: function(x, t, b, c, d) {
			return c*(t/=d)*t + b; // in
		},
		easeinout: function(x, t, b, c, d) {
			if (t < d/2) return 2*c*t*t/(d*d) + b;
			var ts = t - d/2;
			return -2*c*ts*ts/(d*d) + 2*c*ts/d + c/2 + b;		
		},
		easeout: function(x, t, b, c, d) {
			return -c*t*t/(d*d) + 2*c*t/d + b;
		},
		expoin: function(x, t, b, c, d) {
			var flip = 1;
			if (c < 0) {
				flip *= -1;
				c *= -1;
			}
			return flip * (Math.exp(Math.log(c)/d * t)) + b;		
		},
		expoout: function(x, t, b, c, d) {
			var flip = 1;
			if (c < 0) {
				flip *= -1;
				c *= -1;
			}
			return flip * (-Math.exp(-Math.log(c)/d * (t-d)) + c + 1) + b;
		},
		expoinout: function(x, t, b, c, d) {
			var flip = 1;
			if (c < 0) {
				flip *= -1;
				c *= -1;
			}
			if (t < d/2) return flip * (Math.exp(Math.log(c/2)/(d/2) * t)) + b;
			return flip * (-Math.exp(-2*Math.log(c/2)/d * (t-d)) + c + 1) + b;
		},
		bouncein: function(x, t, b, c, d) {
			return c - jQuery.easing['bounceout'](x, d-t, 0, c, d) + b;
		},
		bounceout: function(x, t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		bounceinout: function(x, t, b, c, d) {
			if (t < d/2) return jQuery.easing['bouncein'] (x, t*2, 0, c, d) * .5 + b;
			return jQuery.easing['bounceout'] (x, t*2-d,0, c, d) * .5 + c*.5 + b;
		},
		elasin: function(x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		elasout: function(x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		elasinout: function(x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		},
		backin: function(x, t, b, c, d) {
			var s=1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		backout: function(x, t, b, c, d) {
			var s=1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		backinout: function(x, t, b, c, d) {
			var s=1.70158;
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		linear: function(x, t, b, c, d) {
			return c*t/d + b; //linear
		}
	}
});
}

/*
     FILE ARCHIVED ON 01:38:30 Mar 04, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:19:12 Jun 12, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.473
  exclusion.robots: 0.043
  exclusion.robots.policy: 0.034
  esindex: 0.009
  cdx.remote: 6.832
  LoadShardBlock: 85.063 (3)
  PetaboxLoader3.datanode: 74.432 (4)
  PetaboxLoader3.resolve: 118.128 (2)
  load_resource: 142.919
*/