<?php

/**
 * This file is part of the ATK distribution on GitHub.
 * Detailed copyright and licensing information can be found
 * in the doc/COPYRIGHT and doc/LICENSE files which should be
 * included in the distribution.
 *
 * @package atk
 * @subpackage attributes
 *
 * $Id: class.atkckeditorattribute.inc 2014-04-27 wayneh$
 *
 *
 * @2010 by Antonio Gallo "AGX" - http://www.badpenguin.org/
 * License: GPL
 * Version: 2
 * I'm starting my own framework, so i've decided to release my
 * unpublished ATK source code under GPL2 license.
 * To contact me please visit http://www.badpenguin.org/follow-me
 * See forum http://forum.achievo.org/viewtopic.php?f=2&t=21708
 */

/**
 * This attribute is a functional replacement for atkhtmlattribute
 * which uses FCK editor (the predecessor to CKeditor)
 * Originally configured with CKEditor 4.4.0 April 2014
 * See www.ckeditor.com
 */
class atkCKEditorAttribute extends atkTextAttribute
{

    /**
     * Tool bar to use from config.js.
     * In standard config.js atkstd,atklite & atkmin
     * toolbars are defined
     * @param string $toolbar
     */
    private $toolbar = 'atkstd';

    /**
     * Sets the tool bar to use from config.js.
     *
     * @param string $tb
     */
    function setToolBar($tb)
    {
        $this -> toolbar = $tb;
    }

    /**
     * Constructor
     * @param string $name Name of the attribute
     * @param int $flags Flags of the attribute
     */
    function atkCKeditorAttribute($name, $flags = 0)
    {
        // better to keep size empty to avoid compatibility problems with text areas
        $size = NULL;
        $this -> atkTextAttribute($name, $size, $flags);
    }

    function edit($record = "", $fieldprefix = "", $mode = "")
    {
        $page = &atkinstance("atk.ui.atkpage");
        $page -> register_script(atkconfig("atkroot")
          . "atk/attributes/ckeditor/ckeditor.js");

        $result = parent::edit($record, $fieldprefix, $mode);

        // activate
        $iname = $this -> gethtmlid($fieldprefix);
        $result .= "<script type='text/javascript'>CKEDITOR.replace( '"
          . $iname . "',{toolbar : '" . $this -> toolbar
          . "', uiColor : '#9AB8F3'});</script>";
        return $result;
    }

}

?>