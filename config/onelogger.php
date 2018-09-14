<?php
/**
 * This is optional. This is only used if the onedesign/onelogger plugin is installed.
 */
return [
  'logLevels' => getenv('ONELOGGER_LOG_LEVELS') ? explode(',', getenv('ONELOGGER_LOG_LEVELS')) : ['warning', 'error']
];
