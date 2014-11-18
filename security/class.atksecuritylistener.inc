<?php
/**
 * This file is part of the ATK distribution on GitHub.
 * Detailed copyright and licensing information can be found
 * in the doc/COPYRIGHT and doc/LICENSE files which should be
 * included in the distribution.
 *
 * @package atk
 * @subpackage security
 *
 * @copyright (c)2007 Ibuildings.nl BV
 * @license http://www.achievo.org/atk/licensing ATK Open Source License
 *
 * @version $Revision: 5798 $
 * $Id: class.atksecuritylistener.inc 6354 2009-04-15 02:41:21Z mvdam $
 */

/**
 * ATK security listener.
 *
 * An instance of the ATK security listener can be registered as listener for the
 * ATK security manager. It will then be notified of successful logins and logouts.
 *
 * The following events are supported:
 *
 * preLogin:   This event is thrown just before the user get's authenticated.
 * postLogin:  This event is thrown just after the user is successfully authenticated.
 * preLogout:  This event is thrown just before the user get's logged out the system.
 * postLogout: This event is thrown just after the user is logged out the system.
 *
 * @author Peter C. Verhage <peter@ibuildings.nl>
 * @package atk
 * @subpackage security
 */
class atkSecurityListener
{

    /**
     * Handle event. In the default implementation, if a method exists with the same
     * name as the event this method will be called.
     *
     * @param string $event    event name
     * @param string $username user name
     */
    function handleEvent($event, $username, $message = "")
    {
        if (method_exists($this, $event))
                $this->$event($username, $message);
    }

    // This event is thrown when a login fails.
    function failedlogin($username, $message)
    {
        atkdebug("$username Failed Login from " . $_SERVER['REMOTE'] . " $message");
        $this->log(1, "$username Failed Login from " . $_SERVER['REMOTE_ADDR'] . " $message");
        // place your custom code below
    }

    // This event is thrown just when node action started.
    function performed($username, $message)
    {
        atkdebug("$username performed $message");
        $this->log(3, "$username performed $message");
    }

    // This event is thrown just before the user get's authenticated.
    function preLogin($username, $message)
    {
        atkdebug("$username about to login: preLogin()");
        $this->log(2, "$username about to login: preLogin()");
    }

    // This event is thrown just after the user is successfully authenticated.
    function postLogin($username, $message)
    {
        atkdebug("$username already logged in: postLogin()");
        $this->log(2, "$username already logged in: postLogin()");
    }

    // This event is thrown just before the user get's logged out the system.
    function preLogout($username, $message)
    {
        atkdebug("$username about to logout: preLogout()");
        $this->log(2, "$username about to logout: preLogout()");
    }

    // This event is thrown just after the user is logged out the system.
    function postLogout($username, $message)
    {
        atkdebug("$username already logged out: postLogout()");
        $this->log(2, "$username already logged out: postLogout()");
    }

    /**
     * Write a logentry in the logfile.
     * The entry is only written to the file, if the level of the message is
     * equal or higher than the setting of $config_logging.
     *
     * @todo Logging should be moved to a separate atkLogger class.
     * @param int $level The loglevel.
     * @param String $message The message to log.
     */
    function log($level, $msg)
    {

        if (atkconfig("logging") > 0 && atkconfig("logging") >= $level) {
            $fp = @fopen(atkconfig("logfile"), "a");
            if ($fp) {
                $logstamp = "[" . date("d-m-Y H:i:s") . "] [" . $_SERVER["REMOTE_ADDR"] . "] " . $this->m_user["name"] . " | ";
                @fwrite($fp, $logstamp . $msg . "\n");
                @fclose($fp);
            }
            else {
                atkdebug("error opening logfile");
            }
        }
    }

}

?>