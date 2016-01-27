<?php
/**
 * This file is part of the ATK distribution on GitHub.
 * Detailed copyright and licensing information can be found
 * in the doc/COPYRIGHT and doc/LICENSE files which should be
 * included in the distribution.
 *
 * @package atk
 * @subpackage ui
 *
 * @copyright (c)2007 Ibuildings.nl
 * @license http://www.achievo.org/atk/licensing ATK Open Source License
 *
 * @version $Revision: 5230 $
 * $Id$
 */

/**
 * Smarty resource plug-in for fetching templates from the ATK theme.
 *
 * @author Peter C. Verhage <peter@ibuildings.nl>
 */
function smarty_resource_theme_source($tpl_name, &$tpl_source, &$smarty)
{
    $theme = &atkTheme::getInstance();
    $path = $theme->tplPath($tpl_name);

    if (!empty($path)) {
        $tpl_source = file_get_contents($path);

        if (atkconfig('debug') >= 3) {
            $tpl_source = "\n<!-- START [{$path}] -->\n" .
                $tpl_source .
                "\n<!-- END [{$path}] -->\n";
        }

        return true;
    } else {
        return false;
    }
}

/**
 * Timestamp function for the theme resource
 */
function smarty_resource_theme_timestamp($tpl_name, &$tpl_timestamp, &$smarty)
{
    $theme = &atkTheme::getInstance();
    $path = $theme->tplPath($tpl_name);

    if (!empty($path)) {
        $tpl_timestamp = filemtime($path);
        return true;
    } else {
        return false;
    }
}

/**
 * Security function for the theme resource.
 */
function smarty_resource_theme_secure($tpl_name, &$smarty)
{
    // assume all templates are secure
    return true;
}

/**
 * Trusted function for the theme resource.
 */
function smarty_resource_theme_trusted($tpl_name, &$smarty)
{
    // not used for templates
}

?>