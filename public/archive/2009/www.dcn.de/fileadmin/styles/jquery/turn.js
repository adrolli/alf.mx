var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/**
 * Curls JQuery Plugin
 * By Elliott Kember
 * Released under the MIT license
 */

(function($){
  jQuery.fn.fold = function(options) {
    var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
    var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);
    
    // We just won't show it for IE5.5 and IE6
    if (ie55 || ie6) {this.remove(); return true;}
  
    options = options || {};
    
    var defaults = {
      directory: 'fileadmin/styles/jquery/',         // The directory we're in
      side: 'right',           // change me to "right" if you want rightness
      turnImage: 'flip.png',  // The triangle-shaped fold image
      maxHeight: 500,         // The maximum height. Duh.
      startingWidth: 50,     // The height and width 
      startingHeight: 50,    // with which to start (these should probably be camelCase, d'oh.)
      autoCurl: true         // If this is set to true, the fold will curl/uncurl on mouseover/mouseout.
    };
  
    var options = $.extend(defaults, options);
    
    var turn_hideme = jQuery('<div id="turn_hideme">');
    var turn_wrapper = jQuery('<div id="turn_wrapper">');
    var turn_object = jQuery('<div id="turn_object">');
    var img = jQuery('<img id="turn_fold" src="'+ (options.directory+'/'+options.turnImage) +'">');

    turn_object.css({
      width: options.startingWidth, 
      height: options.startingHeight
    });
  
    if (options.side == 'right') turn_wrapper.addClass('right');
    this.wrap(turn_wrapper).wrap(turn_object).after(img).wrap(turn_hideme);
    
    // If you want autoCurl, you don't get scrolling
    
    turn_wrapper = jQuery('#turn_wrapper');
    turn_object = jQuery('#turn_object');

    if (!options.autoCurl) {
      // Hit 'em with the drag-stick because it ain't gonna curl itself!
      turn_object.resizable({ 
        maxHeight: options.maxHeight, 
        aspectRatio: true,
        ratio: true,
        border: false,
        dragHandle: false,
        knobHandles: true,
        handles:  options.side == 'left' ? 'se' : 'sw'
      });
    } else {
      // Thanks to @zzzrByte for this bit!
      turn_wrapper.hover(
        function(){
          turn_object.stop().animate({
            width: options.maxHeight,
            height: options.maxHeight
          });
        },
        function(){
          turn_object.stop().animate({
            width: options.startingHeight,
            height: options.startingHeight
          });
        }
      );
    }
  };
})(jQuery);

}

/*
     FILE ARCHIVED ON 16:48:26 Dec 23, 2010 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:19:13 Jun 12, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.682
  exclusion.robots: 0.066
  exclusion.robots.policy: 0.052
  esindex: 0.011
  cdx.remote: 9.637
  LoadShardBlock: 72.063 (3)
  PetaboxLoader3.datanode: 63.486 (4)
  PetaboxLoader3.resolve: 80.078 (3)
  load_resource: 117.553
*/