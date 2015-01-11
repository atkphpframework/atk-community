  /**
   * This file is part of the Achievo ATK distribution.
   * Detailed copyright and licensing information can be found
   * in the doc/COPYRIGHT and doc/LICENSE files which should be 
   * included in the distribution.
   *
   * @package atk
   * @subpackage javascript
   *
   * @copyright (c)2000-2004 Ibuildings.nl BV
   * @license http://www.achievo.org/atk/licensing ATK Open Source License
   *
   * @version $Revision: 6170 $
   * $Id: colorpicker.js 6354 2009-04-15 02:41:21Z mvdam $
   */

function picker(a,color)
{
  var formname = "document.entryform."+a+".value='"+color+"'";
  eval(formname);
}

function remotePicker(a,color)
{
  color        = color.toUpperCase();
  var formname = "opener.document.entryform."+a+".value='"+color+"'";
  var example  = opener.document.getElementById("example_"+a);

  eval(formname);

  if (example)
  {
    example.bgColor = color;
  }
}

function remoteUpdate(a, imgPrefix)
{
  var formname = "document.entryform."+a+".value";
  var color    = eval(formname);
  var formname = "opener.document.getElementById('"+a+"').value='"+color+"'";
  var example  = opener.document.getElementById("example_"+a);
  var img      = eval("opener.document.getElementById('img_"+a+"')");

  if (color != "")
  {
    img.src = imgPrefix+"select_color_on.gif"; 
    img.alt = color;
    img.style.backgroundColor = color;
  }
  else
  {
    img.src = imgPrefix+"select_color_off.gif";
    img.alt = "Geen kleur geselecteerd";
    img.style.backgroundColor = '#FFFFFF';
  }

  eval(formname);

  if (example)
  {
    example.bgColor = color;
  }

  window.close();
}
