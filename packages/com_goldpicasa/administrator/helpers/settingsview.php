<?php
/**
 * @author 	Tom Konopelski - www.konopelski.info
 * @copyright  	Copyright (C) 2014 goldpicasagallery.konopelski.info. All rights reserved.
 * @license    	GNU General Public License version 2 or later; see LICENSE
 */
defined('_JEXEC') or die('Restricted access');
?>

<?php

$defFontsize='11px';
if ($params->get('fontsize', '')) {
    $defFontsize=$params->get('fontsize', $defFontsize);
}
$defLineHeight='1.1em';
if ($params->get('lineheight', '')) {
    $defLineHeight=$params->get('lineheight', $defLineHeight);
}

$defFontColor='#FFFFFF';
if ($params->get('fontcolor', '')) {
    $defFontColor=$params->get('fontcolor', $defFontColor);
}

$defOverlayColor='#000000';
if ($params->get('overlaycolor', '')) {
    $defOverlayColor=$params->get('overlaycolor', $defOverlayColor);
}

$defOverlayLevel='0.7';
if ($params->get('overlaylevel', '')) {
    $defOverlayLevel=$params->get('overlaylevel', $defOverlayLevel);
}
$defMootoolscore='';
if ($params->get('mootoolscore', '')) {
    $defMootoolscore=$params->get('mootoolscore', '');
}
?>

<h1><?php echo JText::_('JACTION_COMPONENT_SETTINGS'); ?> </h1>

<form method="post">
    <fieldset class="adminform long">
        <legend><?php echo JText::_('COM_GOLDPICASA_THEME'); ?></legend>
        <table>
            <tr>
                <td>
                    <input type="radio" name="gpgsettings[theme]" value="clasic"  <?php if ($params->get('theme', '')==='clasic') echo ' checked="checked" '; ?>>
                </td>
                <td>
                    <?php echo JText::_('COM_GOLDPICASA_THEME_CLASSIC'); ?>
                </td>
                <td></td>
                <td>
                    <input type="radio" name="gpgsettings[theme]" value="box" <?php if ($params->get('theme', '')==='box') echo ' checked="checked" '; ?>>
                </td>
                <td>
                    <?php echo JText::_('COM_GOLDPICASA_THEME_BOX'); ?>
                </td>
            </tr>
        </table>
    </fieldset>
    <br /> <br />

    <fieldset class="adminform long">
        <legend><?php echo JText::_('COM_GOLDPICASA_THEME_BOX_SETTINGS'); ?></legend>

        <table>
            <tr>
                <td><?php echo JText::_('COM_GOLDPICASA_FONT_SIZE'); ?></td>
                <td> <input type="text" name="gpgsettings[fontsize]" size="6" placeholder="11px" value="<?php echo $defFontsize; ?>" /> </td>
                <td><?php echo JText::_('COM_GOLDPICASA_FONT_SIZE_DESC'); ?>  </td>
            </tr>

            <tr>
                <td><?php echo JText::_('COM_GOLDPICASA_FONT_LINE_HEIGHT'); ?></td>
                <td><input type="text" name="gpgsettings[lineheight]" size="6" placeholder="1.1em" value="<?php echo $defLineHeight; ?>" /></td>
                <td><?php echo JText::_('COM_GOLDPICASA_FONT_LINE_HEIGHT_DESC'); ?></td>
            </tr>
            <tr>
                <td><?php echo JText::_('COM_GOLDPICASA_FONT_COLOR'); ?></td>
                <td><input type="text" name="gpgsettings[fontcolor]" id="examplecolor" class="input-colorpicker" value="<?php echo $defFontColor; ?>" size="10" /></td>
                <td><?php echo JText::_('COM_GOLDPICASA_DEFAULT').' '. $defFontColor; ?></td>
            </tr>
            <tr>
                <td><?php echo JText::_('COM_GOLDPICASA_OVERLAY_COLOR'); ?></td>
                <td><input type="text" name="gpgsettings[overlaycolor]" id="examplecolor" class="input-colorpicker" value="<?php echo $defOverlayColor; ?>" size="10" /></td>
                <td><?php echo JText::_('COM_GOLDPICASA_OVERLAY_COLOR_DESC'); ?></td>
            </tr>
            <tr>
                <td><?php echo JText::_('COM_GOLDPICASA_OVERLAY_OPACITY_LEVEL'); ?></td>
                <td><select name="gpgsettings[overlaylevel]">
                    <?php
                    $overlayList=array(1, 0.9 , 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1);
                    foreach ($overlayList as $ol) {
                        $selOv='';
                        if ($defOverlayLevel == $ol) {
                            $selOv = ' selected="selected" ';
                        }
                        echo '<option value="'.$ol.'" '.$selOv.'>'.$ol.'</option>';
                    }
                    ?>
                    </select>
                </td>
                <td><?php echo JText::_('COM_GOLDPICASA_OVERLAY_OPACITY_LEVEL_DESC'); ?></td>
            </tr>
        </table>
</fieldset>
<fieldset class="adminform long">
        <legend><?php echo JText::_('COM_GOLDPICASA_OTHER'); ?></legend>
        <table>
            <tr>
                <td><?php echo JText::_('COM_GOLDPICASA_FORCE_MOOTOOLS'); ?></td>
                <td><?php echo settingsViewYesNo('mootoolscore', $defMootoolscore); ?> </td>
            </tr>
        </table>
    </fieldset>
    <br />
    <input type="submit" value="<?php echo JText::_('JApply'); ?>">
    <br /> <br />
</form>
<?php

function settingsViewYesNo($name, $default=false, $showDefault=true) {
    $html='';
    $html.='<select name="gpgsettings['.$name.']">';
    if ($showDefault) {
        $html.='<option value="" >'.JText::_('JDefault').'</option>';
    }
    $sel = ($default==='yes') ? ' selected="selected" ' : '';
    $html.='<option value="yes" '.$sel.'>'.JText::_('JYes').'</option>';
    $sel = ($default==='no') ? ' selected="selected" ' : '';
    $html.='<option value="no" '.$sel.'>'.JText::_('JNo').'</option>';
    $html.='</select>';
    return $html;
}
?>