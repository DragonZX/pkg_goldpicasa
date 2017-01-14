<?php
/**
 * @author 	Tom Konopelski - www.konopelski.info
 * @copyright  	Copyright (C) 2014 goldpicasagallery.konopelski.info. All rights reserved.
 * @license    	GNU General Public License version 2 or later; see LICENSE
 */
defined('_JEXEC') or die('Restricted access');
?>
<div class="clr"> </div>
<form action="<?php echo JRoute::_('index.php?option=com_goldpicasa&task=users'); ?>" method="post" name="adminForm" id="adminForm">
	<table class="adminlist table table-striped" style="border-top:1px solid #D5D5D5;border-bottom:1px solid #D5D5D5;">
	<thead>
	<tr>
	<th width="1%">
		<input type="checkbox" class="hasTooltip" name="checkall-toggle" value="" title="<?php echo JText::_('JGLOBAL_CHECK_ALL'); ?>" onclick="Joomla.checkAll(this)" />
	</th>
        <th width="10%"><div align="center"><?php echo JText::_('JDEFAULT'); ?></div></th>
        <th style="text-align:left;"><?php echo JText::_('JGLOBAL_USERNAME'); ?></th>
	</tr>
	</thead>
	<tbody>
<?php

$isChecked11='Joomla.isChecked(this.checked);';

$i=0;
foreach ($cd['users'] as $k => $v) {
	echo '<tr class="row'.($i % 2).'">';
	
	echo '<td class="center"><input type="checkbox" id="cb0" name="cid[]" value="'.$k.'" onclick="'. $isChecked11 . '"/></td>';

	echo '<td class="center">';
	if ( isset($cd['default'][2]) && $cd['default'] === $k ) {
		//echo '<a class="grid_true"></a>';
		echo '<img src="'.JURI::base().'/components/com_goldpicasa/assets/img/publish_x.png" title="Default" alt="Default"  />';
	} else {
		echo '<img src="'.JURI::base().'/components/com_goldpicasa/assets/img/disabled.png" alt=""  />';
	}
	echo '</td>';

	echo '<td ><a href="https://picasaweb.google.com/'.$k.'" target="_blank">' . $v . '</a></td>';
	
	echo '</tr>';
	$i++;
}
?>
		
	</tbody>
</table>
		<input type="hidden" name="task" value="usera" />
		<input type="hidden" name="boxchecked" value="0" />
	
		<?php echo JHtml::_('form.token'); ?>
</form>