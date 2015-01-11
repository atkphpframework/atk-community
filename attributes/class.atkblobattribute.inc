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
 * @copyright (c)2000-2004 Ibuildings.nl BV
 * @license http://www.achievo.org/atk/licensing ATK Open Source License
 *
 * @version $Revision: 6309 $
 * $Id: class.atkblobattribute.inc 2014-08-01  wayneh $
 */
atkimport("atk.attributes.atkattribute");

/*
 *  @author WayneH*
 * @package atk
 * @subpackage attributes
 *
 */

class atkBlobAttribute extends atkAttribute
{

    /**
     * Constructor
     * @param String $name The name of the attribute
     * @param int $flags The flags for this attribute
     */
    function atkBlobAttribute($name, $flags = 0)
    {
        $this->atkAttribute($name, $flags); // base class constructor
    }

    function display($record, $mode = "")
    {
        if ($mode == "list" || $mode == "view") {
            $result = $record[$this->m_name];
            if ($result != "") {
                return '<img width=100 height=100 alt="blob image" src="data:image/png;base64,' . base64_encode($record[$this->m_name]) . '"/>';
            }
            else {
                return "";
            }
        }
        return parent::display($record, $mode);
    }

    function edit($record = "", $fieldprefix = "", $mode = "")
    {
        $id = $this->fieldName();
        $result = $this->display($record, 'view');
        if ($result != "") {
            $result.="<br>";
        }
        $result .= '<input type="file" id="' . $id . '" name="' . $id . '" ' . $onchange . '>';
        return $result;
    }

    function value2db($record)
    {
        $data = $record[$this->fieldName()]["tmpfile"];
        if ($data != null) {
            $imgData = addslashes(file_get_contents($data));
            return $imgData;
        }
    }

    function fetchValue($record)
    {
        if ($_FILES[$this->fieldName()]["size"] == 0) {
            parent::setStorageType(NOSTORE);
        }
        else {
            $result = array("tmpfile" => $_FILES[$this->fieldName()]["tmp_name"],
                "filename" => $_FILES[$this->fieldName()]["name"],
                "filesize" => $_FILES[$this->fieldName()]["size"]
            );
            return $result;
        }
    }

}

?>
