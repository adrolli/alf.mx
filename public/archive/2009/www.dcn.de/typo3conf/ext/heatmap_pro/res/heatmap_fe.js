var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/***************************************************************
*  Copyright notice
*
*  (c) 2008-2009 Clara Brocar <cbrocar@pagemachine.de>
*  All rights reserved
*
*  This script is part of the TYPO3 project. The TYPO3 project is
*  free software; you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation; either version 2 of the License, or
*  (at your option) any later version.
*
*  The GNU General Public License can be found at
*  http://www.gnu.org/copyleft/gpl.html.
*
*  This script is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  This copyright notice MUST APPEAR in all copies of the script!
***************************************************************/

/**
* Some code and inspiration taken from ClickHeat by labsmedia.com (published under GNU GPL)
*/

var id = '';
var clickTime = 0;

function logClick(e) {	
	var x = e.clientX;
	var y = e.clientY;

	if (document.documentElement != undefined&&document.documentElement.clientHeight != 0) {
    var w = document.documentElement.clientWidth != undefined ? document.documentElement.clientWidth : window.innerWidth;
	  var h = document.documentElement.clientHeight != undefined ? document.documentElement.clientHeight : window.innerHeight;
	  var scrollx = window.pageXOffset == undefined ? document.documentElement.scrollLeft : window.pageXOffset;
	  var scrolly = window.pageYOffset == undefined ? document.documentElement.scrollTop : window.pageYOffset;
  } else {
    var w = document.body.clientWidth != undefined ? document.body.clientWidth : window.innerWidth;
	  var h = document.body.clientHeight != undefined ? document.body.clientHeight : window.innerHeight;
	  var scrollx = window.pageXOffset == undefined ? document.body.scrollLeft : window.pageXOffset;
	  var scrolly = window.pageYOffset == undefined ? document.body.scrollTop : window.pageYOffset;
  }
	
	var realx = x + scrollx;
	var realy = y + scrolly;
	
	// nicht loggen, wenn letzter Klick weniger als 1 Sekunde zurück liegt
	time = new Date();
	if (time.getTime() - clickTime < 1000) {
		return true;
	}
	clickTime = time.getTime();
	
	// nicht loggen, wenn auf einen Scrollbalken geklickt wurde 
	if(x>w||y>h) {
			return true;
	}   
  	
  // für den Ajax-Request muss prototype.js included sein -> typo3/contrib/prototype/prototype.js
  var params = 'eID=heatmap_fe&s='+id+'&x='+realx+'&y='+realy+'&w='+w;
  var myAjax = new Ajax.Request(
    'index.php',
    {
      method: 'get', 
      parameters: params
    }
  );
	
	return true;
}


function initHeatmap() {
  if(document.addEventListener){
		document.addEventListener('mousedown', logClick, false);
	} else if(document.attachEvent){
		document.attachEvent('onmousedown', logClick);
	}
}
}

/*
     FILE ARCHIVED ON 19:13:28 Dec 23, 2010 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:24:48 Jun 12, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.451
  exclusion.robots: 0.042
  exclusion.robots.policy: 0.034
  esindex: 0.008
  cdx.remote: 18.929
  LoadShardBlock: 88.365 (3)
  PetaboxLoader3.datanode: 55.701 (4)
  PetaboxLoader3.resolve: 130.299 (2)
  load_resource: 136.396
*/