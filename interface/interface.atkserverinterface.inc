<?php
/**
 * This file is part of the ATK distribution on GitHub.
 * Detailed copyright and licensing information can be found
 * in the doc/COPYRIGHT and doc/LICENSE files which should be
 * included in the distribution.
 *
 * @package atk
 * @subpackage interface
 *
 * @copyright (c)2008 Ibuildings.nl BV
 * @license http://www.achievo.org/atk/licensing ATK Open Source License
 *
 * @version $Revision: 6065 $
 */

/**
 * The general Interface for atkServerclasses.
 * @author Ivo Jansch <ivo@ibuildings.nl>
 * @package atk
 * @subpackage interface
 */
interface atkServerInterface
{

    public function handleRequest($request);
}
