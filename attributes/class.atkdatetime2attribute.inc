<?php

/**
 * This file is part of the Achievo ATK distribution.
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
 * @version $Revision: 5832 $
 * $Id: class.atkdatetime2attribute.inc 5832 2008-10-29 14:33:00 CST bcm $
 *
 * @author Sandy Pleyte <sandy@achievo.org>
 * @updated //yotmv <brian@bcm.nu>
 * @package atk
 * @subpackage attributes
 *
 */
class atkDateTime2Attribute extends atkDateTimeAttribute {

    /**
     * Constructor
     * @updated(10/31/08) changed $default_date to $default_date_arg and $default_time to $default_time_arg
     *       this allows you to set defaults on the fly (date format, etc, see below for more info)
     *
     * @todo I don't know who added the default_date and default_time parameters,
     *       but at least the atkDateAttribute doesn't support a default date. if
     *       you want to set a default date you should use initial_values anyways
     *       so I think the default_date / default_time parameters should be removed.
     *       But can we keep this backwards compatible somehow? At least now we
     *       are certain it doesn't work. ;) (PCV)
     *
     * @param $name        Name of the attribute
     * @param $default_date_arg   array of arguments for dateAttribute ( $format_edit, $format_view, $date_min, $date_max )
     * @param $default_time_arg   array of arguments for timeAttribute ( $beginTime, $endTime, $steps, $default )
     * @param $flags Flags for this attribute
     */
    function atkDateTime2Attribute($name, $default_date_arg = "", $default_time_arg = "", $flags = 0)
    {
        if (is_array($default_date_arg))
        {
            //use name of datetime as name of date attribute
            $date_format_edit = $default_date_arg['0'];
            $date_format_view = $default_date_arg['1'];
            $date_min = $default_date_arg['2'];
            $date_max = $default_date_arg['3'];
            //use flags from datetime for date attribute
        }
        else
        {
            $date_format_edit = "";
            $date_format_view = "";
            $date_min = 0;
            $date_max = 0;
            if (is_numeric($default_date_arg))
            {
                $flags = $default_date_args;
            }
        }
        if (is_array($default_time_arg))
        {
            //use name of datetime as name of time attribute
            $time_beginTime = $default_time_arg['0'];
            $time_endTime = $default_time_arg['1'];
            $time_steps = $default_time_arg['2'];
            $time_default = $default_time_arg['3'];
            //use flags of datetime as flags of time attribute
        }
        else
        {
            $time_beginTime = 0;
            $time_endTime = 23;
            $time_steps = array();
            for ($i = 0; $i < 60; $i++)
            {
                $time_steps[$i] = $i;
            }
            //backwards compatibility, if $default_time_arg is not an array, but is still set, use it as the default time value
            if (isset($default_time_arg))
            {
                $time_default = $default_time_arg;
            }
            else
            {
                $time_default = "";
            }
        }
        $this->m_time = new atkTimeAttribute($name, $time_beginTime, $time_endTime, $time_steps, $time_default, $flags);
        $this->m_date = new atkDateAttribute($name, $date_format_edit, $date_format_view, $date_min, $date_max, $flags);

        $this->atkAttribute($name, $flags); // base class constructor

        if ($this->hasFlag(AF_OBLIGATORY))
        {
            $this->setInitialValue(atkDateTimeAttribute::datetimeArray());
        }
    }

}

?>