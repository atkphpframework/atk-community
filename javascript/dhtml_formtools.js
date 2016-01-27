/**
 * This file is part of the ATK distribution on GitHub.
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
 * @version $Revision: 5798 $
 * $Id$
 */

function hideAttrib(attrib)
{
    el = document.getElementById('ar_' + attrib);
    el.style.display = "none";
}

function showAttrib(attrib)
{
    el = document.getElementById('ar_' + attrib);
    el.style.display = '';
}