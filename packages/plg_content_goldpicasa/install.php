<?php
/**
 * @version     3.1.0
 * @package     com_goldpicasa
 * @copyright   Copyright (C) 2012. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('_JEXEC') or die('Restricted access');

class plgContentgoldpicasaInstallerScript {

        function install($parent)
        {
                $this->installMe();
        }

        function update($parent)  {
                $this->installMe();
        }

        function installMe()
        {
           $db = JFactory::getDbo();

		$query = "UPDATE #__extensions  SET enabled  = 1 WHERE element='goldpicasa' AND type ='plugin' LIMIT 1";
           $db->setQuery( $query );
           $db->query();
	   echo '<p>Plugin enabled</p>';
        }
}
?>
