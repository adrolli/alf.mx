var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
// Flash Player Version Detection - Rev 1.5+
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
// +modified for TYPO3 Extension kulo_player version 0.5.3 01/2009

var isIEBrowser  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWinBrowser = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOperaBrowser = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlPluginVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful.

			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}

	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetPluginVersion(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;

	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split("r");
			} else {
				tempArrayMinor = descArray[4].split("r");
			}
			var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIEBrowser && isWinBrowser && !isOperaBrowser ) {
		flashVer = ControlPluginVersion();
	}
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectPluginVersion(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetPluginVersion();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIEBrowser && isWinBrowser && !isOperaBrowser) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}





//v1.0
//Copyright 2006 Adobe Systems, Inc. All rights reserved.
//modified for TYPO3 Extension kulo_player version 0.5.0 02/2007
//modified for fullscreen kulo_player version 0.5.1 09/2007
function Add_Extension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?');
  else
    return src + ext;
}

function Generate_Object(objAttrs, params, embedAttrs, pageAttrs)
{
  var str = "";
  var t_start = "";
  var t_object = "";
  var t_param  = "";
  var t_embed = "";
  var t_end = "";

  t_start =pageAttrs["sXHTML"];
 
  for (var i in objAttrs) 
    t_object += i + '="' + objAttrs[i] + '" ';
 
  for (var i in params)
    t_param += '<param name="' + i + '" value="' + params[i] + '" /> ';

  for (var i in embedAttrs)
    t_embed += i + '="' + embedAttrs[i] + '" ';

  //added for full screen mode
  //if (t_embed.indexOf("full=true") > 0) {
  //  t_embed = 'width="'+screen.width+'" height="'+screen.height+'"'+t_embed;
  //  t_object ='width="'+screen.width+'" height="'+screen.height+'" '+t_object;
  //}
  
  t_object = '<object '+t_object+'>'; 
  t_embed = '<embed '+ t_embed+' ></embed></object>';
  t_end =pageAttrs["eXHTML"];
  
  

//self.moveTo(0,0);
//self.resizeTo(screen.width,screen.height); 

//var oNewDoc = document.open("test.html","replace","fullscreen=yes,channelmode=no,scrollbars=no","replace");
//var html_header = "<html><head><title>New Document</title></head><body>";
//var html_footer = "</body></html>";
//oNewDoc.write(html_header+t_start+t_object+t_param+t_embed+t_end+html_footer);
//oNewDoc.close();
//window.document.write(t_start+t_object+t_param+t_embed+t_end);  

//document.close();
//document.open("test.html","_self","fullscreen=yes,channelmode=no,scrollbars=no","replace");
//document.open();
//document.write(html_header+t_start+t_object+t_param+t_embed+t_end+html_footer);
//document.close();
document.write(t_start+t_object+t_param+t_embed+t_end);

}


function FLV_Run(){
  var ret =
    Get_Arguments
    (  arguments, "", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );

  Generate_Object(ret.objAttrs, ret.params, ret.embedAttrs, ret.pageAttrs);
}


function SWF_Run(){
  var ret =
    Get_Arguments
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  Generate_Object(ret.objAttrs, ret.params, ret.embedAttrs, ret.pageAttrs);
}


function Get_Arguments(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  ret.pageAttrs = new Object();
  
  screen_width = screen.width;
  screen_height = screen.height;

  full = "";	
    
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();


    switch (currArg){
      case "beginxhtml":
          ret.pageAttrs["sXHTML"] = args[i+1];
        break;
      case "endxhtml":
          ret.pageAttrs["eXHTML"] = args[i+1];
        break;
      case "classid":                        
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":
        args[i+1] = Add_Extension(args[i+1], ext);
  		//if (args[i+1].indexOf("full=true") > 0) {
  		//	full = "&swidth="+screen_width+"&sheight="+screen_height+"";
  		//}
        ret.embedAttrs["src"] = args[i+1]+ full;
        ret.params[srcParamName] = args[i+1]+ full;
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
            
        break;
      case "width":
      case "height":
      case "align":
      case "vspace":
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "id":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }

  }
 
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}



}

/*
     FILE ARCHIVED ON 04:12:46 May 26, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:43:00 Jun 12, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.34
  exclusion.robots: 0.031
  exclusion.robots.policy: 0.025
  esindex: 0.005
  cdx.remote: 8.328
  LoadShardBlock: 87.414 (3)
  PetaboxLoader3.datanode: 95.328 (4)
  load_resource: 90.866
  PetaboxLoader3.resolve: 46.187
*/